"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { num: "01", title: "Discipline", desc: "Building character through structure and self-regulation.", image: "/ai-images/values-discipline.png" },
  { num: "02", title: "Excellence", desc: "Pursuing the highest standards in academics and beyond.", image: "/ai-images/values-excellence.png" },
  { num: "03", title: "Innovation", desc: "Fostering creativity and critical thinking every day.", image: "/ai-images/values-innovation.png" },
  { num: "04", title: "Integrity", desc: "Instilling honesty and moral values for life.", image: "/ai-images/values-integrity.png" },
];

const heroImages = ["/ai-images/hero-1.png", "/ai-images/hero-2.png", "/ai-images/hero-3.png"];

const heroCaptions = [
  { subtitle: "Building Excellence", lines: ["YOUR CHILDREN'S", "FUTURE", "STARTS HERE"], description: "Where tradition meets innovation in education since 2005." },
  { subtitle: "Inspiring Minds", lines: ["WHERE EVERY", "LESSON BUILDS", "TOMORROW"], description: "Smart classrooms and dedicated teachers shaping young minds." },
  { subtitle: "Embracing Growth", lines: ["NURTURING", "POTENTIAL", "CELEBRATING GROWTH"], description: "A vibrant campus where every child discovers their passion." },
];

function ValueCard({ v, index, hoveredIndex, setHoveredIndex }: {
  v: typeof values[0];
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 8;
    const rotateX = ((cy - y) / cy) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.boxShadow = "0 20px 60px rgba(0,0,0,0.2)";
    if (numRef.current) {
      numRef.current.style.transform = `translate(${-(x - cx) * 0.06}px, ${-(y - cy) * 0.06}px)`;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHoveredIndex(index);
    if (imgRef.current) imgRef.current.style.transform = "scale(1.08)";
  }, [index, setHoveredIndex]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    const card = cardRef.current;
    if (card) { card.style.transform = ""; card.style.boxShadow = ""; }
    if (numRef.current) numRef.current.style.transform = "";
    if (imgRef.current) imgRef.current.style.transform = "scale(1)";
  }, [setHoveredIndex]);

  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <div className="vp-card" style={{ opacity: 0 }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="transition-all duration-500 cursor-pointer"
        style={{ opacity: isDimmed ? 0.6 : 1 }}
      >
        <span
          ref={numRef}
          className="block text-primary text-[64px] font-bold leading-none mb-3"
          style={{ transition: "transform 0.1s ease" }}
        >
          {v.num}
        </span>
        <div
          ref={imgRef}
          className="relative w-full aspect-[3/4] overflow-hidden"
          style={{ transition: "transform 0.4s ease" }}
        >
          <Image
            src={v.image}
            alt={v.title}
            fill
            className="object-cover"
            quality={90}
            sizes="25vw"
            priority={index < 2}
          />
          <div className="vp-img-reveal absolute inset-0 bg-light origin-top" style={{ transform: "scaleY(1)" }} />
        </div>
        <h3 className="text-primary font-bold uppercase text-lg mt-4 mb-1 tracking-wide">
          {v.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
        <button className="w-full mt-4 bg-dark text-white text-sm font-semibold py-3 px-4 flex items-center justify-between hover:bg-primary transition-colors uppercase tracking-wider">
          <span>Learn More</span>
          <span className="text-xl leading-none">&rsaquo;</span>
        </button>
      </div>
    </div>
  );
}

function TiltImage({ src, alt, label, className }: {
  src: string; alt: string; label: string; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.05)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} hp-tilt-img relative overflow-hidden rounded-xl group tilt-3d`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
        quality={90}
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
      <span className="absolute bottom-3 left-3 text-white text-xs font-semibold bg-black/40 px-2 py-1 rounded">
        {label}
      </span>
    </div>
  );
}

export default function WalkerScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeHero, setActiveHero] = useState(0);

  const valsAnimRef = useRef(false);
  const missAnimRef = useRef(false);
  const highAnimRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".walk-panel");
      if (!panels.length) return;

      const totalPanels = panels.length;

      // Values panel entrance
      const valuesEntrance = gsap.timeline({ paused: true });
      valuesEntrance
        .fromTo(panels[1].querySelector('.vp-title'), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: true }, 0)
        .fromTo(panels[1].querySelectorAll('.vp-card'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.5, ease: "power2.out", overwrite: true }, 0.2)
        .fromTo(panels[1].querySelectorAll('.vp-img-reveal'), { scaleY: 1 }, { scaleY: 0, stagger: 0.12, duration: 0.7, ease: "power2.out", transformOrigin: "top center", overwrite: true }, 0.2)
        .to(panels[1].querySelector('.values-connector'), { scaleX: 1, duration: 1.5, ease: "power3.out", transformOrigin: "left center", overwrite: true }, 0.3);

      // Mission panel entrance
      const mp = panels[2];
      const missionEntrance = gsap.timeline({ paused: true });
      missionEntrance
        .fromTo(mp.querySelector('.mp-subtitle'), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: true }, 0)
        .fromTo(mp.querySelector('.mp-gold-line'), { width: 0 }, { width: 40, duration: 0.6, ease: "power2.out", overwrite: true }, 0.1)
        .fromTo(mp.querySelector('.mp-heading'), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: true }, 0.15)
        .fromTo(mp.querySelector('.mp-body'), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: true }, 0.25)
        .fromTo(mp.querySelector('.mp-stats'), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: true }, 0.35)
        .fromTo(mp.querySelector('.mp-cta'), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: true }, 0.45)
        .fromTo(mp.querySelector('.mp-image'), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power2.out", overwrite: true }, 0.2);

      // Highlights panel entrance
      const hp = panels[3];
      const highlightsEntrance = gsap.timeline({ paused: true });
      highlightsEntrance
        .fromTo(hp.querySelector('.hp-text'), { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", overwrite: true }, 0)
        .fromTo(hp.querySelectorAll('.hp-tilt-img'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.08, duration: 0.5, ease: "power2.out", overwrite: true }, 0.3);

      // Main horizontal scroll — Bug 3: scrub 1.8, end +=400vh
      gsap.to(panels, {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=400vh",
          scrub: 1.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Bug 4: corrected thresholds
            if (p >= 0.22 && !valsAnimRef.current) {
              valsAnimRef.current = true;
              valuesEntrance.play();
            }
            if (p >= 0.48 && !missAnimRef.current) {
              missAnimRef.current = true;
              missionEntrance.play();
            }
            if (p >= 0.72 && !highAnimRef.current) {
              highAnimRef.current = true;
              highlightsEntrance.play();
            }
          },
        },
      });

      // Bug 5: Hero crossfade — proper overlap, no flash, onStart once per transition
      const imgs = heroRefs.current.filter(Boolean) as HTMLDivElement[];
      const n = imgs.length;
      gsap.set(imgs, { opacity: 0 });
      gsap.set(imgs[0], { opacity: 1 });

      const heroTimeline = gsap.timeline({ repeat: -1 });
      for (let i = 0; i < n; i++) {
        const curr = imgs[i];
        const next = imgs[(i + 1) % n];
        const nextIdx = (i + 1) % n;
        heroTimeline
          .to({}, { duration: 5 })
          .to(next, {
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
            onStart: () => setActiveHero(nextIdx),
          })
          .to(curr, { opacity: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.6");
      }

      // Mission parallax
      const missionImg = panels[2]?.querySelector<HTMLElement>(".mission-parallax");
      if (missionImg) {
        gsap.to(missionImg, {
          y: -40, ease: "none",
          scrollTrigger: { trigger: panels[2], start: "left left", end: "right left", scrub: 2 },
        });
      }

      // Counter animations
      const statsEls = document.querySelectorAll(".stat-number");
      statsEls.forEach((el) => {
        const finalText = el.textContent || "";
        const numMatch = finalText.match(/[\d+]+/);
        if (!numMatch) return;
        const finalNum = parseInt(numMatch[0].replace("+", ""), 10);
        const hasPlus = finalText.includes("+");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: finalNum, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: el.closest(".walk-panel"), start: "left center", toggleActions: "play none none reverse" },
          onUpdate: () => { el.textContent = Math.floor(obj.val) + (hasPlus ? "+" : ""); },
        });
      });
    }, containerRef);

    // Hero mouse parallax (desktop only)
    const heroSection = heroSectionRef.current;
    const isDesktop = window.matchMedia("(hover: hover)").matches;
    if (heroSection && isDesktop) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        if (heroBgRef.current) heroBgRef.current.style.transform = `translate(${-x * 30}px, ${-y * 15}px)`;
        if (heroTextRef.current) heroTextRef.current.style.transform = `translate(${x * 8}px, ${y * 4}px)`;
      };
      heroSection.addEventListener("mousemove", handleMouseMove);
      return () => {
        ctx.revert();
        heroSection.removeEventListener("mousemove", handleMouseMove);
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    // Bug 2: height 500vh (was 600vh)
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Smooth scroll: will-change on flex container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex" style={{ willChange: "transform" }}>

        {/* PANEL 1 — HERO */}
        {/* Bug 1: NO logo block — Navbar already has it */}
        <section
          ref={heroSectionRef}
          className="walk-panel relative w-screen h-screen shrink-0 flex items-center justify-center overflow-hidden"
          style={{ transform: "translateZ(0)" }}
        >
          <div ref={heroBgRef} className="absolute inset-0" style={{ willChange: "transform" }}>
            {heroImages.map((src, i) => (
              <div
                key={src}
                ref={(el) => { heroRefs.current[i] = el; }}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Image src={src} alt={`School hero ${i + 1}`} fill className="object-cover" priority={i === 0} quality={90} sizes="100vw" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[rgba(118,33,35,0.7)]" />

          <div ref={heroTextRef} className="relative z-10 text-center px-6 max-w-5xl" style={{ willChange: "transform" }}>
            <motion.p
              key={`sub-${activeHero}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white/70 text-sm sm:text-base italic tracking-widest uppercase mb-4"
            >
              {heroCaptions[activeHero].subtitle}
            </motion.p>
            <motion.h1
              key={`h1-${activeHero}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              {heroCaptions[activeHero].lines.map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight ${i === heroCaptions[activeHero].lines.length - 1 ? "text-gold" : "text-white"}`}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              key={`desc-${activeHero}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-white/60 text-sm sm:text-base mt-6 max-w-xl mx-auto"
            >
              {heroCaptions[activeHero].description}
            </motion.p>
          </div>

          {/* CTA: Explore School + Enquire Now (gold border) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-4"
          >
            <Link href="/#features" className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all text-sm sm:text-base">
              Explore School
            </Link>
            <Link href="/#contact" className="px-8 py-3 border-2 border-gold text-gold font-semibold rounded-full hover:bg-gold hover:text-dark transition-all text-sm sm:text-base">
              Enquire Now
            </Link>
          </motion.div>

          <div className="absolute bottom-8 right-8 z-10 text-white/40 text-xs font-mono">01 / 04</div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 scroll-chevron">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white/40">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="particle-dot" style={{ left: `${15 + Math.random() * 70}%`, top: `${10 + Math.random() * 80}%`, width: `${3 + Math.random() * 4}px`, height: `${3 + Math.random() * 4}px`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${4 + Math.random() * 4}s` }} />
            ))}
          </div>
        </section>

        {/* PANEL 2 — WE VALUE */}
        {/* Bug 6: overflow-hidden, items-center justify-center, pt-0, max-h-screen on grid */}
        <section
          className="walk-panel w-screen h-screen shrink-0 bg-white flex items-center justify-center overflow-hidden"
          style={{ transform: "translateZ(0)" }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-0">
            <h2 className="vp-title text-primary text-6xl sm:text-7xl font-bold leading-none" style={{ opacity: 0 }}>
              WE VALUE
            </h2>

            <div className="relative mt-8 mb-8 h-px">
              <div className="values-connector absolute left-0 right-12 h-px bg-primary/10 origin-left" style={{ transform: "scaleX(0)" }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start max-h-screen">
              {values.map((v, i) => (
                <ValueCard key={v.num} v={v} index={i} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 right-8 z-10 text-gray-400 text-xs font-mono">02 / 04</div>
        </section>

        {/* PANEL 3 — MISSION */}
        <section
          className="walk-panel relative w-screen h-screen shrink-0 flex items-center overflow-hidden"
          style={{ backgroundColor: "#0a0a0a", transform: "translateZ(0)" }}
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 h-full">
            {/* LEFT — Text */}
            <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-16 lg:py-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="mp-gold-line h-px bg-gold shrink-0" style={{ width: 0 }} />
                <span className="mp-subtitle text-gold text-xs tracking-[0.2em] uppercase font-light" style={{ opacity: 0 }}>
                  Our Mission
                </span>
              </div>

              <h2 className="mp-heading text-[36px] sm:text-[52px] font-bold leading-[1.1] text-white" style={{ opacity: 0 }}>
                Inspiring Young Minds<br />
                <span className="mp-shimmer text-transparent bg-gradient-to-r from-primary via-gold to-primary bg-[length:200%_100%] bg-clip-text">
                  Through Quality Education
                </span>
              </h2>

              <p className="mp-body text-[#999] text-base leading-loose mt-6" style={{ maxWidth: 420, opacity: 0 }}>
                At Malatamba Vidyaniketan, we are dedicated to providing a holistic education that nurtures academic excellence, character development, and lifelong learning in every student.
              </p>

              <div className="mp-stats flex flex-wrap items-center gap-x-2 gap-y-1 mt-8 text-sm" style={{ opacity: 0 }}>
                <span className="text-gold font-bold"><span className="stat-number">20+</span> Years</span>
                <span className="text-gray-600">|</span>
                <span className="text-gold font-bold"><span className="stat-number">1000+</span> Students</span>
                <span className="text-gray-600">|</span>
                <span className="text-gold font-bold"><span className="stat-number">50+</span> Faculty</span>
              </div>

              {/* CTA: "Apply for Admission →" → /#contact, bg-gold text-dark font-bold */}
              <div className="mp-cta mt-10" style={{ opacity: 0 }}>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-dark font-bold text-sm hover:opacity-90 hover:shadow-lg hover:shadow-gold/30 transition-all uppercase tracking-wider"
                >
                  Apply for Admission →
                </Link>
              </div>
            </div>

            {/* RIGHT — Image */}
            <div className="mp-image relative hidden lg:block h-full" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 88%)" }}>
              <div className="mission-parallax absolute inset-0" style={{ willChange: "transform" }}>
                <Image src="/ai-images/mission.png" alt="School mission" fill className="object-cover" quality={90} sizes="50vw" priority />
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{ outline: "2px solid rgba(201,168,76,0.4)", outlineOffset: "-12px" }} />
            </div>
          </div>

          <div className="absolute bottom-8 right-8 z-10 text-white/30 text-xs font-mono">03 / 04</div>
        </section>

        {/* PANEL 4 — SCHOOL HIGHLIGHTS */}
        {/* Bug 7: items-center (was items-start pt-16), no pt-8 on inner div, h-[min(400px,45vh)] */}
        <section
          className="walk-panel w-screen h-screen shrink-0 bg-light flex items-center"
          style={{ transform: "translateZ(0)" }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid lg:grid-cols-2 gap-12">
            <div className="hp-text" style={{ opacity: 0 }}>
              <span className="text-primary font-semibold text-sm tracking-[0.2em] uppercase">School Highlights</span>
              <h2 className="text-3xl sm:text-5xl font-bold text-dark mt-3 leading-tight">Life at Malatamba</h2>
              <div className="w-16 h-0.5 bg-primary mt-6 mb-6" />
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                From vibrant classrooms to sports fields, science labs to cultural events — every day at Malatamba Vidyaniketan is an opportunity for discovery and growth.
              </p>
              <Link href="/#gallery" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all">
                View Gallery
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 h-[min(400px,45vh)]">
              <TiltImage src="/ai-images/highlights-friends.png" alt="Friendship and campus life" label="Campus Life" className="row-span-2" />
              <div className="grid grid-cols-2 grid-rows-2 gap-3">
                <TiltImage src="/ai-images/highlights-sports.png" alt="Sports activities" label="Sports" />
                <TiltImage src="/ai-images/highlights-cultural.png" alt="Cultural event" label="Events" />
                <TiltImage src="/ai-images/highlights-library.png" alt="Library and study" label="Library" />
                <TiltImage src="/ai-images/highlights-sciencelab.png" alt="Science lab" label="Science Lab" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 z-10 text-gray-400 text-xs font-mono">04 / 04</div>
        </section>

      </div>
    </div>
  );
}
