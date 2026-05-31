import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbs = (p) => path.resolve(__dirname, p);

const hostname = 'https://www.tantalusgeomatics.com';

// 1. Read the key from the environment (GitHub Secret)
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

// 2. Dynamically discover routes based on your localized MDX content structure
function getDynamicRoutes() {
  // Start with your core static hubs and pages
  const routes = [
    '/', '/about/', '/services/', '/faq/', '/contact/'
  ];

  const contentDir = toAbs('src/content');
  
  if (!fs.existsSync(contentDir)) {
    console.warn(`⚠️ Content directory not found at ${contentDir}. Only static routes will be prerendered.`);
    return routes;
  }

  // Helper to scan a specific content category (e.g., 'services', 'blog', 'projects')
  function scanCategory(categoryFolder, routePrefix) {
    const categoryPath = path.join(contentDir, categoryFolder);
    if (!fs.existsSync(categoryPath)) return;

    // Read location folders (squamish, whistler, pemberton, etc.)
    const locations = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const location of locations) {
      const locationPath = path.join(categoryPath, location);
      
      // Read the actual MDX files inside the location folder
      const files = fs.readdirSync(locationPath)
        .filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

      for (const file of files) {
        const slug = file.replace(/\.(mdx|md)$/, '');
        // Generates the localized route (e.g., /squamish/services/topographic-surveys/)
        routes.push(`/${location}/${routePrefix}/${slug}/`);
      }
    }
  }

  // Scan your content directories and map them to their URL prefixes
  scanCategory('services', 'services');
  scanCategory('blog', 'insights');     // Maps src/content/blog -> /location/insights/slug
  scanCategory('projects', 'projects');

  // Filter out any potential duplicates just in case
  return [...new Set(routes)];
}

const routesToPrerender = getDynamicRoutes();

async function generate() {
  console.log('🚀 Starting true static site generation pipeline...');
  console.log(`📍 Found ${routesToPrerender.length} routes to prerender.`);

  // 1. Create a safe shell so we don't cause duplicate tags
  fs.copyFileSync(toAbs('dist/index.html'), toAbs('dist/shell.html'));

  const app = express();
  app.use(express.static(toAbs('dist')));
  
  // Catch-all route to serve the SPA shell
  app.use((req, res) => {
    res.sendFile(toAbs('dist/shell.html'));
  });

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
      console.error('❌ Puppeteer failed to launch. (If local, download was skipped).');
      server.close();
      return;
    }

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    try {
      for (const url of routesToPrerender) {
        const page = await browser.newPage();
        
        // Listen for any React crashes inside the headless browser
        page.on('console', msg => {
          if (msg.type() === 'error') console.log(`[Browser Error]: ${msg.text()}`);
        });
        page.on('pageerror', err => console.error(`[React Crash]:`, err.toString()));

        // Inject the secret signal to hide Google Maps & Turnstile
        await page.evaluateOnNewDocument(() => {
          window.__IS_PRERENDERING = true;
        });
        
        await page.goto(`http://localhost:3000${url}`, { waitUntil: 'networkidle0' });

        // Wait for React to physically paint the DOM
        try {
          await page.waitForSelector('#root > div', { timeout: 10000 });
        } catch (e) {
          console.error(`⚠️ React took too long or failed to render on ${url}.`);
        }

        // Force cleanup of duplicate SEO tags
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

        // Grab the FULLY RENDERED HTML
        const html = await page.content();

        // Save the HTML (Ensure directories are created for localized routes)
        const fileName = url === '/' ? 'index.html' : path.join(url.slice(1), 'index.html');
        const filePath = toAbs(`dist/${fileName}`);
        
        if (url !== '/') fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, html);
        console.log(`📸 Prerendered: ${url}`);
        
        await page.close();

        // Add to Sitemap
        sitemap += `  <url>\n    <loc>${hostname}${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n  </url>\n`;
      }
    } catch (error) {
      console.error('❌ Error during prerendering:', error);
    } finally {
      await browser.close();
      server.close();
      if (fs.existsSync(toAbs('dist/shell.html'))) fs.unlinkSync(toAbs('dist/shell.html'));
      console.log('🛑 Headless Chrome closed. Prerendering complete.');
    }

    sitemap += `</urlset>`;
    fs.writeFileSync(toAbs('dist/sitemap.xml'), sitemap);
    console.log(`🗺️ Sitemap generated successfully with ${routesToPrerender.length} URLs.`);

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
    if (response.ok) console.log('🚀 IndexNow notification sent successfully!');
  } catch (e) {
    console.error('❌ IndexNow failed', e);
  }
}

generate();