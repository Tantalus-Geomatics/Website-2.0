import { useState, useEffect, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Tell TypeScript about our custom global window variable
declare global {
  interface Window {
    __IS_PRERENDERING?: boolean;
  }
}

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Only mount the complex widgets if we are in a REAL live browser
    if (!window.__IS_PRERENDERING) {
      setHasMounted(true);
    }
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
