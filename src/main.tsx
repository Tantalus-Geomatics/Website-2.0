import { ViteSSG } from 'vite-ssg/react';
import App from './App.tsx';
import './index.css';

/**
 * Vite-SSG handles the creation of the Router and the Root for us.
 * We provide the App component and the routes we want to pre-render.
 */

// Define the routes for the SSG crawler
const routes = [
  { path: '/' },
  { path: '/about' },
  { path: '/services' },
  { path: '/faq' },
  { path: '/contact' },
  { path: '/residential' },
  { path: '/survey-pricing' },
  { path: '/topographic-surveys' },
  { path: '/sea-to-sky-property-line-and-boundary-staking' },
];

export const createApp = ViteSSG(
  // The root component
  <App />,
  // Router options
  { routes },
  // Setup function (runs on both client and server)
  ({ app, router, routes, isClient }) => {
    // You can inject state, analytics, or other plugins here
    if (isClient) {
      console.log('Tantalus Geomatics Site Loaded');
    }
  }
);