"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import NavHeader from "@/components/layout/NavHeader";
import DotNav from "@/components/layout/DotNav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Locations from "@/components/sections/Locations";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
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
        <Process />
        <About />
        <Locations />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
