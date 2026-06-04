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
    offset: "",
  },
  {
    city: "Singapore",
    region: "Republic of Singapore",
    role: "Asia-Pacific Hub",
    lat: 1.3521,
    lng: 103.8198,
    description:
      "Our gateway to the fastest-growing markets on earth. Singapore drives our Asian sourcing, distribution, and financial operations with the precision the city-state is renowned for.",
    offset: "md:mt-20",
  },
  {
    city: "Geneva",
    region: "Switzerland",
    role: "European Operations",
    lat: 46.2044,
    lng: 6.1432,
    description:
      "The historic heart of global commodity trading. Our Geneva presence ensures access to European markets, trade finance networks, and the rigorous standards Swiss commerce demands.",
    offset: "md:mt-40",
  },
];

const markers: GlobeMarker[] = LOCATIONS.map((loc) => ({
  lat: loc.lat,
  lng: loc.lng,
  label: loc.city,
}));

const secondaryMarkers: GlobeMarker[] = [
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  { lat: 55.7558, lng: 37.6173, label: "Moscow" },
  { lat: -22.9068, lng: -43.1729, label: "Rio de Janeiro" },
  { lat: 31.2304, lng: 121.4737, label: "Shanghai" },
  { lat: 28.6139, lng: 77.209, label: "New Delhi" },
];

const allMarkers = [...markers, ...secondaryMarkers];

export default function Locations() {
  const [activeCity, setActiveCity] = useState<string>("Dubai");

  const handleMarkerClick = useCallback((marker: GlobeMarker) => {
    const loc = LOCATIONS.find((l) => l.city === marker.label);
    if (loc) setActiveCity(loc.city);
  }, []);

  const activeLocation = LOCATIONS.find((l) => l.city === activeCity) || LOCATIONS[0];

  return (
    <section id="locations" className="relative section-padding overflow-hidden">
      {/* Background numeral */}
      <div className="absolute bottom-0 right-[5%] md:right-[8%] lg:right-[10%] numeral select-none pointer-events-none z-0">
        03
      </div>

      {/* Section header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
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
        <div className="lg:col-span-6 lg:col-start-7">
          <ScrollReveal delay={150}>
            <p className="text-body text-[var(--color-ink-muted)] leading-[1.9]">
              Three strategic hubs. One seamless operation. Our offices are
              positioned to provide continuous market coverage across every
              major time zone. Click a marker to explore.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Globe — full bleed with overflow hidden */}
      <div className="relative w-full h-[500px] md:h-[650px] -mx-[5%] md:-mx-[8%] lg:-mx-[10%] w-[calc(100%+10%)] md:w-[calc(100%+16%)] lg:w-[calc(100%+20%)]">
        <Globe3D
          markers={allMarkers}
          config={{
            atmosphereColor: "#1b365d",
            atmosphereIntensity: 20,
            bumpScale: 5,
            autoRotateSpeed: 0.3,
          }}
          onMarkerClick={handleMarkerClick}
        />

        {/* Gradient masks for soft edge blending */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--color-cream)] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[var(--color-cream)] to-transparent pointer-events-none z-10" />
      </div>

      {/* Active location preview card */}
      <div className="relative -mt-6 z-20">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border border-[var(--color-divider)] px-10 py-6">
            <div className="flex items-baseline gap-4 mb-2">
              <h3 className="font-[family-name:var(--font-dm-sans)] text-[2rem] font-extralight tracking-[-0.02em] text-[var(--color-ink)] leading-none">
                {activeLocation.city}
              </h3>
              <span className="text-caption text-[var(--color-gold)]">
                {activeLocation.role}
              </span>
            </div>
            <p className="font-[family-name:var(--font-lora)] text-[0.9rem] leading-[1.8] text-[var(--color-ink-muted)]">
              {activeLocation.description}
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* City cards */}
      <div className="rule mb-12 mt-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {LOCATIONS.map((loc, i) => (
          <ScrollReveal key={loc.city} delay={i * 150}>
            <div
              onClick={() => setActiveCity(loc.city)}
              className={`group p-8 md:p-10 border border-transparent cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-[var(--color-divider)] ${
                i < LOCATIONS.length - 1 ? "border-r-0 md:border-r" : ""
              } ${loc.offset} ${
                activeCity === loc.city
                  ? "bg-[var(--color-gold-pale)]/30"
                  : "hover:bg-[var(--color-gold-pale)]/15"
              }`}
            >
              <h3 className="font-[family-name:var(--font-dm-sans)] text-[clamp(2.5rem,4vw,3.5rem)] font-extralight tracking-[-0.02em] text-[var(--color-ink)] mb-2 leading-none">
                {loc.city}
              </h3>
              <p className="text-caption text-[var(--color-ink-muted)] mb-1">
                {loc.role}
              </p>
              <p className="text-caption text-[var(--color-ink-muted)]/60 mb-6">
                {loc.region}
              </p>
              <div className="rule-short mb-6" />
              <p className="font-[family-name:var(--font-lora)] text-[0.9rem] leading-[1.8] text-[var(--color-ink-muted)]">
                {loc.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
