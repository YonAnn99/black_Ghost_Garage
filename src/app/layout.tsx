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

export const metadata: Metadata = {
  title: "Black Ghost's Garage | Ingeniería de Alto Octanaje",
  description:
    "Taller especializado en mecánica, mantenimiento y modificación estética para autos y motocicletas. Precisión mecánica, estética agresiva y rendimiento sin compromisos en Ciudad de México.",
  keywords: [
    "taller mecánico CDMX",
    "tuning autos",
    "afinación de motor",
    "modificación estética vehículos",
    "fibra de carbono autos",
    "taller motocicletas",
  ],
  authors: [{ name: "Black Ghost's Garage" }],
  openGraph: {
    title: "Black Ghost's Garage | Ingeniería de Alto Octanaje",
    description:
      "Precisión mecánica, estética agresiva y rendimiento sin compromisos. Entra al lado oscuro de la ingeniería automotriz.",
    locale: "es_MX",
    type: "website",
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
