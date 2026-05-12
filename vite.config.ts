import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

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