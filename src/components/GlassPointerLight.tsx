import { useEffect, useRef } from 'react'

export const GlassPointerLight = () => {
  const lightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const light = lightRef.current
    if (!light || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        light.style.setProperty('--light-x', `${event.clientX}px`)
        light.style.setProperty('--light-y', `${event.clientY}px`)
        light.classList.add('cursor-light-visible')
      })
    }
    const leave = () => light.classList.remove('cursor-light-visible')
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <div ref={lightRef} className="cursor-glass-light" aria-hidden="true" />
}
