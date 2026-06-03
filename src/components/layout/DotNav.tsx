"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "locations", label: "Locations" },
  { id: "contact", label: "Contact" },
];

export function DotNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5 max-md:hidden">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group flex items-center gap-3"
          aria-label={section.label}
        >
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: activeSection === section.id ? "10px" : "6px",
              height: activeSection === section.id ? "10px" : "6px",
              backgroundColor:
                activeSection === section.id ? "#e63946" : "#cccccc",
            }}
          />
          <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
