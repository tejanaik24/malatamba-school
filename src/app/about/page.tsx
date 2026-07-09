import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutClient from "./AboutClient";

const PAGE_URL = "https://www.malatambavidyaniketan.ac.in/about";
const PAGE_TITLE = "About Us & Chairman's Message";
const PAGE_DESC =
  "Learn about Malatamba Vidyaniketan — our history, vision, mission, and Chairman Mr. Suneel Mahanty's message for families in Visakhapatnam.";

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

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutClient />
      <Footer />
    </>
  );
}
