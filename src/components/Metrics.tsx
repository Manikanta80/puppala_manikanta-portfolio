import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { viewportOnce } from '../lib/motion'
import { WaterDistortion } from './WaterDistortion'

const metricsData = [
  { value: 18, unit: '', label: 'Months — Wipro Experience', description: 'Associate Data Operations & Analytics' },
  { value: 80000, unit: '+', label: 'Google Ads Reviewed Monthly', description: 'Content review team accuracy' },
  { value: 98, unit: '%', label: 'Review Accuracy', description: 'Quality standard maintained' },
  { value: 100, unit: '%', label: 'SLA Compliance', description: 'On-time delivery commitment' },
  { value: 15, unit: '%', label: 'Faster Reporting Turnaround', description: 'Excel automation efficiency' },
]

export const Metrics = () => {
  const [visibleMetrics, setVisibleMetrics] = useState<Set<number>>(new Set())
  const [counts, setCounts] = useState<number[]>(metricsData.map(() => 0))
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const index = parseInt(target.dataset.index || '0')
            setVisibleMetrics((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    )

    return () => observerRef.current?.disconnect()
  }, [])

  // Animate counts when metrics become visible
  useEffect(() => {
    visibleMetrics.forEach((index) => {
      const target = metricsData[index].value
      const duration = 1500
      let start: number | null = null

      const animate = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCounts((prev) => {
          const next = [...prev]
          next[index] = Math.floor(target * eased)
          return next
        })
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    })
  }, [visibleMetrics])

  return (
    <section
      id="metrics"
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden z-20 py-24"
    >
      <div className="absolute inset-0 z-0 bg-deep-ocean/80 backdrop-blur-sm" />
      <WaterDistortion intensity={0.01} speed={0.2} id="water-distortion-metrics" />

      {/* Ambient underwater glows */}
      <div className="ambient-glow glow-cyan" aria-hidden="true" />
      <div className="ambient-glow glow-aqua" aria-hidden="true" />

      {/* Liquid morphing blobs */}
      <div className="liquid-blob liquid-blob-1" aria-hidden="true" />
      <div className="liquid-blob liquid-blob-3" aria-hidden="true" />

      {/* Caustic light projections */}
      <div className="caustic-projection" aria-hidden="true" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-aqua/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              x: [`${(Math.random() - 0.5) * 90}vw`, `${(Math.random() - 0.5) * 90}vw`],
              y: [`${Math.random() * 90}vh`, `${Math.random() * 90}vh`],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full water-distorted">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-display text-gradient-electric mb-4">
            Key Metrics
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Quantifiable impact from data operations and analytics work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metricsData.map((metric, index) => (
            <motion.div
              key={index}
              className="p-8 flex flex-col items-center text-center h-full metric-card-premium"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >

              <div
                ref={(el) => {
                  if (el && observerRef.current) observerRef.current.observe(el)
                }}
                data-index={index}
                className="w-full mb-4"
              >
                <motion.span
                  className="text-5xl lg:text-7xl font-display text-gradient-aqua font-bold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: visibleMetrics.has(index) ? 1 : 0,
                    scale: visibleMetrics.has(index) ? 1 : 0.8,
                  }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                >
                  {counts[index]}
                  {metric.unit}
                </motion.span>
              </div>

              <h3 className="text-base lg:text-lg font-medium text-white/90 leading-relaxed mb-2">
                {metric.label}
              </h3>
              <p className="text-xs text-white/50">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Metrics