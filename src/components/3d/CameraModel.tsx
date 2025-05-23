import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { useGSAP } from '../../hooks/useGSAP';
import * as THREE from 'three';

// Camera model component
const Model = ({ scrollY }: { scrollY: number }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Instead of loading a GLTF model, we'll create a camera-like shape
  useEffect(() => {
    camera.position.z = 5;
  }, [camera]);
  
  useFrame(() => {
    if (modelRef.current) {
      // Rotate based on scroll position and mouse movement
      modelRef.current.rotation.y += 0.003;
      modelRef.current.rotation.x = Math.sin(scrollY * 0.001) * 0.1;
    }
  });

  return (
    <group ref={modelRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
      {/* Camera body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.8, 1.5]} />
        <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.8} />
      </mesh>
      
      {/* Camera lens */}
      <mesh castShadow receiveShadow position={[0, 0, 0.9]}>
        <cylinderGeometry args={[0.35, 0.35, 0.7, 32]} />
        <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.9} />
      </mesh>
      
      {/* Lens glass */}
      <mesh position={[0, 0, 1.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshStandardMaterial color="#444444" roughness={0.1} metalness={1} />
      </mesh>
      
      {/* Camera grip */}
      <mesh castShadow receiveShadow position={[0.6, 0, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.8]} />
        <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.7} />
      </mesh>
      
      {/* Gold accent */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.02, 0.05, 1.52]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={1} />
      </mesh>
    </group>
  );
};

const CameraModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { gsap } = useGSAP();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Model scrollY={scrollY} />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
};

export default CameraModel;