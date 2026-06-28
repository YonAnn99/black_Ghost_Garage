import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RevealProvider from "@/components/RevealProvider";

export default function Home() {
  return (
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
  );
}
