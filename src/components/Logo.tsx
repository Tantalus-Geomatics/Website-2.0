export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M400 10 L440 80 L480 120 L520 100 L600 180 L650 160 L780 280 L20 280 L120 220 L180 240 L250 160 L320 180 Z" fill="white" />
      <path d="M400 10 L440 80 L410 120 L480 180 L440 220 L520 280 L400 280 Z" fill="black" />
      <path d="M520 100 L600 180 L560 220 L640 280 L520 280 Z" fill="black" />
      <path d="M250 160 L320 180 L280 220 L350 280 L250 280 Z" fill="black" />
    </svg>
  );
}
