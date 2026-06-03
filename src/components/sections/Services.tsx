import ScrollReveal from "@/components/effects/ScrollReveal";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Energy Commodities",
    description:
      "Crude oil, natural gas, and refined products. We navigate volatile energy markets with deep expertise and strategic foresight.",
    accent: "terracotta" as const,
    icon: (
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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Agricultural Trade",
    description:
      "Grains, oilseeds, and soft commodities. Connecting producers to global markets with reliability and care.",
    accent: "sage" as const,
    icon: (
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
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    title: "Metals & Minerals",
    description:
      "Precious and industrial metals. From mines to manufacturers, we ensure seamless flow across the supply chain.",
    accent: "terracotta" as const,
    icon: (
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
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Risk Management",
    description:
      "Hedging strategies, market intelligence, and price risk solutions designed to protect and grow your portfolio.",
    accent: "sage" as const,
    icon: (
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
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: "Logistics & Supply Chain",
    description:
      "End-to-end logistics management. Shipping, warehousing, and delivery orchestrated with precision across continents.",
    accent: "terracotta" as const,
    icon: (
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
          d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
        />
      </svg>
    ),
  },
  {
    title: "Market Intelligence",
    description:
      "Real-time data, trend analysis, and actionable insights. Stay ahead with intelligence that moves at the speed of the market.",
    accent: "sage" as const,
    icon: (
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
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-surface py-24 lg:py-32">
      {/* Leaf vein pattern */}
      <div className="leaf-vein absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <p className="mb-3 font-[family-name:var(--font-body)] text-sm font-medium tracking-widest text-sage-dark uppercase">
            What We Do
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-light italic text-bark sm:text-5xl lg:text-6xl">
            Services rooted in{" "}
            <span className="font-medium text-terracotta not-italic">
              expertise
            </span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 80}>
              <div
                className={cn(
                  "group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1",
                  "cursor-default",
                  service.accent === "terracotta"
                    ? "bg-cream hover:shadow-xl hover:shadow-terracotta/10"
                    : "bg-cream hover:shadow-xl hover:shadow-sage/10"
                )}
                style={{
                  borderRadius: "40px 20px 40px 20px / 30px 40px 20px 40px",
                }}
              >
                <div
                  className={cn(
                    "absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 transition-opacity duration-500 group-hover:opacity-20",
                    service.accent === "terracotta"
                      ? "bg-terracotta"
                      : "bg-sage"
                  )}
                />

                <div
                  className={cn(
                    "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl",
                    service.accent === "terracotta"
                      ? "bg-terracotta/10 text-terracotta"
                      : "bg-sage/10 text-sage-dark"
                  )}
                  style={{
                    borderRadius: "28px 18px 28px 18px / 20px 28px 16px 28px",
                  }}
                >
                  {service.icon}
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-bark">
                  {service.title}
                </h3>

                <p className="mt-3 font-[family-name:var(--font-body)] text-sm leading-relaxed text-clay">
                  {service.description}
                </p>

                <div
                  className={cn(
                    "mt-6 h-px w-12 transition-all duration-500 group-hover:w-full",
                    service.accent === "terracotta" ? "bg-sand" : "bg-sand"
                  )}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
