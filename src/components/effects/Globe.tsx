"use client";

import { useEffect, useRef, useCallback } from "react";

const GOLD = "#d4a853";
const GOLD_LIGHT = "#e8c97a";
const CHAMPAGNE = "#efe0c0";
const LAND_COLOR = "rgba(212, 168, 83, 0.35)";
const LAND_COLOR_DIM = "rgba(239, 224, 192, 0.25)";
const GRID_COLOR = "rgba(212, 168, 83, 0.15)";
const DIAMOND_COLOR = "#d4a853";
const DIAMOND_RING_COLOR = "rgba(212, 168, 83, 0.6)";
const DIAMOND_GLOW = "rgba(232, 201, 122, 0.8)";
const LABEL_COLOR = "#efe0c0";

const CONTINENTS: { name: string; latMin: number; latMax: number; lngMin: number; lngMax: number }[] = [
  { name: "N.America", latMin: 15, latMax: 72, lngMin: -170, lngMax: -50 },
  { name: "S.America", latMin: -56, latMax: 12, lngMin: -80, lngMax: -34 },
  { name: "Europe", latMin: 35, latMax: 71, lngMin: -10, lngMax: 40 },
  { name: "Africa", latMin: -35, latMax: 37, lngMin: -18, lngMax: 52 },
  { name: "Asia", latMin: 5, latMax: 72, lngMin: 40, lngMax: 180 },
  { name: "Australia", latMin: -39, latMax: -10, lngMin: 113, lngMax: 155 },
  { name: "Middle East", latMin: 12, latMax: 40, lngMin: 30, lngMax: 60 },
];

const CITIES = [
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Geneva", lat: 46.2044, lng: 6.1432 },
];

function isLand(lat: number, lng: number): boolean {
  for (const c of CONTINENTS) {
    if (lat >= c.latMin && lat <= c.latMax && lng >= c.lngMin && lng <= c.lngMax) {
      return true;
    }
  }
  return false;
}

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function latLngTo3D(lat: number, lng: number): [number, number, number] {
  const phi = degToRad(lat);
  const theta = degToRad(lng);
  return [
    Math.cos(phi) * Math.cos(theta),
    Math.sin(phi),
    Math.cos(phi) * Math.sin(theta),
  ];
}

function rotateY(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos - z * sin, y, x * sin + z * cos];
}

function rotateX(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(x: number, y: number, radius: number, cx: number, cy: number): [number, number, number] {
  return [cx + x * radius, cy - y * radius, /* z stays for depth check */ 0];
}

interface DiamondRing {
  phase: number;
  maxSize: number;
}

export default function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringsRef = useRef<Map<string, DiamondRing[]>>(new Map());
  const timeRef = useRef(0);

  const drawGlobe = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.36;
    const tiltAngle = degToRad(15);
    const spinAngle = (timeRef.current * 0.001) * ((2 * Math.PI) / 30);

    ctx.clearRect(0, 0, w, h);

    // Outer glow behind globe
    const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.5);
    glowGrad.addColorStop(0, "rgba(212, 168, 83, 0.08)");
    glowGrad.addColorStop(0.5, "rgba(232, 201, 122, 0.04)");
    glowGrad.addColorStop(1, "rgba(212, 168, 83, 0)");
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = glowGrad;
    ctx.fill();

    // Lat/long grid
    const gridLines: [number, number][][][] = [];

    // Latitude lines
    for (let lat = -90; lat <= 90; lat += 15) {
      const line: [number, number][] = [];
      for (let lng = -180; lng <= 180; lng += 2) {
        const [x, y, z] = latLngTo3D(lat, lng);
        let [rx, ry, rz] = rotateY(x, y, z, spinAngle);
        [rx, ry, rz] = rotateX(rx, ry, rz, tiltAngle);
        if (rz > 0) {
          const [sx, sy] = project(rx, ry, radius, cx, cy);
          line.push([sx, sy]);
        } else if (line.length > 0) {
          gridLines.push([line]);
          line.length = 0;
        }
      }
      if (line.length > 0) gridLines.push([line]);
    }

    // Longitude lines
    for (let lng = -180; lng <= 180; lng += 15) {
      const line: [number, number][] = [];
      for (let lat = -90; lat <= 90; lat += 2) {
        const [x, y, z] = latLngTo3D(lat, lng);
        let [rx, ry, rz] = rotateY(x, y, z, spinAngle);
        [rx, ry, rz] = rotateX(rx, ry, rz, tiltAngle);
        if (rz > 0) {
          const [sx, sy] = project(rx, ry, radius, cx, cy);
          line.push([sx, sy]);
        } else if (line.length > 0) {
          gridLines.push([line]);
          line.length = 0;
        }
      }
      if (line.length > 0) gridLines.push([line]);
    }

    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = 0.5;
    for (const segment of gridLines) {
      for (const line of segment) {
        if (line.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(line[0][0], line[0][1]);
        for (let i = 1; i < line.length; i++) {
          ctx.lineTo(line[i][0], line[i][1]);
        }
        ctx.stroke();
      }
    }

    // Land dots
    const landDots: [number, number, number][] = [];
    for (let lat = -90; lat <= 90; lat += 3) {
      for (let lng = -180; lng <= 180; lng += 3) {
        if (isLand(lat, lng)) {
          const [x, y, z] = latLngTo3D(lat, lng);
          let [rx, ry, rz] = rotateY(x, y, z, spinAngle);
          [rx, ry, rz] = rotateX(rx, ry, rz, tiltAngle);
          if (rz > 0) {
            const [sx, sy] = project(rx, ry, radius, cx, cy);
            const depth = (rz + 1) / 2;
            landDots.push([sx, sy, depth]);
          }
        }
      }
    }

    for (const [sx, sy, d] of landDots) {
      const alpha = 0.15 + d * 0.35;
      ctx.fillStyle = `rgba(212, 168, 83, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Diamond decorative border
    const borderCount = 28;
    const borderRadius = radius * 1.15;
    for (let i = 0; i < borderCount; i++) {
      const angle = (i / borderCount) * Math.PI * 2 + spinAngle * 0.2;
      const bx = cx + Math.cos(angle) * borderRadius;
      const by = cy + Math.sin(angle) * borderRadius;
      const diamondSize = 4;
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = "rgba(212, 168, 83, 0.25)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(-diamondSize / 2, -diamondSize / 2, diamondSize, diamondSize);
      ctx.restore();
    }

    // City markers
    const now = timeRef.current * 0.001;
    const ringsMap = ringsRef.current;

    for (const city of CITIES) {
      const [x, y, z] = latLngTo3D(city.lat, city.lng);
      let [rx, ry, rz] = rotateY(x, y, z, spinAngle);
      [rx, ry, rz] = rotateX(rx, ry, rz, tiltAngle);
      const onFront = rz > 0;
      const [sx, sy] = project(rx, ry, radius, cx, cy);

      if (!onFront) continue;

      // Expanding diamond rings
      let rings = ringsMap.get(city.name);
      if (!rings) {
        rings = [];
        for (let i = 0; i < 3; i++) {
          rings.push({ phase: i * 2, maxSize: 14 + i * 6 });
        }
        ringsMap.set(city.name, rings);
      }

      for (const ring of rings) {
        const t = (now % 3) / 3 + ring.phase * 0.08;
        const eased = t % 1;
        const size = eased * ring.maxSize;
        const alpha = (1 - eased) * 0.5;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(Math.PI / 4);
        ctx.strokeStyle = DIAMOND_RING_COLOR.replace("0.6", alpha.toFixed(2));
        ctx.lineWidth = 1;
        ctx.strokeRect(-size / 2, -size / 2, size, size);
        ctx.restore();
      }

      // Diamond marker (rotated square)
      const diamondSize = 8;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(Math.PI / 4);

      // Glow
      ctx.shadowColor = DIAMOND_GLOW;
      ctx.shadowBlur = 8;
      ctx.fillStyle = DIAMOND_COLOR;
      ctx.fillRect(-diamondSize / 2, -diamondSize / 2, diamondSize, diamondSize);
      ctx.shadowBlur = 0;

      // Inner diamond
      ctx.fillStyle = GOLD_LIGHT;
      ctx.fillRect(-diamondSize / 4, -diamondSize / 4, diamondSize / 2, diamondSize / 2);
      ctx.restore();

      // City label
      ctx.fillStyle = LABEL_COLOR;
      ctx.font = "italic 10px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.globalAlpha = 0.85;
      ctx.fillText(city.name, sx, sy + diamondSize * 1.2 + 14);
      ctx.globalAlpha = 1;
    }

    // Sphere outline
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(212, 168, 83, 0.2)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Subtle inner sphere gradient
    const sphereGrad = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.25, 0, cx, cy, radius);
    sphereGrad.addColorStop(0, "rgba(212, 168, 83, 0.04)");
    sphereGrad.addColorStop(0.7, "rgba(212, 168, 83, 0.01)");
    sphereGrad.addColorStop(1, "rgba(212, 168, 83, 0)");
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = sphereGrad;
    ctx.fill();
  }, []);

  useEffect(() => {
    let animId: number;

    const animate = () => {
      timeRef.current += 16.67;
      drawGlobe();
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      drawGlobe();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawGlobe]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
    />
  );
}
