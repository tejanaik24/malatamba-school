"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918374355556?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20admissions%20at%20Malatamba%20Vidyaniketan"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
      style={{ backgroundColor: "#25D366" }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-7 h-7 fill-white"
      >
        <path d="M16.003 0C7.169 0 .003 7.165.003 15.999c0 2.821.738 5.47 2.028 7.772L0 32l8.447-2.006A15.94 15.94 0 0016.003 32C24.837 32 32 24.835 32 16S24.837 0 16.003 0zm0 29.3a13.25 13.25 0 01-6.742-1.837l-.483-.286-5.013 1.191 1.21-4.882-.316-.5A13.239 13.239 0 012.703 16c0-7.332 5.967-13.3 13.3-13.3 7.332 0 13.297 5.968 13.297 13.3C29.3 23.332 23.335 29.3 16.003 29.3zm7.293-9.96c-.4-.2-2.366-1.167-2.733-1.3-.366-.133-.633-.2-.9.2-.266.4-1.033 1.3-1.266 1.567-.234.266-.467.3-.867.1-.4-.2-1.688-.622-3.216-1.982-1.188-1.06-1.99-2.368-2.222-2.768-.234-.4-.025-.616.175-.815.18-.18.4-.467.6-.7.2-.233.266-.4.4-.666.133-.267.066-.5-.034-.7-.1-.2-.9-2.167-1.232-2.966-.325-.779-.657-.673-.9-.685l-.766-.013c-.267 0-.7.1-1.067.5-.366.4-1.4 1.367-1.4 3.333 0 1.966 1.433 3.867 1.633 4.133.2.267 2.82 4.3 6.831 6.032.954.413 1.699.66 2.28.845.958.305 1.83.262 2.519.16.768-.115 2.366-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.166-.366-.266-.766-.466z" />
      </svg>

      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{ backgroundColor: "#25D366" }}
      />
    </a>
  );
}
