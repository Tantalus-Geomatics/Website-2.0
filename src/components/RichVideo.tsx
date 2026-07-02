interface RichVideoProps {
  url: string;
  width?: number; // percentage
  caption?: string;
}

function getEmbedUrl(url: string): string | null {
  // Standard: youtube.com/watch?v=ID or youtube.com/watch?v=ID&other=params
  const ytWatch = url.match(/youtube\.com\/watch\?(?:.*&)?v=([\w-]{11})/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;

  // Shortened: youtu.be/ID or youtu.be/ID?si=...
  const ytShort = url.match(/youtu\.be\/([\w-]{11})/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;

  // Already an embed URL
  const ytEmbed = url.match(/youtube\.com\/embed\/([\w-]{11})/);
  if (ytEmbed) return `https://www.youtube.com/embed/${ytEmbed[1]}`;

  // YouTube Shorts: youtube.com/shorts/ID or youtube.com/shorts/ID?si=...
  const ytShorts = url.match(/youtube\.com\/shorts\/([\w-]{11})/);
  if (ytShorts) return `https://www.youtube.com/embed/${ytShorts[1]}`;

  // Vimeo: vimeo.com/ID
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}

export default function RichVideo({ url, width = 100, caption }: RichVideoProps) {
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    console.warn(`RichVideo: could not parse video URL "${url}"`);
    // Render a stable fallback — never return null from a hydrated component
    return (
      <div className="w-full my-4 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 text-sm italic" style={{ height: 120 }}>
        Video unavailable — unsupported URL format
      </div>
    );
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
