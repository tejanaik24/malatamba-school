"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CARD_TRANSITION = "transform 0.65s cubic-bezier(0.22,1,0.36,1), box-shadow 0.65s cubic-bezier(0.22,1,0.36,1)";
const IMG_TRANSITION  = "transform 0.65s cubic-bezier(0.22,1,0.36,1)";
const FAST_TRANSITION = "opacity 0.4s ease, transform 0.4s ease";

const galleryItems = [
  {
    src:   "/real-photos/events/school-life-2026/mar16-01.webp",
    label: "School Life",
    tall:  true,
    wide:  false,
  },
  {
    src:   "/real-photos/events/school-life-2026/mar17-02.webp",
    label: "Student Activities",
    tall:  false,
    wide:  false,
  },
  {
    src:   "/real-photos/events/school-life-2026/mar25-01.webp",
    label: "Campus Moments",
    tall:  false,
    wide:  false,
  },
  {
    src:   "/real-photos/events/sankrathi/dsc04819-596x337.webp",
    label: "Sankrathi Celebration",
    tall:  false,
    wide:  true,
  },
  {
    src:   "/real-photos/events/science-fair/dsc04003-596x337.webp",
    label: "Science Fair",
    tall:  false,
    wide:  true,
  },
];

function GalleryCard({
  src,
  label,
  wide,
  index,
}: {
  src: string;
  label: string;
  tall: boolean;
  wide: boolean;
  index: number;
}) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLSpanElement>(null);
  const borderRef  = useRef<HTMLDivElement>(null);

  const enter = useCallback(() => {
    const c = cardRef.current;
    if (!c) return;
    c.style.willChange = "transform";
    c.style.transform  = "translateY(-8px) scale(1.02)";
    c.style.boxShadow  = "0 24px 60px rgba(0,0,0,0.4)";
    if (imgRef.current)     imgRef.current.style.transform   = "scale(1.08)";
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
    if (infoRef.current) {
      infoRef.current.style.transform = "translateY(-4px)";
      infoRef.current.style.opacity   = "1";
    }
    if (borderRef.current)  borderRef.current.style.opacity  = "1";
  }, []);

  const leave = useCallback(() => {
    const c = cardRef.current;
    if (!c) return;
    c.style.transform = "";
    c.style.boxShadow = "";
    if (imgRef.current)     imgRef.current.style.transform   = "scale(1)";
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
    if (infoRef.current) {
      infoRef.current.style.transform = "translateY(0)";
      infoRef.current.style.opacity   = "0.85";
    }
    if (borderRef.current)  borderRef.current.style.opacity  = "0";
    setTimeout(() => { if (c) c.style.willChange = "auto"; }, 650);
  }, []);

  const isFirst = index === 0;

  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0 round 16px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0 0 0 round 16px)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${
        isFirst ? "row-span-2 col-span-2 md:col-span-1 md:row-span-2" : ""
      } ${wide ? "col-span-2" : "col-span-1"}`}
      style={{ height: isFirst ? "400px" : wide ? "180px" : "180px" }}
    >
      <div
        ref={cardRef}
        onMouseEnter={enter}
        onMouseLeave={leave}
        className="absolute inset-0 overflow-hidden rounded-2xl bg-dark"
        style={{ transition: CARD_TRANSITION }}
      >
        {/* Gold border */}
        <div
          ref={borderRef}
          className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 2px rgba(201,168,76,0.9)", opacity: 0, transition: FAST_TRANSITION }}
        />

        {/* Image */}
        <div
          ref={imgRef}
          className="absolute inset-0"
          style={{ transition: IMG_TRANSITION }}
        >
          <Image
            src={src}
            alt={label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
            quality={85}
          />
        </div>

        {/* Permanent gradient — label always readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }}
        />

        {/* Hover overlay — extra depth + red tint */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(118,33,35,0.2) 0%, transparent 60%)",
            opacity: 0,
            transition: FAST_TRANSITION,
          }}
        />

        {/* Label — always visible, lifts on hover */}
        <span
          ref={infoRef}
          className="absolute bottom-3 left-3 text-white text-sm font-semibold drop-shadow-lg"
          style={{ opacity: 0.9, transition: FAST_TRANSITION }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-light" id="gallery">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-[0.2em] uppercase">
            Our Gallery
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-dark mt-3">
            Moments at Malatamba
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-4 text-base sm:text-lg">
            A glimpse into the vibrant life and activities at our school.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryItems.map((item, i) => (
            <GalleryCard
              key={item.src}
              src={item.src}
              label={item.label}
              tall={item.tall}
              wide={item.wide}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
          className="text-center mt-12"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full text-sm sm:text-base shadow-lg"
            style={{ transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = "0 12px 32px rgba(118,33,35,0.45)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "";
              el.style.boxShadow = "";
            }}
          >
            View Full Gallery
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
