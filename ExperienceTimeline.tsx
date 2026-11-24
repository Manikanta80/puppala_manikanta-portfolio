import { motion } from 'framer-motion'
import { experience } from '../data/experience'
import { WaterDistortion } from './WaterDistortion'

export const ExperienceTimeline = () => {
  return (
    <section id="experience" className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden z-20 py-24">
      <div className="absolute inset-0 z-[1] bg-deep-ocean/80 backdrop-blur-sm" />
      <WaterDistortion intensity={0.01} speed={0.2} id="water-distortion-experience" />

      {/* Ambient underwater glows */}
      <div className="ambient-glow glow-cyan" aria-hidden="true" />
      <div className="ambient-glow glow-aqua" aria-hidden="true" />

      {/* Liquid morphing blobs */}
      <div className="liquid-blob liquid-blob-1" aria-hidden="true" />
      <div className="liquid-blob liquid-blob-2" aria-hidden="true" />

      {/* Caustic light projections */}
      <div className="caustic-projection" aria-hidden="true" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-electric-cyan/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
              x: [`${(Math.random() - 0.5) * 60}vw`, `${(Math.random() - 0.5) * 60}vw`],
              y: [`${Math.random() * 60}vh`, `${Math.random() * 60}vh`],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              delay: Math.random() * 5,
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

      <div className="max-w-4xl mx-auto px-6 z-10 relative w-full water-distorted">
        <h2 className="text-4xl lg:text-6xl font-display text-gradient-electric mb-16 text-center">
          Experience
        </h2>

        <div className="relative">
          {experience.map((job, index) => (
            <motion.div
              key={index}
              className="relative pl-12 pb-12 border-l-2 border-gradient-to-b from-electric-cyan via-aqua to-ice-blue"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-br from-electric-cyan to-aqua shadow-[0_0_20px_rgba(0,217,255,1)]" />

              <div className="glass-depth-2 p-6 shadow-xl">
                <h3 className="text-xl lg:text-2xl font-display text-gradient-electric mb-1">
                  {job.position}
                </h3>
                <p className="text-sm text-electric-cyan font-medium mb-1">
                  {job.company} · {job.team}
                </p>
                <p className="text-xs text-white/50 mb-4">{job.duration} of experience</p>
                <div className="experience-metrics">
                  {[['80K+','records reviewed monthly'],['~98%','accuracy'],['100%','SLA compliance'],['50K+','records audited per cycle'],['~15%','faster reporting turnaround']].map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}
                </div>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/80 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan mt-1.5 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceTimeline
