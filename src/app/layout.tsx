import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyBar from "@/components/MobileStickyBar";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://www.malatambavidyaniketan.ac.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Malatamba Vidyaniketan | Premier School in Visakhapatnam",
    template: "%s | Malatamba Vidyaniketan",
  },
  description:
    "Malatamba Vidyaniketan — Quality education with experienced faculty, modern labs, library and transport since 2002. Located in P.M.Palem, Visakhapatnam.",
  keywords:
    "Malatamba Vidyaniketan, school Visakhapatnam, PM Palem school, CBSE school Vizag, best school Visakhapatnam",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    siteName: "Malatamba Vidyaniketan",
    locale: "en_IN",
    type: "website",
    url: SITE_URL,
    title: "Malatamba Vidyaniketan | Premier School in Visakhapatnam",
    description:
      "Malatamba Vidyaniketan — Quality education with experienced faculty, modern labs, library and transport since 2002. Located in P.M.Palem, Visakhapatnam.",
    images: [{ url: "/real-photos/logo/logo-footer.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malatamba Vidyaniketan | Premier School in Visakhapatnam",
    description:
      "Malatamba Vidyaniketan — Quality education with experienced faculty, modern labs, library and transport since 2002. Located in P.M.Palem, Visakhapatnam.",
    images: ["/real-photos/logo/logo-footer.png"],
  },
};

const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Malatamba Vidyaniketan",
  url: SITE_URL,
  logo: `${SITE_URL}/real-photos/logo/logo-footer.png`,
  foundingDate: "2002",
  description:
    "Premier co-educational English medium school in PM Palem, Visakhapatnam, affiliated to APSCERT, AP Government recognized, established 2002.",
};

const localBusinessSchema = {
  "@type": ["LocalBusiness", "EducationalOrganization"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Malatamba Vidyaniketan",
  url: SITE_URL,
  image: `${SITE_URL}/real-photos/logo/logo-footer.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sadguru Towers, Malatamba Road",
    addressLocality: "PM Palem, Visakhapatnam",
    addressRegion: "Andhra Pradesh",
    postalCode: "530041",
    addressCountry: "IN",
  },
  telephone: "+918985674670",
  email: "principalmalatambaschools@gmail.com",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.8092,
    longitude: 83.3789,
  },
  openingHours: "Mo-Sa 08:00-17:00",
  containedInPlace: {
    "@type": "Place",
    name: "PM Palem, Visakhapatnam, Andhra Pradesh, India",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "120",
  },
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nursery Admissions" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Primary Education" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "High School Education" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Transport Services" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Smart Classrooms" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Science Labs" } },
  ],
};

const faqSchema = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Which board is Malatamba Vidyaniketan affiliated to?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "APSCERT, recognized by Government of Andhra Pradesh.",
      },
    },
    {
      "@type": "Question",
      name: "What classes does Malatamba Vidyaniketan offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nursery to Class X.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Malatamba Vidyaniketan located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sadguru Towers, Malatamba Road, PM Palem, Visakhapatnam 530041.",
      },
    },
    {
      "@type": "Question",
      name: "Does the school provide transport?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, safe school buses with trained male and female attendants covering all major routes in Visakhapatnam.",
      },
    },
    {
      "@type": "Question",
      name: "When was Malatamba Vidyaniketan established?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "2002.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact Malatamba Vidyaniketan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Call 8985674670 or email principalmalatambaschools@gmail.com.",
      },
    },
  ],
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Malatamba Vidyaniketan",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?s={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, localBusinessSchema, faqSchema, websiteSchema],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fraunces.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-dark focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
        >
          Skip to content
        </a>
        <ClientLayout>{children}</ClientLayout>
        <WhatsAppButton />
        <MobileStickyBar />
      </body>
    </html>
  );
}
