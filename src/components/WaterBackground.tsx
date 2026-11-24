'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, Suspense, useEffect, useState } from 'react'
import { useReducedMotion } from '../lib/motion'

const SWIMMING_PATHS: THREE.Vector3[] = [
  new THREE.Vector3(-40, 1, -30),
  new THREE.Vector3(-25, 2.5, -15),
  new THREE.Vector3(-10, 0.5, 0),
  new THREE.Vector3(0, 1.5, 10),
  new THREE.Vector3(15, 0.8, 20),
  new THREE.Vector3(30, 2, 5),
  new THREE.Vector3(40, 1, -10),
  new THREE.Vector3(35, 2.5, -25),
  new THREE.Vector3(20, 0.5, -35),
  new THREE.Vector3(5, 1.5, -20),
]

// Premium color palette for fish variations
const FISH_COLORS = [
  0x00d9ff, // electric cyan
  0x42f5e5, // aqua
  0x00c2ff, // lighter cyan
  0x6ae8ff, // ice blue tint
]

const waterVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uMouseX;
  uniform float uMouseY;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    float wave1 = snoise(vec3(position.x * 0.5, position.z * 0.5, uTime * 0.3)) * 0.15;
    float wave2 = snoise(vec3(position.x * 1.2 + uTime * 0.2, position.z * 1.2 - uTime * 0.15, uTime * 0.5)) * 0.08;
    float wave3 = snoise(vec3(position.x * 2.5 - uTime * 0.1, position.z * 2.5 + uTime * 0.1, uTime * 0.8)) * 0.03;
    float dist = distance(vec2(position.x, position.z), vec2(uMouseX, uMouseY));
    float mouseRipple = sin(dist * 15.0 - uTime * 8.0) * exp(-dist * 3.0) * 0.1;
    float totalDisplacement = wave1 + wave2 + wave3 + mouseRipple;
    vec3 newPosition = position + normal * totalDisplacement;
    vPosition = newPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const waterFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uColorDeep;
  uniform vec3 uColorMid;
  uniform vec3 uColorShallow;
  uniform vec3 uColorGlow;
  uniform vec3 uCausticColor;
  uniform float uFresnelPower;
  uniform vec3 uViewPosition;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 viewDir = normalize(uViewPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), uFresnelPower);
    float depth = clamp((vPosition.y + 2.0) / 4.0, 0.0, 1.0);
    vec3 baseColor = mix(uColorDeep, uColorMid, depth);
    baseColor = mix(baseColor, uColorShallow, pow(depth, 0.5));
    vec2 causticUv = vUv * 10.0 + vec2(uTime * 0.05, uTime * 0.03);
    float caustic1 = snoise(vec3(causticUv, uTime * 0.2)) * 0.5 + 0.5;
    float caustic2 = snoise(vec3(causticUv * 2.0, uTime * 0.3)) * 0.5 + 0.5;
    float caustics = caustic1 * caustic2;
    caustics = smoothstep(0.4, 0.8, caustics) * 0.3;
    float scatter = pow(1.0 - depth, 2.0) * 0.4;
    vec3 specular = vec3(1.0) * pow(fresnel, 3.0) * 0.6;
    vec3 color = baseColor;
    color += uCausticColor * caustics;
    color += uColorGlow * scatter;
    color += specular;
    float foam = smoothstep(0.7, 1.0, depth + sin(vPosition.x * 5.0 + uTime) * 0.1);
    color = mix(color, vec3(1.0, 1.0, 1.0) * 0.3, foam * 0.2);
    float alpha = mix(0.15, 0.4, fresnel) * (0.5 + depth * 0.5);
    gl_FragColor = vec4(color, alpha);
  }
`

interface FloatFish {
  id: number
  position: THREE.Vector3
  phase: number
  size: number
  targetIndex: number
  pathProgress: number
}

// Fish component with color cycling
const FishSwimmer = ({ colorIndex }: { colorIndex: number }) => {
  const groupRef = useRef<THREE.Group>(null!)
  const fishRef = useRef<THREE.Mesh>(null!)
  const fishDataRef = useRef<FloatFish>({
    id: colorIndex,
    position: SWIMMING_PATHS[colorIndex % SWIMMING_PATHS.length].clone(),
    phase: colorIndex,
    size: 0.8 + 0.2 * (colorIndex % 2),
    targetIndex: (colorIndex + 1) % SWIMMING_PATHS.length,
    pathProgress: 0,
  })

  const fishGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-0.6, 0)
    shape.lineTo(0.4, 0.3)
    shape.lineTo(0.8, 0.1)
    shape.lineTo(0.4, -0.1)
    shape.lineTo(-0.6, 0)
    shape.lineTo(0.4, -0.3)
    shape.lineTo(0.6, 0)
    shape.lineTo(0.4, 0.3)
    return new THREE.ExtrudeGeometry(shape, { depth: 0.15, bevelEnabled: false })
  }, [])

  useFrame(({ clock }) => {
    if (!fishRef.current) return
    const time = clock.getElapsedTime()
    const fish = fishDataRef.current
    const mesh = fishRef.current
    const material = mesh.material as THREE.MeshStandardMaterial

    const currentPathPos = SWIMMING_PATHS[fish.targetIndex]
    const nextPathPos = SWIMMING_PATHS[(fish.targetIndex + 1) % SWIMMING_PATHS.length]

    if (fish.pathProgress < 1) {
      fish.pathProgress += 0.015
      const progress = 1 - Math.cos(fish.pathProgress * Math.PI) / 2
      const targetPos = new THREE.Vector3().lerpVectors(currentPathPos, nextPathPos, progress * 0.7)
      fish.position.lerp(targetPos, 0.05)
      fish.position.y += Math.sin(time + fish.phase) * 0.25
      fish.phase += 16 * 0.016
      mesh.rotation.z = Math.sin(time * 8 + fish.phase) * 0.15
      const direction = new THREE.Vector3().subVectors(nextPathPos, currentPathPos)
      const targetRot = Math.atan2(direction.x, direction.z)
      mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetRot, 0.1)
    } else {
      fish.pathProgress = 0
      fish.targetIndex = (fish.targetIndex + 1) % SWIMMING_PATHS.length
    }

    mesh.position.copy(fish.position)
    mesh.scale.setScalar(fish.size + Math.sin(time) * 0.02)

    // Color cycling with emissive glow
    if (material) {
      const paletteIndex = colorIndex % FISH_COLORS.length
      const baseColor = FISH_COLORS[paletteIndex]
      material.color.setHex(baseColor)
      material.emissive.setHex(baseColor)
      material.emissive.multiplyScalar(0.7 + Math.sin(time * 0.5 + colorIndex) * 0.3)
    }
  })

  const defaultMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x00d9ff,
      emissive: new THREE.Color(0x00d9ff).multiplyScalar(0.7),
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [])

  return (
    <group ref={groupRef}>
      <mesh ref={fishRef} geometry={fishGeometry} material={defaultMaterial} frustumCulled={false} />
    </group>
  )
}

const WaterMesh = ({ mouseX, mouseY, time }: { mouseX: number; mouseY: number; time: number }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time
      materialRef.current.uniforms.uMouseX.value = mouseX
      materialRef.current.uniforms.uMouseY.value = mouseY
      materialRef.current.uniforms.uViewPosition.value = state.camera.position
    }
  })

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouseX: { value: 0 },
    uMouseY: { value: 0 },
    uColorDeep: { value: new THREE.Color(0x030914) },
    uColorMid: { value: new THREE.Color(0x003344) },
    uColorShallow: { value: new THREE.Color(0x006677) },
    uColorGlow: { value: new THREE.Color(0x00d9ff) },
    uCausticColor: { value: new THREE.Color(0x42f5e5) },
    uFresnelPower: { value: 3.5 },
    uViewPosition: { value: new THREE.Vector3() },
  }), [])

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2} position-y={-1.5}>
      <planeGeometry args={[100, 100, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

const Particles = ({ count = 1500 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 80
      arr[i * 3 + 1] = Math.random() * 5 + 0.5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation
        transparent
        opacity={0.3}
        color={0x00d9ff}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

const WaterScene = () => {
  const { pointer } = useThree()
  const mouseX = pointer.x * 40
  const mouseY = -pointer.y * 40
  const time = Date.now() * 0.001

  return (
    <>
      <color attach="background" args={['#030914']} />
      <fog attach="scene" args={['#030914', 10, 80]} />

      <ambientLight color="#002233" intensity={0.3} />
      <directionalLight position={[20, 30, 20]} color="#00d9ff" intensity={0.5} />
      <pointLight position={[0, 10, 0]} color="#00d9ff" intensity={2} decay={2} distance={50} />

      {/* Multiple fish with color variations */}
      {[0, 1, 2, 3].map((i) => (
        <FishSwimmer key={i} colorIndex={i + 1} />
      ))}

      <WaterMesh mouseX={mouseX} mouseY={mouseY} time={time} />
      <Particles count={1500} />
    </>
  )
}

export const WaterBackground = () => {
  const reducedMotion = useReducedMotion(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (reducedMotion || !mounted) return null

  return (
    <div className="fixed inset-0 -z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 15, 25], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        onCreated={({ gl }) => { gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)) }}
      >
        <Suspense fallback={null}>
          <WaterScene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default WaterBackground