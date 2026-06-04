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
  const positions: number[] = [];
  const step = 1.5;

  const polygons: [number, number][][] = [
    // North America
    [[70,-168],[72,-140],[70,-100],[62,-80],[50,-54],[44,-52],[42,-70],[30,-82],[25,-80],[25,-98],[30,-110],[28,-114],[22,-110],[20,-106],[15,-96],[15,-86],[10,-84],[8,-78],[10,-76],[18,-88],[20,-90],[22,-96],[25,-100],[28,-104],[32,-118],[34,-120],[36,-122],[38,-124],[40,-126],[42,-124],[48,-126],[50,-130],[52,-132],[54,-130],[58,-136],[62,-140],[64,-144],[66,-150],[68,-158],[70,-168]],
    // South America
    [[-56,-68],[-54,-72],[-48,-74],[-42,-74],[-34,-72],[-26,-70],[-18,-70],[-10,-76],[-6,-78],[0,-78],[2,-76],[5,-78],[8,-76],[10,-72],[12,-72],[12,-68],[10,-62],[8,-60],[5,-56],[0,-50],[-4,-38],[-8,-36],[-14,-40],[-16,-42],[-20,-42],[-22,-44],[-24,-46],[-26,-48],[-28,-50],[-30,-52],[-34,-54],[-38,-56],[-42,-58],[-46,-60],[-50,-62],[-54,-64],[-56,-68]],
    // Europe
    [[70,-30],[68,-28],[62,-20],[56,-8],[50,-6],[48,-8],[46,-4],[44,-2],[42,-8],[38,-10],[36,-6],[38,-2],[38,0],[40,4],[42,6],[44,8],[46,12],[48,14],[50,14],[52,16],[54,18],[56,20],[58,22],[60,24],[62,26],[64,28],[66,30],[68,28],[70,26],[72,24],[70,20],[70,10],[72,0],[72,-10],[70,-30]],
    // Africa
    [[37,-6],[36,-2],[34,0],[32,2],[30,4],[28,6],[26,8],[24,10],[22,12],[20,14],[18,16],[16,18],[14,20],[12,42],[10,44],[8,48],[6,50],[4,48],[2,46],[0,42],[-2,40],[-4,38],[-6,36],[-10,38],[-12,38],[-14,36],[-16,34],[-18,30],[-20,28],[-22,26],[-24,24],[-26,22],[-28,20],[-30,18],[-32,16],[-34,18],[-36,22],[-34,26],[-30,30],[-26,32],[-22,34],[-18,36],[-14,38],[-10,40],[-6,42],[-2,44],[2,44],[4,48],[8,50],[12,50],[12,46],[14,44],[14,40],[16,34],[18,30],[20,28],[22,30],[26,28],[28,26],[30,24],[32,20],[34,16],[36,12],[36,8],[37,4],[37,-6]],
    // Asia (mainland)
    [[72,30],[70,28],[68,30],[66,32],[64,34],[62,36],[60,38],[58,40],[56,42],[54,44],[52,48],[50,52],[48,56],[46,60],[44,64],[42,68],[40,72],[38,76],[36,80],[34,84],[32,88],[30,92],[28,96],[26,100],[24,104],[22,108],[20,112],[18,116],[16,120],[14,124],[12,128],[10,130],[8,132],[6,134],[4,136],[2,138],[0,140],[-2,140],[-4,138],[-6,136],[-8,134],[-10,132],[-8,128],[-6,124],[-4,120],[-2,116],[0,112],[2,108],[4,104],[6,100],[8,96],[10,94],[12,92],[14,90],[16,88],[18,86],[20,88],[22,86],[24,84],[26,82],[28,80],[30,78],[32,76],[34,74],[36,72],[38,70],[40,68],[42,66],[44,64],[46,62],[48,60],[50,58],[52,56],[54,54],[56,52],[58,50],[60,48],[62,46],[64,44],[66,42],[68,40],[70,38],[72,36],[72,30]],
    // Southeast Asia / Indonesia
    [[-10,110],[-8,112],[-6,114],[-4,116],[-2,118],[0,120],[2,122],[4,124],[6,126],[8,128],[6,130],[4,130],[2,128],[0,126],[-2,124],[-4,122],[-6,120],[-8,118],[-10,116],[-10,114],[-10,112],[-10,110]],
    [[-8,106],[-6,108],[-4,110],[-6,112],[-8,110],[-8,108],[-8,106]],
    [[-10,118],[-8,120],[-8,122],[-10,120],[-10,118]],
    // Australia
    [[-14,126],[-16,124],[-18,122],[-20,120],[-22,118],[-24,116],[-26,114],[-28,116],[-30,118],[-32,120],[-34,122],[-36,124],[-38,126],[-38,130],[-36,134],[-34,136],[-32,138],[-30,140],[-28,142],[-26,144],[-24,146],[-22,148],[-20,150],[-18,150],[-16,148],[-14,146],[-12,144],[-12,140],[-12,136],[-12,132],[-12,128],[-14,126]],
    // Greenland
    [[82,-30],[80,-28],[78,-26],[76,-24],[74,-22],[72,-20],[70,-18],[68,-20],[66,-22],[64,-26],[62,-30],[62,-36],[64,-40],[66,-42],[68,-44],[70,-46],[72,-48],[74,-50],[76,-48],[78,-46],[80,-44],[82,-40],[82,-30]],
    // Middle East (Arabian Peninsula)
    [[30,34],[28,36],[26,38],[24,40],[22,42],[20,44],[18,46],[16,48],[14,50],[14,52],[16,54],[18,56],[20,54],[22,54],[24,52],[26,52],[28,50],[30,48],[32,46],[34,44],[34,40],[32,38],[30,34]],
    // India
    [[32,70],[30,72],[28,74],[26,76],[24,78],[22,80],[20,82],[18,84],[16,86],[14,88],[12,88],[10,86],[8,84],[8,80],[10,78],[12,76],[14,74],[16,72],[18,70],[20,68],[22,66],[24,68],[26,68],[28,68],[30,68],[32,70]],
    // Japan
    [[45,142],[44,144],[43,146],[42,148],[40,150],[38,152],[36,152],[34,150],[32,148],[32,146],[34,144],[36,142],[38,140],[40,140],[42,140],[44,142],[45,142]],
    // Madagascar
    [[-14,46],[-16,48],[-18,50],[-20,52],[-22,54],[-24,52],[-26,50],[-26,48],[-24,46],[-22,44],[-20,42],[-18,42],[-16,44],[-14,46]],
    // British Isles
    [[58,-6],[56,-8],[54,-6],[52,-4],[50,-6],[50,-8],[52,-10],[54,-10],[56,-8],[58,-6]],
    // Scandinavia
    [[70,20],[68,22],[66,24],[64,26],[62,28],[60,30],[58,32],[56,34],[54,36],[52,38],[50,38],[48,36],[48,34],[50,32],[52,30],[54,28],[56,26],[58,24],[60,22],[62,20],[64,18],[66,18],[68,18],[70,20]],
    // New Zealand
    [[-35,166],[-36,168],[-38,170],[-40,172],[-42,172],[-44,170],[-44,168],[-42,166],[-40,164],[-38,164],[-36,166],[-35,166]],
    // Philippines
    [[18,120],[16,122],[14,124],[12,126],[10,128],[8,128],[6,126],[6,124],[8,122],[10,120],[12,118],[14,118],[16,118],[18,120]],
  ];

  function pointInPolygon(lat: number, lng: number, polygon: [number, number][]): boolean {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [latI, lngI] = polygon[i];
      const [latJ, lngJ] = polygon[j];
      if (
        ((lngI > lng) !== (lngJ > lng)) &&
        (lat < (latJ - latI) * (lng - lngI) / (lngJ - lngI) + latI)
      ) {
        inside = !inside;
      }
    }
    return inside;
  }

  for (let lat = -85; lat <= 85; lat += step) {
    for (let lng = -180; lng <= 180; lng += step) {
      const isLand = polygons.some((poly) => pointInPolygon(lat, lng, poly));
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
    (marker: GlobeMarker) => (e: ThreeEvent<PointerEvent>) => {
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
        <Sphere args={[radius, 32, 32]}>
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
  onClick: (e: ThreeEvent<PointerEvent>) => void;
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
    >
      <mesh ref={dotRef} onClick={onClick} onPointerDown={onClick}>
        <sphereGeometry args={[dotSize, 16, 16]} />
        <meshBasicMaterial color={isHovered ? "#c4924a" : glowColor} />
      </mesh>
      <mesh ref={ringRef} onClick={onClick} onPointerDown={onClick}>
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
