import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          {/* Big 404 */}
          <div className="relative mb-6">
            <span
              className="block text-[140px] sm:text-[180px] font-bold leading-none select-none"
              style={{ color: "rgba(118,33,35,0.2)" }}
            >
              404
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl font-bold text-white">
              Page Not Found
            </span>
          </div>

          <p className="text-white/60 text-base sm:text-lg mb-3">
            Looks like this page took the wrong turn.
          </p>
          <p className="text-white/40 text-sm mb-10">
            Don&apos;t worry — everything you need is just a click away.
          </p>

          {/* Quick nav */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { href: "/", label: "Home" },
              { href: "/admissions", label: "Admissions" },
              { href: "/gallery", label: "Gallery" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 text-sm font-medium hover:border-gold hover:text-gold transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-bold text-sm rounded-full hover:bg-primary/90 transition-all"
          >
            ← Back to Home
          </Link>

          {/* Subtle school name */}
          <p className="mt-12 text-white/20 text-xs tracking-widest uppercase">
            Malatamba Vidyaniketan · Visakhapatnam
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
