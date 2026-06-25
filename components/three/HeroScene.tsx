"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

/* ──────── ORB SHADERS ──────── */
const orbVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;

  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main(){
    vUv=uv;
    vNormal=normalize(normalMatrix*normal);
    vPosition=position;
    vec3 pos=position;
    float n=snoise(pos*1.8+uTime*0.25)*0.14;
    n+=snoise(pos*3.5-uTime*0.18)*0.06;
    pos+=normal*n;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
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

  void main(){
    vec3 viewDir=normalize(cameraPosition-vPosition);
    float fresnel=pow(1.0-max(dot(vNormal,viewDir),0.0),2.2);
    float t=sin(vUv.y*6.28+uTime*0.4)*0.5+0.5;
    float t2=cos(vUv.x*6.28+uTime*0.3)*0.5+0.5;
    vec3 base=mix(uColorA,uColorB,t);
    base=mix(base,uColorC,t2*0.45);
    vec3 col=mix(base,uColorA,fresnel*0.9);
    col+=fresnel*0.7*uColorA;
    float pulse=sin(uTime*0.7)*0.5+0.5;
    col+=uColorC*pulse*0.12*(1.0-fresnel);
    float alpha=fresnel*0.9+0.1;
    gl_FragColor=vec4(col*1.3,clamp(alpha,0.0,1.0));
  }
`;

/* ──────── PARTICLE SHADER ──────── */
const particleVertexShader = `
  attribute float aScale;
  attribute float aRandom;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uTime;
  uniform vec2 uMouse;

  void main(){
    vec3 pos=position;
    float angle=uTime*(0.04+aRandom*0.08)+aRandom*6.28318;
    pos.x+=cos(angle)*aRandom*0.18;
    pos.y+=sin(angle*1.3)*aRandom*0.12;
    pos.z+=cos(angle*0.7)*aRandom*0.14;
    pos.x+=uMouse.x*0.06*(1.0-aRandom*0.5);
    pos.y+=uMouse.y*0.05*(1.0-aRandom*0.5);
    vec4 mvPos=modelViewMatrix*vec4(pos,1.0);
    gl_PointSize=aScale*(220.0/-mvPos.z);
    gl_Position=projectionMatrix*mvPos;
    vColor=aColor;
    vAlpha=0.35+aRandom*0.65;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main(){
    vec2 uv=gl_PointCoord-0.5;
    float dist=length(uv);
    if(dist>0.5)discard;
    float core=1.0-smoothstep(0.0,0.2,dist);
    float glow=exp(-dist*6.0)*0.6;
    float alpha=(1.0-dist*2.0)*vAlpha+glow*0.4;
    gl_FragColor=vec4(vColor*1.4+glow,alpha);
  }
`;

/* ──────── STAR FIELD (depth background) ──────── */
function StarField({ count = 2500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, scales, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#aaddff"),
      new THREE.Color("#bbaaff"),
      new THREE.Color("#00D4FF"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sca[i] = 0.3 + Math.random() * 0.7;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, sca, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.elapsedTime * 0.005;
    mesh.current.rotation.x = clock.elapsedTime * 0.003;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={{ uTime: { value: 0 }, uMouse: { value: new THREE.Vector2() } }}
        transparent depthWrite={false} blending={THREE.AdditiveBlending}
        vertexColors={false}
      />
    </points>
  );
}

/* ──────── NEBULA CLOUD PARTICLES ──────── */
function NebulaParticles({ count = 1800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useMousePosition();

  const [positions, scales, randoms, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const ran = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#00D4FF"),
      new THREE.Color("#0EA5E9"),
      new THREE.Color("#8B5CF6"),
      new THREE.Color("#A855F7"),
      new THREE.Color("#06B6D4"),
    ];

    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sca[i] = 0.4 + Math.random() * 1.8;
      ran[i] = Math.random();
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, sca, ran, col];
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
  }), []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uMouse.value.set(mouse.normalizedX, mouse.normalizedY);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent depthWrite={false} blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ──────── HOLOGRAPHIC ORB ──────── */
function HoloOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color("#00D4FF") },
    uColorB: { value: new THREE.Color("#0EA5E9") },
    uColorC: { value: new THREE.Color("#8B5CF6") },
  }), []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    mesh.current.rotation.y = clock.elapsedTime * 0.07;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.11) * 0.12;
    const targetX = mouse.normalizedX * 0.35;
    const targetY = mouse.normalizedY * 0.35;
    mesh.current.rotation.y += (targetX - mesh.current.rotation.y) * 0.015;
    mesh.current.rotation.x += (targetY - mesh.current.rotation.x) * 0.015;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.75, 96, 96]} />
      <shaderMaterial
        vertexShader={orbVertexShader}
        fragmentShader={orbFragmentShader}
        uniforms={uniforms}
        transparent depthWrite={false}
        side={THREE.FrontSide} blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ──────── ORBITAL RINGS (5 rings) ──────── */
function OrbitalRings() {
  const rings = useRef<THREE.Group>(null);
  const ringMeshes = useRef<THREE.Mesh[]>([]);

  const ringConfigs = useMemo(() => [
    { radius: 2.3, tube: 0.007, rot: [Math.PI / 3, 0, 0], speed: 0.13, color: "#00D4FF", opacity: 0.45 },
    { radius: 3.1, tube: 0.005, rot: [0, Math.PI / 4, Math.PI / 6], speed: -0.08, color: "#8B5CF6", opacity: 0.3 },
    { radius: 1.7, tube: 0.006, rot: [Math.PI / 2, Math.PI / 3, 0], speed: 0.2, color: "#0EA5E9", opacity: 0.35 },
    { radius: 4.0, tube: 0.004, rot: [Math.PI / 5, Math.PI / 2, Math.PI / 4], speed: 0.05, color: "#A855F7", opacity: 0.2 },
    { radius: 2.7, tube: 0.005, rot: [Math.PI / 2.5, 0, Math.PI / 3], speed: -0.11, color: "#06B6D4", opacity: 0.25 },
  ], []);

  useFrame(({ clock }) => {
    ringMeshes.current.forEach((ring, i) => {
      if (!ring) return;
      const speed = ringConfigs[i].speed;
      ring.rotation.z = clock.elapsedTime * speed;
    });
  });

  return (
    <group ref={rings}>
      {ringConfigs.map((cfg, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringMeshes.current[i] = el; }}
          rotation={cfg.rot as [number, number, number]}
        >
          <torusGeometry args={[cfg.radius, cfg.tube, 8, 256]} />
          <meshBasicMaterial
            color={cfg.color}
            transparent
            opacity={cfg.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ──────── NEBULA GLOW VOLUMES ──────── */
function NebulaVolumes() {
  const meshes = useRef<THREE.Mesh[]>([]);

  const clouds = useMemo(() => [
    { pos: [-3.5, 1.2, -3], color: "#0EA5E9", size: 3.5, opacity: 0.025 },
    { pos: [3.5, -1.0, -4], color: "#8B5CF6", size: 3.0, opacity: 0.03 },
    { pos: [0, 2.5, -5], color: "#00D4FF", size: 2.5, opacity: 0.02 },
    { pos: [-2.5, -2.5, -2], color: "#A855F7", size: 2.8, opacity: 0.025 },
    { pos: [4, 2, -3], color: "#06B6D4", size: 2.2, opacity: 0.02 },
  ], []);

  useFrame(({ clock }) => {
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = clouds[i].opacity * (0.7 + Math.sin(clock.elapsedTime * 0.3 + i) * 0.3);
    });
  });

  return (
    <>
      {clouds.map((cloud, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) meshes.current[i] = el; }}
          position={cloud.pos as [number, number, number]}
        >
          <sphereGeometry args={[cloud.size, 8, 8]} />
          <meshBasicMaterial
            color={cloud.color}
            transparent
            opacity={cloud.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>
      ))}
    </>
  );
}

/* ──────── ENERGY CORE (inner glow) ──────── */
function EnergyCore() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.08 + Math.sin(clock.elapsedTime * 1.2) * 0.04;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshBasicMaterial
        color="#00D4FF"
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ──────── CAMERA RIG ──────── */
function CameraRig() {
  const { camera } = useThree();
  const mouse = useMousePosition();

  useFrame(() => {
    const targetX = mouse.normalizedX * 0.5;
    const targetY = mouse.normalizedY * 0.25 + 0.2;
    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (targetY - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ──────── SCENE ──────── */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0.2, 5.5], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <ambientLight intensity={0.05} />
        <NebulaVolumes />
        <StarField count={2500} />
        <NebulaParticles count={1800} />
        <EnergyCore />
        <HoloOrb />
        <OrbitalRings />
        <CameraRig />
      </Canvas>
    </div>
  );
}
