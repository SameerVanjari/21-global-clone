"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Trading", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export function NavHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-[border-color] duration-300"
      style={{
        borderBottom: scrolled
          ? "1px solid #e5e5e5"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-16 py-6 flex items-center justify-between max-md:px-6 max-md:py-4">
        <Link
          href="/"
          className="text-foreground font-medium text-sm tracking-[0.15em] uppercase no-underline hover:text-accent transition-colors duration-200"
        >
          Twenty1Global
        </Link>

        <nav className="flex items-center gap-10 max-md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-normal tracking-[0.1em] uppercase text-muted no-underline hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
