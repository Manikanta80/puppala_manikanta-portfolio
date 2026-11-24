'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../lib/motion'

// Monkey companion with realistic spring motion + live idle actions
// - smooth cursor following with gentle bounce
// - expressive idle animations (bob, sway, hop, wiggle, spin, tilt, wave, laugh, dance, sleep)
// - click triggers surprise reaction
// Image is ~72px (~7cm on a 1080p screen)

type Action = 'bob' | 'sway' | 'hop' | 'wiggle' | 'spin' | 'tilt' | 'wave' | 'laugh' | 'dance' | 'sleep' | 'point' | 'thumbs' | 'peek'

const ACTIONS: Action[] = ['bob', 'sway', 'hop', 'wiggle', 'spin', 'tilt', 'wave', 'laugh', 'dance', 'sleep', 'point', 'thumbs', 'peek']

export const MoneyFollow = () => {
  const reducedMotion = useReducedMotion(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    const el = wrapperRef.current
    if (!el) return

    // Physics state - use refs for RAF updates without React re-renders
    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    const vel = { x: 0, y: 0 }

    // Idle offset (layered on top of cursor-follow for personality)
    const idle = { x: 0, y: 0, rot: 0, scale: 1 }
    const breathe = { phase: 0 }

    // Active action state
    let actionPhase = -1
    let actionStart = 0
    let actionDur = 0
    let actionType: Action | null = null
    let flip = 1

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX - window.innerWidth / 2
      target.y = e.clientY - window.innerHeight / 2
      const desiredFlip = e.clientX < window.innerWidth / 2 ? -1 : 1
      if (flip !== desiredFlip) {
        flip = desiredFlip
      }
    }

    const onDown = () => {
      // Click = surprise hop + wiggle + quick return
      startAction('hop')
      setTimeout(() => startAction('wiggle'), 180)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onDown)

    function startAction(type: Action) {
      if (actionPhase >= 0) return // don't interrupt
      actionType = type
      actionPhase = 0
      actionStart = performance.now()
      actionDur =
        type === 'hop' ? 800 :
        type === 'dance' ? 2800 :
        type === 'sleep' ? 3500 :
        type === 'laugh' ? 1300 :
        type === 'wave' ? 1800 :
        700
    }

    let nextActionAt = performance.now() + 2000 + Math.random() * 3000
    let raf = 0
    let last = performance.now()

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      // Screen bounds
      const maxX = window.innerWidth / 2 - 40
      const maxY = window.innerHeight / 2 - 40

      // Spring physics - follows cursor with gentle momentum
      const tx = Math.max(-maxX, Math.min(maxX, target.x))
      const ty = Math.max(-maxY, Math.min(maxY, target.y))

      // Semi-implicit Euler integration
      const stiffness = 200
      const damping = 25

      vel.x += (tx - pos.x) * stiffness * dt - vel.x * damping * dt
      vel.y += (ty - pos.y) * stiffness * dt - vel.y * damping * dt
      pos.x += vel.x * dt
      pos.y += vel.y * dt

      // Bounce on edges
      if (Math.abs(pos.x) > maxX - 10) vel.x *= -0.4
      if (Math.abs(pos.y) > maxY - 10) vel.y *= -0.4

      // Decay idle offsets
      idle.x *= 0.85
      idle.y *= 0.85
      idle.rot *= 0.7

      // Schedule idle actions
      if (now >= nextActionAt && actionPhase < 0) {
        startAction(ACTIONS[Math.floor(Math.random() * ACTIONS.length)])
        nextActionAt = now + 1800 + Math.random() * 2500
      }

      // Execute active action
      if (actionPhase >= 0 && actionType) {
        const t = Math.min(1, (now - actionStart) / actionDur)
        const easeInOut = Math.sin(t * Math.PI)

        switch (actionType) {
          case 'bob': idle.y = -14 * easeInOut + -6 * Math.sin(t * Math.PI * 6); break
          case 'sway': idle.x = 16 * Math.cos(t * Math.PI * 3) * easeInOut; break
          case 'hop':
            idle.y = -42 * Math.sin(t * Math.PI * 1.3)
            idle.scale = 1 + 0.15 * Math.sin(t * Math.PI * 3)
            break
          case 'wiggle': idle.x = 10 * Math.sin(t * Math.PI * 5) * easeInOut; break
          case 'spin': idle.rot = 360 * t; break
          case 'tilt': idle.rot = 25 * Math.sin(t * Math.PI * 2.8) * easeInOut; break
          case 'wave': idle.x = -12 * Math.sin(t * Math.PI * 3.5); idle.rot = 8 * Math.cos(t * Math.PI * 4); break
          case 'laugh': idle.y = -10 * Math.sin(t * Math.PI * 3.5); idle.x = 8 * Math.sin(t * Math.PI * 2); break
          case 'dance':
            idle.y = -15 * Math.sin(t * Math.PI * 2.5)
            idle.x = 8 * Math.sin(t * Math.PI * 3.5)
            idle.scale = 1 + 0.12 * Math.sin(t * Math.PI * 6)
            break
          case 'sleep': idle.y = 4; idle.scale = 0.94; break
          case 'point': idle.x = 28 * Math.sin(t * Math.PI * 3.2); break
          case 'thumbs': idle.x = -22; idle.y = -8; break
          case 'peek': idle.scale = 1.12 + 0.08 * Math.sin(t * Math.PI * 8); break
        }
        if (t >= 1) {
          actionPhase = -1
          actionType = null
          idle.rot = 0
          idle.scale = 1
          idle.x = 0
          idle.y = 0
        }
      }

      // Gentle breathing (constant)
      breathe.phase += dt * 0.002
      const breathOffset = Math.sin(breathe.phase * Math.PI * 2) * 2

      // Final position
      const finalX = pos.x + idle.x
      const finalY = pos.y + idle.y + breathOffset

      el.style.transform = `
        translate3d(${finalX}px, ${finalY}px, 0)
        rotate(${idle.rot}deg)
        scaleX(${flip})
        scale(${idle.scale})
      `.trim()

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onDown)
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <div
      ref={wrapperRef}
      className="fixed left-1/2 top-1/2 z-[60] pointer-events-none"
      style={{
        width: 72,
        height: 72,
        marginLeft: -36,
        marginTop: -36,
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <img
        src="/images/monkey.png"
        alt="3D cartoon monkey following cursor"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          userSelect: 'none',
          display: 'block',
        }}
        draggable={false}
      />
    </div>
  )
}

export default MoneyFollow