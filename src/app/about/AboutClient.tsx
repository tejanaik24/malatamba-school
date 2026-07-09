"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import LeadershipMessage from "@/sections/LeadershipMessage";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 20, suffix: "+", label: "Years of Excellence" },
  { value: 1000, suffix: "+", label: "Students Graduated" },
  { value: 50, suffix: "+", label: "Faculty Members" },
  { value: 19, suffix: "", label: "Annual Events" },
];

function CountUp({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (started.current) return;
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / (duration * 1000), 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
    });
    return () => trigger.kill();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".ha-child", {
          y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power2.out", delay: 0.1,
        });
        if (missionRef.current) {
          gsap.fromTo(missionRef.current.querySelectorAll(".mv-card"),
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "power2.out",
              scrollTrigger: { trigger: missionRef.current, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        }
        if (timelineRef.current) {
          gsap.from(timelineRef.current.querySelectorAll(".tl-item"), {
            y: 30, opacity: 0, stagger: 0.15, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 78%", toggleActions: "play none none reverse" },
          });
        }
        ScrollTrigger.refresh();
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.12),transparent_55%)]" />
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="ha-child inline-block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Est. 2002 — PM Palem, Visakhapatnam
          </span>
          <h1 className="ha-child text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Our Story
          </h1>
          <p className="ha-child text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Founded with a commitment to holistic education, Malatamba Vidyaniketan has shaped thousands of young minds across Visakhapatnam for over two decades.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark py-14">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-4xl sm:text-5xl font-bold text-gold mb-1">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <p className="text-white/50 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chairman's Message */}
      <LeadershipMessage />

      {/* Mission & Vision */}
      <section ref={missionRef} className="py-20 sm:py-28 bg-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Our Purpose</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Mission & Vision</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                icon: "🎯",
                title: "Our Mission",
                text: "To provide holistic, value-based education that empowers every student with knowledge, skills, and character — preparing them to excel in academics, contribute to society, and lead lives of purpose.",
              },
              {
                icon: "🌟",
                title: "Our Vision",
                text: "To be the most trusted school in Visakhapatnam — a place where every child thrives, every teacher inspires, and every family feels they made the right choice.",
              },
              {
                icon: "💎",
                title: "Our Values",
                text: "Discipline, Excellence, Innovation, and Integrity — these four values guide everything from classroom culture to sports fields, shaping students who are ready for life.",
              },
              {
                icon: "🤝",
                title: "Our Promise",
                text: "Every child deserves personalised attention. We keep class sizes manageable, maintain open communication with parents, and never stop working to improve.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="mv-card p-8 rounded-2xl border border-white/10 hover:border-gold/30 transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <span className="text-3xl mb-4 block">{card.icon}</span>
                <h3 className="text-white font-bold text-lg mb-3">{card.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 sm:py-28 bg-light">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3">Milestones</h2>
          </div>
          <ol className="relative border-l-2 border-primary/20 space-y-10 pl-8">
            {[
              { year: "2002", title: "Founded", desc: "Malatamba Vidyaniketan opens its doors at PM Palem, Visakhapatnam, with 3 classrooms and 80 students." },
              { year: "2009", title: "Infrastructure Expansion", desc: "New science labs, library, and computer centre added. Student strength crosses 300." },
              { year: "2013", title: "Sports Complex", desc: "Expanded grounds with dedicated cricket and football fields. First inter-district sports championship won." },
              { year: "2017", title: "Smart Classrooms", desc: "All classrooms upgraded with interactive smart boards. Digital learning integrated across all grades." },
              { year: "2022", title: "1000+ Students", desc: "School reaches a historic milestone of 1,000+ enrolled students and 50+ faculty members." },
              { year: "2025", title: "20 Years Strong", desc: "Celebrating two decades of excellence, community trust, and thousands of proud graduates." },
            ].map((m) => (
              <li key={m.year} className="tl-item relative">
                <span className="absolute -left-[42px] w-5 h-5 rounded-full bg-primary border-4 border-light" />
                <span className="text-primary font-bold text-sm">{m.year}</span>
                <h3 className="text-dark font-bold text-base mt-0.5 mb-1">{m.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to be part of the Malatamba Family?
        </h2>
        <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
          Admissions are now open for the 2025–26 academic year. Seats are limited.
        </p>
        <Link
          href="/admissions"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-dark font-bold text-sm rounded-full hover:opacity-90 transition-all"
        >
          Apply for Admission →
        </Link>
      </section>
    </main>
  );
}
