"use client";

import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const Globe = dynamic(
  () => import("@/components/effects/Globe").then((mod) => ({ default: mod.Globe })),
  { ssr: false },
);

const locations = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Almas Tower, Level 23",
    district: "DMCC Free Zone",
    coordinates: "25\u00b004\u2019N 55\u00b008\u2019E",
    timezone: "GST (UTC+4)",
    description:
      "Our Middle East headquarters, positioned in the world\u2019s most dynamic commodities hub. Direct access to Gulf energy markets and Asian demand centres.",
    label: "dxb",
    lat: 25.2,
    lng: 55.3,
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "One Raffles Place, Level 42",
    district: "Central Business District",
    coordinates: "1\u00b017\u2019N 103\u00b051\u2019E",
    timezone: "SGT (UTC+8)",
    description:
      "Gateway to APAC markets. LNG, metals, and agricultural flows through Southeast Asia\u2019s premier trading and financial centre.",
    label: "sin",
    lat: 1.35,
    lng: 103.8,
  },
  {
    city: "Geneva",
    country: "Switzerland",
    address: "Rue du Rh\u00f4ne 42",
    district: "Quartier des Banques",
    coordinates: "46\u00b012\u2019N 6\u00b008\u2019E",
    timezone: "CET (UTC+1)",
    description:
      "Our global headquarters. The home of Swiss precision \u2014 risk management, structured finance, and corporate strategy driven from the heart of Europe.",
    label: "gva",
    lat: 46.2,
    lng: 6.15,
  },
];

export function Locations() {
  return (
    <section id="locations" className="bg-white">
      <div className="section-divider" />
      <div className="section-swiss">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal>
            <p className="precision-label mb-6">Global presence</p>
            <h2 className="text-[2.25rem] font-light tracking-[-0.02em] text-foreground max-w-[600px] max-md:text-[1.75rem]">
              Three offices. One methodology
              <span className="text-accent">.</span>
            </h2>
          </ScrollReveal>

          <div className="relative overflow-hidden mt-20 max-md:mt-12">
            {/* Top gradient mask */}
            <div
              className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: "80px",
                background: "linear-gradient(to top, transparent, #ffffff)",
              }}
            />

            <div className="grid-swiss items-start">
              <div
                className="col-span-6 max-md:col-span-4 relative"
                style={{ height: "480px" }}
              >
                <Globe />
              </div>

              <div className="col-span-6 max-md:col-span-4 max-md:mt-8">
                <ScrollReveal delay={150}>
                  <div className="space-y-10">
                    <div className="flex items-start gap-4">
                      <div
                        className="mt-1.5 flex-shrink-0"
                        style={{
                          width: "24px",
                          height: "2px",
                          backgroundColor: "#e63946",
                        }}
                      />
                      <p className="text-base leading-relaxed text-muted max-w-[420px]">
                        Our network spans the world&apos;s most critical
                        commodities corridors. Three strategic locations,
                        synchronised to the same precision.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {locations.map((loc) => (
                        <div key={loc.city} className="flex items-center gap-4">
                          <div
                            className="flex-shrink-0"
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#e63946",
                            }}
                          />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {loc.city}
                            </p>
                            <p className="text-xs text-muted lowercase">
                              {loc.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Bottom gradient mask */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: "80px",
                background: "linear-gradient(to bottom, transparent, #ffffff)",
              }}
            />
          </div>

          <div className="grid-swiss mt-24 max-md:mt-16">
            {locations.map((location, index) => (
              <ScrollReveal
                key={location.city}
                delay={index * 100}
                className="col-span-4 max-md:col-span-4"
              >
                <div className="border-t border-border pt-8 max-md:pt-6">
                  <div className="circle-image mb-8 flex items-center justify-center max-md:mb-6">
                    <div className="text-muted text-xs font-medium tracking-[0.1em] uppercase text-center leading-tight">
                      {location.city
                        .split("")
                        .map((c) =>
                          c === c.toUpperCase() && c !== " " ? c : "",
                        )
                        .join("")
                        .slice(0, 3)}
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-foreground">
                    {location.city}
                    <span className="text-accent">.</span>
                  </h3>
                  <p className="text-xs text-muted mt-1 tracking-[0.06em] uppercase">
                    {location.country}
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] text-muted mt-0.5 shrink-0 w-14 tracking-[0.06em] uppercase">
                        Address
                      </span>
                      <span className="text-xs text-foreground leading-relaxed">
                        {location.address}
                        <br />
                        {location.district}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] text-muted mt-0.5 shrink-0 w-14 tracking-[0.06em] uppercase">
                        Geo
                      </span>
                      <span className="text-xs text-foreground">
                        {location.coordinates}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] text-muted mt-0.5 shrink-0 w-14 tracking-[0.06em] uppercase">
                        Time
                      </span>
                      <span className="text-xs text-foreground">
                        {location.timezone}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted mt-6 max-w-[320px]">
                    {location.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
