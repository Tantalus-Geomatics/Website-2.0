import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import Sitemap from 'vite-plugin-sitemap'; // 1. Import the plugin

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  // Your perfectly formatted routes list
  const routes = [
    '/', '/about/', '/services/', '/faq/', '/contact/', 
    '/residential/', '/survey-pricing/', '/topographic-surveys/', 
    '/sea-to-sky-property-line-and-boundary-staking/', '/surveys-and-title-insurance/', '/subdivisions/'
  ];

  return {
    plugins: [
      react(), 
      tailwindcss(),
      // 2. Call the plugin and pass your routes as the source of truth
      Sitemap({
        hostname: 'https://www.tantalusgeomatics.com',
        dynamicRoutes: routes,
        generateRobotsTxt: true, // Bonus: This auto-generates a robots.txt file to tell Googlebot exactly where this sitemap is!
      }),
    ],
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
  };
});