import { ContactBand } from "@/components/landing/ContactBand";
import { Experience } from "@/components/landing/Experience";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { Services } from "@/components/landing/Services";
import { StatsBand } from "@/components/landing/StatsBand";
import { Testimonials } from "@/components/landing/Testimonials";
import { TrustStrip } from "@/components/landing/TrustStrip";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <StatsBand />
        <Services />
        <HowItWorks />
        <Experience />
        <Testimonials />
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
