"use client";

import { useEffect, useRef } from "react";

const GLOBE_RADIUS = 160;
const TILT = 12 * (Math.PI / 180);
const BASE_SPEED = 0.00012;
const CITY_MARKERS = [
  { name: "Dubai", lat: 25.2, lng: 55.3 },
  { name: "Singapore", lat: 1.35, lng: 103.8 },
  { name: "Geneva", lat: 46.2, lng: 6.15 },
];

const CONTINENTS: { latMin: number; latMax: number; lngMin: number; lngMax: number }[] = [
  { latMin: 15, latMax: 72, lngMin: -170, lngMax: -50 },
  { latMin: -56, latMax: 12, lngMin: -80, lngMax: -34 },
  { latMin: 35, latMax: 71, lngMin: -10, lngMax: 40 },
  { latMin: -35, latMax: 37, lngMin: -18, lngMax: 52 },
  { latMin: 5, latMax: 72, lngMin: 40, lngMax: 180 },
  { latMin: -39, latMax: -10, lngMin: 113, lngMax: 155 },
  { latMin: 12, latMax: 40, lngMin: 30, lngMax: 60 },
];

function isLand(lat: number, lng: number): boolean {
  for (const c of CONTINENTS) {
    if (lat >= c.latMin && lat <= c.latMax && lng >= c.lngMin && lng <= c.lngMax) {
      return true;
    }
  }
  return false;
}

function latLngToVec3(lat: number, lng: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = lng * (Math.PI / 180);
  return [
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ];
}

function rotateY(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function organicRadius(angle: number, time: number, baseRadius: number): number {
  const noise =
    Math.sin(angle * 3 + time * 0.3) * 1.5 +
    Math.cos(angle * 5 - time * 0.2) * 1.2 +
    Math.sin(angle * 7 + time * 0.4) * 0.8;
  return baseRadius + noise;
}

function drawLeafMarker(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  pulse: number,
  color: string
) {
  const size = r * 1.6 * pulse;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-Math.PI / 4);
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.bezierCurveTo(size * 0.8, -size * 0.6, size * 0.8, size * 0.2, 0, size);
  ctx.bezierCurveTo(-size * 0.8, size * 0.2, -size * 0.8, -size * 0.6, 0, -size);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function project(lat: number, lng: number, rot: number) {
  const [vx, vy, vz] = latLngToVec3(lat, lng);
  const [rx, ry, rz] = rotateY(vx, vy, vz, rot);
  const [tx, ty, tz] = rotateX(rx, ry, rz, TILT);
  return { x: tx, y: ty, z: tz };
}

function drawGlobeFill(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number
) {
  const grad = ctx.createRadialGradient(
    cx - GLOBE_RADIUS * 0.25,
    cy - GLOBE_RADIUS * 0.3,
    GLOBE_RADIUS * 0.1,
    cx,
    cy,
    GLOBE_RADIUS
  );
  grad.addColorStop(0, "rgba(253, 248, 240, 0.95)");
  grad.addColorStop(0.5, "rgba(252, 243, 230, 0.9)");
  grad.addColorStop(0.85, "rgba(242, 228, 210, 0.7)");
  grad.addColorStop(1, "rgba(232, 213, 196, 0.4)");

  ctx.beginPath();
  ctx.arc(cx, cy, GLOBE_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
}

function drawLatitudeLines(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  time: number,
  rot: number,
  dpr: number
) {
  for (let lat = -60; lat <= 60; lat += 15) {
    const points: [number, number][] = [];
    for (let lng = 0; lng <= 360; lng += 3) {
      const { x, y, z } = project(lat, lng, rot);
      if (z > 0) {
        points.push([cx + x * GLOBE_RADIUS, cy - y * GLOBE_RADIUS]);
      }
    }

    if (points.length > 2) {
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        const px = points[i][0];
        const py = points[i][1];
        const wave = Math.sin(px * 0.05 + time * 0.5 + lat * 0.3) * 1.0;
        ctx.lineTo(px, py + wave);
      }
      ctx.strokeStyle = `rgba(125, 155, 118, 0.12)`;
      ctx.lineWidth = 0.5 * dpr;
      ctx.stroke();
    }
  }
}

function drawGlobeOutline(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  time: number,
  dpr: number
) {
  const steps = 100;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const r = organicRadius(angle, time, GLOBE_RADIUS);
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = `rgba(194, 105, 65, 0.18)`;
  ctx.lineWidth = 1.2 * dpr;
  ctx.stroke();
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;

    function updateSize() {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      w = Math.floor(rect.width * dpr);
      h = Math.floor(rect.height * dpr);
      c.width = w;
      c.height = h;
    }

    updateSize();

    let animId: number;
    let rotation = 0;
    let lastTime = performance.now();

    const landDots: [number, number][] = [];
    for (let lat = -75; lat <= 75; lat += 3) {
      for (let lng = -175; lng <= 175; lng += 3) {
        if (isLand(lat, lng)) {
          landDots.push([lat, lng]);
        }
      }
    }

    function animate(now: number) {
      const cx = w / 2;
      const cy = h / 2;
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      const c = ctx!;

      const wobble = 1 + Math.sin(now * 0.00008) * 0.08 + Math.sin(now * 0.00015) * 0.05;
      rotation += BASE_SPEED * wobble * dt;

      c.clearRect(0, 0, w, h);

      drawGlobeFill(c, cx, cy);

      for (const [lat, lng] of landDots) {
        const { x, y, z } = project(lat, lng, rotation);
        if (z <= 0) continue;
        const px = cx + x * GLOBE_RADIUS;
        const py = cy - y * GLOBE_RADIUS;

        const distFromCenter = Math.sqrt(x * x + y * y);
        const edgeFade = 1 - Math.min(1, distFromCenter / 0.95);
        const opacity = (0.18 + 0.32 * (1 - Math.abs(lat / 75))) * edgeFade;

        c.beginPath();
        c.arc(px, py, 1.6 * dpr * (0.8 + 0.2 * edgeFade), 0, Math.PI * 2);
        c.fillStyle = `rgba(125, 155, 118, ${opacity.toFixed(2)})`;
        c.fill();
      }

      drawLatitudeLines(c, cx, cy, now * 0.001, rotation, dpr);
      drawGlobeOutline(c, cx, cy, now * 0.001, dpr);

      for (const city of CITY_MARKERS) {
        const { x, y, z } = project(city.lat, city.lng, rotation);
        if (z <= 0) continue;
        const px = cx + x * GLOBE_RADIUS;
        const py = cy - y * GLOBE_RADIUS;

        const pulse = 1 + Math.sin(now * 0.003) * 0.15;
        drawLeafMarker(c, px, py, 6 * dpr, pulse, "#c26941");

        c.beginPath();
        c.arc(px, py, 8 * dpr * pulse * 0.3, 0, Math.PI * 2);
        c.fillStyle = `rgba(194, 105, 65, ${(0.15 * pulse).toFixed(2)})`;
        c.fill();
      }

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    const resizeHandler = () => updateSize();
    window.addEventListener("resize", resizeHandler);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-1/2 top-0 h-full w-[480px] max-w-full -translate-x-1/2"
      aria-hidden="true"
    />
  );
}
