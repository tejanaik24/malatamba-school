"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ImageData } from "@/lib/images";

interface GalleryPreviewProps {
  images: ImageData[];
}

const galleryImages = [
  {
    key: "gallery-students",
    label: "Students in Classroom",
    wide: false,
    tall: true,
  },
  {
    key: "gallery-annual-day",
    label: "Annual Day Celebration",
    wide: false,
    tall: false,
  },
  {
    key: "gallery-science-fair",
    label: "Science Fair Exhibition",
    wide: false,
    tall: false,
  },
  {
    key: "about-principal",
    label: "Library Session",
    wide: true,
    tall: false,
  },
  {
    key: "about-assembly",
    label: "Morning Assembly",
    wide: true,
    tall: false,
  },
];

export default function GalleryPreview({ images }: GalleryPreviewProps) {
  return (
    <section className="py-20 sm:py-28 bg-light" id="gallery">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-[0.2em] uppercase">
            Our Gallery
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-dark mt-3">
            Moments at Malatamba
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-4 text-base sm:text-lg">
            A glimpse into the vibrant life and activities at our school.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((item, i) => {
            const imgObj = images.find((img) => img.section === item.key);
            const isFirst = i === 0;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                  isFirst ? "row-span-2 col-span-2 md:col-span-1 md:row-span-2" : ""
                } ${item.wide ? "col-span-2" : "col-span-1"}`}
                style={{
                  height: isFirst ? "400px" : item.wide ? "180px" : "180px",
                }}
              >
                {imgObj && (
                  <Image
                    src={imgObj.url}
                    alt={item.label}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
                  />
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 text-center">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
