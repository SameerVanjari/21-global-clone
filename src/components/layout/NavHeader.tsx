"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export default function NavHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 64);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-1000",
        "px-8 py-6 md:px-16 md:py-8",
        scrolled
          ? "bg-[#f5f2ed]/95 backdrop-blur-sm shadow-architectural-bottom"
          : "bg-transparent"
      )}
    >
      <nav className="flex items-center justify-between max-w-[1600px] mx-auto">
        <a
          href="#hero"
          className="text-xs font-light tracking-[0.3em] uppercase text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors duration-700"
        >
          Twenty1Global
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-xs font-light tracking-[0.25em] uppercase text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors duration-700"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
