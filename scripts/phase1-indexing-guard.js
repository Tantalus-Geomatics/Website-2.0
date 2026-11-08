/**
 * Approved trim boundaries for the phase 1 noindex build.
 * Generated from the Nov 7, 2026 trim list. prerender.js fails the build
 * when the live policy, sitemap, IndexNow list, or HTML disagree with this.
 * Pilot, control, Sea to Sky, Squamish, and phase 2 pages stay indexable.
 */
import fs from 'node:fs';
import path from 'node:path';

export const EXPECTED_PHASE1_COUNT = 140;

export const PHASE1_PATHS = [
  '/bowen-island/services/air-space-subdivision-surveys/',
  '/bowen-island/services/bare-land-strata-surveys/',
  '/bowen-island/services/block-outline-surveys/',
  '/bowen-island/services/building-strata-surveys/',
  '/bowen-island/services/consolidation-surveys/',
  '/bowen-island/services/easement-surveys/',
  '/bowen-island/services/excavation-layout-surveys/',
  '/bowen-island/services/infrastructure-layout-and-construction-surveys/',
  '/bowen-island/services/phased-strata-surveys/',
  '/bowen-island/services/road-surveys/',
  '/bowen-island/services/statutory-rights-of-way-surveys/',
  '/bowen-island/services/strata-plan-amendment-surveys/',
  '/bowen-island/services/terrestrial-lidar-scanning/',
  '/britannia-beach/services/3d-settlement-monitoring/',
  '/britannia-beach/services/air-space-subdivision-surveys/',
  '/britannia-beach/services/block-outline-surveys/',
  '/britannia-beach/services/building-strata-surveys/',
  '/britannia-beach/services/consolidation-surveys/',
  '/britannia-beach/services/covenant-surveys/',
  '/britannia-beach/services/easement-surveys/',
  '/britannia-beach/services/environmental-and-riparian-surveys/',
  '/britannia-beach/services/excavation-layout-surveys/',
  '/britannia-beach/services/gridline-and-construction-layout-surveys/',
  '/britannia-beach/services/infrastructure-layout-and-construction-surveys/',
  '/britannia-beach/services/phased-strata-surveys/',
  '/britannia-beach/services/statutory-rights-of-way-surveys/',
  '/britannia-beach/services/strata-plan-amendment-surveys/',
  '/britannia-beach/services/terrestrial-lidar-scanning/',
  '/britannia-beach/services/uav-mapping/',
  '/britannia-beach/services/volume-and-earthwork-surveys/',
  '/city-north-vancouver/services/bare-land-strata-surveys/',
  '/city-north-vancouver/services/block-outline-surveys/',
  '/city-north-vancouver/services/environmental-and-riparian-surveys/',
  '/city-north-vancouver/services/natural-boundary-surveys/',
  '/city-north-vancouver/services/phased-strata-surveys/',
  '/city-north-vancouver/services/strata-plan-amendment-surveys/',
  '/city-north-vancouver/services/subdivisions-surveys/',
  '/district-north-vancouver/services/air-space-subdivision-surveys/',
  '/district-north-vancouver/services/bare-land-strata-surveys/',
  '/district-north-vancouver/services/block-outline-surveys/',
  '/district-north-vancouver/services/covenant-surveys/',
  '/district-north-vancouver/services/easement-surveys/',
  '/district-north-vancouver/services/phased-strata-surveys/',
  '/district-north-vancouver/services/terrestrial-lidar-scanning/',
  '/district-north-vancouver/services/volume-and-earthwork-surveys/',
  '/furry-creek/services/air-space-subdivision-surveys/',
  '/furry-creek/services/bare-land-strata-surveys/',
  '/furry-creek/services/building-strata-surveys/',
  '/furry-creek/services/covenant-surveys/',
  '/furry-creek/services/easement-surveys/',
  '/furry-creek/services/environmental-and-riparian-surveys/',
  '/furry-creek/services/gridline-and-construction-layout-surveys/',
  '/furry-creek/services/infrastructure-layout-and-construction-surveys/',
  '/furry-creek/services/phased-strata-surveys/',
  '/furry-creek/services/road-surveys/',
  '/furry-creek/services/statutory-rights-of-way-surveys/',
  '/furry-creek/services/strata-plan-amendment-surveys/',
  '/furry-creek/services/uav-mapping/',
  '/furry-creek/services/volume-and-earthwork-surveys/',
  '/gibsons/services/3d-settlement-monitoring/',
  '/gibsons/services/air-space-subdivision-surveys/',
  '/gibsons/services/bare-land-strata-surveys/',
  '/gibsons/services/block-outline-surveys/',
  '/gibsons/services/building-strata-surveys/',
  '/gibsons/services/consolidation-surveys/',
  '/gibsons/services/excavation-layout-surveys/',
  '/gibsons/services/form-and-foundation-surveys/',
  '/gibsons/services/infrastructure-layout-and-construction-surveys/',
  '/gibsons/services/phased-strata-surveys/',
  '/gibsons/services/road-surveys/',
  '/gibsons/services/statutory-rights-of-way-surveys/',
  '/gibsons/services/strata-plan-amendment-surveys/',
  '/gibsons/services/terrestrial-lidar-scanning/',
  '/gibsons/services/volume-and-earthwork-surveys/',
  '/lillooet/services/3d-settlement-monitoring/',
  '/lillooet/services/bare-land-strata-surveys/',
  '/lillooet/services/block-outline-surveys/',
  '/lillooet/services/building-strata-surveys/',
  '/lillooet/services/consolidation-surveys/',
  '/lillooet/services/covenant-surveys/',
  '/lillooet/services/easement-surveys/',
  '/lillooet/services/environmental-and-riparian-surveys/',
  '/lillooet/services/excavation-layout-surveys/',
  '/lillooet/services/gridline-and-construction-layout-surveys/',
  '/lillooet/services/infrastructure-layout-and-construction-surveys/',
  '/lillooet/services/statutory-rights-of-way-surveys/',
  '/lillooet/services/strata-plan-amendment-surveys/',
  '/lillooet/services/strata-surveys/',
  '/lillooet/services/uav-mapping/',
  '/pemberton/services/3d-settlement-monitoring/',
  '/pemberton/services/building-strata-surveys/',
  '/pemberton/services/consolidation-surveys/',
  '/pemberton/services/easement-surveys/',
  '/pemberton/services/excavation-layout-surveys/',
  '/pemberton/services/infrastructure-layout-and-construction-surveys/',
  '/pemberton/services/phased-strata-surveys/',
  '/pemberton/services/proposed-strata-plans/',
  '/pemberton/services/road-surveys/',
  '/pemberton/services/statutory-rights-of-way-surveys/',
  '/pemberton/services/strata-surveys/',
  '/pemberton/services/uav-mapping/',
  '/powell-river/services/air-space-subdivision-surveys/',
  '/powell-river/services/bare-land-strata-surveys/',
  '/powell-river/services/building-strata-surveys/',
  '/powell-river/services/excavation-layout-surveys/',
  '/powell-river/services/infrastructure-layout-and-construction-surveys/',
  '/powell-river/services/proposed-strata-plans/',
  '/powell-river/services/statutory-rights-of-way-surveys/',
  '/powell-river/services/terrestrial-lidar-scanning/',
  '/sechelt/services/3d-settlement-monitoring/',
  '/sechelt/services/bare-land-strata-surveys/',
  '/sechelt/services/block-outline-surveys/',
  '/sechelt/services/building-strata-surveys/',
  '/sechelt/services/consolidation-surveys/',
  '/sechelt/services/covenant-surveys/',
  '/sechelt/services/easement-surveys/',
  '/sechelt/services/excavation-layout-surveys/',
  '/sechelt/services/form-and-foundation-surveys/',
  '/sechelt/services/gridline-and-construction-layout-surveys/',
  '/sechelt/services/infrastructure-layout-and-construction-surveys/',
  '/sechelt/services/phased-strata-surveys/',
  '/sechelt/services/road-surveys/',
  '/sechelt/services/terrestrial-lidar-scanning/',
  '/sechelt/services/volume-and-earthwork-surveys/',
  '/west-vancouver/services/block-outline-surveys/',
  '/west-vancouver/services/covenant-surveys/',
  '/west-vancouver/services/easement-surveys/',
  '/west-vancouver/services/excavation-layout-surveys/',
  '/west-vancouver/services/gridline-and-construction-layout-surveys/',
  '/west-vancouver/services/phased-strata-surveys/',
  '/west-vancouver/services/statutory-rights-of-way-surveys/',
  '/whistler/services/3d-settlement-monitoring/',
  '/whistler/services/air-space-subdivision-surveys/',
  '/whistler/services/block-outline-surveys/',
  '/whistler/services/covenant-surveys/',
  '/whistler/services/easement-surveys/',
  '/whistler/services/road-surveys/',
  '/whistler/services/statutory-rights-of-way-surveys/',
  '/whistler/services/strata-plan-amendment-surveys/',
  '/whistler/services/uav-mapping/',
];
export const PILOT_PATHS = [
  '/squamish/services/consolidation-surveys/',
  '/squamish/services/form-and-foundation-surveys/',
  '/squamish/services/natural-boundary-surveys/',
  '/squamish/services/strata-surveys/',
  '/squamish/services/subdivisions-surveys/',
];
export const CONTROL_PATHS = [
  '/squamish/services/air-space-subdivision-surveys/',
  '/squamish/services/bare-land-strata-surveys/',
  '/squamish/services/easement-surveys/',
  '/squamish/services/excavation-layout-surveys/',
  '/squamish/services/gridline-and-construction-layout-surveys/',
  '/squamish/services/infrastructure-layout-and-construction-surveys/',
  '/whistler/services/consolidation-surveys/',
  '/whistler/services/form-and-foundation-surveys/',
  '/whistler/services/natural-boundary-surveys/',
  '/whistler/services/strata-surveys/',
  '/whistler/services/subdivisions-surveys/',
];
export const SEA_TO_SKY_PATHS = [
  '/the-sea-to-sky/services/3d-settlement-monitoring/',
  '/the-sea-to-sky/services/air-space-subdivision-surveys/',
  '/the-sea-to-sky/services/bare-land-strata-surveys/',
  '/the-sea-to-sky/services/bc-land-surveyors-building-location-surveys/',
  '/the-sea-to-sky/services/block-outline-surveys/',
  '/the-sea-to-sky/services/boundary-surveys/',
  '/the-sea-to-sky/services/building-strata-surveys/',
  '/the-sea-to-sky/services/consolidation-surveys/',
  '/the-sea-to-sky/services/covenant-surveys/',
  '/the-sea-to-sky/services/easement-surveys/',
  '/the-sea-to-sky/services/environmental-and-riparian-surveys/',
  '/the-sea-to-sky/services/excavation-layout-surveys/',
  '/the-sea-to-sky/services/form-and-foundation-surveys/',
  '/the-sea-to-sky/services/gridline-and-construction-layout-surveys/',
  '/the-sea-to-sky/services/infrastructure-layout-and-construction-surveys/',
  '/the-sea-to-sky/services/land-act-surveys/',
  '/the-sea-to-sky/services/natural-boundary-surveys/',
  '/the-sea-to-sky/services/phased-strata-surveys/',
  '/the-sea-to-sky/services/proposed-strata-plans/',
  '/the-sea-to-sky/services/road-surveys/',
  '/the-sea-to-sky/services/statutory-rights-of-way-surveys/',
  '/the-sea-to-sky/services/strata-plan-amendment-surveys/',
  '/the-sea-to-sky/services/strata-surveys/',
  '/the-sea-to-sky/services/subdivisions-surveys/',
  '/the-sea-to-sky/services/terrestrial-lidar-scanning/',
  '/the-sea-to-sky/services/topographic-surveys-and-site-plans/',
  '/the-sea-to-sky/services/uav-mapping/',
  '/the-sea-to-sky/services/volume-and-earthwork-surveys/',
];
export const DENNIS_CALL_PATHS = [
  '/squamish/services/3d-settlement-monitoring/',
  '/squamish/services/block-outline-surveys/',
  '/squamish/services/proposed-strata-plans/',
  '/squamish/services/road-surveys/',
  '/squamish/services/statutory-rights-of-way-surveys/',
  '/squamish/services/strata-plan-amendment-surveys/',
  '/squamish/services/terrestrial-lidar-scanning/',
  '/squamish/services/uav-mapping/',
  '/squamish/services/volume-and-earthwork-surveys/',
];
export const PHASE2_HOLD_PATHS = [
  '/bowen-island/services/3d-settlement-monitoring/',
  '/bowen-island/services/covenant-surveys/',
  '/bowen-island/services/gridline-and-construction-layout-surveys/',
  '/bowen-island/services/proposed-strata-plans/',
  '/bowen-island/services/strata-surveys/',
  '/bowen-island/services/uav-mapping/',
  '/britannia-beach/services/bare-land-strata-surveys/',
  '/britannia-beach/services/proposed-strata-plans/',
  '/britannia-beach/services/road-surveys/',
  '/britannia-beach/services/strata-surveys/',
  '/city-north-vancouver/services/covenant-surveys/',
  '/city-north-vancouver/services/land-act-surveys/',
  '/city-north-vancouver/services/proposed-strata-plans/',
  '/city-north-vancouver/services/road-surveys/',
  '/city-north-vancouver/services/volume-and-earthwork-surveys/',
  '/district-north-vancouver/services/statutory-rights-of-way-surveys/',
  '/furry-creek/services/3d-settlement-monitoring/',
  '/furry-creek/services/block-outline-surveys/',
  '/furry-creek/services/consolidation-surveys/',
  '/furry-creek/services/excavation-layout-surveys/',
  '/furry-creek/services/proposed-strata-plans/',
  '/furry-creek/services/terrestrial-lidar-scanning/',
  '/gibsons/services/covenant-surveys/',
  '/gibsons/services/easement-surveys/',
  '/gibsons/services/proposed-strata-plans/',
  '/gibsons/services/strata-surveys/',
  '/lillooet/services/air-space-subdivision-surveys/',
  '/lillooet/services/phased-strata-surveys/',
  '/lillooet/services/proposed-strata-plans/',
  '/lillooet/services/terrestrial-lidar-scanning/',
  '/lillooet/services/volume-and-earthwork-surveys/',
  '/pemberton/services/air-space-subdivision-surveys/',
  '/pemberton/services/block-outline-surveys/',
  '/pemberton/services/gridline-and-construction-layout-surveys/',
  '/pemberton/services/strata-plan-amendment-surveys/',
  '/pemberton/services/terrestrial-lidar-scanning/',
  '/pemberton/services/volume-and-earthwork-surveys/',
  '/powell-river/services/3d-settlement-monitoring/',
  '/powell-river/services/block-outline-surveys/',
  '/powell-river/services/consolidation-surveys/',
  '/powell-river/services/covenant-surveys/',
  '/powell-river/services/gridline-and-construction-layout-surveys/',
  '/powell-river/services/road-surveys/',
  '/powell-river/services/strata-plan-amendment-surveys/',
  '/powell-river/services/volume-and-earthwork-surveys/',
  '/sechelt/services/proposed-strata-plans/',
  '/sechelt/services/strata-plan-amendment-surveys/',
  '/sechelt/services/strata-surveys/',
  '/sechelt/services/uav-mapping/',
  '/west-vancouver/services/3d-settlement-monitoring/',
  '/west-vancouver/services/air-space-subdivision-surveys/',
  '/west-vancouver/services/consolidation-surveys/',
  '/west-vancouver/services/road-surveys/',
  '/west-vancouver/services/volume-and-earthwork-surveys/',
  '/whistler/services/proposed-strata-plans/',
  '/whistler/services/volume-and-earthwork-surveys/',
];

const NOINDEX_ROBOTS = 'noindex, follow';

function sortedUnique(values) {
  return [...new Set(values)].sort();
}

function samePaths(actual, expected) {
  const a = sortedUnique(actual);
  const b = sortedUnique(expected);
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

function htmlFile(distDir, routePath) {
  if (routePath === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
}

function routeFromHtmlFile(distDir, file) {
  const rel = path.relative(distDir, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (!rel.endsWith('/index.html')) return null;
  return `/${rel.slice(0, -'index.html'.length)}`;
}

function robotsContents(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const found = [];
  for (const tag of tags) {
    if (!/\bname\s*=\s*(["'])robots\1/i.test(tag)) continue;
    const content = tag.match(/\bcontent\s*=\s*(["'])([\s\S]*?)\1/i);
    if (content) found.push(content[2]);
  }
  return found;
}

function canonicalHref(html) {
  const tag = html.match(/<link\b[^>]*rel\s*=\s*(["'])canonical\1[^>]*>/i);
  if (!tag) return '';
  const href = tag[0].match(/\bhref\s*=\s*(["'])([\s\S]*?)\1/i);
  return href ? href[2] : '';
}

function walkHtml(distDir) {
  const files = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, dirent.name);
      if (dirent.isDirectory()) walk(full);
      else if (dirent.name.endsWith('.html')) files.push(full);
    }
  }
  walk(distDir);
  return files;
}

function serviceSitemapPaths(distDir) {
  const file = path.join(distDir, 'sitemap-services.xml');
  if (!fs.existsSync(file)) return [];
  const xml = fs.readFileSync(file, 'utf8');
  const paths = [];
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    let pathname = new URL(match[1]).pathname;
    if (!pathname.endsWith('/')) pathname += '/';
    paths.push(pathname);
  }
  return paths;
}

/**
 * @returns {string[]} problems. Empty means the phase 1 trim matches the approved list.
 */
export function assertPhase1Indexing({
  distDir,
  hostname,
  policyPaths,
  hiddenRoutes,
  indexNowList,
  sitemapRoutes,
}) {
  const failures = [];
  const policy = sortedUnique(policyPaths);
  const protectedGroups = [
    ['pilot', PILOT_PATHS, 5],
    ['control', CONTROL_PATHS, 11],
    ['Sea to Sky', SEA_TO_SKY_PATHS, 28],
    ["Dennis's call", DENNIS_CALL_PATHS, 9],
    ['phase 2', PHASE2_HOLD_PATHS, 56],
  ];

  if (PHASE1_PATHS.length !== EXPECTED_PHASE1_COUNT) {
    failures.push(`approved phase 1 list has ${PHASE1_PATHS.length} paths, expected ${EXPECTED_PHASE1_COUNT}`);
  }
  if (!samePaths(policy, PHASE1_PATHS)) {
    const approved = new Set(PHASE1_PATHS);
    const live = new Set(policy);
    const missing = PHASE1_PATHS.filter((p) => !live.has(p));
    const extra = policy.filter((p) => !approved.has(p));
    failures.push(`policy paths are not the approved 140 (missing ${missing.length}, extra ${extra.length})`);
    for (const p of missing.slice(0, 8)) failures.push(`missing from policy: ${p}`);
    for (const p of extra.slice(0, 8)) failures.push(`unexpected policy path: ${p}`);
  }
  if (!samePaths(hiddenRoutes, PHASE1_PATHS)) {
    failures.push('prerender hid a different set of routes than the approved phase 1 list');
  }

  for (const [label, paths, count] of protectedGroups) {
    if (paths.length !== count) failures.push(`${label} list has ${paths.length} paths, expected ${count}`);
    for (const p of paths) {
      if (policy.includes(p)) failures.push(`${label} page is on the noindex list: ${p}`);
    }
  }

  for (const p of policy) {
    if (p.startsWith('/squamish/')) failures.push(`Squamish page is noindexed: ${p}`);
    if (p.startsWith('/the-sea-to-sky/')) failures.push(`Sea to Sky page is noindexed: ${p}`);
  }

  const indexNow = new Set(indexNowList);
  for (const p of PHASE1_PATHS) {
    if (indexNow.has(p)) failures.push(`IndexNow still includes ${p}`);
  }
  if (indexNowList.length !== new Set(indexNowList).size) {
    failures.push('IndexNow list contains duplicate URLs');
  }

  const sitemap = sitemapRoutes instanceof Set ? sitemapRoutes : new Set(sitemapRoutes);
  const serviceSitemap = new Set(serviceSitemapPaths(distDir));
  for (const p of PHASE1_PATHS) {
    if (sitemap.has(p)) failures.push(`sitemap still includes ${p}`);
    if (serviceSitemap.has(p)) failures.push(`sitemap-services.xml still includes ${p}`);
  }
  for (const [label, paths] of [
    ["Dennis's call", DENNIS_CALL_PATHS],
    ['phase 2', PHASE2_HOLD_PATHS],
    ['pilot', PILOT_PATHS],
    ['control', CONTROL_PATHS],
    ['Sea to Sky', SEA_TO_SKY_PATHS],
  ]) {
    for (const p of paths) {
      if (!serviceSitemap.has(p)) failures.push(`${label} page left sitemap-services.xml: ${p}`);
    }
  }

  const seenNoindex = [];
  for (const file of walkHtml(distDir)) {
    const routePath = routeFromHtmlFile(distDir, file);
    if (!routePath) continue;
    const html = fs.readFileSync(file, 'utf8');
    const robots = robotsContents(html);
    const expectNoindex = policy.includes(routePath);
    if (expectNoindex) {
      if (robots.length !== 1 || robots[0] !== NOINDEX_ROBOTS) {
        failures.push(`${routePath}: expected one "${NOINDEX_ROBOTS}" robots meta, found ${JSON.stringify(robots)}`);
      }
      if (canonicalHref(html) !== `${hostname}${routePath}`) {
        failures.push(`${routePath}: canonical is not self-referencing (${canonicalHref(html) || 'missing'})`);
      }
      if (/http-equiv\s*=\s*(["'])refresh\1/i.test(html)) {
        failures.push(`${routePath}: phase 1 page was turned into a redirect`);
      }
      if (/<h1[^>]*>\s*404\s*<\/h1>/i.test(html)) {
        failures.push(`${routePath}: phase 1 page rendered as a 404`);
      }
      const town = routePath.split('/')[1];
      const hubFile = htmlFile(distDir, `/${town}/`);
      const hubHtml = fs.existsSync(hubFile) ? fs.readFileSync(hubFile, 'utf8') : '';
      if (!hubHtml.includes(routePath)) {
        failures.push(`${routePath}: no longer linked from /${town}/`);
      }
      seenNoindex.push(routePath);
    } else if (robots.some((value) => /noindex/i.test(value))) {
      failures.push(`${routePath}: unexpected noindex (${robots.join(', ')})`);
    }
  }

  if (!samePaths(seenNoindex, PHASE1_PATHS)) {
    failures.push(`built HTML noindex set does not match the approved 140 (found ${seenNoindex.length})`);
  }

  for (const routePath of sitemap) {
    const file = htmlFile(distDir, routePath);
    if (!fs.existsSync(file)) {
      failures.push(`sitemap URL has no HTML file: ${routePath}`);
      continue;
    }
    const robots = robotsContents(fs.readFileSync(file, 'utf8'));
    if (robots.some((value) => /noindex/i.test(value))) {
      failures.push(`sitemap URL carries noindex: ${routePath}`);
    }
  }

  return failures;
}
