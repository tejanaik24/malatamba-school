"use client";

const badges = [
  { icon: "🏛️", text: "AP Government Recognized" },
  { icon: "📚", text: "APSCERT Board Affiliated" },
  { icon: "🏅", text: "Est. 2002 — 20 Years Strong" },
  { icon: "👨‍👩‍👧", text: "1000+ Students" },
  { icon: "👩‍🏫", text: "50+ Qualified Faculty" },
  { icon: "⭐", text: "4.9★ Google Rating" },
  { icon: "🚌", text: "Safe School Transport" },
  { icon: "🧪", text: "Modern Science Labs" },
  { icon: "📖", text: "3,000+ Book Library" },
  { icon: "🏆", text: "Award-Winning Education" },
];

export default function TrustBar() {
  const items = [...badges, ...badges, ...badges];

  return (
    <div
      className="relative overflow-hidden py-3 select-none"
      style={{ background: "linear-gradient(90deg, #1a0a0a 0%, #2a0e0f 50%, #1a0a0a 100%)" }}
      aria-hidden="true"
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #1a0a0a, transparent)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #1a0a0a, transparent)" }} />

      <div className="trust-marquee flex gap-0 w-max">
        {items.map((badge, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-5 whitespace-nowrap"
          >
            <span className="text-sm leading-none">{badge.icon}</span>
            <span
              className="text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: "rgba(201,168,76,0.75)" }}
            >
              {badge.text}
            </span>
            <span className="text-white/15 pl-3 text-xs">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
