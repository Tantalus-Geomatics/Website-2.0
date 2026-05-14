import type { ReactNode } from 'react';

type Align = 'center' | 'left';

const questionBase: Record<Align, string> = {
  center:
    'text-xl sm:text-2xl font-light text-white mb-4 leading-snug text-center max-w-4xl mx-auto',
  left: 'text-xl sm:text-2xl font-light text-white mb-4 leading-snug max-w-4xl',
};

/**
 * GEO / AI citation pattern: an explicit question (H3) immediately followed by
 * unchanged site copy that answers it.
 */
export function GeoDirectAnswer({
  question,
  children,
  align = 'left',
  questionClassName = '',
}: {
  question: ReactNode;
  children: ReactNode;
  align?: Align;
  questionClassName?: string;
}) {
  return (
    <>
      <h3 className={`${questionBase[align]} ${questionClassName}`.trim()}>{question}</h3>
      {children}
    </>
  );
}
