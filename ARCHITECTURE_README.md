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

> **Note on Incremental Documentation:**
> This document is built and updated incrementally during codebase modifications to preserve token footprints, optimize context windows, and maintain precise, up-to-date architectural records.
