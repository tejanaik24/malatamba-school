"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Hotspot {
  id: string;
  cx: number;
  cy: number;
  label: string;
  icon: string;
  color: string;
  detail: string;
  stats: string;
}

// Sports hotspot removed per spec
const HOTSPOTS: Hotspot[] = [
  {
    id: "classrooms",
    cx: 25, cy: 32,
    label: "Smart Classrooms",
    icon: "🖥️",
    color: "#762123",
    detail: "Interactive smart boards, HD projectors, and digital learning tools in every classroom.",
    stats: "20+ Rooms",
  },
  {
    id: "labs",
    cx: 52, cy: 24,
    label: "Science & Computer Labs",
    icon: "🔬",
    color: "#c9a84c",
    detail: "Physics, Chemistry, Biology labs + 2 computer labs with 40 PCs each and high-speed internet.",
    stats: "80 Computers",
  },
  {
    id: "library",
    cx: 76, cy: 34,
    label: "Library & Reading Room",
    icon: "📚",
    color: "#2e6b3e",
    detail: "Over 5,000 books, reference materials, newspapers, and magazines with dedicated reading space.",
    stats: "5,000+ Books",
  },
  {
    id: "auditorium",
    cx: 52, cy: 62,
    label: "Main Building & Office",
    icon: "🏛️",
    color: "#762123",
    detail: "Administrative offices, auditorium for events, art room, and music hall in the heart of campus.",
    stats: "Est. 2005",
  },
  {
    id: "transport",
    cx: 80, cy: 72,
    label: "Transport Hub",
    icon: "🚌",
    color: "#6b3a1e",
    detail: "Fleet of GPS-tracked buses with trained drivers and female attendants covering all of Visakhapatnam.",
    stats: "City-Wide Routes",
  },
];

// auditorium intentionally absent — no image for that hotspot
const HOTSPOT_IMAGES: Record<string, string> = {
  classrooms: "/ai-images/feature-smartclass.png",
  labs:        "/ai-images/feature-lab.png",
  library:     "/ai-images/feature-library.png",
  transport:   "/ai-images/feature-transport.png",
};

function PulsingDot({ spot, isActive, onClick }: {
  spot: Hotspot;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <g
      className="campus-dot cursor-pointer"
      transform={`translate(${spot.cx}, ${spot.cy})`}
      onClick={onClick}
      role="button"
      aria-label={spot.label}
    >
      {/* Outer ring 2 — scale 1→3, opacity 0.2→0, delay 0.5s */}
      <circle
        r="2.5"
        fill={spot.color}
        fillOpacity="0.2"
        stroke="none"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          animation: "dotPulse2 2s ease-out 0.5s infinite",
        } as React.CSSProperties}
      />
      {/* Outer ring 1 — scale 1→2, opacity 0.4→0 */}
      <circle
        r="2.5"
        fill={spot.color}
        fillOpacity="0.4"
        stroke="none"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          animation: "dotPulse1 2s ease-out infinite",
        } as React.CSSProperties}
      />
      {/* Inner core */}
      <circle
        r="1.5"
        fill={isActive ? "white" : spot.color}
        stroke={isActive ? spot.color : "none"}
        strokeWidth="0.5"
      />
      {/* Active glow ring */}
      {isActive && (
        <circle r="3.5" fill="none" stroke={spot.color} strokeWidth="0.8" opacity="0.6" />
      )}
    </g>
  );
}

export default function CampusMap() {
  const [active, setActive] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeSpot = HOTSPOTS.find((h) => h.id === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cm-heading", {
        y: 30, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none reverse" },
      });
      gsap.from(".cm-map-wrap", {
        opacity: 0, scale: 0.96, duration: 0.9, ease: "power2.out", delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (cardRef.current && active) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 12, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [active]);

  const handleDotClick = (id: string) => {
    setActive((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 overflow-hidden"
      style={{ background: "#1a1a1a" }}
      id="campus-map"
    >
      <style>{`
        @keyframes dotPulse1 {
          0%   { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes dotPulse2 {
          0%   { transform: scale(1); opacity: 0.2; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        {/* Heading */}
        <div className="cm-heading text-center mb-12">
          <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase block mb-3">
            Explore Our Campus
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight" style={{ color: "#ffffff" }}>
            Tap a Spot to Discover
          </h2>
          <p className="text-sm sm:text-base mt-4 max-w-lg mx-auto" style={{ color: "#999" }}>
            Every corner of Malatamba Vidyaniketan is built for learning, growth, and discovery.
          </p>
        </div>

        <div className="cm-map-wrap flex flex-col lg:flex-row gap-8 items-start">

          {/* SVG Map */}
          <div className="w-full lg:flex-1 relative">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                border: "1.5px solid #444",
                background: "#2a2a2a",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full"
                style={{ display: "block" }}
              >
                {/* Campus ground */}
                <rect x="0" y="0" width="100" height="100" fill="#2a2a2a" />

                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
                  </pattern>
                </defs>

                {/* Grid overlay */}
                <rect x="0" y="0" width="100" height="100" fill="url(#grid)" />

                {/* Campus boundary */}
                <rect x="4" y="4" width="92" height="92" rx="3" fill="none" stroke="#555" strokeWidth="0.6" strokeDasharray="2,1" />

                {/* Roads / paths */}
                <path d="M 50 4 L 50 96" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
                <path d="M 4 50 L 96 50" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
                <path d="M 4 85 Q 50 85 96 85" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />

                {/* Building blocks — classrooms zone */}
                <rect x="10" y="18" width="25" height="22" rx="1.5" fill="#2a2a2a" stroke="#555" strokeWidth="0.5" />
                <rect x="12" y="20" width="9" height="5" rx="0.8" fill="#333" />
                <rect x="22" y="20" width="9" height="5" rx="0.8" fill="#333" />
                <rect x="12" y="27" width="9" height="5" rx="0.8" fill="#333" />
                <rect x="22" y="27" width="9" height="5" rx="0.8" fill="#333" />
                <text x="22" y="44" textAnchor="middle" fontSize="2.8" fill="#888" fontWeight="600">CLASSROOMS</text>

                {/* Labs zone */}
                <rect x="38" y="10" width="25" height="20" rx="1.5" fill="#2a2a2a" stroke="#555" strokeWidth="0.5" />
                <rect x="40" y="12" width="10" height="7" rx="0.8" fill="#333" />
                <rect x="51" y="12" width="10" height="7" rx="0.8" fill="#333" />
                <rect x="40" y="20" width="21" height="5" rx="0.8" fill="#333" />
                <text x="50" y="33" textAnchor="middle" fontSize="2.8" fill="#888" fontWeight="600">LABS</text>

                {/* Library */}
                <rect x="68" y="18" width="22" height="22" rx="1.5" fill="#2a2a2a" stroke="#555" strokeWidth="0.5" />
                <rect x="70" y="20" width="18" height="14" rx="0.8" fill="#333" />
                <path d="M 72 22 L 86 22" stroke="#555" strokeWidth="0.8" />
                <path d="M 72 25 L 86 25" stroke="#555" strokeWidth="0.8" />
                <path d="M 72 28 L 86 28" stroke="#555" strokeWidth="0.8" />
                <path d="M 72 31 L 86 31" stroke="#555" strokeWidth="0.8" />
                <text x="79" y="43" textAnchor="middle" fontSize="2.8" fill="#888" fontWeight="600">LIBRARY</text>

                {/* Main Building / Auditorium (center) */}
                <rect x="36" y="48" width="28" height="22" rx="2" fill="#2a2a2a" stroke="#555" strokeWidth="0.7" />
                <path d="M 36 48 L 50 42 L 64 48" fill="#333" stroke="#555" strokeWidth="0.3" />
                <rect x="44" y="58" width="12" height="12" rx="0.5" fill="#333" />
                <rect x="38" y="50" width="7" height="5" rx="0.5" fill="rgba(255,255,255,0.06)" />
                <rect x="55" y="50" width="7" height="5" rx="0.5" fill="rgba(255,255,255,0.06)" />
                <text x="50" y="73" textAnchor="middle" fontSize="2.5" fill="#888" fontWeight="700">MAIN BUILDING</text>

                {/* Transport hub */}
                <rect x="68" y="60" width="22" height="16" rx="1.5" fill="#2a2a2a" stroke="#555" strokeWidth="0.5" />
                <rect x="70" y="62" width="8" height="5" rx="1" fill="#333" />
                <rect x="80" y="62" width="8" height="5" rx="1" fill="#333" />
                <rect x="70" y="68" width="18" height="5" rx="1" fill="#333" />
                <text x="79" y="79" textAnchor="middle" fontSize="2.8" fill="#888" fontWeight="600">TRANSPORT</text>

                {/* Trees / greenery */}
                {[[8,8],[92,8],[8,92],[92,92],[50,8],[50,92],[8,50],[92,50]].map(([tx,ty],i) => (
                  <circle key={i} cx={tx} cy={ty} r="2.5" fill="rgba(60,120,60,0.15)" />
                ))}

                {/* Hotspot dots */}
                {HOTSPOTS.map((spot) => (
                  <PulsingDot
                    key={spot.id}
                    spot={spot}
                    isActive={active === spot.id}
                    onClick={() => handleDotClick(spot.id)}
                  />
                ))}
              </svg>

              {/* Tap hint */}
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap pointer-events-none select-none" style={{ color: "#666" }}>
                Tap a dot to explore
              </p>
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-full lg:w-72 xl:w-80 shrink-0">
            {activeSpot ? (
              <div
                ref={cardRef}
                className="rounded-2xl overflow-hidden shadow-xl"
                style={{ background: "#2a2a2a", border: "1px solid #444" }}
              >
                {/* Facility image — shown for all hotspots except auditorium */}
                {HOTSPOT_IMAGES[activeSpot.id] && (
                  <div style={{ width: "100%", height: "200px", position: "relative" }}>
                    <Image
                      src={HOTSPOT_IMAGES[activeSpot.id]}
                      alt={activeSpot.label}
                      fill
                      style={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }}
                      sizes="(max-width: 1024px) 100vw, 320px"
                    />
                  </div>
                )}

                {/* Card header */}
                <div className="px-6 py-5" style={{ background: activeSpot.color }}>
                  <span className="text-3xl block mb-2">{activeSpot.icon}</span>
                  <h3 className="text-white font-bold text-lg leading-tight">{activeSpot.label}</h3>
                  <span
                    className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
                  >
                    {activeSpot.stats}
                  </span>
                </div>

                {/* Card body */}
                <div className="px-6 py-5" style={{ background: "#2a2a2a" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "#999" }}>{activeSpot.detail}</p>
                  <button
                    onClick={() => setActive(null)}
                    className="mt-4 text-xs hover:text-white transition-colors underline"
                    style={{ color: "#666" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="rounded-2xl p-6"
                style={{ background: "#2a2a2a", border: "1px solid #444" }}
              >
                <h3 className="font-bold text-lg mb-2" style={{ color: "#ffffff" }}>Our Campus</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#999" }}>
                  5 world-class facilities, all within one safe and vibrant campus at PM Palem, Visakhapatnam.
                </p>
                <div className="space-y-3">
                  {HOTSPOTS.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => handleDotClick(spot.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all hover:brightness-125"
                      style={{
                        background: `${spot.color}22`,
                        border: `1px solid ${spot.color}44`,
                      }}
                    >
                      <span className="text-lg leading-none">{spot.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs truncate" style={{ color: spot.color }}>
                          {spot.label}
                        </p>
                        <p className="text-xs" style={{ color: "#666" }}>{spot.stats}</p>
                      </div>
                      <svg className="w-3.5 h-3.5 shrink-0" style={{ color: "#555" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
