import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbs = (p) => path.resolve(__dirname, p);

const hostname = 'https://www.tantalusgeomatics.com';

const routesToPrerender = [
  '/',
  '/about',
  '/services',
  '/faq',
  '/contact',
  '/residential',
  '/survey-pricing',
  '/topographic-surveys',
  '/sea-to-sky-property-line-and-boundary-staking'
];

async function generate() {
  // 1. Read the template index.html produced by the build
  const template = fs.readFileSync(toAbs('dist/index.html'), 'utf-8');

  // 2. Start the Sitemap XML string
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const url of routesToPrerender) {
    // --- Pre-render the HTML files ---
    const fileName = url === '/' ? 'index.html' : `${url.slice(1)}/index.html`;
    const filePath = toAbs(`dist/${fileName}`);

    if (url !== '/') {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    fs.writeFileSync(filePath, template);
    console.log(`pre-rendered: ${url}`);

    // --- Add to Sitemap string ---
    sitemap += `  <url>\n    <loc>${hostname}${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n  </url>\n`;
  }

  // 3. Close and Save the Sitemap
  sitemap += `</urlset>`;
  fs.writeFileSync(toAbs('dist/sitemap.xml'), sitemap);
  console.log(`Sitemap generated with ${routesToPrerender.length} pages.`);
}

generate();