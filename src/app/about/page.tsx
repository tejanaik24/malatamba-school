import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us & Chairman's Message",
  description:
    "Learn about Malatamba Vidyaniketan — our history, vision, mission, and Chairman Mr. Suneel Mahanty's message for families in Visakhapatnam.",
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
