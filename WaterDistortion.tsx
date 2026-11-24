import { useRef, useEffect } from 'react'
import { useReducedMotion } from '../lib/motion'

// SVG filter-based water distortion effect (CSS/SVG fallback)
// Creates an SVG filter that can be referenced via CSS filter: url(#water-distortion)
export const WaterDistortion = ({ intensity = 0.02, speed = 0.5, id = 'water-distortion' }: { intensity?: number; speed?: number; id?: string }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const reducedMotion = useReducedMotion(false)

  useEffect(() => {
    if (reducedMotion || !svgRef.current) return

    const filter = svgRef.current?.querySelector('feTurbulence')
    if (!filter) return

    let frame = 0
    const animate = () => {
      frame += 0.01 * speed
      filter.setAttribute('baseFrequency', `${intensity * 0.5 * Math.sin(frame)}, ${intensity * 0.5 * Math.cos(frame)}`)
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [intensity, speed, reducedMotion])

  // Hidden SVG that defines the filter - the filter is applied via CSS to section content
  return (
    <svg ref={svgRef} style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
      <defs>
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={`${intensity * 0.5} ${intensity * 0.5}`}
            numOctaves={3}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={`${intensity * 30}`}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default WaterDistortion