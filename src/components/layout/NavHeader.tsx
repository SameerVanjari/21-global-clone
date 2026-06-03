"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#locations", label: "Locations" },
  { href: "#contact", label: "Contact" },
];

export default function NavHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(e.currentTarget.getAttribute("href")!);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_20px_rgba(61,43,31,0.06)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link
          href="/"
          className="group flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/15 transition-all duration-500 group-hover:bg-terracotta/25">
            <span className="absolute inset-0 animate-blob-morph rounded-full bg-terracotta/20" />
            <span className="relative font-[family-name:var(--font-display)] text-xl font-semibold text-terracotta">
              21
            </span>
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl font-medium text-bark transition-colors group-hover:text-terracotta">
            Twenty1Global
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick}
                className="relative font-[family-name:var(--font-body)] text-sm font-normal text-clay transition-colors duration-300 hover:text-terracotta"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="inline-flex items-center rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-cream transition-all duration-300 hover:bg-terracotta-light hover:shadow-lg hover:shadow-terracotta/20"
            >
              Get in Touch
            </a>
          </li>
        </ul>

        <button
          className="flex items-center justify-center rounded-full p-2 text-bark transition-colors hover:bg-sand/50 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden transition-all duration-400 md:hidden",
          mobileOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <ul className="flex flex-col gap-3 border-t border-sand/50 bg-cream/95 px-6 pb-6 pt-4 backdrop-blur-md">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick}
                className="block rounded-lg px-4 py-2.5 font-[family-name:var(--font-body)] text-base text-clay transition-colors hover:bg-sand/30 hover:text-terracotta"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="mt-2 block rounded-full bg-terracotta px-6 py-2.5 text-center font-medium text-cream transition-all hover:bg-terracotta-light"
            >
              Get in Touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
