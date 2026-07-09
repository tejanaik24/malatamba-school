"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CLASSES = [
  "Nursery",
  "LKG",
  "UKG",
  "Class I",
  "Class II",
  "Class III",
  "Class IV",
  "Class V",
  "Class VI",
  "Class VII",
  "Class VIII",
  "Class IX",
  "Class X",
];

const AUTO_OPEN_DELAY_MS = 5000;
const SESSION_FLAG = "enquiryPopupShown";

type EnquiryPopupContextValue = {
  open: () => void;
};

const EnquiryPopupContext = createContext<EnquiryPopupContextValue | null>(null);

export function useEnquiryPopup() {
  const ctx = useContext(EnquiryPopupContext);
  if (!ctx) throw new Error("useEnquiryPopup must be used within EnquiryPopupProvider");
  return ctx;
}

type FormState = {
  studentName: string;
  className: string;
  parentName: string;
  phone: string;
  email: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  studentName: "",
  className: "",
  parentName: "",
  phone: "",
  email: "",
  message: "",
};

export function EnquiryPopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const markShown = () => {
    try {
      sessionStorage.setItem(SESSION_FLAG, "1");
    } catch {
      // sessionStorage unavailable (e.g. private mode) — ignore
    }
  };

  const open = useCallback(() => {
    setIsOpen(true);
    markShown();
  }, []);

  const close = () => {
    setIsOpen(false);
    setSent(false);
  };

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_FLAG) === "1";
    } catch {
      // ignore
    }
    if (alreadyShown) return;

    autoTimer.current = setTimeout(() => {
      setIsOpen(true);
      markShown();
    }, AUTO_OPEN_DELAY_MS);

    return () => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
    };
  }, []);

  const handleSubmit = () => {
    const e: Record<string, string> = {};
    if (!form.studentName.trim()) e.studentName = "Required";
    if (!form.className) e.className = "Required";
    if (!form.parentName.trim()) e.parentName = "Required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit number";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});

    const msg = [
      `🏫 *Admission Enquiry — Malatamba Vidyaniketan*`,
      ``,
      `🧒 *Student:* ${form.studentName}`,
      `📚 *Class:* ${form.className}`,
      `👤 *Parent:* ${form.parentName}`,
      `📞 *Phone:* ${form.phone}`,
      form.email ? `✉️ *Email:* ${form.email}` : "",
      form.message ? `💬 *Note:* ${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/918374355556?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => {
      close();
      setForm(EMPTY_FORM);
    }, 2000);
  };

  return (
    <EnquiryPopupContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Admission Enquiry"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-7 border border-gray-100"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-dark hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {sent ? (
                <div className="py-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark">Enquiry Sent!</h3>
                  <p className="text-sm text-gray-500 mt-1">We&apos;ll reach out to you on WhatsApp shortly.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-primary mb-1">Admission Enquiry</h3>
                  <p className="text-sm text-gray-500 mb-5">for 2026&ndash;27 &mdash; Malatamba Vidyaniketan</p>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-dark mb-1">
                        Name of the Student <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.studentName}
                        onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                        placeholder="e.g. Priya Reddy"
                        className={`w-full px-4 py-3 rounded-xl border text-dark bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-primary/25 focus:border-primary ${
                          errors.studentName ? "border-red-400 bg-red-50" : "border-gray-200"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-dark mb-1">
                        Admission Sought in Class <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.className}
                        onChange={(e) => setForm({ ...form, className: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-dark bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-primary/25 focus:border-primary ${
                          errors.className ? "border-red-400 bg-red-50" : "border-gray-200"
                        }`}
                      >
                        <option value="">Select class</option>
                        {CLASSES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-dark mb-1">
                        Parent Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.parentName}
                        onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                        placeholder="e.g. Ramesh Reddy"
                        className={`w-full px-4 py-3 rounded-xl border text-dark bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-primary/25 focus:border-primary ${
                          errors.parentName ? "border-red-400 bg-red-50" : "border-gray-200"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-dark mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className={`w-full px-4 py-3 rounded-xl border text-dark bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-primary/25 focus:border-primary ${
                          errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-dark mb-1">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-primary/25 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-dark mb-1">Message for Us</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Any questions or special requirements..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-primary/25 focus:border-primary resize-none"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-all hover:shadow-lg"
                    >
                      Submit Enquiry
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </EnquiryPopupContext.Provider>
  );
}
