"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ITEMS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "Sadguru Towers, Malatamba Road, PM Palem, Visakhapatnam – 530041, Andhra Pradesh",
    href: "https://maps.google.com/?q=Sadguru+Towers+Malatamba+Road+PM+Palem+Visakhapatnam",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "083743 55556",
    href: "tel:08374355556",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Alternate",
    value: "8985674670",
    href: "tel:8985674670",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "info@malatambavidyaniketan.edu.in",
    href: "mailto:info@malatambavidyaniketan.edu.in",
  },
];

export default function ContactClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ch-child", {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power2.out", delay: 0.1,
      });
      gsap.from(".contact-card", {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.55, ease: "power2.out",
        scrollTrigger: { trigger: ".contact-card", start: "top 80%", toggleActions: "play none none reverse" },
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `📩 *Message from ${form.name}*`,
      `📞 ${form.phone}`,
      `💬 ${form.message}`,
    ].join("\n");
    window.open(`https://wa.me/918374355556?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const inp = "w-full px-4 py-3 rounded-xl border border-gray-200 text-dark bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary";

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.12),transparent_55%)]" />
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="ch-child inline-block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            We&apos;re Here for You
          </span>
          <h1 className="ch-child text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Get in Touch
          </h1>
          <p className="ch-child text-white/70 text-base sm:text-lg max-w-xl mx-auto">
            Have a question about admissions, curriculum, or school life? Our team is always happy to help.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">

        {/* Contact info */}
        <div>
          <h2 className="text-2xl font-bold text-dark mb-8">Find Us</h2>

          <div className="space-y-5 mb-10">
            {CONTACT_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-card flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</p>
                  <p className="text-dark text-sm font-medium leading-relaxed">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Office hours */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h3 className="font-bold text-dark text-sm mb-3">Office Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Monday – Friday</span>
                <span className="font-semibold text-dark">8:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sunday / Holidays</span>
                <span className="text-gray-400">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick contact form */}
        <div>
          <h2 className="text-2xl font-bold text-dark mb-8">Send a Message</h2>

          {submitted ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-green-100">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-dark text-lg mb-2">Message Sent!</h3>
              <p className="text-gray-500 text-sm mb-5">We&apos;ll get back to you on WhatsApp shortly.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", message: "" }); }}
                className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-all"
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Your Name</label>
                  <input type="text" required placeholder="e.g. Ramesh Reddy" className={inp}
                    value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Phone Number</label>
                  <input type="tel" required placeholder="Your WhatsApp number" className={inp}
                    value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Message</label>
                  <textarea required rows={4} placeholder="How can we help you?" className={`${inp} resize-none`}
                    value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 32 32">
                    <path d="M16.003 0C7.169 0 .003 7.165.003 15.999c0 2.821.738 5.47 2.028 7.772L0 32l8.447-2.006A15.94 15.94 0 0016.003 32C24.837 32 32 24.835 32 16S24.837 0 16.003 0zm7.293 19.34c-.4-.2-2.366-1.167-2.733-1.3-.366-.133-.633-.2-.9.2-.266.4-1.033 1.3-1.266 1.567-.234.266-.467.3-.867.1-.4-.2-1.688-.622-3.216-1.982-1.188-1.06-1.99-2.368-2.222-2.768-.234-.4-.025-.616.175-.815.18-.18.4-.467.6-.7.2-.233.266-.4.4-.666.133-.267.066-.5-.034-.7-.1-.2-.9-2.167-1.232-2.966-.325-.779-.657-.673-.9-.685l-.766-.013c-.267 0-.7.1-1.067.5-.366.4-1.4 1.367-1.4 3.333 0 1.966 1.433 3.867 1.633 4.133.2.267 2.82 4.3 6.831 6.032.954.413 1.699.66 2.28.845.958.305 1.83.262 2.519.16.768-.115 2.366-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.166-.366-.266-.766-.466z" />
                  </svg>
                  Send via WhatsApp
                </button>
              </form>
            </div>
          )}

          {/* Map embed */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.123456789!2d83.3120!3d17.7270!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMalatamba+Vidyaniketan!5e0!3m2!1sen!2sin!4v1699900000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Malatamba Vidyaniketan location map"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
