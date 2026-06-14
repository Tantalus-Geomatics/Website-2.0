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
  pages: ['/', '/about/', '/services/', '/faq/', '/contact/', '/residential/', '/survey-pricing/', '/surveys-and-title-insurance/', '/subdivision/'],
  services: [],
  blog: [],
  projects: []
};

const CORE_LOCATIONS = [
  'squamish',
  'whistler',
  'pemberton',
  'lillooet',
  'west-vancouver',
  'bowen-island',
  'britannia-beach',
  'furry-creek',
  'north-vancouver',
  'gibsons',
  'sechelt',
  'powell-river',
  'the-sea-to-sky'
];

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

  function scanCategory(categoryFolder, routePrefix, feedKey) {
    const categoryPath = path.join(contentDir, categoryFolder);
    if (!fs.existsSync(categoryPath)) return;

    // Read location subdirectories (squamish, whistler, etc.)
    const locations = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const location of locations) {
      // Push the base location path into sitemapFeeds.pages
      sitemapFeeds.pages.push(`/${location}/`);

      const locationPath = path.join(categoryPath, location);
      const files = fs.readdirSync(locationPath)
        .filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

      for (const file of files) {
        const slug = file.replace(/\.(mdx|md)$/, '');
        
        // A. Add the root-level, non-localized fallback version of this content
        sitemapFeeds[feedKey].push(`/${routePrefix}/${slug}/`);
        
        // B. Add the fully localized regional path matrix version
        sitemapFeeds[feedKey].push(`/${location}/${routePrefix}/${slug}/`);
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
    ...sitemapFeeds.projects
  ];
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
      return;
    }

    const critters = new Critters({
      path: toAbs('dist'),
      publicPath: '/',
      preload: 'media',
    });

    try {
      for (const url of routesToPrerender) {
        let page;
        try {
          page = await browser.newPage();
          
          page.on('console', msg => {
            if (msg.type() === 'error') console.log(`[Browser Error]: ${msg.text()}`);
          });
          page.on('pageerror', err => console.error(`[React Crash]:`, err.toString()));

          await page.evaluateOnNewDocument(() => {
            window.__IS_PRERENDERING = true;
          });
          
          await page.goto(`http://localhost:3000${url}`, { waitUntil: 'networkidle0' });

          try {
            await page.waitForSelector('#root > div', { timeout: 10000 });
          } catch (e) {
            console.error(`⚠️ React render timeout on path: ${url}`);
          }

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
          const inlinedHtml = await critters.process(html);
          const fileName = url === '/' ? 'index.html' : path.join(url.slice(1), 'index.html');
          const filePath = toAbs(`dist/${fileName}`);
          
          fs.mkdirSync(path.dirname(filePath), { recursive: true });
          fs.writeFileSync(filePath, inlinedHtml);
          console.log(`📸 Prerendered & Inlined CSS: ${url}`);
          
          await page.close();
        } catch (innerError) {
          console.error(`❌ Prerender failed on path ${url}:`, innerError.message);
          if (page) {
            await page.close();
          }
          continue;
        }
      }

      // 3. Write individual structural child sitemaps
      const today = new Date().toISOString().split('T')[0];
      Object.entries(sitemapFeeds).forEach(([feedKey, urls]) => {
        if (urls.length === 0) return;
        
        let childSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        urls.forEach(url => {
          childSitemap += `  <url>\n    <loc>${hostname}${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`;
        });
        childSitemap += `</urlset>`;
        
        const childPath = `dist/sitemap-${feedKey}.xml`;
        fs.writeFileSync(toAbs(childPath), childSitemap);
        console.log(`🗺️ Generated child sitemap: ${childPath} (${urls.length} URLs)`);
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
    } finally {
      await browser.close();
      server.close();
      if (fs.existsSync(toAbs('dist/shell.html'))) fs.unlinkSync(toAbs('dist/shell.html'));
      console.log('🛑 Headless Chrome closed. Prerendering complete.');
    }

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