import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import express from 'express';
import Critters from 'critters';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbs = (p) => path.resolve(__dirname, p);

const hostname = 'https://www.tantalusgeomatics.com';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

// 1. Separate tracking arrays for individual child sitemaps
const sitemapFeeds = {
  pages: [
    '/',
    '/about/',
    '/services/',
    '/faq/',
    '/contact/',
    '/residential/',
    '/survey-pricing/',
    '/surveys-and-title-insurance/',
    '/subdivision/',
    '/topographic-surveys/',
    '/sea-to-sky-property-line-and-boundary-staking/',
  ],
  services: [],
  blog: [],
  projects: []
};

// north-vancouver is not a real location (city and district are). It used to
// prerender as a second copy of the homepage. It is a static refresh stub now.
const CORE_LOCATIONS = [
  'squamish',
  'whistler',
  'pemberton',
  'lillooet',
  'west-vancouver',
  'bowen-island',
  'britannia-beach',
  'furry-creek',
  'gibsons',
  'sechelt',
  'powell-river',
  'the-sea-to-sky'
];

// Plain HTML files. Not prerendered, not listed in a sitemap.
const REDIRECT_STUBS = [
  {
    path: '/north-vancouver/',
    target: 'https://www.tantalusgeomatics.com/',
  },
  {
    path: '/services/topographic-surveys/',
    target: 'https://www.tantalusgeomatics.com/topographic-surveys/',
  },
  {
    path: '/services/property-line-surveys/',
    target: 'https://www.tantalusgeomatics.com/sea-to-sky-property-line-and-boundary-staking/',
  },
  // Hand-written source for this URL is in archive/town-pages/squamish/.
  // There is no generated property-line-surveys page (that slug is not in the
  // 28-service catalog). The stub cannot refresh to its own URL, so it points
  // at the generated Squamish boundary survey, which is the live page for this work.
  {
    path: '/squamish/services/property-line-surveys/',
    target: 'https://www.tantalusgeomatics.com/squamish/services/boundary-surveys/',
  },
];
const REDIRECT_STUB_PATHS = new Set(REDIRECT_STUBS.map((stub) => stub.path));

// Short /services/{slug}/ URLs are prerendered so existing links still resolve,
// but they are not submitted in the sitemap. Their canonical stays on the
// Sea to Sky URL. The two stubs below are written as static HTML instead.
const prerenderOnly = [];

// 2. Dynamically discover all localized and base fallback routes
function generateRouteMatrix() {
  // Explicitly push parent location landing routes to prevent Local SEO authority leakage
  CORE_LOCATIONS.forEach(location => {
    sitemapFeeds.pages.push(`/${location}/`);
  });

  const contentDir = toAbs('src/content');
  if (!fs.existsSync(contentDir)) {
    console.warn(`⚠️ Content directory not found at ${contentDir}.`);
    return sitemapFeeds.pages;
  }

  function contentSlugs(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter((dirent) => dirent.isFile() && /\.(mdx|md)$/.test(dirent.name))
      .map((dirent) => dirent.name)
      .filter((name) => fs.statSync(path.join(dir, name)).size > 0)
      .map((name) => name.replace(/\.(mdx|md)$/, ''))
      .filter(isPublishableSlug);
  }

  function scanCategory(categoryFolder, routePrefix, feedKey) {
    const categoryPath = path.join(contentDir, categoryFolder);
    if (!fs.existsSync(categoryPath)) return;

    // Files sitting in the category root (not a location folder) are still
    // routes: /insights/:slug and /projects/:slug. Empty fixtures are not pages.
    for (const slug of contentSlugs(categoryPath)) {
      sitemapFeeds[feedKey].push(`/${routePrefix}/${slug}/`);
    }

    // Read location subdirectories (squamish, whistler, etc.)
    const locations = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const location of locations) {
      // Push the base location path into sitemapFeeds.pages
      sitemapFeeds.pages.push(`/${location}/`);

      const locationPath = path.join(categoryPath, location);
      for (const slug of contentSlugs(locationPath)) {
        const shortPath = `/${routePrefix}/${slug}/`;
        const localizedPath = `/${location}/${routePrefix}/${slug}/`;

        sitemapFeeds[feedKey].push(localizedPath);
        if (!REDIRECT_STUB_PATHS.has(shortPath)) {
          prerenderOnly.push(shortPath);
        }
      }
    }
  }

  scanCategory('services', 'services', 'services');
  scanCategory('blog', 'insights', 'blog');
  scanCategory('projects', 'projects', 'projects');

  // De-duplicate feeds
  sitemapFeeds.pages = [...new Set(sitemapFeeds.pages)];
  sitemapFeeds.services = [...new Set(sitemapFeeds.services)];
  sitemapFeeds.blog = [...new Set(sitemapFeeds.blog)];
  sitemapFeeds.projects = [...new Set(sitemapFeeds.projects)];

  // Combine into a master list for the Puppeteer prerender crawler loop
  return [
    ...sitemapFeeds.pages,
    ...sitemapFeeds.services,
    ...sitemapFeeds.blog,
    ...sitemapFeeds.projects,
    ...new Set(prerenderOnly),
  ];
}

// Pipeline demos (_EXAMPLE_insight.txt, _EXAMPLE_project.txt) are not pages.
function isPublishableSlug(slug) {
  return !slug.startsWith('_EXAMPLE') && !slug.startsWith('example-');
}

function writeRedirectStub(routePath, target) {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redirecting…</title>
  <link rel="canonical" href="${target}">
  <meta http-equiv="refresh" content="0; url=${target}">
  <link rel="icon" href="/tantalus-logo-square.png" sizes="48x48" type="image/png">
</head>
<body>
  <p><a href="${target}">Continue</a></p>
</body>
</html>
`;
  const fileName = path.join(routePath.slice(1), 'index.html');
  const filePath = toAbs(`dist/${fileName}`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html);
  console.log(`↪️  Static refresh stub: ${routePath} → ${target}`);
}

function assertPrerenderedPage(url, html) {
  const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*>/i);
  const hrefMatch = canonicalMatch && canonicalMatch[0].match(/href="([^"]+)"/i);
  const canonical = hrefMatch ? hrefMatch[1] : '';
  if (!canonical.startsWith(`${hostname}/`)) {
    throw new Error(`Bad canonical on ${url}: ${canonical || '(missing)'}`);
  }
  if (/index\.html/i.test(canonical) || canonical.includes('//#')) {
    throw new Error(`Unnormalized canonical on ${url}: ${canonical}`);
  }
  if (/<h1[^>]*>\s*404\s*<\/h1>/i.test(html)) {
    throw new Error(`Refusing to prerender a 404 document at ${url}`);
  }
  const expectedSelf = `${hostname}${url}`;
  const isShortService = /^\/services\/[^/]+\/$/.test(url);
  if (isShortService) {
    const slug = url.split('/')[2];
    const expected = `${hostname}/the-sea-to-sky/services/${slug}/`;
    if (canonical !== expected) {
      throw new Error(`Short URL ${url} canonical is ${canonical}, expected ${expected}`);
    }
  } else if (canonical !== expectedSelf) {
    throw new Error(`Expected self-canonical ${expectedSelf} on ${url}, got ${canonical}`);
  }
  if (html.includes('https://tantalusgeomatics.com/#') || html.includes('//#')) {
    throw new Error(`JSON-LD @id still uses the apex host or a double slash on ${url}`);
  }
}

// Hard-coded copy of the static paths in src/App.tsx. This list is not read
// from the router, so a new <Route> there must be added here too. Location,
// service, insight, and project routes come from the content files.
const STATIC_ROUTER_ROUTES = [
  '/',
  '/about/',
  '/services/',
  '/faq/',
  '/contact/',
  '/residential/',
  '/survey-pricing/',
  '/surveys-and-title-insurance/',
  '/subdivision/',
  '/topographic-surveys/',
  '/sea-to-sky-property-line-and-boundary-staking/',
];

function readValidLocations() {
  const text = fs.readFileSync(toAbs('src/config/locations.ts'), 'utf8');
  const match = text.match(/VALID_LOCATIONS\s*=\s*\[([\s\S]*?)\]/);
  if (!match) throw new Error('Could not parse VALID_LOCATIONS from src/config/locations.ts');
  return match[1]
    .split(',')
    .map((entry) => entry.replace(/['"\s]/g, ''))
    .filter((entry) => entry && entry !== 'asconst');
}

function nonEmptySlugs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && /\.(mdx|md)$/.test(dirent.name))
    .map((dirent) => dirent.name)
    .filter((name) => fs.statSync(path.join(dir, name)).size > 0)
    .map((name) => name.replace(/\.(mdx|md)$/, ''))
    .filter(isPublishableSlug);
}

function childDirectories(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function collectRenderableRoutes() {
  const routes = new Set(STATIC_ROUTER_ROUTES);
  const validLocations = new Set(readValidLocations());
  for (const location of validLocations) {
    routes.add(`/${location}/`);
  }

  const serviceSlugs = new Set();
  const servicesDir = toAbs('src/content/services');
  for (const location of childDirectories(servicesDir)) {
    if (!validLocations.has(location)) continue;
    for (const slug of nonEmptySlugs(path.join(servicesDir, location))) {
      routes.add(`/${location}/services/${slug}/`);
      serviceSlugs.add(slug);
    }
  }
  for (const slug of serviceSlugs) {
    routes.add(`/services/${slug}/`);
  }

  const nested = [
    ['blog', 'insights'],
    ['projects', 'projects'],
  ];
  for (const [folder, routePrefix] of nested) {
    const categoryDir = toAbs(`src/content/${folder}`);
    for (const slug of nonEmptySlugs(categoryDir)) {
      routes.add(`/${routePrefix}/${slug}/`);
    }
    for (const location of childDirectories(categoryDir)) {
      if (!validLocations.has(location)) continue;
      for (const slug of nonEmptySlugs(path.join(categoryDir, location))) {
        routes.add(`/${location}/${routePrefix}/${slug}/`);
      }
    }
  }

  return routes;
}

// The footer map is client-only. Its "Loading Interactive Map" line (with
// "...", a single "…", or no dots) is allowed. Every other "Loading" string
// is a placeholder that was saved too early.
function stripAllowedLoadingPlaceholder(text) {
  return String(text)
    .split('Loading Interactive Map...').join('')
    .split('Loading Interactive Map…').join('')
    .split('Loading Interactive Map').join('');
}

function reportHttpErrors(entries) {
  const firstPartyHosts = new Set([
    'localhost',
    '127.0.0.1',
    'tantalusgeomatics.com',
    'www.tantalusgeomatics.com',
  ]);

  function classify(raw) {
    let host = '(unparsed)';
    let path = raw;
    let search = '';
    try {
      const parsed = new URL(raw);
      host = parsed.hostname;
      path = parsed.pathname || '/';
      search = parsed.search;
    } catch {
      // Leave unparsed URLs in their own group.
    }
    let pattern = path
      .replace(/\/assets\/[^/]+/g, '/assets/*')
      .replace(/\/images\/[^/]+/g, '/images/*');
    if (!firstPartyHosts.has(host)) {
      pattern = pattern.replace(/\/[A-Za-z0-9_-]{16,}/g, '/*');
    }
    if (search) pattern += '?*';
    const ext = (path.split('.').pop() || '').toLowerCase();
    const isImage = /^(png|jpe?g|webp|gif|svg|avif|ico)$/.test(ext) || path.includes('/images/');
    return {
      host,
      pattern,
      isImage,
      firstParty: firstPartyHosts.has(host),
    };
  }

  const groups = new Map();
  for (const entry of entries) {
    const info = classify(entry.url);
    const key = `${entry.status}\t${info.host}\t${info.pattern}`;
    if (!groups.has(key)) {
      groups.set(key, { status: entry.status, ...info, count: 0, samples: [] });
    }
    const group = groups.get(key);
    group.count += 1;
    if (group.samples.length < 3 && !group.samples.includes(entry.url)) {
      group.samples.push(entry.url);
    }
  }

  const sorted = [...groups.values()].sort((a, b) => b.count - a.count || a.host.localeCompare(b.host));
  console.log(`\nHTTP 400/404 during prerender: ${entries.length} response(s), ${sorted.length} host/path group(s).`);
  for (const group of sorted) {
    const kind = !group.firstParty
      ? 'third-party'
      : group.isImage ? 'first-party image' : 'first-party';
    console.log(` - ${group.status} x${group.count} ${group.host} ${group.pattern} [${kind}]`);
    for (const sample of group.samples) console.log(`    e.g. ${sample}`);
  }
  const firstPartyResponses = entries.filter((entry) => {
    try { return firstPartyHosts.has(new URL(entry.url).hostname); } catch { return false; }
  });
  console.log(`First-party 400/404 responses: ${firstPartyResponses.length}`);
  fs.writeFileSync('/tmp/prerender-http-errors.json', JSON.stringify({
    total: entries.length,
    firstParty: firstPartyResponses.length,
    groups: sorted,
  }, null, 2));
}

function loadingPlaceholdersIn(html) {
  const text = stripAllowedLoadingPlaceholder(html);
  const found = new Set();
  for (const match of text.matchAll(/Loading(?:…|\.{2,}|[^.\u2026<"]{0,60})/g)) {
    const snippet = match[0].replace(/\s+/g, ' ').trim();
    if (snippet) found.add(snippet.slice(0, 80));
  }
  return [...found];
}

function builtPagesWithLoadingPlaceholders() {
  const hits = [];
  const distDir = toAbs('dist');
  function walk(dir) {
    for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, dirent.name);
      if (dirent.isDirectory()) walk(full);
      else if (dirent.name.endsWith('.html')) {
        const placeholders = loadingPlaceholdersIn(fs.readFileSync(full, 'utf8'));
        if (placeholders.length > 0) {
          hits.push({ file: path.relative(distDir, full), placeholders });
        }
      }
    }
  }
  if (fs.existsSync(distDir)) walk(distDir);
  return hits;
}

function collectSitemapRoutes() {
  const routes = new Set();
  const distDir = toAbs('dist');
  if (!fs.existsSync(distDir)) return routes;
  for (const name of fs.readdirSync(distDir)) {
    if (!/^sitemap-.+\.xml$/.test(name) || name === 'sitemap-index.xml') continue;
    const xml = fs.readFileSync(path.join(distDir, name), 'utf8');
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      let pathname = new URL(match[1]).pathname;
      if (!pathname.endsWith('/')) pathname += '/';
      routes.add(pathname);
    }
  }
  return routes;
}

function distIndexPath(routePath) {
  if (routePath === '/') return toAbs('dist/index.html');
  return toAbs(`dist${routePath}index.html`);
}

function missingPrerenderedRoutes(routes) {
  return [...routes].filter((routePath) => !fs.existsSync(distIndexPath(routePath))).sort();
}

const PAGE_HOSTS = new Set(['www.tantalusgeomatics.com', 'tantalusgeomatics.com']);

function internalPagePath(href) {
  const raw = String(href || '').trim();
  if (!raw || raw.startsWith('#') || /^(mailto:|tel:|sms:|javascript:)/i.test(raw)) return null;
  let url;
  try {
    url = new URL(raw, 'https://www.tantalusgeomatics.com');
  } catch {
    return null;
  }
  if (!PAGE_HOSTS.has(url.hostname)) return null;
  let pathname = decodeURIComponent(url.pathname).replace(/\/{2,}/g, '/');
  const leaf = pathname.split('/').pop() || '';
  if (/\.[a-z0-9]{1,8}$/i.test(leaf) && !/^index\.html$/i.test(leaf)) return null;
  if (pathname === '/index.html') return '/';
  pathname = pathname.replace(/\/index\.html$/i, '/');
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  if (!pathname.endsWith('/')) pathname += '/';
  return pathname;
}

function internalHrefsMissingPages() {
  const missing = new Map();
  const distDir = toAbs('dist');
  const htmlFiles = [];
  function walk(dir) {
    for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, dirent.name);
      if (dirent.isDirectory()) walk(full);
      else if (dirent.name.endsWith('.html')) htmlFiles.push(full);
    }
  }
  if (fs.existsSync(distDir)) walk(distDir);

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const source = path.relative(distDir, file);
    for (const match of html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)) {
      const routePath = internalPagePath(match[1]);
      if (!routePath) continue;
      if (fs.existsSync(distIndexPath(routePath))) continue;
      if (!missing.has(routePath)) missing.set(routePath, new Set());
      missing.get(routePath).add(source);
    }
  }
  return [...missing.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

const routesToPrerender = generateRouteMatrix();

async function generate() {
  console.log('🚀 Starting multi-index static site generation pipeline...');
  console.log(`📍 Found ${routesToPrerender.length} total URLs across all content clusters.`);

  fs.copyFileSync(toAbs('dist/index.html'), toAbs('dist/shell.html'));

  const app = express();
  app.use(express.static(toAbs('dist')));
  app.use((req, res) => res.sendFile(toAbs('dist/shell.html')));

  const server = app.listen(3000, async () => {
    console.log('✅ Local server running on port 3000.');
    
    let browser;
    try {
      browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
      });
      console.log('✅ Headless Chrome launched.');
    } catch (err) {
      console.error('❌ Puppeteer launch failed:', err.message);
      server.close();
      process.exit(1);
    }

    const critters = new Critters({
      path: toAbs('dist'),
      publicPath: '/',
      preload: 'media',
    });

    const failedRoutes = [];
    const httpErrors = [];
    // Puppeteer reports waitForFunction as "Waiting failed: 45000ms exceeded".
    const isTimeout = (err) => /timeout|timed out|exceeded/i.test(String(err && (err.message || err)));

    async function prerenderRoute(url) {
      const page = await browser.newPage();
      try {
        page.on('console', msg => {
          if (msg.type() === 'error') console.log(`[Browser Error]: ${msg.text()}`);
        });
        page.on('pageerror', err => console.error(`[React Crash]:`, err.toString()));
        page.on('response', (response) => {
          const status = response.status();
          if (status === 400 || status === 404) {
            httpErrors.push({ status, url: response.url(), page: url });
          }
        });

        await page.evaluateOnNewDocument(() => {
          window.__IS_PRERENDERING = true;
        });

        // domcontentloaded, then the heading and the lazy FAQ and quote form.
        // networkidle0 drops a finished page when a third-party request never
        // goes idle (the 2026-09-17 Sechelt timeout). Waiting only for the
        // first h1 saves the page while those chunks still say "Loading...".
        await page.goto(`http://localhost:3000${url}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForFunction(() => {
          const root = document.querySelector('#root');
          if (!root) return false;
          const heading = root.querySelector('h1');
          if (!heading || !heading.textContent || !heading.textContent.trim()) return false;
          let text = root.innerText || '';
          text = text.split('Loading Interactive Map...').join('')
            .split('Loading Interactive Map…').join('')
            .split('Loading Interactive Map').join('');
          if (text.includes('Loading')) return false;
          return true;
        }, { timeout: 45000 });

        await page.evaluate(() => {
          const removeDuplicates = (selector) => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 1) {
              for (let i = 1; i < elements.length; i++) elements[i].remove();
            }
          };
          removeDuplicates('title');
          removeDuplicates('meta[name="description"]');
          removeDuplicates('link[rel="canonical"]');
        });

        const html = await page.content();
        assertPrerenderedPage(url, html);
        const inlinedHtml = await critters.process(html);
        const fileName = url === '/' ? 'index.html' : path.join(url.slice(1), 'index.html');
        const filePath = toAbs(`dist/${fileName}`);

        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, inlinedHtml);
        console.log(`📸 Prerendered & Inlined CSS: ${url}`);
      } finally {
        await page.close();
      }
    }

    try {
      for (const url of routesToPrerender) {
        try {
          await prerenderRoute(url);
        } catch (innerError) {
          if (isTimeout(innerError)) {
            console.error(`⏱️ Timeout on ${url}; retrying once.`);
            try {
              await prerenderRoute(url);
              continue;
            } catch (retryError) {
              console.error(`❌ Prerender failed on path ${url}:`, retryError.message);
              failedRoutes.push({ url, message: retryError.message });
              continue;
            }
          }
          console.error(`❌ Prerender failed on path ${url}:`, innerError.message);
          failedRoutes.push({ url, message: innerError.message });
        }
      }

      for (const stub of REDIRECT_STUBS) {
        writeRedirectStub(stub.path, stub.target);
      }

      // 3. Write individual structural child sitemaps. An empty feed is not
      // written, and a leftover file from an earlier build is removed.
      const today = new Date().toISOString().split('T')[0];
      Object.entries(sitemapFeeds).forEach(([feedKey, urls]) => {
        const childPath = toAbs(`dist/sitemap-${feedKey}.xml`);
        if (urls.length === 0) {
          if (fs.existsSync(childPath)) fs.unlinkSync(childPath);
          return;
        }
        
        let childSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        urls.forEach(url => {
          childSitemap += `  <url>\n    <loc>${hostname}${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`;
        });
        childSitemap += `</urlset>`;
        
        fs.writeFileSync(childPath, childSitemap);
        console.log(`🗺️ Generated child sitemap: dist/sitemap-${feedKey}.xml (${urls.length} URLs)`);
      });

      // 4. Generate the master index shell wrapper
      let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
      Object.keys(sitemapFeeds).forEach(feedKey => {
        if (sitemapFeeds[feedKey].length === 0) return;
        sitemapIndex += `  <sitemap>\n    <loc>${hostname}/sitemap-${feedKey}.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n`;
      });
      sitemapIndex += `</sitemapindex>`;
      
      fs.writeFileSync(toAbs('dist/sitemap-index.xml'), sitemapIndex);
      console.log(`🗂️ Master sitemap index generated successfully at dist/sitemap-index.xml`);

    } catch (error) {
      console.error('❌ Error during compilation runs:', error);
      failedRoutes.push({ url: '(prerender)', message: error.message });
    } finally {
      await browser.close();
      server.close();
      if (fs.existsSync(toAbs('dist/shell.html'))) fs.unlinkSync(toAbs('dist/shell.html'));
      console.log('🛑 Headless Chrome closed. Prerendering complete.');
    }

    const expectedRoutes = new Set([
      ...collectRenderableRoutes(),
      ...collectSitemapRoutes(),
    ]);
    const missingRoutes = missingPrerenderedRoutes(expectedRoutes);
    const missingLinks = internalHrefsMissingPages();

    if (failedRoutes.length > 0) {
      console.error(`\nPrerender failed on ${failedRoutes.length} route(s):`);
      for (const failure of failedRoutes) {
        console.error(` - ${failure.url}: ${failure.message}`);
      }
    }
    if (missingRoutes.length > 0) {
      console.error(`\nRoute coverage failed on ${missingRoutes.length} route(s) with no dist page:`);
      for (const routePath of missingRoutes) {
        console.error(` - ${routePath}`);
      }
    }
    if (missingLinks.length > 0) {
      console.error(`\nInternal links point at ${missingLinks.length} URL(s) with no prerendered page:`);
      for (const [routePath, sources] of missingLinks) {
        const sample = [...sources].slice(0, 3).join(', ');
        console.error(` - ${routePath} (from ${sample})`);
      }
    }
    const loadingPages = builtPagesWithLoadingPlaceholders();
    if (loadingPages.length > 0) {
      console.error(`\nLoading placeholder left in ${loadingPages.length} built page(s):`);
      for (const hit of loadingPages) {
        console.error(` - ${hit.file}: ${hit.placeholders.join(', ')}`);
      }
    }
    if (failedRoutes.length > 0 || missingRoutes.length > 0 || missingLinks.length > 0 || loadingPages.length > 0) {
      process.exit(1);
    }
    console.log(`Route coverage ok: ${expectedRoutes.size} renderable and sitemap URLs have a prerendered page.`);
    console.log('Loading placeholders: 0');
    reportHttpErrors(httpErrors);

    if (INDEXNOW_KEY) {
      fs.writeFileSync(toAbs(`dist/${INDEXNOW_KEY}.txt`), INDEXNOW_KEY);
      await notifyIndexNow(routesToPrerender);
    }
  });
}

async function notifyIndexNow(urls) {
  const host = 'www.tantalusgeomatics.com';
  const payload = {
    host: host,
    key: INDEXNOW_KEY,
    keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
    urlList: urls.map(url => `${hostname}${url}`)
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    if (response.ok) console.log('🚀 IndexNow notifications issued smoothly!');
  } catch (e) {
    console.error('❌ IndexNow transmission fault:', e);
  }
}

generate();