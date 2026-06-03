import ScrollReveal from "@/components/effects/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="section-padding bg-[var(--color-ink)] text-[var(--color-cream)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left column — large statement */}
        <div className="lg:col-span-5">
          <ScrollReveal>
            <span className="block text-eyebrow text-[var(--color-gold)] mb-8">
              Our Philosophy
            </span>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <h2 className="font-[family-name:var(--font-dm-sans)] text-[clamp(2rem,3.5vw,3rem)] font-extralight leading-[1.15] tracking-[0.02em] mb-10">
              Precision is
              <br />
              not a metric.
              <br />
              <span className="italic font-[family-name:var(--font-lora)] font-normal tracking-normal">
                It is a principle.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="rule-short mb-10" style={{ background: "rgba(251,248,244,0.2)" }} />
          </ScrollReveal>
        </div>

        {/* Right column — body text */}
        <div className="lg:col-span-6 lg:col-start-7">
          <ScrollReveal delay={200}>
            <p className="font-[family-name:var(--font-lora)] text-[1.0625rem] leading-[1.9] font-light text-[var(--color-cream)]/75 mb-6">
              Twenty1Global was founded on a singular conviction: that
              international trade, at its best, is an act of precision. Every
              shipment, every contract, every relationship — executed not just
              competently, but flawlessly.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="font-[family-name:var(--font-lora)] text-[1.0625rem] leading-[1.9] font-light text-[var(--color-cream)]/75 mb-8">
              Headquartered in the UAE with strategic offices in Singapore and
              Geneva, we operate at the intersection of the world&apos;s most
              dynamic trade corridors. Our team brings decades of combined
              experience across commodities, FMCG, energy, and logistics —
              united by an unwavering commitment to delivering what we promise,
              when we promise it.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="pull-quote text-[var(--color-cream)]/90 mb-8" style={{ borderLeftColor: "rgba(196,146,74,0.5)" }}>
              <p>
                In a world of variables, we are
                <br />
                the constant.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 lg:mt-28 pt-12" style={{ borderTop: "1px solid rgba(251,248,244,0.08)" }}>
        {[
          { value: "50+", label: "Countries Served" },
          { value: "$2B+", label: "Annual Volume" },
          { value: "2016", label: "Established" },
          { value: "3", label: "Global Offices" },
        ].map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 100}>
            <div>
              <p className="font-[family-name:var(--font-dm-sans)] text-[clamp(2rem,3vw,3rem)] font-extralight tracking-[-0.02em] text-[var(--color-cream)] mb-1">
                {stat.value}
              </p>
              <p className="text-caption text-[var(--color-cream)]/50">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
