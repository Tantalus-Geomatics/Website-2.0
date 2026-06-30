interface RichMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: number;
}

export default function RichMap({ lat, lng, zoom = 14, height = 320 }: RichMapProps) {
  return (
    <div className="w-full my-4 rounded-lg overflow-hidden border border-slate-200 shadow-sm" style={{ height }}>
      <iframe
        title="Project location map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
      />
    </div>
  );
}
