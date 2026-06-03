import ScrollReveal from "@/components/effects/ScrollReveal";

const SERVICES = [
  {
    num: "01",
    title: "Physical Commodities",
    description:
      "Direct sourcing, logistics, and delivery of crude oil, refined petroleum products, LNG, metals, and agricultural commodities across global markets.",
  },
  {
    num: "02",
    title: "Risk Management",
    description:
      "Comprehensive hedging strategies and market intelligence to protect against price volatility, currency fluctuations, and geopolitical uncertainty.",
  },
  {
    num: "03",
    title: "Trade Finance",
    description:
      "Structured financing solutions including letters of credit, supply chain finance, and pre-export facilities tailored to each transaction.",
  },
  {
    num: "04",
    title: "Market Intelligence",
    description:
      "Proprietary research and analysis across energy, metals, and agricultural markets. Data-driven insights into supply-demand dynamics.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="min-h-screen px-8 md:px-16 py-24 md:py-32 flex flex-col justify-center"
      style={{ backgroundColor: "#f5f2ed" }}
    >
      <div className="max-w-[1600px] mx-auto w-full">
        <ScrollReveal>
          <p className="text-xs font-light tracking-[0.4em] uppercase text-[#1a1a1a]/30 mb-20">
            What We Do
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.num} delay={i * 150}>
              <div className="group py-16 md:py-20 pr-0 md:pr-16">
                <span className="block text-[clamp(3rem,8vw,8rem)] font-extralight leading-none tracking-[-0.04em] text-[#1a1a1a]/8 mb-6 select-none">
                  {svc.num}
                </span>
                <h3 className="text-lg md:text-xl font-light tracking-[0.15em] uppercase text-[#1a1a1a] mb-4">
                  {svc.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-[#1a1a1a]/50 max-w-xs">
                  {svc.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
