"use client";

import { useEffect } from "react";
import NavHeader from "@/components/layout/NavHeader";
import DotNav from "@/components/layout/DotNav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Locations from "@/components/sections/Locations";
import Contact from "@/components/sections/Contact";

export default function Home() {
  useEffect(() => {
    const loadLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => lenis.destroy();
    };

    loadLenis().catch(() => {
      // Lenis failed to load — fall back to native smooth scrolling
      document.documentElement.style.scrollBehavior = "smooth";
    });
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
