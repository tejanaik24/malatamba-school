"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ImageData } from "@/lib/images";

interface VideoSectionProps {
  images: ImageData[];
}

export default function VideoSection({ images }: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);
  const thumb = images.find((img) => img.section === "video-thumbnail");

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-dark to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05),transparent_50%)]" />

      {/* moving gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-semibold text-sm tracking-[0.2em] uppercase">
            Take a Tour
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
            See Malatamba in Action
          </h2>
          <p className="text-white/60 max-w-lg mx-auto text-base sm:text-lg mb-10">
            Watch our campus tour to experience the vibrant learning environment we have created for
            your children.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-dark/50 cursor-pointer group mx-auto max-w-3xl"
          onClick={() => setPlaying(true)}
        >
          {!playing ? (
            <>
              {thumb && (
                <Image
                  src={thumb.url}
                  alt="School campus tour video thumbnail"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(201,168,76,0.7)",
                      "0 0 0 20px rgba(201,168,76,0)",
                      "0 0 0 0 rgba(201,168,76,0)",
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold flex items-center justify-center"
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-left">
                <p className="text-white font-semibold text-base sm:text-lg">
                  Campus Tour & Overview
                </p>
                <p className="text-white/50 text-sm">2:34 min</p>
              </div>
            </>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="School campus tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
