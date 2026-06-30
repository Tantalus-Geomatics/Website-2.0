# Tantalus Geomatics - Project Architecture Documentation

This document serves as a living, incrementally built architectural reference for the Tantalus Geomatics Land Surveying website. It is designed to capture structural patterns, configuration mappings, and global UI flows as they are analyzed and modified, preserving token footprints and ensuring high-fidelity documentation.

---

## 1. Routing Architecture

The application implements a **dual-track routing flow** using `react-router-dom` to support both generic/global services and regional/localized services for SEO optimization.

### Generic/Global Track
- **Pattern:** `/services/:serviceSlug/`
- **Component:** [`DynamicService`](src/pages/DynamicService.tsx)
- **Purpose:** Serves as the primary, non-localized landing page for each of the 30 geomatics services.

### Regional/Localized Track
- **Pattern:** `/:locationSlug/services/:serviceSlug/`
- **Component:** [`DynamicLocationService`](src/pages/DynamicLocationService.tsx)
- **Purpose:** Serves highly localized, geo-targeted landing pages for each of the 14 service locations.
- **Route Guarding:** Localized routes are protected by the [`LocationRouteGuard`](src/App.tsx) component, which validates the `:locationSlug` parameter against the official list of locations. If invalid, it gracefully redirects to the generic fallback path.

---

## 2. Configuration Mapping

The system relies on centralized configuration files to maintain official naming, casing, and metadata for locations and services.

### Location Configuration
- **File:** [`src/config/locations.ts`](src/config/locations.ts)
- **Contents:**
  - `VALID_LOCATIONS`: A read-only array of the 14 official location slugs (e.g., `squamish`, `west-vancouver`, `bowen-island`).
  - `LOCATION_GEO_DATA`: A dictionary mapping each location slug to its geographic coordinates (`lat`, `lng`), official locality name, local authority name, and municipal links.
  - `isValidLocation(slug)`: A type guard function validating if a string is a valid location slug.

### Resource Mapping
- **File:** [`src/config/resourceMapping.ts`](src/config/resourceMapping.ts)
- **Contents:**
  - `LOCATION_LINKS_MAP`: Maps location slugs to official municipal building permit guides, development permit applications, and GIS mapping resources.
  - `SERVICE_LINKS_MAP`: Maps service slugs to specific guides and external regulatory requirements (e.g., LTSA).
  - `SERVICE_IMAGES_MAP` & `LOCATION_IMAGES_MAP`: Maps slugs to high-quality webp images and descriptive alt text/captions.

### Services Structure
- **File:** [`src/config/servicesStructure.ts`](src/config/servicesStructure.ts)
- **Contents:**
  - `SERVICE_CATEGORIES`: Groups the 30 individual services into 6 core categories: Residential, Construction, Legal, Commercial, Engineering, and Strata.

---

## 3. Global UI Shell Flow

The user interface is structured hierarchically, cascading from global layout wrappers down to individual page views.

```
[App.tsx (Routes)]
       │
       ▼
[Layout.tsx (Global Shell)]
       │
       ├── [Top Banner (Service Areas)]
       ├── [Header (Logo, CTA, Nav Links)]
       ├── [Breadcrumbs.tsx (Dynamic Navigation)]  <-- Newly Integrated
       │
       ├── [Outlet (Nested Route Viewport)]
       │         │
       │         ├── [Home / About / Services / FAQ / Contact]
       │         └── [DynamicService / DynamicLocationService]
       │
       ├── [AuthorBio.tsx (Global Biography)]
       └── [Footer (ABCLS Affiliation, Interactive Map, Regional Links)]
```

### Global Layout Shell
- **File:** [`src/components/Layout.tsx`](src/components/Layout.tsx)
- **Role:** Wraps all routes, rendering the top banner, primary header navigation, dynamic breadcrumbs, nested route viewport (`<Outlet />`), global author bio, and the interactive Google Map footer.

### Dynamic Breadcrumbs Navigation
- **File:** [`src/components/Breadcrumbs.tsx`](src/components/Breadcrumbs.tsx)
- **Role:** Programmatically parses the current URL path tree using `useLocation`.
  - Maps valid location slugs to their official Title Case names using `LOCATION_GEO_DATA` and overrides.
  - Translates service slugs to human-readable titles using a precise translation table.
  - Renders semantic `<nav aria-label="Breadcrumb">` markup styled with Tailwind CSS.
  - Displays the active leaf node as plain, unclickable bold text.

---

## 4. Global Region Slug Migration

The global region slug has been migrated from `sea-to-sky` to `the-sea-to-sky` to align with official branding and SEO requirements.

### Migration Details
- **Centralized Configurations:**
  - Updated [`src/config/locations.ts`](src/config/locations.ts) to use `'the-sea-to-sky'` inside `VALID_LOCATIONS` and `LOCATION_GEO_DATA`.
  - Updated [`src/config/resourceMapping.ts`](src/config/resourceMapping.ts) to map all resource links and images under the `'the-sea-to-sky'` key.
- **Content Generation & Scripting:**
  - Updated [`scripts/generate-localized-content.js`](scripts/generate-localized-content.js) to target `'the-sea-to-sky'` as the configuration key and output directory.
  - Permanently removed the old generated folder `src/content/services/sea-to-sky/` and regenerated all localized MDX files under `src/content/services/the-sea-to-sky/`.
- **Routing & Fallbacks:**
  - Updated [`src/pages/DynamicService.tsx`](src/pages/DynamicService.tsx) to dynamically import MDX files from `../content/services/the-sea-to-sky/*.mdx` for the generic/global track.
  - The [`LocationRouteGuard`](src/App.tsx) automatically handles invalid/old `sea-to-sky` slugs by failing the `isValidLocation` check and gracefully redirecting users to the generic fallback path.

---

## 5. SEO & GEO Hardening Architecture

To maximize organic CTR, search engine visibility, and local authority, the application implements a robust, multi-layered structured data and metadata strategy.

### Structured Schema Markup
- **LocalBusiness & Person Entity Expansion:**
  - Enriched the global `LocalBusiness` schema on the Home ([`src/pages/Home.tsx`](src/pages/Home.tsx)) and About ([`src/pages/About.tsx`](src/pages/About.tsx)) pages.
  - Nested a structured `Person` profile block for the principal, Dennis Sherman, BCLS, P.Eng., explicitly declaring professional credentials (BCLS Commission #1104, EGBC Registration #57741, and Corporate Permit #1046).
- **Dynamic FAQ Page Schema:**
  - Programmatically generates a valid `FAQPage` JSON-LD schema block on the FAQ page ([`src/pages/FAQ.tsx`](src/pages/FAQ.tsx)) by mapping over the parsed `faqCategories` array, formatting each node with `Question` and `AcceptedAnswer` entities.
- **Service Schema Nesting:**
  - Updated the localized content generation script ([`scripts/generate-localized-content.js`](scripts/generate-localized-content.js)) to automatically nest a `Service` schema within the `ProfessionalService` entity for every generated sub-page, linking it back to the main organization.

### Microdata Integration
- **BreadcrumbList Microdata:**
  - Marked up the dynamic link trail in [`src/components/Breadcrumbs.tsx`](src/components/Breadcrumbs.tsx) using semantic `BreadcrumbList`, `ListItem`, `item`, `name`, and `position` microdata properties to ensure flawless search engine parsing.

### Metadata Customization
- **Dynamic Hub Snippets:**
  - Replaced generic boilerplate descriptions on location landing pages ([`src/pages/DynamicLocationHome.tsx`](src/pages/DynamicLocationHome.tsx)) with a dynamic hook that injects the unique city name and its corresponding governing authority (e.g., pulling from `LOCATION_GEO_DATA[locationSlug].localAuthorityName`) to maximize organic CTR.
- **Global Production URL Patch:**
  - Audited and patched the Open Graph URL rendering logic in [`src/components/SEO.tsx`](src/components/SEO.tsx) to replace any pre-rendered `localhost:3000` artifacts with the live canonical domain base: `https://www.tantalusgeomatics.com`.

---

## 6. React Hydration Mismatch Resolution (Error #418)

To resolve React Hydration Mismatch errors (Error #418) caused by block-level elements being illegally nested inside inline paragraph (`<p>`) tags during pre-rendering, the application's layout templates and pages were audited and hardened.

### Service Template Hardening
- **File:** [`src/templates/ServiceTemplate.tsx`](src/templates/ServiceTemplate.tsx)
- **Fixes:**
  - Replaced all `<p>` tags wrapping dynamic content or rich-text sections inside the [`GeoDirectAnswer`](src/components/GeoDirectAnswer.tsx) component with standard block-level `<div>` tags.
  - This ensures that any nested block-level structures (such as lists, headers, or custom block layout components) rendered within the dynamic content do not violate HTML/DOM nesting specifications.

### Home Page Hardening
- **File:** [`src/pages/Home.tsx`](src/pages/Home.tsx)
- **Fixes:**
  - Audited the JSX return block and replaced paragraph wrappers (`<p>`) wrapping nested rich-text sections or dynamic layouts inside the [`GeoDirectAnswer`](src/components/GeoDirectAnswer.tsx) component with standard `<div>` tags.
  - This maintains strict DOM compliance and guarantees flawless static pre-rendering and client-side hydration.

---

## 7. SEO & GEO Hardening v2

To further harden the website's search engine optimization, local authority targeting, and content accuracy, a second phase of SEO and GEO hardening was implemented.

### Canonical URL & Open Graph URL Resolution
- **File:** [`src/components/SEO.tsx`](src/components/SEO.tsx)
- **Fix:** Resolved the canonical base URL from the environment variable `import.meta.env.VITE_SITE_URL` (falling back to `https://www.tantalusgeomatics.com`) for all page types. This ensures that dynamic routes rendered by `DynamicLocationHome.tsx` and `DynamicLocationService.tsx` correctly resolve their `og:url` and canonical links to the production domain instead of `http://localhost:3000` during static pre-rendering.

### FAQ Page Enhancements
- **File:** [`src/pages/FAQ.tsx`](src/pages/FAQ.tsx)
- **Fixes:**
  - Replaced the generic meta description with a highly optimized, keyword-rich description: `"Expert answers to 90+ BC land surveying questions — property staking, topographic surveys, strata plans, subdivision, and covenants in the Sea to Sky corridor."`
  - Verified and maintained the programmatic generation of the `FAQPage` JSON-LD schema block, which extracts and strips HTML from Q&As across all 6 categories.

### LocalBusiness & Person Schema Alignment
- **Files:** [`src/pages/Home.tsx`](src/pages/Home.tsx) and [`src/pages/About.tsx`](src/pages/About.tsx)
- **Fixes:**
  - Aligned the `ProfessionalService` and `Person` schemas to include all required fields: `name`, `url` (using `https://www.tantalusgeomatics.com`), `telephone`, `email` (`contact@tantalusgeomatics.com`), `address`, `areaServed` (expanded to all 12 target locations), and `employee` (fully detailing Dennis Sherman's credentials and York University alumni status).

### Service Schema Injection
- **File:** [`src/templates/ServiceTemplate.tsx`](src/templates/ServiceTemplate.tsx)
- **Fix:** Programmatically constructed and injected a valid `Service` schema block into the HTML head via the `<SEO>` component for all service sub-pages (both generic and localized tracks). This ensures that every service page renders a valid `Service` schema with the correct `serviceType`, `provider`, and `areaServed` (falling back to `"Sea to Sky Corridor"` for generic pages).

### Differentiated Location Hub Meta Descriptions
- **File:** [`src/pages/DynamicLocationHome.tsx`](src/pages/DynamicLocationHome.tsx)
- **Fix:** Implemented city-specific meta descriptions for the 14 location hubs. The four highest-priority locations (`squamish`, `whistler`, `city-north-vancouver`/`district-north-vancouver`, and `pemberton`) use custom, highly targeted copy, while all other locations dynamically fall back to a formula incorporating their specific local authority name.

### Content & Grammar Corrections
- **Files:**
  - [`src/pages/About.tsx`](src/pages/About.tsx): Fixed grammar typo (`"led by a licensed BC Land Surveyor and Professional Engineering"` -> `"led by a licensed BC Land Surveyor and Professional Engineer"`).
  - [`src/content/services/squamish/volume-and-earthwork-surveys.mdx`](src/content/services/squamish/volume-and-earthwork-surveys.mdx) & [`src/content/services/the-sea-to-sky/volume-and-earthwork-surveys.mdx`](src/content/services/the-sea-to-sky/volume-and-earthwork-surveys.mdx): Fixed `"ccomparison"` typo to `"comparison"`.
  - [`src/content/services/squamish/gridline-and-construction-layout-surveys.mdx`](src/content/services/squamish/gridline-and-construction-layout-surveys.mdx) & [`src/content/services/the-sea-to-sky/gridline-and-construction-layout-surveys.mdx`](src/content/services/the-sea-to-sky/gridline-and-construction-layout-surveys.mdx): Fixed doubled modifier (`"guarantee our field placement is accurately accurate"` -> `"guarantee our field placement is accurate"`).

---

## 8. Fault-Tolerant Prerendering & Sitemap Generation

To ensure high-availability and robust static site generation, the prerendering pipeline has been hardened against single-page failures and aligned with the updated regional mapping architecture.

### Core Location Key Alignment
- **File:** [`prerender.js`](prerender.js)
- **Fix:** Updated the legacy `'sea-to-sky'` slug to `'the-sea-to-sky'` in the `CORE_LOCATIONS` array to match the centralized configuration and prevent local SEO authority leakage.

### Fault-Tolerant Crawling Loop
- **File:** [`prerender.js`](prerender.js)
- **Fix:** Wrapped the entire internal body of the page crawling loop (`for (const url of routesToPrerender)`) in an isolated `try-catch` block.
- **Resilience:** If an individual page throws a timeout error or handles a React hydration crash, the script logs the warning to the console, gracefully closes the page, and continues to the next URL. This prevents single-page exceptions from terminating the script prematurely, ensuring child and master sitemaps are successfully written.

---

> **Note on Incremental Documentation:**
> This document is built and updated incrementally during codebase modifications to preserve token footprints, optimize context windows, and maintain precise, up-to-date architectural records.

---

## 6. SEO & Performance Fixes v4

A fourth SEO and performance audit pass addressed LCP hero loading, location hub metadata, duplicate service routes, map CLS, GTM loading, content corrections, and server-rendered structured data.

### Performance
- **`index.html`**: Added `<link rel="preload">` for the default hero image (`tantalus-hero-banner.webp`).
- **`src/pages/Home.tsx`**, **`About.tsx`**, **`FAQ.tsx`**, **`Contact.tsx`**, **`Services.tsx`**, **`SurveyPricing.tsx`**, **`src/templates/HubTemplate.tsx`**, **`src/templates/ServiceTemplate.tsx`**: Added `fetchPriority="high"` and `loading="eager"` to hero `<img>` elements.
- **`src/components/Layout.tsx`**: Reserved fixed `600px` height on the footer Google Maps container (and matching fallback placeholder) to prevent CLS during map load.
- **`index.html`**: Moved GTM (`GTM-PFWRJL4M`) into the document `<head>` with `async` loading via the standard GTM snippet; removed duplicate deferred GTM injection from **`src/components/ThirdPartyScripts.tsx`**.

### Location Hub SEO (`og:url`, canonical, differentiated copy)
- **`src/config/locations.ts`**: Extended `GeoData` with optional `localityName`, `hubTitle`, and `metaDescription` fields. Differentiated DNV vs CNV hubs; added Squamish/Whistler meta descriptions; set `localityName: "The Sea to Sky"` for the `the-sea-to-sky` slug. Added `getLocationDisplayName()` helper.
- **`src/pages/DynamicLocationHome.tsx`**: Renders `<SEO>` with production `canonicalUrl` during the loading state (so prerender captures metadata before async MDX glob resolves). Uses `hubTitle`, `metaDescription`, and `getLocationDisplayName()` from config.
- **`src/templates/HubTemplate.tsx`**: Accepts and forwards `canonicalUrl` to `<SEO>`.

### Duplicate `/services/{slug}/` routes
- **`src/App.tsx`**: Replaced the generic `DynamicService` route with `NavigateToSeaToSky`, issuing a client-side 301-style redirect from `/services/:serviceSlug` to `/the-sea-to-sky/services/:serviceSlug/`.

### Service page metadata
- **`src/templates/ServiceTemplate.tsx`**: Added production `canonicalUrl` for localized and Sea-to-Sky service pages. Fixed "local the Sea to Sky" phrasing in the Why Choose Us block via `formatLocalExpertise()`.

### Content & FAQ
- **`src/pages/FAQ.tsx`**: Updated meta description to the v4 audit copy (em dash, topographic/strata keywords).
- **`src/pages/About.tsx`**, FAQ MDX sources: Grammar fixes (`Professional Engineer`, `statutes`, `ccomparison`, `accurately accurate`) were already present from v2 hardening — verified, no further edits required.

### Server-rendered schema & meta
- **`index.html`**: Added `<div id="seo-root">` mount point in `<head>` for JSON-LD injection.
- **`src/components/SEO.tsx`**: Refactored from deferred `useEffect` to synchronous `useLayoutEffect` for title, canonical, and Open Graph tags (captured during Puppeteer prerender). JSON-LD schema renders at React render-time via portal into `#seo-root`.
- **`src/pages/DynamicLocationService.tsx`**: Passes explicit production `canonicalUrl` to `<SEO>`.

---

## 7. SEO Fixes v5 + Social Links

A fifth SEO/GEO audit pass fixed Sea to Sky metadata duplication, hub page copy, grammar in shared service content, JSON-LD head injection, and footer social links.

### Sea to Sky metadata (Tasks 1–2)
- **`src/config/locations.ts`**: Set `locality: "Sea to Sky"` (no article) for metadata/schema sentence templates; kept `localityName: "The Sea to Sky"` for hub display; added `hubTitle: "The Sea to Sky Land Surveying Hub"`; added `getServiceLocationName()` helper for mid-sentence H1 labels (`"the Sea to Sky"`).
- **`scripts/generate-localized-content.js`**: Split `LOCATION_NAME` (`"Sea to Sky"`) from `SERVICE_LOCATION_NAME` (`"the Sea to Sky"`) for the `the-sea-to-sky` slug; post-processes titles/descriptions to `"in the Sea to Sky"`; schema descriptions use `the ${locality}` pattern once.
- **`src/templates/ServiceTemplate.tsx`**: Strips HTML from title before Sea-to-Sky normalization so `<title>`, og tags, and hero alt avoid duplicate `"the"`.
- **`src/content/services/the-sea-to-sky/*.mdx`**: Updated embedded schema `addressLocality` and organization name to `"Sea to Sky"` (30 service pages).

### Location hub SEO (Tasks 3–4, 6, 8)
- **`src/pages/DynamicLocationHome.tsx`**: Verified production `canonicalUrl` for all hubs during loading and loaded states (no per-slug conditional); uses `hubTitle`, `metaDescription`, and `getLocationDisplayName()` — DNV/CNV/Squamish/Whistler differentiated copy already wired.
- **`src/templates/HubTemplate.tsx`**: Services subheading now uses `locationName` (e.g. `"tailored to Squamish."`) instead of lowercased hub title slug text; hero `alt` uses `hubTitle` for capitalized `"The Sea to Sky Land Surveying Hub"`.

### Content & FAQ (Tasks 5, 7)
- **`src/content/base/services/*.mdx`** and **`src/content/base/services/text_files/*.txt`**: Fixed `"an professional arsenal"` → `"a professional arsenal"` at source (4 MDX + 4 text templates).
- **`src/content/services/**/*.mdx`**: Bulk-applied the same grammar fix across all localized service pages (~56 files).
- **`src/pages/FAQ.tsx`**: Verified v4 meta description already matches audit copy (no edit required).

### Performance (Tasks 9–10)
- **`index.html`**: Verified hero image `<link rel="preload">` and GTM `async` snippet already present; added non-empty `#seo-root` anchor comment.
- **`src/templates/HubTemplate.tsx`**, **`src/pages/Home.tsx`**, **`src/components/Layout.tsx`**: Verified `fetchPriority="high"` / `loading="eager"` on hero images and fixed `600px` map container height already in place.

### Server-rendered schema (Task 11)
- **`src/components/SEO.tsx`**: JSON-LD schema portals into `#seo-root` (fallback: `document.head`) at render time so Puppeteer captures `<script type="application/ld+json">` in prerendered HTML.

### Footer social links (Task 12)
- **`src/components/Layout.tsx`**: Added Instagram, Facebook, and WhatsApp (`MessageCircle`) icon links after GitHub, matching existing LinkedIn/GitHub styling and `rel="noopener noreferrer"`.
- **`src/templates/ServiceTemplate.tsx`**: Removed duplicate <h3> heading from deliverables section in `src/templates/ServiceTemplate.tsx`.
- **`src/content/services/*/natural-boundary-surveys.mdx`**: Fixed FAQ content bleed into deliverables array in `natural-boundary-surveys.mdx` across all location variants.

---

## 8. Natural Boundary Survey FAQ Fix

Removed misplaced FAQ markdown block from deliverables body in natural-boundary-surveys.mdx across all location variants (14 files updated).

### Fix Details
- **`scripts/convert_to_mdx.py`**: Updated the header pattern regex and the normalization logic to correctly match and parse `FAQ` (without `s`) as the `faqs` section. This prevents the FAQ block from bleeding into the `deliverables` array.
- **`src/content/base/services/natural-boundary-surveys.mdx`**: Regenerated the base template, removing the misplaced FAQ block from the `deliverables` array and correctly populating the `faqs` array with the 5 natural boundary survey FAQs.
- **`src/content/services/*/natural-boundary-surveys.mdx`**: Regenerated all 14 location-specific service pages, ensuring they have the correct 4 deliverables and the 5 FAQs correctly structured.
- **`src/pages/FAQ.tsx`**: Verified that the 5 FAQs are automatically preserved and rendered on the main FAQ page by dynamically importing the `faqs` array from the Squamish service page.

---

## 8. Footer Features — YouTube, Review Carousel, Chamber Badge

To enhance social proof, local credibility, and social media presence, three new features were integrated into the global footer.

### YouTube Social Link
- **File:** [`src/components/Layout.tsx`](src/components/Layout.tsx)
- **Details:** Added a YouTube icon link to the social links row in the footer left column, following the exact styling and `rel="noopener noreferrer"` pattern of existing social icons.

### Review Carousel
- **Files:**
  - [`src/data/reviews.ts`](src/data/reviews.ts): Created a centralized reviews data file with structured seed reviews.
  - [`src/components/ReviewCarousel.tsx`](src/components/ReviewCarousel.tsx): Built a self-contained, responsive carousel component using only React hooks and `lucide-react` icons. It supports auto-advance, hover-pause, infinite looping, and custom source badges.
  - [`src/components/Layout.tsx`](src/components/Layout.tsx): Integrated the `ReviewCarousel` at the very top of the footer in its own full-width section with a visual separator.

### Squamish Chamber of Commerce Badge
- **File:** [`src/components/Layout.tsx`](src/components/Layout.tsx)
- **Details:** Inserted the official Squamish Chamber of Commerce badge between the contact info and social links row in the left column of the footer, styled to visually match the scale and weight of the ABCLS badge.

---

## 9. Project Pages & Insight Pages Pipeline

To support dynamic case studies and professional insights, the application implements a robust content pipeline that converts structured text files into MDX pages, integrated with the global routing and template architecture.

### Route Patterns
The following routes are registered in [`src/App.tsx`](src/App.tsx) to handle both global and localized tracks:
- **Projects (Global):** `/projects/:projectSlug` -> [`DynamicProject`](src/pages/DynamicProject.tsx)
- **Projects (Localized):** `/:locationSlug/projects/:projectSlug` -> [`DynamicProject`](src/pages/DynamicProject.tsx)
- **Insights (Global):** `/insights/:postSlug` -> [`DynamicInsight`](src/pages/DynamicInsight.tsx)
- **Insights (Localized):** `/:locationSlug/insights/:postSlug` -> [`DynamicInsight`](src/pages/DynamicInsight.tsx)

### Content Directory Structure
- **Projects Content:** [`src/content/projects/`](src/content/projects/) (glob pattern: `../content/projects/**/*.mdx`)
- **Insights Content:** [`src/content/blog/`](src/content/blog/) (glob pattern: `../content/blog/**/*.mdx`)
- **Base Project Sources:** [`src/content/base/projects/text_files/`](src/content/base/projects/text_files/)
- **Base Insight Sources:** [`src/content/base/blog/text_files/`](src/content/base/blog/text_files/)

### Content Pipeline Scripts
Two standalone Python scripts automate the conversion of structured text files into MDX:
1. **Project Compiler:** [`scripts/convert_project_to_mdx.py`](scripts/convert_project_to_mdx.py)
   - Parses sections: `Title`, `Client`, `Location`, `Completion Date`, `Hero Image`, `Gallery Images`, `Project Scope`, `Deliverables`, and `Body`.
   - Auto-generates geocentric meta descriptions: `"A {location} land surveying project by Tantalus Geomatics: {title}."`
   - Formats image paths to reference `/images/` automatically.
2. **Insight Compiler:** [`scripts/convert_insight_to_mdx.py`](scripts/convert_insight_to_mdx.py)
   - Parses sections: `Title`, `Description`, `Publish Date`, `Tags`, `Hero Image`, and `Body`.
   - Supports comma-separated or one-per-line tags.

### MDX Output Format
Unlike service pages, project and blog MDX files do not wrap themselves in a template. Instead, they export metadata and a clean body prose component, allowing [`DynamicProject`](src/pages/DynamicProject.tsx) and [`DynamicInsight`](src/pages/DynamicInsight.tsx) to handle the wrapping dynamically:
```mdx
---
title: "..."
...
---

export const metadata = {
  title: "...",
  ...
}

export default function Content({ children }) { return <>{children}</> }

{body prose}
```

### Workflow for Adding New Content
#### Adding a Project Case Study:
1. Create a structured text file in [`src/content/base/projects/text_files/`](src/content/base/projects/text_files/) (e.g., `my-project.txt`).
2. Run the compiler from the project root:
   ```bash
   python scripts/convert_project_to_mdx.py
   ```
3. Copy the compiled MDX file from `src/content/base/projects/` to [`src/content/projects/`](src/content/projects/) (or a localized subdirectory like `src/content/projects/squamish/`).
4. Rebuild and deploy.

#### Adding an Insight Article:
1. Create a structured text file in [`src/content/base/blog/text_files/`](src/content/base/blog/text_files/) (e.g., `my-article.txt`).
2. Run the compiler from the project root:
   ```bash
   python scripts/convert_insight_to_mdx.py
   ```
3. Copy the compiled MDX file from `src/content/base/blog/` to [`src/content/blog/`](src/content/blog/) (or a localized subdirectory like `src/content/blog/squamish/`).
4. Rebuild and deploy.


## 10. Project & Insight Layout Updates v2

To support richer content presentation and per-post terminology definitions, the Project and Insight page pipelines have been updated with inline block directives, a dynamic glossary system, and layout refinements.

### 1. Back Button Removal
- **File:** [`src/templates/ProjectTemplate.tsx`](src/templates/ProjectTemplate.tsx)
- **Details:** Removed the "← Back to Home" link above the "PROJECT CASE STUDY" badge to streamline the header layout, while preserving the badge and adjusting spacing.

### 2. Project Summary Header
- **File:** [`src/templates/ProjectTemplate.tsx`](src/templates/ProjectTemplate.tsx)
- **Details:** Added a visible `<h2>` heading styled as `text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100` above the main body prose to clearly label the "Project Summary" section.

### 3. Rich Content Block Directives
- **Syntax:**
  - **Images:** `[[image: {filename} | float: left|right|none | width: {percent} | caption: "{text}"]]`
  - **Maps:** `[[map: {lat},{lng} | zoom: {1-20} | height: {px}]]`
- **Components:**
  - [`src/components/RichImage.tsx`](src/components/RichImage.tsx): Renders responsive, floated or centered images with optional captions, styled for light backgrounds.
  - [`src/components/RichMap.tsx`](src/components/RichMap.tsx): Renders a keyless Google Maps iframe embed with custom height and zoom.
- **Compilers:**
  - Updated [`scripts/convert_project_to_mdx.py`](scripts/convert_project_to_mdx.py) and [`scripts/convert_insight_to_mdx.py`](scripts/convert_insight_to_mdx.py) to parse these bracket-tag directives into structured JSX tags (`<RichImage />` and `<RichMap />`) inside the body prose.
- **Wiring:**
  - Imported and registered `RichImage` and `RichMap` in [`src/pages/DynamicProject.tsx`](src/pages/DynamicProject.tsx) and [`src/pages/DynamicInsight.tsx`](src/pages/DynamicInsight.tsx) via the MDX `components` prop.
  - Added `overflow-auto` and a `<div className="clear-both" />` clearfix to the prose containers in [`src/templates/ProjectTemplate.tsx`](src/templates/ProjectTemplate.tsx) and [`src/templates/PostTemplate.tsx`](src/templates/PostTemplate.tsx) to prevent floated images from colliding with subsequent layout sections.

### 4. Per-Post Glossary System
- **File:** [`src/templates/PostTemplate.tsx`](src/templates/PostTemplate.tsx)
- **Details:** Removed the static Dennis Sherman bio card from the sidebar and replaced it with a dynamic, per-post glossary card.
- **Syntax:**
  ```
  ### Glossary
  **{Term}** {Definition}
  ```
- **Compiler:** Updated [`scripts/convert_insight_to_mdx.py`](scripts/convert_insight_to_mdx.py) to parse the `### Glossary` section into a `glossary` array of objects in the frontmatter and metadata export.
- **Example:** Updated [`src/content/base/blog/text_files/_EXAMPLE_insight.txt`](src/content/base/blog/text_files/_EXAMPLE_insight.txt) with a glossary section containing definitions for *Section 219 Covenant*, *Accretion*, *Avulsion*, and *BCLS*.

### 5. Thicker Section Dividers
- **File:** [`src/templates/PostTemplate.tsx`](src/templates/PostTemplate.tsx)
- **Details:** Updated the `<h2>` section divider lines in the article body to use `border-b-2` (2px) thickness instead of `border-b` (1px) to match the homepage's visual weight.



