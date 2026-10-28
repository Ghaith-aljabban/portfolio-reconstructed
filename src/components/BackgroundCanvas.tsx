"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
precision highp float; 
varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouseBlob;

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

vec3 palette(float t) {
    return vec3(0.55, 0.45, 0.60) + vec3(0.45, 0.35, 0.40) * cos(6.28318 * (vec3(1.0, 1.0, 1.0) * t + vec3(0.15, 0.45, 0.75)));
}

float field(vec2 p) {
    float k = 0.75;
    float t = uTime * 0.45;
    
    vec2 toMouse = p - uMouseBlob;
    float mouseDist = length(toMouse);
    p += normalize(toMouse + 0.001) * (exp(-mouseDist * 2.5) * 0.4);
    
    vec2 warp;
    warp.x = sin(p.y * 2.4 + t) * cos(p.x * 1.8 - t);
    warp.y = cos(p.x * 2.0 + t) * sin(p.y * 1.6 + t);
    vec2 warpedP = p + warp * 0.3;
    
    vec2 b1 = vec2(sin(uTime * 0.35) * 0.70, cos(uTime * 0.42) * 0.50) + vec2(0.0, 0.1);
    vec2 b2 = vec2(cos(uTime * -0.28 + 1.2) * 0.75, sin(uTime * 0.32 + 0.6) * 0.55) + vec2(-0.1, -0.1);
    
    float d = length(warpedP - b1) - 0.55;
    d = smin(d, length(warpedP - b2) - 0.50, k);
    
    return d;
}

void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    p.x *= uResolution.x / uResolution.y;
    
    float d = field(p);

    vec2 e = vec2(0.003, 0.0);
    vec3 normal = normalize(vec3(field(p + e.xy) - field(p - e.xy), field(p + e.yx) - field(p - e.yx), 0.14));

    float skyMix = clamp(normal.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 env = mix(vec3(0.015, 0.012, 0.022), vec3(0.98, 0.96, 1.0), pow(skyMix, 1.4));
    
    vec3 tint = palette(atan(normal.y, normal.x) * 0.15915 + uTime * 0.045 + normal.z * 0.25);
    env = mix(env, tint, 0.65);
    
    float fresnel = pow(1.0 - clamp(normal.z, 0.0, 1.0), 3.0);
    vec3 liquidColor = mix(vec3(0.015, 0.012, 0.022), env, 0.15 + 0.85 * fresnel);

    float spec = pow(max(dot(normal, normalize(vec3(0.4, 0.6, 0.5))), 0.0), 120.0) * 1.6;
    vec3 finalLiquid = liquidColor + spec * vec3(0.97, 0.96, 1.0);

    float edge = smoothstep(0.001, -0.001, d);
    float halo = exp(-max(d, 0.0) * 3.5) * 0.35;
    
    float wideGlow = exp(-max(d, 0.0) * 0.8) * 0.12;
    vec3 finalColor = finalLiquid * edge + (tint * halo) + (palette(uTime * 0.02) * wideGlow);
    
    float alpha = clamp(edge + halo * 1.4 + wideGlow, 0.04, 1.0);
    
    gl_FragColor = vec4(finalColor, alpha);
}
`;

function FluidMesh() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      const aspect = window.innerWidth / window.innerHeight;
      targetMouse.current.set((x - 0.5) * 2 * aspect, (y - 0.5) * 2);
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uTime: { value: 0 },
      uMouseBlob: { value: currentMouse.current },
    }),
    []
  );

  useFrame((state) => {
    if (!document.hidden) {
      currentMouse.current.lerp(targetMouse.current, 0.07);
      if (matRef.current) {
        matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        matRef.current.uniforms.uResolution.value.set(size.width, size.height);
      }
    }
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function BackgroundCanvas() {
  return (
    <Canvas
      orthographic
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      className="!absolute inset-0 pointer-events-none"
    >
      <FluidMesh />
    </Canvas>
  );
}
