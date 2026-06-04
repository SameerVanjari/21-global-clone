import ScrollReveal from "@/components/effects/ScrollReveal";

const SERVICES = [
  {
    numeral: "01",
    title: "Commodity Trading",
    description:
      "Strategic sourcing and delivery of agricultural commodities, metals, and energy products across global supply chains. We bridge producers and consumers with precision timing and market intelligence.",
  },
  {
    numeral: "02",
    title: "FMCG Distribution",
    description:
      "End-to-end distribution of fast-moving consumer goods across the Middle East, Africa, and Asia. From procurement to last-mile delivery, we ensure seamless market access.",
  },
  {
    numeral: "03",
    title: "Downstream Oil & Gas",
    description:
      "Specialised in refined petroleum products, lubricants, and petrochemicals. Our downstream operations connect refineries with industrial and retail networks worldwide.",
  },
  {
    numeral: "04",
    title: "Global Logistics",
    description:
      "Integrated freight forwarding, warehousing, and supply chain solutions. We orchestrate complex multimodal movements with absolute reliability and real-time visibility.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding">
      {/* Section header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
        <div className="lg:col-span-4">
          <ScrollReveal>
            <span className="block text-eyebrow text-[var(--color-gold)] mb-6">
              Our Capabilities
            </span>
            <h2 className="text-heading text-[var(--color-ink)]">
              What we do
            </h2>
          </ScrollReveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ScrollReveal delay={150}>
            <p className="text-body text-[var(--color-ink-muted)] leading-[1.9]">
              Four interconnected divisions operating as a single, cohesive
              engine. Each discipline reinforces the others, creating a trading
              ecosystem that is greater than the sum of its parts.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="rule mb-16 lg:mb-24" />

      {/* Services grid — asymmetric editorial layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {SERVICES.map((service, i) => (
          <ScrollReveal key={service.numeral} delay={i * 100}>
            <div
              className={`group p-8 md:p-10 lg:p-12 border border-transparent hover:bg-[var(--color-gold-pale)]/30 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i % 2 === 0
                  ? "border-r-0 md:border-r md:border-b"
                  : "border-b"
              } ${
                i >= SERVICES.length - 2 ? "border-b-0" : ""
              } border-[var(--color-divider)]`}
            >
              {/* Numeral */}
              <span className="block font-[family-name:var(--font-dm-sans)] text-[4rem] md:text-[5rem] font-thin leading-none tracking-[-0.03em] text-[var(--color-ink)]/15 mb-6 select-none transition-colors duration-500 group-hover:text-[var(--color-gold)]/40">
                {service.numeral}
              </span>

              <h3 className="text-subhead text-[var(--color-ink)] mb-4">
                {service.title}
              </h3>

              <p className="text-body text-[var(--color-ink-muted)] leading-[1.85] max-w-[420px]">
                {service.description}
              </p>

              {/* Subtle hover indicator */}
              <div className="mt-6 w-0 group-hover:w-8 h-[1px] bg-[var(--color-gold)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
