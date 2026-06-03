"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────
const SPHERE_RADIUS = 1;
const GOLD = "#d4a853";
const GOLD_LIGHT = "#e8c97a";
const SPHERE_COLOR = "#0a1525";

// ──────────────────────────────────────────────
// Continent bounding boxes
// ──────────────────────────────────────────────
const CONTINENTS = [
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
    if (lat >= c.latMin && lat <= c.latMax && lng >= c.lngMin && lng <= c.lngMax) return true;
  }
  return false;
}

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (lat * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  return new THREE.Vector3(
    Math.cos(phi) * Math.cos(theta) * r,
    Math.sin(phi) * r,
    Math.cos(phi) * Math.sin(theta) * r,
  );
}

// ──────────────────────────────────────────────
// City data
// ──────────────────────────────────────────────
const CITIES = [
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Geneva", lat: 46.2044, lng: 6.1432 },
];

const OTHER = [
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Zurich", lat: 47.3769, lng: 8.5417 },
];

const ARCS: [typeof CITIES[number], typeof CITIES[number] | typeof OTHER[number]][] = [
  [CITIES[0], CITIES[1]],
  [CITIES[0], CITIES[2]],
  [CITIES[1], CITIES[2]],
  [CITIES[0], OTHER[0]],
  [CITIES[1], OTHER[1]],
  [CITIES[0], OTHER[2]],
  [CITIES[1], OTHER[3]],
  [CITIES[2], OTHER[0]],
  [CITIES[2], OTHER[5]],
  [CITIES[0], OTHER[4]],
];

// ──────────────────────────────────────────────
// Lights
// ──────────────────────────────────────────────
function Lights() {
  return (
    <>
      <ambientLight intensity={0.18} color="#1a2340" />
      <directionalLight position={[5, 3, 5]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-3, 1.5, -2]} intensity={0.35} color={GOLD} />
      <pointLight position={[0, 2.5, 0]} intensity={0.6} color={GOLD_LIGHT} />
    </>
  );
}

// ──────────────────────────────────────────────
// Globe sphere — deep navy metallic
// ──────────────────────────────────────────────
function GlobeSphere() {
  return (
    <mesh>
      <sphereGeometry args={[SPHERE_RADIUS, 72, 72]} />
      <meshStandardMaterial
        color={SPHERE_COLOR}
        metalness={0.88}
        roughness={0.32}
        emissive="#0a1018"
        emissiveIntensity={0.18}
      />
    </mesh>
  );
}

// ──────────────────────────────────────────────
// Atmosphere — golden glow
// ──────────────────────────────────────────────
function Atmosphere() {
  return (
    <>
      <mesh scale={1.04}>
        <sphereGeometry args={[SPHERE_RADIUS, 64, 64]} />
        <meshBasicMaterial
          color={GOLD_LIGHT}
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh scale={1.07}>
        <sphereGeometry args={[SPHERE_RADIUS, 64, 64]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

// ──────────────────────────────────────────────
// Landmass dots — gold particles at ~2° intervals
// ──────────────────────────────────────────────
function LandDots() {
  const positions = useMemo(() => {
    const pts: number[] = [];
    for (let lat = -88; lat <= 88; lat += 2) {
      for (let lng = -180; lng < 180; lng += 2) {
        if (isLand(lat, lng)) {
          const v = latLngToVec3(lat, lng, SPHERE_RADIUS * 1.005);
          pts.push(v.x, v.y, v.z);
        }
      }
    }
    return new Float32Array(pts);
  }, []);

  if (positions.length === 0) return null;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={GOLD}
        size={0.013}
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ──────────────────────────────────────────────
// Decorative rings — art deco geometry
// ──────────────────────────────────────────────
function DecorativeRings() {
  return (
    <>
      {/* Equatorial ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[SPHERE_RADIUS * 1.115, 0.016, 16, 144]} />
        <meshStandardMaterial
          color={GOLD}
          emissive={GOLD}
          emissiveIntensity={0.45}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>
      {/* Tilted planetary ring */}
      <mesh rotation={[Math.PI / 2 + Math.PI / 5.5, 0, Math.PI / 9]}>
        <torusGeometry args={[SPHERE_RADIUS * 1.185, 0.011, 16, 144]} />
        <meshStandardMaterial
          color={GOLD}
          emissive={GOLD}
          emissiveIntensity={0.28}
          metalness={0.95}
          roughness={0.2}
          transparent
          opacity={0.55}
        />
      </mesh>
    </>
  );
}

// ──────────────────────────────────────────────
// City diamond markers
// ──────────────────────────────────────────────
function CityMarkers() {
  return (
    <group>
      {CITIES.map((city) => (
        <DiamondMarker key={city.name} city={city} />
      ))}
    </group>
  );
}

function DiamondMarker({ city }: { city: typeof CITIES[number] }) {
  const pos = useMemo(() => latLngToVec3(city.lat, city.lng, SPHERE_RADIUS), [city]);
  const normal = useMemo(() => pos.clone().normalize(), [pos]);
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  return (
    <group position={pos} quaternion={quaternion}>
      {/* Diamond center — rotated square */}
      <mesh position={[0, 0, 0.02]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.032, 0.032]} />
        <meshBasicMaterial color={GOLD_LIGHT} side={THREE.DoubleSide} />
      </mesh>
      {/* Glow underneath */}
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[0.06, 0.06]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <ExpandingRings />
    </group>
  );
}

function ExpandingRings() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <ExpandingRing key={i} index={i} delay={i * 0.75} />
      ))}
    </>
  );
}

function ExpandingRing({ index, delay }: { index: number; delay: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const mesh = ringRef.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;
    const t = ((clock.getElapsedTime() * 1.15 + delay) % 3.5) / 3.5;
    const s = 0.4 + t * 6;
    mesh.scale.setScalar(s);
    mat.opacity = Math.max(0, (1 - t) * 0.55);
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0.008]} rotation={[0, 0, Math.PI / 4]}>
      <ringGeometry args={[0.015, 0.021, 4]} />
      <meshBasicMaterial
        ref={matRef}
        color={index === 0 ? GOLD_LIGHT : GOLD}
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ──────────────────────────────────────────────
// Gold arcs with animated dash offset
// ──────────────────────────────────────────────
function Arcs() {
  return (
    <group>
      {ARCS.map(([from, to], i) => (
        <Arc key={i} from={from} to={to} index={i} />
      ))}
    </group>
  );
}

function Arc({
  from,
  to,
  index,
}: {
  from: { lat: number; lng: number };
  to: { lat: number; lng: number };
  index: number;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const tubeGeo = useMemo(() => {
    const p1 = latLngToVec3(from.lat, from.lng, SPHERE_RADIUS);
    const p2 = latLngToVec3(to.lat, to.lng, SPHERE_RADIUS);
    const mid = new THREE.Vector3().addVectors(p1, p2).normalize().multiplyScalar(SPHERE_RADIUS * 1.38);
    const curve = new THREE.QuadraticBezierCurve3(p1.clone(), mid, p2.clone());
    return new THREE.TubeGeometry(curve, 100, 0.008, 6, false);
  }, [from, to]);

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: index * 0.6 },
        uSpeed: { value: 0.22 + Math.sin(index * 1.5) * 0.12 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uSpeed;
        void main() {
          float totalLen = 0.22;
          float dashLen = 0.09;
          float segments = 8.0;
          float p = mod(vUv.y * segments - uTime * uSpeed, 1.0);
          float dash = smoothstep(0.0, 0.035, p) * (1.0 - smoothstep(dashLen / totalLen, (dashLen / totalLen) + 0.035, p));
          float sparkle = max(0.0, sin((vUv.y * 16.0 - uTime * 4.0) * 6.0)) * 0.4;
          float b = dash * (0.45 + sparkle);
          vec3 gold = mix(vec3(0.831, 0.659, 0.325), vec3(0.91, 0.788, 0.478), vUv.y * 0.45 + 0.3);
          gl_FragColor = vec4(gold, b * 0.85);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    matRef.current = mat;
    return mat;
  }, [index]);

  useEffect(() => {
    return () => {
      tubeGeo.dispose();
      material.dispose();
    };
  }, [tubeGeo, material]);

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return <mesh geometry={tubeGeo} material={material} />;
}

// ──────────────────────────────────────────────
// Globe group — auto-rotating
// ──────────────────────────────────────────────
function GlobeGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <GlobeSphere />
      <Atmosphere />
      <LandDots />
      <DecorativeRings />
      <CityMarkers />
      <Arcs />
    </group>
  );
}

// ──────────────────────────────────────────────
// Main export
// ──────────────────────────────────────────────
export default function Globe({ className = "" }: { className?: string }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 2.4], fov: 42 }}
      gl={(glProps) => {
        const renderer = new THREE.WebGLRenderer({
          canvas: (glProps as Record<string, unknown>).canvas as HTMLCanvasElement,
          alpha: true,
          antialias: true,
        });
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        return renderer;
      }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
    >
      <Lights />
      <GlobeGroup />
    </Canvas>
  );
}
