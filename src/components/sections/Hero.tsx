"use client";

import { useEffect, useRef, useState } from "react";

const HEADING_LINES = [
  "TWENTY1GLOBAL",
  "TRADING LLC",
];

const SUBTEXT_LINES = [
  "01  Raw commodities execution across three continents.",
  "02  Industrial-grade trading infrastructure.",
  "03  Proven track record since establishment.",
  "04  No ornamentation. Just performance.",
];

function DigitalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const utc = now.toISOString().replace("T", " ").slice(0, 19) + " UTC";
      setTime(utc);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-caption text-muted-foreground">
      <span className="text-amber">{">"}</span> {time}
    </span>
  );
}

export default function Hero() {
  const [displayedLineIdx, setDisplayedLineIdx] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [subVisible, setSubVisible] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const fullText = HEADING_LINES.join(" ");
    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      if (charIndex > fullText.length) {
        clearInterval(interval);
        setTypingComplete(true);
        setTimeout(() => setSubVisible(1), 400);
      }
      let accumulated = 0;
      let lineIdx = 0;
      for (let i = 0; i < HEADING_LINES.length; i++) {
        if (charIndex > accumulated + HEADING_LINES[i].length + (i > 0 ? 1 : 0)) {
          accumulated += HEADING_LINES[i].length + (i > 0 ? 1 : 0);
          lineIdx = i + 1;
        }
      }
      setDisplayedLineIdx(lineIdx);
      setDisplayedChars(charIndex);
    }, 48);

    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    if (typingComplete) {
      const subLines = SUBTEXT_LINES.length;
      let i = 1;
      const timer = setInterval(() => {
        if (i < subLines) {
          setSubVisible(i + 1);
          i++;
        } else {
          clearInterval(timer);
        }
      }, 300);
      return () => clearInterval(timer);
    }
  }, [typingComplete]);

  const getDisplayedText = (lineIndex: number): string => {
    let start = 0;
    for (let i = 0; i < lineIndex; i++) {
      start += HEADING_LINES[i].length + (i + 1 < HEADING_LINES.length ? 1 : 0);
    }
    const lineStart = start;
    let lineEnd = lineStart + HEADING_LINES[lineIndex].length;
    if (lineIndex < HEADING_LINES.length - 1) {
    }

    const textStart = Math.max(0, displayedChars - lineStart);
    return HEADING_LINES[lineIndex].slice(0, textStart);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center bg-background overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(245,158,11,0.1)_2px,rgba(245,158,11,0.1)_4px)]" />

      <div className="mx-auto max-w-7xl w-full px-6 py-32 flex flex-col justify-center">
        <div className="mb-8">
          <span className="text-eyebrow text-amber">
            <span className="text-amber">{">"}</span> EST. GLOBAL COMMODITIES — SYSTEM ONLINE
          </span>
        </div>

        <div className="mb-4">
          <DigitalClock />
        </div>

        <h1 className="text-heading mb-8">
          {HEADING_LINES.map((line, li) => {
            const displayed = getDisplayedText(li);
            const isCurrentLine = li === displayedLineIdx;
            const isFutureLine = li > displayedLineIdx;

            if (isFutureLine) return null;

            return (
              <span key={li} className="block">
                <span className="text-foreground">{displayed}</span>
                {isCurrentLine && displayedChars > 0 && (
                  <span
                    className={`text-amber font-bold ${
                      cursorVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    _
                  </span>
                )}
              </span>
            );
          })}
        </h1>

        {typingComplete && (
          <div className="border-brutal-l border-amber-l pl-6 py-2 mb-12 space-y-2">
            {SUBTEXT_LINES.slice(0, subVisible).map((line, i) => (
              <p
                key={i}
                className="text-body"
                style={{
                  opacity: 1,
                  animation: `counter-tick 0.4s ease-out ${i * 0.15}s forwards`,
                }}
              >
                {line.startsWith("0") ? (
                  <>
                    <span className="text-amber">{line.slice(0, 2)}</span>
                    <span className="text-muted-foreground">{line.slice(2)}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">{line}</span>
                )}
              </p>
            ))}
          </div>
        )}

        <div className="progress-bar mt-auto max-w-md">
          <div
            className="progress-bar-fill"
            style={{
              animationDuration: `${HEADING_LINES.join(" ").length * 0.048}s`,
              animationPlayState: typingComplete ? "paused" : "running",
            }}
          />
        </div>

        <div className="mt-8 flex items-center justify-between text-caption text-muted-foreground border-brutal-t pt-4">
          <span>
            <span className="text-amber">[</span>LATENCY: &lt;1ms<span className="text-amber">]</span>
          </span>
          <span>
            <span className="text-amber">[</span>UPTIME: 99.97%<span className="text-amber">]</span>
          </span>
          <span>
            <span className="text-amber">[</span>STATUS: LIVE<span className="text-amber">]</span>
          </span>
        </div>
      </div>
    </section>
  );
}
