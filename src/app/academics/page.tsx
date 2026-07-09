import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AcademicsClient from "./AcademicsClient";

const PAGE_URL = "https://www.malatambavidyaniketan.ac.in/academics";
const PAGE_TITLE = "Academics";
const PAGE_DESC =
  "Malatamba Vidyaniketan's academic curriculum — Nursery to Class X, subjects, teaching methodology, and approach to holistic learning.";

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

export default function AcademicsPage() {
  return (
    <>
      <Navbar />
      <AcademicsClient />
      <Footer />
    </>
  );
}
