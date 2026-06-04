"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

export interface GlobeMarker {
  lat: number;
  lng: number;
  src?: string;
  label: string;
}

interface GlobeConfig {
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
}

interface Globe3DProps {
  markers?: GlobeMarker[];
  config?: GlobeConfig;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createLandmassGeometry(radius: number): THREE.BufferGeometry {
  const continents = [
    { latMin: 15, latMax: 72, lngMin: -170, lngMax: -50 },
    { latMin: -56, latMax: 12, lngMin: -80, lngMax: -34 },
    { latMin: 35, latMax: 71, lngMin: -10, lngMax: 40 },
    { latMin: -35, latMax: 37, lngMin: -18, lngMax: 52 },
    { latMin: 5, latMax: 72, lngMin: 40, lngMax: 180 },
    { latMin: -39, latMax: -10, lngMin: 113, lngMax: 155 },
    { latMin: 12, latMax: 40, lngMin: 30, lngMax: 60 },
  ];
  const positions: number[] = [];
  const step = 2.5;
  for (let lat = -85; lat <= 85; lat += step) {
    for (let lng = -180; lng <= 180; lng += step) {
      const isLand = continents.some(
        (c) =>
          c.latMin <= lat && lat <= c.latMax &&
          ((c.lngMin <= lng && lng <= c.lngMax) || (c.lngMin <= lng + 360 && lng + 360 <= c.lngMax))
      );
      if (isLand) {
        const pos = latLngToVec3(lat, lng, radius);
        positions.push(pos.x, pos.y, pos.z);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
  return geo;
}

function GlobeScene({
  markers = [],
  config = {},
  onMarkerClick,
  onMarkerHover,
}: Globe3DProps) {
  const globeRef = useRef<THREE.Group>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const { atmosphereColor = "#1b365d", atmosphereIntensity = 20, autoRotateSpeed = 0.3 } = config;
  const radius = 1;
  const landGeo = useMemo(() => createLandmassGeometry(radius * 1.002), []);

  const markerData = useMemo(() => {
    return markers.map((m) => ({
      ...m,
      position: latLngToVec3(m.lat, m.lng, radius * 1.015),
    }));
  }, [markers]);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += autoRotateSpeed * delta * 0.5;
    }
    // Glow pulses subtly
    if (glowRef.current) {
      const pulse = 1 + Math.sin(performance.now() * 0.001) * 0.3;
      glowRef.current.scale.setScalar(pulse);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.04 + (pulse - 1) * 0.06;
    }
  });

  const handlePointerEnter = useCallback(
    (marker: GlobeMarker) => (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      e.stopPropagation();
      document.body.style.cursor = "pointer";
      setHoveredLabel(marker.label);
      onMarkerHover?.(marker);
    },
    [onMarkerHover]
  );

  const handlePointerLeave = useCallback(() => {
    document.body.style.cursor = "default";
    setHoveredLabel(null);
    onMarkerHover?.(null);
  }, [onMarkerHover]);

  const handleClick = useCallback(
    (marker: GlobeMarker) => (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onMarkerClick?.(marker);
    },
    [onMarkerClick]
  );

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />
      <directionalLight position={[-5, -2, -3]} intensity={0.3} color="#c4924a" />

      <group ref={globeRef}>
        <Sphere args={[radius, 64, 64]}>
          <meshStandardMaterial color="#1b365d" roughness={0.55} metalness={0.1} />
        </Sphere>

        <points geometry={landGeo}>
          <pointsMaterial
            color="#c4924a"
            size={0.012}
            sizeAttenuation
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {markerData.map((marker) => (
          <MarkerDot
            key={marker.label}
            position={marker.position.toArray() as [number, number, number]}
            isHovered={hoveredLabel === marker.label}
            isPrimary={(["Dubai", "Singapore", "Geneva"] as string[]).includes(marker.label)}
            onPointerEnter={handlePointerEnter(marker)}
            onPointerLeave={handlePointerLeave}
            onClick={handleClick(marker)}
          />
        ))}
      </group>

      <Sphere args={[radius * 1.06, 64, 64]}>
        <meshBasicMaterial color={atmosphereColor} transparent opacity={0.06} side={THREE.BackSide} depthWrite={false} />
      </Sphere>

      <Sphere ref={glowRef} args={[radius * 1.1, 64, 64]}>
        <meshBasicMaterial color={atmosphereColor} transparent opacity={atmosphereIntensity / 1000} side={THREE.BackSide} depthWrite={false} />
      </Sphere>
    </>
  );
}

function MarkerDot({
  position,
  isHovered,
  isPrimary,
  onPointerEnter,
  onPointerLeave,
  onClick,
}: {
  position: [number, number, number];
  isHovered: boolean;
  isPrimary: boolean;
  onPointerEnter: (e: ThreeEvent<PointerEvent>) => void;
  onPointerLeave: () => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const dotSize = isPrimary ? 0.03 : 0.018;
  const ringSize = isPrimary ? 0.042 : 0.028;
  const glowColor = isPrimary ? "#c4924a" : "#8bb0c9";

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime();
      const pulse = isHovered ? 1.6 : isPrimary ? 1 + Math.sin(t * 2) * 0.3 : 1;
      ringRef.current.scale.setScalar(pulse);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = isHovered ? 0.9 : isPrimary ? 0.6 - (pulse - 1) * 1.5 : 0.25;
    }
    if (dotRef.current) {
      dotRef.current.scale.setScalar(isHovered ? 1.5 : 1);
    }
  });

  return (
    <group
      position={position}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      <mesh ref={dotRef}>
        <sphereGeometry args={[dotSize, 16, 16]} />
        <meshBasicMaterial color={isHovered ? "#c4924a" : glowColor} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[ringSize, isPrimary ? 0.004 : 0.003, 8, 32]} />
        <meshBasicMaterial
          color={isHovered ? "#c4924a" : glowColor}
          transparent
          opacity={isPrimary ? 0.5 : 0.2}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function Globe3D(props: Globe3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 2.6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <GlobeScene {...props} />
    </Canvas>
  );
}
