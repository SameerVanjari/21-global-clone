"use client";

import { useEffect, useRef } from "react";

interface CityMarker {
  name: string;
  label: string;
  lat: number;
  lng: number;
  color: string;
}

const CITIES: CityMarker[] = [
  { name: "Dubai", label: "TARGET:DXB", lat: 25.2048, lng: 55.2708, color: "#00f0ff" },
  { name: "Singapore", label: "TARGET:SIN", lat: 1.3521, lng: 103.8198, color: "#ff00e5" },
  { name: "Geneva", label: "TARGET:GVA", lat: 46.2044, lng: 6.1432, color: "#ffaa00" },
];

const CONTINENT_BOUNDS: { lat: [number, number]; lng: [number, number] }[] = [
  { lat: [-55, -35], lng: [-110, -35] },
  { lat: [5, 30], lng: [-120, -60] },
  { lat: [-35, 15], lng: [-80, -35] },
  { lat: [30, 72], lng: [-170, -50] },
  { lat: [35, 72], lng: [-15, 40] },
  { lat: [35, 72], lng: [40, 180] },
  { lat: [-10, 35], lng: [-20, 55] },
  { lat: [-35, 35], lng: [10, 52] },
  { lat: [-35, -10], lng: [15, 35] },
  { lat: [7, 30], lng: [55, 140] },
  { lat: [-10, 7], lng: [95, 150] },
  { lat: [10, 30], lng: [-15, 55] },
  { lat: [-35, 5], lng: [30, 95] },
  { lat: [-55, 10], lng: [110, 180] },
  { lat: [-20, 35], lng: [-130, -80] },
  { lat: [30, 55], lng: [45, 85] },
  { lat: [55, 72], lng: [40, 170] },
];

function isLand(lat: number, lng: number): boolean {
  for (const box of CONTINENT_BOUNDS) {
    if (lat >= box.lat[0] && lat <= box.lat[1] && lng >= box.lng[0] && lng <= box.lng[1]) {
      return true;
    }
  }
  return false;
}

function latLngTo3D(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

function rotateY(x: number, y: number, z: number, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: x * cos - z * sin, y, z: x * sin + z * cos };
}

function rotateX(x: number, y: number, z: number, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x, y: y * cos - z * sin, z: y * sin + z * cos };
}

interface Pulse {
  lat: number;
  lng: number;
  startTime: number;
  color: string;
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let radius = 0;
    let centerX = 0;
    let centerY = 0;
    const TILT = (15 * Math.PI) / 180;
    let rotation = 0;
    const ROTATION_SPEED = (2 * Math.PI) / 20000; // ~25s full rotation
    let animationId: number;
    let lastTime = 0;

    let glitchOffset = 0;
    let glitchTimer = 0;
    let nextGlitch = 5000 + Math.random() * 3000;
    const GLITCH_DURATION = 100;

    const pulses: Pulse[] = [];
    CITIES.forEach((c, i) => {
      pulses.push({
        lat: c.lat,
        lng: c.lng,
        startTime: performance.now() + i * 800,
        color: c.color,
      });
    });

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(width, height) * 0.38;
      centerX = width / 2;
      centerY = height / 2;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (timestamp: number) => {
      if (!ctx) return;
      const dt = lastTime ? timestamp - lastTime : 16;
      lastTime = timestamp;

      rotation += ROTATION_SPEED * dt;
      if (rotation > Math.PI * 2) rotation -= Math.PI * 2;

      glitchTimer += dt;
      if (glitchTimer >= nextGlitch) {
        glitchOffset = (Math.random() - 0.5) * 4;
        glitchTimer = 0;
        nextGlitch = 5000 + Math.random() * 3000;
      } else if (glitchTimer > GLITCH_DURATION) {
        glitchOffset = 0;
      }

      ctx.clearRect(-glitchOffset, 0, width + 2, height);

      const landPoints: { x: number; y: number; z: number; alpha: number }[] = [];

      // Latitude lines
      for (let lat = -75; lat <= 75; lat += 30) {
        const points: { x: number; y: number }[] = [];
        for (let lng = -180; lng <= 180; lng += 1) {
          const p3 = latLngTo3D(lat, lng, radius);
          const ry = rotateY(p3.x, p3.y, p3.z, rotation);
          const rx = rotateX(ry.x, ry.y, ry.z, TILT);
          if (rx.z > 0) {
            points.push({ x: centerX + rx.x + glitchOffset, y: centerY - rx.y });
          }
        }
        if (points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Longitude lines
      for (let lng = -180; lng < 180; lng += 30) {
        const points: { x: number; y: number }[] = [];
        for (let lat = -90; lat <= 90; lat += 1) {
          const p3 = latLngTo3D(lat, lng, radius);
          const ry = rotateY(p3.x, p3.y, p3.z, rotation);
          const rx = rotateX(ry.x, ry.y, ry.z, TILT);
          if (rx.z > 0) {
            points.push({ x: centerX + rx.x + glitchOffset, y: centerY - rx.y });
          }
        }
        if (points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Landmass dots + wireframe connections
      const GRID_STEP = 3;
      const connectionThreshold = 5;
      for (let lat = -90; lat <= 90; lat += GRID_STEP) {
        for (let lng = -180; lng <= 180; lng += GRID_STEP) {
          if (isLand(lat, lng)) {
            const p3 = latLngTo3D(lat, lng, radius + 0.3);
            const ry = rotateY(p3.x, p3.y, p3.z, rotation);
            const rx = rotateX(ry.x, ry.y, ry.z, TILT);
            if (rx.z > 0) {
              const zNorm = rx.z / radius;
              const alpha = 0.3 + zNorm * 0.4;
              landPoints.push({
                x: centerX + rx.x + glitchOffset,
                y: centerY - rx.y,
                z: rx.z,
                alpha,
              });
            }
          }
        }
      }

      // Draw land dots
      for (const pt of landPoints) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${pt.alpha.toFixed(2)})`;
        ctx.fill();
      }

      // Connect nearby land dots with thin lines
      for (let i = 0; i < landPoints.length; i++) {
        for (let j = i + 1; j < landPoints.length; j++) {
          const dx = landPoints[i].x - landPoints[j].x;
          const dy = landPoints[i].y - landPoints[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionThreshold) {
            const avgAlpha = (landPoints[i].alpha + landPoints[j].alpha) * 0.5 * 0.5;
            ctx.beginPath();
            ctx.moveTo(landPoints[i].x, landPoints[i].y);
            ctx.lineTo(landPoints[j].x, landPoints[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${avgAlpha.toFixed(2)})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }

      // City markers
      for (const city of CITIES) {
        const p3 = latLngTo3D(city.lat, city.lng, radius + 0.5);
        const ry = rotateY(p3.x, p3.y, p3.z, rotation);
        const rx = rotateX(ry.x, ry.y, ry.z, TILT);

        if (rx.z > 0) {
          const cx = centerX + rx.x + glitchOffset;
          const cy = centerY - rx.y;

          // Crosshair
          ctx.strokeStyle = city.color;
          ctx.lineWidth = 1;
          ctx.shadowColor = city.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(cx - 6, cy);
          ctx.lineTo(cx + 6, cy);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, cy - 6);
          ctx.lineTo(cx, cy + 6);
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Center dot
          ctx.beginPath();
          ctx.arc(cx, cy, 2, 0, Math.PI * 2);
          ctx.fillStyle = city.color;
          ctx.shadowColor = city.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Corner brackets
          ctx.strokeStyle = city.color;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = 0.5;
          const bs = 3;
          [
            [cx - 8, cy - 8, 1, 1],
            [cx + 8, cy - 8, -1, 1],
            [cx - 8, cy + 8, 1, -1],
            [cx + 8, cy + 8, -1, -1],
          ].forEach(([bx, by, dx, dy]) => {
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(bx + dx * bs, by);
            ctx.moveTo(bx, by);
            ctx.lineTo(bx, by + dy * bs);
            ctx.stroke();
          });
          ctx.globalAlpha = 1;

          // Label
          ctx.font = `8px "JetBrains Mono", monospace`;
          ctx.fillStyle = city.color;
          ctx.globalAlpha = 0.7;
          ctx.fillText(city.label, cx + 10, cy - 10);
          ctx.globalAlpha = 1;
        }
      }

      // Pulse rings
      pulses.forEach((p) => {
        const city = CITIES.find((c) => c.color === p.color);
        if (!city) return;
        const elapsed = timestamp - p.startTime;
        const cycleTime = 2500;
        const progress = (elapsed % cycleTime) / cycleTime;
        const ringRadius = progress * 20;

        const p3 = latLngTo3D(city.lat, city.lng, radius + 0.5);
        const ry = rotateY(p3.x, p3.y, p3.z, rotation);
        const rx = rotateX(ry.x, ry.y, ry.z, TILT);

        if (rx.z > 0) {
          const px = centerX + rx.x + glitchOffset;
          const py = centerY - rx.y;

          ctx.beginPath();
          ctx.arc(px, py, ringRadius, 0, Math.PI * 2);
          ctx.lineWidth = 1;
          ctx.globalAlpha = (1 - progress) * 0.6;
          ctx.strokeStyle = p.color;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      // Thin glowing border circle around globe
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
      ctx.lineWidth = 1;
      ctx.shadowColor = "rgba(0, 240, 255, 0.4)";
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  );
}
