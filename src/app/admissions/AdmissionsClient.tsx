"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ────────────────────────────────────────────────────────────────── */

const CLASS_GROUPS = [
  {
    label: "Pre-Primary",
    sub: "Ages 3 – 5",
    icon: "🧸",
    classes: ["Nursery", "LKG", "UKG"],
  },
  {
    label: "Primary",
    sub: "Ages 6 – 10",
    icon: "📒",
    classes: ["Class I", "Class II", "Class III", "Class IV", "Class V"],
  },
  {
    label: "Upper Primary",
    sub: "Ages 11 – 13",
    icon: "🔭",
    classes: ["Class VI", "Class VII", "Class VIII"],
  },
  {
    label: "Secondary",
    sub: "Ages 14 – 15",
    icon: "🎓",
    classes: ["Class IX", "Class X"],
  },
];


/* ─── Step indicator ─────────────────────────────────────────────────────── */

function StepBar({ step }: { step: number }) {
  const steps = ["Choose Class", "Your Details", "Confirm"];
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  done
                    ? "bg-green-500 text-white"
                    : active
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {done ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-[10px] mt-1.5 font-semibold text-center whitespace-nowrap ${
                  active ? "text-primary" : done ? "text-green-600" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1.5 mb-4 transition-all duration-500 ${done ? "bg-green-400" : "bg-gray-100"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Step 1: Choose Class ───────────────────────────────────────────────── */

function Step1({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (cls: string) => void;
}) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-xl font-bold text-dark mb-1">Which class are you enquiring for?</h2>
      <p className="text-gray-400 text-sm mb-6">Tap your child&apos;s level to expand and select</p>

      <div className="space-y-3">
        {CLASS_GROUPS.map((grp) => {
          const isOpen = expandedGroup === grp.label;
          const groupHasSelected = grp.classes.includes(selected);
          return (
            <div
              key={grp.label}
              className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                groupHasSelected
                  ? "border-primary"
                  : isOpen
                  ? "border-gray-200 shadow-md"
                  : "border-gray-100"
              }`}
            >
              <button
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedGroup(isOpen ? null : grp.label)}
              >
                <span className="text-2xl">{grp.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-dark text-sm">{grp.label}</p>
                  <p className="text-gray-400 text-xs">{grp.sub}</p>
                </div>
                {groupHasSelected && (
                  <span className="text-xs font-semibold text-primary bg-primary/8 px-2.5 py-1 rounded-full">
                    {selected}
                  </span>
                )}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {grp.classes.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => { onSelect(cls); setExpandedGroup(null); }}
                      className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        selected === cls
                          ? "bg-primary text-white shadow-md shadow-primary/25"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 2: Details form ───────────────────────────────────────────────── */

interface FormData {
  parentName: string;
  phone: string;
  childName: string;
  message: string;
}

function Step2({
  form,
  errors,
  onChange,
}: {
  form: FormData;
  errors: Record<string, string>;
  onChange: (key: keyof FormData, val: string) => void;
}) {
  const inp = (key: keyof FormData, hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-dark bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-primary/25 focus:border-primary ${
      hasError ? "border-red-400 bg-red-50" : "border-gray-200"
    }`;

  return (
    <div>
      <h2 className="text-xl font-bold text-dark mb-1">Tell us about your family</h2>
      <p className="text-gray-400 text-sm mb-6">Takes under 60 seconds — no login required</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            Parent / Guardian Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Ramesh Reddy"
            className={inp("parentName", !!errors.parentName)}
            value={form.parentName}
            onChange={(e) => onChange("parentName", e.target.value)}
          />
          {errors.parentName && <p className="text-red-400 text-xs mt-1">{errors.parentName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            WhatsApp Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="10-digit mobile number"
            className={inp("phone", !!errors.phone)}
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            Child&apos;s Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Priya Reddy"
            className={inp("childName", !!errors.childName)}
            value={form.childName}
            onChange={(e) => onChange("childName", e.target.value)}
          />
          {errors.childName && <p className="text-red-400 text-xs mt-1">{errors.childName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            Message <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Any questions or special requirements..."
            className={`${inp("message", false)} resize-none`}
            value={form.message}
            onChange={(e) => onChange("message", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Confirmation ───────────────────────────────────────────────── */

function Step3({
  classSelected,
  form,
  onSubmit,
}: {
  classSelected: string;
  form: FormData;
  onSubmit: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-dark mb-1">Review & Send</h2>
      <p className="text-gray-400 text-sm mb-6">Your enquiry goes directly to WhatsApp — our team replies within a few hours</p>

      <div className="rounded-2xl bg-gray-50 border border-gray-100 divide-y divide-gray-100 mb-6 overflow-hidden">
        {[
          { label: "Class Interested", value: classSelected },
          { label: "Parent Name", value: form.parentName },
          { label: "WhatsApp", value: form.phone },
          { label: "Child's Name", value: form.childName },
          ...(form.message ? [{ label: "Message", value: form.message }] : []),
        ].map(({ label, value }) => (
          <div key={label} className="flex gap-4 px-5 py-3">
            <span className="text-gray-400 text-xs font-semibold w-28 shrink-0 pt-0.5">{label}</span>
            <span className="text-dark text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onSubmit}
        className="w-full py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg"
        style={{ backgroundColor: "#25D366", boxShadow: "0 8px 24px rgba(37,211,102,0.25)" }}
      >
        <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 32 32">
          <path d="M16.003 0C7.169 0 .003 7.165.003 15.999c0 2.821.738 5.47 2.028 7.772L0 32l8.447-2.006A15.94 15.94 0 0016.003 32C24.837 32 32 24.835 32 16S24.837 0 16.003 0zm7.293 19.34c-.4-.2-2.366-1.167-2.733-1.3-.366-.133-.633-.2-.9.2-.266.4-1.033 1.3-1.266 1.567-.234.266-.467.3-.867.1-.4-.2-1.688-.622-3.216-1.982-1.188-1.06-1.99-2.368-2.222-2.768-.234-.4-.025-.616.175-.815.18-.18.4-.467.6-.7.2-.233.266-.4.4-.666.133-.267.066-.5-.034-.7-.1-.2-.9-2.167-1.232-2.966-.325-.779-.657-.673-.9-.685l-.766-.013c-.267 0-.7.1-1.067.5-.366.4-1.4 1.367-1.4 3.333 0 1.966 1.433 3.867 1.633 4.133.2.267 2.82 4.3 6.831 6.032.954.413 1.699.66 2.28.845.958.305 1.83.262 2.519.16.768-.115 2.366-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.166-.366-.266-.766-.466z" />
        </svg>
        Send Enquiry via WhatsApp
      </button>

      <p className="text-center text-gray-400 text-xs mt-3">
        Opens WhatsApp with your details pre-filled
      </p>
    </div>
  );
}

/* ─── Success screen ─────────────────────────────────────────────────────── */

function SuccessScreen({ parentName, childName, onReset }: {
  parentName: string; childName: string; onReset: () => void;
}) {
  return (
    <div className="text-center py-4">
      <div
        className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
      >
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-dark mb-2">Enquiry Sent!</h3>
      <p className="text-gray-500 text-sm mb-1">
        Thank you, <strong className="text-dark">{parentName}</strong>!
      </p>
      <p className="text-gray-500 text-sm mb-8">
        We&apos;ll contact you about <strong className="text-dark">{childName}&apos;s</strong> admission within a few hours on WhatsApp.
      </p>
      <div className="bg-primary/5 rounded-2xl p-5 mb-6 text-left border border-primary/10">
        <p className="text-xs font-bold text-primary uppercase tracking-wide mb-3">What happens next?</p>
        <div className="space-y-2.5">
          {[
            "Our team contacts you on WhatsApp",
            "We schedule a campus visit at your convenience",
            "Meet the team, tour the school",
            "Complete admission formalities",
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-gray-600 text-xs">{s}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onReset}
        className="text-primary font-semibold text-sm underline hover:no-underline"
      >
        Submit another enquiry
      </button>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export default function AdmissionsClient() {
  const [step, setStep] = useState(0);
  const [classSelected, setClassSelected] = useState("");
  const [form, setForm] = useState<FormData>({
    parentName: "", phone: "", childName: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power2.out", delay: 0.1 });
      gsap.from(cardRef.current, {
        opacity: 0, y: 40, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
    return () => ctx.revert();
  }, []);

  const animateStep = () => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
    );
  };

  const goNext = () => {
    if (step === 0) {
      if (!classSelected) return;
      setStep(1);
      animateStep();
      return;
    }
    if (step === 1) {
      const e: Record<string, string> = {};
      if (!form.parentName.trim()) e.parentName = "Required";
      if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
        e.phone = "Enter a valid 10-digit number";
      if (!form.childName.trim()) e.childName = "Required";
      if (Object.keys(e).length) { setErrors(e); return; }
      setErrors({});
      setStep(2);
      animateStep();
    }
  };

  const goBack = () => {
    setStep((s) => Math.max(0, s - 1));
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  const handleSubmit = () => {
    const msg = [
      `🏫 *Admission Enquiry — Malatamba Vidyaniketan*`,
      ``,
      `📚 *Class:* ${classSelected}`,
      `👤 *Parent:* ${form.parentName}`,
      `📞 *WhatsApp:* ${form.phone}`,
      `🧒 *Child:* ${form.childName}`,
      form.message ? `💬 *Note:* ${form.message}` : "",
    ].filter(Boolean).join("\n");

    window.open(
      `https://wa.me/918374355556?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setDone(true);
  };

  const reset = () => {
    setStep(0);
    setClassSelected("");
    setForm({ parentName: "", phone: "", childName: "", message: "" });
    setErrors({});
    setDone(false);
  };

  const WHY = [
    { icon: "🎓", label: "20+ Years", sub: "Of excellence since 2002" },
    { icon: "👩‍🏫", label: "50+ Faculty", sub: "Dedicated teachers" },
    { icon: "🏫", label: "1000+ Students", sub: "Thriving community" },
    { icon: "🚌", label: "Safe Transport", sub: "school buses" },
  ];

  return (
    <main className="min-h-screen bg-light">

      {/* Hero */}
      <div className="relative bg-primary overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.15),transparent_60%)]" />
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Academic Year 2025–26 — Seats Limited
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-6">
            Admissions Now Open
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Nursery to Class X · APSCERT Board · AP Government Recognized
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {WHY.map((w) => (
              <div key={w.label} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm text-white">
                <span>{w.icon}</span>
                <span className="font-semibold">{w.label}</span>
                <span className="text-white/50 hidden sm:inline">— {w.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_460px] gap-12 items-start">

        {/* Left: trust content */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-8">Why Malatamba?</h2>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              { icon: "✅", text: "20+ years of academic excellence" },
              { icon: "✅", text: "AP Government recognized school" },
              { icon: "✅", text: "APSCERT Board curriculum" },
              { icon: "✅", text: "Experienced, caring faculty" },
              { icon: "✅", text: "Smart classrooms & science labs" },
              { icon: "✅", text: "Safe school bus transport" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-2.5">
                <span className="shrink-0 mt-0.5">{item.icon}</span>
                <span className="text-gray-700 text-sm leading-snug">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Process steps */}
          <h3 className="text-lg font-bold text-dark mb-5">Simple Admission Process</h3>
          <ol className="space-y-5">
            {[
              { title: "Submit Enquiry", desc: "Fill the 3-step form — under 2 minutes." },
              { title: "WhatsApp Response", desc: "Our team contacts you within a few hours." },
              { title: "School Visit", desc: "Tour the campus and meet our team." },
              { title: "Confirm Admission", desc: "Complete paperwork and fee payment." },
            ].map((s, i) => (
              <li key={s.title} className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-dark text-sm">{s.title}</p>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Direct call */}
          <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-sm font-bold text-dark mb-3">Prefer to call?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              {["08374355556", "8985674670"].map((num) => (
                <a
                  key={num}
                  href={`tel:${num}`}
                  className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {num}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: wizard card */}
        <div className="lg:sticky lg:top-24" ref={cardRef}>
          <div className="bg-white rounded-3xl shadow-2xl p-7 border border-gray-100">

            {done ? (
              <SuccessScreen
                parentName={form.parentName}
                childName={form.childName}
                onReset={reset}
              />
            ) : (
              <>
                <StepBar step={step} />

                {step === 0 && (
                  <Step1 selected={classSelected} onSelect={setClassSelected} />
                )}
                {step === 1 && (
                  <Step2 form={form} errors={errors} onChange={(k, v) => {
                    setForm((f) => ({ ...f, [k]: v }));
                    if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; });
                  }} />
                )}
                {step === 2 && (
                  <Step3 classSelected={classSelected} form={form} onSubmit={handleSubmit} />
                )}

                {/* Navigation */}
                {!done && (
                  <div className={`flex gap-3 mt-6 ${step > 0 ? "justify-between" : "justify-end"}`}>
                    {step > 0 && (
                      <button
                        onClick={goBack}
                        className="px-5 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition-colors"
                      >
                        ← Back
                      </button>
                    )}
                    {step < 2 && (
                      <button
                        onClick={goNext}
                        disabled={step === 0 && !classSelected}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all ${
                          step === 0 && !classSelected
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 active:scale-[0.98]"
                        }`}
                      >
                        {step === 1 ? "Review →" : "Next →"}
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
