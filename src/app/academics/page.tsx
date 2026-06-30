import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AcademicsClient from "./AcademicsClient";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Malatamba Vidyaniketan's academic curriculum — Nursery to Class X, subjects, teaching methodology, and approach to holistic learning.",
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
