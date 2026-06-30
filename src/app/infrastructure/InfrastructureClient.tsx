"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  {
    id: "classrooms",
    num: "01",
    title: "Smart Classrooms",
    subtitle: "Technology-Powered Learning",
    desc: "Every classroom at Malatamba Vidyaniketan is equipped with interactive smart boards, HD projectors, and digital learning tools. Our teachers blend traditional pedagogy with modern technology to make every lesson engaging and effective.",
    highlights: ["Interactive Smart Boards", "HD Projectors", "Digital Content", "Wi-Fi Enabled"],
    image: "/ai-images/values-discipline.png",
    imageAlt: "Smart classroom with interactive board and students",
    color: "from-primary/80 to-dark/90",
  },
  {
    id: "labs",
    num: "02",
    title: "Science & Computer Labs",
    subtitle: "Hands-On Discovery",
    desc: "Our fully-equipped Physics, Chemistry and Biology laboratories give students the hands-on experience they need. The modern Computer Lab features high-speed internet, providing digital literacy from early grades.",
    highlights: ["Physics Lab", "Chemistry Lab", "Biology Lab", "50-seat Computer Lab"],
    image: "/ai-images/feature-lab.png",
    imageAlt: "Students conducting science experiment in laboratory",
    color: "from-dark/90 to-primary/60",
  },
  {
    id: "library",
    num: "03",
    title: "Library & Reading Room",
    subtitle: "A World of Knowledge",
    desc: "Our well-stocked library houses over 5,000 books, reference materials, newspapers, and magazines. The dedicated reading room cultivates a love for books and research, supporting students from all grades.",
    highlights: ["5,000+ Books", "Reference Section", "Reading Room", "Daily Newspapers"],
    image: "/ai-images/highlights-library.png",
    imageAlt: "School library with bookshelves and reading area",
    color: "from-primary/70 to-dark/80",
  },
  {
    id: "sports",
    num: "04",
    title: "Sports & Athletics",
    subtitle: "Champions in the Making",
    desc: "Physical fitness is an integral part of education at Malatamba. Our expansive grounds support cricket, football, athletics and indoor games. Qualified sports coaches ensure every child develops team spirit and physical health.",
    highlights: ["Cricket Ground", "Football Field", "Athletics Track", "Indoor Games"],
    image: "/ai-images/highlights-sports.png",
    imageAlt: "Students playing sports on school ground",
    color: "from-dark/80 to-primary/70",
  },
  {
    id: "transport",
    num: "05",
    title: "Safe Transport",
    subtitle: "Doorstep to Classroom",
    desc: "Our fleet of GPS-tracked school buses covers all major routes across Visakhapatnam. With trained drivers, female attendants on every bus, and strict safety protocols, parents can trust their children are in safe hands.",
    highlights: ["GPS Tracking", "Female Attendants", "City-Wide Routes", "Trained Drivers"],
    image: "/ai-images/feature-sports.png",
    imageAlt: "School bus on road",
    color: "from-primary/80 to-dark/90",
  },
  {
    id: "campus",
    num: "06",
    title: "Campus & Culture",
    subtitle: "Where Learning Lives",
    desc: "Beyond classrooms and labs, our campus is alive with culture — art rooms, music practice halls, stage for performances, and beautifully maintained grounds. Every corner inspires a child to explore their fullest potential.",
    highlights: ["Auditorium Stage", "Art Room", "Music Room", "Landscaped Grounds"],
    image: "/ai-images/highlights-cultural.png",
    imageAlt: "Students at a school cultural event",
    color: "from-dark/90 to-primary/80",
  },
];

/* ── Desktop horizontal scroll ─────────────────────────────────────────── */
function DesktopScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".infra-panel");
      if (!panels.length || !containerRef.current) return;

      const mainTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.5,
            delay: 0.1,
            ease: "power1.inOut",
            inertia: false,
          },
          end: () => "+=" + containerRef.current!.offsetWidth * (panels.length - 1),
          invalidateOnRefresh: true,
        },
      });

      // Per-panel entrance animations
      panels.forEach((panel) => {
        const tl = gsap.timeline({ paused: true });
        tl.from(panel.querySelector(".ip-text"), { x: -40, opacity: 0, duration: 0.6, ease: "power2.out", immediateRender: false })
          .from(panel.querySelector(".ip-image"), { x: 40, opacity: 0, scale: 0.95, duration: 0.8, ease: "power2.out", immediateRender: false }, 0.15)
          .from(panel.querySelectorAll(".ip-highlight"), { y: 20, opacity: 0, stagger: 0.07, duration: 0.4, ease: "power2.out", immediateRender: false }, 0.3);

        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: mainTween,
          start: "left 60%",
          end: "right 40%",
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play(),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative hidden lg:block">
      <div className="flex h-screen w-full overflow-hidden">
        {facilities.map((f) => (
          <section
            key={f.id}
            id={f.id}
            className="infra-panel relative w-screen h-screen shrink-0 flex items-center justify-center overflow-hidden bg-dark"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-60`} />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-16 grid grid-cols-2 gap-16 items-center">
              {/* Text side */}
              <div className="ip-text">
                <span className="block text-gold text-xs tracking-[0.25em] uppercase font-medium mb-3">
                  {f.subtitle}
                </span>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-white/10 text-[96px] font-bold leading-none select-none">{f.num}</span>
                  <h2 className="text-white text-4xl xl:text-5xl font-bold leading-tight -ml-8">{f.title}</h2>
                </div>
                <p className="text-white/70 text-base leading-relaxed max-w-md mb-8">{f.desc}</p>
                <ul className="grid grid-cols-2 gap-3">
                  {f.highlights.map((h) => (
                    <li key={h} className="ip-highlight flex items-center gap-2 text-white/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 border border-gold/50 text-gold text-sm font-semibold rounded-full hover:bg-gold hover:text-dark transition-all"
                >
                  Enquire About Admissions
                </Link>
              </div>

              {/* Image side */}
              <div
                className="ip-image relative h-[420px] rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: "1px solid rgba(201,168,76,0.2)" }}
              >
                <Image
                  src={f.image}
                  alt={f.imageAlt}
                  fill
                  className="object-cover"
                  sizes="45vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white text-xs font-mono opacity-50">
                  {f.num} / 06
                </div>
              </div>
            </div>

            {/* Panel counter */}
            <div className="absolute bottom-8 right-8 text-white/30 text-xs font-mono">{f.num} / 06</div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile vertical scroll ─────────────────────────────────────────────── */
function MobileScroll() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        gsap.from(el.querySelector(".mv-content"), {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="lg:hidden pt-20 pb-16 space-y-1 bg-dark">
      {facilities.map((f, i) => (
        <section
          key={f.id}
          id={f.id}
          ref={(el) => { sectionRefs.current[i] = el; }}
          className="relative overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-64 w-full">
            <Image src={f.image} alt={f.imageAlt} fill className="object-cover" sizes="100vw" quality={80} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/30 to-dark/80" />
            <span className="absolute top-4 left-4 text-white/30 text-xs font-mono">{f.num} / 06</span>
          </div>

          {/* Text */}
          <div className="mv-content bg-dark px-6 py-8">
            <span className="block text-gold text-xs tracking-[0.2em] uppercase font-medium mb-2">{f.subtitle}</span>
            <h2 className="text-white text-2xl font-bold mb-4">{f.title}</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{f.desc}</p>
            <ul className="grid grid-cols-2 gap-2 mb-6">
              {f.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-white/70 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <div className="px-6 py-8 text-center">
        <Link
          href="/admissions"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-dark font-bold text-sm rounded-full hover:opacity-90 transition-all"
        >
          Enquire About Admissions →
        </Link>
      </div>
    </div>
  );
}

export default function InfrastructureClient() {
  return (
    <>
      {/* Hero banner */}
      <div className="relative h-56 sm:h-72 lg:h-screen lg:hidden flex items-end bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-dark" />
        <div className="relative z-10 px-6 pb-10 lg:hidden">
          <span className="block text-gold text-xs tracking-[0.2em] uppercase font-medium mb-2">
            World-Class Facilities
          </span>
          <h1 className="text-white text-3xl sm:text-4xl font-bold">Our Infrastructure</h1>
          <p className="text-white/60 text-sm mt-2 max-w-sm">
            Modern facilities designed to inspire curiosity and nurture every talent.
          </p>
        </div>
      </div>

      {/* Desktop horizontal scroll (hidden on mobile) */}
      <DesktopScroll />

      {/* Mobile vertical scroll */}
      <MobileScroll />
    </>
  );
}
