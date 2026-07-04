"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function LeadershipMessage() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLHeadingElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const quoteRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!imageRef.current || !textRef.current) return;

      /* ── Existing: photo entrance (scale + opacity) ── */
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── Existing: text children stagger (y + opacity) ── */
      const textChildren = textRef.current.children;
      gsap.fromTo(
        textChildren,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── NEW: name bleed x slide ── */
      if (nameRef.current) {
        gsap.fromTo(
          nameRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      /* ── NEW: divider scaleX reveal ── */
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      /* ── NEW: quote columns fade up ── */
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 62%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#FAFAF7", overflow: "hidden" }}
    >

      {/* z-10 — Giant bleed quote mark */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -80,
          left: "30%",
          zIndex: 10,
          fontFamily: "var(--font-fraunces, Georgia, serif)",
          fontSize: "clamp(20rem, 35vw, 40rem)",
          lineHeight: 1,
          color: "#8B0000",
          opacity: 0.06,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        &ldquo;
      </span>

      {/* z-20 — Photo left side (inset with depth border) */}
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          top: "5%",
          left: "3%",
          width: "40%",
          height: "88%",
          zIndex: 20,
          borderRadius: 4,
          overflow: "hidden",
          /* Depth border: main shadow + offset duplicate for layered effect */
          boxShadow:
            "6px 6px 0px 0px #8B0000, 12px 12px 0px 0px rgba(139,0,0,0.18), 0 24px 60px rgba(0,0,0,0.22)",
        }}
        className="lm-photo"
      >
        <Image
          src="/real-photos/people/chairman.webp"
          alt="Mr. Suneel Mahanty — Chairman, Malatamba Vidyaniketan"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 42vw"
          quality={90}
          priority
        />
      </div>

      {/* z-30 — Text content right side */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "52%",
          height: "100%",
          zIndex: 30,
          paddingTop: 80,
          paddingRight: 80,
          paddingLeft: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
        }}
        className="lm-text"
      >

        {/* 1. Label */}
        <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.2em", color: "#8B0000", textTransform: "uppercase" }}>
          Chairman&apos;s Message
        </span>

        {/* 2. Name — massive serif bleed */}
        <h2
          ref={nameRef}
          style={{
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontSize: "clamp(2.5rem, 4.5vw, 5.5rem)",
            fontWeight: 900,
            color: "#1a1a1a",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Mr. Suneel Mahanty
        </h2>

        {/* 3. Credentials */}
        <p style={{ fontSize: 14, color: "#666", fontStyle: "italic", margin: 0 }}>
          M.Sc., M.Phil., MBA (FISM) — Chairman
        </p>

        {/* 4. Divider */}
        <div
          ref={dividerRef}
          style={{ width: 40, height: 1, background: "#8B0000", margin: "0" }}
        />

        {/* 5. Quote in two editorial columns */}
        <div
          ref={quoteRef}
          style={{
            columnCount: 2,
            columnGap: 32,
            fontSize: 15,
            lineHeight: 1.7,
            color: "#333",
          }}
        >
          The vision of our Chairman is to meet the dynamic changes in educational arena
          with focus on improvised teaching methodology for enhancing the quality of
          budding professionals. Malatamba Vidyaniketan is successfully running since{" "}
          <strong style={{ color: "#8B0000" }}>20 years</strong>, imparting quality education
          with well conceived academic policies.
        </div>

        {/* 6. Stats row */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, marginTop: 8 }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ display: "block", fontSize: "1.75rem", fontWeight: 700, color: "#8B0000" }}>20+</span>
            <span style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>Years</span>
          </div>
          <div style={{ width: 1, height: 40, background: "#ddd" }} />
          <div style={{ textAlign: "center" }}>
            <span style={{ display: "block", fontSize: "1.75rem", fontWeight: 700, color: "#8B0000" }}>1000+</span>
            <span style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>Students</span>
          </div>
          <div style={{ width: 1, height: 40, background: "#ddd" }} />
          <div style={{ textAlign: "center" }}>
            <span style={{ display: "block", fontSize: "1.75rem", fontWeight: 700, color: "#8B0000" }}>50+</span>
            <span style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>Faculty</span>
          </div>
        </div>

      </div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          .lm-photo {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            width: 88% !important;
            height: 50vh !important;
            margin: 24px auto 0 !important;
          }
          .lm-text {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            padding: 40px 24px !important;
          }
        }
      `}</style>

    </section>
  );
}
