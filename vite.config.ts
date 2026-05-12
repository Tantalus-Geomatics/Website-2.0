import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import generateSitemap from 'vite-plugin-sitemap';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  // List of your routes for the sitemap and SSG crawler
  const routes = [
    '/',
    '/about',
    '/services',
    '/faq',
    '/contact',
    '/residential',
    '/survey-pricing',
    '/topographic-surveys',
    '/sea-to-sky-property-line-and-boundary-staking',
  ];

  return {
    plugins: [
      react(), 
      tailwindcss(),
      // Automatically generates sitemap.xml in the dist folder
      generateSitemap({
        hostname: 'https://tantalus-geomatics.github.io/Website-2.0', // Change this to your custom domain if you have one
        routes: routes,
        readable: true,
      }),
    ],
    // If NOT using a custom domain, change this to '/Website-2.0/'
    base: '/', 
    
    // SSG specific configuration
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      // This ensures all your routes are built as physical HTML files
      includedRoutes() {
        return routes;
      },
      // Prevents issues with hydration during the build process
      mock: true,
    },

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});