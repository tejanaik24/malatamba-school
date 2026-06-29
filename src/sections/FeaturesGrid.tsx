"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ImageData } from "@/lib/images";

interface FeaturesGridProps {
  images: ImageData[];
}

const features = [
  {
    num: "01",
    title: "Experienced Faculty",
    desc: "Our dedicated team of qualified educators brings years of experience and a passion for teaching, ensuring every child receives personalized attention.",
    localImage: "/ai-images/feature-faculty.png",
    alt: "Experienced faculty member teaching",
  },
  {
    num: "02",
    title: "Science & Computer Labs",
    desc: "Well-equipped physics, chemistry, and biology laboratories alongside a modern computer lab with high-speed internet for digital literacy.",
    localImage: "/ai-images/feature-lab.png",
    alt: "Students in science laboratory",
  },
  {
    num: "03",
    title: "Sports & Athletics",
    desc: "Extensive sports facilities including a playground for cricket, football, athletics, and indoor games to promote physical fitness and teamwork.",
    localImage: "/ai-images/feature-sports.png",
    alt: "Students playing sports",
  },
  {
    num: "04",
    title: "Smart Classrooms",
    desc: "Technology-enabled classrooms with interactive smart boards, projectors, and digital learning tools that make lessons engaging and effective.",
    imageKey: "features-smart-class",
    alt: "Smart classroom with interactive board",
  },
  {
    num: "05",
    title: "Library & Reading Room",
    desc: "A well-stocked library with over 5,000 books, reference materials, newspapers, and magazines to cultivate a strong reading habit.",
    imageKey: "features-library",
    alt: "School library interior",
  },
  {
    num: "06",
    title: "Safe Transport",
    desc: "Safe and reliable bus service covering major routes across Tirupati with GPS tracking, female attendants, and trained drivers.",
    imageKey: "features-transport",
    alt: "School bus",
  },
];

export default function FeaturesGrid({ images }: FeaturesGridProps) {
  const tiltRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleTiltMove = (index: number) => (e: React.MouseEvent) => {
    const el = tiltRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
    el.style.boxShadow = "0 25px 50px rgba(118,33,35,0.15)";
  };

  const handleTiltLeave = (index: number) => () => {
    const el = tiltRefs.current[index];
    if (el) {
      el.style.transform = "";
      el.style.boxShadow = "";
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-[0.2em] uppercase">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-dark mt-3">
            Everything Your Child Needs
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-4 text-base sm:text-lg">
            From modern infrastructure to nurturing environment, we provide the complete ecosystem
            for academic and personal growth.
          </p>
        </motion.div>

        <div className="space-y-20">
          {features.map((feat, i) => {
            const imgSrc = feat.localImage || images.find((img) => img.section === feat.imageKey)?.url;
            return (
              <motion.div
                key={feat.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8 lg:gap-16`}
              >
                <div
                  ref={(el) => { tiltRefs.current[i] = el; }}
                  onMouseMove={handleTiltMove(i)}
                  onMouseLeave={handleTiltLeave(i)}
                  className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg shrink-0 transition-transform duration-300 tilt-3d"
                  style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                >
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={feat.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-dark/30 to-transparent" />
                  <span className="absolute top-4 left-4 text-[64px] sm:text-[80px] font-bold text-white/10 leading-none pointer-events-none select-none">
                    {feat.num}
                  </span>
                  <span className="absolute bottom-4 left-4 bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {feat.num}
                  </span>
                </div>

                <div className="w-full lg:w-1/2">
                  <span className="text-gold text-sm font-bold">{feat.num}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-dark mt-2 mb-4">{feat.title}</h3>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{feat.desc}</p>
                  <div className="w-12 h-0.5 bg-primary mt-6" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
