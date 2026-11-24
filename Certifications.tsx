import { motion } from 'framer-motion'
import { LiquidGlass } from './LiquidGlass'
import { viewportOnce } from '../lib/motion'
import { certifications } from '../data/certifications'
import { WaterDistortion } from './WaterDistortion'

export const Certifications = () => (
  <section
    id="certifications"
    className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden z-20 py-24"
  >
    <div className="absolute inset-0 z-0 bg-deep-ocean/80 backdrop-blur-sm" />
    <WaterDistortion intensity={0.01} speed={0.2} id="water-distortion-certifications" />

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
          Certifications
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Industry-recognized credentials validating cloud and BI expertise
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
          >
            <LiquidGlass variant="crystal" className="p-6 h-full flex flex-col glass-depth-2" noHover>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs text-electric-cyan font-medium uppercase tracking-widest">
                    CERTIFICATION
                  </span>
                  <h3 className="text-xl font-display text-white font-bold mt-1">
                    {cert.name}
                  </h3>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-electric-cyan/10">
                  <svg className="w-7 h-7 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-white/70 mb-4">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-electric-cyan/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{cert.issuer}</span>
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-electric-cyan/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Issued: {cert.year}</span>
                </p>
              </div>

              {cert.credentialId && (
                <p className="text-[11px] text-white/40 font-mono mt-auto">
                  Credential: {cert.credentialId}
                </p>
              )}
            </LiquidGlass>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default Certifications