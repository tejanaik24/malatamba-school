"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    stage: "Pre-Primary",
    classes: "Nursery · LKG · UKG",
    age: "Ages 3–5",
    desc: "Play-based learning that builds language, numeracy, creativity, and social skills. Every child is encouraged to explore, ask questions, and have fun.",
    subjects: ["English", "Telugu", "Numbers & Shapes", "Environmental Science", "Drawing & Craft", "Songs & Stories"],
    color: "border-yellow-400 bg-yellow-50",
    badge: "bg-yellow-100 text-yellow-700",
  },
  {
    stage: "Primary",
    classes: "Class I to V",
    age: "Ages 6–10",
    desc: "Building the academic foundation with focus on reading, writing, and arithmetic, alongside science, social studies, and values education.",
    subjects: ["English", "Telugu", "Hindi", "Mathematics", "Science", "Social", "General Knowledge", "Drawing", "Moral Science"],
    color: "border-blue-400 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    stage: "Upper Primary",
    classes: "Class VI to VIII",
    age: "Ages 11–13",
    desc: "Deeper subject specialisation. Students begin formal Sciences, Social Sciences, and a third language. Labs, projects, and group activities become central.",
    subjects: ["English", "Telugu", "Hindi", "Mathematics", "Physical Science", "Biological Science", "Social Studies"],
    color: "border-green-500 bg-green-50",
    badge: "bg-green-100 text-green-700",
  },
  {
    stage: "Secondary",
    classes: "Class IX to X",
    age: "Ages 14–15",
    desc: "Board exam preparation with comprehensive academic coverage, regular mock tests, and personal mentoring to ensure every student performs at their best.",
    subjects: ["English", "Telugu/Hindi", "Mathematics", "Physical Science", "Biological Science", "Social Studies"],
    color: "border-primary bg-primary/5",
    badge: "bg-primary/10 text-primary",
  },
];

const METHODS = [
  { icon: "🖥️", title: "Smart Board Teaching", desc: "Interactive smart boards in every classroom make lessons visual, engaging, and easy to understand." },
  { icon: "🧪", title: "Lab-First Science", desc: "Concepts are taught in classrooms but proven in labs — hands-on experiments for all sciences." },
  { icon: "📝", title: "Regular Assessments", desc: "Weekly tests, unit tests, and mock exams prepare students for board exams without last-minute pressure." },
  { icon: "👤", title: "Personal Mentoring", desc: "Every student is assigned a teacher-mentor who tracks individual progress and provides extra support." },
  { icon: "🏆", title: "Co-Curricular Integration", desc: "Sports, arts, and cultural activities are woven into the weekly schedule, not treated as extras." },
  { icon: "👨‍👩‍👧", title: "Parent Communication", desc: "Monthly PTMs, mid-term reports, and a dedicated helpline keep parents fully informed at every stage." },
];

export default function AcademicsClient() {
  const stagesRef = useRef<HTMLDivElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ac-hero-child", {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power2.out", delay: 0.1,
      });
      if (stagesRef.current) {
        gsap.from(stagesRef.current.querySelectorAll(".stage-card"), {
          y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: stagesRef.current, start: "top 78%", toggleActions: "play none none reverse" },
        });
      }
      if (methodsRef.current) {
        gsap.from(methodsRef.current.querySelectorAll(".method-card"), {
          y: 40, opacity: 0, stagger: 0.08, duration: 0.55, ease: "power2.out",
          scrollTrigger: { trigger: methodsRef.current, start: "top 78%", toggleActions: "play none none reverse" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.12),transparent_55%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="ac-hero-child inline-block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Nursery to Class X
          </span>
          <h1 className="ac-hero-child text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Academics at Malatamba
          </h1>
          <p className="ac-hero-child text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            A structured, caring approach to education that builds strong foundations and prepares students for a confident future.
          </p>
        </div>
      </section>

      {/* Academic stages */}
      <section ref={stagesRef} className="py-20 bg-light">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Curriculum Structure</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-3">From Nursery to Class X</h2>
          </div>
          <div className="space-y-8">
            {STAGES.map((s) => (
              <div
                key={s.stage}
                className={`stage-card rounded-2xl border-l-4 p-6 sm:p-8 ${s.color}`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-dark font-bold text-xl">{s.stage}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.badge}`}>{s.classes}</span>
                  <span className="text-gray-400 text-xs">{s.age}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.subjects.map((sub) => (
                    <span key={sub} className="px-3 py-1 bg-white rounded-full text-xs text-gray-700 border border-gray-200 shadow-sm">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching methods */}
      <section ref={methodsRef} className="py-20 bg-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">How We Teach</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Our Teaching Approach</h2>
            <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto">
              We combine proven traditional methods with modern tools to create classrooms where every child learns with confidence.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {METHODS.map((m) => (
              <div
                key={m.title}
                className="method-card p-7 rounded-2xl border border-white/10 hover:border-gold/30 transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                <span className="text-3xl mb-4 block">{m.icon}</span>
                <h3 className="text-white font-bold text-sm mb-2">{m.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board affiliation */}
      <section className="py-16 bg-light">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase rounded-full mb-6">
            Board Affiliation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-4">Andhra Pradesh State Board (APSCERT)</h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xl mx-auto mb-8">
            Our curriculum strictly follows the AP State Board syllabus designed by APSCERT, ensuring students are fully prepared for board examinations and higher education.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto">
            {[{ n: "Telugu", e: "Medium of Instruction" }, { n: "English", e: "Strong Second Language" }, { n: "Hindi", e: "Third Language" }].map((i) => (
              <div key={i.n} className="text-center">
                <p className="font-bold text-dark">{i.n}</p>
                <p className="text-gray-400 text-xs mt-0.5">{i.e}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14 text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-4">Questions about our curriculum?</h2>
        <p className="text-white/70 text-sm mb-6">Our team is happy to answer any questions about academics, admissions, or school life.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/admissions" className="px-7 py-3 bg-gold text-dark font-bold text-sm rounded-full hover:opacity-90 transition-all">
            Apply Now →
          </Link>
          <Link href="/contact" className="px-7 py-3 border border-white/40 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
