"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#hero", label: "Terminal" },
  { href: "#services", label: "Execution" },
  { href: "#about", label: "Metrics" },
  { href: "#locations", label: "Nodes" },
  { href: "#contact", label: "Connect" },
];

export default function NavHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled ? "bg-background border-brutal-thick-b" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          <a
            href="#hero"
            className="text-nav text-foreground glitch-hover flex items-center gap-2"
          >
            <span className="text-amber">[</span>
            TWENTY1GLOBAL
            <span className="text-amber">]</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-nav px-3 py-2 transition-colors relative group ${
                    isActive ? "text-amber" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-amber opacity-0 group-hover:opacity-100 transition-opacity">
                    [
                  </span>
                  {link.label}
                  <span className="text-amber opacity-0 group-hover:opacity-100 transition-opacity">
                    ]
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="md:hidden text-caption text-muted-foreground">
            <span className="text-amber">[</span>MENU<span className="text-amber">]</span>
          </div>
        </div>
      </div>
    </header>
  );
}
