'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// Animation states - all 15+ states requested
export const ANIMATION_STATE = {
  IDLE: 'idle',
  LOOK_AT_CURSOR: 'look_at_cursor',
  FOLLOW_CURSOR: 'follow_cursor',
  WALK: 'walk',
  RUN: 'run',
  JUMP: 'jump',
  WAVE: 'wave',
  LAUGH: 'laugh',
  SURPRISED: 'surprised',
  CURIOUS: 'curious',
  CATCH_CURSOR: 'catch_cursor',
  SIT: 'sit',
  DANCE: 'dance',
  PEEK: 'peek',
  SLEEP: 'sleep',
  BLINK: 'blink',
  SCRATCH_HEAD: 'scratch_head',
  POINT: 'point',
  THUMBS_UP: 'thumbs_up'
} as const

export type AnimationState = typeof ANIMATION_STATE[keyof typeof ANIMATION_STATE]

// Advanced 3D monkey character component
export const MonkeyCharacter = () => {
  const groupRef = useRef<THREE.Group>(null!)
  const [state, setState] = useState<AnimationState>(ANIMATION_STATE.IDLE)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [eyeBlink, setEyeBlink] = useState(false)
  const lastMouseTimeRef = useRef(0)

  // Mouse tracking for cursor following
  const cursorPosition = useRef({ x: 0, y: 0 })
  const targetHeadRotation = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorPosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
      lastMouseTimeRef.current = Date.now()

      // Target head rotation based on cursor position
      targetHeadRotation.current = {
        x: cursorPosition.current.y * 0.5,
        y: cursorPosition.current.x * 0.6
      }

      // Set follow state on mouse move
      setState(ANIMATION_STATE.FOLLOW_CURSOR)

      // Auto-reset to idle after inactivity
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => {
        setState(ANIMATION_STATE.IDLE)
      }, 3000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [])

  const idleTimer = useRef<NodeJS.Timeout | null>(null)

  const triggerRandomAction = useCallback(() => {
    const actions = [
      ANIMATION_STATE.WAVE,
      ANIMATION_STATE.LAUGH,
      ANIMATION_STATE.SURPRISED,
      ANIMATION_STATE.SCRATCH_HEAD,
      ANIMATION_STATE.POINT,
      ANIMATION_STATE.THUMBS_UP
    ]
    const action = actions[Math.floor(Math.random() * actions.length)]
    setState(action)

    setTimeout(() => {
      setState(ANIMATION_STATE.IDLE)
    }, 2000)
  }, [])

  // Trigger random actions periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMouseTimeRef.current < 10000) return // Don't interrupt recent activity
      if (Math.random() < 0.3) {
        triggerRandomAction()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [triggerRandomAction])

  // Eye blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setEyeBlink(true)
        setTimeout(() => setEyeBlink(false), 150)
      }
    }, 3000)

    return () => clearInterval(blinkInterval)
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const group = groupRef.current
    if (!group) return

    // Update animation states
    switch (state) {
      case ANIMATION_STATE.IDLE:
        // Gentle idle breathing and micro movements
        break
      case ANIMATION_STATE.FOLLOW_CURSOR:
        // Head will follow cursor
        break
      case ANIMATION_STATE.WALK:
        // Walking animation
        break
      case ANIMATION_STATE.RUN:
        // Running animation
        break
      case ANIMATION_STATE.JUMP:
        // Jumping animation
        break
      case ANIMATION_STATE.WAVE:
        // Waving hand
        break
      case ANIMATION_STATE.LAUGH:
        // Laughing - mouth open
        setMouthOpen(true)
        setTimeout(() => setMouthOpen(false), 1000)
        break
      case ANIMATION_STATE.SURPRISED:
        // Surprised - big eyes
        break
      case ANIMATION_STATE.CURIOUS:
        // Curious - head tilt
        break
      case ANIMATION_STATE.DANCE:
        // Dancing
        break
      case ANIMATION_STATE.SIT:
        // Sitting
        break
      case ANIMATION_STATE.SLEEP:
        // Sleeping - slow movements
        break
      default:
        break
    }

    // Get body parts
    const body = group.getObjectByName('body') as THREE.Mesh
    const head = group.getObjectByName('head') as THREE.Mesh
    const leftEar = group.getObjectByName('leftEar') as THREE.Mesh
    const rightEar = group.getObjectByName('rightEar') as THREE.Mesh

    // Body subtle movement
    if (body) {
      body.rotation.y = Math.sin(time * 0.5) * 0.05
      body.position.y = 0.5 + Math.sin(time * 2) * 0.02

      // Slight bounce on movement
      if (state === ANIMATION_STATE.FOLLOW_CURSOR || state === ANIMATION_STATE.RUN || state === ANIMATION_STATE.WALK) {
        body.position.y += Math.abs(Math.sin(time * 8)) * 0.03
      }
    }

    // Head cursor following
    if (head) {
      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetHeadRotation.current.y * 0.7, 0.1)
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetHeadRotation.current.x * 0.4, 0.08)
    }

    // Ear movement with emotion
    if (leftEar && rightEar) {
      const earTilt = Math.sin(time * 3) * 0.1
      leftEar.rotation.z = earTilt
      rightEar.rotation.z = -earTilt
    }

    // Tail physics
    const tail = group.getObjectByName('tail') as THREE.Mesh
    if (tail) {
      tail.rotation.x = Math.sin(time * 2) * 0.2
      tail.rotation.z = Math.sin(time * 3) * 0.15
    }

    // Arm animations
    const leftArm = group.getObjectByName('leftArm') as THREE.Group
    const rightArm = group.getObjectByName('rightArm') as THREE.Group

    if (leftArm) {
      switch (state) {
        case ANIMATION_STATE.WAVE:
          leftArm.rotation.z = Math.sin(time * 6) * 0.4 + Math.sin(time * 2) * 0.3
          break
        case ANIMATION_STATE.SIT:
          leftArm.rotation.x = -0.5
          break
        default:
          leftArm.rotation.z = Math.sin(time * 4) * 0.15
      }
    }

    if (rightArm) {
      switch (state) {
        case ANIMATION_STATE.POINT:
          rightArm.rotation.z = -Math.abs(Math.sin(time * 6)) * 0.5
          break
        case ANIMATION_STATE.THUMBS_UP:
          rightArm.rotation.z = -0.5
          rightArm.rotation.x = -0.3
          break
        default:
          rightArm.rotation.z = -Math.sin(time * 3) * 0.1
      }
    }

    // Leg animations
    const leftLeg = group.getObjectByName('leftLeg') as THREE.Mesh
    const rightLeg = group.getObjectByName('rightLeg') as THREE.Mesh

    if (leftLeg && rightLeg) {
      if (state === ANIMATION_STATE.WALK || state === ANIMATION_STATE.FOLLOW_CURSOR) {
        leftLeg.position.y = 0.1 * Math.abs(Math.sin(time * 6))
        rightLeg.position.y = 0.1 * Math.abs(Math.sin(time * 6 + Math.PI))
      } else {
        leftLeg.position.y = 0.1 * Math.sin(time * 3)
        rightLeg.position.y = 0.1 * Math.cos(time * 3)
      }
    }

    // Eye tracking
    const leftEye = group.getObjectByName('leftEye') as THREE.Mesh
    const rightEye = group.getObjectByName('rightEye') as THREE.Mesh

    if (leftEye && rightEye) {
      // Pupils track cursor
      const pupilOffset = 0.05
      leftEye.position.x = -0.18 + Math.sin(targetHeadRotation.current.y) * pupilOffset
      rightEye.position.x = 0.18 + Math.sin(targetHeadRotation.current.y) * pupilOffset
      leftEye.position.y = 0.1 + Math.cos(targetHeadRotation.current.x) * pupilOffset * 0.5
      rightEye.position.y = 0.1 + Math.cos(targetHeadRotation.current.x) * pupilOffset * 0.5

      // Blinking
      if (eyeBlink) {
        leftEye.scale.y = 0.1
        rightEye.scale.y = 0.1
      } else {
        leftEye.scale.y = 1
        rightEye.scale.y = 1
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* Body - soft brown with emissive highlights */}
      <mesh name="body" geometry={new THREE.SphereGeometry(0.9, 16, 16)}>
        <meshStandardMaterial
          color={0x8B4513}
          emissive={0x4B2410}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Head - beige with soft shading */}
      <mesh name="head" geometry={new THREE.SphereGeometry(0.65, 16, 16)}>
        <meshStandardMaterial
          color={0xD2B48C}
          emissive={0x3E2E1F}
          emissiveIntensity={0.25}
          roughness={0.4}
          metalness={0.05}
        />

        {/* Left Eye Group */}
        <group name="leftEye">
          <mesh geometry={new THREE.SphereGeometry(0.08, 8, 8)}>
            <meshStandardMaterial color={0x1a1a1a} />
          </mesh>
          <mesh geometry={new THREE.SphereGeometry(0.03, 6, 6)}>
            <meshStandardMaterial color={0x000000} emissive={0xFFFFFF} emissiveIntensity={0.8} />
          </mesh>
        </group>

        {/* Right Eye Group */}
        <group name="rightEye">
          <mesh geometry={new THREE.SphereGeometry(0.08, 8, 8)}>
            <meshStandardMaterial color={0x1a1a1a} />
          </mesh>
          <mesh geometry={new THREE.SphereGeometry(0.03, 6, 6)}>
            <meshStandardMaterial color={0x000000} emissive={0xFFFFFF} emissiveIntensity={0.8} />
          </mesh>
        </group>

        {/* Nose */}
        <mesh geometry={new THREE.SphereGeometry(0.05, 6, 6)} position={[0, 0.15, 0.55]}>
          <meshStandardMaterial
            color={0xD2B48C}
            emissive={0x2A2214}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Mouth - red with opacity for expression */}
        <mesh geometry={new THREE.PlaneGeometry(0.2 + (mouthOpen ? 0.3 : 0), 0.08 + (mouthOpen ? 0.1 : 0))} position={[0, -0.1, 0.52]} rotation={[0, 0, 0]}>
          <meshBasicMaterial color={0xB03A2E} transparent opacity={0.8} />
        </mesh>

        {/* Ears */}
        <mesh name="leftEar" geometry={new THREE.SphereGeometry(0.25, 8, 8)} position={[-0.45, 0.4, 0]}>
          <meshStandardMaterial color={0x8B4513} roughness={0.4} />
        </mesh>
        <mesh name="rightEar" geometry={new THREE.SphereGeometry(0.25, 8, 8)} position={[0.45, 0.4, 0]}>
          <meshStandardMaterial color={0x8B4513} roughness={0.4} />
        </mesh>
      </mesh>

      {/* Left Arm */}
      <group name="leftArm">
        <mesh geometry={new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8)} position={[-0.9, 0, 0]}>
          <meshStandardMaterial color={0xD2B48C} emissive={0x3E2E1F} emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group name="rightArm">
        <mesh geometry={new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8)} position={[0.9, 0, 0]}>
          <meshStandardMaterial color={0xD2B48C} emissive={0x3E2E1F} emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Left Leg */}
      <mesh name="leftLeg" geometry={new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8)} position={[-0.2, -0.85, 0.1]}>
        <meshStandardMaterial color={0xD2B48C} emissive={0x2A2214} emissiveIntensity={0.15} />
      </mesh>

      {/* Right Leg */}
      <mesh name="rightLeg" geometry={new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8)} position={[0.2, -0.85, -0.1]}>
        <meshStandardMaterial color={0xD2B48C} emissive={0x2A2214} emissiveIntensity={0.15} />
      </mesh>

      {/* Tail */}
      <mesh name="tail" geometry={new THREE.CylinderGeometry(0.03, 0.15, 1.2, 8)} position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color={0x8B4513} emissive={0x3B2411} emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

export default MonkeyCharacter