interface RichImageProps {
  src: string;
  float?: "left" | "right" | "none";
  width?: number; // percentage
  caption?: string;
}

export default function RichImage({ src, float = "none", width = 100, caption }: RichImageProps) {
  const floatClass =
    float === "left" ? "sm:float-left sm:mr-6 sm:mb-2" :
    float === "right" ? "sm:float-right sm:ml-6 sm:mb-2" :
    "mx-auto block";

  return (
    <figure
      className={`${floatClass} mb-4`}
      style={{ width: float === "none" ? `${Math.min(width, 100)}%` : `${Math.min(width, 60)}%` }}
    >
      <img
        src={`/images/${src}`}
        alt={caption || ""}
        className="w-full rounded-lg border border-slate-200 shadow-sm"
        loading="lazy"
      />
      {caption && (
        <figcaption className="text-xs text-slate-500 mt-2 italic">{caption}</figcaption>
      )}
    </figure>
  );
}
