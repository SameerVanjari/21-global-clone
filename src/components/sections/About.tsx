import ScrollReveal from "@/components/effects/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="section-dark min-h-screen flex flex-col justify-center px-8 md:px-16 py-24 md:py-32">
      <div className="max-w-[1600px] mx-auto w-full">
        <ScrollReveal>
          <p className="text-xs font-light tracking-[0.4em] uppercase text-[#f5f2ed]/30 mb-20">
            Who We Are
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <blockquote className="text-[clamp(1.5rem,4vw,3.5rem)] font-extralight leading-[1.15] tracking-[-0.01em] text-[#f5f2ed] max-w-4xl shadow-text-architectural">
            We move what the world needs. Quietly. Relentlessly. Without
            compromise.
          </blockquote>
        </ScrollReveal>

        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
          <ScrollReveal delay={400}>
            <div>
              <p className="text-[clamp(2.5rem,5vw,5rem)] font-extralight leading-none tracking-[-0.04em] text-[#f5f2ed]/15 mb-4 select-none">
                12+
              </p>
              <p className="text-sm font-light tracking-[0.15em] uppercase text-[#f5f2ed]/50">
                Years in global markets
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={500}>
            <div>
              <p className="text-[clamp(2.5rem,5vw,5rem)] font-extralight leading-none tracking-[-0.04em] text-[#f5f2ed]/15 mb-4 select-none">
                3
              </p>
              <p className="text-sm font-light tracking-[0.15em] uppercase text-[#f5f2ed]/50">
                Continental hubs
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={600}>
            <div>
              <p className="text-[clamp(2.5rem,5vw,5rem)] font-extralight leading-none tracking-[-0.04em] text-[#f5f2ed]/15 mb-4 select-none">
                40+
              </p>
              <p className="text-sm font-light tracking-[0.15em] uppercase text-[#f5f2ed]/50">
                Countries served
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
