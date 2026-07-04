"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────────────────────── */

const values = [
  { num: "01", title: "Discipline",  desc: "Building character through structure and self-regulation.", image: "/ai-images/values-discipline.png"  },
  { num: "02", title: "Excellence",  desc: "Pursuing the highest standards in academics and beyond.",   image: "/ai-images/values-excellence.png"  },
  { num: "03", title: "Innovation",  desc: "Fostering creativity and critical thinking every day.",     image: "/ai-images/values-innovation.png"  },
  { num: "04", title: "Integrity",   desc: "Instilling honesty and moral values for life.",             image: "/ai-images/values-integrity.png"   },
];

const heroImages = [
  "/ai-images/hero-1.png",
  "/ai-images/hero-2.png",
  "/ai-images/hero-3.png",
];

const heroCaptions = [
  { subtitle: "Building Excellence", lines: ["YOUR CHILDREN'S", "FUTURE", "STARTS HERE"],         description: "Where tradition meets innovation in education since 2005."                },
  { subtitle: "Inspiring Minds",     lines: ["WHERE EVERY", "LESSON BUILDS", "TOMORROW"],          description: "Smart classrooms and dedicated teachers shaping young minds."             },
  { subtitle: "Embracing Growth",    lines: ["NURTURING", "POTENTIAL", "CELEBRATING GROWTH"],      description: "A vibrant campus where every child discovers their passion."              },
];


/* ─── Main component ────────────────────────────────────────────────────── */

export default function WalkerScroll() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const heroImgRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const captionRef      = useRef<HTMLDivElement>(null);
  const spotlightRef    = useRef<HTMLDivElement>(null);
  const overlayRef      = useRef<HTMLDivElement>(null);

  const [activeHero, setActiveHero] = useState(0);

  const handleSpotlightMove = useCallback((e: React.MouseEvent) => {
    if (!spotlightRef.current || !overlayRef.current) return;
    const rect = spotlightRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    gsap.to(overlayRef.current, {
      background: `radial-gradient(circle 300px at ${x}% ${y}%, transparent 0%, rgba(0,0,0,0.18) 100%)`,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleSpotlightLeave = useCallback(() => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      background: "radial-gradient(circle 300px at 50% 50%, transparent 0%, rgba(0,0,0,0.18) 100%)",
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".walk-panel");
      if (!panels.length || !containerRef.current) return;

      /* ── GSAP horizontal-scroll-snap ────────────────────────────────── */
      const mainTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.5,
            delay: 0.1,
            ease: "power1.inOut",
            inertia: false,
          },
          end: () => "+=" + (containerRef.current!.offsetWidth * (panels.length - 1)),
          invalidateOnRefresh: true,
        },
      });

      /* ── Panel 2 (Values) entrance — plays once ────────────────────── */
      const valsTl = gsap.timeline({ paused: true });
      valsTl
        .from(panels[1].querySelector(".vp-subtitle"), {
          x: -40, opacity: 0, duration: 0.5, ease: "power2.out", immediateRender: false,
        })
        .from(panels[1].querySelector(".vp-title"), {
          x: -40, opacity: 0, duration: 0.6, ease: "power2.out", immediateRender: false,
        }, 0.1)
        .from(panels[1].querySelectorAll(".vp-card"), {
          y: 50, opacity: 0, stagger: 0.1, duration: 0.5, ease: "power2.out", immediateRender: false,
        }, 0.15);

      let valsPlayed = false;
      ScrollTrigger.create({
        trigger: panels[1],
        containerAnimation: mainTween,
        start: "left center",
        onEnter: () => {
          if (!valsPlayed) { valsPlayed = true; valsTl.play(); }
        },
      });

      /* ── Panel 3 (Mission) entrance ─────────────────────────────────── */
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Text elements — hidden initially, revealed via paused timeline on enter
      gsap.set(panels[2].querySelector(".mp-subtitle"),                        { opacity: 0, y: 20 });
      gsap.set(panels[2].querySelectorAll(".mp-word-inner"),                   { y: "110%", opacity: 0, color: "transparent", webkitTextStroke: "2px #1a1a1a" });
      gsap.set(panels[2].querySelectorAll(".mp-body, .mp-divider, .mp-cta"),  { opacity: 0, y: 15 });

      const missTl = gsap.timeline({ paused: true });

      if (!reducedMotion) {
        missTl
          .to(panels[2].querySelector(".mp-subtitle"),
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0)
          .to(panels[2].querySelectorAll(".mp-word-inner"),
            { y: "0%", opacity: 1, color: "#1a1a1a", webkitTextStroke: "0px transparent", stagger: 0.07, duration: 0.75, ease: "power4.out" }, 0.15)
          .to(panels[2].querySelectorAll(".mp-body, .mp-divider, .mp-cta"),
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power3.out" }, 0.4);
      } else {
        missTl.to(
          panels[2].querySelectorAll(".mp-subtitle, .mp-word-inner, .mp-body, .mp-divider, .mp-cta"),
          { opacity: 1, y: 0, duration: 0.4 }
        );
      }

      ScrollTrigger.create({
        trigger: panels[2],
        containerAnimation: mainTween,
        start: "left center",
        end: "right center",
        onEnter:     () => missTl.play(),
        onEnterBack: () => missTl.restart(),
      });

      // Image is static — no animation on mp-students per spec.

      /* ── Panel 4 (Highlights) entrance ─────────────────────────────── */
      const highTl = gsap.timeline({ paused: true });
      highTl
        .from(panels[3].querySelector(".hp-text"), {
          x: -30, opacity: 0, duration: 0.6, ease: "power2.out", immediateRender: false,
        })
        .from(panels[3].querySelectorAll(".hp-img"), {
          opacity: 0, scale: 0.9, stagger: 0.07, duration: 0.5, ease: "power2.out", immediateRender: false,
        }, 0.3);

      ScrollTrigger.create({
        trigger: panels[3],
        containerAnimation: mainTween,
        start: "left center",
        end: "right center",
        onEnter:     () => highTl.play(),
        onEnterBack: () => highTl.play(),
      });


      /* ── Hero word-reveal — fires on every image crossfade ──────────── */
      if (!captionRef.current) return;

      gsap.killTweensOf([".hw-subtitle", ".hw-word", ".hw-desc", ".hw-cta"]);
      gsap.set(".hw-subtitle", { opacity: 0, y: 12 });
      gsap.set(".hw-word",     { opacity: 0, y: 44 });
      gsap.set(".hw-desc",     { opacity: 0, y: 18 });
      gsap.set(".hw-cta",      { opacity: 0, y: 16 });

      gsap.timeline()
        .to(".hw-subtitle", { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" })
        .to(".hw-word",     { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power4.out" }, "-=0.15")
        .to(".hw-desc",     { opacity: 1, y: 0, duration: 0.5,  ease: "power3.out" }, "-=0.25")
        .to(".hw-cta",      { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: "power3.out" }, "-=0.25");

      // ── Hero image crossfade (5 s hold, simultaneous fade) ────────────
      const imgs = heroImgRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(imgs, { opacity: 0 });
      gsap.set(imgs[0], { opacity: 1 });

      const heroTl = gsap.timeline({ repeat: -1 });
      for (let i = 0; i < imgs.length; i++) {
        const nextIdx = (i + 1) % imgs.length;
        heroTl
          .to({}, { duration: 5 })
          .to(imgs[nextIdx], {
            opacity: 1, duration: 1, ease: "power2.inOut",
            onStart: () => setActiveHero(nextIdx),
          }, "+=0")
          .to(imgs[i], { opacity: 0, duration: 1, ease: "power2.inOut" }, "<");
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Word reveal on activeHero change
  useEffect(() => {
    if (!captionRef.current) return;

    gsap.killTweensOf([".hw-subtitle", ".hw-word", ".hw-desc", ".hw-cta"]);
    gsap.set(".hw-subtitle", { opacity: 0, y: 12 });
    gsap.set(".hw-word",     { opacity: 0, y: 44 });
    gsap.set(".hw-desc",     { opacity: 0, y: 18 });
    gsap.set(".hw-cta",      { opacity: 0, y: 16 });

    gsap.timeline()
      .to(".hw-subtitle", { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" })
      .to(".hw-word",     { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power4.out" }, "-=0.15")
      .to(".hw-desc",     { opacity: 1, y: 0, duration: 0.5,  ease: "power3.out" }, "-=0.25")
      .to(".hw-cta",      { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: "power3.out" }, "-=0.25");
  }, [activeHero]);

  const cap = heroCaptions[activeHero];

  return (
    <div ref={containerRef} className="relative">
      {/* overflow-hidden lives on the child flex container, not the pin trigger */}
      <div className="flex h-screen w-full overflow-hidden">

        {/* ── PANEL 1: HERO ─────────────────────────────────────────────── */}
        <section className="walk-panel relative w-screen h-screen shrink-0 flex items-center justify-center overflow-hidden">

          {/* Background images — stacked, crossfade via GSAP */}
          <div className="absolute inset-0">
            {heroImages.map((src, i) => (
              <div
                key={src}
                ref={(el) => { heroImgRefs.current[i] = el; }}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Image
                  src={src} alt={`School hero ${i + 1}`} fill
                  className="object-cover" priority={i === 0} quality={90} sizes="100vw"
                />
              </div>
            ))}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[rgba(118,33,35,0.7)]" />

          {/* Caption — GSAP word-reveal animates this on activeHero change */}
          <div ref={captionRef} className="relative z-10 text-center px-6 max-w-6xl">

            {/* Eyebrow label */}
            <p className="hw-subtitle text-white/60 text-xs sm:text-sm font-light italic tracking-[0.22em] uppercase mb-5">
              {cap.subtitle}
            </p>

            {/* Headline — word-by-word reveal */}
            <h1 className="mb-0">
              {cap.lines.map((line, li) => (
                <span
                  key={`${activeHero}-${li}`}
                  className={`block leading-[1.0] tracking-[-0.03em] font-extrabold ${
                    li === cap.lines.length - 1 ? "text-gold" : "text-white"
                  }`}
                  style={{ fontSize: "clamp(48px, 9vw, 118px)" }}
                >
                  {line.split(" ").map((word, wi, arr) => (
                    <span
                      key={wi}
                      className="hw-word"
                      style={{
                        display: "inline-block",
                        marginRight: wi < arr.length - 1 ? "0.22em" : 0,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="hw-desc text-white/55 text-sm sm:text-base mt-7 max-w-lg mx-auto leading-relaxed">
              {cap.description}
            </p>

            {/* CTAs — inline under description */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/infrastructure"
                className="hw-cta px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all text-sm sm:text-base whitespace-nowrap"
              >
                Explore School
              </Link>
              <Link
                href="/admissions"
                className="hw-cta px-8 py-3.5 border-2 border-gold text-gold font-semibold rounded-full hover:bg-gold hover:text-dark transition-all text-sm sm:text-base whitespace-nowrap"
              >
                Enquire Now
              </Link>
            </div>
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            <div className="w-6 h-1.5 rounded-full bg-gold" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-7 right-8 z-10 flex flex-col items-center gap-1.5">
            <span className="text-white/30 text-[9px] font-mono tracking-[0.18em] uppercase">Scroll</span>
            <div className="animate-bounce">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/35">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            PANEL 2 — VALUES  (Walker School expanding-column style)
        ════════════════════════════════════════════════════════════════ */}
        <section className="walk-panel relative w-screen h-screen shrink-0 overflow-hidden bg-[#FAFAF7]">
          <style>{`
            .vp-img-wrap {
              transition: top 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              will-change: top;
            }
            .vp-card:hover .vp-img-wrap {
              top: 0 !important;
            }
            .vp-grid:hover .vp-card:not(:hover) {
              filter: saturate(0.8);
              opacity: 0.9;
            }
            @media (hover: none) and (pointer: coarse) {
              .vp-card .vp-img-wrap { top: 0 !important; position: relative !important; }
              .vp-grid:hover .vp-card:not(:hover) { filter: none !important; opacity: 1 !important; }
            }
          `}</style>
          <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 flex flex-col justify-center pt-12 pb-3 sm:pt-20 sm:pb-12">

            {/* Section header */}
            <div className="mb-3 sm:mb-8 lg:mb-10">
              <p
                className="vp-subtitle text-primary font-semibold text-xs tracking-[0.22em] uppercase mb-2"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Our Core Values
              </p>
              <h2
                className="vp-title text-primary font-black leading-none tracking-[-0.03em]"
                style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                WE VALUE
              </h2>
            </div>

            {/* ── Desktop: 4-column grid with hover-expand ──────────────── */}
            <div className="vp-grid hidden lg:grid lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div
                  key={v.num}
                  className="vp-card relative overflow-hidden bg-[#FAFAF7]"
                  style={{ height: "clamp(420px, 62vh, 580px)" }}
                >
                  {/* Number — ONCE, above image (gets covered on hover) */}
                  <span
                    className="relative z-10 block text-primary font-black leading-none select-none"
                    style={{ fontSize: "clamp(36px, 4vw, 60px)", fontFamily: "var(--font-fraunces, Georgia, serif)" }}
                  >
                    {v.num}
                  </span>

                  {/* Image — absolute, expands upward on hover without reflow */}
                  <div
                    className="vp-img-wrap absolute left-0 right-0 overflow-hidden z-20"
                    style={{ top: "clamp(52px, 5.5vw, 76px)", bottom: "82px" }}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={v.image} alt={v.title} fill
                        className="object-cover object-top"
                        quality={90} sizes="25vw" priority={i < 2}
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/card:bg-black/20" />
                    </div>
                  </div>

                  {/* Content — fixed at bottom, always visible */}
                  <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#FAFAF7] pt-2">
                    <h3
                      className="text-primary font-bold uppercase tracking-[0.1em] mb-1"
                      style={{ fontSize: "clamp(12px, 1.15vw, 14px)" }}
                    >
                      {v.title}
                    </h3>
                    <p
                      className="text-gray-500 leading-snug mb-2"
                      style={{ fontSize: "clamp(10px, 0.9vw, 12px)" }}
                    >
                      {v.desc}
                    </p>
                    <Link
                      href="/about"
                      className="bg-dark text-white text-[11px] font-semibold py-2.5 px-4 inline-flex items-center gap-2 uppercase tracking-[0.12em] hover:bg-primary transition-colors duration-300 w-full justify-between group/btn"
                    >
                      <span>Learn More</span>
                      <span className="text-base leading-none transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Mobile: 2x2 grid, no hover-expand, tap navigates ────── */}
            <div className="grid grid-cols-2 gap-2 lg:hidden">
              {values.map((v, i) => (
                <Link
                  key={v.num}
                  href="/about"
                  className="block bg-white overflow-hidden"
                >
                  <span
                    className="block text-primary font-black leading-none select-none mb-1"
                    style={{ fontSize: "clamp(18px, 4.5vw, 24px)", fontFamily: "var(--font-fraunces, Georgia, serif)" }}
                  >
                    {v.num}
                  </span>
                  <div className="relative w-full h-[100px] overflow-hidden">
                    <Image
                      src={v.image} alt={v.title} fill
                      className="object-cover object-top"
                      quality={90} sizes="45vw" priority={i < 2}
                    />
                  </div>
                  <div className="pt-1.5 pb-0">
                    <h3
                      className="text-primary font-bold uppercase tracking-[0.1em] mb-0.5"
                      style={{ fontSize: "clamp(11px, 2.5vw, 13px)" }}
                    >
                      {v.title}
                    </h3>
                    <p
                      className="text-gray-500 leading-snug mb-2 line-clamp-1"
                      style={{ fontSize: "clamp(10px, 2vw, 12px)" }}
                    >
                      {v.desc}
                    </p>
                    <span
                      className="bg-dark text-white text-[10px] font-semibold py-1.5 px-3 inline-flex items-center gap-1.5 uppercase tracking-[0.12em] w-full justify-between"
                    >
                      <span>Learn More</span>
                      <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 right-8 text-gray-400 text-xs font-mono">02 / 04</div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            PANEL 3 — MISSION
            Split bleed "LEADERS" across z-layers + spotlight + stroke→fill
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="walk-panel relative w-screen h-screen shrink-0 overflow-hidden"
          style={{ background: "#FAFAF7" }}
        >
          <style>{`
            .mp-cta-link { position: relative; display: inline-block; }
            .mp-cta-link::after {
              content: '';
              position: absolute;
              bottom: -2px; left: 0;
              width: 0; height: 1.5px;
              background: #7A1F2B;
              transition: width 0.3s ease;
            }
            .mp-cta-link:hover::after { width: 100%; }
          `}</style>

          {/* ═══ LAYER 1 — "LEAD" behind image (z-10) ═══ */}
          <div
            className="mp-bleed-layer"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-fraunces, Georgia, serif)",
                fontSize: "clamp(8rem, 14vw, 16rem)",
                fontWeight: 900,
                color: "#8B0000",
                opacity: 0.08,
                lineHeight: 1,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ position: "relative", zIndex: 10 }}>LEAD</span>
              <span style={{ position: "relative", zIndex: 30 }}>ERS</span>
            </span>
          </div>

          {/* ═══ LAYER 2 — Student image + spotlight (z-20) ═══ */}
          <div
            id="spotlight-container"
            ref={spotlightRef}
            onMouseMove={handleSpotlightMove}
            onMouseLeave={handleSpotlightLeave}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "60%",
              height: "100%",
              zIndex: 20,
              overflow: "hidden",
            }}
          >
            <Image
              src="/ai-images/mission-students.png"
              alt="Malatamba Vidyaniketan students in school uniform"
              fill
              priority
              sizes="60vw"
              style={{
                objectFit: "contain",
                objectPosition: "center bottom",
              }}
            />
            <div
              ref={overlayRef}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 25,
                pointerEvents: "none",
                background:
                  "radial-gradient(circle 300px at 50% 50%, transparent 0%, rgba(0,0,0,0.18) 100%)",
              }}
            />
          </div>

          {/* ═══ LAYER 3 — Text content + "ERS" in front (z-30) ═══ */}
          <div
            className="mp-text-layer"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              zIndex: 30,
              paddingLeft: "80px",
              paddingRight: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: "50%",
            }}
          >
            {/* Eyebrow */}
            <p
              className="mp-subtitle"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7A1F2B",
                fontWeight: 600,
                marginBottom: "clamp(10px, 1.8vh, 18px)",
                borderLeft: "3px solid #7A1F2B",
                paddingLeft: "12px",
              }}
            >
              Malatamba Vidyaniketan&nbsp;&middot;&nbsp;Est. 2005
            </p>

            {/* Headline — stroke→fill + y-reveal via GSAP */}
            <h2
              className="mp-heading"
              style={{
                fontFamily: "var(--font-fraunces, Georgia, serif)",
                fontSize: "clamp(3rem, 4.5vw, 5rem)",
                fontWeight: 700,
                color: "#1A1A1A",
                lineHeight: 1.05,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              <span className="hidden lg:inline">
                {["BUILT", "FOR", "THE", "LEADERS", "OF", "TOMORROW"].map((word, i, arr) => (
                  <span key={i} style={{ display: "inline" }}>
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        verticalAlign: "bottom",
                        lineHeight: 1.15,
                      }}
                    >
                      <span
                        className="mp-word-inner"
                        style={{
                          display: "inline-block",
                          color: "transparent",
                          WebkitTextStroke: "2px #1a1a1a",
                        }}
                      >
                        {word}
                      </span>
                    </span>
                    {i < arr.length - 1 && (
                      <span style={{ display: "inline-block", width: "0.25em" }} aria-hidden="true" />
                    )}
                  </span>
                ))}
              </span>
              <span className="lg:hidden">BUILT FOR THE LEADERS OF TOMORROW</span>
            </h2>

            {/* Body copy */}
            <p
              className="mp-body"
              style={{
                fontSize: "clamp(0.9rem, 1.05vw, 1.05rem)",
                color: "#555",
                maxWidth: "440px",
                marginTop: "clamp(12px, 2.2vh, 22px)",
                lineHeight: 1.75,
              }}
            >
              Where discipline meets ambition, and every student is prepared
              not just for exams — but for life.
            </p>

            {/* Divider */}
            <hr
              className="mp-divider"
              style={{
                border: "none",
                borderTop: "1px solid #E0E0E0",
                maxWidth: "440px",
                margin: "clamp(18px, 3.5vh, 36px) 0",
              }}
            />

            {/* CTA row */}
            <div
              className="mp-cta flex items-center justify-between"
              style={{ maxWidth: "440px" }}
            >
              <Link
                href="/about"
                className="mp-cta-link"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#7A1F2B",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Read More
              </Link>
              <span
                style={{ color: "#7A1F2B", fontSize: "1.5rem", fontWeight: 300, lineHeight: 1 }}
                aria-hidden="true"
              >
                +
              </span>
            </div>
          </div>

          {/* Panel counter */}
          <div
            className="absolute bottom-7 right-8 z-40 text-xs font-mono"
            style={{ color: "#7A1F2B", opacity: 0.4 }}
          >
            03 / 04
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            PANEL 4 — HIGHLIGHTS  (parallax drift columns)
        ════════════════════════════════════════════════════════════════ */}
        <section className="walk-panel relative w-screen h-screen shrink-0 flex overflow-hidden" style={{ background: "#FAFAF7" }}>

          {/* Left: text content */}
          <div className="hp-text relative z-30 flex flex-col justify-center shrink-0" style={{ width: "40%", paddingLeft: 80 }}>
            <span className="text-primary font-semibold text-sm tracking-[0.2em] uppercase">
              School Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mt-3 leading-tight">
              Life at Malatamba
            </h2>
            <div className="w-16 h-0.5 bg-primary mt-5 mb-5" />
            <p className="text-gray-600 text-base leading-relaxed mb-6" style={{ maxWidth: 360 }}>
              From vibrant classrooms to sports fields, science labs to cultural events — every day at Malatamba Vidyaniketan is an opportunity for discovery and growth.
            </p>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all text-sm self-start"
            >
              View Gallery
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right: 3-column CSS infinite scroll */}
          <style>{`
            @keyframes drift-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
            .drift-col:hover .drift-inner { animation-play-state: paused; }
          `}</style>
          <div className="hp-drift-area relative flex-1 overflow-hidden flex gap-4 px-6 py-8">

            {/* Column 1 — 9 images, 22s */}
            {(() => {
              const imgs = [
                "/ai-images/life-01.png","/ai-images/life-04.png","/ai-images/life-07.png",
                "/ai-images/life-10.png","/ai-images/life-13.png","/ai-images/highlights-cultural.png",
                "/ai-images/highlights-friends.png","/ai-images/feature-faculty.png","/ai-images/values-discipline.png",
              ];
              const cards = imgs.map((src) => (
                <div key={src} className="hp-img relative overflow-hidden rounded-lg flex-shrink-0" style={{ width: "100%", aspectRatio: "3/4" }}>
                  <Image src={src} alt="School life" fill className="object-cover" sizes="20vw" />
                </div>
              ));
              return (
                <div className="drift-col flex-1 overflow-hidden" style={{ marginTop: 0 }}>
                  <div className="drift-inner flex flex-col gap-4" style={{ animation: "drift-up 22s linear infinite", willChange: "transform" }}>
                    {cards}{cards}
                  </div>
                </div>
              );
            })()}

            {/* Column 2 — 8 images, 17s */}
            {(() => {
              const imgs = [
                "/ai-images/life-02.png","/ai-images/life-05.png","/ai-images/life-08.png",
                "/ai-images/life-11.png","/ai-images/highlights-library.png","/ai-images/highlights-sports.png",
                "/ai-images/feature-lab.png","/ai-images/values-excellence.png",
              ];
              const cards = imgs.map((src) => (
                <div key={src} className="hp-img relative overflow-hidden rounded-lg flex-shrink-0" style={{ width: "100%", aspectRatio: "3/4" }}>
                  <Image src={src} alt="School life" fill className="object-cover" sizes="20vw" />
                </div>
              ));
              return (
                <div className="drift-col flex-1 overflow-hidden" style={{ marginTop: -80 }}>
                  <div className="drift-inner flex flex-col gap-4" style={{ animation: "drift-up 17s linear infinite", willChange: "transform" }}>
                    {cards}{cards}
                  </div>
                </div>
              );
            })()}

            {/* Column 3 — 8 images, 13s */}
            {(() => {
              const imgs = [
                "/ai-images/life-03.png","/ai-images/life-06.png","/ai-images/life-09.png",
                "/ai-images/life-12.png","/ai-images/highlights-sciencelab.png","/ai-images/feature-sports.png",
                "/ai-images/values-innovation.png","/ai-images/values-integrity.png",
              ];
              const cards = imgs.map((src) => (
                <div key={src} className="hp-img relative overflow-hidden rounded-lg flex-shrink-0" style={{ width: "100%", aspectRatio: "3/4" }}>
                  <Image src={src} alt="School life" fill className="object-cover" sizes="20vw" />
                </div>
              ));
              return (
                <div className="drift-col flex-1 overflow-hidden" style={{ marginTop: -160 }}>
                  <div className="drift-inner flex flex-col gap-4" style={{ animation: "drift-up 13s linear infinite", willChange: "transform" }}>
                    {cards}{cards}
                  </div>
                </div>
              );
            })()}

          </div>

          <div className="absolute bottom-8 right-8 text-gray-400 text-xs font-mono z-40">04 / 04</div>
        </section>

      </div>
    </div>
  );
}
