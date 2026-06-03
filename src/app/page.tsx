"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Locations } from "@/components/sections/Locations";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
      easing: (t: number) => t,
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
    <main>
      <Hero />
      <Services />
      <About />
      <Locations />
      <Contact />
    </main>
  );
}
