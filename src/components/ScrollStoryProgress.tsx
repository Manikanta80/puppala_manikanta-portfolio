import { useEffect, useRef } from 'react'

export const ScrollStoryProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const progress = progressRef.current
    if (!progress) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
        progress.style.transform = `scaleX(${Math.min(100, Math.max(0, amount)) / 100})`
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div className="story-progress-track" aria-hidden="true"><div ref={progressRef} className="story-progress-fill" /></div>
}
