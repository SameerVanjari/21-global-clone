import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Hero() {
  return (
    <section
      id="hero"
      className="section-swiss pt-48 pb-32 max-md:pt-32 max-md:pb-20"
    >
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <p className="precision-label mb-8">
            Twenty1Global Trading LLC
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="text-[3.75rem] leading-[1.05] font-light tracking-[-0.02em] text-foreground max-w-[900px] max-md:text-[2.5rem]">
            Global commodities trading
            <br />
            with Swiss precision
            <span className="text-accent">.</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg leading-relaxed text-muted max-w-[560px] mt-12 max-md:mt-8 max-md:text-base">
            Twenty1Global operates at the intersection of disciplined Swiss
            methodology and high-growth global markets. Physical and financial
            commodities trading across energy, metals, and agriculture.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex gap-16 mt-16 max-md:flex-col max-md:gap-8 max-md:mt-12">
            <div>
              <p className="text-[2.5rem] font-light tracking-[-0.02em] text-foreground count-number max-md:text-[2rem]">
                $4.2B
              </p>
              <p className="text-xs text-muted mt-2 tracking-[0.08em] uppercase">
                Annual turnover
              </p>
            </div>
            <div>
              <p className="text-[2.5rem] font-light tracking-[-0.02em] text-foreground count-number max-md:text-[2rem]">
                3
              </p>
              <p className="text-xs text-muted mt-2 tracking-[0.08em] uppercase">
                Global offices
              </p>
            </div>
            <div>
              <p className="text-[2.5rem] font-light tracking-[-0.02em] text-foreground count-number max-md:text-[2rem]">
                12+
              </p>
              <p className="text-xs text-muted mt-2 tracking-[0.08em] uppercase">
                Years in operation
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
