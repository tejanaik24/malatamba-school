"use client";

import { useState, useRef, useEffect } from "react";
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
    id: "sports",
    cx: 20, cy: 70,
    label: "Sports Complex",
    icon: "⚽",
    color: "#1e4a8a",
    detail: "Cricket ground, football field, athletics track, basketball courts and indoor games.",
    stats: "5 Sports Arenas",
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
      {/* Pulse ring */}
      <circle
        r="4.5"
        fill="none"
        stroke={isActive ? spot.color : "rgba(255,255,255,0.5)"}
        strokeWidth="1.5"
        className={isActive ? "" : "campus-pulse"}
        style={{ transformOrigin: "0 0" }}
        opacity={isActive ? 1 : 0.6}
      />
      {/* Outer glow ring */}
      {isActive && (
        <circle r="7" fill="none" stroke={spot.color} strokeWidth="1" opacity="0.35" />
      )}
      {/* Core dot */}
      <circle
        r="3"
        fill={isActive ? spot.color : "white"}
        stroke={isActive ? "white" : spot.color}
        strokeWidth="1.2"
      />
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

  // Animate info card on change
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
      className="py-20 sm:py-28 bg-light overflow-hidden"
      id="campus-map"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        {/* Heading */}
        <div className="cm-heading text-center mb-12">
          <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase block mb-3">
            Explore Our Campus
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-dark leading-tight">
            Tap a Spot to Discover
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-lg mx-auto">
            Every corner of Malatamba Vidyaniketan is built for learning, growth, and discovery.
          </p>
        </div>

        <div className="cm-map-wrap flex flex-col lg:flex-row gap-8 items-start">

          {/* SVG Map */}
          <div className="w-full lg:flex-1 relative">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                border: "1.5px solid rgba(118,33,35,0.12)",
                background: "linear-gradient(160deg, #f0ebe8 0%, #e8e0d8 100%)",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full"
                style={{ display: "block" }}
              >
                {/* Campus ground */}
                <rect x="0" y="0" width="100" height="100" fill="url(#groundGrad)" />

                <defs>
                  <linearGradient id="groundGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e8e0d5" />
                    <stop offset="100%" stopColor="#d8cfc4" />
                  </linearGradient>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(118,33,35,0.05)" strokeWidth="0.3" />
                  </pattern>
                </defs>

                {/* Grid overlay */}
                <rect x="0" y="0" width="100" height="100" fill="url(#grid)" />

                {/* Campus boundary */}
                <rect x="4" y="4" width="92" height="92" rx="3" fill="none" stroke="rgba(118,33,35,0.15)" strokeWidth="0.6" strokeDasharray="2,1" />

                {/* Roads / paths */}
                <path d="M 50 4 L 50 96" stroke="rgba(150,130,100,0.35)" strokeWidth="2.5" />
                <path d="M 4 50 L 96 50" stroke="rgba(150,130,100,0.35)" strokeWidth="2.5" />
                <path d="M 4 85 Q 50 85 96 85" stroke="rgba(150,130,100,0.25)" strokeWidth="1.5" />

                {/* Building blocks — classrooms zone */}
                <rect x="10" y="18" width="25" height="22" rx="1.5" fill="rgba(118,33,35,0.12)" stroke="rgba(118,33,35,0.25)" strokeWidth="0.5" />
                <rect x="12" y="20" width="9" height="5" rx="0.8" fill="rgba(118,33,35,0.18)" />
                <rect x="22" y="20" width="9" height="5" rx="0.8" fill="rgba(118,33,35,0.18)" />
                <rect x="12" y="27" width="9" height="5" rx="0.8" fill="rgba(118,33,35,0.18)" />
                <rect x="22" y="27" width="9" height="5" rx="0.8" fill="rgba(118,33,35,0.18)" />
                <text x="22" y="44" textAnchor="middle" fontSize="2.8" fill="rgba(118,33,35,0.5)" fontWeight="600">CLASSROOMS</text>

                {/* Labs zone */}
                <rect x="38" y="10" width="25" height="20" rx="1.5" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.4)" strokeWidth="0.5" />
                <rect x="40" y="12" width="10" height="7" rx="0.8" fill="rgba(201,168,76,0.25)" />
                <rect x="51" y="12" width="10" height="7" rx="0.8" fill="rgba(201,168,76,0.25)" />
                <rect x="40" y="20" width="21" height="5" rx="0.8" fill="rgba(201,168,76,0.2)" />
                <text x="50" y="33" textAnchor="middle" fontSize="2.8" fill="rgba(150,120,40,0.7)" fontWeight="600">LABS</text>

                {/* Library */}
                <rect x="68" y="18" width="22" height="22" rx="1.5" fill="rgba(46,107,62,0.12)" stroke="rgba(46,107,62,0.3)" strokeWidth="0.5" />
                <rect x="70" y="20" width="18" height="14" rx="0.8" fill="rgba(46,107,62,0.15)" />
                <path d="M 72 22 L 86 22" stroke="rgba(46,107,62,0.4)" strokeWidth="0.8" />
                <path d="M 72 25 L 86 25" stroke="rgba(46,107,62,0.4)" strokeWidth="0.8" />
                <path d="M 72 28 L 86 28" stroke="rgba(46,107,62,0.4)" strokeWidth="0.8" />
                <path d="M 72 31 L 86 31" stroke="rgba(46,107,62,0.4)" strokeWidth="0.8" />
                <text x="79" y="43" textAnchor="middle" fontSize="2.8" fill="rgba(46,107,62,0.6)" fontWeight="600">LIBRARY</text>

                {/* Main Building / Auditorium (center) */}
                <rect x="36" y="48" width="28" height="22" rx="2" fill="rgba(118,33,35,0.18)" stroke="rgba(118,33,35,0.4)" strokeWidth="0.7" />
                <path d="M 36 48 L 50 42 L 64 48" fill="rgba(118,33,35,0.25)" />
                <rect x="44" y="58" width="12" height="12" rx="0.5" fill="rgba(118,33,35,0.2)" />
                <rect x="38" y="50" width="7" height="5" rx="0.5" fill="rgba(255,255,255,0.35)" />
                <rect x="55" y="50" width="7" height="5" rx="0.5" fill="rgba(255,255,255,0.35)" />
                <text x="50" y="73" textAnchor="middle" fontSize="2.5" fill="rgba(118,33,35,0.6)" fontWeight="700">MAIN BUILDING</text>

                {/* Sports zone */}
                <ellipse cx="20" cy="72" rx="12" ry="9" fill="rgba(30,74,138,0.1)" stroke="rgba(30,74,138,0.25)" strokeWidth="0.5" />
                <ellipse cx="20" cy="72" rx="7" ry="5" fill="none" stroke="rgba(30,74,138,0.3)" strokeWidth="0.4" strokeDasharray="1,0.5" />
                <line x1="20" y1="63" x2="20" y2="81" stroke="rgba(30,74,138,0.25)" strokeWidth="0.4" />
                <text x="20" y="84" textAnchor="middle" fontSize="2.8" fill="rgba(30,74,138,0.6)" fontWeight="600">SPORTS</text>

                {/* Transport hub */}
                <rect x="68" y="60" width="22" height="16" rx="1.5" fill="rgba(107,58,30,0.12)" stroke="rgba(107,58,30,0.3)" strokeWidth="0.5" />
                <rect x="70" y="62" width="8" height="5" rx="1" fill="rgba(107,58,30,0.2)" />
                <rect x="80" y="62" width="8" height="5" rx="1" fill="rgba(107,58,30,0.2)" />
                <rect x="70" y="68" width="18" height="5" rx="1" fill="rgba(107,58,30,0.15)" />
                <text x="79" y="79" textAnchor="middle" fontSize="2.8" fill="rgba(107,58,30,0.6)" fontWeight="600">TRANSPORT</text>

                {/* Trees / greenery */}
                {[[8,8],[92,8],[8,92],[92,92],[50,8],[50,92],[8,50],[92,50]].map(([tx,ty],i) => (
                  <circle key={i} cx={tx} cy={ty} r="2.5" fill="rgba(60,120,60,0.2)" />
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
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap pointer-events-none select-none">
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
                style={{ border: `2px solid ${activeSpot.color}22` }}
              >
                {/* Card header */}
                <div
                  className="px-6 py-5"
                  style={{ background: activeSpot.color }}
                >
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
                <div className="bg-white px-6 py-5">
                  <p className="text-gray-600 text-sm leading-relaxed">{activeSpot.detail}</p>
                  <button
                    onClick={() => setActive(null)}
                    className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-white shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-dark text-lg mb-2">Our Campus</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  6 world-class facilities, all within one safe and vibrant campus at PM Palem, Visakhapatnam.
                </p>
                <div className="space-y-3">
                  {HOTSPOTS.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => handleDotClick(spot.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all hover:shadow-md"
                      style={{
                        background: `${spot.color}0d`,
                        border: `1px solid ${spot.color}22`,
                      }}
                    >
                      <span className="text-lg leading-none">{spot.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-semibold text-xs truncate"
                          style={{ color: spot.color }}
                        >
                          {spot.label}
                        </p>
                        <p className="text-gray-400 text-xs">{spot.stats}</p>
                      </div>
                      <svg className="w-3.5 h-3.5 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
