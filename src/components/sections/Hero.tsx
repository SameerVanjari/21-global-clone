import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="section-light relative flex flex-col items-center justify-center min-h-screen px-8 md:px-16 overflow-hidden"
    >
      <ScrollReveal>
        <div className="text-center select-none">
          <p className="text-[clamp(0.625rem,1.5vw,0.75rem)] font-extralight tracking-[0.5em] uppercase text-[#1a1a1a]/30 mb-12 md:mb-20">
            Twenty1Global Trading
          </p>
          <h1 className="text-[clamp(3rem,10vw,12rem)] font-extralight leading-[0.85] tracking-[-0.02em] text-[#1a1a1a] shadow-text-architectural">
            Mass
            <br />
            in
            <br />
            Motion
          </h1>
          <p className="mt-12 md:mt-16 text-[clamp(0.75rem,1.5vw,0.875rem)] font-light tracking-[0.3em] uppercase text-[#1a1a1a]/30 max-w-md mx-auto leading-relaxed">
            Global Commodities. Absolute Precision.
          </p>
        </div>
      </ScrollReveal>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-[#1a1a1a]/20 to-transparent" />
      </div>
    </section>
  );
}
