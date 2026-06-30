"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CARD_TRANSITION = "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.6s cubic-bezier(0.25,0.46,0.45,0.94)";
const IMG_TRANSITION  = "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)";
const FAST_TRANSITION = "opacity 0.4s ease, transform 0.4s ease";

const galleryItems = [
  {
    src:   "/real-photos/student-gallery/dsc01812-510x286.webp",
    label: "Campus Life",
    tall: true,
    wide: false,
  },
  {
    src:   "/real-photos/student-gallery/dsc01818-510x286.webp",
    label: "Student Life",
    tall: false,
    wide: false,
  },
  {
    src:   "/real-photos/events/annual-day-2023/dsc-7509-506x337.webp",
    label: "Annual Day 2023",
    tall: false,
    wide: false,
  },
  {
    src:   "/real-photos/events/sankrathi/dsc04819-596x337.webp",
    label: "Sankrathi Celebration",
    tall: false,
    wide: true,
  },
  {
    src:   "/real-photos/events/science-fair/dsc04003-596x337.webp",
    label: "Science Fair",
    tall: false,
    wide: true,
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
    c.style.transform  = "translateY(-8px)";
    c.style.boxShadow  = "0 20px 50px rgba(0,0,0,0.35)";
    if (imgRef.current)     imgRef.current.style.transform   = "scale(1.08)";
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
    if (infoRef.current)    infoRef.current.style.transform  = "translateY(-4px)";
    if (borderRef.current)  borderRef.current.style.opacity  = "1";
  }, []);

  const leave = useCallback(() => {
    const c = cardRef.current;
    if (!c) return;
    c.style.transform = "";
    c.style.boxShadow = "";
    if (imgRef.current)     imgRef.current.style.transform   = "scale(1)";
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
    if (infoRef.current)    infoRef.current.style.transform  = "translateY(0)";
    if (borderRef.current)  borderRef.current.style.opacity  = "0";
    setTimeout(() => { if (c) c.style.willChange = "auto"; }, 650);
  }, []);

  const isFirst = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-xl cursor-pointer ${
        isFirst ? "row-span-2 col-span-2 md:col-span-1 md:row-span-2" : ""
      } ${wide ? "col-span-2" : "col-span-1"}`}
      style={{ height: isFirst ? "400px" : wide ? "180px" : "180px" }}
    >
      <div
        ref={cardRef}
        onMouseEnter={enter}
        onMouseLeave={leave}
        className="absolute inset-0 overflow-hidden rounded-xl bg-dark"
        style={{ transition: CARD_TRANSITION }}
      >
        {/* Gold border */}
        <div
          ref={borderRef}
          className="absolute inset-0 rounded-xl z-20 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 2px rgba(201,168,76,0.85)", opacity: 0, transition: FAST_TRANSITION }}
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

        {/* Gradient overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
            opacity: 0,
            transition: FAST_TRANSITION,
          }}
        />

        {/* Label */}
        <span
          ref={infoRef}
          className="absolute bottom-3 left-3 text-white text-sm font-semibold drop-shadow-lg"
          style={{ transition: FAST_TRANSITION }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function GalleryPreview() {
  return (
    <section className="py-20 sm:py-28 bg-light" id="gallery">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all text-sm sm:text-base"
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
