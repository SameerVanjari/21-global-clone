import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-dark min-h-screen flex flex-col justify-center px-8 md:px-16 py-24 md:py-32"
    >
      <div className="max-w-[1600px] mx-auto w-full">
        <ScrollReveal>
          <p className="text-xs font-light tracking-[0.4em] uppercase text-[#f5f2ed]/30 mb-20">
            Contact
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <h2 className="text-[clamp(2rem,5vw,5rem)] font-extralight leading-[1.05] tracking-[-0.02em] text-[#f5f2ed] mb-12 max-w-3xl shadow-text-architectural">
            Begin a conversation built on trust.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
          <ScrollReveal delay={400}>
            <div>
              <p className="text-sm font-light leading-relaxed text-[#f5f2ed]/50 mb-10 max-w-sm">
                We welcome inquiries from producers, consumers, financial
                institutions, and potential partners. Our team responds within
                24 hours.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:contact@twenty1global.com"
                  className="block text-sm font-light tracking-[0.15em] uppercase text-[#f5f2ed]/60 hover:text-[#f5f2ed] transition-colors duration-700"
                >
                  contact@twenty1global.com
                </a>
                <p className="text-xs font-extralight tracking-[0.15em] uppercase text-[#f5f2ed]/30">
                  Dubai &middot; Singapore &middot; Zug
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="shadow-architectural-deep p-12 md:p-16" style={{ backgroundColor: "#2c2c2e" }}>
              <p className="text-xs font-light tracking-[0.3em] uppercase text-[#f5f2ed]/40 mb-6">
                Trading Desk
              </p>
              <p className="text-sm font-light leading-relaxed text-[#f5f2ed]/50 mb-8">
                For urgent trade inquiries or market intelligence requests,
                reach our 24-hour trading desk.
              </p>
              <a
                href="mailto:trading@twenty1global.com"
                className="inline-block text-sm font-light tracking-[0.2em] uppercase text-[#f5f2ed]/70 hover:text-[#f5f2ed] transition-colors duration-700"
              >
                trading@twenty1global.com
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
