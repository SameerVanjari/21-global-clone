"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden geometric-sunburst"
    >
      {/* Background geometric decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold-300/5 animate-geometric" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold-300/5 animate-geometric-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-gold-300/[0.07] animate-geometric" />

        {/* Golden geometric lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold-300/10 to-transparent" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-gradient-to-r from-transparent via-gold-300/10 to-transparent" />

        {/* Diagonal rays */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[400px] bg-gold-300/5 rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[400px] bg-gold-300/5 -rotate-45" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-gold-300/5 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <ScrollReveal sparkle>
          <p className="text-champagne/60 text-xs tracking-[0.4em] uppercase mb-8 font-light">
            Twenty1Global Trading LLC
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} sparkle>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.02em] leading-[1.05] mb-8">
            <span className="gold-text-gradient">
              Precision
              <br />
              Refined by
              <br />
              <span className="italic">Geometry</span>
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300/50" />
            <span className="diamond-marker w-[6px] h-[6px]" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300/50" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <p className="text-champagne/50 text-base sm:text-lg font-light tracking-wider max-w-2xl mx-auto mb-12 leading-relaxed">
            Global commodities trading reimagined through the lens of Art Deco mastery.
            <br />
            Operating across <span className="text-gold-300/80">Dubai</span>,{" "}
            <span className="text-gold-300/80">Singapore</span>, and{" "}
            <span className="text-gold-300/80">Geneva</span>.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#contact"
              className="group relative px-10 py-4 bg-gold-300 text-deep font-display text-sm tracking-[0.2em] uppercase hover:bg-gold-200 transition-all duration-500"
            >
              <span className="relative z-10">Inquire Now</span>
              <span className="absolute inset-0 border border-gold-300 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <a
              href="#services"
              className="px-10 py-4 border border-gold-300/30 text-gold-300 font-display text-sm tracking-[0.2em] uppercase hover:border-gold-300 hover:bg-gold-300/5 transition-all duration-500"
            >
              Our Expertise
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
        <span className="text-champagne/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold-300/40 to-transparent" />
      </div>
    </section>
  );
}
