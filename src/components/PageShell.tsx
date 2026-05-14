import type { ReactNode } from 'react';

export default function PageShell({ children }: { children: ReactNode }) {
  return <div className="bg-brand-black min-h-screen">{children}</div>;
}
