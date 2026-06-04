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

> **Note on Incremental Documentation:**
> This document is built and updated incrementally during codebase modifications to preserve token footprints, optimize context windows, and maintain precise, up-to-date architectural records.
