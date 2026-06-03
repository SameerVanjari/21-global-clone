"use client";

import { useEffect, useRef, useCallback } from "react";

interface GlobeProps {
  primaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  gridColor?: string;
  className?: string;
}

const CITIES: { name: string; label: string; lat: number; lng: number }[] = [
  { name: "Dubai", label: "DXB", lat: 25.2, lng: 55.3 },
  { name: "Singapore", label: "SIN", lat: 1.3, lng: 103.8 },
  { name: "Geneva", label: "GVA", lat: 46.2, lng: 6.1 },
];

const GRID_INTERVAL = 3;

function isLand(lat: number, lng: number): boolean {
  if (lat >= 15 && lat <= 72 && lng >= -170 && lng <= -50) return true;
  if (lat >= -56 && lat <= 12 && lng >= -80 && lng <= -34) return true;
  if (lat >= 35 && lat <= 71 && lng >= -10 && lng <= 40) return true;
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 52) return true;
  if (lat >= 5 && lat <= 72 && ((lng >= 40 && lng <= 180) || (lng >= -180 && lng <= -170))) return true;
  if (lat >= -39 && lat <= -10 && lng >= 113 && lng <= 155) return true;
  if (lat >= 12 && lat <= 40 && lng >= 30 && lng <= 60) return true;
  return false;
}

function latLngTo3D(lat: number, lng: number): [number, number, number] {
  const phi = (lat * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  const x = Math.cos(phi) * Math.cos(theta);
  const y = Math.sin(phi);
  const z = Math.cos(phi) * Math.sin(theta);
  return [x, y, z];
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

export default function Globe({
  primaryColor = "#f59e0b",
  accentColor = "#f59e0b",
  backgroundColor = "#0a0a0d",
  gridColor = "#f59e0b",
  className = "",
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const landPointsRef = useRef<[number, number, number][]>([]);
  const gridLinesRef = useRef<{ lngLines: number[][]; latLines: number[][]; meridians: number[]; parallels: number[] }>({
    lngLines: [],
    latLines: [],
    meridians: [],
    parallels: [],
  });

  const draw = useCallback(
    (timestamp: number) => {
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
      const radius = Math.min(w, h) / 2 - 20;

      ctx.clearRect(0, 0, w, h);

      if (startTimeRef.current === 0) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const rotationY = (elapsed / 30) * Math.PI * 2;
      const tiltX = (15 * Math.PI) / 180;

      // Draw border circle
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 1, 0, Math.PI * 2);
      ctx.strokeStyle = "#2d2d35";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw globe background
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = backgroundColor;
      ctx.fill();

      // Draw grid lines
      ctx.lineWidth = 0.5;
      const dotRadius = Math.max(1, radius * 0.004);

      // Latitude lines
      for (let lat = -90; lat <= 90; lat += 15) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 2) {
          const [x, y, z] = latLngTo3D(lat, lng);
          const [rx, ry, rz] = rotateY(x, y, z, rotationY);
          const [rxx, ryy, rzz] = rotateX(rx, ry, rz, tiltX);
          if (rzz > 0) {
            const sx = cx + rxx * radius;
            const sy = cy - ryy * radius;
            if (first) {
              ctx.moveTo(sx, sy);
              first = false;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = `${gridColor}1A`;
        ctx.stroke();
      }

      // Longitude lines
      for (let lng = -180; lng <= 180; lng += 15) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 2) {
          const [x, y, z] = latLngTo3D(lat, lng);
          const [rx, ry, rz] = rotateY(x, y, z, rotationY);
          const [rxx, ryy, rzz] = rotateX(rx, ry, rz, tiltX);
          if (rzz > 0) {
            const sx = cx + rxx * radius;
            const sy = cy - ryy * radius;
            if (first) {
              ctx.moveTo(sx, sy);
              first = false;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = `${gridColor}1A`;
        ctx.stroke();
      }

      // Clipping for globe
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Draw land dots
      ctx.fillStyle = `${primaryColor}4D`;
      for (let lat = -90; lat <= 90; lat += GRID_INTERVAL) {
        for (let lng = -180; lng <= 180; lng += GRID_INTERVAL) {
          if (!isLand(lat, lng)) continue;
          const [x, y, z] = latLngTo3D(lat, lng);
          const [rx, ry, rz] = rotateY(x, y, z, rotationY);
          const [rxx, ryy, rzz] = rotateX(rx, ry, rz, tiltX);
          if (rzz <= 0) continue;
          const sx = cx + rxx * radius;
          const sy = cy - ryy * radius;
          ctx.beginPath();
          ctx.arc(sx, sy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      // Draw city markers and labels (outside clip so they're always visible)
      for (const city of CITIES) {
        const [x, y, z] = latLngTo3D(city.lat, city.lng);
        const [rx, ry, rz] = rotateY(x, y, z, rotationY);
        const [rxx, ryy, rzz] = rotateX(rx, ry, rz, tiltX);

        if (rzz <= 0) continue;

        const sx = cx + rxx * radius;
        const sy = cy - ryy * radius;

        // Pulsing square rings
        const pulse = (Math.sin(elapsed * 3) + 1) / 2;
        const ringSizes = [1, 2, 3];

        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1.5;

        for (const ring of ringSizes) {
          const alpha = 1 - ring * 0.3 - pulse * 0.2;
          const size = 6 + ring * 6 + pulse * 4;
          ctx.globalAlpha = Math.max(0, alpha);
          ctx.strokeRect(sx - size / 2, sy - size / 2, size, size);
        }

        // City dot
        ctx.globalAlpha = 1;
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // City label
        const labelX = sx + 10;
        const labelY = sy - 6;
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.8;
        ctx.fillText(`[${city.label}]`, labelX, labelY);
        ctx.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(draw);
    },
    [primaryColor, accentColor, backgroundColor, gridColor]
  );

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
