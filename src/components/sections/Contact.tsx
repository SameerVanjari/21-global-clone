"use client";

import { useState } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isFocused, setIsFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputClasses = (name: string) => ({
    background: "rgba(255, 255, 255, 0.02)",
    border: `1px solid ${
      isFocused === name ? "rgba(0, 240, 255, 0.4)" : "rgba(0, 240, 255, 0.15)"
    }`,
    borderRadius: "2px",
    color: "#e0e8ff",
    outline: "none",
    padding: "14px 16px",
    width: "100%",
    fontSize: "14px",
    fontFamily: "var(--font-sans)",
    transition: "all 0.3s ease",
    boxShadow:
      isFocused === name
        ? "0 0 15px rgba(0, 240, 255, 0.1)"
        : "none",
  });

  return (
    <section
      id="contact"
      className="relative py-24 bg-[#0d0d1a] overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(255, 0, 229, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(0, 240, 255, 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <ScrollReveal variant="holo-fade">
          <div className="text-center mb-12">
            <div
              className="inline-block glass px-4 py-1.5 text-xs tracking-[0.3em] uppercase mb-6"
              style={{
                color: "#ff00e5",
                textShadow: "0 0 8px rgba(255, 0, 229, 0.5)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Module 05 // Connect
            </div>
            <h2
              className="text-4xl sm:text-5xl font-light tracking-wider mb-4"
              style={{ color: "#e0e8ff" }}
            >
              Initialize{" "}
              <span style={{ color: "#ff00e5" }}>Contact</span>
            </h2>
            <p style={{ color: "#667799" }}>
              Open a secure channel. Our trade desk responds within the hour.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale-in" delay={150}>
          <div
            className="glass-magenta p-8 md:p-10 relative overflow-hidden"
            style={{ borderRadius: "2px" }}
          >
            <div className="absolute top-0 left-0 right-0 scan-line" />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    className="text-xs tracking-[0.15em] uppercase mb-2 block"
                    style={{ color: "#667799", fontFamily: "var(--font-mono)" }}
                  >
                    Identifier
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("name")}
                    onBlur={() => setIsFocused(null)}
                    placeholder="Enter your name"
                    style={inputClasses("name")}
                    required
                  />
                </div>
                <div>
                  <label
                    className="text-xs tracking-[0.15em] uppercase mb-2 block"
                    style={{ color: "#667799", fontFamily: "var(--font-mono)" }}
                  >
                    Comm Channel
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("email")}
                    onBlur={() => setIsFocused(null)}
                    placeholder="Enter your email"
                    style={inputClasses("email")}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className="text-xs tracking-[0.15em] uppercase mb-2 block"
                  style={{ color: "#667799", fontFamily: "var(--font-mono)" }}
                >
                  Subject Line
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("subject")}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Transaction subject"
                  style={inputClasses("subject")}
                  required
                />
              </div>

              <div>
                <label
                  className="text-xs tracking-[0.15em] uppercase mb-2 block"
                  style={{ color: "#667799", fontFamily: "var(--font-mono)" }}
                >
                  Message Payload
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("message")}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Transmit your message..."
                  rows={5}
                  style={{
                    ...inputClasses("message"),
                    resize: "vertical",
                  }}
                  required
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="relative overflow-hidden px-8 py-3 font-medium tracking-[0.15em] uppercase text-sm transition-all duration-300 neon-pulse-magenta"
                  style={{
                    color: "#06060b",
                    background:
                      "linear-gradient(135deg, #ff00e5 0%, #c800b3 100%)",
                    borderRadius: "2px",
                    boxShadow:
                      "0 0 30px rgba(255, 0, 229, 0.3), 0 0 60px rgba(255, 0, 229, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 50px rgba(255, 0, 229, 0.5), 0 0 90px rgba(255, 0, 229, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(255, 0, 229, 0.3), 0 0 60px rgba(255, 0, 229, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Transmit Message
                </button>

                <p
                  className="text-xs"
                  style={{
                    color: "#667799",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Encrypted // Secure Channel
                </p>
              </div>
            </form>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="holo-fade" delay={300}>
          <div className="mt-16 text-center">
            <p
              className="text-xs tracking-[0.2em] uppercase"
              style={{
                color: "#00f0ff",
                fontFamily: "var(--font-mono)",
              }}
            >
              Direct Line // +971 4 XXX XXXX · +65 XXXX XXXX · +41 44 XXX XX XX
            </p>
            <p
              className="text-xs mt-2"
              style={{ color: "#667799" }}
            >
              trade@twenty1global.com // PGP Key Available
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
