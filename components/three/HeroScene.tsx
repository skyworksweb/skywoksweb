"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

/* ──────────── GLSL SHADERS ──────────── */
const orbVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    vec3 pos = position;
    float noise = sin(pos.x * 3.0 + uTime * 0.8) *
                  cos(pos.y * 2.5 + uTime * 0.6) *
                  sin(pos.z * 2.0 + uTime * 0.7) * 0.04;
    pos += normal * noise;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const orbFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);

    float t = sin(vUv.y * 3.14159 + uTime * 0.4) * 0.5 + 0.5;
    float t2 = sin(vUv.x * 3.14159 * 2.0 + uTime * 0.3) * 0.5 + 0.5;

    vec3 baseColor = mix(uColorA, uColorB, t);
    baseColor = mix(baseColor, uColorC, t2 * 0.3);

    vec3 fresnelColor = mix(uColorA, uColorC, 0.5);
    vec3 finalColor = mix(baseColor, fresnelColor, fresnel * 0.8);

    finalColor += fresnel * 0.4 * uColorA;

    float alpha = fresnel * 0.7 + 0.05;
    alpha = clamp(alpha, 0.0, 0.9);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const particleVertexShader = `
  attribute float aScale;
  attribute float aRandom;
  varying float vAlpha;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vec3 pos = position;

    float angle = uTime * 0.15 + aRandom * 6.28318;
    float radius = 0.3 + aRandom * 0.5;

    pos.x += cos(angle + pos.y) * radius * 0.08;
    pos.y += sin(angle * 1.3 + pos.z) * radius * 0.06;
    pos.z += cos(angle * 0.7 + pos.x) * radius * 0.07;

    // Mouse influence
    pos.x += uMouse.x * 0.15 * (1.0 - abs(pos.z) * 0.2);
    pos.y += uMouse.y * 0.15 * (1.0 - abs(pos.z) * 0.2);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aScale * (180.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;

    vAlpha = 0.4 + aRandom * 0.6;
  }
`;

const particleFragmentShader = `
  varying float vAlpha;
  uniform vec3 uColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float alpha = (1.0 - dist * 2.0) * vAlpha;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const gridFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  float grid(vec2 uv, float res) {
    vec2 g = abs(fract(uv * res - 0.5) - 0.5) / (fwidth(uv * res));
    return min(g.x, g.y);
  }

  void main() {
    float g1 = 1.0 - clamp(grid(vUv, 8.0), 0.0, 1.0);
    float g2 = 1.0 - clamp(grid(vUv, 2.0), 0.0, 1.0);

    float edge = length(vUv - 0.5) * 2.0;
    float fade = 1.0 - smoothstep(0.3, 1.0, edge);

    float pulse = sin(uTime * 0.5) * 0.5 + 0.5;

    vec3 colorA = vec3(0.0, 0.83, 1.0);
    vec3 colorB = vec3(0.54, 0.36, 0.96);
    vec3 color = mix(colorA, colorB, vUv.x + pulse * 0.2);

    float alpha = (g1 * 0.5 + g2 * 0.15) * fade * 0.35;

    gl_FragColor = vec4(color, alpha);
  }
`;

/* ──────────── PARTICLES ──────────── */
function Particles({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useMousePosition();

  const [positions, scales, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const ran = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sca[i] = 0.5 + Math.random() * 1.5;
      ran[i] = Math.random();
    }
    return [pos, sca, ran];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color("#00D4FF") },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uMouse.value.set(mouse.normalizedX, mouse.normalizedY);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ──────────── HOLOGRAPHIC ORB ──────────── */
function HoloOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#00D4FF") },
      uColorB: { value: new THREE.Color("#0EA5E9") },
      uColorC: { value: new THREE.Color("#8B5CF6") },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;

    mesh.current.rotation.y = clock.elapsedTime * 0.08;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.1;

    const targetX = mouse.normalizedX * 0.3;
    const targetY = mouse.normalizedY * 0.3;
    mesh.current.rotation.y += (targetX - mesh.current.rotation.y) * 0.02;
    mesh.current.rotation.x += (targetY - mesh.current.rotation.x) * 0.02;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <shaderMaterial
        vertexShader={orbVertexShader}
        fragmentShader={orbFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ──────────── OUTER RING ──────────── */
function OrbRing() {
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ring.current) return;
    ring.current.rotation.z = clock.elapsedTime * 0.12;
    ring.current.rotation.x = Math.PI / 3 + Math.sin(clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <mesh ref={ring} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[2.2, 0.008, 8, 200]} />
      <meshBasicMaterial color="#00D4FF" transparent opacity={0.25} />
    </mesh>
  );
}

/* ──────────── HOLOGRAPHIC GRID PLANE ──────────── */
function HoloGrid() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uMouse.value.lerp(
      new THREE.Vector2(mouse.normalizedX, mouse.normalizedY),
      0.05
    );
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[16, 16, 1, 1]} />
      <shaderMaterial
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={gridFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ──────────── CAMERA RIG ──────────── */
function CameraRig() {
  const { camera } = useThree();
  const mouse = useMousePosition();

  useFrame(() => {
    const targetX = mouse.normalizedX * 0.4;
    const targetY = mouse.normalizedY * 0.2 + 0.3;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ──────────── SCENE EXPORT ──────────── */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0.3, 5], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <ambientLight intensity={0.1} />
        <HoloOrb />
        <OrbRing />
        <Particles count={1500} />
        <HoloGrid />
        <CameraRig />
      </Canvas>
    </div>
  );
}
