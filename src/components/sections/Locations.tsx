"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("@/components/effects/Globe"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "#0a0a0d" }}
    >
      <span className="text-amber text-eyebrow animate-pulse">
        [LOADING_GLOBE...]
      </span>
    </div>
  ),
});

const LOCATIONS = [
  {
    id: "NODE-01",
    city: "DUBAI",
    country: "UAE",
    address: "Unit 704, Almas Tower\nJumeirah Lakes Towers\nDubai, UAE",
    coords: "25.0685° N, 55.1448° E",
    latency: "12ms",
    timezone: "GST (UTC+4)",
    status: "ONLINE",
    flag: "DIFC / DMCC REGULATED",
  },
  {
    id: "NODE-02",
    city: "SINGAPORE",
    country: "SG",
    address: "Level 28, One Raffles Place\n1 Raffles Place\nSingapore 048616",
    coords: "1.2839° N, 103.8512° E",
    latency: "28ms",
    timezone: "SGT (UTC+8)",
    status: "ONLINE",
    flag: "MAS REGULATED",
  },
  {
    id: "NODE-03",
    city: "ZUG",
    country: "CH",
    address: "Baarerstrasse 78\n6300 Zug\nSwitzerland",
    coords: "47.1662° N, 8.5155° E",
    latency: "45ms",
    timezone: "CET (UTC+1)",
    status: "ONLINE",
    flag: "FINMA REGULATED",
  },
];

function PingIndicator({ latency }: { latency: string }) {
  return (
    <span className="text-caption text-amber">
      <span className="inline-block w-2 h-2 bg-amber mr-1 animate-pulse" />
      {latency}
    </span>
  );
}

export default function Locations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="bg-surface border-brutal-thick-t border-brutal-thick-b relative overflow-hidden"
    >
      {/* ── Globe container ── */}
      <div className="relative h-[500px] md:h-[650px] w-full">
        <Globe className="absolute inset-0" />

        {/* Top gradient mask */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, #0a0a0d, transparent)",
          }}
        />

        {/* Bottom gradient mask */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, #141418, transparent)",
          }}
        />
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-7xl px-6 pb-24 relative z-10">
        <div className="mb-16">
          <span className="text-eyebrow text-amber block mb-4">
            <span className="text-amber">&gt;</span> GLOBAL NODES
          </span>
          <h2 className="text-subheading">
            NETWORK<span className="text-amber">_</span>TOPOLOGY
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div className="border-brutal bg-background p-6 mb-8">
          <pre className="text-terminal text-muted-foreground font-mono">
            <code>{`$ tree /twenty1global/nodes/
├── node-01/  <DUBAI>
│   ├── trading-desk.active
│   ├── compliance.pass
│   └── latency: 12ms
├── node-02/  <SINGAPORE>
│   ├── trading-desk.active
│   ├── compliance.pass
│   └── latency: 28ms
└── node-03/  <ZUG>
    ├── trading-desk.active
    ├── compliance.pass
    └── latency: 45ms

3 nodes operational — 0 alerts`}</code>
          </pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {LOCATIONS.map((loc, i) => (
            <div
              key={loc.id}
              className="border-brutal border-amber-l p-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease-out ${
                  i * 150
                }ms, transform 0.5s ease-out ${i * 150}ms`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-eyebrow text-amber">[{loc.id}]</span>
                <span className="text-caption text-amber">
                  [{loc.status}]
                </span>
              </div>

              <h3 className="text-subheading mb-1">{loc.city}</h3>
              <span className="text-caption text-muted-foreground block mb-4">
                {loc.country}
              </span>

              <p className="text-caption text-foreground whitespace-pre-line mb-4">
                {loc.address}
              </p>

              <div className="border-brutal-t pt-4 space-y-2">
                <div className="flex justify-between text-caption">
                  <span className="text-muted-foreground">COORDS</span>
                  <span className="text-foreground">{loc.coords}</span>
                </div>
                <div className="flex justify-between text-caption">
                  <span className="text-muted-foreground">LATENCY</span>
                  <PingIndicator latency={loc.latency} />
                </div>
                <div className="flex justify-between text-caption">
                  <span className="text-muted-foreground">TZ</span>
                  <span className="text-foreground">{loc.timezone}</span>
                </div>
                <div className="flex justify-between text-caption">
                  <span className="text-muted-foreground">REGULATOR</span>
                  <span className="text-amber">{loc.flag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
