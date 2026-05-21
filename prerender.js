import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  const template = fs.readFileSync(toAbs('dist/index.html'), 'utf-8');
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const url of routesToPrerender) {
    const fileName = url === '/' ? 'index.html' : `${url.slice(1)}/index.html`;
    const filePath = toAbs(`dist/${fileName}`);
    if (url !== '/') fs.mkdirSync(path.dirname(filePath), { recursive: true });
    
    fs.writeFileSync(filePath, template);
    sitemap += `  <url>\n    <loc>${hostname}${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n  </url>\n`;
  }

  sitemap += `</urlset>`;
  fs.writeFileSync(toAbs('dist/sitemap.xml'), sitemap);
  console.log(`Sitemap generated.`);

  // 2. AUTOMATIC VERIFICATION FILE
  // This creates the [key].txt file Bing needs to see at the root
  if (INDEXNOW_KEY) {
    fs.writeFileSync(toAbs(`dist/${INDEXNOW_KEY}.txt`), INDEXNOW_KEY);
    console.log(`✅ Verification file ${INDEXNOW_KEY}.txt created.`);
    
    // 3. PING THE API
    await notifyIndexNow(routesToPrerender);
  }
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
    if (response.ok) console.log('🚀 IndexNow notification sent!');
  } catch (e) {
    console.error('❌ IndexNow failed', e);
  }
}

generate();