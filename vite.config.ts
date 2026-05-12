import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import generateSitemap from 'vite-plugin-sitemap';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
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
      generateSitemap({
        hostname: 'https://www.tantalusgeomatics.com',
        routes: routes,
        readable: true,
        generateRobotsTxt: false,
      }),
    ],
    base: '/', 
    
    // THE FIX FOR VITE 6
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
        // Force Vite to find the SSG code regardless of "exports" maps
        'vite-ssg/react': path.resolve(import.meta.dirname, 'node_modules/vite-ssg/dist/react/index.mjs'),
      },
    },

    // Ensure Vite treats the SSG library as ESM
    ssr: {
      noExternal: ['vite-ssg', 'react-router-dom'],
    },

    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      includedRoutes() {
        return routes;
      },
      mock: true,
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
  };
});