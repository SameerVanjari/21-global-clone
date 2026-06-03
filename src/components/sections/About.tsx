"use client";

import { useEffect, useRef, useState } from "react";

const METRICS_TABLE = [
  { metric: "TOTAL TRADE VOLUME", value: "$12.4B", change: "+18.3%", status: "UP" },
  { metric: "ACTIVE COUNTERPARTIES", value: "347", change: "+12.1%", status: "UP" },
  { metric: "GEOGRAPHIC REACH", value: "54", change: "+5.9%", status: "UP" },
  { metric: "AVG DEAL SIZE", value: "$28.6M", change: "+8.4%", status: "UP" },
  { metric: "SETTLEMENT TIME", value: "T+2", change: "-33%", status: "DOWN" },
  { metric: "DEFAULT RATE", value: "0.02%", change: "-0.01pp", status: "DOWN" },
];

const CAPABILITIES = [
  { name: "ENERGY TRADING", value: 94 },
  { name: "METALS & MINERALS", value: 88 },
  { name: "AGRICULTURAL", value: 76 },
  { name: "TRADE FINANCE", value: 91 },
  { name: "LOGISTICS", value: 85 },
  { name: "RISK ANALYTICS", value: 97 },
];

function ProgressBar({ label, value, isVisible }: { label: string; value: number; isVisible: boolean }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-caption text-foreground">{label}</span>
        <span className="text-caption text-amber">{value}%</span>
      </div>
      <div className="w-full h-2 bg-border">
        <div
          className="h-full bg-amber transition-all duration-[2s] ease-out"
          style={{ width: isVisible ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function MetricRow({
  metric,
  value,
  change,
  status,
  delay,
  isVisible,
}: {
  metric: string;
  value: string;
  change: string;
  status: string;
  delay: number;
  isVisible: boolean;
}) {
  const isUp = status === "UP";
  return (
    <tr
      className="border-b border-border transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <td className="py-3 pr-8 text-caption text-foreground whitespace-nowrap">
        {metric}
      </td>
      <td className="py-3 pr-8 text-caption text-amber font-bold whitespace-nowrap">
        {value}
      </td>
      <td
        className={`py-3 pr-8 text-caption whitespace-nowrap ${
          isUp ? "text-foreground" : "text-destructive"
        }`}
      >
        {change}
      </td>
      <td className="py-3 text-caption whitespace-nowrap">
        <span
          className={`inline-block px-2 py-0.5 ${
            isUp ? "text-amber" : "text-destructive"
          }`}
        >
          [{status}]
        </span>
      </td>
    </tr>
  );
}

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="bg-background border-brutal-thick-t border-brutal-thick-b py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <span className="text-eyebrow text-amber block mb-4">
            <span className="text-amber">{">"}</span> PERFORMANCE METRICS
          </span>
          <h2 className="text-subheading">
            TRACK<span className="text-amber">_</span>RECORD
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-16">
          <div className="border-brutal p-8">
            <h3 className="text-eyebrow text-amber mb-6">
              [QUARTERLY METRICS]
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-8 text-caption text-muted-foreground">
                      METRIC
                    </th>
                    <th className="text-left py-3 pr-8 text-caption text-muted-foreground">
                      VALUE
                    </th>
                    <th className="text-left py-3 pr-8 text-caption text-muted-foreground">
                      &Delta;
                    </th>
                    <th className="text-left py-3 text-caption text-muted-foreground">
                      SIGNAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {METRICS_TABLE.map((row, i) => (
                    <MetricRow
                      key={row.metric}
                      {...row}
                      delay={i * 100}
                      isVisible={isVisible}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-brutal border-l-0 lg:border-l-0 lg:border-brutal-l p-8">
            <h3 className="text-eyebrow text-amber mb-6">
              [CAPABILITY INDEX]
            </h3>
            {CAPABILITIES.map((cap) => (
              <ProgressBar
                key={cap.name}
                label={cap.name}
                value={cap.value}
                isVisible={isVisible}
              />
            ))}
            <div className="section-divider mt-8 mb-4" />
            <p className="text-caption text-muted-foreground">
              <span className="text-amber">{">"}</span> PERFORMANCE SCORES UPDATED IN REAL-TIME
              <br />
              <span className="text-amber">//</span> DATA SOURCE: INTERNAL TRADING LEDGER v4.2
            </p>
          </div>
        </div>

        <div className="border-brutal border-amber-l p-8 bg-surface">
          <p className="text-body mb-4">
            <span className="text-amber font-bold">Twenty1Global Trading LLC</span>
            {" "}operates at the intersection of traditional commodities markets
            and modern execution infrastructure. We are not a marketing
            organization. We are{" "}
            <span className="text-amber font-bold">execution specialists</span>{" "}
            who move physical commodities across continents with precision and
            accountability.
          </p>
          <p className="text-caption text-muted-foreground">
            <span className="text-amber">{">"}</span> FOUNDED: Q2 2019 &nbsp;
            <span className="text-amber">//</span> HEADCOUNT: 140+ &nbsp;
            <span className="text-amber">//</span> REGULATED: DMCC, MAS, FINMA
          </p>
        </div>
      </div>
    </section>
  );
}
