"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageData } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

// prop kept for page.tsx compatibility — not used in this section
interface VideoSectionProps {
  images: ImageData[];
}

const INFO_ROWS = [
  { icon: "📍", text: "Sadguru Towers, Malatamba Road,\nP.M.Palem, Visakhapatnam – 530041" },
  { icon: "📞", text: "083743 55556" },
  { icon: "📞", text: "092997 52543" },
  { icon: "✉️", text: "principalmalatambaschools@gmail.com" },
  { icon: "🕐", text: "Mon–Sat · 8:00 AM – 4:00 PM" },
];

const BUTTONS = [
  {
    label: "📞 Call Us",
    href: "tel:08374355556",
    bg: "transparent",
    color: "white",
    border: "1px solid #334155",
    hoverBg: "#334155",
  },
  {
    label: "💬 WhatsApp",
    href: "https://wa.me/918374355556",
    bg: "#25D366",
    color: "white",
    border: "none",
    hoverBg: "#1fb558",
  },
  {
    label: "🗺️ Get Directions",
    href: "https://maps.google.com/?q=Sadguru+Towers+Malatamba+Road+PM+Palem+Visakhapatnam",
    bg: "#c9a84c",
    color: "#0f172a",
    border: "none",
    hoverBg: "#b8973e",
  },
];

export default function VideoSection({ images }: VideoSectionProps) {
  void images;

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const mapRef    = useRef<HTMLDivElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(mapRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="find-us"
      style={{ background: "#0f172a" }}
    >
      <style>{`
        .find-us-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 80px 72px;
        }
        .find-us-cols {
          display: flex;
          flex-direction: row;
          gap: 24px;
          align-items: stretch;
        }
        .find-us-map-col {
          flex: 0 0 60%;
        }
        .find-us-card-col {
          flex: 1;
          min-width: 0;
        }
        .fu-btn {
          display: block;
          width: 100%;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s;
        }
        @media (max-width: 1023px) {
          .find-us-inner { padding: 48px 24px; }
          .find-us-cols  { flex-direction: column; }
          .find-us-map-col,
          .find-us-card-col { flex: unset; width: 100%; }
          .find-us-inner { padding: 48px 24px !important; }
        }
      `}</style>

      <div className="find-us-inner">

        {/* Label + Heading */}
        <div ref={headingRef} style={{ textAlign: "center", marginBottom: "48px", position: "relative", zIndex: 10 }}>
          <p style={{
            color: "#c9a84c",
            letterSpacing: "0.2em",
            fontSize: "11px",
            fontFamily: "monospace",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}>
            VISIT US
          </p>
          <h2 style={{
            color: "white",
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
          }}>
            Find Malatamba Vidyaniketan
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="find-us-cols">

          {/* LEFT — Google Maps embed */}
          <div
            ref={mapRef}
            className="find-us-map-col"
            style={{
              border: "1px solid #1e293b",
              borderRadius: "16px",
              overflow: "hidden",
              minHeight: "480px",
            }}
          >
            <iframe
              src="https://maps.google.com/maps?q=PM+Palem+Visakhapatnam+530041&output=embed&z=15"
              width="100%"
              height="480"
              style={{ border: "none", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Malatamba Vidyaniketan on Google Maps"
            />
          </div>

          {/* RIGHT — Contact card */}
          <div
            ref={cardRef}
            className="find-us-card-col"
            style={{
              background: "#1e293b",
              borderRadius: "16px",
              padding: "40px",
              border: "1px solid #334155",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* School identity */}
            <div>
              <h3 style={{
                color: "white",
                fontSize: "24px",
                fontWeight: 700,
                margin: "0 0 6px 0",
                lineHeight: 1.2,
              }}>
                Malatamba Vidyaniketan
              </h3>
              <p style={{ color: "#c9a84c", fontSize: "14px", margin: 0 }}>
                Premier School in Visakhapatnam
              </p>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #334155", margin: "24px 0" }} />

            {/* Info rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
              {INFO_ROWS.map((row, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "15px", lineHeight: "1.6", flexShrink: 0 }}>
                    {row.icon}
                  </span>
                  <p style={{
                    color: "#94a3b8",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}>
                    {row.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "32px" }}>
              {BUTTONS.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  target={btn.href.startsWith("http") ? "_blank" : undefined}
                  rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="fu-btn"
                  style={{
                    background: btn.bg,
                    color: btn.color,
                    border: btn.border,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = btn.hoverBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = btn.bg; }}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
