import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Contact() {
  return (
    <section id="contact">
      <div className="section-divider" />
      <div className="section-swiss">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal>
            <p className="precision-label mb-6">Contact</p>
            <h2 className="text-[2.25rem] font-light tracking-[-0.02em] text-foreground max-w-[600px] max-md:text-[1.75rem]">
              Begin a precise conversation
              <span className="text-accent">.</span>
            </h2>
          </ScrollReveal>

          <div className="grid-swiss mt-20 max-md:mt-12">
            <div className="col-span-5 max-md:col-span-4">
              <ScrollReveal delay={100}>
                <p className="text-base leading-relaxed text-muted max-w-[440px] max-md:text-sm">
                  Direct engagement with our trading desks. Discretion
                  guaranteed. All inquiries handled with the confidentiality
                  expected of a Swiss institution.
                </p>

                <div className="mt-12 space-y-8 max-md:mt-8">
                  <div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-muted mb-2">
                      Primary contact
                    </p>
                    <a
                      href="mailto:trading@twenty1global.com"
                      className="text-base font-medium text-foreground no-underline hover:text-accent transition-colors duration-200 max-md:text-sm"
                    >
                      trading@twenty1global.com
                    </a>
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-muted mb-2">
                      Switzerland — HQ
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      +41 41 500 00 00
                      <br />
                      Baarerstrasse 78, 6300 Zug
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-muted mb-2">
                      Dubai — Middle East
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      +971 4 400 00 00
                      <br />
                      Almas Tower, DMCC, Dubai
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-muted mb-2">
                      Singapore — APAC
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      +65 6000 0000
                      <br />
                      One Raffles Place, Singapore
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="col-span-6 col-start-7 max-md:col-span-4 max-md:col-start-1 max-md:mt-12">
              <ScrollReveal delay={200}>
                <div className="border-t border-border pt-8 max-md:pt-6">
                  <p className="text-xs text-muted tracking-[0.08em] uppercase mb-8">
                    Direct inquiry
                    <span className="accent-dot" />
                  </p>

                  <form className="space-y-6">
                    <div>
                      <label className="block text-[10px] tracking-[0.1em] uppercase text-muted mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-0 border-b border-border pb-3 text-sm text-foreground placeholder:text-muted/50 outline-none focus:border-foreground transition-colors duration-200"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.1em] uppercase text-muted mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-transparent border-0 border-b border-border pb-3 text-sm text-foreground placeholder:text-muted/50 outline-none focus:border-foreground transition-colors duration-200"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.1em] uppercase text-muted mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-0 border-b border-border pb-3 text-sm text-foreground placeholder:text-muted/50 outline-none focus:border-foreground transition-colors duration-200"
                        placeholder="Trading inquiry"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.1em] uppercase text-muted mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full bg-transparent border-0 border-b border-border pb-3 text-sm text-foreground placeholder:text-muted/50 outline-none focus:border-foreground transition-colors duration-200 resize-none"
                        placeholder="Your message"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 text-sm font-medium text-foreground no-underline group mt-4"
                    >
                      <span>Send inquiry</span>
                      <span className="text-accent group-hover:translate-x-1 transition-transform duration-200">
                        &rarr;
                      </span>
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
