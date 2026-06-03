"use client";

import { useEffect, useRef } from "react";

const R = 200;
const TILT = (15 * Math.PI) / 180;
const ROTATION_PERIOD = 30000;
const GRID_COLOR = "#e5e5e5";
const LAND_COLOR = "#111111";
const LAND_OPACITY = 0.18;
const ACCENT_RED = "#e63946";
const OUTLINE_COLOR = "#111111";

const cities = [
  { name: "dubai", lat: 25.2, lng: 55.3 },
  { name: "singapore", lat: 1.35, lng: 103.8 },
  { name: "geneva", lat: 46.2, lng: 6.15 },
];

interface LandRegion {
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
}

const landRegions: LandRegion[] = [
  { latMin: 15, latMax: 72, lngMin: -170, lngMax: -50 },
  { latMin: -56, latMax: 12, lngMin: -80, lngMax: -34 },
  { latMin: 35, latMax: 71, lngMin: -10, lngMax: 40 },
  { latMin: -35, latMax: 37, lngMin: -18, lngMax: 52 },
  { latMin: 5, latMax: 72, lngMin: 40, lngMax: 180 },
  { latMin: -39, latMax: -10, lngMin: 113, lngMax: 155 },
  { latMin: 12, latMax: 40, lngMin: 30, lngMax: 60 },
];

function degToRad(d: number): number {
  return (d * Math.PI) / 180;
}

function latLngToCart(
  latDeg: number,
  lngDeg: number,
  radius: number
): [number, number, number] {
  const phi = degToRad(90 - latDeg);
  const theta = degToRad(lngDeg);
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function rotateY(
  x: number,
  y: number,
  z: number,
  angle: number
): [number, number, number] {
  return [
    x * Math.cos(angle) - z * Math.sin(angle),
    y,
    x * Math.sin(angle) + z * Math.cos(angle),
  ];
}

function rotateX(
  x: number,
  y: number,
  z: number,
  angle: number
): [number, number, number] {
  return [
    x,
    y * Math.cos(angle) - z * Math.sin(angle),
    y * Math.sin(angle) + z * Math.cos(angle),
  ];
}

function generateLandDots(step: number): [number, number, number][] {
  const dots: [number, number, number][] = [];
  for (const region of landRegions) {
    for (let lat = region.latMin; lat <= region.latMax; lat += step) {
      for (let lng = region.lngMin; lng <= region.lngMax; lng += step) {
        dots.push(latLngToCart(lat, lng, R));
      }
    }
  }
  return dots;
}

function generateGridLines(): {
  latLines: [number, number, number][][];
  lngLines: [number, number, number][][];
} {
  const latSteps = 180;
  const lngSteps = 360;
  const latLines: [number, number, number][][] = [];

  for (let lat = -60; lat <= 60; lat += 30) {
    if (lat === 0) continue;
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= latSteps; i++) {
      const lng = (i / latSteps) * 360 - 180;
      pts.push(latLngToCart(lat, lng, R));
    }
    latLines.push(pts);
  }

  const lngLines: [number, number, number][][] = [];
  for (let lng = -180; lng < 180; lng += 30) {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= lngSteps; i++) {
      const lat = (i / lngSteps) * 180 - 90;
      pts.push(latLngToCart(lat, lng, R));
    }
    lngLines.push(pts);
  }

  const equator: [number, number, number][] = [];
  for (let i = 0; i <= latSteps; i++) {
    const lng = (i / latSteps) * 360 - 180;
    equator.push(latLngToCart(0, lng, R));
  }
  latLines.unshift(equator);

  return { latLines, lngLines };
}

function project(
  x: number,
  y: number,
  z: number,
  centerX: number,
  centerY: number
): { sx: number; sy: number; z: number } {
  return { sx: centerX + x, sy: centerY - y, z };
}

const RING_DURATION = 2000;
const RING_COUNT = 3;
const RING_OFFSET = RING_DURATION / RING_COUNT;

export function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const landDots = generateLandDots(3);
    const { latLines, lngLines } = generateGridLines();

    let animId: number;
    let startTime: number | null = null;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    function drawGrid(
      lines: [number, number, number][][],
      cx: number,
      cy: number,
      ry: number
    ) {
      ctx!.strokeStyle = GRID_COLOR;
      ctx!.lineWidth = 0.5;

      for (const line of lines) {
        let started = false;
        ctx!.beginPath();
        for (const [lx, ly, lz] of line) {
          const [rx, ry2, rz] = rotateX(
            ...rotateY(lx, ly, lz, ry),
            TILT
          );
          if (rz <= 0) {
            started = false;
            continue;
          }
          const { sx, sy } = project(rx, ry2, rz, cx, cy);
          if (!started) {
            ctx!.moveTo(sx, sy);
            started = true;
          } else {
            ctx!.lineTo(sx, sy);
          }
        }
        ctx!.stroke();
      }
    }

    function drawDots(
      dots: [number, number, number][],
      cx: number,
      cy: number,
      ry: number
    ) {
      ctx!.fillStyle = LAND_COLOR;
      ctx!.globalAlpha = LAND_OPACITY;

      for (const [dx, dy, dz] of dots) {
        const [rx, ry2, rz] = rotateX(...rotateY(dx, dy, dz, ry), TILT);
        if (rz <= 0) continue;
        const { sx, sy } = project(rx, ry2, rz, cx, cy);
        ctx!.fillRect(sx - 0.5, sy - 0.5, 1, 1);
      }

      ctx!.globalAlpha = 1;
    }

    function drawOutline(cx: number, cy: number) {
      ctx!.strokeStyle = OUTLINE_COLOR;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.stroke();
    }

    function drawCities(
      cx: number,
      cy: number,
      ry: number,
      elapsed: number
    ) {
      for (const city of cities) {
        const [cx3, cy3, cz3] = latLngToCart(city.lat, city.lng, R);
        const [rx, ry2, rz] = rotateX(...rotateY(cx3, cy3, cz3, ry), TILT);

        if (rz <= 0) continue;

        const { sx, sy } = project(rx, ry2, rz, cx, cy);

        ctx!.fillStyle = ACCENT_RED;
        ctx!.strokeStyle = ACCENT_RED;

        ctx!.beginPath();
        ctx!.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx!.fill();

        for (let i = 0; i < RING_COUNT; i++) {
          const localT = (elapsed + i * RING_OFFSET) % RING_DURATION;
          const progress = localT / RING_DURATION;
          const ringRadius = 4 + progress * 26;

          ctx!.strokeStyle = ACCENT_RED;
          ctx!.globalAlpha = 1 - progress;
          ctx!.lineWidth = 0.5;
          ctx!.beginPath();
          ctx!.arc(sx, sy, ringRadius, 0, Math.PI * 2);
          ctx!.stroke();
        }

        ctx!.globalAlpha = 1;

        ctx!.fillStyle = OUTLINE_COLOR;
        ctx!.font = "10px Inter, sans-serif";
        ctx!.textAlign = "left";
        ctx!.textBaseline = "middle";
        ctx!.fillText(city.name, sx + 8, sy);
      }
    }

    function render(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const rect = canvas!.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const ry = (elapsed % ROTATION_PERIOD) / ROTATION_PERIOD * Math.PI * 2;

      ctx!.clearRect(0, 0, rect.width, rect.height);

      drawGrid(latLines, cx, cy, ry);
      drawGrid(lngLines, cx, cy, ry);
      drawDots(landDots, cx, cy, ry);
      drawCities(cx, cy, ry, elapsed);
      drawOutline(cx, cy);

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
    />
  );
}
