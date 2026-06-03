"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CITY_DATA = [
  { name: "Dubai", lat: 25.2048, lng: 55.2708, color: "#00f0ff" },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, color: "#ff00e5" },
  { name: "Geneva", lat: 46.2044, lng: 6.1432, color: "#ffaa00" },
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
    if (
      lat >= box.lat[0] &&
      lat <= box.lat[1] &&
      lng >= box.lng[0] &&
      lng <= box.lng[1]
    ) {
      return true;
    }
  }
  return false;
}

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createArcCurve(
  start: THREE.Vector3,
  end: THREE.Vector3,
  altitude: number
) {
  const mid = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5);
  mid.normalize().multiplyScalar(altitude);
  return new THREE.QuadraticBezierCurve3(start.clone(), mid, end.clone());
}

// ─── Wireframe Globe ────────────────────────────────────────────────

function WireframeGlobe() {
  return (
    <mesh>
      <sphereGeometry args={[1, 128, 64]} />
      <meshBasicMaterial
        wireframe
        color="#00f0ff"
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

function ChromaticWireframe() {
  return (
    <mesh>
      <sphereGeometry args={[1.003, 64, 32]} />
      <meshBasicMaterial
        wireframe
        color="#ff00e5"
        transparent
        opacity={0.04}
      />
    </mesh>
  );
}

// ─── Atmosphere Glow ────────────────────────────────────────────────

function AtmosphereGlow() {
  return (
    <mesh>
      <sphereGeometry args={[1.08, 64, 64]} />
      <meshBasicMaterial
        color="#00f0ff"
        transparent
        opacity={0.03}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Land Dots ──────────────────────────────────────────────────────

function LandDots() {
  const positions = useMemo(() => {
    const pts: number[] = [];
    const step = 2.5;
    for (let lat = -80; lat <= 80; lat += step) {
      for (let lng = -180; lng <= 180; lng += step) {
        if (isLand(lat, lng)) {
          const v = latLngToVec3(lat, lng, 1.002);
          pts.push(v.x, v.y, v.z);
        }
      }
    }
    return new Float32Array(pts);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.004}
        color="#00f0ff"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── City Markers ───────────────────────────────────────────────────

function CityMarkers() {
  return (
    <>
      {CITY_DATA.map((city) => {
        const pos = latLngToVec3(city.lat, city.lng, 1.02);
        return (
          <group key={city.name}>
            <mesh position={pos}>
              <sphereGeometry args={[0.015, 16, 16]} />
              <meshBasicMaterial color={city.color} />
            </mesh>
            <mesh position={pos}>
              <torusGeometry args={[0.03, 0.002, 16, 32]} />
              <meshBasicMaterial
                color={city.color}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

// ─── City Pulse Rings ───────────────────────────────────────────────

function CityPulseRings() {
  const ringsRef = useRef<THREE.Mesh[]>([]);

  const ringConfigs = useMemo(() => {
    return CITY_DATA.map((city) => {
      const pos = latLngToVec3(city.lat, city.lng, 1.02);
      return {
        position: pos,
        color: city.color,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useFrame(() => {
    const t = performance.now() * 0.002;
    ringsRef.current.forEach((ring, i) => {
      const phase = ringConfigs[i].phase;
      const cycle = (Math.sin(t * 2 + phase) + 1) / 2;
      const scale = 0.6 + cycle * 2.5;
      ring.scale.setScalar(scale);
      (ring.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - cycle);
    });
  });

  return (
    <>
      {ringConfigs.map((config, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) ringsRef.current[i] = el;
          }}
          position={config.position}
        >
          <torusGeometry args={[0.03, 0.0015, 16, 32]} />
          <meshBasicMaterial
            color={config.color}
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

// ─── Arcs ───────────────────────────────────────────────────────────

function Arcs() {
  const arcConfigs = useMemo(() => {
    type ArcConfig = {
      start: THREE.Vector3;
      end: THREE.Vector3;
      altitude: number;
      color: string;
      phase: number;
    };
    const configs: ArcConfig[] = [];
    const pairs: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 2],
    ];

    pairs.forEach(([i, j]) => {
      const start = latLngToVec3(CITY_DATA[i].lat, CITY_DATA[i].lng, 1);
      const end = latLngToVec3(CITY_DATA[j].lat, CITY_DATA[j].lng, 1);

      for (let k = 0; k < 5; k++) {
        const alt = 1.03 + k * 0.16;
        const color =
          k % 2 === 0 ? CITY_DATA[i].color : CITY_DATA[j].color;
        configs.push({
          start: start.clone(),
          end: end.clone(),
          altitude: alt,
          color,
          phase: Math.random() * Math.PI * 2,
        });
      }
    });

    return configs;
  }, []);

  const lineObjs = useMemo(() => {
    return arcConfigs.map((config) => {
      const curve = createArcCurve(config.start, config.end, config.altitude);
      const points = curve.getPoints(100);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      return { line: new THREE.Line(geometry, material), phase: config.phase };
    });
  }, [arcConfigs]);

  useFrame(() => {
    const t = performance.now() * 0.002;
    for (const { line, phase } of lineObjs) {
      const mat = line.material as THREE.LineBasicMaterial;
      const wave = (Math.sin(t * 2.5 + phase) + 1) / 2; // 0..1
      mat.opacity = 0.08 + wave * 0.4;

      // Occasional bright pulse for data packets
      const pulse = Math.sin(t * 7 + phase * 3);
      if (pulse > 0.95) {
        mat.opacity = 0.55;
      }
    }
  });

  return (
    <group>
      {lineObjs.map(({ line }, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

// ─── Scanning Ring ──────────────────────────────────────────────────

function ScanningRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const y = Math.sin(performance.now() * 0.001) * 0.78;
    if (ringRef.current) {
      ringRef.current.position.y = y;
    }
    if (glowRef.current) {
      glowRef.current.position.y = y;
    }
  });

  return (
    <>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.03, 0.002, 16, 128]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.03, 0.008, 16, 128]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

// ─── Particle Field ─────────────────────────────────────────────────

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyanColor = new THREE.Color("#00f0ff");
    const magentaColor = new THREE.Color("#ff00e5");

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.08 + Math.random() * 0.5;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const c = Math.random() > 0.5 ? cyanColor : magentaColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.04;
      particlesRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.006}
        vertexColors
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Globe Content ──────────────────────────────────────────────────

function GlobeContent() {
  const groupRef = useRef<THREE.Group>(null);
  const glitchRef = useRef({ timer: 0, nextGlitch: 4 + Math.random() * 2 });

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.2 * delta;

      glitchRef.current.timer += delta;
      if (glitchRef.current.timer > glitchRef.current.nextGlitch) {
        groupRef.current.rotation.y += 0.05;
        glitchRef.current.timer = 0;
        glitchRef.current.nextGlitch = 4 + Math.random() * 2;
      }
    }
  });

  return (
    <>
      <ScanningRing />
      <group ref={groupRef}>
        <WireframeGlobe />
        <ChromaticWireframe />
        <AtmosphereGlow />
        <LandDots />
        <CityMarkers />
        <CityPulseRings />
        <Arcs />
        <ParticleField />
      </group>
    </>
  );
}

// ─── Exported Globe Component ───────────────────────────────────────

export default function Globe() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.4], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
      >
        <GlobeContent />
      </Canvas>
    </div>
  );
}
