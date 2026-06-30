import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RulesClient from "./RulesClient";

export const metadata: Metadata = {
  title: "Rules & Regulations",
  description:
    "Malatamba Vidyaniketan school rules — timings, dress code, attendance policy, code of conduct, and fee guidelines.",
};

export default function RulesPage() {
  return (
    <>
      <Navbar />
      <RulesClient />
      <Footer />
    </>
  );
}
