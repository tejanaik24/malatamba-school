"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 20,   suffix: "+", label: "Years of Excellence", sub: "Est. 2002, PM Palem" },
  { value: 1000, suffix: "+", label: "Students Enrolled",   sub: "Across Nursery to Class X" },
  { value: 50,   suffix: "+", label: "Expert Faculty",      sub: "Dedicated educators" },
  { value: 4.9,  suffix: "★", label: "Google Rating",       sub: "Parent verified reviews", decimal: 1 },
];

function CountUp({
  target, suffix, duration = 2.2, decimal = 0,
}: { target: number; suffix: string; duration?: number; decimal?: number }) {
  const [display, setDisplay] = useState("0");
  const spanRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () => {
        if (started.current) return;
        started.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration,
          ease: "power2.out",
          onUpdate: () => setDisplay(obj.val.toFixed(decimal)),
        });
      },
    });
    return () => trigger.kill();
  }, [target, duration, decimal]);

  return (
    <span ref={spanRef}>
      {display}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sc-card", {
        y: 50, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.from(".sc-heading", {
        y: 30, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0a0a 0%, #2d0e10 45%, #1a0a0a 100%)" }}
    >
      {/* Decorative radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(118,33,35,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Top gold line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="sc-heading text-center mb-16">
          <span
            className="text-xs font-bold tracking-[0.3em] uppercase mb-3 block"
            style={{ color: "rgba(201,168,76,0.7)" }}
          >
            By the Numbers
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Two Decades of{" "}
            <span style={{ color: "#c9a84c" }}>Trust & Excellence</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="sc-card relative rounded-2xl p-6 sm:p-8 text-center overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.06), transparent 70%)" }}
              />

              {/* Number */}
              <div
                className="text-4xl sm:text-5xl lg:text-6xl font-black mb-2 tabular-nums"
                style={{
                  color: i === 3 ? "#c9a84c" : "#fff",
                  letterSpacing: "-0.02em",
                  textShadow: "0 0 40px rgba(201,168,76,0.15)",
                }}
              >
                <CountUp target={s.value} suffix={s.suffix} decimal={s.decimal ?? 0} />
              </div>

              {/* Gold underline */}
              <div
                className="w-8 h-0.5 mx-auto mb-3"
                style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }}
              />

              <p className="text-white font-semibold text-sm sm:text-base mb-1">{s.label}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Bottom proof line */}
        <p
          className="text-center text-xs mt-10 tracking-wide"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Malatamba Vidyaniketan — Sadguru Towers, Malatamba Road, PM Palem, Visakhapatnam 530041
        </p>
      </div>

      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)" }}
      />
    </section>
  );
}
