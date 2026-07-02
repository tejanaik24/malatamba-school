"use client";

import { useRef, useEffect, useCallback } from "react";
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

const HEADLINE_L1 = ["Your", "Children’s", "Future"];
const HEADLINE_L2 = ["Starts", "Here"];

/* ─── TiltImage (highlights panel) ─────────────────────────────────────── */

function TiltImage({ src, alt, label, className }: {
  src: string; alt: string; label: string; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.05)`;
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${className} hp-img relative overflow-hidden rounded-xl group cursor-pointer`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <Image
        src={src} alt={alt} fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        quality={90} sizes="25vw"
      />
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
      <span className="absolute bottom-3 left-3 text-white text-xs font-semibold bg-black/40 px-2 py-1 rounded">
        {label}
      </span>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */

export default function WalkerScroll() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const headlineRef   = useRef<HTMLHeadingElement>(null);
  const eyebrowRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const card1Ref      = useRef<HTMLDivElement>(null);
  const card2Ref      = useRef<HTMLDivElement>(null);
  const card3Ref      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

      /* ── Panel 2 (Values) entrance ──────────────────────────────────── */
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

      ScrollTrigger.create({
        trigger: panels[1],
        containerAnimation: mainTween,
        start: "left center",
        end: "right center",
        onEnter:     () => valsTl.play(),
        onEnterBack: () => valsTl.play(),
      });

      /* ── Panel 3 (Mission) entrance ─────────────────────────────────── */
      const missTl = gsap.timeline({ paused: true });
      missTl
        .from(panels[2].querySelector(".mp-subtitle"), { x: -30, opacity: 0, duration: 0.5, ease: "power2.out", immediateRender: false })
        .from(panels[2].querySelector(".mp-heading"),  { x: -30, opacity: 0, duration: 0.6, ease: "power2.out", immediateRender: false }, 0.1)
        .from(panels[2].querySelector(".mp-body"),     { x: -30, opacity: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, 0.2)
        .from(panels[2].querySelector(".mp-stats"),    { x: -30, opacity: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, 0.3)
        .from(panels[2].querySelector(".mp-cta"),      { x: -30, opacity: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, 0.4)
        .fromTo(
          panels[2].querySelector(".mp-image"),
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0,  duration: 1,   ease: "power2.out" },
          0.2
        );

      ScrollTrigger.create({
        trigger: panels[2],
        containerAnimation: mainTween,
        start: "left center",
        end: "right center",
        onEnter:     () => missTl.play(),
        onEnterBack: () => missTl.play(),
      });

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

      /* ── Hero entrance (Panel 1) ────────────────────────────────────── */
      if (reducedMotion) {
        // Simple fade — respect OS preference
        gsap.set([eyebrowRef.current, ctaRef.current], { opacity: 1, y: 0 });
        gsap.set(".hw-word-inner", { y: "0%" });
        return;
      }

      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean) as HTMLElement[];

      gsap.set(cards, { scale: 0.92, willChange: "transform" });
      gsap.set([eyebrowRef.current, ctaRef.current], { opacity: 0, y: 18 });
      // .hw-word-inner starts at translateY(110%) via inline style — GSAP takes over here

      const entranceTl = gsap.timeline({ delay: 0.1 });
      entranceTl
        // Words rise from mask — stagger per word across both lines
        .to(".hw-word-inner", {
          y: "0%",
          stagger: 0.08,
          duration: 0.9,
          ease: "power4.out",
        })
        // Cards scale in + initial CSS rotation settles naturally
        .to(cards, {
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        }, "-=0.65")
        // Eyebrow + CTA fade in
        .to([eyebrowRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.4")
        // Clear will-change after entrance completes
        .call(() => {
          gsap.set(cards, { clearProps: "willChange" });
        });

      // ── Idle float — gentle y oscillation per card ─────────────────
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: "+=6",
          duration: 5.5 + i * 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 1.8,
        });
      });

      // ── Scroll-exit parallax as hero pans into Values panel ─────────
      ScrollTrigger.create({
        trigger: panels[0],
        containerAnimation: mainTween,
        start: "left left",
        end:   "right left",
        scrub: true,
        onUpdate(self) {
          const p = self.progress;
          if (headlineRef.current) gsap.set(headlineRef.current, { y: -p * 60 });
          // Three depth layers: near / mid / far
          if (card1Ref.current) gsap.set(card1Ref.current, { x:  p * 24 });
          if (card2Ref.current) gsap.set(card2Ref.current, { x: -p * 20 });
          if (card3Ref.current) gsap.set(card3Ref.current, { x: -p * 48 });
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* overflow-hidden lives on the child flex container, not the pin trigger */}
      <div className="flex h-screen w-full overflow-hidden">

        {/* ════════════════════════════════════════════════════════════════
            PANEL 1 — HERO  (bright-editorial / Scandinavian)
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="walk-panel relative w-screen h-screen shrink-0 overflow-hidden"
          style={{ background: "#FAFAF7" }}
        >

          {/* ── Card 1 — large, BEHIND headline (z-5) ───────────────── */}
          <div
            ref={card1Ref}
            className="absolute hidden md:block"
            style={{
              width: "clamp(240px, 30vw, 480px)",
              height: "clamp(320px, 44vh, 580px)",
              aspectRatio: "3 / 4",
              right: "12vw",
              top: "8%",
              transform: "rotate(-2deg)",
              zIndex: 5,
            }}
          >
            <Image
              src="/ai-images/hero-1.png"
              alt="Students at Malatamba Vidyaniketan"
              fill
              priority
              sizes="30vw"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* ── Card 2 — medium, IN FRONT (z-30) ───────────────────── */}
          <div
            ref={card2Ref}
            className="absolute hidden md:block"
            style={{
              width: "clamp(160px, 20vw, 320px)",
              height: "clamp(200px, 30vh, 420px)",
              aspectRatio: "3 / 4",
              right: "2vw",
              top: "4%",
              transform: "rotate(3deg)",
              zIndex: 30,
            }}
          >
            <Image
              src="/ai-images/hero-2.png"
              alt="School life at Malatamba Vidyaniketan"
              fill
              sizes="20vw"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* ── Card 3 — small, IN FRONT (z-30) ────────────────────── */}
          <div
            ref={card3Ref}
            className="absolute hidden md:block"
            style={{
              width: "clamp(130px, 16vw, 260px)",
              height: "clamp(170px, 24vh, 360px)",
              aspectRatio: "3 / 4",
              right: "20vw",
              bottom: "10%",
              transform: "rotate(-4deg)",
              zIndex: 30,
            }}
          >
            <Image
              src="/ai-images/hero-3.png"
              alt="Campus activities at Malatamba Vidyaniketan"
              fill
              sizes="16vw"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* ── Typography zone ─────────────────────────────────────── */}
          <div
            className="absolute inset-y-0 left-0 flex flex-col justify-center"
            style={{
              paddingLeft: "clamp(24px, 8vw, 120px)",
              paddingRight: "clamp(20px, 3vw, 48px)",
              maxWidth: "min(680px, 56vw)",
              zIndex: 20,
            }}
          >
            {/* Eyebrow — hidden initially, fades in last */}
            <p
              ref={eyebrowRef}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "clamp(9px, 0.8vw, 11px)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#762123",
                marginBottom: "clamp(14px, 2.2vh, 26px)",
                fontWeight: 600,
                opacity: 0,
              }}
            >
              Malatamba Vidyaniketan&nbsp;&middot;&nbsp;Visakhapatnam
            </p>

            {/* Headline — words rise from individual overflow:hidden masks */}
            <h1
              ref={headlineRef}
              style={{
                fontFamily: "var(--font-fraunces, Georgia, serif)",
                fontSize: "clamp(2.4rem, 11vw, 9.5rem)",
                fontWeight: 900,
                lineHeight: 1.0,
                color: "#1a0a0a",
                margin: 0,
                letterSpacing: "-0.03em",
              }}
            >
              {/* Line 1: Your Children's Future */}
              <span style={{ display: "block" }}>
                {HEADLINE_L1.map((word, i) => (
                  <span key={i} style={{ display: "inline" }}>
                    {/* Mask wrapper — overflow hidden clips the rising word */}
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        verticalAlign: "bottom",
                        lineHeight: 1.12,
                      }}
                    >
                      <span
                        className="hw-word-inner"
                        style={{ display: "inline-block", transform: "translateY(110%)" }}
                      >
                        {word}
                      </span>
                    </span>
                    {/* Explicit space span preserves word gaps through GSAP transforms */}
                    {i < HEADLINE_L1.length - 1 && (
                      <span style={{ display: "inline-block", width: "0.25em" }} aria-hidden="true" />
                    )}
                  </span>
                ))}
              </span>

              {/* Line 2: Starts Here — primary maroon */}
              <span style={{ display: "block", color: "#762123" }}>
                {HEADLINE_L2.map((word, i) => (
                  <span key={i} style={{ display: "inline" }}>
                    <span
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        verticalAlign: "bottom",
                        lineHeight: 1.12,
                      }}
                    >
                      <span
                        className="hw-word-inner"
                        style={{ display: "inline-block", transform: "translateY(110%)" }}
                      >
                        {word}
                      </span>
                    </span>
                    {i === 0 && (
                      <span style={{ display: "inline-block", width: "0.25em" }} aria-hidden="true" />
                    )}
                  </span>
                ))}
              </span>
            </h1>

            {/* CTA row */}
            <div
              ref={ctaRef}
              style={{
                marginTop: "clamp(24px, 4vh, 52px)",
                display: "flex",
                alignItems: "center",
                gap: "clamp(16px, 2.5vw, 36px)",
                flexWrap: "wrap",
                opacity: 0,
              }}
            >
              <Link
                href="/admissions"
                style={{
                  display: "inline-block",
                  background: "#762123",
                  color: "#FAFAF7",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "clamp(12px, 0.95vw, 15px)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  padding: "14px 32px",
                  textDecoration: "none",
                  transition: "background 0.25s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#5a191b")}
                onMouseLeave={e => (e.currentTarget.style.background = "#762123")}
              >
                Enquire Now
              </Link>
              <Link
                href="/infrastructure"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  color: "#762123",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "clamp(12px, 0.95vw, 15px)",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  borderBottom: "1.5px solid currentColor",
                  paddingBottom: "2px",
                }}
              >
                Explore School
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Mobile: 2-up card collage (no GSAP loops on mobile) */}
            <div
              className="md:hidden"
              style={{
                marginTop: "clamp(20px, 4vh, 28px)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                height: "clamp(160px, 38vw, 260px)",
              }}
            >
              <div style={{ position: "relative", gridRow: "span 2" }}>
                <Image src="/ai-images/hero-1.png" alt="Students" fill priority style={{ objectFit: "contain" }} sizes="45vw" />
              </div>
              <div style={{ position: "relative" }}>
                <Image src="/ai-images/hero-2.png" alt="School life" fill style={{ objectFit: "contain" }} sizes="45vw" />
              </div>
              <div style={{ position: "relative" }}>
                <Image src="/ai-images/hero-3.png" alt="Campus" fill style={{ objectFit: "contain" }} sizes="45vw" />
              </div>
            </div>
          </div>

          {/* Decorative accent line — desktop only */}
          <div
            className="absolute hidden md:block"
            style={{
              bottom: "12%",
              left: "clamp(24px, 8vw, 120px)",
              width: "44px",
              height: "2px",
              background: "#762123",
              opacity: 0.5,
            }}
          />

          {/* Panel counter */}
          <div
            className="absolute bottom-7 right-8 z-10 hidden md:block"
            style={{
              color: "#762123",
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.1em",
              fontWeight: 500,
              opacity: 0.5,
            }}
          >
            01 / 04
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            PANEL 2 — VALUES  (unchanged)
        ════════════════════════════════════════════════════════════════ */}
        <section className="walk-panel relative w-screen h-screen shrink-0 flex flex-col justify-center overflow-hidden bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

            <div className="flex items-baseline gap-6 mb-6 lg:mb-8">
              <h2 className="vp-title text-primary font-extrabold leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
                WE VALUE
              </h2>
              <span className="vp-subtitle text-gray-400 text-xs tracking-[0.22em] uppercase font-light hidden sm:block">
                Our Core Values
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {values.map((v, i) => (
                <div
                  key={v.num}
                  className="vp-card relative overflow-hidden cursor-pointer bg-white"
                  style={{ height: "clamp(260px, 44vh, 400px)" }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget;
                    gsap.to(card.querySelector(".vp-img-wrap"),    { height: "82%", duration: 0.55, ease: "power3.out" });
                    gsap.to(card.querySelector(".vp-overlay"),     { opacity: 1,    duration: 0.4 });
                    gsap.to(card.querySelector(".vp-num-above"),   { opacity: 0, y: -8, duration: 0.2 });
                    gsap.to(card.querySelector(".vp-num-img"),     { opacity: 1,    duration: 0.3, delay: 0.2 });
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget;
                    gsap.to(card.querySelector(".vp-img-wrap"),    { height: "28%", duration: 0.5, ease: "power3.inOut" });
                    gsap.to(card.querySelector(".vp-overlay"),     { opacity: 0,    duration: 0.35 });
                    gsap.to(card.querySelector(".vp-num-above"),   { opacity: 1, y: 0, duration: 0.3 });
                    gsap.to(card.querySelector(".vp-num-img"),     { opacity: 0,    duration: 0.15 });
                  }}
                >
                  <span
                    className="vp-num-above block text-primary font-extrabold leading-[1] select-none"
                    style={{ fontSize: "clamp(40px, 5vw, 72px)", paddingBottom: "4px" }}
                  >
                    {v.num}
                  </span>

                  <div
                    className="vp-img-wrap relative w-full overflow-hidden"
                    style={{ height: "28%" }}
                  >
                    <Image
                      src={v.image} alt={v.title} fill
                      className="object-cover object-top"
                      quality={90} sizes="25vw" priority={i < 2}
                    />
                    <div
                      className="vp-overlay absolute inset-0 bg-black/30"
                      style={{ opacity: 0 }}
                    />
                    <span
                      className="vp-num-img absolute top-2 left-3 z-10 text-white font-extrabold leading-[1] select-none"
                      style={{
                        fontSize: "clamp(40px, 5vw, 72px)",
                        opacity: 0,
                        textShadow: "0 2px 16px rgba(0,0,0,0.7)",
                      }}
                    >
                      {v.num}
                    </span>
                  </div>

                  <div className="pt-2">
                    <h3
                      className="text-primary font-bold uppercase tracking-[0.1em] mb-0.5"
                      style={{ fontSize: "clamp(11px, 1.1vw, 13px)" }}
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
                      className="bg-dark text-white text-[10px] font-semibold py-2 px-3 inline-flex items-center gap-1.5 uppercase tracking-[0.12em] hover:bg-primary transition-colors duration-300 w-full"
                    >
                      <span className="text-xs leading-none">›</span>
                      <span>Learn More</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-6 h-1.5 rounded-full bg-primary" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </div>

          <div className="absolute bottom-8 right-8 text-gray-300 text-xs font-mono">02 / 04</div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            PANEL 3 — MISSION  (unchanged)
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="walk-panel relative w-screen h-screen shrink-0 flex items-center justify-center overflow-hidden bg-white"
        >
          <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 h-full">

            <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 pt-36 pb-16 lg:pt-0 lg:pb-0">
              <span className="mp-subtitle text-gold text-xs tracking-[0.2em] uppercase font-light block mb-6">
                Our Mission
              </span>
              <h2 className="mp-heading text-[32px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.1] text-dark mb-6">
                Inspiring Young Minds<br />
                <span className="text-transparent bg-gradient-to-r from-primary via-gold to-primary bg-[length:200%_100%] bg-clip-text">
                  Through Quality Education
                </span>
              </h2>
              <p className="mp-body text-gray-600 text-base leading-loose max-w-[420px]">
                At Malatamba Vidyaniketan, we are dedicated to providing a holistic education that nurtures academic excellence, character development, and lifelong learning in every student.
              </p>
              <div className="mp-stats flex flex-wrap items-center gap-x-3 gap-y-1 mt-8 text-sm">
                <span className="text-gold font-bold">20+ Years</span>
                <span className="text-gray-600">|</span>
                <span className="text-gold font-bold">1000+ Students</span>
                <span className="text-gray-600">|</span>
                <span className="text-gold font-bold">50+ Faculty</span>
              </div>
              <div className="mp-cta mt-10">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-dark font-bold text-sm hover:opacity-90 hover:shadow-lg transition-all uppercase tracking-wider"
                >
                  Apply for Admission →
                </Link>
              </div>
            </div>

            <div
              className="mp-image relative hidden lg:block h-full"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 88%)" }}
            >
              <Image
                src="/ai-images/mission.png" alt="School mission" fill
                className="object-cover" quality={90} sizes="50vw" priority
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ outline: "2px solid rgba(201,168,76,0.4)", outlineOffset: "-12px" }}
              />
            </div>
          </div>

          <div className="absolute bottom-8 right-8 text-gray-400 text-xs font-mono">03 / 04</div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            PANEL 4 — HIGHLIGHTS  (unchanged)
        ════════════════════════════════════════════════════════════════ */}
        <section className="walk-panel relative w-screen h-screen shrink-0 flex items-center justify-center overflow-hidden bg-light">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            <div className="hp-text">
              <span className="text-primary font-semibold text-sm tracking-[0.2em] uppercase">
                School Highlights
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mt-3 leading-tight">
                Life at Malatamba
              </h2>
              <div className="w-16 h-0.5 bg-primary mt-5 mb-5" />
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                From vibrant classrooms to sports fields, science labs to cultural events — every day at Malatamba Vidyaniketan is an opportunity for discovery and growth.
              </p>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all text-sm"
              >
                View Gallery
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 h-[min(380px,42vh)]">
              <TiltImage
                src="/ai-images/highlights-friends.png"
                alt="Campus life" label="Campus Life"
                className="row-span-2"
              />
              <div className="grid grid-cols-2 grid-rows-2 gap-3">
                <TiltImage src="/ai-images/highlights-sports.png"     alt="Sports"      label="Sports"      />
                <TiltImage src="/ai-images/highlights-cultural.png"   alt="Cultural"    label="Events"      />
                <TiltImage src="/ai-images/highlights-library.png"    alt="Library"     label="Library"     />
                <TiltImage src="/ai-images/highlights-sciencelab.png" alt="Science lab" label="Science Lab" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 text-gray-400 text-xs font-mono">04 / 04</div>
        </section>

      </div>
    </div>
  );
}
