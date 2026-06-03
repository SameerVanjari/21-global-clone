"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SPHERE_RADIUS = 1;
const DOT_SPACING = 3;
const GRID_SPACING = 15;
const LINE_SEGMENTS = 128;
const ARC_SEGMENTS = 64;
const ARC_ELEVATION = 1.4;
const ROTATION_SPEED = 0.1;
const RING_DURATION = 2;
const RING_COUNT = 3;
const RING_MAX_SCALE = 6;
const NUM_ARC_DOTS = 10;
const ARC_DOT_SPEED = 0.35;

const SPHERE_COLOR = "#e8e8e8";
const DOT_COLOR = "#333333";
const GRID_COLOR = "#aaaaaa";
const ACCENT_COLOR = "#e63946";

const cities = [
  { name: "Dubai", lat: 25.2, lng: 55.3 },
  { name: "Singapore", lat: 1.35, lng: 103.8 },
  { name: "Geneva", lat: 46.2, lng: 6.15 },
] as const;

const landRegions = [
  { latMin: 15, latMax: 72, lngMin: -170, lngMax: -50 },
  { latMin: -56, latMax: 12, lngMin: -80, lngMax: -34 },
  { latMin: 35, latMax: 71, lngMin: -10, lngMax: 40 },
  { latMin: -35, latMax: 37, lngMin: -18, lngMax: 52 },
  { latMin: 5, latMax: 72, lngMin: 40, lngMax: 180 },
  { latMin: -39, latMax: -10, lngMin: 113, lngMax: 155 },
  { latMin: 12, latMax: 40, lngMin: 30, lngMax: 60 },
] as const;

function latLngToVec3(lat: number, lng: number, r = SPHERE_RADIUS) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function createRingGeometry() {
  const segments = 64;
  const radius = 0.03;
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0),
    );
  }
  return new THREE.BufferGeometry().setFromPoints(points);
}

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const ringGroupRefs = useRef<(THREE.Object3D | null)[]>([]);
  const arcDotRefs = useRef<(THREE.Object3D | null)[]>([]);

  const landDotsGeometry = useMemo(() => {
    const positions: number[] = [];
    for (const region of landRegions) {
      for (
        let lat = region.latMin;
        lat <= region.latMax;
        lat += DOT_SPACING
      ) {
        for (
          let lng = region.lngMin;
          lng <= region.lngMax;
          lng += DOT_SPACING
        ) {
          const v = latLngToVec3(lat, lng);
          positions.push(v.x, v.y, v.z);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return geo;
  }, []);

  const gridGeometries = useMemo(() => {
    const lines: THREE.Vector3[][] = [];

    const equator: THREE.Vector3[] = [];
    for (let i = 0; i <= LINE_SEGMENTS; i++) {
      const theta = (i / LINE_SEGMENTS) * Math.PI * 2;
      equator.push(new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta)));
    }
    lines.push(equator);

    for (
      let lat = -90 + GRID_SPACING;
      lat <= 90 - GRID_SPACING;
      lat += GRID_SPACING
    ) {
      if (lat === 0) continue;
      const phi = ((90 - lat) * Math.PI) / 180;
      const y = Math.cos(phi);
      const r = Math.sin(phi);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= LINE_SEGMENTS; i++) {
        const theta = (i / LINE_SEGMENTS) * Math.PI * 2;
        pts.push(
          new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)),
        );
      }
      lines.push(pts);
    }

    for (let lng = 0; lng < 360; lng += GRID_SPACING) {
      const theta = (lng * Math.PI) / 180;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= LINE_SEGMENTS; i++) {
        const phi = (i / LINE_SEGMENTS) * Math.PI;
        pts.push(
          new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta),
            Math.cos(phi),
            Math.sin(phi) * Math.sin(theta),
          ),
        );
      }
      lines.push(pts);
    }

    return lines.map(
      (pts) => new THREE.BufferGeometry().setFromPoints(pts),
    );
  }, []);

  const arcPairs = useMemo(
    () =>
      [
        [cities[0], cities[1]],
        [cities[1], cities[2]],
        [cities[2], cities[0]],
      ] as const,
    [],
  );

  const arcData = useMemo(() => {
    return arcPairs.map(([from, to]) => {
      const start = latLngToVec3(from.lat, from.lng);
      const end = latLngToVec3(to.lat, to.lng);
      const mid = start
        .clone()
        .add(end)
        .normalize()
        .multiplyScalar(SPHERE_RADIUS * ARC_ELEVATION);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const length = curve.getLength();
      const linePoints = curve.getPoints(ARC_SEGMENTS);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(
        linePoints,
      );

      return { curve, length, lineGeometry };
    });
  }, [arcPairs]);

  const arcDotGeometries = useMemo(() => {
    return arcData.map(({ curve }) => {
      const arr = new Float32Array(NUM_ARC_DOTS * 3);
      for (let i = 0; i < NUM_ARC_DOTS; i++) {
        const pt = curve.getPointAt(i / NUM_ARC_DOTS);
        arr[i * 3] = pt.x;
        arr[i * 3 + 1] = pt.y;
        arr[i * 3 + 2] = pt.z;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(arr, 3),
      );
      return geo;
    });
  }, [arcData]);

  const cityData = useMemo(() => {
    return cities.map((city) => {
      const pos = latLngToVec3(city.lat, city.lng);
      const normal = pos.clone().normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        normal,
      );
      return { pos, normal, quaternion };
    });
  }, []);

  const ringGeometry = useMemo(() => createRingGeometry(), []);

  useFrame((_, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED * delta;
    }

    // Animate flowing dots along arcs
    for (let i = 0; i < arcData.length; i++) {
      const dots = arcDotRefs.current[i] as THREE.Points | null;
      if (!dots) continue;
      const posAttr = dots.geometry.attributes
        .position as THREE.Float32BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const { curve, length: totalLen } = arcData[i];

      for (let d = 0; d < NUM_ARC_DOTS; d++) {
        const t =
          ((timeRef.current * ARC_DOT_SPEED +
            (d * totalLen) / NUM_ARC_DOTS) %
            totalLen) /
          totalLen;
        const pt = curve.getPointAt(t);
        arr[d * 3] = pt.x;
        arr[d * 3 + 1] = pt.y;
        arr[d * 3 + 2] = pt.z;
      }
      posAttr.needsUpdate = true;
    }

    // Ring animation — linear expansion and fade
    for (let ci = 0; ci < cities.length; ci++) {
      for (let ri = 0; ri < RING_COUNT; ri++) {
        const idx = ci * RING_COUNT + ri;
        const group = ringGroupRefs.current[idx] as THREE.Group | null;
        if (!group) continue;

        const phaseOffset = ri * (RING_DURATION / RING_COUNT);
        const rawT = (timeRef.current + phaseOffset) / RING_DURATION;
        const t = rawT % 1;

        group.scale.setScalar(1 + t * RING_MAX_SCALE);

        const line = group.children[0] as THREE.Line;
        if (line) {
          const mat = line.material as THREE.LineBasicMaterial;
          mat.opacity = 1 - t;
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sphere — matte, flat, designer desk globe */}
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS, 64, 64]} />
        <meshLambertMaterial color={SPHERE_COLOR} />
      </mesh>

      {/* Landmass dots */}
      <points geometry={landDotsGeometry}>
        <pointsMaterial color={DOT_COLOR} size={0.008} />
      </points>

      {/* Grid lines */}
      {gridGeometries.map((geo, i) => (
        <threeLine key={`grid-${i}`} geometry={geo}>
          <lineBasicMaterial
            color={GRID_COLOR}
            transparent
            opacity={0.22}
          />
        </threeLine>
      ))}

      {/* Arc base lines — subtle, semi-transparent */}
      {arcData.map(({ lineGeometry }, i) => (
        <threeLine key={`arc-line-${i}`} geometry={lineGeometry}>
          <lineBasicMaterial
            color={ACCENT_COLOR}
            transparent
            opacity={0.3}
          />
        </threeLine>
      ))}

      {/* Arc flowing dots — animated dash simulation */}
      {arcDotGeometries.map((geo, i) => (
        <points
          key={`arc-dots-${i}`}
          geometry={geo}
          ref={(el) => {
            arcDotRefs.current[i] = el;
          }}
        >
          <pointsMaterial color={ACCENT_COLOR} size={0.018} />
        </points>
      ))}

      {/* City markers and rings */}
      {cityData.map((city, ci) => (
        <group key={`city-${ci}`}>
          <mesh position={city.pos}>
            <sphereGeometry args={[0.022, 16, 16]} />
            <meshBasicMaterial color={ACCENT_COLOR} />
          </mesh>

          {Array.from({ length: RING_COUNT }).map((_, ri) => (
            <group
              key={`ring-${ci}-${ri}`}
              position={city.pos}
              quaternion={city.quaternion}
              ref={(el) => {
                ringGroupRefs.current[ci * RING_COUNT + ri] = el;
              }}
            >
              <threeLine geometry={ringGeometry}>
                <lineBasicMaterial
                  color={ACCENT_COLOR}
                  transparent
                  opacity={1}
                />
              </threeLine>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

export function Globe({ className = "" }: { className?: string }) {
  return (
    <Canvas
      className={className}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <GlobeScene />
    </Canvas>
  );
}
