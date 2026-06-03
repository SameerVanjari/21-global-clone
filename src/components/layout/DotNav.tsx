"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const sections = ["hero", "services", "about", "locations", "contact"];

export default function DotNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.4, rootMargin: "-10% 0px" }
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-6 top-1/2 z-40 -translate-y-1/2 hidden lg:block">
      <ul className="flex flex-col items-center gap-5">
        {sections.map((id) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className="group relative flex items-center justify-center"
              aria-label={`Scroll to ${id}`}
            >
              <span
                className={cn(
                  "block h-5 w-5 rounded-full border transition-all duration-500",
                  active === id
                    ? "border-terracotta bg-terracotta shadow-[0_0_12px_rgba(194,105,65,0.4)]"
                    : "border-sand hover:border-terracotta-light"
                )}
                style={{
                  borderRadius:
                    active === id
                      ? "50% 50% 45% 55% / 48% 52% 50% 50%"
                      : "50% 50% 42% 58% / 55% 48% 52% 45%",
                }}
              />
              <span
                className={cn(
                  "absolute -right-1 top-1/2 -translate-y-1/2 translate-x-full whitespace-nowrap rounded-full bg-bark px-3 py-1 text-xs text-cream opacity-0 transition-all duration-300 group-hover:opacity-100 font-[family-name:var(--font-body)]",
                  active === id && "opacity-100"
                )}
                style={{
                  opacity: active === id ? 1 : 0,
                }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
