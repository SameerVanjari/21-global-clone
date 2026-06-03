"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "HERO" },
  { id: "services", label: "EXEC" },
  { id: "about", label: "METR" },
  { id: "locations", label: "NODE" },
  { id: "contact", label: "CONN" },
];

export default function DotNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const idx = ids.indexOf(visible[0].target.id);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      { threshold: 0.4, rootMargin: "-10% 0px -10% 0px" }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 items-end">
      {SECTIONS.map((section, i) => {
        const isActive = i === activeIndex;
        const isHovered = i === hoveredIndex;

        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label={`Scroll to ${section.label}`}
          >
            <span
              className={`text-caption transition-all duration-200 ${
                isHovered || isActive
                  ? "opacity-100 text-amber translate-x-0"
                  : "opacity-0 text-muted-foreground translate-x-2"
              }`}
            >
              {isHovered || isActive ? `[${section.label}]` : ""}
            </span>
            <span
              className={`block w-3 h-3 border transition-colors duration-200 ${
                isActive
                  ? "bg-amber border-amber"
                  : "bg-transparent border-border hover:border-muted-foreground"
              }`}
              style={{ borderRadius: 0 }}
            />
          </button>
        );
      })}
    </nav>
  );
}
