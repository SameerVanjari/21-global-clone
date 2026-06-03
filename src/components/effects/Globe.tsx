"use client";

import { useEffect, useRef, useCallback } from "react";

const GLOBE_RADIUS = 0.9;
const TILT = (10 * Math.PI) / 180;
const ROTATION_PERIOD = 45000;
const GRID_STEP = 3;

const CITY_MARKERS = [
  { name: "Dubai", lat: 25.2, lng: 55.3 },
  { name: "Singapore", lat: 1.3, lng: 103.8 },
  { name: "Geneva", lat: 46.2, lng: 6.1 },
];

function isLand(lat: number, lng: number): boolean {
  const absLat = Math.abs(lat);

  // Africa
  if (lng >= -18 && lng <= 52 && lat >= -35 && lat <= 37) return true;
  // Europe
  if (lng >= -10 && lng <= 40 && lat >= 36 && lat <= 71) return true;
  // Scandinavia extension
  if (lng >= 5 && lng <= 30 && lat >= 56 && lat <= 72) return true;
  // UK / Ireland
  if (lng >= -10 && lng <= 2 && lat >= 50 && lat <= 59) return true;
  // Iceland
  if (lng >= -24 && lng <= -13 && lat >= 63 && lat <= 67) return true;
  // Asia main
  if (lng >= 40 && lng <= 180 && lat >= 10 && lat <= 72) return true;
  // Asia south (India, SE Asia)
  if (lng >= 68 && lng <= 180 && lat >= -10 && lat <= 35) return true;
  // Japan
  if (lng >= 128 && lng <= 146 && lat >= 30 && lat <= 46) return true;
  // Middle East / Arabian Peninsula (refined)
  if (lng >= 35 && lng <= 60 && lat >= 12 && lat <= 42) return true;
  // North America
  if (lng >= -170 && lng <= -55 && lat >= 15 && lat <= 72) return true;
  // Alaska extension
  if (lng >= -170 && lng <= -130 && lat >= 55 && lat <= 72) return true;
  // Greenland
  if (lng >= -73 && lng <= -11 && lat >= 60 && lat <= 83) return true;
  // Central America / Mexico
  if (lng >= -120 && lng <= -55 && lat >= 7 && lat <= 33) return true;
  // South America
  if (lng >= -80 && lng <= -35 && lat >= -55 && lat <= 12) return true;
  // Australia
  if (lng >= 112 && lng <= 155 && lat >= -40 && lat <= -10) return true;
  // New Zealand
  if (lng >= 166 && lng <= 179 && lat >= -47 && lat <= -34) return true;
  // Indonesia / Philippines / PNG
  if (lng >= 95 && lng <= 150 && lat >= -10 && lat <= 8) return true;
  // Madagascar
  if (lng >= 43 && lng <= 50 && lat >= -26 && lat <= -12) return true;
  // Caribbean
  if (lng >= -85 && lng <= -60 && lat >= 10 && lat <= 25) return true;
  // Sri Lanka
  if (lng >= 79 && lng <= 82 && lat >= 6 && lat <= 10) return true;
  // Hokkaido / Sakhalin
  if (lng >= 140 && lng <= 146 && lat >= 42 && lat <= 55) return true;
  // Kamchatka
  if (lng >= 155 && lng <= 170 && lat >= 50 && lat <= 65) return true;
  // Turkey / Anatolia
  if (lng >= 26 && lng <= 45 && lat >= 36 && lat <= 42) return true;
  // Central Asia
  if (lng >= 50 && lng <= 85 && lat >= 36 && lat <= 55) return true;
  // Horn of Africa
  if (lng >= 32 && lng <= 52 && lat >= -2 && lat <= 12) return true;
  // West coast of South America (Chile, Peru coast)
  if (lng >= -80 && lng <= -67 && lat >= -55 && lat <= -18) return true;
  // Patagonia
  if (lng >= -75 && lng <= -63 && lat >= -55 && lat <= -40) return true;
  // Baja / Mexico west
  if (lng >= -118 && lng <= -100 && lat >= 22 && lat <= 33) return true;
  // Florida keys / Bahamas
  if (lng >= -83 && lng <= -77 && lat >= 24 && lat <= 28) return true;
  // Cuba
  if (lng >= -85 && lng <= -74 && lat >= 20 && lat <= 24) return true;
  // Hispaniola
  if (lng >= -72 && lng <= -68 && lat >= 17 && lat <= 20) return true;
  // Mediterranean islands (Sicily, Crete, Cyprus)
  if (lng >= 12 && lng <= 34 && lat >= 34 && lat <= 38) return true;
  // Korean peninsula detail
  if (lng >= 124 && lng <= 131 && lat >= 33 && lat <= 43) return true;
  // West Africa bulge
  if (lng >= -18 && lng <= 15 && lat >= 4 && lat <= 20) return true;
  // Southern Africa
  if (lng >= 14 && lng <= 36 && lat >= -35 && lat <= -16) return true;

  // Remove some ocean areas to make it more realistic
  // Caspian Sea
  if (lng >= 47 && lng <= 54 && lat >= 37 && lat <= 47) return false;
  // Mediterranean gaps
  if (lng >= -6 && lng <= 36 && lat >= 34 && lat <= 44) {
    // Only keep land near coasts in Mediterranean
    const medLat = lat;
    const medLng = lng;
    // Spain coast
    if (medLng >= -6 && medLng <= 4 && medLat >= 36 && medLat <= 44) return true;
    // Italy
    if (medLng >= 7 && medLng <= 18 && medLat >= 37 && medLat <= 47) return true;
    // Greece / Balkans
    if (medLng >= 18 && medLng <= 30 && medLat >= 34 && medLat <= 42) return true;
    // Turkey
    if (medLng >= 26 && medLng <= 45 && medLat >= 36 && medLat <= 42) return true;
    // North Africa coast
    if (medLng >= -6 && medLng <= 36 && medLat >= 30 && medLat <= 37) return true;
    return false;
  }
  // Black Sea
  if (lng >= 28 && lng <= 42 && lat >= 41 && lat <= 47) return false;
  // Red Sea
  if (lng >= 34 && lng <= 44 && lat >= 12 && lat <= 30) return false;
  // Persian Gulf
  if (lng >= 48 && lng <= 57 && lat >= 24 && lat <= 31) return false;
  // Great Lakes area (keep some land, reduce coverage)
  if (lng >= -92 && lng <= -76 && lat >= 41 && lat <= 49) return true;
  // Hudson Bay
  if (lng >= -95 && lng <= -77 && lat >= 52 && lat <= 66) return false;
  // Gulf of Mexico
  if (lng >= -98 && lng <= -82 && lat >= 18 && lat <= 30) return false;
  // Caribbean Sea
  if (lng >= -88 && lng <= -60 && lat >= 9 && lat <= 22) {
    // Only keep islands
    const cLat = lat;
    const cLng = lng;
    // Cuba / Hispaniola / Jamaica / Puerto Rico area
    if (cLat >= 17 && cLat <= 24 && cLng >= -85 && cLng <= -65) return true;
    return false;
  }
  // Bay of Bengal
  if (lng >= 80 && lng <= 96 && lat >= 5 && lat <= 22) return false;
  // South China Sea (keep only coastal/island areas)
  if (lng >= 105 && lng <= 122 && lat >= 2 && lat <= 22) return false;
  // Sea of Japan
  if (lng >= 128 && lng <= 142 && lat >= 34 && lat <= 46) return false;
  // Baltic Sea
  if (lng >= 12 && lng <= 30 && lat >= 54 && lat <= 60) return false;
  // North Sea
  if (lng >= -4 && lng <= 10 && lat >= 52 && lat <= 60) return false;
  // Bering Sea
  if (lng >= -180 && lng <= -160 && lat >= 52 && lat <= 66) return false;
  // Sea of Okhotsk
  if (lng >= 135 && lng <= 160 && lat >= 44 && lat <= 62) return false;
  // East China Sea
  if (lng >= 120 && lng <= 131 && lat >= 24 && lat <= 33) return false;
  // Yellow Sea
  if (lng >= 117 && lng <= 127 && lat >= 32 && lat <= 40) return false;
  // Arabian Sea
  if (lng >= 55 && lng <= 75 && lat >= 5 && lat <= 24) return false;
  // Gulf of Guinea
  if (lng >= -8 && lng <= 10 && lat >= -5 && lat <= 6) return false;
  // Mozambique Channel
  if (lng >= 35 && lng <= 50 && lat >= -26 && lat <= -10) return false;
  // Tasman Sea
  if (lng >= 148 && lng <= 170 && lat >= -45 && lat <= -33) return false;
  // Coral Sea
  if (lng >= 145 && lng <= 165 && lat >= -28 && lat <= -8) return false;
  // Timor / Arafura Sea
  if (lng >= 126 && lng <= 142 && lat >= -15 && lat <= -8) return false;
  // Banda / Java Sea
  if (lng >= 106 && lng <= 128 && lat >= -8 && lat <= -3) return false;
  // Gulf of California
  if (lng >= -115 && lng <= -107 && lat >= 24 && lat <= 32) return false;
  // Rio de la Plata
  if (lng >= -60 && lng <= -55 && lat >= -38 && lat <= -34) return false;
  // Amazon basin (keep it as there's a river, not sea)
  // Lake Victoria
  if (lng >= 31 && lng <= 35 && lat >= -3 && lat <= 1) return false;
  // Caspian is already handled above
  // Lake Baikal
  if (lng >= 103 && lng <= 110 && lat >= 51 && lat <= 56) return false;
  // Aral Sea area
  if (lng >= 58 && lng <= 62 && lat >= 43 && lat <= 47) return false;
  // Gulf of Thailand
  if (lng >= 99 && lng <= 105 && lat >= 6 && lat <= 14) return false;
  // Andaman Sea
  if (lng >= 92 && lng <= 99 && lat >= 5 && lat <= 17) return false;
  // Bay of Biscay
  if (lng >= -10 && lng <= 0 && lat >= 44 && lat <= 48) return false;
  // English Channel
  if (lng >= -6 && lng <= 2 && lat >= 48 && lat <= 52) return false;
  // Irish Sea
  if (lng >= -7 && lng <= -3 && lat >= 52 && lat <= 55) return false;
  // Gulf of St. Lawrence
  if (lng >= -68 && lng <= -56 && lat >= 45 && lat <= 52) return false;
  // Gulf of Alaska
  if (lng >= -152 && lng <= -135 && lat >= 56 && lat <= 62) return false;
  // Canadian Arctic Archipelago gaps
  if (lng >= -120 && lng <= -70 && lat >= 68 && lat <= 78) {
    // Keep some land (the islands)
    const aLat = lat;
    const aLng = lng;
    // Cell patterns to create island shapes
    const x = Math.round(aLng / 5);
    const y = Math.round(aLat / 5);
    if ((x + y) % 3 === 0) return true;
    if ((x * 7 + y * 3) % 5 === 0) return true;
    return false;
  }
  // Indonesian gaps (keep some islands, remove water)
  if (lng >= 95 && lng <= 141 && lat >= -10 && lat <= 8) {
    const iLng = lng;
    const iLat = lat;
    const ix = Math.round(iLng / 4);
    const iy = Math.round(iLat / 4);
    return (ix + iy) % 2 === 0;
  }
  // Pacific islands
  if (lng >= 170 && lng <= 180 && lat >= -20 && lat <= -14) return true;
  if (lng >= -175 && lng <= -155 && lat >= -22 && lat <= -15) return true;
  if (lng >= -160 && lng <= -154 && lat >= 18 && lat <= 22) return true;

  return false;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

function latLngTo3D(lat: number, lng: number): Point3D {
  const phi = (lat * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  return {
    x: Math.cos(phi) * Math.cos(theta),
    y: Math.cos(phi) * Math.sin(theta),
    z: Math.sin(phi),
  };
}

function rotateY(p: Point3D, angle: number): Point3D {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  return {
    x: p.x * cosA - p.z * sinA,
    y: p.y,
    z: p.x * sinA + p.z * cosA,
  };
}

function rotateX(p: Point3D, angle: number): Point3D {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  return {
    x: p.x,
    y: p.y * cosA - p.z * sinA,
    z: p.y * sinA + p.z * cosA,
  };
}

function projectOrtho(
  p: Point3D,
  cx: number,
  cy: number,
  scale: number
): { x: number; y: number; z: number } {
  return {
    x: cx + p.x * scale,
    y: cy - p.y * scale,
    z: p.z,
  };
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const drawGlobe = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (startTimeRef.current === 0) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const rotation = (elapsed / ROTATION_PERIOD) * Math.PI * 2;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);

    const cx = displayWidth / 2;
    const cy = displayHeight / 2;
    const scale = Math.min(cx, cy) * 0.85;

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Background
    ctx.fillStyle = "#f5f2ed";
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Globe outline with slight irregularity (carved stone feel)
    ctx.save();
    ctx.beginPath();
    const outlineSteps = 120;
    for (let i = 0; i <= outlineSteps; i++) {
      const angle = (i / outlineSteps) * Math.PI * 2;
      // Subtle irregularity using multi-frequency noise
      const irregular =
        1 +
        0.008 * Math.sin(angle * 13 + 0.7) +
        0.006 * Math.cos(angle * 7 + 2.1) +
        0.004 * Math.sin(angle * 19 + 3.4) +
        0.003 * Math.cos(angle * 23 + 5.1);
      const r = scale * GLOBE_RADIUS * irregular;
      const ox = cx + Math.cos(angle) * r;
      const oy = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(ox, oy);
      else ctx.lineTo(ox, oy);
    }
    ctx.closePath();
    ctx.clip();

    // Fill globe background
    ctx.fillStyle = "#f5f2ed";
    ctx.fillRect(cx - scale, cy - scale, scale * 2, scale * 2);

    // Draw darkness on the back half (shadow side of sphere)
    const gradient = ctx.createRadialGradient(
      cx - scale * 0.15,
      cy - scale * 0.1,
      scale * 0.3,
      cx,
      cy,
      scale * GLOBE_RADIUS
    );
    gradient.addColorStop(0, "rgba(245, 242, 237, 0)");
    gradient.addColorStop(0.7, "rgba(245, 242, 237, 0.02)");
    gradient.addColorStop(0.85, "rgba(200, 196, 189, 0.05)");
    gradient.addColorStop(0.95, "rgba(180, 176, 169, 0.12)");
    gradient.addColorStop(1, "rgba(160, 156, 149, 0.2)");
    ctx.fillStyle = gradient;
    ctx.fillRect(cx - scale, cy - scale, scale * 2, scale * 2);

    // Draw land dots
    for (let lat = -90; lat <= 90; lat += GRID_STEP) {
      for (let lng = -180; lng <= 180; lng += GRID_STEP) {
        if (!isLand(lat, lng)) continue;

        const p = latLngTo3D(lat, lng);
        const ry = rotateY(p, rotation);
        const rx = rotateX(ry, TILT);

        if (rx.z <= 0) continue;

        const proj = projectOrtho(rx, cx, cy, scale);

        // Z-depth: darker and smaller when further away
        const zFactor = rx.z * rx.z; // square for more dramatic depth
        const dotSize = 0.8 + zFactor * 1.2;
        const alpha = 0.2 + zFactor * 0.8;

        ctx.fillStyle = `rgba(26, 26, 26, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw city markers
    for (const city of CITY_MARKERS) {
      const p = latLngTo3D(city.lat, city.lng);
      const ry = rotateY(p, rotation);
      const rx = rotateX(ry, TILT);

      if (rx.z <= 0) continue;

      const proj = projectOrtho(rx, cx, cy, scale);

      // Outer glow ring
      const glowRadius = 4;
      const glowGrad = ctx.createRadialGradient(
        proj.x,
        proj.y,
        1.5,
        proj.x,
        proj.y,
        glowRadius
      );
      glowGrad.addColorStop(0, "rgba(26, 26, 26, 0.6)");
      glowGrad.addColorStop(0.5, "rgba(26, 26, 26, 0.15)");
      glowGrad.addColorStop(1, "rgba(26, 26, 26, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Center dot
      ctx.fillStyle = "rgba(26, 26, 26, 0.85)";
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    rafRef.current = requestAnimationFrame(drawGlobe);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(drawGlobe);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [drawGlobe]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
