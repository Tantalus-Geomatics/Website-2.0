import { ViteReactSSG } from 'vite-react-ssg';
import App from './App.tsx';
import './index.css';

const routes = [
  '/', '/about', '/services', '/faq', '/contact', 
  '/residential', '/survey-pricing', '/topographic-surveys', 
  '/sea-to-sky-property-line-and-boundary-staking'
];

export const createRoot = ViteReactSSG(
  App,
  { routes },
  // Adding the setup function helps satisfy the "fn is not a function" 
  // check we saw earlier
  () => { } 
);