import type { Metadata, Viewport } from "next";

import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import "./globals.css";
import { contactInfo, serviceGroups, socialLinks } from "@/lib/data";

const baseUrl = "https://black-ghost-garage.vercel.app";

const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Black Ghost's Garage",
  description:
    "Taller especializado en mecánica, mantenimiento y modificación estética para autos y motocicletas en Oxtotipac, Estado de México.",
  url: baseUrl,
  image: `${baseUrl}/images/ghost-logo.png`,
  telephone: contactInfo.whatsappNumber.replace(/\s/g, ""),
  email: contactInfo.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: contactInfo.address,
    addressLocality: "Oxtotipac",
    addressRegion: "Estado de México",
    postalCode: "55925",
    addressCountry: "MX",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "17:00",
    },
  ],
  sameAs: socialLinks.map(({ href }) => href),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Black Ghost's Garage",
    itemListElement: serviceGroups.flatMap((group) =>
      group.items.map(({ label }) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: label,
          category: group.title,
        },
      }))
    ),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Black Ghost's Garage",
  description:
    "Taller especializado en mecánica, mantenimiento y modificación estética para autos y motocicletas. Precisión mecánica, estética agresiva y rendimiento sin compromisos en Ciudad de México.",
  keywords: [
    "taller mecánico CDMX",
    "tuning autos",
    "afinación de motor",
    "modificación estética vehículos",
    "fibra de carbono autos",
    "taller motocicletas",
    "mecánica automotriz Ciudad de México",
    "latonería y pintura CDMX",
  ],
  authors: [{ name: "Black Ghost's Garage" }],
  creator: "YonAnn",
  openGraph: {
    title: "Black Ghost's Garage",
    description:
      "Precisión mecánica, estética agresiva y rendimiento sin compromisos. Entra al lado oscuro de la ingeniería automotriz.",
    url: baseUrl,
    siteName: "Black Ghost's Garage",
    images: [
      {
        url: "/images/ghost-logo.png",
        width: 1024,
        height: 1024,
        alt: "Black Ghost's Garage Logo",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Ghost's Garage",
    description:
      "Precisión mecánica, estética agresiva y rendimiento sin compromisos en Ciudad de México.",
    images: ["/images/ghost-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessStructuredData),
          }}
        />
        <script
          defer
          data-domain="black-ghost-garage.vercel.app"
          src="https://plausible.io/js/script.tagged-events.js"
        />
      </head>
      <body className="bg-void text-bone antialiased">{children}</body>
    </html>
  );
}
