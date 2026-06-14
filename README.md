# Tantalus Geomatics Website

Welcome to the repository for the **Tantalus Geomatics** website. This is a highly optimized, SEO-hardened static marketing platform built using a modern React 19 and Vite 6 stack. 

The site utilizes a custom automated pipeline that takes raw service text files, compiles them into MDX templates, generates a multi-location localization matrix (14 target municipal areas), and pre-renders the entire application into fully static HTML using headless Chrome (Puppeteer). This ensures lightning-fast load times, flawless client-side hydration, and perfect search engine indexing on GitHub Pages.

---

## Tech Stack & Prerequisites

### Core Core Technology
* **Frontend Framework:** React 19 (Functional components, Hooks)
* **Routing:** React Router v7 (`react-router-dom`)
* **Build Tooling:** Vite 6 + TypeScript (`~5.8.2`)
* **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite`)
* **Content Format:** MDX (Markdown Components via `@mdx-js/rollup` + `remark-frontmatter`)

### Systems Prerequisites
* **Node.js:** Version 20.x or higher
* **Python:** Version 3.x or higher (for the initial text compilation step)

---

## Getting Started

### 1. Clone & Install Dependencies
Clone the repository and install the Node modules. Because this project runs on React 19, you must use the legacy peer dependency flag to accommodate specific ecosystem plugins:

```bash
npm install --legacy-peer-deps