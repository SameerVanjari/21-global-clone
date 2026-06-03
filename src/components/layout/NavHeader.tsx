"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export default function NavHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-2" : "bg-transparent py-4"
      }`}
      style={{
        borderBottom: scrolled
          ? "1px solid rgba(0, 240, 255, 0.15)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 0 40px rgba(0, 240, 255, 0.06)"
          : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link
          href="#hero"
          className="text-cyan tracking-widest text-lg font-light uppercase relative group"
          style={{ letterSpacing: "0.35em" }}
        >
          <span className="text-[#00f0ff]">Twenty1</span>
          <span className="text-[#e0e8ff]">Global</span>
          <span
            className="absolute -bottom-1 left-0 h-[1px] bg-[#00f0ff] transition-all duration-300"
            style={{
              width: "0%",
              boxShadow: "0 0 8px rgba(0, 240, 255, 0.6)",
            }}
          />
          <style jsx>{`
            .group:hover span.absolute {
              width: 100% !important;
            }
          `}</style>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm tracking-wider uppercase transition-colors duration-300"
              style={{
                color:
                  hovered === item.href ? "#00f0ff" : "#667799",
                textShadow:
                  hovered === item.href
                    ? "0 0 8px rgba(0, 240, 255, 0.4)"
                    : "none",
              }}
              onMouseEnter={() => setHovered(item.href)}
              onMouseLeave={() => setHovered(null)}
            >
              {item.label}
              {hovered === item.href && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-300"
                  style={{
                    width: "60%",
                    background:
                      "linear-gradient(90deg, transparent, #00f0ff, transparent)",
                    boxShadow: "0 0 6px rgba(0, 240, 255, 0.5)",
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        <Link
          href="#contact"
          className="hidden md:block relative overflow-hidden px-5 py-2 text-sm tracking-wider uppercase font-medium transition-all duration-300 group border-glow-cyan"
          style={{
            color: "#00f0ff",
            background: "rgba(0, 240, 255, 0.05)",
            borderRadius: "2px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 240, 255, 0.12)";
            e.currentTarget.style.boxShadow =
              "0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 240, 255, 0.05)";
            e.currentTarget.style.boxShadow =
              "0 0 15px rgba(0, 240, 255, 0.1), 0 0 40px rgba(0, 240, 255, 0.05)";
          }}
        >
          Trade Now
        </Link>
      </div>
    </nav>
  );
}
