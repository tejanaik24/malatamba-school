"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";

export interface EventData {
  folder: string;
  name: string;
  photos: string[];
  cover: string;
}

interface LightboxState {
  event: EventData;
}

const CARD_TRANSITION = "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.6s cubic-bezier(0.25,0.46,0.45,0.94)";
const IMG_TRANSITION  = "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)";
const FAST_TRANSITION = "opacity 0.4s ease, transform 0.4s ease";

function EventCard({ event, onClick }: { event: EventData; onClick: () => void }) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);
  const borderRef  = useRef<HTMLDivElement>(null);

  const enter = useCallback(() => {
    const c = cardRef.current;
    const img = imgRef.current;
    const ov = overlayRef.current;
    const info = infoRef.current;
    const brd = borderRef.current;
    if (!c) return;
    c.style.willChange = "transform";
    c.style.transform = "translateY(-8px)";
    c.style.boxShadow = "0 20px 50px rgba(0,0,0,0.35)";
    if (img) img.style.transform = "scale(1.08)";
    if (ov) ov.style.opacity = "1";
    if (info) info.style.transform = "translateY(-4px)";
    if (brd) brd.style.opacity = "1";
  }, []);

  const leave = useCallback(() => {
    const c = cardRef.current;
    const img = imgRef.current;
    const ov = overlayRef.current;
    const info = infoRef.current;
    const brd = borderRef.current;
    if (!c) return;
    c.style.transform = "";
    c.style.boxShadow = "";
    if (img) img.style.transform = "scale(1)";
    if (ov) ov.style.opacity = "0";
    if (info) info.style.transform = "translateY(0)";
    if (brd) brd.style.opacity = "0";
    // defer will-change cleanup so transition completes
    setTimeout(() => { if (c) c.style.willChange = "auto"; }, 650);
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="relative overflow-hidden rounded-xl cursor-pointer bg-dark"
      style={{ transition: CARD_TRANSITION }}
    >
      {/* Gold border overlay */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-xl z-20 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 2px rgba(201,168,76,0.85)",
          opacity: 0,
          transition: FAST_TRANSITION,
        }}
      />

      {/* Photo count badge */}
      <div className="absolute top-3 right-3 z-10 bg-gold text-dark text-xs font-bold px-2.5 py-1 rounded-full shadow">
        {event.photos.length} Photos
      </div>

      {/* Cover image wrapper */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div ref={imgRef} className="absolute inset-0" style={{ transition: IMG_TRANSITION }}>
          <Image
            src={`/real-photos/events/${event.folder}/${event.cover}`}
            alt={event.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={80}
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
      </div>

      {/* Event name */}
      <div
        ref={infoRef}
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{ transition: FAST_TRANSITION }}
      >
        <h3 className="text-white font-bold text-base leading-tight drop-shadow-lg">
          {event.name}
        </h3>
      </div>
    </div>
  );
}

function Lightbox({ state, onClose }: { state: LightboxState; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef   = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(modalRef.current,   { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (fullscreen) setFullscreen(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen, onClose]);

  return (
    <>
      <div
        ref={overlayRef}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
        style={{ opacity: 0 }}
      >
        <div
          ref={modalRef}
          className="relative bg-dark rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
          style={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
            <div>
              <h2 className="text-white font-bold text-lg">{state.event.name}</h2>
              <p className="text-gray-400 text-sm">{state.event.photos.length} photos</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              aria-label="Close gallery"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Masonry photo grid */}
          <div className="overflow-y-auto p-4 flex-1">
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
              {state.event.photos.map((photo, i) => (
                <div
                  key={photo}
                  className="break-inside-avoid mb-3 group relative overflow-hidden rounded-lg cursor-zoom-in"
                  onClick={() => setFullscreen(`/real-photos/events/${state.event.folder}/${photo}`)}
                >
                  <Image
                    src={`/real-photos/events/${state.event.folder}/${photo}`}
                    alt={`${state.event.name} ${i + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 rounded-lg flex items-center justify-center">
                    <svg className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen viewer */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
          onClick={() => setFullscreen(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2 z-10 transition-colors"
            onClick={() => setFullscreen(null)}
            aria-label="Close fullscreen"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full h-full">
            <Image
              src={fullscreen}
              alt="Fullscreen photo"
              fill
              className="object-contain"
              quality={90}
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function GalleryClient({ events }: { events: EventData[] }) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <main id="main-content" className="min-h-screen bg-light pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-[0.2em] uppercase">
            School Gallery
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-dark mt-3">
            Moments at Malatamba
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto mt-4 text-base sm:text-lg">
            Celebrations, achievements, and daily life captured across our campus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event, i) => (
            <motion.div
              key={event.folder}
              initial={{ clipPath: "inset(100% 0 0 0 round 12px)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0% 0 0 0 round 12px)", opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <EventCard
                event={event}
                onClick={() => setLightbox({ event })}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox state={lightbox} onClose={() => setLightbox(null)} />
      )}
    </main>
  );
}
