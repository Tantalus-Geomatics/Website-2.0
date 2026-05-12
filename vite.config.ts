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
        hostname: 'https://tantalus-geomatics.github.io/Website-2.0',
        routes: routes,
        readable: true,
        generateRobotsTxt: false, // As discussed, we'll use the public/robots.txt
      }),
    ],
    base: '/', 
    
    // ADD THIS SECTION TO FIX THE "MISSING SPECIFIER" ERROR
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