"use client";

import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

const GLOBE_RADIUS = 1.04;
const ATMOSPHERE_RADIUS = 1.14;

const CITIES: { name: string; lat: number; lng: number }[] = [
  { name: "Dubai", lat: 25.2, lng: 55.3 },
  { name: "Singapore", lat: 1.35, lng: 103.8 },
  { name: "Geneva", lat: 46.2, lng: 6.15 },
];

function latLngToVec3(
  lat: number,
  lng: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -Math.sin(phi) * Math.cos(theta) * radius,
    Math.cos(phi) * radius,
    Math.sin(phi) * Math.sin(theta) * radius,
  );
}

function generateOrganicDots(radius: number) {
  const sageArr: number[] = [];
  const terraArr: number[] = [];
  const n = 2600;
  const gr = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < n; i++) {
    const theta = 2 * Math.PI * ((i / gr) % 1);
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);

    const nx = Math.sin(phi * 6.3) * Math.cos(theta * 4.7) * 0.055;
    const ny = Math.cos(phi * 4.1) * Math.sin(theta * 5.3) * 0.05;
    const nz = Math.cos(theta * 6.7) * Math.sin(phi * 3.2) * 0.055;

    const x = (Math.cos(theta) * Math.sin(phi) + nx) * radius;
    const y = (Math.cos(phi) + ny) * radius;
    const z = (Math.sin(theta) * Math.sin(phi) + nz) * radius;

    if (Math.random() < 0.13) {
      terraArr.push(x, y, z);
    } else {
      sageArr.push(x, y, z);
    }
  }

  return {
    sage: new Float32Array(sageArr),
    terracotta: new Float32Array(terraArr),
  };
}

function TeardropMarker({ position }: { position: THREE.Vector3 }) {
  const groupRef = useRef<THREE.Group>(null);

  const teardropGeo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const segs = 24;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const y = 0.14 - t * 0.3;
      let r: number;
      if (t < 0.18) {
        r = 0.032 * Math.sin((t / 0.18) * Math.PI * 0.5);
      } else if (t < 0.6) {
        r = 0.032 + 0.028 * Math.sin(((t - 0.18) / 0.42) * Math.PI);
      } else {
        r = (0.032 + 0.028) * Math.max(0, 1 - (t - 0.6) / 0.4);
      }
      const rr = Math.max(r, 0.003);
      pts.push(new THREE.Vector2(rr, y));
    }
    return new THREE.LatheGeometry(pts, 10);
  }, []);

  const dir = position.clone().normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir,
  );

  useFrame(() => {
    if (groupRef.current) {
      const t = performance.now() * 0.001;
      const breathe = 1 + Math.sin(t * 2.094) * 0.16;
      groupRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <group ref={groupRef} position={position} quaternion={quat}>
      <mesh geometry={teardropGeo}>
        <meshStandardMaterial
          color="#c26941"
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}

function PulseDot({
  curve,
  offset,
  color,
}: {
  curve: THREE.QuadraticBezierCurve3;
  offset: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    const t = performance.now() * 0.001;
    const speed = 0.1 + Math.sin(t * 0.3) * 0.03;
    const pt = (t * speed + offset) % 1;
    const pos = curve.getPoint(pt);
    meshRef.current.position.copy(pos);
    const alpha = Math.sin(pt * Math.PI) * 0.55 + 0.08;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = alpha;
  });

  return <primitive ref={meshRef} object={pulseDotObj(color)} />;
}

const pulseGeo = new THREE.SphereGeometry(0.008, 6, 6);
function pulseDotObj(color: string): THREE.Mesh {
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.3,
  });
  return new THREE.Mesh(pulseGeo, mat);
}

interface ArcData {
  curve: THREE.QuadraticBezierCurve3;
  lineGeo: THREE.BufferGeometry;
  color: string;
  index: number;
}

function Arc({ data }: { data: ArcData }) {
  const lineRef = useRef<THREE.Line>(null);

  const pulseOffsets: number[] = [0, 0.35, 0.68];

  const lineObj = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: data.color,
      transparent: true,
      opacity: 0.18,
    });
    return new THREE.Line(data.lineGeo, mat);
  }, [data.lineGeo, data.color]);

  useFrame(() => {
    if (lineRef.current) {
      const t = performance.now() * 0.001;
      const alpha = 0.1 + Math.sin(t * 0.45 + data.index) * 0.07;
      (lineRef.current.material as THREE.LineBasicMaterial).opacity = alpha;
    }
  });

  return (
    <group>
      <primitive ref={lineRef} object={lineObj} />
      {pulseOffsets.map((off, pi) => (
        <PulseDot
          key={pi}
          curve={data.curve}
          offset={off}
          color={data.color}
        />
      ))}
    </group>
  );
}

function GlobeScene() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const atmosRef = useRef<THREE.Mesh>(null);

  const dotData = useMemo(
    () => generateOrganicDots(GLOBE_RADIUS),
    [],
  );

  const sageGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(dotData.sage, 3),
    );
    return geo;
  }, [dotData.sage]);

  const terracottaGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(dotData.terracotta, 3),
    );
    return geo;
  }, [dotData.terracotta]);

  const cityPositions = useMemo(
    () =>
      CITIES.map((c) =>
        latLngToVec3(c.lat, c.lng, GLOBE_RADIUS),
      ),
    [],
  );

  const arcs: ArcData[] = useMemo(() => {
    const pairs: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 0],
      [0, 1],
      [1, 2],
      [0, 2],
    ];
    const colors = [
      "#7d9b76",
      "#7d9b76",
      "#c26941",
      "#5a7a53",
      "#c26941",
      "#7d9b76",
    ];

    return pairs.map(([i, j], idx) => {
      const start = cityPositions[i]!.clone();
      const end = cityPositions[j]!.clone();
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      const height =
        0.22 + Math.sin(idx * 1.4) * 0.16 + Math.cos(idx * 2.1) * 0.1;
      mid.normalize().multiplyScalar(GLOBE_RADIUS + dist * height);

      const curve = new THREE.QuadraticBezierCurve3(
        start,
        mid,
        end,
      );
      const pts = curve.getPoints(80);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);

      return { curve, lineGeo, color: colors[idx]!, index: idx };
    });
  }, [cityPositions]);

  useFrame((_, delta) => {
    if (globeGroupRef.current) {
      const t = performance.now() * 0.001;
      const speed =
        0.08 + Math.sin(t * 0.35) * 0.028 + Math.cos(t * 0.52) * 0.018;
      globeGroupRef.current.rotation.y += speed * delta;
    }
    if (atmosRef.current) {
      const t = performance.now() * 0.001;
      const breathe = 1 + Math.sin(t * 0.4) * 0.006;
      atmosRef.current.scale.setScalar(breathe);
      (atmosRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.035 + Math.sin(t * 0.3) * 0.007;
    }
  });

  return (
    <>
      <ambientLight intensity={1.8} color="#fdf8f0" />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#ffffff" />
      <directionalLight
        position={[-3, -2, -3]}
        intensity={0.35}
        color="#f5ede0"
      />

      <group ref={globeGroupRef}>
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS, 72, 72]} />
          <meshStandardMaterial
            color="#f5ede0"
            roughness={0.45}
            metalness={0.03}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS * 0.985, 64, 64]} />
          <meshBasicMaterial
            color="#fdf8f0"
            transparent
            opacity={0.12}
          />
        </mesh>

        <points geometry={sageGeo}>
          <pointsMaterial
            color="#7d9b76"
            size={0.014}
            sizeAttenuation
            transparent
            opacity={0.7}
          />
        </points>

        <points geometry={terracottaGeo}>
          <pointsMaterial
            color="#c26941"
            size={0.016}
            sizeAttenuation
            transparent
            opacity={0.5}
          />
        </points>

        {cityPositions.map((pos, i) => (
          <TeardropMarker key={i} position={pos} />
        ))}

        {arcs.map((arc) => (
          <Arc key={arc.index} data={arc} />
        ))}
      </group>

      <mesh ref={atmosRef}>
        <sphereGeometry args={[ATMOSPHERE_RADIUS, 64, 64]} />
        <meshBasicMaterial
          color="#fdf8f0"
          transparent
          opacity={0.04}
          side={THREE.FrontSide}
        />
      </mesh>
    </>
  );
}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <GlobeScene />
      </Suspense>
    </Canvas>
  );
}
