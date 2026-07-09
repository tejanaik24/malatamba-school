import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactClient from "./ContactClient";

const PAGE_URL = "https://www.malatambavidyaniketan.ac.in/contact";
const PAGE_TITLE = "Contact Us";
const PAGE_DESC =
  "Contact Malatamba Vidyaniketan — address at Sadguru Towers, Malatamba Road, PM Palem, Visakhapatnam. Phone: 8985674670.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${PAGE_TITLE} | Malatamba Vidyaniketan`,
    description: PAGE_DESC,
    url: PAGE_URL,
    siteName: "Malatamba Vidyaniketan",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/real-photos/logo/logo-footer.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | Malatamba Vidyaniketan`,
    description: PAGE_DESC,
    images: ["/real-photos/logo/logo-footer.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactClient />
      <Footer />
    </>
  );
}
