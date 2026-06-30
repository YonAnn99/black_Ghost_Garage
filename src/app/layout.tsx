import type { Metadata } from "next";

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

const baseUrl = "https://black-ghost-garage.vercel.app";

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
      <body className="bg-void text-bone antialiased">{children}</body>
    </html>
  );
}
