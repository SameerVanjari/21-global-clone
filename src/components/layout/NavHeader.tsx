"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Our Work", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Global", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export default function NavHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 80);
      setHidden(currentY > lastScrollY && currentY > 200);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <header
      className={`fixed top-6 left-[5%] right-[5%] md:left-[8%] md:right-[8%] lg:left-[10%] lg:right-[10%] z-[1000] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0"
      }`}
    >
      <nav
        className={`flex items-center justify-between px-6 py-4 md:px-8 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border border-[var(--color-divider)] shadow-[0_10px_40px_rgba(26,26,46,0.04)]"
            : "glass-effect"
        }`}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-[family-name:var(--font-dm-sans)] text-[0.95rem] font-light tracking-[0.15em] uppercase text-[var(--color-ink)] transition-colors duration-600"
        >
          Twenty<span className="font-extralight opacity-50">1</span>Global
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="nav-link font-[family-name:var(--font-dm-sans)] text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--color-ink)]/70 hover:text-[var(--color-ink)] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--color-ink)] border border-[var(--color-divider-strong)] px-5 py-2.5 hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            Enquire
          </a>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer relative z-[1003]"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-[var(--color-ink)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[var(--color-ink)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[var(--color-ink)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </nav>
    </header>

      {/* Mobile backdrop + menu */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/20 z-[1001] transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`md:hidden fixed left-[5%] right-[5%] md:left-[8%] md:right-[8%] top-0 z-[1002] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 px-6 py-24 mt-[88px] pointer-events-auto bg-white/95 backdrop-blur-xl border-x border-b border-[var(--color-divider)] shadow-[0_10px_40px_rgba(26,26,46,0.04)]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-[family-name:var(--font-dm-sans)] text-[0.9rem] font-medium tracking-[0.2em] uppercase text-[var(--color-ink)]/70 hover:text-[var(--color-ink)] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="font-[family-name:var(--font-dm-sans)] text-[0.8rem] font-medium tracking-[0.2em] uppercase text-[var(--color-ink)] border border-[var(--color-divider-strong)] px-6 py-3 hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            Enquire
          </a>
        </nav>
      </div>
    </>
  );
}
