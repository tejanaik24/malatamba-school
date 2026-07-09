import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FacultyClient from "./FacultyClient";

const PAGE_URL = "https://www.malatambavidyaniketan.ac.in/faculty";
const PAGE_TITLE = "Our Faculty";
const PAGE_DESC =
  "Meet the dedicated educators at Malatamba Vidyaniketan — experienced, passionate teachers committed to every student's success.";

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

export default function FacultyPage() {
  return (
    <>
      <Navbar />
      <FacultyClient />
      <Footer />
    </>
  );
}
