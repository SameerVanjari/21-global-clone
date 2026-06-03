"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "fan";
  delay?: number;
  sparkle?: boolean;
}

const sparkleStyle = (delay: number, x: number, y: number): React.CSSProperties => ({
  position: "absolute",
  width: "4px",
  height: "4px",
  background: "#e8c97a",
  borderRadius: "50%",
  pointerEvents: "none" as const,
  left: `${x}%`,
  top: `${y}%`,
  opacity: 0,
  animation: `sparkle-particle 1.5s ease-out ${delay}s infinite`,
  "--tx": `${(Math.random() - 0.5) * 60}px`,
  "--ty": `${(Math.random() - 0.5) * 60 - 20}px`,
} as React.CSSProperties);

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  sparkle = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const animationClass =
    direction === "left"
      ? "animate-stepped"
      : direction === "right"
        ? "animate-stepped-right"
        : direction === "fan"
          ? "animate-fan-reveal"
          : "animate-float-up";

  const sparkles = sparkle
    ? Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={sparkleStyle(0.5 + i * 0.15, 20 + Math.random() * 60, 20 + Math.random() * 60)}
        />
      ))
    : null;

  return (
    <div
      ref={ref}
      className={`relative ${isVisible ? animationClass : "opacity-0"} ${className}`}
      style={{ ...(isVisible ? { animationDelay: `${delay}s` } : {}) }}
    >
      {sparkle && isVisible && sparkles}
      {children}
    </div>
  );
}
