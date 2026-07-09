import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InfrastructureClient from "./InfrastructureClient";

const PAGE_URL = "https://www.malatambavidyaniketan.ac.in/infrastructure";
const PAGE_TITLE = "Infrastructure";
const PAGE_DESC =
  "Explore Malatamba Vidyaniketan's world-class infrastructure — smart classrooms, science labs, computer lab, library, sports facilities and safe transport.";

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

export default function InfrastructurePage() {
  return (
    <>
      <Navbar />
      <InfrastructureClient />
      <Footer />
    </>
  );
}
