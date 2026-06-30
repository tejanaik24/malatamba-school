import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyBar from "@/components/MobileStickyBar";

export const metadata: Metadata = {
  title: {
    default: "Malatamba Vidyaniketan | Premier School in Visakhapatnam",
    template: "%s | Malatamba Vidyaniketan",
  },
  description:
    "Malatamba Vidyaniketan — Quality education with experienced faculty, modern labs, library and transport since 2005. Located in P.M.Palem, Visakhapatnam.",
  keywords:
    "Malatamba Vidyaniketan, school Visakhapatnam, PM Palem school, CBSE school Vizag, best school Visakhapatnam",
  openGraph: {
    siteName: "Malatamba Vidyaniketan",
    locale: "en_IN",
    type: "website",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Malatamba Vidyaniketan",
  url: "https://malatamba-school.vercel.app",
  logo: "https://malatamba-school.vercel.app/real-photos/logo/logo-main.png",
  description:
    "Malatamba Vidyaniketan provides quality education with modern infrastructure since 2005, located in P.M.Palem, Visakhapatnam.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sadguru Towers, Malatamba Road, P.M.Palem",
    addressLocality: "Visakhapatnam",
    addressRegion: "Andhra Pradesh",
    postalCode: "530041",
    addressCountry: "IN",
  },
  telephone: "+918374355556",
  email: "principalmalatambaschools@gmail.com",
  foundingDate: "2005",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
        <WhatsAppButton />
        <MobileStickyBar />
      </body>
    </html>
  );
}
