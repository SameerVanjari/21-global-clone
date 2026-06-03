"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { MapPin } from "lucide-react";

const Globe = dynamic(() => import("@/components/effects/Globe"), { ssr: false });

const locations = [
  {
    city: "Dubai",
    region: "United Arab Emirates",
    description:
      "Our global headquarters in the Dubai International Financial Centre. The nexus of East-West trade, where energy meets capital.",
    time: "GMT+4",
    coordinates: "25.2048° N, 55.2708° E",
  },
  {
    city: "Singapore",
    region: "Republic of Singapore",
    description:
      "Asia-Pacific hub at Marina Bay Financial Centre. Gateway to the world's fastest-growing commodity markets.",
    time: "GMT+8",
    coordinates: "1.3521° N, 103.8198° E",
  },
  {
    city: "Geneva",
    region: "Switzerland",
    description:
      "European trading desk on Rue du Rhône. The epicenter of global commodity finance and maritime trade.",
    time: "GMT+1",
    coordinates: "46.2044° N, 6.1432° E",
  },
];

export default function Locations() {
  return (
    <section id="locations" className="relative py-24 lg:py-32 scroll-section overflow-hidden bg-deep">
      {/* Section header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <ScrollReveal sparkle>
            <p className="text-gold-300/60 text-xs tracking-[0.4em] uppercase mb-4 font-light">
              Global Presence
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream tracking-[0.03em] mb-6">
              Three <span className="italic gold-text-gradient">Capitals</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300/40" />
              <span className="diamond-marker w-[5px] h-[5px]" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300/40" />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Globe area */}
      <ScrollReveal delay={0.3}>
        <div className="relative w-full mb-16 overflow-hidden">
          <div className="relative w-full h-[500px] md:h-[650px]">
            {/* Top gradient mask */}
            <div
              className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-10"
              style={{
                background: "linear-gradient(to top, transparent 0%, #0a0c10 100%)",
              }}
            />
            {/* Bottom gradient mask */}
            <div
              className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10"
              style={{
                background: "linear-gradient(to bottom, transparent 0%, #0a0c10 100%)",
              }}
            />
            <Globe className="w-full h-full block" />
          </div>
        </div>
      </ScrollReveal>

      {/* Geometric divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal delay={0.4}>
          <div className="max-w-xl mx-auto mb-16">
            <div className="ornate-divider" />
          </div>
        </ScrollReveal>

        {/* Three-column city cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-gold-300/5 max-w-5xl mx-auto">
          {locations.map((loc, i) => (
            <ScrollReveal key={loc.city} delay={0.5 + 0.15 * i} direction="up">
              <div className="group relative bg-surface p-8 lg:p-10 transition-all duration-500 hover:bg-navy-50/30">
                {/* Top gold accent */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent group-hover:via-gold-300/60 transition-all duration-500" />

                {/* Map pin icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <MapPin
                      size={22}
                      className="text-gold-300 group-hover:text-gold-200 transition-colors duration-500"
                      strokeWidth={1.5}
                    />
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-300 rounded-full" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-gold-300/20 to-transparent" />
                </div>

                {/* City name */}
                <h3 className="font-display text-xl text-gold-300 tracking-[0.08em] mb-1 group-hover:text-gold-200 transition-colors duration-500">
                  {loc.city}
                </h3>
                <p className="text-champagne/40 text-xs tracking-[0.2em] uppercase mb-6 font-light">
                  {loc.region}
                </p>

                {/* Description */}
                <p className="text-champagne/50 text-sm leading-relaxed tracking-wider font-light mb-6">
                  {loc.description}
                </p>

                {/* Details */}
                <div className="space-y-2 pt-4 border-t border-gold-300/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-champagne/30 tracking-[0.1em] uppercase">Timezone</span>
                    <span className="text-champagne/50 font-light">{loc.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-champagne/30 tracking-[0.1em] uppercase">
                      Coordinates
                    </span>
                    <span className="text-champagne/50 font-light">{loc.coordinates}</span>
                  </div>
                </div>

                {/* Bottom diamond accent */}
                <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="diamond-marker w-[4px] h-[4px]" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
