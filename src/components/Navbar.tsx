"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEnquiryPopup } from "@/components/EnquiryPopup";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Academics",
    href: "/academics",
    dropdown: [
      { label: "Curriculum & Subjects", href: "/academics" },
      { label: "Faculty", href: "/faculty" },
      { label: "Rules & Regulations", href: "/rules" },
    ],
  },
  {
    label: "Infrastructure",
    href: "/infrastructure",
    dropdown: [
      { label: "Classrooms", href: "/infrastructure#classrooms" },
      { label: "Science & Computer Labs", href: "/infrastructure#labs" },
      { label: "Library", href: "/infrastructure#library" },
      { label: "Sports", href: "/infrastructure#sports" },
      { label: "Transport", href: "/infrastructure#transport" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { open: openEnquiryPopup } = useEnquiryPopup();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setOpenDropdown(null); }, [pathname]);

  const isHome = pathname === "/";

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-primary/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/real-photos/logo/logo-main.png"
              alt="Malatamba Vidyaniketan logo"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-lg sm:text-xl leading-tight tracking-tight">
                Malatamba
              </span>
              <span className="text-gold text-xs sm:text-sm leading-tight">Vidyaniketan</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1 ${
                      isActive
                        ? "text-gold"
                        : "text-white/90 hover:text-gold"
                    }`}
                  >
                    {link.label}
                    {link.dropdown && (
                      <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  {link.dropdown && openDropdown === link.label && (
                    // Flush wrapper + pt-1 bridge (instead of mt-1 gap) keeps the hover
                    // hit-area contiguous with the trigger so the mouse never crosses a
                    // dead zone that would fire onMouseLeave before a link can be clicked.
                    <div className="absolute top-full left-0 w-52 pt-1">
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="bg-white rounded-xl shadow-2xl py-2 border border-gray-100"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-dark hover:bg-crimson-50 hover:text-primary transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </div>
              );
            })}
            <button
              onClick={openEnquiryPopup}
              className="ml-3 px-5 py-2 bg-gold text-dark font-bold text-sm rounded-full hover:opacity-90 transition-all hover:shadow-md"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <button
                    onClick={() =>
                      link.dropdown
                        ? setOpenDropdown(openDropdown === link.label ? null : link.label)
                        : setMobileOpen(false)
                    }
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-white/90 hover:text-gold transition-colors rounded-md"
                  >
                    <Link href={link.href} onClick={() => setMobileOpen(false)} className="flex-1 text-left">
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <svg
                        className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  {link.dropdown && openDropdown === link.label && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gold/30 pl-3">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-white/70 hover:text-gold transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openEnquiryPopup();
                  }}
                  className="block w-full text-center px-5 py-3 bg-gold text-dark font-bold text-sm rounded-full"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
