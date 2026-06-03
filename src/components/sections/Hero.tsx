import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center section-padding pt-36 pb-20 overflow-hidden"
    >
      {/* Background numeral */}
      <div className="absolute top-[15%] right-[5%] md:right-[8%] lg:right-[10%] numeral select-none pointer-events-none">
        01
      </div>

      {/* Subtle grain */}
      <div className="absolute inset-0 grain-overlay" />

      <div className="max-w-[1100px]">
        {/* Eyebrow */}
        <ScrollReveal delay={100}>
          <span className="block text-eyebrow text-[var(--color-gold)] mb-8">
            Established 2016
          </span>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={250}>
          <h1 className="text-heading-xl text-[var(--color-ink)] mb-8 max-w-[900px]">
            Global trade,
            <br />
            <span className="italic font-[family-name:var(--font-lora)] font-normal tracking-normal">
              delivered with precision
            </span>
          </h1>
        </ScrollReveal>

        {/* Rule */}
        <ScrollReveal delay={400}>
          <div className="rule-short mb-8" />
        </ScrollReveal>

        {/* Lead paragraph */}
        <ScrollReveal delay={500}>
          <p className="text-lead text-[var(--color-ink-muted)] max-w-[620px] mb-10 leading-[1.85] font-light">
            We source, finance, and deliver high-quality commodities across
            global markets — bridging supply with demand through strategic
            depth and unwavering reliability.
          </p>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={650}>
          <div className="flex flex-wrap gap-6 items-center">
            <a
              href="#services"
              className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] font-medium tracking-[0.22em] uppercase text-[var(--color-cream)] bg-[var(--color-ink)] px-8 py-4 hover:bg-[var(--color-gold)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              Explore Our Work
            </a>
            <a
              href="#about"
              className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] font-medium tracking-[0.22em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300 border-b border-[var(--color-divider-strong)] pb-1 hover:border-[var(--color-ink)]"
            >
              Learn More
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
