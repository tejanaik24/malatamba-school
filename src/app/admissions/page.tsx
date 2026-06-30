import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdmissionsClient from "./AdmissionsClient";

export const metadata: Metadata = {
  title: "Admissions & Enquiry",
  description:
    "Apply for admissions at Malatamba Vidyaniketan. Fill in our simple enquiry form and we will get back to you via WhatsApp instantly.",
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
