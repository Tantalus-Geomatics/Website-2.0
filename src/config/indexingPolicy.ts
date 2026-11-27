/**
 * Indexing policy for town × service pages.
 * Phase 1: approved trim list (Dennis Sherman, Nov 7, 2026). Those pages are
 * noindex,follow and omitted from the sitemap.
 * Phase 2: approved trim list (Dennis Sherman, Nov 26, 2026). Those pages are
 * noindex,follow and stay in the sitemap until a later removal.
 * Each key is `town/service`.
 */

export interface IndexingPolicyEntry {
  phase: 1 | 2;
  /** ISO date the noindex tag was introduced. */
  noindexSince: string;
}

export const PHASE1_NOINDEX_SINCE = '2026-11-08';
export const PHASE2_NOINDEX_SINCE = '2026-11-26';

export const INDEXING_POLICY: Record<string, IndexingPolicyEntry> = {
  'bowen-island/air-space-subdivision-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/bare-land-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/block-outline-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/building-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/consolidation-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/easement-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/excavation-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/infrastructure-layout-and-construction-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/phased-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/road-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/statutory-rights-of-way-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/strata-plan-amendment-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/terrestrial-lidar-scanning': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/3d-settlement-monitoring': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/air-space-subdivision-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/block-outline-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/building-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/consolidation-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/covenant-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/easement-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/environmental-and-riparian-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/excavation-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/gridline-and-construction-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/infrastructure-layout-and-construction-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/phased-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/statutory-rights-of-way-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/strata-plan-amendment-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/terrestrial-lidar-scanning': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/uav-mapping': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'britannia-beach/volume-and-earthwork-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'city-north-vancouver/bare-land-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'city-north-vancouver/block-outline-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'city-north-vancouver/environmental-and-riparian-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'city-north-vancouver/natural-boundary-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'city-north-vancouver/phased-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'city-north-vancouver/strata-plan-amendment-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'city-north-vancouver/subdivisions-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'district-north-vancouver/air-space-subdivision-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'district-north-vancouver/bare-land-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'district-north-vancouver/block-outline-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'district-north-vancouver/covenant-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'district-north-vancouver/easement-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'district-north-vancouver/phased-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'district-north-vancouver/terrestrial-lidar-scanning': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'district-north-vancouver/volume-and-earthwork-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/air-space-subdivision-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/bare-land-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/building-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/covenant-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/easement-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/environmental-and-riparian-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/gridline-and-construction-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/infrastructure-layout-and-construction-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/phased-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/road-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/statutory-rights-of-way-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/strata-plan-amendment-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/uav-mapping': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'furry-creek/volume-and-earthwork-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/3d-settlement-monitoring': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/air-space-subdivision-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/bare-land-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/block-outline-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/building-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/consolidation-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/excavation-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/form-and-foundation-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/infrastructure-layout-and-construction-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/phased-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/road-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/statutory-rights-of-way-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/strata-plan-amendment-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/terrestrial-lidar-scanning': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'gibsons/volume-and-earthwork-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/3d-settlement-monitoring': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/bare-land-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/block-outline-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/building-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/consolidation-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/covenant-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/easement-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/environmental-and-riparian-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/excavation-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/gridline-and-construction-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/infrastructure-layout-and-construction-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/statutory-rights-of-way-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/strata-plan-amendment-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'lillooet/uav-mapping': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/3d-settlement-monitoring': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/building-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/consolidation-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/easement-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/excavation-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/infrastructure-layout-and-construction-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/phased-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/proposed-strata-plans': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/road-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/statutory-rights-of-way-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'pemberton/uav-mapping': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'powell-river/air-space-subdivision-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'powell-river/bare-land-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'powell-river/building-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'powell-river/excavation-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'powell-river/infrastructure-layout-and-construction-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'powell-river/proposed-strata-plans': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'powell-river/statutory-rights-of-way-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'powell-river/terrestrial-lidar-scanning': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/3d-settlement-monitoring': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/bare-land-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/block-outline-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/building-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/consolidation-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/covenant-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/easement-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/excavation-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/form-and-foundation-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/gridline-and-construction-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/infrastructure-layout-and-construction-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/phased-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/road-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/terrestrial-lidar-scanning': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'sechelt/volume-and-earthwork-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'west-vancouver/block-outline-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'west-vancouver/covenant-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'west-vancouver/easement-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'west-vancouver/excavation-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'west-vancouver/gridline-and-construction-layout-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'west-vancouver/phased-strata-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'west-vancouver/statutory-rights-of-way-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'whistler/3d-settlement-monitoring': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'whistler/air-space-subdivision-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'whistler/block-outline-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'whistler/covenant-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'whistler/easement-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'whistler/road-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'whistler/statutory-rights-of-way-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'whistler/strata-plan-amendment-surveys': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'whistler/uav-mapping': { phase: 1, noindexSince: PHASE1_NOINDEX_SINCE },
  'bowen-island/3d-settlement-monitoring': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'bowen-island/gridline-and-construction-layout-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'bowen-island/proposed-strata-plans': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'britannia-beach/road-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'britannia-beach/strata-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'furry-creek/3d-settlement-monitoring': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'furry-creek/excavation-layout-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'furry-creek/proposed-strata-plans': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'gibsons/covenant-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'gibsons/easement-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'gibsons/strata-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'lillooet/air-space-subdivision-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'lillooet/phased-strata-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'lillooet/proposed-strata-plans': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'lillooet/volume-and-earthwork-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'powell-river/3d-settlement-monitoring': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'powell-river/block-outline-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'powell-river/covenant-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'powell-river/gridline-and-construction-layout-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'powell-river/road-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'powell-river/strata-plan-amendment-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'powell-river/volume-and-earthwork-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'sechelt/proposed-strata-plans': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'sechelt/strata-plan-amendment-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'sechelt/strata-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'west-vancouver/3d-settlement-monitoring': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
  'west-vancouver/road-surveys': { phase: 2, noindexSince: PHASE2_NOINDEX_SINCE },
};

export const NOINDEX_ROBOTS = 'noindex, follow';

/** `/town/services/service/` -> `town/service`, or null when the path is not a town service page. */
export function indexingPolicyKey(input: string): string | null {
  let path = (input || '').trim();
  if (/^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      return null;
    }
  }
  path = path.split('?')[0].split('#')[0].replace(/\/{2,}/g, '/');
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  const match = path.match(/^\/([^/]+)\/services\/([^/]+)$/);
  if (!match) return null;
  return `${match[1]}/${match[2]}`;
}

export function indexingPolicyForPath(input: string): IndexingPolicyEntry | null {
  const key = indexingPolicyKey(input);
  if (!key) return null;
  return INDEXING_POLICY[key] ?? null;
}

/** True for phase 1 or phase 2. Both use `noindex, follow`. */
export function isNoindexPath(input: string): boolean {
  const phase = indexingPolicyForPath(input)?.phase;
  return phase === 1 || phase === 2;
}

/** True only for a phase 1 entry. Phase 1 is omitted from the sitemap. */
export function isPhase1NoindexPath(input: string): boolean {
  return indexingPolicyForPath(input)?.phase === 1;
}

function pathsForPhase(phase: 1 | 2): string[] {
  return Object.entries(INDEXING_POLICY)
    .filter(([, entry]) => entry.phase === phase)
    .map(([key]) => key)
    .sort()
    .map((key) => {
      const [town, service] = key.split('/');
      return `/${town}/services/${service}/`;
    });
}

export function phase1NoindexPaths(): string[] {
  return pathsForPhase(1);
}

/** Phase 2 stays in the sitemap. These paths are noindex only. */
export function phase2NoindexPaths(): string[] {
  return pathsForPhase(2);
}
