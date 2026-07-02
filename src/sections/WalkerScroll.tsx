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
  const heroImgRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const captionRef    = useRef<HTMLDivElement>(null);
  const [activeHero, setActiveHero] = useState(0);

  // Cinematic word-by-word reveal — fires on every image crossfade
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".walk-panel");
      if (!panels.length || !containerRef.current) return;

      // ── GSAP official horizontal-scroll-snap pattern ──────────────────
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
      // ── Panel 2 (Values) entrance ─────────────────────────────────────
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
        onEnter: () => valsTl.play(),
        onEnterBack: () => valsTl.play(),
      });

      // ── Panel 3 (Mission) entrance ────────────────────────────────────
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
        onEnter: () => missTl.play(),
        onEnterBack: () => missTl.play(),
      });

      // ── Panel 4 (Highlights) entrance ────────────────────────────────
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
        onEnter: () => highTl.play(),
        onEnterBack: () => highTl.play(),
      });

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

  const cap = heroCaptions[activeHero];

  return (
    /* Container — no overflow-hidden here; GSAP pin must not have it on the trigger */
    <div ref={containerRef} className="relative">
      {/* overflow-hidden lives on the child, not the pin trigger */}
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

        {/* ── PANEL 2: VALUES ───────────────────────────────────────────── */}
        <section className="walk-panel relative w-screen h-screen shrink-0 flex flex-col justify-center overflow-hidden bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

            {/* Header row */}
            <div className="flex items-baseline gap-6 mb-6 lg:mb-8">
              <h2 className="vp-title text-primary font-extrabold leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
                WE VALUE
              </h2>
              <span className="vp-subtitle text-gray-400 text-xs tracking-[0.22em] uppercase font-light hidden sm:block">
                Our Core Values
              </span>
            </div>

            {/* 4-column grid — equal height cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 items-stretch">
              {values.map((v, i) => (
                <div key={v.num} className="vp-card flex flex-col group cursor-pointer">

                  {/* Number */}
                  <span
                    className="block text-primary font-extrabold leading-none mb-2 tracking-[-0.02em]"
                    style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}
                  >
                    {v.num}
                  </span>

                  {/* Image — fixed aspect ratio, zoom on hover */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: "4/5", maxHeight: "clamp(140px, 27vh, 260px)" }}
                  >
                    {/* Inner wrapper scales — overflow:hidden on parent clips it */}
                    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110">
                      <Image
                        src={v.image} alt={v.title} fill
                        className="object-cover"
                        quality={90} sizes="25vw" priority={i < 2}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-primary font-bold uppercase tracking-[0.12em] mt-3 mb-1"
                    style={{ fontSize: "clamp(11px, 1.1vw, 14px)" }}>
                    {v.title}
                  </h3>

                  {/* Description — grows to fill space */}
                  <p className="text-gray-500 leading-relaxed flex-1"
                    style={{ fontSize: "clamp(11px, 1vw, 13px)" }}>
                    {v.desc}
                  </p>

                  {/* Button — always pinned to bottom */}
                  <Link
                    href="/about"
                    className="mt-3 bg-dark text-white text-[11px] font-semibold py-2.5 px-3 flex items-center gap-2 uppercase tracking-[0.12em] hover:bg-primary transition-colors duration-300"
                  >
                    <span className="text-sm leading-none">›</span>
                    <span>Learn More</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-6 h-1.5 rounded-full bg-primary" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </div>

          <div className="absolute bottom-8 right-8 text-gray-300 text-xs font-mono">02 / 04</div>
        </section>

        {/* ── PANEL 3: MISSION ──────────────────────────────────────────── */}
        <section
          className="walk-panel relative w-screen h-screen shrink-0 flex items-center justify-center overflow-hidden bg-white"
        >
          <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 h-full">

            {/* Left — text */}
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

            {/* Right — image */}
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

        {/* ── PANEL 4: HIGHLIGHTS ───────────────────────────────────────── */}
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

            {/* Image grid — h-[min(380px,42vh)] keeps it contained on short screens */}
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
