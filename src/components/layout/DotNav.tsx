"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "hero", label: "Terminal" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "locations", label: "Locations" },
  { id: "contact", label: "Contact" },
];

export default function DotNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-5">
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        const isHovered = hoveredDot === id;

        return (
          <div key={id} className="relative flex items-center">
            {isHovered && (
              <span
                className="absolute right-7 whitespace-nowrap text-xs tracking-widest uppercase px-2 py-1 pointer-events-none"
                style={{
                  color: "#00f0ff",
                  background: "rgba(0, 240, 255, 0.08)",
                  border: "1px solid rgba(0, 240, 255, 0.2)",
                  borderRadius: "2px",
                  textShadow: "0 0 6px rgba(0, 240, 255, 0.4)",
                }}
              >
                {label}
              </span>
            )}
            <button
              onClick={() => scrollTo(id)}
              className="transition-all duration-300 rounded-full"
              onMouseEnter={() => setHoveredDot(id)}
              onMouseLeave={() => setHoveredDot(null)}
              style={{
                width: isActive ? "12px" : "8px",
                height: isActive ? "12px" : "8px",
                background: isActive ? "#00f0ff" : "rgba(0, 240, 255, 0.3)",
                boxShadow: isActive
                  ? "0 0 12px rgba(0, 240, 255, 0.8), 0 0 24px rgba(0, 240, 255, 0.4)"
                  : "none",
                border: isActive
                  ? "1px solid rgba(0, 240, 255, 0.6)"
                  : "1px solid rgba(0, 240, 255, 0.2)",
              }}
              aria-label={`Navigate to ${label}`}
            />
          </div>
        );
      })}
    </div>
  );
}
