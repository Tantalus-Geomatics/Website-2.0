import { ViteReactSSG } from 'vite-react-ssg';
import App from './App.tsx';
import './index.css';

// vite-react-ssg prefers objects for the routes array
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

export const createRoot = ViteReactSSG(
  App,
  { routes }
  // We are omitting the 3rd argument entirely to avoid the 'fn' error
);