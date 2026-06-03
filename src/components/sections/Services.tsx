"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";

const SERVICES = [
  {
    id: "01",
    title: "Commodity Execution",
    description:
      "Ultra-low latency trade execution across global energy, metals, and agricultural markets. Direct market access with institutional-grade infrastructure.",
    tags: ["Crude Oil", "Nat Gas", "Metals", "Grains"],
  },
  {
    id: "02",
    title: "Logistics Orchestration",
    description:
      "End-to-end supply chain management with real-time vessel tracking, port optimization, and predictive routing algorithms across all major trade lanes.",
    tags: ["Shipping", "Storage", "Port Ops", "Routing"],
  },
  {
    id: "03",
    title: "Risk Analytics",
    description:
      "AI-powered risk modeling and real-time exposure monitoring. Advanced hedging strategies with scenario simulation across multi-currency portfolios.",
    tags: ["VaR", "Hedging", "FX Risk", "Credit"],
  },
  {
    id: "04",
    title: "Market Intelligence",
    description:
      "Proprietary data feeds, satellite imagery analysis, and predictive market signals. Actionable intelligence delivered through our cyber-trade terminal.",
    tags: ["Satellite", "Sentiment", "Forecasts", "API"],
  },
  {
    id: "05",
    title: "Structured Finance",
    description:
      "Trade finance solutions, prepayment structures, and inventory monetization. Bespoke financing for complex cross-border commodity transactions.",
    tags: ["LC", "Prepay", "Inventory", "Structured"],
  },
  {
    id: "06",
    title: "Regulatory Compliance",
    description:
      "Automated KYC/AML screening, sanctions monitoring, and cross-jurisdictional regulatory reporting. Full audit trail with blockchain-verified records.",
    tags: ["KYC", "Sanctions", "Audit", "Blockchain"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 bg-[#06060b] overflow-hidden section-angled"
    >
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(0, 240, 255, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(255, 0, 229, 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal variant="holo-fade">
          <div className="text-center mb-16">
            <div
              className="inline-block glass px-4 py-1.5 text-xs tracking-[0.3em] uppercase mb-6"
              style={{
                color: "#ff00e5",
                textShadow: "0 0 8px rgba(255, 0, 229, 0.5)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Module 02 // Capabilities
            </div>
            <h2
              className="text-4xl sm:text-5xl font-light tracking-wider mb-4"
              style={{ color: "#e0e8ff" }}
            >
              Trading <span style={{ color: "#00f0ff" }}>Infrastructure</span>
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#667799" }}>
              Institutional-grade systems engineered for the demands of modern
              global commodities markets.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ScrollReveal
              key={service.id}
              variant="scale-in"
              delay={index * 100}
            >
              <div
                className="group relative glass holo-shimmer p-8 transition-all duration-500 cursor-default"
                style={{ borderRadius: "2px" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(0, 240, 255, 0.4)";
                  e.currentTarget.style.boxShadow =
                    "0 0 40px rgba(0, 240, 255, 0.08), inset 0 0 40px rgba(0, 240, 255, 0.03), 0 0 0 1px rgba(0, 240, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(0, 240, 255, 0.15)";
                  e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(0, 240, 255, 0.05), inset 0 0 30px rgba(0, 240, 255, 0.02)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="hud-bracket relative">
                  <div
                    className="text-5xl font-bold tracking-tight mb-6"
                    style={{
                      color: "rgba(0, 240, 255, 0.08)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {service.id}
                  </div>

                  <h3
                    className="text-lg font-medium tracking-wide mb-3"
                    style={{ color: "#e0e8ff" }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "#667799" }}
                  >
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] tracking-wider uppercase"
                        style={{
                          color: "#00f0ff",
                          background: "rgba(0, 240, 255, 0.06)",
                          border: "1px solid rgba(0, 240, 255, 0.1)",
                          borderRadius: "1px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500"
                  style={{
                    background: "rgba(0, 240, 255, 0.2)",
                    boxShadow: "0 0 10px rgba(0, 240, 255, 0.3)",
                  }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
