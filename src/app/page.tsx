import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RevealProvider from "@/components/RevealProvider";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Black Ghost's Garage",
  image: "https://black-ghost-garage.vercel.app/images/ghost-logo.png",
  url: "https://black-ghost-garage.vercel.app",
  telephone: "+525635363577",
  description:
    "Taller especializado en mecánica, mantenimiento y modificación estética para autos y motocicletas en Ciudad de México.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad de México",
    addressRegion: "CDMX",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.4326,
    longitude: -99.1332,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "15:00",
    },
  ],
  priceRange: "$$",
  sameAs: [],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RevealProvider>
        <Header />
        <main>
          <Hero />
          <Services />
          <Gallery />
          <About />
          <Contact />
        </main>
        <Footer />
      </RevealProvider>
    </>
  );
}
