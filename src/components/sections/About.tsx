import { ScrollReveal } from "@/components/effects/ScrollReveal";

const dataPoints = [
  { value: "2012", label: "Founded in Zug, Switzerland" },
  { value: "47", label: "Active trading counterparties" },
  { value: "18", label: "Markets across EMEA and APAC" },
  { value: "ISO 9001", label: "Certified quality management" },
];

export function About() {
  return (
    <section id="about">
      <div className="section-divider" />
      <div className="section-swiss">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid-swiss">
            <div className="col-span-5 max-md:col-span-4">
              <ScrollReveal>
                <p className="precision-label mb-6">About us</p>
                <h2 className="text-[2.25rem] font-light tracking-[-0.02em] text-foreground max-w-[500px] max-md:text-[1.75rem]">
                  A Swiss methodology applied to global markets
                  <span className="text-accent">.</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="mt-12 flex items-start gap-4 max-md:mt-8">
                  <div
                    className="mt-1 flex-shrink-0"
                    style={{
                      width: "24px",
                      height: "2px",
                      backgroundColor: "#e63946",
                    }}
                  />
                  <p className="text-lg leading-relaxed text-muted max-w-[460px] max-md:text-base">
                    Founded in Zug, Switzerland, Twenty1Global brings the Swiss
                    values of precision, discretion, and reliability to the
                    volatile world of commodities trading. We operate at the
                    intersection of disciplined methodology and high-growth
                    markets.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <blockquote className="mt-12 pl-0 border-l-0 max-md:mt-8">
                  <p className="text-xl font-light leading-relaxed text-foreground max-w-[440px] max-md:text-lg">
                    &ldquo;We don&apos;t speculate. We structure. Every trade is
                    a calculation, not a gamble.&rdquo;
                  </p>
                  <footer className="mt-4">
                    <p className="text-xs text-muted tracking-[0.08em] uppercase">
                      — Twenty1Global Trading Mandate
                    </p>
                  </footer>
                </blockquote>
              </ScrollReveal>
            </div>

            <div className="col-span-6 col-start-7 max-md:col-span-4 max-md:col-start-1 max-md:mt-12">
              <ScrollReveal delay={200}>
                <div className="grid grid-cols-2 gap-0">
                  {dataPoints.map((point, i) => (
                    <div
                      key={point.label}
                      className="border-t border-border pt-8 pb-8 pr-8 max-md:pt-6 max-md:pb-6"
                      style={{
                        borderRight:
                          i % 2 === 0 ? "1px solid #e5e5e5" : "none",
                        paddingLeft: i % 2 === 1 ? "2rem" : "0",
                      }}
                    >
                      <p className="text-[1.75rem] font-light tracking-[-0.02em] text-foreground count-number max-md:text-[1.5rem]">
                        {point.value}
                      </p>
                      <p className="text-xs text-muted mt-2 leading-relaxed max-w-[160px]">
                        {point.label}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
