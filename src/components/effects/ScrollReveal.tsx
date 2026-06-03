"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealVariant = "typewriter" | "glitch" | "fade-up" | "terminal";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [delay]);

  const variantClasses: Record<RevealVariant, string> = {
    typewriter: "overflow-hidden whitespace-nowrap",
    glitch: "",
    "fade-up": "",
    terminal: "",
  };

  const visibleStyles: Record<RevealVariant, React.CSSProperties> = {
    typewriter: {
      animation: `typewriter 1.5s steps(40) forwards`,
      width: isVisible ? "100%" : "0",
    },
    glitch: isVisible
      ? {
          animation: `glitch 0.4s ease-in-out`,
        }
      : {},
    "fade-up": {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
    },
    terminal: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateX(0)" : "translateX(-10px)",
      transition: `opacity 0.4s ease-out ${delay}ms, transform 0.4s ease-out ${delay}ms`,
    },
  };

  return (
    <div
      ref={ref}
      className={`${variantClasses[variant]} ${className}`}
      style={{
        ...visibleStyles[variant],
        display: variant === "typewriter" ? "inline-block" : "block",
      }}
    >
      {children}
    </div>
  );
}
