import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FluidBlob = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      colorA: { value: new THREE.Color("#d4af37") }, // Gold
      colorB: { value: new THREE.Color("#f5e6d3") }, // Cream beige
      colorC: { value: new THREE.Color("#2d5f4f") }, // Emerald
    }),
    []
  );

  const vertexShader = `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      
      // Organic wave distortion
      float wave1 = sin(pos.x * 2.0 + time * 0.5) * 0.15;
      float wave2 = cos(pos.y * 2.0 + time * 0.3) * 0.15;
      float wave3 = sin((pos.x + pos.y) * 1.5 + time * 0.4) * 0.1;
      
      pos.z += wave1 + wave2 + wave3;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      // Create flowing organic patterns
      float pattern1 = sin(vUv.x * 3.0 + time * 0.2) * 0.5 + 0.5;
      float pattern2 = cos(vUv.y * 3.0 + time * 0.15) * 0.5 + 0.5;
      float pattern3 = sin((vUv.x + vUv.y) * 2.0 + time * 0.25) * 0.5 + 0.5;
      
      float mixFactor = (pattern1 + pattern2 + pattern3) / 3.0;
      
      // Mix colors for liquid gold effect
      vec3 color = mix(colorB, colorA, mixFactor);
      color = mix(color, colorC, pattern3 * 0.3);
      
      // Add shimmer
      float shimmer = sin(vUv.x * 10.0 + time) * sin(vUv.y * 10.0 + time * 0.7) * 0.1 + 0.9;
      color *= shimmer;
      
      gl_FragColor = vec4(color, 0.95);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={[3, 2, 1]}>
      <planeGeometry args={[4, 4, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const FluidBackground = () => {
  return (
    <div className="absolute inset-0 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
        <FluidBlob />
      </Canvas>
    </div>
  );
};

export default FluidBackground;
