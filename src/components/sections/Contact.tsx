import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 px-[5%] md:px-[8%] lg:px-[10%] relative overflow-hidden">


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <ScrollReveal>
            <span className="block text-eyebrow text-[var(--color-gold)] mb-6">
              Begin a Conversation
            </span>
            <h2 className="text-heading text-[var(--color-ink)] mb-8">
              Let&apos;s discuss
              <br />
              your requirements
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-body text-[var(--color-ink-muted)] leading-[1.9] max-w-[420px] mb-10">
              Whether you are seeking a reliable sourcing partner, exploring new
              market entry, or require structured trade finance — our team is
              ready to engage with the seriousness your business deserves.
            </p>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ScrollReveal delay={200}>
            <div className="space-y-10">
              <div>
                <p className="text-caption text-[var(--color-ink)] mb-2">
                  Email
                </p>
                <a
                  href="mailto:enquiries@twenty1global.com"
                  className="font-[family-name:var(--font-lora)] text-[1.25rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300 italic"
                >
                  enquiries@twenty1global.com
                </a>
              </div>

              <div>
                <p className="text-caption text-[var(--color-ink)] mb-2">
                  Telephone
                </p>
                <a
                  href="tel:+97141234567"
                  className="font-[family-name:var(--font-lora)] text-[1.25rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
                >
                  +971 4 123 4567
                </a>
              </div>

              <div className="pt-6">
                <a
                  href="mailto:enquiries@twenty1global.com"
                  className="inline-block font-[family-name:var(--font-dm-sans)] text-[0.7rem] font-medium tracking-[0.22em] uppercase text-[var(--color-cream)] bg-[var(--color-ink)] px-10 py-5 hover:bg-[var(--color-gold)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  Send an Enquiry
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
