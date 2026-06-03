"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import NavHeader from "@/components/layout/NavHeader";
import DotNav from "@/components/layout/DotNav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Locations from "@/components/sections/Locations";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      lerp: 0.08,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
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
    </>
  );
}
