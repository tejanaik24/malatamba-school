"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const DEPARTMENTS = [
  {
    dept: "Languages",
    icon: "📖",
    subjects: "Telugu, English, Hindi",
    staff: 8,
    desc: "Our language faculty builds strong communication and comprehension skills, combining classical teaching methods with modern literature.",
  },
  {
    dept: "Mathematics",
    icon: "🔢",
    subjects: "Arithmetic, Algebra, Geometry",
    staff: 6,
    desc: "Experienced mathematicians who make numbers approachable and exciting — from basic arithmetic to advanced problem-solving.",
  },
  {
    dept: "Sciences",
    icon: "🔬",
    subjects: "Physics, Chemistry, Biology",
    staff: 7,
    desc: "Lab-first approach. Our science faculty takes students from textbook concepts to real experiments, building genuine scientific curiosity.",
  },
  {
    dept: "Social Sciences",
    icon: "🌍",
    subjects: "History, Geography, Civics",
    staff: 5,
    desc: "Expert educators who connect past and present, helping students understand the world they live in.",
  },
  {
    dept: "Computer Science",
    icon: "💻",
    subjects: "ICT, Programming Basics",
    staff: 4,
    desc: "Digital-first teachers preparing students for a technology-driven future with practical, hands-on computer education.",
  },
  {
    dept: "Arts & Culture",
    icon: "🎨",
    subjects: "Drawing, Dance, Craft",
    staff: 6,
    desc: "Nurturing creative expression. Our arts faculty ensures every child discovers and develops their artistic side.",
  },
  {
    dept: "Sports & Physical Education",
    icon: "🏃",
    subjects: "Cricket, Football, Athletics, Yoga",
    staff: 5,
    desc: "Qualified sports coaches who build physical fitness, team spirit, and competitive confidence in every student.",
  },
  {
    dept: "Support Staff",
    icon: "❤️",
    subjects: "Counselling, Library, Labs",
    staff: 9,
    desc: "Librarians, counsellors, and lab assistants who provide the extra care and resources students need to thrive.",
  },
];

export default function FacultyClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const principalRef = useRef<HTMLDivElement>(null);
  const deptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".fh-child", {
          y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power2.out", delay: 0.1,
        });
        if (principalRef.current) {
          gsap.fromTo(principalRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
              scrollTrigger: { trigger: principalRef.current, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        }
        if (deptRef.current) {
          gsap.fromTo(deptRef.current.querySelectorAll(".dept-card"),
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.55, ease: "power2.out",
              scrollTrigger: { trigger: deptRef.current, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        }
        ScrollTrigger.refresh();
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative bg-primary pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.1),transparent_55%)]" />
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="fh-child inline-block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            50+ Dedicated Educators
          </span>
          <h1 className="fh-child text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Our Faculty
          </h1>
          <p className="fh-child text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Behind every successful student is a great teacher. Meet the experienced, passionate educators who make Malatamba Vidyaniketan special.
          </p>
        </div>
      </section>

      {/* Principal's Message */}
      <section ref={principalRef} className="py-20 bg-light">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid sm:grid-cols-[240px_1fr]">
              <div className="relative bg-primary/5 h-64 sm:h-auto">
                <Image
                  src="/ai-images/feature-faculty.png"
                  alt="School Principal"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, 240px"
                  quality={85}
                />
              </div>
              <div className="p-8 sm:p-10">
                <span className="block text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                  Principal&apos;s Message
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-4">
                  Teaching is a Noble Calling
                </h2>
                <div className="relative">
                  <span className="absolute -top-2 -left-1 text-7xl text-primary/8 font-serif leading-none select-none">&ldquo;</span>
                  <div className="space-y-3 text-gray-600 text-sm leading-relaxed pl-1">
                    <p>
                      Every child who walks through our gates has unlimited potential. Our job as educators is to unlock that potential — through patience, passion, and personalised care.
                    </p>
                    <p>
                      I am proud to lead a faculty that does not just teach subjects — they build futures. Our teachers invest their hearts in every classroom, every child, every day.
                    </p>
                  </div>
                </div>
                <p className="mt-5 font-bold text-dark text-sm">The Principal</p>
                <p className="text-primary text-xs">Malatamba Vidyaniketan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section ref={deptRef} className="py-20 bg-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Academic Departments</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Expertise Across Every Subject</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DEPARTMENTS.map((d) => (
              <div
                key={d.dept}
                className="dept-card p-6 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300 group"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                <span className="text-3xl mb-4 block">{d.icon}</span>
                <h3 className="text-white font-bold text-base mb-1 group-hover:text-gold transition-colors">{d.dept}</h3>
                <p className="text-gold/60 text-xs font-mono mb-3">{d.subjects}</p>
                <p className="text-white/55 text-xs leading-relaxed mb-4">{d.desc}</p>
                <span className="text-white/30 text-xs">{d.staff} educators</span>
              </div>
            ))}
          </div>

          {/* Total bar */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl text-center border border-white/10" style={{ backgroundColor: "rgba(201,168,76,0.06)" }}>
            <p className="text-gold font-bold text-3xl">50+</p>
            <p className="text-white/60 text-sm mt-1">Total Faculty Members Across All Departments</p>
          </div>
        </div>
      </section>

      {/* Why our teachers are different */}
      <section className="py-20 bg-light">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">The Malatamba Difference</span>
            <h2 className="text-3xl font-bold text-dark mt-3">What Makes Our Teachers Special</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "📚", title: "Trained & Qualified", desc: "All faculty hold recognised teaching qualifications. Regular training workshops keep them current." },
              { icon: "❤️", title: "Student-First Mindset", desc: "Our teachers know every student by name and track individual progress, not just class averages." },
              { icon: "🗣️", title: "Open to Parents", desc: "Monthly parent-teacher meetings and an open-door policy ensure families are always informed." },
            ].map((i) => (
              <div key={i.title} className="text-center p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
                <span className="text-4xl mb-4 block">{i.icon}</span>
                <h3 className="font-bold text-dark mb-2">{i.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14 text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-4">Want to meet the team?</h2>
        <p className="text-white/70 text-sm mb-6">Visit our school and speak to our faculty in person.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="px-7 py-3 bg-gold text-dark font-bold text-sm rounded-full hover:opacity-90 transition-all">
            Book a School Visit
          </Link>
          <Link href="/admissions" className="px-7 py-3 border border-white/40 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all">
            Enquire About Admissions
          </Link>
        </div>
      </section>
    </main>
  );
}
