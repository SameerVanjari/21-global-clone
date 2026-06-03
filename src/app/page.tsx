import SmoothScroll from "@/components/effects/SmoothScroll";
import NavHeader from "@/components/layout/NavHeader";
import DotNav from "@/components/layout/DotNav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Locations from "@/components/sections/Locations";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <NavHeader />
      <DotNav />
      <main>
        <Hero />
        <Services />
        <About />
        <Locations />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
