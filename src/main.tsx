import { ViteReactSSG } from 'vite-react-ssg';
import App from './App.tsx';
import './index.css';

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

// Note: We export 'createApp' which vite-react-ssg uses as the entry point
export const createRoot = ViteReactSSG(
  <App />,
  { routes },
  ({ isClient }) => {
    if (isClient) {
      console.log('Tantalus Geomatics Loaded');
    }
  }
);