/**
 * Fail the build when a sitemap page's meta description is missing, the wrong
 * length, truncated, duplicated, or uses wording we do not publish.
 * Reads the prerendered HTML under dist/ and the child sitemaps.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');
const MIN_LENGTH = 133;
const MAX_LENGTH = 160;
const FORBIDDEN = [
  'P.Eng. firm',
  'certified',
  'Tantalus Geomatics, BCLS',
  'millimeter',
  'millimetre',
];

function decode(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number(num)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function metaContent(html, attr, expected) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const attrMatch = tag.match(new RegExp(`\\b${attr}\\s*=\\s*(["'])${expected}\\1`, 'i'));
    if (!attrMatch) continue;
    const content = tag.match(/\bcontent\s*=\s*(["'])([\s\S]*?)\1/i);
    if (!content) return '';
    return decode(content[2]);
  }
  return null;
}

function sitemapPaths() {
  const paths = [];
  if (!fs.existsSync(DIST)) {
    throw new Error(`dist/ is missing. Run the prerender build before check:meta.`);
  }
  for (const name of fs.readdirSync(DIST)) {
    if (!/^sitemap-.+\.xml$/.test(name) || name === 'sitemap-index.xml') continue;
    const xml = fs.readFileSync(path.join(DIST, name), 'utf8');
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      let pathname = new URL(match[1]).pathname;
      if (!pathname.endsWith('/')) pathname += '/';
      paths.push(pathname);
    }
  }
  return [...new Set(paths)].sort();
}

function htmlFile(routePath) {
  if (routePath === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, routePath.slice(1), 'index.html');
}

function truncationProblem(text) {
  const trimmed = text.trim();
  if (trimmed.endsWith('...') || trimmed.endsWith('…')) return 'ends with an ellipsis';
  if (/[A-Za-z0-9]$/.test(trimmed)) return 'cut mid-word';
  if (/[A-Za-z]-$/.test(trimmed)) return 'cut mid-word';
  return null;
}

function forbiddenHit(text) {
  const lower = text.toLowerCase();
  return FORBIDDEN.find((phrase) => lower.includes(phrase.toLowerCase())) || null;
}

const failures = [];
const routes = sitemapPaths();
if (routes.length === 0) {
  console.error('No sitemap URLs found in dist/.');
  process.exit(1);
}

const byDescription = new Map();
const lengths = [];

for (const routePath of routes) {
  const file = htmlFile(routePath);
  if (!fs.existsSync(file)) {
    failures.push(`${routePath}: prerendered HTML is missing`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const description = metaContent(html, 'name', 'description');
  const ogDescription = metaContent(html, 'property', 'og:description');

  if (description == null || description.trim() === '') {
    failures.push(`${routePath}: meta description is missing`);
    continue;
  }
  if (ogDescription !== description) {
    failures.push(`${routePath}: og:description does not match the meta description`);
  }

  const length = description.length;
  lengths.push(length);
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    failures.push(`${routePath}: length ${length} is outside ${MIN_LENGTH}-${MAX_LENGTH}`);
  }
  const truncated = truncationProblem(description);
  if (truncated) failures.push(`${routePath}: truncated (${truncated})`);
  const banned = forbiddenHit(description);
  if (banned) failures.push(`${routePath}: contains "${banned}"`);

  if (!byDescription.has(description)) byDescription.set(description, []);
  byDescription.get(description).push(routePath);
}

let duplicateGroups = 0;
for (const [description, pages] of byDescription) {
  if (pages.length < 2) continue;
  duplicateGroups += 1;
  failures.push(`duplicate description on ${pages.join(', ')}: ${description}`);
}

const min = lengths.length ? Math.min(...lengths) : 0;
const max = lengths.length ? Math.max(...lengths) : 0;
console.log(`Checked ${routes.length} descriptions`);
console.log(`min ${min} max ${max}`);
console.log(`duplicates ${duplicateGroups}`);

if (failures.length) {
  console.error(`\n${failures.length} meta description problem(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Meta descriptions passed.');
