"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import type { GlobeMarker } from "@/components/ui/3d-globe";
import ScrollReveal from "@/components/effects/ScrollReveal";

const Globe3D = dynamic(
  () => import("@/components/ui/3d-globe").then((m) => m.default),
  { ssr: false }
);

const LOCATIONS = [
  {
    city: "Dubai",
    region: "United Arab Emirates",
    role: "Global Headquarters",
    lat: 25.2048,
    lng: 55.2708,
    description:
      "The commercial nexus connecting East and West. Our Dubai office anchors all strategic operations, capital allocation, and senior leadership — positioned at the centre of global trade flows.",
  },
  {
    city: "Singapore",
    region: "Republic of Singapore",
    role: "Asia-Pacific Hub",
    lat: 1.3521,
    lng: 103.8198,
    description:
      "Our gateway to the fastest-growing markets on earth. Singapore drives our Asian sourcing, distribution, and financial operations with the precision the city-state is renowned for.",
  },
  {
    city: "Geneva",
    region: "Switzerland",
    role: "European Operations",
    lat: 46.2044,
    lng: 6.1432,
    description:
      "The historic heart of global commodity trading. Our Geneva presence ensures access to European markets, trade finance networks, and the rigorous standards Swiss commerce demands.",
  },
];

const markers: GlobeMarker[] = LOCATIONS.map((loc) => ({
  lat: loc.lat,
  lng: loc.lng,
  label: loc.city,
}));

export default function Locations() {
  const [activeCity, setActiveCity] = useState<string>("Dubai");
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const displayedCity = hoveredCity || activeCity;
  const activeLocation = LOCATIONS.find((l) => l.city === displayedCity) || LOCATIONS[0];
  const isPrimary = LOCATIONS.some((l) => l.city === displayedCity);

  const handleMarkerClick = useCallback((marker: GlobeMarker) => {
    const loc = LOCATIONS.find((l) => l.city === marker.label);
    if (loc) setActiveCity(loc.city);
  }, []);

  const handleMarkerHover = useCallback((marker: GlobeMarker | null) => {
    if (marker && LOCATIONS.some((l) => l.city === marker.label)) {
      setHoveredCity(marker.label);
    } else {
      setHoveredCity(null);
    }
  }, []);

  return (
    <section
      id="locations"
      className="relative section-padding overflow-hidden flex flex-col"
    >


      {/* Section header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-4">
          <ScrollReveal>
            <span className="block text-eyebrow text-[var(--color-gold)] mb-6">
              Global Presence
            </span>
            <h2 className="text-heading text-[var(--color-ink)]">
              Where we operate
            </h2>
          </ScrollReveal>
        </div>
        <div className="lg:col-span-5 lg:col-start-7">
          <ScrollReveal delay={150}>
            <p className="text-body text-[var(--color-ink-muted)] leading-[1.9]">
              Three strategic hubs. One seamless operation. Hover over any
              marker on the globe to explore.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Globe + City card in a cohesive viewport-friendly row */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center min-h-0">
        {/* Globe — takes primary space */}
        <div className="relative w-full lg:w-[60%] h-[420px] md:h-[520px] -mx-[5%] md:-mx-[8%] lg:-mx-0 lg:ml-[-5%] lg:w-[calc(60%+5%)]">
          <Globe3D
            markers={markers}
            config={{
              atmosphereColor: "#1b365d",
              atmosphereIntensity: 20,
              bumpScale: 5,
              autoRotateSpeed: 0.3,
            }}
            onMarkerClick={handleMarkerClick}
            onMarkerHover={handleMarkerHover}
          />

          {/* Gradient masks for soft edge blending */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[var(--color-cream)] to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[var(--color-cream)] to-transparent pointer-events-none z-10" />
        </div>

        {/* Single reactive city card */}
        <div className="w-full lg:w-[40%] lg:pr-[2%] z-20">
          <ScrollReveal key={displayedCity}>
            <div
              className={`relative border-l-2 p-6 md:p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isPrimary
                  ? "border-[var(--color-gold)] bg-[var(--color-gold-pale)]/20"
                  : "border-[var(--color-divider)]"
              }`}
            >
              {/* City label row */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-[family-name:var(--font-dm-sans)] text-[0.6rem] font-medium tracking-[0.3em] uppercase text-[var(--color-gold)]">
                  {isPrimary ? "Office" : "Partner"}
                </span>
                {!isPrimary && (
                  <span className="text-caption text-[var(--color-ink-muted)]/40">
                    (click a primary marker to set focus)
                  </span>
                )}
              </div>

              <h3 className="font-[family-name:var(--font-dm-sans)] text-[clamp(2.2rem,3.5vw,3.5rem)] font-extralight tracking-[-0.02em] text-[var(--color-ink)] mb-3 leading-none">
                {activeLocation.city}
              </h3>

              {isPrimary && (
                <p className="text-caption text-[var(--color-ink-muted)] mb-4">
                  {activeLocation.role} &middot; {activeLocation.region}
                </p>
              )}
              {!isPrimary && (
                <p className="text-caption text-[var(--color-ink-muted)]/60 mb-4">
                  Hover over {activeLocation.city} for trade routes
                </p>
              )}

              <div className="rule-short mb-4" />

              <p className="font-[family-name:var(--font-lora)] text-[0.95rem] leading-[1.8] text-[var(--color-ink-muted)]">
                {isPrimary
                  ? activeLocation.description
                  : `${activeLocation.city} is a key node in our global trading network — connected to our hubs through established trade corridors and strategic partnerships.`}
              </p>

              {/* Dot indicators for primary cities */}
              <div className="flex gap-3 mt-6">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.city}
                    onClick={() => setActiveCity(loc.city)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeCity === loc.city && !hoveredCity
                        ? "bg-[var(--color-gold)] scale-125"
                        : "bg-[var(--color-ink)]/15 hover:bg-[var(--color-gold)]/40"
                    }`}
                    aria-label={loc.city}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
