import { useEffect } from 'react';

// Tell TypeScript about our custom global window variables
declare global {
  interface Window {
    __IS_PRERENDERING?: boolean;
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default function ThirdPartyScripts() {
  useEffect(() => {
    // 1. Do not load during prerendering
    if (window.__IS_PRERENDERING) {
      return;
    }

    let loaded = false;

    const loadScripts = () => {
      if (loaded) return;
      loaded = true;

      // Remove event listeners
      window.removeEventListener('scroll', loadScripts);
      window.removeEventListener('click', loadScripts);
      window.removeEventListener('mousemove', loadScripts);
      window.removeEventListener('touchstart', loadScripts);
      window.removeEventListener('keydown', loadScripts);

      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer?.push(args);
      }
      window.gtag = gtag;

      // 2. Load Google Tag Manager (GTM-PFWRJL4M)
      (function(w: any, d: Document, s: string, l: string, i: string) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        const f = d.getElementsByTagName(s)[0];
        const j = d.createElement(s) as HTMLScriptElement;
        const dl = l !== 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode?.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-PFWRJL4M');

      // 3. Load Google Analytics (G-F8ZDC6NXGP)
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-F8ZDC6NXGP';
      document.head.appendChild(gaScript);

      window.gtag('js', new Date());
      window.gtag('config', 'G-F8ZDC6NXGP');

      // 4. Load Google Ads (AW-17995462627)
      const adsScript = document.createElement('script');
      adsScript.async = true;
      adsScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17995462627';
      document.head.appendChild(adsScript);

      window.gtag('config', 'AW-17995462627');

      // 5. Load Apollo Tracker
      const n = Math.random().toString(36).substring(7);
      const apolloScript = document.createElement('script');
      apolloScript.src = 'https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=' + n;
      apolloScript.async = true;
      apolloScript.defer = true;
      apolloScript.onload = function() {
        (window as any).trackingFunctions?.onLoad({ appId: '6a17cfd0abdf37000c85fb4b' });
      };
      document.head.appendChild(apolloScript);
    };

    // Add event listeners for first user interaction
    window.addEventListener('scroll', loadScripts, { passive: true });
    window.addEventListener('click', loadScripts, { passive: true });
    window.addEventListener('mousemove', loadScripts, { passive: true });
    window.addEventListener('touchstart', loadScripts, { passive: true });
    window.addEventListener('keydown', loadScripts, { passive: true });

    // Fallback: load after 5 seconds if no interaction occurs
    const timeoutId = setTimeout(loadScripts, 5000);

    return () => {
      window.removeEventListener('scroll', loadScripts);
      window.removeEventListener('click', loadScripts);
      window.removeEventListener('mousemove', loadScripts);
      window.removeEventListener('touchstart', loadScripts);
      window.removeEventListener('keydown', loadScripts);
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
