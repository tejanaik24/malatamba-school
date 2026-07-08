"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    id: "timings",
    icon: "🕗",
    title: "School Timings",
    color: "border-blue-500",
    items: [
      { label: "School Hours", value: "8:15 AM – 5:00 PM (Monday to Saturday)" },
      { label: "Gates Open", value: "8:00 AM" },
      { label: "Prayer Assembly", value: "8:45 AM (mandatory for all students)" },
      { label: "Lunch Break", value: "12:30 PM – 1:15 PM" },
      { label: "School Closes", value: "5:00 PM" },
      { label: "Sundays & Holidays", value: "School is closed. Holiday list issued at start of year." },
    ],
  },
  {
    id: "attendance",
    icon: "📋",
    title: "Attendance Policy",
    color: "border-green-500",
    items: [
      { label: "Minimum Attendance", value: "75% — mandatory to appear in board exams" },
      { label: "Late Arrivals", value: "Students arriving after 8:50 AM will be marked late" },
      { label: "Leave Application", value: "Written application required from parent/guardian" },
      { label: "Medical Leave", value: "Doctor's certificate required for 10+ consecutive days" },
      { label: "Long Absence", value: "Please inform the class teacher in advance if possible" },
      { label: "Proxy Attendance", value: "Strictly prohibited. Action will be taken." },
    ],
  },
  {
    id: "dress",
    icon: "👕",
    title: "Dress Code",
    color: "border-gold",
    items: [
      { label: "School Uniform", value: "Mandatory on all school days." },
      { label: "Sports Uniform", value: "On Physical Education days as communicated by class teacher" },
      { label: "Footwear", value: "Black shoes with white socks for all students" },
      { label: "Hair", value: "Boys: neat and trimmed. Girls: braided or tied neatly." },
      { label: "Jewellery", value: "Only small studs/earrings for girls. Gold jewellery not permitted." },
      { label: "Mobile Phones", value: "Not permitted on school premises" },
    ],
  },
  {
    id: "conduct",
    icon: "🤝",
    title: "Code of Conduct",
    color: "border-primary",
    items: [
      { label: "Respect", value: "Every student is expected to respect teachers, staff, and fellow students at all times" },
      { label: "Bullying", value: "Strictly prohibited. Any form of bullying will be addressed immediately." },
      { label: "School Property", value: "Students must take care of all school property. Damage must be compensated." },
      { label: "Examinations", value: "Use of unfair means during any exam will lead to disciplinary action." },
      { label: "Social Media", value: "Students must not post content that misrepresents the school or fellow students." },
      { label: "Discipline", value: "Repeated violations may result in suspension or cancellation of admission." },
    ],
  },
  {
    id: "fees",
    icon: "💳",
    title: "Fee Guidelines",
    color: "border-purple-500",
    items: [
      { label: "Fee Schedule", value: "Term-wise fee collection as per the schedule given at the start of year." },
      { label: "Payment Methods", value: "Cash at school office." },
      { label: "Due Date", value: "Fees must be paid within the first 10 days of each term." },
      { label: "Late Payment", value: "Fine of ₹50/week applies on delayed payments after grace period." },
      { label: "Fee Receipt", value: "Always collect and retain your fee receipt as proof of payment." },
    ],
  },
];

export default function RulesClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rh-child", {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power2.out", delay: 0.1,
      });
      containerRef.current?.querySelectorAll(".rule-section").forEach((el) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 0.55, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.1),transparent_55%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="rh-child inline-block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Guidelines for Students & Parents
          </span>
          <h1 className="rh-child text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Rules & Regulations
          </h1>
          <p className="rh-child text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            A well-organised school is a happy school. These guidelines ensure every child has a safe, fair, and productive environment to learn and grow.
          </p>
        </div>
      </section>

      {/* Jump links */}
      <div className="bg-dark/95 sticky top-0 z-30 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex gap-6 overflow-x-auto text-xs font-semibold text-white/50 scrollbar-hide">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap hover:text-gold transition-colors shrink-0"
            >
              {s.icon} {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* Content */}
      <div ref={containerRef} className="py-16 bg-light">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {SECTIONS.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className={`rule-section bg-white rounded-2xl shadow-sm border-l-4 ${s.color} overflow-hidden`}
            >
              <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <h2 className="text-xl font-bold text-dark">{s.title}</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {s.items.map((item) => (
                  <div key={item.label} className="px-6 sm:px-8 py-4 grid sm:grid-cols-[200px_1fr] gap-2 sm:gap-6 items-baseline">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide shrink-0">{item.label}</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Note */}
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6 sm:p-8">
            <p className="text-primary font-semibold text-sm mb-2">Important Note</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              These rules are designed to ensure the safety, fairness, and well-being of every student. Parents are requested to read these guidelines carefully and discuss them with their children. For any queries or clarifications, please contact the school office.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-dark py-14 text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-4">Questions about the rules?</h2>
        <p className="text-white/60 text-sm mb-6">Our office team is happy to clarify anything.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="px-7 py-3 bg-primary text-white font-bold text-sm rounded-full hover:bg-primary/90 transition-all">
            Contact School Office
          </Link>
          <a href="https://wa.me/918374355556" target="_blank" rel="noopener noreferrer"
            className="px-7 py-3 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </main>
  );
}
