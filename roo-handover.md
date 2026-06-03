# Roo Handover Document

Phase 2 Complete. Begin executing Phase 3.

### PHASE 2: Text File Frontmatter & Content Overhaul
- [x] **Frontmatter Update:** Added `category` and `service_gallery` fields to all 28 `.txt` files in `src/content/base/services/text_files/`.
- [x] **Content Edit (Concise & Technical):** Cleaned up fluff, marketing phrasing, and redundant adjectives across all files.
- [x] **Typography Emphasis:** Applied `<span className="text-brand-green font-semibold">Location Name</span>` for locations, **bolding** for Acts/Regulations/Legislation/Rules, and *italics* for professional designations (e.g., *BCLS*, *P.Eng.*).

### PHASE 3: Service Template UI & Layout Refactor
Open `src/templates/ServiceTemplate.tsx` (and related location variants) and make the following updates:
1. **Hero Section:** Make the hero sub-text dynamic and unique (e.g., `Professional {serviceName} in {locationName}`). Remove the dark background opacity overlay completely. Add `object-top` to the image class so it justifies from the top and cuts off at the bottom.
2. **Duplicate Question:** Locate and delete the duplicate question text rendered just above the steps array.
3. **Category Cross-Linking:** Below the main content, add a new section titled "Other {Category Name} Services". Cross-reference the current service's category and map links to the other services within that same category.
4. **Local Resources UI:** Reorganize the local resources mapping block. Render every link as a uniform white button: `bg-white border border-slate-200 text-slate-800 hover:shadow-md rounded-lg p-4 flex items-center justify-between`. On the left side of the text, add a unique green Lucide icon (e.g., `FileText className="text-brand-green w-5 h-5 mr-3"`). On the far right, add a right-pointing arrow (`ArrowRight className="text-slate-400 w-4 h-4"`).

### PHASE 4: Global Layout & Footer Tweaks
1. **Author Bio:** Open `src/components/AuthorBio.tsx` (and where it is imported in `Layout.tsx`). Remove all top and bottom margins/padding (`my-0`, `py-0`) so it sits flush without white space above and below it at the bottom of the page.
2. **Footer Map:** Open `src/components/Layout.tsx`. Locate the delimited location navigation links currently above the map. Move this entire `<div>` to sit *beneath* the map. Update the text size to `text-sm`. Make the location names green (`text-brand-green hover:text-brand-green-dark`), but ensure the delimiter (`|`) remains a neutral color (`text-slate-300`).

### PHASE 5: Automation Pipeline Update (The Single Source of Truth)
We need dropping a new `.txt` file into `text_files/` to automatically trigger the entire pipeline.
1. Open `scripts/generate-localized-content.js` and `convert_to_mdx.py`.
2. Modify the scripts so that they dynamically read the new `category` and `service_gallery` frontmatter fields from the `.txt` files.
3. Add a script step (Node or Python) that parses all `.txt` files and *automatically overwrites/generates* the data arrays in `src/config/servicesStructure.ts` and `src/pages/Services.tsx`. This means the `.txt` files are now the absolute single source of truth; if a new text file is added, the script will automatically register it in the categorical config and the main services page grid on the next build.

---

**Instructions for the User:**
Please start a **New Task** to begin **Phase 3: Service Template UI & Layout Refactor**.
