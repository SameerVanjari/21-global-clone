"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-cream py-24 lg:py-32"
    >
      {/* Organic blob background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="blob-gradient-terracotta absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2"
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          className="blob-gradient-sage absolute -right-20 top-1/3 h-80 w-80"
          style={{ borderRadius: "40% 60% 70% 30% / 30% 60% 40% 70%" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="mb-3 font-[family-name:var(--font-body)] text-sm font-medium tracking-widest text-sage-dark uppercase">
              Get in Touch
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-light italic text-bark sm:text-5xl lg:text-6xl">
              Let&apos;s{" "}
              <span className="font-medium text-terracotta not-italic">
                grow
              </span>{" "}
              together
            </h2>
            <p className="mt-6 font-[family-name:var(--font-body)] text-lg leading-relaxed text-clay">
              Whether you&apos;re looking to trade, partner, or simply learn more
              about what we do — we&apos;d love to hear from you. Reach out and
              let&apos;s start a conversation.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div
              className="mt-12 rounded-3xl border border-sand/60 bg-surface p-10"
              style={{
                borderRadius: "44px 24px 44px 24px / 30px 44px 24px 44px",
              }}
            >
              <form
                className="mx-auto max-w-xl space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="text-left">
                    <label
                      htmlFor="name"
                      className="mb-1.5 block font-[family-name:var(--font-body)] text-sm font-medium text-bark"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-sand bg-cream px-4 py-3 font-[family-name:var(--font-body)] text-sm text-ink placeholder:text-clay/40 outline-none transition-all focus:border-terracotta focus:ring-2 focus:ring-terracotta/15"
                      style={{
                        borderRadius: "16px 12px 16px 12px / 12px 16px 12px 16px",
                      }}
                    />
                  </div>
                  <div className="text-left">
                    <label
                      htmlFor="email"
                      className="mb-1.5 block font-[family-name:var(--font-body)] text-sm font-medium text-bark"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-sand bg-cream px-4 py-3 font-[family-name:var(--font-body)] text-sm text-ink placeholder:text-clay/40 outline-none transition-all focus:border-terracotta focus:ring-2 focus:ring-terracotta/15"
                      style={{
                        borderRadius: "16px 12px 16px 12px / 12px 16px 12px 16px",
                      }}
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block font-[family-name:var(--font-body)] text-sm font-medium text-bark"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-sand bg-cream px-4 py-3 font-[family-name:var(--font-body)] text-sm text-ink placeholder:text-clay/40 outline-none transition-all focus:border-terracotta focus:ring-2 focus:ring-terracotta/15"
                    style={{
                      borderRadius: "16px 12px 16px 12px / 12px 16px 12px 16px",
                    }}
                  />
                </div>

                <div className="text-left">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-[family-name:var(--font-body)] text-sm font-medium text-bark"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your needs..."
                    className="w-full resize-none rounded-xl border border-sand bg-cream px-4 py-3 font-[family-name:var(--font-body)] text-sm text-ink placeholder:text-clay/40 outline-none transition-all focus:border-terracotta focus:ring-2 focus:ring-terracotta/15"
                    style={{
                      borderRadius: "20px 14px 20px 14px / 14px 20px 14px 20px",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-8 py-3.5 font-[family-name:var(--font-body)] text-base font-medium text-cream transition-all duration-500 hover:bg-terracotta-light hover:shadow-xl hover:shadow-terracotta/25 sm:w-auto sm:px-12"
                >
                  Send Message
                  <svg
                    className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-clay font-[family-name:var(--font-body)]">
              <span className="inline-flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-terracotta" />
                Dubai, UAE
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-sage" />
                Singapore
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-clay" />
                Geneva, Switzerland
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
