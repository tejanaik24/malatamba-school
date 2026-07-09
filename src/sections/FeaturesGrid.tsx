"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ImageData } from "@/lib/images";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface FeaturesGridProps {
  images: ImageData[];
}

interface Feature {
  subheading: string;
  heading: string;
  img: string;
  title: string;
  desc: string;
  accentColor: string;
  shadowColor: string;
  stampText: string;
  stat: string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const features: Feature[] = [
  {
    subheading: "Our Educators",
    heading: "Experienced Faculty",
    img: "/ai-images/feature-faculty.png",
    title: "Experienced Faculty",
    desc: "Qualified educators with years of experience and a passion for teaching — giving every child personalised attention and mentorship that goes beyond the textbook.",
    accentColor: "#762123",
    shadowColor: "rgba(118,33,35,0.30)",
    stampText: "FACULTY",
    stat: "30+ Teachers",
  },
  {
    subheading: "Future Ready",
    heading: "Science & Computer Labs",
    img: "/ai-images/feature-lab.png",
    title: "Science & Computer Labs",
    desc: "Physics, Chemistry, Biology labs plus two dedicated computer labs with 40 PCs each and high-speed internet — practical learning at the heart of every subject.",
    accentColor: "#b08a28",
    shadowColor: "rgba(176,138,40,0.30)",
    stampText: "LABS",
    stat: "40 PCs / Lab",
  },
  {
    subheading: "Active Living",
    heading: "Sports & Athletics",
    img: "/ai-images/feature-sports.png",
    title: "Sports & Athletics",
    desc: "Cricket, football, athletics, basketball and indoor games — a full sports programme that builds fitness, teamwork, and the resilience to compete and succeed.",
    accentColor: "#1e4a8a",
    shadowColor: "rgba(30,74,138,0.30)",
    stampText: "SPORTS",
    stat: "8 Sports",
  },
  {
    subheading: "Tech Enabled",
    heading: "Smart Classrooms",
    img: "/ai-images/feature-smartclass.png",
    title: "Smart Classrooms",
    desc: "Interactive smart boards, projectors, and digital learning tools that make every lesson vivid and engaging — bringing concepts to life for every learner.",
    accentColor: "#2e6b3e",
    shadowColor: "rgba(46,107,62,0.30)",
    stampText: "SMART CLASS",
    stat: "Smart Boards",
  },
  {
    subheading: "Knowledge Hub",
    heading: "Library — 3,000+ Books",
    img: "/ai-images/feature-library.png",
    title: "Library — 3,000+ Books",
    desc: "A rich library stocked with books, magazines, newspapers, and reference material — plus a quiet reading room that nurtures curious, independent minds.",
    accentColor: "#5a3a7e",
    shadowColor: "rgba(90,58,126,0.30)",
    stampText: "LIBRARY",
    stat: "3,000+ Books",
  },
  {
    subheading: "Safe Commute",
    heading: "Safe School Transport",
    img: "/ai-images/feature-transport.png",
    title: "Safe School Transport",
    desc: "Safe school buses with trained drivers and male and female attendants covering all of Visakhapatnam — so parents have complete peace of mind every single day.",
    accentColor: "#6b3a1e",
    shadowColor: "rgba(107,58,30,0.30)",
    stampText: "TRANSPORT",
    stat: "Safe Transport",
  },
];

const IMG_PADDING = 12;

/* ════════════════════════════════════════════════════════════════════════════
   1. FIXED TICKER — slot-machine counter on right edge
════════════════════════════════════════════════════════════════════════════ */

function FixedTicker({
  activeIndex,
  visible,
}: {
  activeIndex: number;
  visible: boolean;
}) {
  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        translateY: "-50%",
        zIndex: 100,
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        pointerEvents: "none",
      }}
      className="hidden md:flex"
    >
      {/* Slot-machine number */}
      <div style={{ overflow: "hidden", height: "5.5rem", display: "flex", alignItems: "center" }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={activeIndex}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "block",
              fontFamily: "var(--font-fraunces, Georgia, serif)",
              fontSize: "4.5rem",
              fontWeight: 900,
              lineHeight: 1,
              color: features[activeIndex].accentColor,
              letterSpacing: "-0.04em",
            }}
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Track dots */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {features.map((feat, i) => (
          <motion.div
            key={i}
            animate={{
              height: i === activeIndex ? 22 : 4,
              backgroundColor:
                i === activeIndex ? feat.accentColor : "#d1d5db",
            }}
            transition={{ duration: 0.3 }}
            style={{ width: 3, borderRadius: 9999 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   2. STICKY IMAGE — scale exit + clip-path entry + stamp + pill + accent bar
════════════════════════════════════════════════════════════════════════════ */

function StickyImage({ feat }: { feat: Feature }) {
  const targetRef = useRef<HTMLDivElement>(null);

  /* Exit scroll: drives scale-down + overlay + stamp + pill fade */
  const { scrollYProgress: exitProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  /* Entry scroll: drives clip-path wipe from bottom */
  const { scrollYProgress: entryProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start center"],
  });

  /* Scale */
  const scale = useTransform(exitProgress, [0, 1], [1, 0.85]);

  /* Dark overlay: fades from 35% → 85% as image scales out */
  const overlayOpacity = useTransform(exitProgress, [0, 1], [0.35, 0.85]);

  /* 4. Clip-path wipe: inset from bottom on entry */
  const clipPath = useTransform(
    entryProgress,
    [0, 1],
    ["inset(100% 0 0 0 round 24px)", "inset(0% 0 0 0 round 24px)"]
  );

  /* 1. Magazine stamp: fades in as section is active, disappears on exit */
  const stampOpacity = useTransform(
    exitProgress,
    [0, 0.15, 0.7, 1],
    [0, 1, 1, 0]
  );
  const stampScale = useTransform(exitProgress, [0, 0.15], [0.88, 1]);

  /* 5. Stat pill: fades in after entry, fades out with exit */
  const pillOpacity = useTransform(entryProgress, [0.5, 1], [0, 1]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
        clipPath,
        borderRadius: "1.5rem",
        boxShadow: `16px 20px 0px ${feat.shadowColor}, 0 32px 64px ${feat.shadowColor}`,
      }}
      className="feat-sticky-img sticky z-0 overflow-hidden"
    >
      {/* Photo */}
      <div className="absolute inset-0">
        <Image
          src={feat.img}
          alt={feat.heading}
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(10,10,10,0.7)", opacity: overlayOpacity }}
      />

      {/* Accent top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: feat.accentColor,
          zIndex: 20,
        }}
      />

      {/* 1. Magazine stamp — outlined bleed text */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: stampOpacity,
          scale: stampScale,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontSize: "clamp(5rem, 18vw, 20rem)",
            fontWeight: 900,
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: `2px ${feat.accentColor}`,
            textAlign: "center",
            letterSpacing: "-0.02em",
            userSelect: "none",
            opacity: 0.55,
          }}
        >
          {feat.stampText}
        </span>
      </motion.div>

      {/* 5. Floating stat pill — frosted glass, bottom-right */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
          zIndex: 20,
          opacity: pillOpacity,
        }}
      >
        <div
          style={{
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            background: "rgba(255,255,255,0.12)",
            border: `1px solid ${feat.accentColor}`,
            borderRadius: 9999,
            padding: "10px 22px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: feat.accentColor,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            {feat.stat}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   Floating subheading + heading with y parallax
════════════════════════════════════════════════════════════════════════════ */

function OverlayCopy({
  subheading,
  heading,
}: {
  subheading: string;
  heading: string;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{ y, opacity }}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white z-10 pointer-events-none px-4"
    >
      <p
        className="mb-2 text-center text-xl font-light italic md:mb-4 md:text-3xl"
        style={{ color: "rgba(255,255,255,0.72)" }}
      >
        {subheading}
      </p>
      <p
        className="text-center text-4xl font-bold md:text-7xl"
        style={{
          fontFamily: "var(--font-fraunces, Georgia, serif)",
          letterSpacing: "-0.02em",
        }}
      >
        {heading}
      </p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   3. Content block — accent color bleeds as left border per feature
════════════════════════════════════════════════════════════════════════════ */

function FeatureContent({ feature }: { feature: Feature }) {
  return (
    <div
      className="grid grid-cols-1 gap-8 py-12 md:grid-cols-12"
      style={{
        background: "#ffffff",
        borderLeft: `5px solid ${feature.accentColor}`,
        paddingLeft: 32,
        paddingRight: 32,
        boxShadow: `10px 12px 0px ${feature.shadowColor}`,
        margin: `0 ${IMG_PADDING}px`,
      }}
    >
      <div className="md:col-span-4 flex items-start">
        <h3
          style={{
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 700,
            color: feature.accentColor,
            lineHeight: 1.2,
          }}
        >
          {feature.title}
        </h3>
      </div>
      <div className="md:col-span-8 flex flex-col justify-start gap-4">
        <p className="text-base leading-relaxed" style={{ color: "#444" }}>
          {feature.desc}
        </p>
        <Link
          href="/infrastructure"
          className="self-start text-sm font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ color: feature.accentColor }}
        >
          Learn More
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   TextParallaxContent wrapper
════════════════════════════════════════════════════════════════════════════ */

function TextParallaxContent({
  feat,
  children,
}: {
  feat: Feature;
  children: React.ReactNode;
}) {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage feat={feat} />
        <OverlayCopy subheading={feat.subheading} heading={feat.heading} />
      </div>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   Main export
════════════════════════════════════════════════════════════════════════════ */

export default function FeaturesGrid({ images }: FeaturesGridProps) {
  void images;

  const featSectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(false);

  const { scrollYProgress } = useScroll({ target: featSectionRef });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setTickerVisible(latest > 0.01 && latest < 0.995);
    setActiveIndex(Math.min(features.length - 1, Math.floor(latest * features.length)));
  });

  return (
    <section className="bg-white" id="features">

      {/* 2. Fixed slot-machine ticker */}
      <FixedTicker activeIndex={activeIndex} visible={tickerVisible} />

      {/* Section header */}
      <div className="text-center pt-20 pb-4 px-6">
        <span className="text-primary font-semibold text-xs tracking-[0.25em] uppercase">
          Why Choose Us
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-dark mt-3 mb-4">
          Everything Your Child Needs
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          From modern infrastructure to a nurturing environment — the complete
          ecosystem for academic and personal growth.
        </p>
      </div>

      {/* All 6 parallax feature sections */}
      <div ref={featSectionRef}>
        {features.map((feat) => (
          <TextParallaxContent key={feat.heading} feat={feat}>
            <FeatureContent feature={feat} />
          </TextParallaxContent>
        ))}
      </div>

    </section>
  );
}
