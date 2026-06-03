"use client";

import { useState, useEffect } from "react";

const sections = ["home", "services", "about", "locations", "contact"];

export default function DotNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -30% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-5">
      {sections.map((section, i) => (
        <a
          key={section}
          href={`#${section}`}
          className="group relative flex items-center justify-center w-5 h-5"
          aria-label={`Navigate to ${section}`}
        >
          <span
            className={`w-2.5 h-2.5 rotate-45 transition-all duration-500 ${
              active === section
                ? "bg-gold-300 scale-125 shadow-[0_0_10px_rgba(212,168,83,0.6)]"
                : "bg-gold-300/30 group-hover:bg-gold-300/60 group-hover:scale-110"
            }`}
          />
          <span
            className={`absolute -right-1 top-1/2 -translate-y-1/2 translate-x-full text-[10px] tracking-[0.2em] uppercase whitespace-nowrap text-gold-300/0 group-hover:text-gold-300/80 transition-all duration-300 ${
              active === section ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: `${i * 0.03}s` }}
          >
            {section}
          </span>
        </a>
      ))}

      {/* Connecting line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-gold-300/20 to-transparent -z-10" />
    </nav>
  );
}
