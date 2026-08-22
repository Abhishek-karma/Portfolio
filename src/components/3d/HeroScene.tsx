import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { inSphere } from 'maath/random';

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const sphere = inSphere(new Float32Array(500 * 3), { radius: 10 }) as Float32Array;

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function GeodesicSphere() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.pointer.x * 0.5 + state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = -state.pointer.y * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <icosahedronGeometry args={[2, 2]} />
          <meshStandardMaterial 
            color="#0f172a" 
            wireframe
            emissive="#06b6d4"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={1} />
        <GeodesicSphere />
        <Particles />
      </Canvas>
    </div>
  );
}
