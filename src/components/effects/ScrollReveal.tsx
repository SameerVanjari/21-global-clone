"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "bloom" | "bloom-up";
  delay?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className,
  variant = "bloom-up",
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
          const timeout = setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(node);
          return () => clearTimeout(timeout);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        variant === "bloom" ? "bloom-in" : "bloom-up",
        isVisible && "visible",
        className
      )}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
