import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(600 * 3); // 600 particles
    for (let i = 0; i < 600; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;     // x spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40; // y spread (tall for scrolling)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z spread
    }
    return pos;
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={600} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.008} color="#94A3B8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function ParticleGrid() {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
