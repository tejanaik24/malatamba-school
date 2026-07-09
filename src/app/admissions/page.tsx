import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdmissionsClient from "./AdmissionsClient";

const PAGE_URL = "https://www.malatambavidyaniketan.ac.in/admissions";
const PAGE_TITLE = "Admissions & Enquiry";
const PAGE_DESC =
  "Apply for admissions at Malatamba Vidyaniketan. Fill in our simple enquiry form and we will get back to you via WhatsApp instantly.";

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

export default function AdmissionsPage() {
  return (
    <>
      <Navbar />
      <AdmissionsClient />
      <Footer />
    </>
  );
}
