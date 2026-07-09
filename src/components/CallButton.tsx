"use client";

export default function CallButton() {
  return (
    <a
      href="tel:08374355556"
      aria-label="Call Malatamba Vidyaniketan"
      className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 bg-primary"
    >
      <svg className="w-6 h-6 fill-white" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-.826 1.68l-1.293.646a11.05 11.05 0 006.052 6.052l.646-1.293a1.5 1.5 0 011.68-.826l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
        />
      </svg>
    </a>
  );
}
