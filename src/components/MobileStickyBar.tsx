"use client";

import { useState, useEffect } from "react";
import { useEnquiryPopup } from "@/components/EnquiryPopup";

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);
  const { open: openEnquiryPopup } = useEnquiryPopup();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 shadow-2xl" style={{ borderTop: "1px solid rgba(118,33,35,0.12)" }}>
        <a
          href="tel:08374355556"
          className="flex items-center justify-center gap-2 py-4 bg-white text-primary font-bold text-sm active:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </a>
        <button
          onClick={openEnquiryPopup}
          className="flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold text-sm active:bg-primary/90 transition-colors"
        >
          Enquire Now
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
