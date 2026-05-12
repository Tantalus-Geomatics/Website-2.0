import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import generateSitemap from 'vite-plugin-sitemap';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  const routes = [
    '/', '/about', '/services', '/faq', '/contact', 
    '/residential', '/survey-pricing', '/topographic-surveys', 
    '/sea-to-sky-property-line-and-boundary-staking'
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
    
    // VITE 6 COMPATIBILITY
    ssr: {
      // We only need to force the router and the SSG library
      noExternal: [/react-router/, 'vite-react-ssg', 'lucide-react'],
    },

    resolve: {
      alias: {
        // Use import.meta.dirname for modern ESM compatibility
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
  };
});