"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="bg-background border-brutal-thick-t border-brutal-thick-b py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <span className="text-eyebrow text-amber block mb-4">
            <span className="text-amber">{">"}</span> ESTABLISH CONNECTION
          </span>
          <h2 className="text-subheading">
            ENQUIRY<span className="text-amber">_</span>PROTOCOL
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="border-brutal p-8">
            <h3 className="text-eyebrow text-amber mb-6">
              [CONTACT HEADERS]
            </h3>

            <div className="space-y-6 mb-8">
              <div className="border-brutal-l border-amber-l pl-4">
                <span className="text-caption text-muted-foreground block mb-1">
                  <span className="text-amber">$</span> FROM
                </span>
                <span className="text-body text-foreground">
                  Twenty1Global Trading LLC
                </span>
              </div>

              <div className="border-brutal-l border-amber-l pl-4">
                <span className="text-caption text-muted-foreground block mb-1">
                  <span className="text-amber">$</span> TO
                </span>
                <span className="text-body text-foreground">
                  enquiries@twenty1global.com
                </span>
              </div>

              <div className="border-brutal-l border-amber-l pl-4">
                <span className="text-caption text-muted-foreground block mb-1">
                  <span className="text-amber">$</span> PGP KEY
                </span>
                <span className="text-caption text-muted-foreground">
                  Available upon request
                </span>
              </div>
            </div>

            <div className="border-brutal-t pt-6 space-y-3">
              <div>
                <span className="text-caption text-muted-foreground block mb-0.5">
                  <span className="text-amber">//</span> UAE
                </span>
                <span className="text-caption text-foreground">
                  +971 4 123 4567
                </span>
              </div>
              <div>
                <span className="text-caption text-muted-foreground block mb-0.5">
                  <span className="text-amber">//</span> SINGAPORE
                </span>
                <span className="text-caption text-foreground">
                  +65 6 123 4567
                </span>
              </div>
              <div>
                <span className="text-caption text-muted-foreground block mb-0.5">
                  <span className="text-amber">//</span> SWITZERLAND
                </span>
                <span className="text-caption text-foreground">
                  +41 41 123 4567
                </span>
              </div>
            </div>
          </div>

          <div className="border-brutal p-8">
            <h3 className="text-eyebrow text-amber mb-6">
              [$ MAIL -S &quot;ENQUIRY&quot;]
            </h3>

            {submitted ? (
              <div className="border-brutal border-amber-l p-6 bg-surface">
                <pre className="text-terminal text-amber font-mono mb-2">
                  <code>{`> MESSAGE SENT SUCCESSFULLY
> ROUTING: HIGH PRIORITY
> ACKNOWLEDGEMENT: PENDING
> EXPECTED RESPONSE: < 24h`}</code>
                </pre>
                <p className="text-caption text-muted-foreground mt-4">
                  <span className="text-amber">{">"}</span> Our trading desk will respond within one
                  business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-caption text-amber hover:text-foreground transition-colors"
                >
                  [$ SEND ANOTHER]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-caption text-muted-foreground block mb-2">
                    <span className="text-amber">$</span> NAME
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-surface border-brutal text-caption text-foreground px-4 py-3 focus:outline-none focus:border-amber placeholder:text-muted-foreground"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-caption text-muted-foreground block mb-2">
                    <span className="text-amber">$</span> ORGANIZATION
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-surface border-brutal text-caption text-foreground px-4 py-3 focus:outline-none focus:border-amber placeholder:text-muted-foreground"
                    placeholder="Company or institution"
                  />
                </div>
                <div>
                  <label className="text-caption text-muted-foreground block mb-2">
                    <span className="text-amber">$</span> EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-surface border-brutal text-caption text-foreground px-4 py-3 focus:outline-none focus:border-amber placeholder:text-muted-foreground"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-caption text-muted-foreground block mb-2">
                    <span className="text-amber">$</span> MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-surface border-brutal text-caption text-foreground px-4 py-3 focus:outline-none focus:border-amber placeholder:text-muted-foreground resize-none"
                    placeholder="Description of your enquiry..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber text-background font-bold py-3 px-6 text-nav hover:bg-foreground transition-colors cursor-pointer"
                >
                  [$ EXECUTE SEND]
                </button>
                <p className="text-caption text-muted-foreground">
                  <span className="text-amber">//</span> All communications are encrypted and confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
