interface RichVideoProps {
  url: string;
  width?: number; // percentage
  caption?: string;
}

function getEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return null;
}

export default function RichVideo({ url, width = 100, caption }: RichVideoProps) {
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    console.warn(`RichVideo: could not parse video URL "${url}"`);
    return null;
  }

  return (
    <figure
      className="mx-auto block mb-4"
      style={{ width: `${Math.min(width, 100)}%` }}
    >
      <div className="relative w-full rounded-lg overflow-hidden border border-slate-200 shadow-sm" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={embedUrl}
          title={caption || "Embedded video"}
          className="absolute inset-0 w-full h-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="text-xs text-slate-500 mt-2 italic">{caption}</figcaption>
      )}
    </figure>
  );
}
