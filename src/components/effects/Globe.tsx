"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";

interface GlobeProps {
  className?: string;
  primaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  gridColor?: string;
}

const CITY_MARKERS = [
  { name: "Dubai", lat: 25.2, lng: 55.3 },
  { name: "Singapore", lat: 1.3, lng: 103.8 },
  { name: "Geneva", lat: 46.2, lng: 6.1 },
] as const;

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;

function isLand(lat: number, lng: number): boolean {
  // North America
  if (lat >= 15 && lat <= 72 && lng >= -170 && lng <= -50) return true;
  // South America
  if (lat >= -56 && lat <= 12 && lng >= -80 && lng <= -34) return true;
  // Europe
  if (lat >= 35 && lat <= 71 && lng >= -10 && lng <= 40) return true;
  // Africa
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 52) return true;
  // Asia
  if (lat >= 5 && lat <= 72 && lng >= 40 && lng <= 180) return true;
  // Asia (Russia far east)
  if (lat >= 5 && lat <= 72 && lng >= -180 && lng <= -170) return true;
  // Australia
  if (lat >= -39 && lat <= -10 && lng >= 113 && lng <= 155) return true;
  // Middle East (overlapping but explicit)
  if (lat >= 12 && lat <= 40 && lng >= 30 && lng <= 60) return true;
  return false;
}

function generateLandGrid(): [number, number][] {
  const points: [number, number][] = [];
  for (let lat = -90; lat <= 90; lat += 3) {
    for (let lng = -180; lng <= 177; lng += 3) {
      if (isLand(lat, lng)) {
        points.push([lat, lng]);
      }
    }
  }
  return points;
}

function generateWaterGrid(): [number, number][] {
  const points: [number, number][] = [];
  for (let lat = -90; lat <= 90; lat += 6) {
    for (let lng = -180; lng <= 174; lng += 6) {
      if (!isLand(lat, lng)) {
        points.push([lat, lng]);
      }
    }
  }
  return points;
}

// Precompute once at module level
const LAND_POINTS = generateLandGrid();
const WATER_POINTS = generateWaterGrid();

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function latLngTo3D(lat: number, lng: number): Vec3 {
  const phi = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return {
    x: -Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

function rotateY(v: Vec3, angle: number): Vec3 {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  return {
    x: v.x * cosA - v.z * sinA,
    y: v.y,
    z: v.x * sinA + v.z * cosA,
  };
}

function rotateX(v: Vec3, angle: number): Vec3 {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  return {
    x: v.x,
    y: v.y * cosA - v.z * sinA,
    z: v.y * sinA + v.z * cosA,
  };
}

function project2D(
  v: Vec3,
  radius: number,
  cx: number,
  cy: number
): { sx: number; sy: number; depth: number } {
  return {
    sx: v.x * radius + cx,
    sy: -v.y * radius + cy,
    depth: v.z,
  };
}

export default function Globe({
  className = "",
  primaryColor = "#1a1a2e",
  accentColor = "#c4924a",
  backgroundColor = "#fbf8f4",
  gridColor = "#d9d5ce",
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const landCache = useRef<Vec3[]>([]);
  const waterCache = useRef<Vec3[]>([]);
  const cityCache = useRef<(Vec3 & { name: string })[]>([]);

  const precompute = useCallback(() => {
    landCache.current = LAND_POINTS.map(([lat, lng]) => latLngTo3D(lat, lng));
    waterCache.current = WATER_POINTS.map(([lat, lng]) => latLngTo3D(lat, lng));
    cityCache.current = CITY_MARKERS.map((c) => ({
      ...latLngTo3D(c.lat, c.lng),
      name: c.name,
    }));
  }, []);

  useEffect(() => {
    precompute();
  }, [precompute]);

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      angle: number,
      tilt: number,
      t: number
    ) => {
      const radius = Math.min(w, h) * 0.35;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Globe sphere fill
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.fillStyle = backgroundColor;
      ctx.fill();

      const tiltAngle = tilt * DEG;

      // Helper: project a precomputed 3D point with current rotation
      const project = (v: Vec3) => {
        const ry = rotateY(v, angle);
        const rx = rotateX(ry, tiltAngle);
        return project2D(rx, radius, cx, cy);
      };

      // Draw water grid points
      for (let i = 0; i < waterCache.current.length; i++) {
        const p = project(waterCache.current[i]);
        if (p.depth <= 0) continue;
        const alpha = Math.min(p.depth * 0.4, 0.15);
        const size = Math.max(0.5, p.depth * 0.8);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, TAU);
        ctx.fillStyle = gridColor;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw land dots
      for (let i = 0; i < landCache.current.length; i++) {
        const p = project(landCache.current[i]);
        if (p.depth <= 0) continue;
        const depthNorm = Math.min(p.depth, 1);
        const size = 0.8 + depthNorm * 1.6;
        const alpha = 0.3 + depthNorm * 0.7;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, TAU);
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw city markers
      for (const city of cityCache.current) {
        const p = project(city);
        if (p.depth <= 0.05) continue;
        const markerAlpha = 0.6 + Math.min(p.depth, 1) * 0.4;

        // Pulsing concentric rings
        const ringCount = 3;
        for (let r = 0; r < ringCount; r++) {
          const phase = ((t * 0.001 + r * 0.33) % 1) * TAU;
          const ringProgress = ((Math.sin(phase) + 1) / 2) * 0.6 + 0.4;
          const ringRadius = 4 + ringProgress * 20;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, ringRadius, 0, TAU);
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = markerAlpha * (1 - ringProgress) * 0.6;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Central dot
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 3, 0, TAU);
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = markerAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // City label
        ctx.font = `500 9px "DM Sans", sans-serif`;
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = markerAlpha * 0.85;
        ctx.textAlign = "center";
        ctx.fillText(city.name, p.sx, p.sy + 18);
        ctx.globalAlpha = 1;
      }

      // Globe rim stroke
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.strokeStyle = primaryColor;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    },
    [primaryColor, accentColor, backgroundColor, gridColor]
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const TILT = 15;

    const updateSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      sizeRef.current = { w, h };
      canvas.width = w * (window.devicePixelRatio || 1);
      canvas.height = h * (window.devicePixelRatio || 1);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
    };

    updateSize();

    const ro = new ResizeObserver(() => {
      updateSize();
    });
    ro.observe(container);

    let startTime: number | null = null;

    const ROTATION_PERIOD = 30;
    const ANGULAR_SPEED = TAU / ROTATION_PERIOD;

    // Dubai at ~55°E — initial angle so Dubai faces viewer
    const INITIAL_ANGLE = -55.3 * DEG;

    const loop = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) * 0.001;
      angleRef.current = INITIAL_ANGLE + elapsed * ANGULAR_SPEED;
      timeRef.current = now;

      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) {
        draw(ctx, w, h, angleRef.current, TILT, now);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, [draw]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
