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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    ssr: {
      noExternal: [
        'vite-react-ssg',
        'react-router-dom',
        'lucide-react',
        'motion',
        '@marsidev/react-turnstile',
        '@google/genai'
      ],
    },
    build: {
      target: 'esnext',
    },
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
  };
});