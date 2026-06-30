"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    if (!isTouchDevice) {
      const cursor = document.createElement("div");
      cursor.className = "custom-cursor";
      document.body.appendChild(cursor);

      const ring = document.createElement("div");
      ring.className = "cursor-ring";
      document.body.appendChild(ring);

      let mouseX = 0, mouseY = 0;
      let ringX = 0, ringY = 0;

      const moveCursor = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
      };

      const animateRing = () => {
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";
        requestAnimationFrame(animateRing);
      };
      requestAnimationFrame(animateRing);

      const addHover = () => { cursor.classList.add("hovering"); ring.classList.add("hovering"); };
      const removeHover = () => { cursor.classList.remove("hovering"); ring.classList.remove("hovering"); };

      const interactives = document.querySelectorAll("a, button, [role='button'], input, select, textarea");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });

      window.addEventListener("mousemove", moveCursor);
      html.classList.add("custom-cursor-active");

      const bar = document.createElement("div");
      bar.className = "scroll-progress";
      document.body.prepend(bar);

      const updateProgress = () => {
        const scrolled = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (scrolled / max) * 100 + "%";
      };

      window.addEventListener("scroll", updateProgress, { passive: true });

      return () => {
        cursor.remove();
        ring.remove();
        bar.remove();
        html.classList.remove("custom-cursor-active");
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("scroll", updateProgress);
        interactives.forEach((el) => {
          el.removeEventListener("mouseenter", addHover);
          el.removeEventListener("mouseleave", removeHover);
        });
      };
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
