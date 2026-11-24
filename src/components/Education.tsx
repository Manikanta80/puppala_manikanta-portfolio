import { motion } from 'framer-motion'
import LiquidGlass from './LiquidGlass'
import { viewportOnce } from '../lib/motion'
import { WaterDistortion } from './WaterDistortion'

export const Education = () => (
  <section
    id="education"
    className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden z-20 py-24"
  >
    <div className="absolute inset-0 z-0 bg-deep-ocean/80 backdrop-blur-sm" />
    <WaterDistortion intensity={0.01} speed={0.2} id="water-distortion-education" />

    {/* Ambient underwater glows */}
    <div className="ambient-glow glow-cyan" aria-hidden="true" />
    <div className="ambient-glow glow-aqua" aria-hidden="true" />

    <div className="max-w-4xl mx-auto px-6 relative z-10 w-full water-distorted">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl lg:text-6xl font-display text-gradient-electric mb-4">
          Education
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Academic foundation in computer science and engineering
        </p>
      </motion.div>

      <LiquidGlass variant="crystal" className="p-8 md:p-12 glass-depth-1" noHover>
        <div className="relative pl-8 border-l-2 border-gradient-to-b from-electric-cyan via-aqua to-ice-blue">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-electric-cyan shadow-[0_0_16px_rgba(0,217,255,0.8)]" />
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                <h3 className="text-xl lg:text-2xl font-display text-white">
                  B.Tech in Computer Science and Engineering
                </h3>
                <span className="glass-pill px-3 py-1 text-sm font-medium text-electric-cyan">
                  2024
                </span>
              </div>
              <p className="text-electric-cyan font-medium mb-1">
                Centurion University
              </p>
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  CGPA: 8.7/10
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </LiquidGlass>
    </div>
  </section>
)

export default Education
