"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

/* ──────── GALAXY PARTICLE SHADER ──────── */
const galaxyVertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vec3 pos = position;

    // Differential rotation: inner faster, outer slower
    float dist = length(pos.xz);
    float rotSpeed = 0.12 / (dist * 0.6 + 0.8);
    float angle = rotSpeed * uTime;
    float cosA = cos(angle);
    float sinA = sin(angle);
    float nx = pos.x * cosA - pos.z * sinA;
    float nz = pos.x * sinA + pos.z * cosA;
    pos.x = nx;
    pos.z = nz;

    // Gentle mouse parallax
    pos.x += uMouse.x * 0.12 * (1.0 - dist * 0.08);
    pos.y += uMouse.y * 0.06;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;

    float edgeFade = 1.0 - smoothstep(4.5, 7.5, dist);
    vColor = aColor;
    vAlpha = edgeFade;
  }
`;

const galaxyFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float core = exp(-d * 9.0);
    float halo = exp(-d * 4.5) * 0.55;
    float alpha = (core + halo) * vAlpha;

    vec3 finalColor = vColor + core * 0.4;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

/* ──────── STAR FIELD SHADER ──────── */
const starVertexShader = `
  attribute float aSize;
  varying float vAlpha;
  uniform float uTime;

  void main() {
    vec3 pos = position;
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (180.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
    vAlpha = 0.3 + sin(uTime * 0.8 + pos.x * 10.0) * 0.15;
  }
`;

const starFragmentShader = `
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = exp(-d * 8.0) * vAlpha;
    gl_FragColor = vec4(0.75, 0.88, 1.0, alpha);
  }
`;

/* ──────── GALAXY GENERATOR ──────── */
function generateGalaxy(count: number) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  const insideColor = new THREE.Color("#ffe8b0");
  const midColor = new THREE.Color("#4499ff");
  const outsideColor = new THREE.Color("#0a1840");

  const numArms = 2;
  const radius = 7.0;
  const spin = 1.6;
  const randomnessPower = 3.0;
  const randomness = 0.5;

  for (let i = 0; i < count; i++) {
    const r = Math.pow(Math.random(), 0.6) * radius;
    const spinAngle = r * spin;
    const armAngle = ((i % numArms) / numArms) * Math.PI * 2;

    const rx =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      r;
    const ry =
      Math.pow(Math.random(), randomnessPower + 1) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      r *
      0.15;
    const rz =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      r;

    positions[i * 3] = Math.cos(armAngle + spinAngle) * r + rx;
    positions[i * 3 + 1] = ry;
    positions[i * 3 + 2] = Math.sin(armAngle + spinAngle) * r + rz;

    const t = r / radius;
    const col = new THREE.Color();
    if (t < 0.35) {
      col.lerpColors(insideColor, midColor, t / 0.35);
    } else {
      col.lerpColors(midColor, outsideColor, (t - 0.35) / 0.65);
    }

    const brightness = 0.5 + Math.random() * 0.7;
    colors[i * 3] = col.r * brightness;
    colors[i * 3 + 1] = col.g * brightness;
    colors[i * 3 + 2] = col.b * brightness;

    sizes[i] = r < 1.0
      ? 1.5 + Math.random() * 2.0
      : 0.4 + Math.random() * 1.2;
  }

  return { positions, sizes, colors };
}

/* ──────── GALAXY COMPONENT ──────── */
function Galaxy({ count = 14000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useMousePosition();

  const { positions, sizes, colors } = useMemo(() => generateGalaxy(count), [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
  }), []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uMouse.value.lerp(
      new THREE.Vector2(mouse.normalizedX, mouse.normalizedY),
      0.04
    );
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={galaxyVertexShader}
        fragmentShader={galaxyFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={false}
      />
    </points>
  );
}

/* ──────── CENTRAL BRIGHT CORE ──────── */
function GalaxyCore() {
  const mesh = useRef<THREE.Mesh>(null);
  const glowMesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current || !glowMesh.current) return;
    const pulse = Math.sin(clock.elapsedTime * 0.9) * 0.5 + 0.5;
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.85 + pulse * 0.1;
    const gmat = glowMesh.current.material as THREE.MeshBasicMaterial;
    gmat.opacity = 0.12 + pulse * 0.06;
  });

  return (
    <group>
      {/* Warm inner glow */}
      <mesh ref={glowMesh}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial
          color="#ffe0a0"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Bright nucleus */}
      <mesh ref={mesh}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Blue outer halo */}
      <mesh>
        <sphereGeometry args={[4.5, 16, 16]} />
        <meshBasicMaterial
          color="#1a3a8a"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* ──────── BACKGROUND STARS ──────── */
function BackgroundStars({ count = 3500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 12 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      siz[i] = 0.2 + Math.random() * 0.6;
    }
    return [pos, siz];
  }, [count]);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ──────── NEBULA PATCHES ──────── */
function NebulaClouds() {
  const refs = useRef<THREE.Mesh[]>([]);

  const patches = useMemo(() => [
    { pos: [-3.5, 0.3, -1.5], color: "#0a2a6a", size: 3.2, opacity: 0.06 },
    { pos: [3.0, -0.2, 1.8],  color: "#071a50", size: 2.8, opacity: 0.05 },
    { pos: [-1.5, 0.5, 3.2],  color: "#0d3070", size: 2.4, opacity: 0.05 },
    { pos: [2.5, -0.4, -3.0], color: "#102060", size: 2.6, opacity: 0.04 },
  ], []);

  useFrame(({ clock }) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = patches[i].opacity * (0.8 + Math.sin(clock.elapsedTime * 0.25 + i * 1.3) * 0.2);
    });
  });

  return (
    <>
      {patches.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) refs.current[i] = el; }}
          position={p.pos as [number, number, number]}
        >
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial
            color={p.color}
            transparent
            opacity={p.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>
      ))}
    </>
  );
}

/* ──────── SCENE ──────── */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [1.5, 2.8, 6.5], fov: 52 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0);
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Galaxy group — tilted like in the reference image */}
        <group rotation={[-0.22, 0.1, 0.08]}>
          <BackgroundStars count={3500} />
          <NebulaClouds />
          <Galaxy count={14000} />
          <GalaxyCore />
        </group>
      </Canvas>
    </div>
  );
}
