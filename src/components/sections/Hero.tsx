"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/effects/ScrollReveal";

const DitherShader = dynamic(
  () => import("@/components/ui/dither-shader").then((m) => m.default),
  { ssr: false },
);

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center section-padding pt-36 pb-20 overflow-hidden"
    >
      {/* Dithered mountain background — right side only */}
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage: "linear-gradient(to right, transparent 30%, black 60%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 30%, black 60%)",
        }}
      >
        <DitherShader
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2670&auto=format&fit=crop"
          gridSize={1}
          ditherMode="bayer"
          colorMode="grayscale"
          invert={false}
          animated={true}
          animationSpeed={0.03}
          primaryColor="#1a1a2e"
          secondaryColor="#fbf8f4"
          threshold={0.55}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay to blend background into cream */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-cream)]/60 via-[var(--color-cream)]/40 to-[var(--color-cream)]/95 pointer-events-none" />
      </div>

      {/* Background numeral */}
      <div className="absolute top-[15%] right-[5%] md:right-[8%] lg:right-[10%] numeral select-none pointer-events-none z-10">
        01
      </div>

      {/* Subtle grain */}
      <div className="absolute inset-0 grain-overlay z-10" />

      <div className="relative z-20 max-w-[1100px]">
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
          <div className="inline-block glass-eff px-6 py-5 mb-10 max-w-[660px]">
            <p className="text-lead text-[var(--color-ink-muted)] max-w-[620px] leading-[1.85] font-light">
              We source, finance, and deliver high-quality commodities across
              global markets — bridging supply with demand through strategic
              depth and unwavering reliability.
            </p>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={650}>
          <div className="flex flex-wrap gap-6 items-center max-sm:flex-col max-sm:w-full">
            <a
              href="#services"
              className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] font-medium tracking-[0.22em] uppercase text-[var(--color-cream)] bg-[var(--color-ink)] px-8 py-4 hover:bg-[var(--color-gold)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] max-sm:w-full max-sm:text-center"
            >
              Explore Our Work
            </a>
            <a
              href="#about"
              className="font-[family-name:var(--font-dm-sans)] text-[0.7rem] font-medium tracking-[0.22em] uppercase text-[var(--color-ink)]/70 hover:text-[var(--color-ink)] hover:bg-white transition-all duration-300 px-8 py-4 glass-effect rounded-none! max-sm:w-full max-sm:text-center"
            >
              Learn More
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
