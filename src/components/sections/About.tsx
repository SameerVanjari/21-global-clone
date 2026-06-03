"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 scroll-section">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-deep geometric-sunburst" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-gold-300/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <ScrollReveal sparkle>
            <p className="text-gold-300/60 text-xs tracking-[0.4em] uppercase mb-4 font-light">
              Our Legacy
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream tracking-[0.03em] mb-6">
              A Century of <span className="italic gold-text-gradient">Excellence</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300/40" />
              <span className="diamond-marker w-[5px] h-[5px]" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300/40" />
            </div>
          </ScrollReveal>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Left: Image placeholder with gold frame */}
          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-navy-100 to-surface border border-gold-300/20 flex items-center justify-center relative overflow-hidden">
                {/* Abstract geometric pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute border border-gold-300/30"
                        style={{
                          top: `${10 + i * 5}%`,
                          left: `${10 + i * 5}%`,
                          right: `${10 + i * 5}%`,
                          bottom: `${10 + i * 5}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* Center crest */}
                <div className="relative z-10 text-center">
                  <div className="font-display text-6xl text-gold-300/30 mb-2">21</div>
                  <div className="text-champagne/20 text-xs tracking-[0.5em] uppercase">
                    Est. 2010
                  </div>
                </div>
              </div>
              {/* Gold offset border */}
              <div className="absolute inset-0 border border-gold-300 translate-x-3 translate-y-3 -z-10" />
            </div>
          </ScrollReveal>

          {/* Right: Pull quotes */}
          <div className="space-y-10">
            <ScrollReveal delay={0.3}>
              <blockquote className="relative pl-8 border-l-2 border-gold-300/40">
                <p className="font-display italic text-2xl md:text-3xl text-champagne leading-relaxed tracking-[0.02em] mb-4">
                  &ldquo;Markets reward those who move with precision. We trade not on instinct, but
                  on geometric certainty.&rdquo;
                </p>
                <cite className="text-gold-300 text-xs tracking-[0.2em] uppercase not-italic">
                  — Twenty1Global Philosophy
                </cite>
              </blockquote>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <p className="text-champagne/50 text-sm leading-relaxed tracking-wider font-light">
                Founded on the principles of disciplined analysis and strategic foresight,
                Twenty1Global Trading LLC bridges the world&apos;s most vital commodity corridors.
                From the energy markets of the Middle East to the financial centers of Europe and
                the trade hubs of Southeast Asia, our presence is defined by impeccable execution.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="flex gap-8 pt-6">
                <div className="text-center">
                  <div className="font-display text-3xl gold-text-gradient">$2B+</div>
                  <div className="text-champagne/40 text-[10px] tracking-[0.3em] uppercase mt-1">
                    Annual Volume
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-display text-3xl gold-text-gradient">30+</div>
                  <div className="text-champagne/40 text-[10px] tracking-[0.3em] uppercase mt-1">
                    Markets
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-display text-3xl gold-text-gradient">150+</div>
                  <div className="text-champagne/40 text-[10px] tracking-[0.3em] uppercase mt-1">
                    Partners
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
