"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ImageData } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

interface FeaturesGridProps {
  images: ImageData[];
}

const features = [
  {
    num: "01",
    title: "Experienced Faculty",
    desc: "Qualified educators with years of experience and a passion for teaching — giving every child personalized attention.",
    localImage: "/ai-images/feature-faculty.png",
    alt: "Experienced faculty member teaching",
    accent: "#762123",
    span: "col-span-2 row-span-2",
    textSize: "text-2xl sm:text-3xl",
  },
  {
    num: "02",
    title: "Science & Computer Labs",
    desc: "Physics, Chemistry, Biology labs + 2 computer labs with 40 PCs each and high-speed internet.",
    localImage: "/ai-images/feature-lab.png",
    alt: "Students in science laboratory",
    accent: "#c9a84c",
    span: "col-span-1 row-span-1",
    textSize: "text-lg",
  },
  {
    num: "03",
    title: "Sports & Athletics",
    desc: "Cricket, football, athletics, basketball and indoor games — for fitness and teamwork.",
    localImage: "/ai-images/feature-sports.png",
    alt: "Students playing sports",
    accent: "#1e4a8a",
    span: "col-span-1 row-span-1",
    textSize: "text-lg",
  },
  {
    num: "04",
    title: "Smart Classrooms",
    desc: "Interactive smart boards, projectors, and digital tools that make every lesson engaging.",
    localImage: "/ai-images/feature-smartclass.png",
    alt: "Smart classroom with interactive board",
    accent: "#2e6b3e",
    span: "col-span-1 row-span-1",
    textSize: "text-lg",
  },
  {
    num: "05",
    title: "Library — 5,000+ Books",
    desc: "A rich library with books, magazines, newspapers, and a quiet reading room for curious minds.",
    localImage: "/ai-images/feature-library.png",
    alt: "School library interior",
    accent: "#5a3a7e",
    span: "col-span-2 row-span-1",
    textSize: "text-xl",
  },
  {
    num: "06",
    title: "Safe GPS Transport",
    desc: "GPS-tracked buses with trained drivers and female attendants — covering all of Visakhapatnam.",
    localImage: "/ai-images/feature-transport.png",
    alt: "School bus",
    accent: "#6b3a1e",
    span: "col-span-1 row-span-1",
    textSize: "text-lg",
  },
];

function BentoCard({
  feat,
  imgSrc,
  className,
}: {
  feat: typeof features[number];
  imgSrc: string | undefined;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.015)`;
  };

  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`feat-card relative rounded-2xl overflow-hidden group cursor-default ${className ?? ""}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        minHeight: "180px",
      }}
    >
      {/* Background image */}
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={feat.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          quality={85}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div style={{ backgroundColor: feat.accent, opacity: 0.15 }} className="absolute inset-0" />
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(160deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.72) 100%)`,
        }}
      />

      {/* Accent top border */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: feat.accent }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
        <span
          className="text-[40px] sm:text-[56px] font-black leading-none select-none absolute top-4 right-5 opacity-10 text-white"
          aria-hidden="true"
        >
          {feat.num}
        </span>
        <h3 className={`${feat.textSize} font-bold text-white mb-1.5 leading-tight text-balance`}>
          {feat.title}
        </h3>
        <p className="text-white/60 text-xs sm:text-sm leading-relaxed line-clamp-2 group-hover:text-white/80 transition-colors duration-300">
          {feat.desc}
        </p>
      </div>

      {/* Hover reveal: Learn More */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        style={{ background: feat.accent }}
      >
        <Link
          href="/infrastructure"
          className="text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          Learn More
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FeaturesGrid({ images }: FeaturesGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat-card", {
        y: 40, opacity: 0, stagger: { amount: 0.5, from: "start" },
        duration: 0.65, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.from(".fg-heading", {
        y: 30, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        <div className="fg-heading text-center mb-14">
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

        {/* Bento grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[minmax(160px,auto)]"
          style={{ gridTemplateRows: "auto" }}
        >
          {/* Card 1 — big (2×2 on lg) */}
          <BentoCard
            feat={features[0]}
            imgSrc={features[0].localImage}
            className="lg:col-span-2 lg:row-span-2"
          />

          {/* Cards 2 & 3 — normal */}
          <BentoCard feat={features[1]} imgSrc={features[1].localImage} />
          <BentoCard feat={features[2]} imgSrc={features[2].localImage} />

          {/* Card 4 — normal */}
          <BentoCard feat={features[3]} imgSrc={features[3].localImage} />

          {/* Card 5 — wide (2 cols on lg) */}
          <BentoCard feat={features[4]} imgSrc={features[4].localImage} className="col-span-2 lg:col-span-2" />

          {/* Card 6 — normal */}
          <BentoCard feat={features[5]} imgSrc={features[5].localImage} />
        </div>

      </div>
    </section>
  );
}
