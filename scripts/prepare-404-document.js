import fs from 'node:fs';

const src = 'dist/index.html';
const dest = 'dist/404.html';

if (!fs.existsSync(src)) {
  console.error('dist/index.html is missing; cannot prepare 404.html');
  process.exit(1);
}

let html = fs.readFileSync(src, 'utf8');

// The 404 document is a copy of the homepage. It must not canonicalize to /.
html = html.replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi, '');
html = html.replace(/<meta\b[^>]*\bproperty=["']og:url["'][^>]*>/gi, '');
// Drop the app bundle so hydration cannot write the homepage canonical back in.
html = html.replace(/<script\b[^>]*\bsrc=["'][^"']*\/assets\/[^"']+["'][^>]*>\s*<\/script>/gi, '');
html = html.replace(/<link\b[^>]*\brel=["']modulepreload["'][^>]*>/gi, '');

if (!/name=["']robots["']/i.test(html)) {
  html = html.replace(/<head([^>]*)>/i, '<head$1>\n    <meta name="robots" content="noindex">');
}

if (/rel=["']canonical["']/i.test(html)) {
  console.error('404.html still contains a canonical');
  process.exit(1);
}
if (!html.includes('name="robots" content="noindex"') && !html.includes("name='robots' content='noindex'")) {
  console.error('404.html is missing noindex');
  process.exit(1);
}

fs.writeFileSync(dest, html);
console.log('Prepared dist/404.html with no canonical and noindex');
