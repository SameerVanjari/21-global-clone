"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { cn } from "@/lib/utils";

const Globe = dynamic(() => import("@/components/effects/Globe"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="h-32 w-32 animate-spin rounded-full border-4 border-transparent"
        style={{
          borderTopColor: "#c26941",
          borderRightColor: "#7d9b76",
          borderRadius: "45% 55% 55% 45% / 48% 52% 48% 52%",
        }}
      />
    </div>
  ),
});

const locations = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    description:
      "Our headquarters at the crossroads of global trade. Dubai's strategic position connects Eastern and Western markets with unmatched efficiency.",
    accent: "bg-terracotta",
    accentLight: "bg-terracotta-light/30",
    accentText: "text-terracotta",
  },
  {
    city: "Singapore",
    country: "Singapore",
    region: "Asia-Pacific",
    description:
      "The gateway to Asia's dynamic commodity markets. Our Singapore office brings deep regional expertise and access to the fastest-growing trade corridors.",
    accent: "bg-sage",
    accentLight: "bg-sage/30",
    accentText: "text-sage-dark",
  },
  {
    city: "Geneva",
    country: "Switzerland",
    region: "Europe",
    description:
      "At the heart of European commodities finance. Geneva connects us to the world's most sophisticated trading networks and financial infrastructure.",
    accent: "bg-clay",
    accentLight: "bg-clay/20",
    accentText: "text-clay",
  },
];

const particles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 5,
  left: `${8 + Math.random() * 84}%`,
  top: `${8 + Math.random() * 60}%`,
  duration: 12 + Math.random() * 22,
  delay: Math.random() * 18,
  type: Math.random() > 0.5 ? "particle" : "diagonal",
}));

export default function Locations() {
  return (
    <section
      id="locations"
      className="relative overflow-hidden bg-cream pt-0 pb-24 lg:pb-32"
    >
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 lg:pt-32">
        <ScrollReveal>
          <p className="mb-3 font-[family-name:var(--font-body)] text-sm font-medium tracking-widest text-terracotta uppercase">
            Global Presence
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-light italic text-bark sm:text-5xl lg:text-6xl">
            Three hubs.{" "}
            <span className="font-medium text-sage-dark not-italic">
              One world.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl font-[family-name:var(--font-body)] text-lg text-clay">
            Strategically positioned across three continents, our offices form a
            continuous ring of expertise that never sleeps.
          </p>
        </ScrollReveal>
      </div>

      {/* Globe container */}
      <div className="relative mt-12 h-[500px] w-full md:h-[650px]">
        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {particles.map((p) => (
            <div
              key={p.id}
              className={
                p.type === "particle"
                  ? "animate-float-particle absolute rounded-full bg-terracotta"
                  : "animate-float-diagonal absolute rounded-full bg-sage"
              }
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: p.left,
                top: p.top,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                opacity: 0.1 + Math.random() * 0.2,
                borderRadius:
                  p.size > 4 ? "50% 50% 45% 55% / 48% 52% 50% 50%" : "50%",
              }}
            />
          ))}
        </div>

        {/* Three.js Globe */}
        <Globe />

        {/* Top gradient mask: cream to transparent */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-32"
          style={{
            background: `linear-gradient(
              to bottom,
              #fdf8f0 0%,
              rgba(253, 248, 240, 0.7) 35%,
              transparent 100%
            )`,
          }}
        />

        {/* Bottom gradient mask: cream to transparent */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-40"
          style={{
            background: `linear-gradient(
              to top,
              #fdf8f0 0%,
              rgba(253, 248, 240, 0.7) 35%,
              transparent 100%
            )`,
          }}
        />
      </div>

      {/* City cards */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 mt-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <ScrollReveal key={loc.city} delay={i * 150}>
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand/50 bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-terracotta/5"
                style={{
                  borderRadius: "36px 22px 36px 22px / 28px 36px 22px 36px",
                }}
              >
                {/* Circular image placeholder */}
                <div className="mx-auto mb-6">
                  <div
                    className={cn(
                      "organic-oval h-28 w-28 flex items-center justify-center",
                      loc.accentLight,
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-full",
                        loc.accent,
                        "text-cream",
                      )}
                      style={{
                        borderRadius: "52% 48% 48% 52% / 50% 52% 48% 50%",
                      }}
                    >
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <p className="mb-1 text-center font-[family-name:var(--font-body)] text-xs font-medium tracking-widest text-clay/60 uppercase">
                  {loc.region}
                </p>
                <h3 className="text-center font-[family-name:var(--font-display)] text-2xl font-medium text-bark">
                  {loc.city}
                </h3>
                <p className="mb-4 text-center font-[family-name:var(--font-body)] text-sm text-clay/70">
                  {loc.country}
                </p>

                <div
                  className="mx-auto mb-6"
                  style={{
                    width: 64,
                    height: 1,
                    background:
                      i === 0
                        ? "var(--terracotta)"
                        : i === 1
                          ? "var(--sage)"
                          : "var(--clay)",
                    opacity: 0.3,
                  }}
                />

                <p className="flex-1 text-center font-[family-name:var(--font-body)] text-sm leading-relaxed text-clay">
                  {loc.description}
                </p>

                <div
                  className={cn(
                    "mt-6 rounded-full px-2 py-0.5 text-center text-xs font-medium",
                    loc.accentLight,
                    loc.accentText,
                  )}
                  style={{
                    borderRadius: "16px 10px 16px 10px / 10px 16px 10px 16px",
                  }}
                >
                  {loc.city} Office
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
