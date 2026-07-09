"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function LeadershipMessage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!imageRef.current || !textRef.current) return;

      gsap.fromTo(
        imageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        textRef.current.children,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark overflow-hidden py-20 sm:py-28"
    >
      {/* Ambient maroon glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(118,33,35,0.4),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.08),transparent_55%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* Photo */}
        <div ref={imageRef} className="relative">
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-gold/50" />
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/5]"
              style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.15)" }}
            >
              <Image
                src="/real-photos/people/chairman.jpg"
                alt="Mr. Suneel Mahanty — Chairman, Malatamba Vidyaniketan"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 45vw"
                quality={90}
                priority
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="text-center lg:text-left">
          <span className="block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Chairman&apos;s Message
          </span>

          <h2
            style={{ fontFamily: "var(--font-fraunces, Georgia, serif)" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3"
          >
            Mr. Suneel Mahanty
          </h2>

          <p className="text-gold text-sm sm:text-base font-medium mb-6">
            Chairman, Malatamba Vidyaniketan
          </p>

          <div className="w-16 h-px bg-gold mx-auto lg:mx-0 mb-6" />

          <blockquote className="text-white/80 text-base sm:text-lg leading-relaxed italic mb-6 max-w-xl mx-auto lg:mx-0">
            &ldquo;Our vision is to meet the dynamic changes in education with focus
            on improvised teaching methodology — nurturing every child to reach
            their fullest potential.&rdquo;
          </blockquote>

          <p
            style={{ fontFamily: "var(--font-fraunces, Georgia, serif)" }}
            className="italic text-gold/90 text-lg"
          >
            — Suneel Mahanty
          </p>
        </div>
      </div>
    </section>
  );
}
