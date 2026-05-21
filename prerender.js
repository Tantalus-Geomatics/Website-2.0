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

const routesToPrerender = [
  '/', '/about/', '/services/', '/faq/', '/contact/', 
  '/residential/', '/survey-pricing/', '/topographic-surveys/', 
  '/sea-to-sky-property-line-and-boundary-staking/', 
  '/surveys-and-title-insurance/', '/subdivisions/'
];

async function generate() {
  console.log('🚀 Starting true static site generation pipeline...');

  // 1. Boot up a temporary local server to serve your compiled SPA
  const app = express();
  app.use(express.static(toAbs('dist')));
  
  // Catch-all route to serve the SPA shell so React Router can process sub-routes
  app.use((req, res) => {
    res.sendFile(toAbs('dist/index.html'));
  });

  const server = app.listen(3000, async () => {
    console.log('✅ Local server running on port 3000.');
    
    let browser;
    try {
      // 2. Launch the Headless Browser
      browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required for GitHub Actions
      });
      console.log('✅ Headless Chrome launched.');
    } catch (err) {
      console.error('❌ Puppeteer failed to launch. (If running locally, this is because we skipped the download. It will work in GitHub Actions.)');
      server.close();
      return;
    }

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    try {
      // 3. Visit each route, wait for React to load, and scrape the HTML
      for (const url of routesToPrerender) {
        const page = await browser.newPage();
        
        // waitUntil: 'networkidle0' ensures React has completely finished injecting the <SEO> tags and content
        await page.goto(`http://localhost:3000${url}`, { waitUntil: 'networkidle0' });

        // Grab the FULLY RENDERED HTML
        const html = await page.content();

        // Save the HTML to the correct directory (e.g., dist/about/index.html)
        const fileName = url === '/' ? 'index.html' : path.join(url.slice(1), 'index.html');
        const filePath = toAbs(`dist/${fileName}`);
        
        if (url !== '/') {
          fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }
        
        fs.writeFileSync(filePath, html);
        console.log(`📸 Prerendered: ${url}`);
        
        await page.close();

        // Add to Sitemap string
        sitemap += `  <url>\n    <loc>${hostname}${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n  </url>\n`;
      }
    } catch (error) {
      console.error('❌ Error during prerendering:', error);
    } finally {
      // 4. Clean up and close everything
      await browser.close();
      server.close();
      console.log('🛑 Headless Chrome closed. Prerendering complete.');
    }

    // 5. Finalize Sitemap & IndexNow
    sitemap += `</urlset>`;
    fs.writeFileSync(toAbs('dist/sitemap.xml'), sitemap);
    console.log(`🗺️ Sitemap generated successfully.`);

    // AUTOMATIC VERIFICATION FILE
    if (INDEXNOW_KEY) {
      fs.writeFileSync(toAbs(`dist/${INDEXNOW_KEY}.txt`), INDEXNOW_KEY);
      console.log(`✅ Verification file ${INDEXNOW_KEY}.txt created.`);
      
      // PING THE API
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