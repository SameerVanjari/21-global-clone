"use client";

import Globe from "@/components/effects/Globe";
import ScrollReveal from "@/components/effects/ScrollReveal";

const LOCATIONS = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East & Africa",
    desc: "Our global headquarters sit at the crossroads of East and West. From DIFC, we orchestrate flows across the Middle East, Africa, and South Asia.",
  },
  {
    city: "Singapore",
    country: "Singapore",
    region: "Asia Pacific",
    desc: "The gateway to Asian markets. Our Singapore desk drives trading across energy, metals, and agricultural commodities throughout the Pacific Rim.",
  },
  {
    city: "Geneva",
    country: "Switzerland",
    region: "Europe & Americas",
    desc: "Our European nexus. From Switzerland's historic trading corridors, we connect producers and consumers across Europe and the Americas.",
  },
];

export default function Locations() {
  return (
    <section
      id="locations"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#f5f2ed" }}
    >
      {/* Globe container */}
      <div
        className="relative w-full flex-shrink-0"
        style={{
          height: "55vh",
          boxShadow:
            "0 80px 120px -40px rgba(0,0,0,0.3), 0 32px 64px -20px rgba(0,0,0,0.15)",
        }}
      >
        <Globe />
      </div>

      {/* Gradient mask — subtle blend from globe shadow to below content */}
      <div
        className="relative z-10 pointer-events-none"
        style={{
          height: "80px",
          background:
            "linear-gradient(to bottom, rgba(245,242,237,0.85) 0%, rgba(245,242,237,0.5) 40%, rgba(245,242,237,0) 100%)",
          marginTop: "-80px",
        }}
      />

      {/* City cards */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-8 md:px-16 pb-24 md:pb-32">
        <ScrollReveal>
          <p className="text-xs font-light tracking-[0.4em] uppercase text-[#1a1a1a]/30 mb-16">
            Global Presence
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {LOCATIONS.map((loc, i) => (
            <ScrollReveal key={loc.city} delay={i * 200}>
              <div
                className="py-12 md:py-16 md:pr-12"
                style={{
                  boxShadow:
                    i !== LOCATIONS.length - 1
                      ? "inset -1px 0 0 0 rgba(26,26,26,0.06)"
                      : "none",
                }}
              >
                <p className="text-xs font-light tracking-[0.25em] uppercase text-[#1a1a1a]/40 mb-3">
                  {loc.region}
                </p>
                <h3 className="text-xl md:text-2xl font-extralight tracking-[0.1em] uppercase text-[#1a1a1a] mb-1">
                  {loc.city}
                </h3>
                <p className="text-xs font-light tracking-[0.15em] uppercase text-[#1a1a1a]/30 mb-6">
                  {loc.country}
                </p>
                <p className="text-sm font-light leading-relaxed text-[#1a1a1a]/50 max-w-xs">
                  {loc.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Deep shadow at bottom of cards */}
      <div
        className="relative z-30 w-full pointer-events-none"
        style={{
          height: "120px",
          boxShadow:
            "0 -4px 8px rgba(10,10,10,0.04), 0 -16px 32px rgba(10,10,10,0.06), 0 -48px 96px rgba(10,10,10,0.08)",
          marginTop: "-16px",
        }}
      />
    </section>
  );
}
