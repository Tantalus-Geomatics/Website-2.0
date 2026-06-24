import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews } from "../data/reviews";

const SOURCE_COLORS: Record<string, string> = {
  google: "#EA4335",
  facebook: "#1877F2",
  other: "#6B7280",
};

const SOURCE_LABELS: Record<string, string> = {
  google: "Google",
  facebook: "Facebook",
  other: "Review",
};

export function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = reviews.length;
  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  const startTimer = () => {
    timerRef.current = setInterval(next, 5000);
  };
  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, []);

  // Show 1 card on mobile, 2 on sm+
  // On sm+ show current index and (index+1) % count
  const visible = [
    reviews[index],
    reviews[(index + 1) % count],
  ];

  return (
    <div
      className="relative w-full"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visible.map((review, i) => (
          <div
            key={review.id}
            className={`p-5 bg-white/5 border border-white/10 rounded-xl ${
              i === 1 ? "hidden sm:block" : ""
            }`}
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  size={14}
                  className={
                    s < review.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-white/20"
                  }
                />
              ))}
            </div>
            {/* Body */}
            <p className="text-sm text-white/70 font-light leading-relaxed mb-4">
              "{review.body}"
            </p>
            {/* Footer row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{review.author}</p>
                <p className="text-xs text-white/40">{review.date}</p>
              </div>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  color: SOURCE_COLORS[review.source],
                  border: `1px solid ${SOURCE_COLORS[review.source]}40`,
                  background: `${SOURCE_COLORS[review.source]}15`,
                }}
              >
                {SOURCE_LABELS[review.source]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={prev}
          aria-label="Previous review"
          className="p-1.5 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index ? "bg-brand-green" : "bg-white/20"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next review"
          className="p-1.5 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
