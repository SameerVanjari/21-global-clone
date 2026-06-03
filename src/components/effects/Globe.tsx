"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const GLOBE_RADIUS = 1;
const ATMOSPHERE_RADIUS = 1.08;
const DEG = Math.PI / 180;

const GLOBE_COLOR = "#1B365D";
const GOLD = "#C4924A";
const GOLD_LIGHT = "#D4A85C";

const CITY_MARKERS = [
  { name: "Dubai", lat: 25.2, lng: 55.3 },
  { name: "Singapore", lat: 1.3, lng: 103.8 },
  { name: "Geneva", lat: 46.2, lng: 6.1 },
] as const;

type City = (typeof CITY_MARKERS)[number];

const ARC_CONNECTIONS: { from: City; to: City }[] = [
  { from: CITY_MARKERS[0], to: CITY_MARKERS[1] },
  { from: CITY_MARKERS[0], to: CITY_MARKERS[2] },
  { from: CITY_MARKERS[1], to: CITY_MARKERS[2] },
];

const EXTRA_ARCS: { lat: number; lng: number; to: City }[] = [
  { lat: 51.5, lng: -0.1, to: CITY_MARKERS[2] },
  { lat: 35.7, lng: 139.7, to: CITY_MARKERS[1] },
  { lat: 40.7, lng: -74.0, to: CITY_MARKERS[0] },
  { lat: -33.9, lng: 151.2, to: CITY_MARKERS[1] },
  { lat: 55.8, lng: 37.6, to: CITY_MARKERS[0] },
];

/* ------------------------------------------------------------------ */
/*  Continent / landmass helpers                                       */
/* ------------------------------------------------------------------ */

function isLand(lat: number, lng: number): boolean {
  if (lat >= 15 && lat <= 72 && lng >= -170 && lng <= -50) return true;
  if (lat >= -56 && lat <= 12 && lng >= -80 && lng <= -34) return true;
  if (lat >= 35 && lat <= 71 && lng >= -10 && lng <= 40) return true;
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 52) return true;
  if (lat >= 5 && lat <= 72 && lng >= 40 && lng <= 180) return true;
  if (lat >= 5 && lat <= 72 && lng >= -180 && lng <= -170) return true;
  if (lat >= -39 && lat <= -10 && lng >= 113 && lng <= 155) return true;
  if (lat >= 12 && lat <= 40 && lng >= 30 && lng <= 60) return true;
  return false;
}

function generateLandPositions(): Float32Array {
  const pts: number[] = [];
  const R = GLOBE_RADIUS * 1.002;
  for (let lat = -90; lat <= 90; lat += 3) {
    for (let lng = -180; lng <= 177; lng += 3) {
      if (!isLand(lat, lng)) continue;
      const [x, y, z] = latLngToPos(lat, lng, R);
      pts.push(x, y, z);
    }
  }
  return new Float32Array(pts);
}

/* ------------------------------------------------------------------ */
/*  Coordinate helpers                                                 */
/* ------------------------------------------------------------------ */

function latLngToPos(
  lat: number,
  lng: number,
  radius: number,
): [number, number, number] {
  const phi = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function createArcCurve(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): THREE.QuadraticBezierCurve3 {
  const R = GLOBE_RADIUS;
  const arcAlt = 0.22 + Math.random() * 0.12;

  const start = new THREE.Vector3(...latLngToPos(lat1, lng1, R));
  const end = new THREE.Vector3(...latLngToPos(lat2, lng2, R));

  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;
  const midDir = new THREE.Vector3(
    ...latLngToPos(midLat, midLng, R),
  ).normalize();

  const control = midDir.multiplyScalar(R * (1 + arcAlt));

  return new THREE.QuadraticBezierCurve3(start, control, end);
}

function sampleCurve(
  curve: THREE.QuadraticBezierCurve3,
  segments: number,
): Float32Array {
  const arr = new Float32Array((segments + 1) * 3);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pt = curve.getPointAt(t);
    arr[i * 3] = pt.x;
    arr[i * 3 + 1] = pt.y;
    arr[i * 3 + 2] = pt.z;
  }
  return arr;
}

/* ------------------------------------------------------------------ */
/*  Shaders for animated arc dashes                                    */
/* ------------------------------------------------------------------ */

const ARC_SEGMENTS = 150;

const DASH_VERTEX = /* glsl */ `
  attribute float aProgress;
  varying float vProgress;
  void main() {
    vProgress = aProgress;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DASH_FRAGMENT = /* glsl */ `
  varying float vProgress;
  uniform float uDashOffset;
  uniform float uOpacity;

  void main() {
    float pattern = fract((vProgress + uDashOffset) * 8.0);
    float a = smoothstep(0.0, 0.05, pattern)
            * (1.0 - smoothstep(0.42, 0.5, pattern));
    if (a < 0.02) discard;
    gl_FragColor = vec4(1.0, 1.0, 1.0, a * uOpacity);
  }
`;

/* ------------------------------------------------------------------ */
/*  Arc line component                                                 */
/* ------------------------------------------------------------------ */

interface ArcLineProps {
  lat1: number;
  lng1: number;
  lat2: number;
  lng2: number;
  opacity: number;
}

function ArcLine({ lat1, lng1, lat2, lng2, opacity }: ArcLineProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const line = useMemo(() => {
    const curve = createArcCurve(lat1, lng1, lat2, lng2);
    const positions = sampleCurve(curve, ARC_SEGMENTS);
    const progressArr = new Float32Array(ARC_SEGMENTS + 1);
    for (let i = 0; i <= ARC_SEGMENTS; i++) {
      progressArr[i] = i / ARC_SEGMENTS;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aProgress", new THREE.BufferAttribute(progressArr, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uDashOffset: { value: (lat1 + lng1) % 1 },
        uOpacity: { value: opacity },
      },
      vertexShader: DASH_VERTEX,
      fragmentShader: DASH_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    materialRef.current = mat;
    return new THREE.Line(geo, mat);
  }, [lat1, lng1, lat2, lng2, opacity]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uDashOffset.value += delta * 0.28;
    }
  });

  return <primitive object={line} />;
}

/* ------------------------------------------------------------------ */
/*  Pulsing city marker                                                */
/* ------------------------------------------------------------------ */

interface CityMarkerProps {
  lat: number;
  lng: number;
}

function CityMarker({ lat, lng }: CityMarkerProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const [x, y, z] = latLngToPos(lat, lng, GLOBE_RADIUS);
  const pos = useMemo(() => new THREE.Vector3(x, y, z), [x, y, z]);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime();
      const s = 1 + Math.sin(t * 2.5) * 0.35;
      ringRef.current.scale.setScalar(s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 - (s - 1) * 1.2;
    }
  });

  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.016, 16, 16]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
      <mesh ref={ringRef} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.026, 0.003, 16, 32]} />
        <meshBasicMaterial color={GOLD_LIGHT} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Land dots as points                                                */
/* ------------------------------------------------------------------ */

function LandDots() {
  const geo = useMemo(() => {
    const positions = generateLandPositions();
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  return (
    <points>
      <primitive object={geo} attach="geometry" />
      <pointsMaterial
        color={GOLD}
        size={0.014}
        sizeAttenuation
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Globe scene                                                        */
/* ------------------------------------------------------------------ */

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Globe sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 72, 72]} />
        <meshStandardMaterial
          color={GLOBE_COLOR}
          metalness={0.08}
          roughness={0.55}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[ATMOSPHERE_RADIUS, 64, 64]} />
        <meshBasicMaterial
          color={GLOBE_COLOR}
          transparent
          opacity={0.07}
          depthWrite={false}
        />
      </mesh>

      {/* Land dots */}
      <LandDots />

      {/* City markers */}
      {CITY_MARKERS.map((c) => (
        <CityMarker key={c.name} lat={c.lat} lng={c.lng} />
      ))}

      {/* Arcs between hub cities */}
      {ARC_CONNECTIONS.map(({ from, to }, i) => (
        <ArcLine
          key={`arc-${i}`}
          lat1={from.lat}
          lng1={from.lng}
          lat2={to.lat}
          lng2={to.lng}
          opacity={0.45}
        />
      ))}

      {/* Extra arcs to other world cities */}
      {EXTRA_ARCS.map(({ lat, lng, to }, i) => (
        <ArcLine
          key={`extra-${i}`}
          lat1={lat}
          lng1={lng}
          lat2={to.lat}
          lng2={to.lng}
          opacity={0.3}
        />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Fallback while canvas loads                                        */
/* ------------------------------------------------------------------ */

function GlobeFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-48 h-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(196,146,74,0.15), rgba(27,54,93,0.5) 70%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported component                                                 */
/* ------------------------------------------------------------------ */

export default function Globe({ className }: GlobeProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <Suspense fallback={<GlobeFallback />}>
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 45, near: 0.1, far: 10 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.7} />
          <directionalLight position={[-3, -2, -3]} intensity={0.25} />
          <GlobeScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
