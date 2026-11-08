/**
 * Build check for pilot local sections (src/content/local only).
 * Base templates are not scanned: many of them already use wording this
 * check rejects.
 *
 * Fails when a local file contains [VERIFY] or [CONFIRM], or the approved
 * banned set and its inflections: seamless, seamlessly, ensure, guarantee,
 * best, leading, premier, expert.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const BANNED_WORDS = [
  'seamless',
  'seamlessly',
  'ensure',
  'ensures',
  'ensured',
  'ensuring',
  'guarantee',
  'guarantees',
  'guaranteed',
  'guaranteeing',
  'best',
  'leading',
  'premier',
  'expert',
  'experts',
  'expertly',
];

const BANNED_PATTERN = new RegExp(`\\b(?:${BANNED_WORDS.join('|')})\\b`, 'gi');
const MARKER_PATTERN = /\[(?:VERIFY|CONFIRM)\]/i;

export function problemsInLocalText(text, label = 'local section') {
  const failures = [];
  if (MARKER_PATTERN.test(text)) {
    failures.push(`${label}: contains [VERIFY] or [CONFIRM]`);
  }
  const hits = new Set();
  for (const match of text.matchAll(BANNED_PATTERN)) {
    hits.add(match[0].toLowerCase());
  }
  if (hits.size > 0) {
    failures.push(`${label}: banned wording in local section: ${[...hits].sort().join(', ')}`);
  }
  return failures;
}

function walkMdx(dir, found = []) {
  if (!fs.existsSync(dir)) return found;
  for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, dirent.name);
    if (dirent.isDirectory()) walkMdx(full, found);
    else if (/\.mdx?$/.test(dirent.name)) found.push(full);
  }
  return found;
}

export function localSectionProblems(rootDir) {
  const localRoot = path.join(rootDir, 'src/content/local');
  const failures = [];
  for (const file of walkMdx(localRoot)) {
    const text = fs.readFileSync(file, 'utf8');
    const label = path.relative(rootDir, file);
    failures.push(...problemsInLocalText(text, label));
  }
  return failures;
}

const isDirectRun = process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const failures = localSectionProblems(rootDir);
  if (failures.length > 0) {
    console.error('Local section check failed:');
    for (const failure of failures) console.error(` - ${failure}`);
    process.exit(1);
  }
  console.log('Local sections are clear of [VERIFY], [CONFIRM], and banned wording.');
}
