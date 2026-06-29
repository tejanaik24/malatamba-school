import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Malatamba Vidyaniketan | Premier School in Visakhapatnam",
  description:
    "Malatamba Vidyaniketan — Providing quality education with experienced faculty, modern labs, library, transport, and holistic development since 2005. Located in Visakhapatnam.",
  keywords:
    "Malatamba Vidyaniketan, school in Visakhapatnam, education, CBSE school, PM Palem school",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
