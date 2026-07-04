"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    name: "Priya Sharma",
    text: "Excellent school with dedicated teachers. My son has grown so much in confidence and academics since joining Malatamba Vidyaniketan. The holistic approach to education is truly commendable.",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    text: "The smart classrooms and lab facilities are outstanding. My daughter loves the science experiments and has developed a genuine interest in learning. Very happy with the school.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    text: "Best decision we made for our children. The disciplined environment combined with caring teachers creates the perfect atmosphere for growth. Highly recommend to all parents.",
    rating: 5,
  },
  {
    name: "Suresh Reddy",
    text: "Great infrastructure and dedicated staff. The transportation service is very reliable and safe. Our daughter feels happy and secure at school every day.",
    rating: 4,
  },
];

export default function GoogleReviews() {
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % reviews.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 sm:py-28" style={{ backgroundColor: "#0a0a0a" }} id="reviews">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold text-sm tracking-[0.2em] uppercase">
            Parent Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
            What Parents Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white/60 text-sm">4.9 — Google Reviews</span>
          </div>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reviews.map((rev, i) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, rotateX: 10, y: 40 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="relative rounded-2xl p-8 border-t-[3px] border-gold"
              style={{ backgroundColor: "#111" }}
            >
              <span className="absolute top-3 right-5 text-6xl leading-none text-gold/15 select-none font-serif">
                &ldquo;
              </span>
              <div className="flex mb-3">
                {Array.from({ length: rev.rating }).map((_, s) => (
                  <svg key={s} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">&ldquo;{rev.text}&rdquo;</p>
              <p className="text-white font-semibold text-sm mt-4">{rev.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden max-w-sm mx-auto">
          <div className="relative h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-2xl p-8 border-t-[3px] border-gold"
                style={{ backgroundColor: "#111" }}
              >
                <span className="absolute top-3 right-5 text-6xl leading-none text-gold/15 select-none font-serif">
                  &ldquo;
                </span>
                <div className="flex mb-3">
                  {Array.from({ length: reviews[mobileIndex].rating }).map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  &ldquo;{reviews[mobileIndex].text}&rdquo;
                </p>
                <p className="text-white font-semibold text-sm mt-4">{reviews[mobileIndex].name}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex gap-2 justify-center mt-4">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === mobileIndex ? "bg-gold w-6" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <span className="text-white/40 text-sm">
            Based on parent reviews and feedback collected during parent-teacher meetings
          </span>
        </motion.p>
      </div>
    </section>
  );
}
