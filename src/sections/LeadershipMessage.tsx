"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function LeadershipMessage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!imageRef.current || !textRef.current) return;

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const textChildren = textRef.current.children;
      gsap.fromTo(
        textChildren,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
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
    <section ref={sectionRef} className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left — Chairman photo */}
          <div ref={imageRef} className="shrink-0 w-full max-w-sm lg:max-w-xs xl:max-w-sm">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                border: "3px solid rgba(201,168,76,0.6)",
                boxShadow: "0 8px 40px rgba(118,33,35,0.18), 0 0 0 1px rgba(201,168,76,0.15)",
              }}
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/real-photos/people/chairman.webp"
                  alt="Mr. Suneel Mahanty — Chairman"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 90vw, 320px"
                  quality={90}
                />
                {/* Subtle gold frame overlay */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{ outline: "1px solid rgba(201,168,76,0.25)", outlineOffset: "-8px" }}
                />
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div ref={textRef} className="flex-1 relative">
            {/* Decorative oversized quote mark */}
            <span
              className="absolute -top-6 -left-4 text-[160px] leading-none font-serif text-primary select-none pointer-events-none"
              style={{ opacity: 0.06 }}
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <span className="block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Chairman&apos;s Message
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark leading-tight mb-2">
              Mr. Suneel Mahanty
            </h2>

            <p className="text-gray-500 text-sm font-medium mb-8 tracking-wide">
              M.Sc., M.Phil., MBA (FISM) — Chairman
            </p>

            <div className="w-12 h-0.5 bg-gold mb-8" />

            <blockquote className="relative">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed lg:leading-loose max-w-2xl">
                The vision of our Chairman is to meet the dynamic changes in educational arena with focus on
                improvised teaching methodology for enhancing the quality of budding professionals.
                Malatamba Vidyaniketan is successfully running since{" "}
                <span className="text-primary font-semibold">20 years</span>, imparting quality education
                with well conceived academic policies.
              </p>
            </blockquote>

            <div className="mt-10 flex items-center gap-6">
              <div className="text-center">
                <span className="block text-2xl font-bold text-gold">20+</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Years</span>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <span className="block text-2xl font-bold text-gold">1000+</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Students</span>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <span className="block text-2xl font-bold text-gold">50+</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Faculty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
