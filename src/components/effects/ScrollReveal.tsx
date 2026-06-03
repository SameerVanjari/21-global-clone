"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "glitch" | "holo-fade" | "slide-up" | "scale-in";
  delay?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  variant = "holo-fade",
  delay = 0,
  threshold = 0.15,
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
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const baseStyle: React.CSSProperties = {
    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    glitch: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
      filter: isVisible ? "blur(0px)" : "blur(8px)",
    },
    "holo-fade": {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      filter: isVisible ? "blur(0px)" : "blur(4px)",
    },
    "slide-up": {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(60px)",
    },
    "scale-in": {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "scale(1)" : "scale(0.8)",
    },
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...baseStyle, ...variantStyles[variant] }}
    >
      {children}
    </div>
  );
}
