import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  school: [
    { label: "About Us", href: "/about" },
    { label: "Chairman's Message", href: "/about#chairman" },
    { label: "Faculty", href: "/faculty" },
    { label: "Academics", href: "/academics" },
  ],
  explore: [
    { label: "Infrastructure", href: "/infrastructure" },
    { label: "Gallery", href: "/gallery" },
    { label: "Rules & Regulations", href: "/rules" },
    { label: "Admissions", href: "/admissions" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/real-photos/logo/logo-footer.png"
                alt="Malatamba Vidyaniketan logo"
                width={52}
                height={52}
                className="rounded-full"
              />
              <div>
                <h3 className="text-white font-bold text-lg">Malatamba</h3>
                <p className="text-gold text-sm">Vidyaniketan</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing quality education with modern infrastructure and experienced
              faculty since 2002. Nurturing young minds for a brighter tomorrow.
            </p>
          </div>

          {/* School links */}
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-6">School</h4>
            <ul className="space-y-3">
              {footerLinks.school.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore links */}
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-6">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:principalmalatambaschools@gmail.com" className="hover:text-gold transition-colors break-all">
                  principalmalatambaschools@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <a href="tel:08374355556" className="block hover:text-gold transition-colors">083743 55556</a>
                  <a href="tel:8985674670" className="block hover:text-gold transition-colors">8985674670</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Sadguru Towers, Malatamba Road,<br />P.M.Palem, Visakhapatnam‑530041</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Malatamba Vidyaniketan. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/admissions" className="hover:text-gold transition-colors">Admissions</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
            <span>·</span>
            <Link href="/rules" className="hover:text-gold transition-colors">School Rules</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
