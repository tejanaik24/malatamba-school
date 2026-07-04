"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ImageData } from "@/lib/images";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface FeaturesGridProps {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  images: ImageData[];
}

interface Feature {
  subheading: string;
  heading: string;
  img: string;
  title: string;
  desc: string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const features: Feature[] = [
  {
    subheading: "Our Educators",
    heading: "Experienced Faculty",
    img: "/ai-images/feature-faculty.png",
    title: "Experienced Faculty",
    desc: "Qualified educators with years of experience and a passion for teaching — giving every child personalised attention and mentorship that goes beyond the textbook.",
  },
  {
    subheading: "Future Ready",
    heading: "Science & Computer Labs",
    img: "/ai-images/feature-lab.png",
    title: "Science & Computer Labs",
    desc: "Physics, Chemistry, Biology labs plus two dedicated computer labs with 40 PCs each and high-speed internet — practical learning at the heart of every subject.",
  },
  {
    subheading: "Active Living",
    heading: "Sports & Athletics",
    img: "/ai-images/feature-sports.png",
    title: "Sports & Athletics",
    desc: "Cricket, football, athletics, basketball and indoor games — a full sports programme that builds fitness, teamwork, and the resilience to compete and succeed.",
  },
  {
    subheading: "Tech Enabled",
    heading: "Smart Classrooms",
    img: "/ai-images/feature-smartclass.png",
    title: "Smart Classrooms",
    desc: "Interactive smart boards, projectors, and digital learning tools that make every lesson vivid and engaging — bringing concepts to life for every learner.",
  },
  {
    subheading: "Knowledge Hub",
    heading: "Library — 5,000+ Books",
    img: "/ai-images/feature-library.png",
    title: "Library — 5,000+ Books",
    desc: "A rich library stocked with books, magazines, newspapers, and reference material — plus a quiet reading room that nurtures curious, independent minds.",
  },
  {
    subheading: "Safe Commute",
    heading: "Safe GPS Transport",
    img: "/ai-images/feature-transport.png",
    title: "Safe GPS Transport",
    desc: "GPS-tracked buses with trained drivers and female attendants covering all of Visakhapatnam — so parents have complete peace of mind every single day.",
  },
];

const IMG_PADDING = 12;

/* ─── TextParallaxContent wrapper ───────────────────────────────────────── */

function TextParallaxContent({
  imgUrl,
  subheading,
  heading,
  children,
}: {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy subheading={subheading} heading={heading} />
      </div>
      {children}
    </div>
  );
}

/* ─── Sticky image with scale + overlay ─────────────────────────────────── */

function StickyImage({ imgUrl }: { imgUrl: string }) {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
        borderRadius: "1.5rem",
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden"
    >
      {/* Next/Image for proper optimisation */}
      <div className="absolute inset-0">
        <Image
          src={imgUrl}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Dark overlay fades in as image scales down */}
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.35, 0.85]) }}
      />
    </motion.div>
  );
}

/* ─── Floating text overlay with parallax y ─────────────────────────────── */

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
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white z-10 pointer-events-none"
    >
      <p className="mb-2 text-center text-xl font-light italic md:mb-4 md:text-3xl" style={{ color: "rgba(255,255,255,0.72)" }}>
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl" style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", letterSpacing: "-0.02em" }}>
        {heading}
      </p>
    </motion.div>
  );
}

/* ─── Content block below each sticky image ─────────────────────────────── */

function FeatureContent({ feature }: { feature: Feature }) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-12" style={{ background: "#FAFAF7" }}>

      {/* Left: feature title */}
      <div className="md:col-span-4 flex items-start">
        <h3
          style={{
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 700,
            color: "#8B0000",
            lineHeight: 1.2,
          }}
        >
          {feature.title}
        </h3>
      </div>

      {/* Right: description + CTA */}
      <div className="md:col-span-8 flex flex-col justify-start gap-4">
        <p className="text-base leading-relaxed" style={{ color: "#444" }}>
          {feature.desc}
        </p>
        <Link
          href="/infrastructure"
          className="self-start text-sm font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ color: "#8B0000" }}
        >
          Learn More
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */

export default function FeaturesGrid({ images }: FeaturesGridProps) {
  void images; // prop kept for page.tsx compatibility
  return (
    <section className="bg-white" id="features">

      {/* Section header */}
      <div className="text-center pt-20 pb-4 px-6">
        <span className="text-primary font-semibold text-xs tracking-[0.25em] uppercase">
          Why Choose Us
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-dark mt-3 mb-4">
          Everything Your Child Needs
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          From modern infrastructure to a nurturing environment — the complete ecosystem for academic and personal growth.
        </p>
      </div>

      {/* Parallax feature sections */}
      {features.map((feat) => (
        <TextParallaxContent
          key={feat.heading}
          imgUrl={feat.img}
          subheading={feat.subheading}
          heading={feat.heading}
        >
          <FeatureContent feature={feat} />
        </TextParallaxContent>
      ))}

    </section>
  );
}
