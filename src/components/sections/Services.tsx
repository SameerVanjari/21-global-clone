import { ScrollReveal } from "@/components/effects/ScrollReveal";

const services = [
  {
    number: "01",
    title: "Crude Oil & Refined Products",
    description:
      "Physical trading of crude oil and refined petroleum products across global markets. Structured supply chains with end-to-end logistics management.",
  },
  {
    number: "02",
    title: "Liquefied Natural Gas",
    description:
      "LNG sourcing, shipping, and delivery. Long-term supply agreements and spot market trading across APAC and European corridors.",
  },
  {
    number: "03",
    title: "Base & Precious Metals",
    description:
      "Copper, aluminum, zinc, and precious metals trading. Mine-to-market flows with financing and hedging strategies tailored to producer needs.",
  },
  {
    number: "04",
    title: "Agricultural Commodities",
    description:
      "Grains, oilseeds, and soft commodities. Origination from major producing regions with distribution to key demand centres worldwide.",
  },
  {
    number: "05",
    title: "Risk Management",
    description:
      "Derivatives, hedging strategies, and structured finance. Quantitative models built on Swiss mathematical rigour to protect and optimise positions.",
  },
  {
    number: "06",
    title: "Trade Finance & Logistics",
    description:
      "Letters of credit, supply chain finance, freight, warehousing, and inspection. Every link in the chain managed with precision and accountability.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-paper">
      <div className="section-divider" />
      <div className="section-swiss">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal>
            <p className="precision-label mb-6">What we do</p>
            <h2 className="text-[2.25rem] font-light tracking-[-0.02em] text-foreground max-w-[600px] max-md:text-[1.75rem]">
              Commodities trading engineered for precision
              <span className="text-accent">.</span>
            </h2>
          </ScrollReveal>

          <div className="grid-swiss mt-20 max-md:mt-12">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.number}
                delay={index * 80}
                className="col-span-4 max-md:col-span-4"
              >
                <div className="border-t border-border pt-8 max-md:pt-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="circle-image w-12 h-12 flex items-center justify-center bg-accent">
                      <span className="text-white text-xs font-medium">
                        {service.number}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-base font-medium text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted max-w-[320px]">
                    {service.description}
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
