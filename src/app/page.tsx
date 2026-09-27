import Calculator from "@/components/Calculator";
import Charging from "@/components/Charging";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Models from "@/components/Models";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Models />
        <Charging />
        <Calculator />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
