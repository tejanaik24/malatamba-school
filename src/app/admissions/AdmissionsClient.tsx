"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const CLASSES = [
  "Nursery / LKG / UKG",
  "Class I", "Class II", "Class III", "Class IV", "Class V",
  "Class VI", "Class VII", "Class VIII", "Class IX", "Class X",
];

const WHY_ITEMS = [
  { icon: "🎓", title: "20+ Years", desc: "Of quality education excellence" },
  { icon: "👩‍🏫", title: "50+ Faculty", desc: "Experienced, dedicated teachers" },
  { icon: "🏫", title: "1000+ Students", desc: "Thriving school community" },
  { icon: "🚌", title: "Safe Transport", desc: "GPS-tracked city-wide routes" },
];

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function AdmissionsClient() {
  const [form, setForm] = useState({
    parentName: "", phone: "", childName: "", classInterested: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power2.out", delay: 0.1 });
      gsap.from(formRef.current, {
        opacity: 0, y: 40, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: formRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
    });
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.parentName.trim()) e.parentName = "Parent name is required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit mobile number";
    if (!form.childName.trim()) e.childName = "Child's name is required";
    if (!form.classInterested) e.classInterested = "Please select a class";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const msg = [
      `🏫 *Admission Enquiry — Malatamba Vidyaniketan*`,
      ``,
      `👤 *Parent Name:* ${form.parentName}`,
      `📞 *Phone:* ${form.phone}`,
      `🧒 *Child's Name:* ${form.childName}`,
      `📚 *Class Interested In:* ${form.classInterested}`,
      form.message ? `💬 *Message:* ${form.message}` : "",
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/918374355556?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => { const n = { ...er }; delete n[key]; return n; });
    },
  });

  const inputCls = (k: string) =>
    `w-full px-4 py-3 rounded-xl border text-dark bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary ${
      errors[k] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <main className="min-h-screen bg-light">
      {/* Hero */}
      <div className="relative bg-primary overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.15),transparent_60%)]" />
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Academic Year 2025–26
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Admissions Now Open
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Give your child the best start. Fill in the form below and our team will contact you on WhatsApp within a few hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {WHY_ITEMS.map((w) => (
              <div key={w.title} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm text-white">
                <span>{w.icon}</span>
                <span className="font-semibold">{w.title}</span>
                <span className="text-white/60 hidden sm:inline">— {w.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_420px] gap-12 items-start">

        {/* Left: why choose us */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6">Why Choose Malatamba?</h2>
          <ul className="space-y-4 mb-10">
            {[
              "Academic excellence backed by 20+ years of experience",
              "Experienced faculty with personalised attention for every child",
              "Modern infrastructure — smart classrooms, science labs, library",
              "Safe, GPS-tracked transport covering all of Visakhapatnam",
              "Holistic development through sports, arts, and cultural events",
              "Affordable fee structure with easy payment options",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          {/* Process steps */}
          <h3 className="text-lg font-bold text-dark mb-5">Simple Admission Process</h3>
          <ol className="space-y-4">
            {[
              { step: "1", title: "Submit Enquiry", desc: "Fill the form — it takes under 2 minutes." },
              { step: "2", title: "WhatsApp Response", desc: "Our team will contact you on WhatsApp within 24 hours." },
              { step: "3", title: "School Visit", desc: "Visit the school, meet the team, and take a campus tour." },
              { step: "4", title: "Confirm Admission", desc: "Complete documentation and fee payment to secure your seat." },
            ].map((s) => (
              <li key={s.step} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {s.step}
                </span>
                <div>
                  <p className="font-semibold text-dark text-sm">{s.title}</p>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Direct call CTA */}
          <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-sm font-semibold text-dark mb-3">Prefer to call directly?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:08374355556" className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                083743 55556
              </a>
              <a href="tel:09299752543" className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                092997 52543
              </a>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div ref={formRef} className="lg:sticky lg:top-24">
          {submitted ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-green-100">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Enquiry Sent!</h3>
              <p className="text-gray-500 text-sm mb-6">
                Your enquiry has been sent to WhatsApp. Our team will respond within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ parentName: "", phone: "", childName: "", classInterested: "", message: "" }); }}
                className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-all"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-dark mb-1">Admission Enquiry</h2>
              <p className="text-gray-500 text-sm mb-6">Fills directly into WhatsApp — no login required.</p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                    Parent / Guardian Name <span className="text-red-400">*</span>
                  </label>
                  <input type="text" placeholder="e.g. Ramesh Reddy" className={inputCls("parentName")} {...field("parentName")} />
                  {errors.parentName && <p className="text-red-400 text-xs mt-1">{errors.parentName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                    WhatsApp / Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input type="tel" placeholder="10-digit mobile number" className={inputCls("phone")} {...field("phone")} />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                    Child&apos;s Name <span className="text-red-400">*</span>
                  </label>
                  <input type="text" placeholder="e.g. Priya Reddy" className={inputCls("childName")} {...field("childName")} />
                  {errors.childName && <p className="text-red-400 text-xs mt-1">{errors.childName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                    Class Interested In <span className="text-red-400">*</span>
                  </label>
                  <select className={inputCls("classInterested")} {...field("classInterested")}>
                    <option value="">Select a class</option>
                    {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.classInterested && <p className="text-red-400 text-xs mt-1">{errors.classInterested}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                    Message <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any specific questions or requirements..."
                    className={`${inputCls("message")} resize-none`}
                    {...field("message")}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 32 32">
                    <path d="M16.003 0C7.169 0 .003 7.165.003 15.999c0 2.821.738 5.47 2.028 7.772L0 32l8.447-2.006A15.94 15.94 0 0016.003 32C24.837 32 32 24.835 32 16S24.837 0 16.003 0zm7.293 19.34c-.4-.2-2.366-1.167-2.733-1.3-.366-.133-.633-.2-.9.2-.266.4-1.033 1.3-1.266 1.567-.234.266-.467.3-.867.1-.4-.2-1.688-.622-3.216-1.982-1.188-1.06-1.99-2.368-2.222-2.768-.234-.4-.025-.616.175-.815.18-.18.4-.467.6-.7.2-.233.266-.4.4-.666.133-.267.066-.5-.034-.7-.1-.2-.9-2.167-1.232-2.966-.325-.779-.657-.673-.9-.685l-.766-.013c-.267 0-.7.1-1.067.5-.366.4-1.4 1.367-1.4 3.333 0 1.966 1.433 3.867 1.633 4.133.2.267 2.82 4.3 6.831 6.032.954.413 1.699.66 2.28.845.958.305 1.83.262 2.519.16.768-.115 2.366-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.166-.366-.266-.766-.466z" />
                  </svg>
                  Send Enquiry via WhatsApp
                </button>

                <p className="text-center text-gray-400 text-xs">
                  Tapping submit opens WhatsApp with your details pre-filled.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
