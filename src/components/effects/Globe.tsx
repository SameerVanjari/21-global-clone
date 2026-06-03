"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constants ───────────────────────────────────────────────────────

const CITIES = [
  { name: "Dubai", lat: 25.2, lng: 55.3 },
  { name: "Singapore", lat: 1.3, lng: 103.8 },
  { name: "Geneva", lat: 46.2, lng: 6.1 },
] as const;

const GRID_INTERVAL = 3;

// ─── Continent bounding boxes ────────────────────────────────────────

function isLand(lat: number, lng: number): boolean {
  if (lat >= 15 && lat <= 72 && lng >= -170 && lng <= -50) return true; // N America
  if (lat >= -56 && lat <= 12 && lng >= -80 && lng <= -34) return true; // S America
  if (lat >= 35 && lat <= 71 && lng >= -10 && lng <= 40) return true; // Europe
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 52) return true; // Africa
  if (lat >= 5 && lat <= 72 && ((lng >= 40 && lng <= 180) || (lng >= -180 && lng <= -170)))
    return true; // Asia
  if (lat >= -39 && lat <= -10 && lng >= 113 && lng <= 155) return true; // Australia
  if (lat >= 12 && lat <= 40 && lng >= 30 && lng <= 60) return true; // Middle East
  return false;
}

function latLngToVec3(lat: number, lng: number, radius = 1): THREE.Vector3 {
  const phi = (lat * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.cos(theta),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.sin(theta)
  );
}

// ─── Arc shaders (animated dash) ─────────────────────────────────────

const ARC_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ARC_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    float t = fract(vUv.y * 18.0 - uTime * 2.5);
    float alpha = smoothstep(0.0, 0.08, t) * (1.0 - smoothstep(0.42, 0.50, t));
    gl_FragColor = vec4(0.961, 0.369, 0.043, alpha * 0.85);
  }
`;

// ─── Globe base sphere ───────────────────────────────────────────────

function GlobeBase() {
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial color="#1a1a1a" />
    </mesh>
  );
}

// ─── Wireframe overlay (30° lat/lng intervals) ───────────────────────

function GlobeWireframe() {
  return (
    <mesh>
      <sphereGeometry args={[1.006, 12, 6]} />
      <meshBasicMaterial
        color="#f59e0b"
        wireframe
        transparent
        opacity={0.07}
        depthTest
      />
    </mesh>
  );
}

// ─── Landmass dots ───────────────────────────────────────────────────

function LandDots() {
  const geometry = useMemo(() => {
    const pts: number[] = [];
    for (let lat = -90; lat <= 90; lat += GRID_INTERVAL) {
      for (let lng = -180; lng <= 180; lng += GRID_INTERVAL) {
        if (!isLand(lat, lng)) continue;
        const v = latLngToVec3(lat, lng, 1.003);
        pts.push(v.x, v.y, v.z);
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(pts), 3)
    );
    return geom;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#f59e0b"
        size={0.011}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Equator data ring ───────────────────────────────────────────────

function EquatorRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.025, 0.0045, 12, 160]} />
      <meshBasicMaterial color="#f59e0b" transparent opacity={0.35} />
    </mesh>
  );
}

// ─── Pulsing square marker ring ──────────────────────────────────────

function PulsingSquare({ baseSize, phase }: { baseSize: number; phase: number }) {
  const ref = useRef<THREE.LineLoop>(null);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const h = 0.5;
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([-h, -h, 0, h, -h, 0, h, h, 0, -h, h, 0]),
        3
      )
    );
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pulse = (Math.sin(t * 3.5 + phase * Math.PI * 2) + 1) / 2;
    ref.current.scale.setScalar(baseSize * (0.75 + pulse * 0.6));
    (ref.current.material as THREE.LineBasicMaterial).opacity =
      0.12 + pulse * 0.5;
  });

  return (
    <lineLoop ref={ref} geometry={geom}>
      <lineBasicMaterial color="#f59e0b" transparent opacity={0.25} />
    </lineLoop>
  );
}

// ─── City marker (crosshair + dot + pulsing rings) ───────────────────

function CityMarker({ lat, lng }: { lat: number; lng: number }) {
  const pos = useMemo(() => latLngToVec3(lat, lng, 1.013), [lat, lng]);

  const quaternion = useMemo(() => {
    const normal = pos.clone().normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
  }, [pos]);

  const crosshairGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const h = 0.055;
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([-h, 0, 0, h, 0, 0, 0, -h, 0, 0, h, 0]),
        3
      )
    );
    return g;
  }, []);

  return (
    <group position={[pos.x, pos.y, pos.z]} quaternion={quaternion}>
      <lineSegments geometry={crosshairGeom}>
        <lineBasicMaterial color="#f59e0b" />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[0.018, 10, 10]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      <PulsingSquare baseSize={0.06} phase={0} />
      <PulsingSquare baseSize={0.11} phase={0.33} />
      <PulsingSquare baseSize={0.16} phase={0.66} />
    </group>
  );
}

// ─── Bezier arc with animated dashes ─────────────────────────────────

function ArcLine({
  startLat,
  startLng,
  endLat,
  endLng,
  height,
}: {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  height: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: ARC_VERTEX,
      fragmentShader: ARC_FRAGMENT,
      transparent: true,
      depthWrite: false,
    });
    materialRef.current = mat;
    return mat;
  }, []);

  const geometry = useMemo(() => {
    const start = latLngToVec3(startLat, startLng);
    const end = latLngToVec3(endLat, endLng);
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .normalize()
      .multiplyScalar(1 + height);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return new THREE.TubeGeometry(curve, 120, 0.006, 8, false);
  }, [startLat, startLng, endLat, endLng, height]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return <mesh geometry={geometry} material={material} />;
}

// ─── Full globe scene (grouped for rotation) ─────────────────────────

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const glitchState = useRef({
    timer: 0,
    nextGlitch: 5 + Math.random() * 3,
    active: false,
    duration: 0,
  });

  const arcPairs = useMemo(
    () => [
      { sLat: 25.2, sLng: 55.3, eLat: 1.3, eLng: 103.8, h: 0.3 },
      { sLat: 25.2, sLng: 55.3, eLat: 1.3, eLng: 103.8, h: 0.5 },
      { sLat: 25.2, sLng: 55.3, eLat: 46.2, eLng: 6.1, h: 0.25 },
      { sLat: 25.2, sLng: 55.3, eLat: 46.2, eLng: 6.1, h: 0.45 },
      { sLat: 1.3, sLng: 103.8, eLat: 46.2, eLng: 6.1, h: 0.3 },
      { sLat: 1.3, sLng: 103.8, eLat: 46.2, eLng: 6.1, h: 0.5 },
    ],
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const gs = glitchState.current;
    gs.timer += delta;

    if (!gs.active && gs.timer > gs.nextGlitch) {
      gs.active = true;
      gs.duration = 0;
      gs.timer = 0;
      gs.nextGlitch = 5 + Math.random() * 3;
    }

    let speed = 0.1;
    if (gs.active) {
      gs.duration += delta;
      speed = 0.1 + Math.sin(gs.duration * 55) * 0.4;
      if (gs.duration > 0.18) {
        gs.active = false;
      }
    }

    groupRef.current.rotation.y += speed * delta;
  });

  return (
    <group ref={groupRef} rotation={[-0.25, -0.6, 0]}>
      <GlobeBase />
      <GlobeWireframe />
      <LandDots />
      <EquatorRing />
      {CITIES.map((c) => (
        <CityMarker key={c.name} lat={c.lat} lng={c.lng} />
      ))}
      {arcPairs.map((a, i) => (
        <ArcLine
          key={i}
          startLat={a.sLat}
          startLng={a.sLng}
          endLat={a.eLat}
          endLng={a.eLng}
          height={a.h}
        />
      ))}
    </group>
  );
}

// ─── Exported Globe wrapper ──────────────────────────────────────────

interface GlobeProps {
  className?: string;
}

export default function Globe({ className = "" }: GlobeProps) {
  return (
    <div className={className} style={{ background: "#0a0a0d" }}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        style={{ display: "block" }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#0a0a0d"]} />
        <GlobeScene />
      </Canvas>
    </div>
  );
}
