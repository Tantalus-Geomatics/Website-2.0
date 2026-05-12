import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbs = (p) => path.resolve(__dirname, p);

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

  for (const url of routesToPrerender) {
    const fileName = url === '/' ? 'index.html' : `${url.slice(1)}/index.html`;
    const filePath = toAbs(`dist/${fileName}`);

    // Create directories if they don't exist (e.g., dist/about/)
    if (url !== '/') {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    // On GitHub Pages, we can just use the index.html template 
    // and the 404 logic. For true SSG, we write the template 
    // to every sub-folder.
    fs.writeFileSync(filePath, template);
    console.log(`pre-rendered: ${url}`);
  }
}

generate();