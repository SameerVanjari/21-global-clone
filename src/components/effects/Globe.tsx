"use client";

import { useMemo, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GLOBE_RADIUS = 1;
const ROTATION_SPEED = 0.05;
const DOT_INTERVAL = 2;

const CITY_MARKERS = [
  { name: "Dubai", lat: 25.2, lng: 55.3 },
  { name: "Singapore", lat: 1.3, lng: 103.8 },
  { name: "Geneva", lat: 46.2, lng: 6.1 },
] as const;

function latLngToVec3(
  lat: number,
  lng: number,
  radius: number
): THREE.Vector3 {
  const phi = (lat * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.cos(theta),
    radius * Math.sin(phi),
    -radius * Math.cos(phi) * Math.sin(theta)
  );
}

function isLand(lat: number, lng: number): boolean {
  const absLat = Math.abs(lat);

  if (lng >= -18 && lng <= 52 && lat >= -35 && lat <= 37) return true;
  if (lng >= -10 && lng <= 40 && lat >= 36 && lat <= 71) return true;
  if (lng >= 5 && lng <= 30 && lat >= 56 && lat <= 72) return true;
  if (lng >= -10 && lng <= 2 && lat >= 50 && lat <= 59) return true;
  if (lng >= -24 && lng <= -13 && lat >= 63 && lat <= 67) return true;
  if (lng >= 40 && lng <= 180 && lat >= 10 && lat <= 72) return true;
  if (lng >= 68 && lng <= 180 && lat >= -10 && lat <= 35) return true;
  if (lng >= 128 && lng <= 146 && lat >= 30 && lat <= 46) return true;
  if (lng >= 35 && lng <= 60 && lat >= 12 && lat <= 42) return true;
  if (lng >= -170 && lng <= -55 && lat >= 15 && lat <= 72) return true;
  if (lng >= -170 && lng <= -130 && lat >= 55 && lat <= 72) return true;
  if (lng >= -73 && lng <= -11 && lat >= 60 && lat <= 83) return true;
  if (lng >= -120 && lng <= -55 && lat >= 7 && lat <= 33) return true;
  if (lng >= -80 && lng <= -35 && lat >= -55 && lat <= 12) return true;
  if (lng >= 112 && lng <= 155 && lat >= -40 && lat <= -10) return true;
  if (lng >= 166 && lng <= 179 && lat >= -47 && lat <= -34) return true;
  if (lng >= 95 && lng <= 150 && lat >= -10 && lat <= 8) return true;
  if (lng >= 43 && lng <= 50 && lat >= -26 && lat <= -12) return true;
  if (lng >= -85 && lng <= -60 && lat >= 10 && lat <= 25) return true;
  if (lng >= 79 && lng <= 82 && lat >= 6 && lat <= 10) return true;
  if (lng >= 140 && lng <= 146 && lat >= 42 && lat <= 55) return true;
  if (lng >= 155 && lng <= 170 && lat >= 50 && lat <= 65) return true;
  if (lng >= 26 && lng <= 45 && lat >= 36 && lat <= 42) return true;
  if (lng >= 50 && lng <= 85 && lat >= 36 && lat <= 55) return true;
  if (lng >= 32 && lng <= 52 && lat >= -2 && lat <= 12) return true;
  if (lng >= -80 && lng <= -67 && lat >= -55 && lat <= -18) return true;
  if (lng >= -75 && lng <= -63 && lat >= -55 && lat <= -40) return true;
  if (lng >= -118 && lng <= -100 && lat >= 22 && lat <= 33) return true;
  if (lng >= -83 && lng <= -77 && lat >= 24 && lat <= 28) return true;
  if (lng >= -85 && lng <= -74 && lat >= 20 && lat <= 24) return true;
  if (lng >= -72 && lng <= -68 && lat >= 17 && lat <= 20) return true;
  if (lng >= 12 && lng <= 34 && lat >= 34 && lat <= 38) return true;
  if (lng >= 124 && lng <= 131 && lat >= 33 && lat <= 43) return true;
  if (lng >= -18 && lng <= 15 && lat >= 4 && lat <= 20) return true;
  if (lng >= 14 && lng <= 36 && lat >= -35 && lat <= -16) return true;
  if (lng >= 47 && lng <= 54 && lat >= 37 && lat <= 47) return false;
  if (lng >= -6 && lng <= 36 && lat >= 34 && lat <= 44) {
    const medLat = lat;
    const medLng = lng;
    if (medLng >= -6 && medLng <= 4 && medLat >= 36 && medLat <= 44) return true;
    if (medLng >= 7 && medLng <= 18 && medLat >= 37 && medLat <= 47) return true;
    if (medLng >= 18 && medLng <= 30 && medLat >= 34 && medLat <= 42) return true;
    if (medLng >= 26 && medLng <= 45 && medLat >= 36 && medLat <= 42) return true;
    if (medLng >= -6 && medLng <= 36 && medLat >= 30 && medLat <= 37) return true;
    return false;
  }
  if (lng >= 28 && lng <= 42 && lat >= 41 && lat <= 47) return false;
  if (lng >= 34 && lng <= 44 && lat >= 12 && lat <= 30) return false;
  if (lng >= 48 && lng <= 57 && lat >= 24 && lat <= 31) return false;
  if (lng >= -92 && lng <= -76 && lat >= 41 && lat <= 49) return true;
  if (lng >= -95 && lng <= -77 && lat >= 52 && lat <= 66) return false;
  if (lng >= -98 && lng <= -82 && lat >= 18 && lat <= 30) return false;
  if (lng >= -88 && lng <= -60 && lat >= 9 && lat <= 22) {
    const cLat = lat;
    const cLng = lng;
    if (cLat >= 17 && cLat <= 24 && cLng >= -85 && cLng <= -65) return true;
    return false;
  }
  if (lng >= 80 && lng <= 96 && lat >= 5 && lat <= 22) return false;
  if (lng >= 105 && lng <= 122 && lat >= 2 && lat <= 22) return false;
  if (lng >= 128 && lng <= 142 && lat >= 34 && lat <= 46) return false;
  if (lng >= 12 && lng <= 30 && lat >= 54 && lat <= 60) return false;
  if (lng >= -4 && lng <= 10 && lat >= 52 && lat <= 60) return false;
  if (lng >= -180 && lng <= -160 && lat >= 52 && lat <= 66) return false;
  if (lng >= 135 && lng <= 160 && lat >= 44 && lat <= 62) return false;
  if (lng >= 120 && lng <= 131 && lat >= 24 && lat <= 33) return false;
  if (lng >= 117 && lng <= 127 && lat >= 32 && lat <= 40) return false;
  if (lng >= 55 && lng <= 75 && lat >= 5 && lat <= 24) return false;
  if (lng >= -8 && lng <= 10 && lat >= -5 && lat <= 6) return false;
  if (lng >= 35 && lng <= 50 && lat >= -26 && lat <= -10) return false;
  if (lng >= 148 && lng <= 170 && lat >= -45 && lat <= -33) return false;
  if (lng >= 145 && lng <= 165 && lat >= -28 && lat <= -8) return false;
  if (lng >= 126 && lng <= 142 && lat >= -15 && lat <= -8) return false;
  if (lng >= 106 && lng <= 128 && lat >= -8 && lat <= -3) return false;
  if (lng >= -115 && lng <= -107 && lat >= 24 && lat <= 32) return false;
  if (lng >= -60 && lng <= -55 && lat >= -38 && lat <= -34) return false;
  if (lng >= 31 && lng <= 35 && lat >= -3 && lat <= 1) return false;
  if (lng >= 103 && lng <= 110 && lat >= 51 && lat <= 56) return false;
  if (lng >= 58 && lng <= 62 && lat >= 43 && lat <= 47) return false;
  if (lng >= 99 && lng <= 105 && lat >= 6 && lat <= 14) return false;
  if (lng >= 92 && lng <= 99 && lat >= 5 && lat <= 17) return false;
  if (lng >= -10 && lng <= 0 && lat >= 44 && lat <= 48) return false;
  if (lng >= -6 && lng <= 2 && lat >= 48 && lat <= 52) return false;
  if (lng >= -7 && lng <= -3 && lat >= 52 && lat <= 55) return false;
  if (lng >= -68 && lng <= -56 && lat >= 45 && lat <= 52) return false;
  if (lng >= -152 && lng <= -135 && lat >= 56 && lat <= 62) return false;
  if (lng >= -120 && lng <= -70 && lat >= 68 && lat <= 78) {
    const aLat = lat;
    const aLng = lng;
    const x = Math.round(aLng / 5);
    const y = Math.round(aLat / 5);
    if ((x + y) % 3 === 0) return true;
    if ((x * 7 + y * 3) % 5 === 0) return true;
    return false;
  }
  if (lng >= 95 && lng <= 141 && lat >= -10 && lat <= 8) {
    const iLng = lng;
    const iLat = lat;
    const ix = Math.round(iLng / 4);
    const iy = Math.round(iLat / 4);
    return (ix + iy) % 2 === 0;
  }
  if (lng >= 170 && lng <= 180 && lat >= -20 && lat <= -14) return true;
  if (lng >= -175 && lng <= -155 && lat >= -22 && lat <= -15) return true;
  if (lng >= -160 && lng <= -154 && lat >= 18 && lat <= 22) return true;

  return false;
}

function LandBumps() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const dotGeometry = useMemo(
    () => new THREE.SphereGeometry(0.008, 4, 4),
    []
  );

  const { positions } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let lat = -90; lat <= 90; lat += DOT_INTERVAL) {
      for (let lng = -180; lng <= 180; lng += DOT_INTERVAL) {
        if (!isLand(lat, lng)) continue;
        pts.push(latLngToVec3(lat, lng, GLOBE_RADIUS * 1.005));
      }
    }
    return { positions: pts };
  }, []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || positions.length === 0) return;
    const matrix = new THREE.Matrix4();
    positions.forEach((pos, i) => {
      matrix.setPosition(pos);
      mesh.setMatrixAt(i, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [positions]);

  if (positions.length === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[dotGeometry, undefined, positions.length]}
    >
      <meshStandardMaterial
        color="#b8b3ac"
        roughness={0.9}
        metalness={0}
      />
    </instancedMesh>
  );
}

function CityMarker({ lat, lng }: { lat: number; lng: number }) {
  const position = useMemo(
    () => latLngToVec3(lat, lng, GLOBE_RADIUS * 1.012),
    [lat, lng]
  );

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.014, 8, 8]} />
      <meshStandardMaterial
        color="#e8e4de"
        roughness={0.3}
        metalness={0}
        emissive="#e8e4de"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function Arc({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const curve = useMemo(() => {
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const outward = mid.clone().normalize().multiplyScalar(GLOBE_RADIUS * 1.12);
    return new THREE.QuadraticBezierCurve3(
      start.clone(),
      outward,
      end.clone()
    );
  }, [start, end]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.0035, 4, false]} />
      <meshStandardMaterial
        color="#d4cfc8"
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}

function CityArcs() {
  const cities = useMemo(
    () =>
      CITY_MARKERS.map((c) =>
        latLngToVec3(c.lat, c.lng, GLOBE_RADIUS)
      ),
    []
  );

  const pairs: [THREE.Vector3, THREE.Vector3][] = useMemo(
    () => [
      [cities[0], cities[1]],
      [cities[1], cities[2]],
      [cities[2], cities[0]],
    ],
    [cities]
  );

  return (
    <>
      {pairs.map((pair, i) => (
        <Arc key={i} start={pair[0]} end={pair[1]} />
      ))}
    </>
  );
}

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED * delta;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 72, 72]} />
        <meshStandardMaterial
          color="#d4cfc8"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      <LandBumps />

      {CITY_MARKERS.map((city) => (
        <CityMarker key={city.name} lat={city.lat} lng={city.lng} />
      ))}

      <CityArcs />
    </group>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[-6, 5, 3]}
        intensity={1.8}
      />
      <directionalLight
        position={[4, -3, -5]}
        intensity={0.25}
      />
    </>
  );
}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.6], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <SceneLighting />
      <GlobeScene />
    </Canvas>
  );
}
