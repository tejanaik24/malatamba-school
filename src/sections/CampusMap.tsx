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
    stats: "40 Computers",
  },
  {
    id: "library",
    cx: 76, cy: 34,
    label: "Library & Reading Room",
    icon: "📚",
    color: "#2e6b3e",
    detail: "Over 3,000 books, reference materials, newspapers, and magazines with dedicated reading space.",
    stats: "3,000+ Books",
  },
  {
    id: "auditorium",
    cx: 52, cy: 62,
    label: "Main Building & Office",
    icon: "🏛️",
    color: "#762123",
    detail: "Administrative offices, auditorium for events, art room, and music hall in the heart of campus.",
    stats: "Est. 2002",
  },
  {
    id: "transport",
    cx: 80, cy: 72,
    label: "Transport Hub",
    icon: "🚌",
    color: "#6b3a1e",
    detail: "Fleet of school buses with trained drivers and male and female attendants covering all of Visakhapatnam.",
    stats: "City-Wide Routes",
  },
];

const HOTSPOT_IMAGES: Record<string, string> = {
  classrooms: "/ai-images/feature-smartclass.webp",
  labs:        "/ai-images/feature-lab.webp",
  library:     "/ai-images/feature-library.webp",
  transport:   "/ai-images/feature-transport.webp",
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
      {/* Pulse rings */}
      <circle
        r="2.8"
        fill={spot.color}
        fillOpacity="0.2"
        stroke="none"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          animation: "dotPulse2 2s ease-out 0.5s infinite",
        } as React.CSSProperties}
      />
      <circle
        r="2.8"
        fill={spot.color}
        fillOpacity="0.35"
        stroke="none"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          animation: "dotPulse1 2s ease-out infinite",
        } as React.CSSProperties}
      />
      {/* White ring border */}
      <circle r="2.2" fill="white" stroke="none" />
      {/* Core */}
      <circle
        r="1.6"
        fill={isActive ? "white" : spot.color}
        stroke={spot.color}
        strokeWidth="0.5"
      />
      {/* Active outer ring */}
      {isActive && (
        <circle r="3.5" fill="none" stroke={spot.color} strokeWidth="0.8" opacity="0.5" />
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
      style={{ background: "#FAFAF7" }}
      id="campus-map"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes dotPulse1 {
          0%   { transform: scale(1); opacity: 0.35; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes dotPulse2 {
          0%   { transform: scale(1); opacity: 0.2; }
          100% { transform: scale(3.2); opacity: 0; }
        }
      `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        {/* Heading */}
        <div className="cm-heading text-center mb-12">
          <span
            className="font-bold text-xs tracking-[0.25em] uppercase block mb-3"
            style={{ color: "#762123" }}
          >
            Explore Our Campus
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight text-dark">
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
              className="relative rounded-3xl overflow-hidden"
              style={{
                border: "1.5px solid rgba(118,33,35,0.12)",
                background: "#fff",
                boxShadow: "0 8px 40px rgba(118,33,35,0.08), 0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full"
                style={{ display: "block" }}
              >
                <defs>
                  {/* Warm ground gradient */}
                  <linearGradient id="groundGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fdf8f4" />
                    <stop offset="100%" stopColor="#f5ede6" />
                  </linearGradient>
                  {/* Green zone for sports/garden area */}
                  <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4edda" />
                    <stop offset="100%" stopColor="#b8dfc3" />
                  </linearGradient>
                  {/* Drop shadow filter */}
                  <filter id="bldgShadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="0.4" dy="0.8" stdDeviation="0.6" floodColor="rgba(118,33,35,0.18)" />
                  </filter>
                  <filter id="pinShadow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="rgba(0,0,0,0.25)" />
                  </filter>
                </defs>

                {/* Ground */}
                <rect x="0" y="0" width="100" height="100" fill="url(#groundGrad)" />

                {/* Campus boundary — clean solid line */}
                <rect
                  x="4" y="4" width="92" height="92" rx="4"
                  fill="none"
                  stroke="rgba(118,33,35,0.18)"
                  strokeWidth="0.7"
                  strokeDasharray="3,1.5"
                />

                {/* Green garden / open ground (bottom-left zone) */}
                <ellipse cx="20" cy="72" rx="13" ry="10"
                  fill="url(#greenGrad)"
                  stroke="rgba(46,107,62,0.25)" strokeWidth="0.4"
                />
                {/* Tree clusters on green */}
                {[[16,68],[22,68],[18,74],[24,74],[14,73]].map(([tx,ty],i) => (
                  <g key={i}>
                    <circle cx={tx} cy={ty} r="1.6" fill="rgba(46,107,62,0.55)" />
                    <circle cx={tx} cy={ty} r="0.9" fill="rgba(46,107,62,0.8)" />
                  </g>
                ))}
                <text x="20" y="83" textAnchor="middle" fontSize="2.2" fill="rgba(46,107,62,0.65)" fontWeight="600" fontStyle="italic">Garden</text>

                {/* Corner accent trees */}
                {[[8,8],[92,8],[8,92],[92,92]].map(([tx,ty],i) => (
                  <g key={i}>
                    <circle cx={tx} cy={ty} r="2.2" fill="rgba(46,107,62,0.3)" />
                    <circle cx={tx} cy={ty} r="1.2" fill="rgba(46,107,62,0.55)" />
                  </g>
                ))}

                {/* Pathway network */}
                {/* Main vertical spine */}
                <path d="M 50 4 L 50 96" stroke="#e8ddd5" strokeWidth="2.5" />
                {/* Main horizontal spine */}
                <path d="M 4 50 L 96 50" stroke="#e8ddd5" strokeWidth="2.5" />
                {/* Secondary path at bottom */}
                <path d="M 4 85 Q 50 85 96 85" stroke="#e8ddd5" strokeWidth="1.5" />
                {/* Path center lines (lighter) */}
                <path d="M 50 4 L 50 96" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeDasharray="1.5,2" />
                <path d="M 4 50 L 96 50" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeDasharray="1.5,2" />

                {/* ── CLASSROOMS ZONE ── */}
                <g filter="url(#bldgShadow)">
                  <rect x="10" y="18" width="25" height="22" rx="2" fill="white" stroke="rgba(118,33,35,0.22)" strokeWidth="0.6" />
                  {/* Window grid */}
                  <rect x="12" y="20" width="9" height="5.5" rx="1" fill="rgba(118,33,35,0.08)" stroke="rgba(118,33,35,0.2)" strokeWidth="0.4" />
                  <rect x="22" y="20" width="9" height="5.5" rx="1" fill="rgba(118,33,35,0.08)" stroke="rgba(118,33,35,0.2)" strokeWidth="0.4" />
                  <rect x="12" y="27" width="9" height="5.5" rx="1" fill="rgba(118,33,35,0.08)" stroke="rgba(118,33,35,0.2)" strokeWidth="0.4" />
                  <rect x="22" y="27" width="9" height="5.5" rx="1" fill="rgba(118,33,35,0.08)" stroke="rgba(118,33,35,0.2)" strokeWidth="0.4" />
                  {/* Crimson roof line */}
                  <rect x="10" y="18" width="25" height="2" rx="2" fill="rgba(118,33,35,0.35)" />
                </g>
                <text x="22" y="44.5" textAnchor="middle" fontSize="2.6" fill="#762123" fontWeight="700" letterSpacing="0.05em">CLASSROOMS</text>

                {/* ── LABS ZONE ── */}
                <g filter="url(#bldgShadow)">
                  <rect x="38" y="10" width="25" height="20" rx="2" fill="white" stroke="rgba(201,168,76,0.35)" strokeWidth="0.6" />
                  <rect x="40" y="12" width="10" height="7.5" rx="1" fill="rgba(201,168,76,0.12)" stroke="rgba(201,168,76,0.35)" strokeWidth="0.4" />
                  <rect x="51" y="12" width="10" height="7.5" rx="1" fill="rgba(201,168,76,0.12)" stroke="rgba(201,168,76,0.35)" strokeWidth="0.4" />
                  <rect x="40" y="21" width="21" height="5" rx="1" fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.25)" strokeWidth="0.4" />
                  {/* Gold roof line */}
                  <rect x="38" y="10" width="25" height="2" rx="2" fill="rgba(201,168,76,0.5)" />
                </g>
                <text x="50" y="33.5" textAnchor="middle" fontSize="2.6" fill="#9a7b1e" fontWeight="700" letterSpacing="0.05em">LABS</text>

                {/* ── LIBRARY ── */}
                <g filter="url(#bldgShadow)">
                  <rect x="68" y="18" width="22" height="22" rx="2" fill="white" stroke="rgba(46,107,62,0.3)" strokeWidth="0.6" />
                  <rect x="70" y="20" width="18" height="14" rx="1" fill="rgba(46,107,62,0.07)" stroke="rgba(46,107,62,0.2)" strokeWidth="0.4" />
                  {/* Book shelves */}
                  {[22, 25, 28, 31].map((y, i) => (
                    <path key={i} d={`M 72 ${y} L 86 ${y}`} stroke="rgba(46,107,62,0.35)" strokeWidth="0.7" />
                  ))}
                  {/* Green roof line */}
                  <rect x="68" y="18" width="22" height="2" rx="2" fill="rgba(46,107,62,0.4)" />
                </g>
                <text x="79" y="43.5" textAnchor="middle" fontSize="2.6" fill="#2e6b3e" fontWeight="700" letterSpacing="0.05em">LIBRARY</text>

                {/* ── MAIN BUILDING (center) ── */}
                <g filter="url(#bldgShadow)">
                  {/* Roof triangle */}
                  <path d="M 36 48 L 50 42 L 64 48" fill="rgba(118,33,35,0.6)" />
                  {/* Main body */}
                  <rect x="36" y="48" width="28" height="22" rx="1.5" fill="white" stroke="rgba(118,33,35,0.3)" strokeWidth="0.7" />
                  {/* Door */}
                  <rect x="44" y="58" width="12" height="12" rx="0.5" fill="rgba(118,33,35,0.12)" stroke="rgba(118,33,35,0.3)" strokeWidth="0.5" />
                  {/* Windows */}
                  <rect x="38" y="50" width="7" height="5" rx="0.8" fill="rgba(118,33,35,0.08)" stroke="rgba(118,33,35,0.2)" strokeWidth="0.4" />
                  <rect x="55" y="50" width="7" height="5" rx="0.8" fill="rgba(118,33,35,0.08)" stroke="rgba(118,33,35,0.2)" strokeWidth="0.4" />
                </g>
                <text x="50" y="73.5" textAnchor="middle" fontSize="2.4" fill="#762123" fontWeight="700" letterSpacing="0.04em">MAIN BUILDING</text>

                {/* ── TRANSPORT HUB ── */}
                <g filter="url(#bldgShadow)">
                  <rect x="68" y="60" width="22" height="16" rx="2" fill="white" stroke="rgba(107,58,30,0.3)" strokeWidth="0.6" />
                  {/* Bus shapes */}
                  <rect x="70" y="62" width="8" height="5.5" rx="1.2" fill="rgba(107,58,30,0.12)" stroke="rgba(107,58,30,0.3)" strokeWidth="0.4" />
                  <rect x="80" y="62" width="8" height="5.5" rx="1.2" fill="rgba(107,58,30,0.12)" stroke="rgba(107,58,30,0.3)" strokeWidth="0.4" />
                  <rect x="70" y="69" width="18" height="4" rx="1" fill="rgba(107,58,30,0.08)" stroke="rgba(107,58,30,0.2)" strokeWidth="0.4" />
                  <rect x="68" y="60" width="22" height="2" rx="2" fill="rgba(107,58,30,0.4)" />
                </g>
                <text x="79" y="79.5" textAnchor="middle" fontSize="2.6" fill="#6b3a1e" fontWeight="700" letterSpacing="0.05em">TRANSPORT</text>

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
                className="rounded-2xl overflow-hidden"
                style={{
                  boxShadow: `0 8px 32px ${activeSpot.color}22, 0 2px 8px rgba(0,0,0,0.06)`,
                  border: `1.5px solid ${activeSpot.color}33`,
                }}
              >
                {/* Facility image */}
                {HOTSPOT_IMAGES[activeSpot.id] && (
                  <div style={{ width: "100%", height: "200px", position: "relative" }}>
                    <Image
                      src={HOTSPOT_IMAGES[activeSpot.id]}
                      alt={activeSpot.label}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 1024px) 100vw, 320px"
                    />
                    {/* Gradient overlay at bottom */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35) 100%)"
                    }} />
                  </div>
                )}

                {/* Card header */}
                <div className="px-6 py-5" style={{ background: activeSpot.color }}>
                  <span className="text-3xl block mb-2">{activeSpot.icon}</span>
                  <h3 className="text-white font-bold text-lg leading-tight">{activeSpot.label}</h3>
                  <span
                    className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "rgba(255,255,255,0.22)", color: "white" }}
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
              <div
                className="rounded-2xl bg-white p-6"
                style={{
                  boxShadow: "0 4px 24px rgba(118,33,35,0.07), 0 1px 4px rgba(0,0,0,0.04)",
                  border: "1.5px solid rgba(118,33,35,0.1)",
                }}
              >
                <h3 className="font-bold text-dark text-lg mb-2">Our Campus</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  5 world-class facilities, all within one safe and vibrant campus at PM Palem, Visakhapatnam.
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
                        <p className="font-semibold text-xs truncate" style={{ color: spot.color }}>
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
