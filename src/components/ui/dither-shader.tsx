"use client";

import { useRef, useEffect, useCallback } from "react";

interface DitherShaderProps {
  src: string;
  gridSize?: number;
  ditherMode?: "bayer" | "floydsteinberg" | "ordered";
  colorMode?: "grayscale" | "color";
  invert?: boolean;
  animated?: boolean;
  animationSpeed?: number;
  primaryColor?: string;
  secondaryColor?: string;
  threshold?: number;
  className?: string;
}

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function getBayerValue(x: number, y: number, gridSize: number): number {
  const bx = x % (gridSize * 4);
  const by = y % (gridSize * 4);
  const cellX = Math.floor(bx / gridSize) % 4;
  const cellY = Math.floor(by / gridSize) % 4;
  return BAYER_4X4[cellY][cellX] / 16;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
}

export default function DitherShader({
  src,
  gridSize = 2,
  ditherMode = "bayer",
  colorMode = "grayscale",
  invert = false,
  animated = false,
  animationSpeed = 0.02,
  primaryColor = "#000000",
  secondaryColor = "#f5f5f5",
  threshold = 0.5,
  className = "",
}: DitherShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef<number>(0);
  const animOffset = useRef(0);

  const primary = useRef(hexToRgb(primaryColor));
  const secondary = useRef(hexToRgb(secondaryColor));

  useEffect(() => {
    primary.current = hexToRgb(primaryColor);
    secondary.current = hexToRgb(secondaryColor);
  }, [primaryColor, secondaryColor]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Draw image scaled to canvas
    ctx.drawImage(img, 0, 0, w, h);

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    if (animated) {
      animOffset.current += animationSpeed;
    }


    const [pr, pg, pb] = primary.current;
    const [sr, sg, sb] = secondary.current;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Convert to grayscale luminance
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;

        // Get dither threshold
        let ditherThreshold = 0;
        if (ditherMode === "bayer") {
          const offsetX = animated ? Math.floor(animOffset.current) : 0;
          ditherThreshold =
            getBayerValue(x + offsetX, y, gridSize) * threshold * 2;
        } else {
          // Simple ordered dither fallback
          ditherThreshold = ((x + y) % (gridSize * 2)) / (gridSize * 2);
        }

        const normalized = gray / 255;
        const adjusted = invert ? 1 - normalized : normalized;
        const pixel = adjusted > ditherThreshold ? 1 : 0;

        if (colorMode === "grayscale") {
          data[i] = pixel ? pr : sr;
          data[i + 1] = pixel ? pg : sg;
          data[i + 2] = pixel ? pb : sb;
        } else {
          // Color dither — use luminance to blend between primary and secondary
          const mix = pixel;
          data[i] = Math.round(mix * pr + (1 - mix) * sr);
          data[i + 1] = Math.round(mix * pg + (1 - mix) * sg);
          data[i + 2] = Math.round(mix * pb + (1 - mix) * sb);
          // Keep original alpha if available, or full opacity
          data[i + 3] = 255;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);

    if (animated) {
      frameRef.current = requestAnimationFrame(render);
    }
  }, [gridSize, ditherMode, colorMode, invert, animated, animationSpeed, threshold]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      imageRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const scale = 0.5;
      canvas.width = (rect.width || 800) * scale;
      canvas.height = (rect.height || 600) * scale;

      // Maintain aspect ratio
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvas.width / canvas.height;
      if (imgRatio > canvasRatio) {
        const newHeight = canvas.width / imgRatio;
        canvas.height = newHeight;
      } else {
        const newWidth = canvas.height * imgRatio;
        canvas.width = newWidth;
      }

      canvas.style.width = (rect.width || 800) + "px";
      canvas.style.height = (rect.height || 600) + "px";

      render();
    };

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [src, render]);

  // Re-render when props change (non-animated case)
  useEffect(() => {
    if (!animated && imageRef.current) {
      render();
    }
  }, [gridSize, ditherMode, colorMode, invert, animated, threshold, render]);

  useEffect(() => {
    if (animated && imageRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(render);
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [animated, render]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
