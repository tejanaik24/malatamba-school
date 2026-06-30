import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InfrastructureClient from "./InfrastructureClient";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "Explore Malatamba Vidyaniketan's world-class infrastructure — smart classrooms, science labs, computer lab, library, sports facilities and safe transport.",
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
