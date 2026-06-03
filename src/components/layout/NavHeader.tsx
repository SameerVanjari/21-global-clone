"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export default function NavHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-deep/95 backdrop-blur-md border-b border-gold-300/20 shadow-lg shadow-gold-300/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Left: Ornate border accent */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-300/50" />
            <span className="text-gold-300 text-xs tracking-[0.3em] uppercase font-light">
              Est. 2010
            </span>
          </div>

          {/* Center: Logo */}
          <div className="text-center">
            <a href="#home" className="block group">
              <div className="font-display text-2xl tracking-[0.2em] text-gold-300 transition-all duration-500 group-hover:text-gold-200">
                TWENTY<span className="text-xl text-champagne/80 font-light">1</span>GLOBAL
              </div>
              <div className="flex items-center justify-center gap-3 mt-1">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-300/40" />
                <span className="diamond-marker" />
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-300/40" />
              </div>
            </a>
          </div>

          {/* Right: Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-300/50" />
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-xs tracking-[0.2em] uppercase text-champagne/70 hover:text-gold-300 transition-colors duration-500 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-gold-300 to-gold-200 group-hover:w-3/4 transition-all duration-500" />
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-gold-300 hover:text-gold-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-80 border-t border-gold-300/10" : "max-h-0"
        }`}
      >
        <nav className="bg-deep/98 backdrop-blur-md px-6 py-4 flex flex-col items-center gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-3 text-sm tracking-[0.2em] uppercase text-champagne/70 hover:text-gold-300 transition-colors duration-300"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="inline-flex items-center gap-3">
                <span className="diamond-marker w-[4px] h-[4px]" />
                {link.label}
                <span className="diamond-marker w-[4px] h-[4px]" />
              </span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
