import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Torus, Octahedron, Icosahedron, Sphere, MeshDistortMaterial, MeshWobbleMaterial, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

interface Background3DProps {
  primaryColor?: string;
  secondaryColor?: string;
}

// Rig component moves the camera slightly based on mouse position for parallax effect
const Rig = () => {
  useFrame((state) => {
    // Smoother lerp for camera movement
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 1 + state.mouse.x / 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1 + state.mouse.y / 2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// New Component: Floating blobs that fill the background and react to scroll
const AmbientBlobs = ({ primaryColor, secondaryColor }: { primaryColor: string, secondaryColor: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const blobs = useMemo(() => {
    // Generate a palette based on props
    const colors = [
      primaryColor, 
      secondaryColor, 
      '#ffffff', 
      primaryColor, // weight towards primary
    ];
    
    return Array.from({ length: 25 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 80 - 10, // Spread vertically to cover scrolling
        (Math.random() * -25) - 10 // Depth
      ] as [number, number, number],
      scale: Math.random() * 2.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2 + 1,
      distort: Math.random() * 0.4 + 0.3,
      opacity: Math.random() * 0.3 + 0.1
    }));
  }, [primaryColor, secondaryColor]);

  useFrame((state) => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      
      // Move blobs upwards as we scroll down to create parallax
      groupRef.current.position.y = scrollY * 0.015;
      
      // Slow rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {blobs.map((blob, i) => (
        <Float key={i} speed={blob.speed} rotationIntensity={1} floatIntensity={1}>
          <Sphere position={blob.position} args={[1, 32, 32]} scale={blob.scale}>
             <MeshDistortMaterial 
               color={blob.color}
               speed={blob.speed}
               distort={blob.distort}
               radius={1}
               transparent
               opacity={blob.opacity}
               side={THREE.DoubleSide}
             />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

const HeroGeometries = ({ primaryColor, secondaryColor }: { primaryColor: string, secondaryColor: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      const scrollY = window.scrollY;

      // Base rotation from time
      const timeRotationY = t * 0.05;
      const timeRotationX = Math.sin(t * 0.2) * 0.1;

      // Interaction from scroll
      const scrollRotationY = scrollY * 0.0005;
      const scrollRotationX = scrollY * 0.0002;
      const scrollPositionY = scrollY * 0.002; // Slower parallax for hero items

      groupRef.current.rotation.y = timeRotationY + scrollRotationY;
      groupRef.current.rotation.x = timeRotationX + scrollRotationX;
      groupRef.current.position.y = scrollPositionY;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main floating shape - Responsive to Theme */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        <Icosahedron position={[-3, 2, -6]} args={[1.4, 0]}>
           <MeshDistortMaterial 
             color={primaryColor} 
             emissive={secondaryColor}
             emissiveIntensity={0.8}
             speed={3} 
             distort={0.5} 
             radius={1}
           />
        </Icosahedron>
      </Float>

      {/* Secondary shape - Wireframe */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
        <Torus position={[5, -3, -10]} args={[1.8, 0.2, 16, 50]}>
          <meshStandardMaterial color={secondaryColor} emissive={primaryColor} emissiveIntensity={1} wireframe />
        </Torus>
      </Float>

      {/* Accent - Sphere */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1}>
        <Sphere position={[4, 3, -12]} args={[1, 32, 32]}>
           <MeshWobbleMaterial color={secondaryColor} emissive={secondaryColor} emissiveIntensity={0.5} factor={0.6} speed={2} roughness={0.2} metalness={0.8} />
        </Sphere>
      </Float>

      {/* Accent - Torus Knot */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <TorusKnot position={[-5, -2, -15]} args={[1, 0.3, 100, 16]}>
          <MeshDistortMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.5} speed={4} distort={0.3} />
        </TorusKnot>
      </Float>

      {/* Small accent - Octahedron */}
      <Float speed={4} rotationIntensity={2} floatIntensity={1}>
        <Octahedron position={[-6, 4, -8]} args={[0.9, 0]}>
           <meshStandardMaterial color={secondaryColor} emissive={primaryColor} emissiveIntensity={0.8} wireframe />
        </Octahedron>
      </Float>
    </group>
  );
};

const Background3D: React.FC<Background3DProps> = ({ 
  primaryColor = '#3b82f6', 
  secondaryColor = '#ec4899' 
}) => {
  return (
    <div className="fixed inset-0 z-0 bg-slate-950 pointer-events-none transition-colors duration-1000">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#020617', 5, 45]} />
        <ambientLight intensity={0.2} />
        {/* Dynamic lights based on theme */}
        <pointLight position={[10, 10, 10]} intensity={2} color={primaryColor} />
        <pointLight position={[-10, -10, -5]} intensity={2} color={secondaryColor} />
        <pointLight position={[0, -5, 0]} intensity={1} color={primaryColor} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={2} />
        
        {/* Render both geometry groups with theme colors */}
        <HeroGeometries primaryColor={primaryColor} secondaryColor={secondaryColor} />
        <AmbientBlobs primaryColor={primaryColor} secondaryColor={secondaryColor} />
        
        <Rig />
      </Canvas>
      {/* Colorful Gradient Overlay - Dynamic */}
      <div 
        className="absolute inset-0 z-10 mix-blend-overlay transition-colors duration-1000"
        style={{
          background: `linear-gradient(to bottom right, ${primaryColor}4D, #020617 50%, ${secondaryColor}4D)`
        }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay animate-pulse"></div>
    </div>
  );
};

export default Background3D;