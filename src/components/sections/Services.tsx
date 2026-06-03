"use client";

import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    id: "SVC-001",
    title: "Physical Commodities",
    desc: "// End-to-end physical trading of crude oil, refined products, LNG, and metals across global markets.",
    stats: [
      { label: "VOLUME", value: 850000, suffix: " MT/yr" },
      { label: "COUNTERPARTIES", value: 120, suffix: "+" },
    ],
  },
  {
    id: "SVC-002",
    title: "Trade Finance",
    desc: "// Structured trade finance solutions with access to global capital markets and multilateral institutions.",
    stats: [
      { label: "FACILITIES", value: 2500, suffix: "M USD" },
      { label: "JURISDICTIONS", value: 18, suffix: "" },
    ],
  },
  {
    id: "SVC-003",
    title: "Risk Management",
    desc: "// Comprehensive hedging strategies across FX, interest rates, and commodity price volatility exposures.",
    stats: [
      { label: "HEDGED EXPOSURE", value: 4200, suffix: "M USD" },
      { label: "CORRELATION", value: 0.94, suffix: "" },
    ],
  },
  {
    id: "SVC-004",
    title: "Logistics",
    desc: "// Global freight, chartering, warehousing, and supply chain orchestration for bulk commodities.",
    stats: [
      { label: "ROUTES", value: 340, suffix: "+" },
      { label: "THROUGHPUT", value: 560, suffix: "K TEU" },
    ],
  },
  {
    id: "SVC-005",
    title: "Market Intelligence",
    desc: "// Proprietary data feeds, satellite monitoring, and predictive analytics for commodity markets.",
    stats: [
      { label: "DATA POINTS", value: 12, suffix: "M/day" },
      { label: "ACCURACY", value: 96.8, suffix: "%" },
    ],
  },
  {
    id: "SVC-006",
    title: "Compliance",
    desc: "// Multi-jurisdictional regulatory compliance, sanctions screening, and ESG reporting frameworks.",
    stats: [
      { label: "REGIMES", value: 47, suffix: "" },
      { label: "AUDIT PASS", value: 100, suffix: "%" },
    ],
  },
];

function Counter({
  value,
  suffix,
  isVisible,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  isVisible: boolean;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1800;
    const startValue = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * eased;
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, value]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

export default function Services() {
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
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-surface border-brutal-thick-t border-brutal-thick-b py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <span className="text-eyebrow text-amber block mb-4">
            <span className="text-amber">{">"}</span> CAPABILITIES INDEX
          </span>
          <h2 className="text-subheading">
            EXECUTION<span className="text-amber">_</span>MATRIX
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              className="border-brutal border-amber-l p-6 flex flex-col group hover:bg-background transition-colors"
            >
              <span className="text-eyebrow text-amber mb-3">
                [{svc.id}]
              </span>
              <h3 className="text-nav text-foreground mb-3">{svc.title}</h3>
              <p className="text-caption text-muted-foreground mb-6 flex-1">
                {svc.desc}
              </p>

              <div className="border-brutal-t pt-4 mt-auto grid grid-cols-2 gap-4">
                {svc.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="text-caption text-muted-foreground block">
                      {stat.label}
                    </span>
                    <span className="text-nav text-amber">
                      <Counter
                        value={stat.value}
                        suffix={stat.suffix}
                        isVisible={isVisible}
                        decimals={stat.label === "CORRELATION" || stat.label === "ACCURACY" ? 1 : 0}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-brutal p-4 text-caption text-muted-foreground">
          <span className="text-amber">{">"}</span> TOTAL SERVICES REGISTERED: {SERVICES.length} &nbsp;
          <span className="text-amber">//</span> ALL SYSTEMS NOMINAL
        </div>
      </div>
    </section>
  );
}
