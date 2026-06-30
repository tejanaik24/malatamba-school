import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FacultyClient from "./FacultyClient";

export const metadata: Metadata = {
  title: "Our Faculty",
  description:
    "Meet the dedicated educators at Malatamba Vidyaniketan — experienced, passionate teachers committed to every student's success.",
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
