"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";
import { Mail, Phone, Building2 } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 scroll-section overflow-hidden">
      <div className="absolute inset-0 bg-deep geometric-sunburst" />

      {/* Gold ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-300/[0.03] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Section header */}
        <ScrollReveal sparkle>
          <p className="text-gold-300/60 text-xs tracking-[0.4em] uppercase mb-4 font-light">
            Initiate a Partnership
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream tracking-[0.03em] mb-6">
            <span className="italic gold-text-gradient">Connect</span> With Us
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300/40" />
            <span className="diamond-marker w-[5px] h-[5px]" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300/40" />
          </div>
        </ScrollReveal>

        {/* CTA Box */}
        <ScrollReveal delay={0.3}>
          <div className="relative inline-block mb-14">
            <a
              href="mailto:contact@twenty1global.com"
              className="group relative inline-flex items-center gap-4 px-12 py-5 bg-gold-300 text-deep font-display text-base tracking-[0.2em] uppercase hover:bg-gold-200 transition-all duration-500"
            >
              <Mail size={18} strokeWidth={1.5} />
              <span>contact@twenty1global.com</span>
              <span className="absolute inset-0 border border-gold-300 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </div>
        </ScrollReveal>

        {/* Ornate divider */}
        <ScrollReveal delay={0.4}>
          <div className="max-w-xl mx-auto mb-14">
            <div className="ornate-divider" />
          </div>
        </ScrollReveal>

        {/* Contact details — symmetrical layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-3xl mx-auto">
          <ScrollReveal delay={0.5}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold-300/20 mb-4">
                <Mail size={18} className="text-gold-300" strokeWidth={1} />
              </div>
              <h4 className="font-display text-gold-300 text-xs tracking-[0.2em] uppercase mb-2">
                Email
              </h4>
              <p className="text-champagne/50 text-xs font-light tracking-wider">
                contact@twenty1global.com
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold-300/20 mb-4">
                <Phone size={18} className="text-gold-300" strokeWidth={1} />
              </div>
              <h4 className="font-display text-gold-300 text-xs tracking-[0.2em] uppercase mb-2">
                Phone
              </h4>
              <p className="text-champagne/50 text-xs font-light tracking-wider">
                +971 4 123 4567
                <br />
                <span className="text-champagne/30">Dubai HQ</span>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.7}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold-300/20 mb-4">
                <Building2 size={18} className="text-gold-300" strokeWidth={1} />
              </div>
              <h4 className="font-display text-gold-300 text-xs tracking-[0.2em] uppercase mb-2">
                Headquarters
              </h4>
              <p className="text-champagne/50 text-xs font-light tracking-wider">
                Emirates Financial Towers
                <br />
                <span className="text-champagne/30">DIFC, Dubai, UAE</span>
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom geometric accent */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <span className="w-16 h-px bg-gold-300/10" />
          <span className="diamond-marker w-[3px] h-[3px] opacity-40" />
          <span className="w-16 h-px bg-gold-300/10" />
          <span className="diamond-marker w-[3px] h-[3px] opacity-40" />
          <span className="w-16 h-px bg-gold-300/10" />
        </div>
      </div>
    </section>
  );
}
