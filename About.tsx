import { motion } from 'framer-motion'
import LiquidGlass from './LiquidGlass'
import { WaterDistortion } from './WaterDistortion'
import { useReducedMotion } from '../lib/motion'

export const About = () => {
  const reducedMotion = useReducedMotion()
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
  }

  return (
    <section id="about" className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden z-20 py-24">
      <div className="absolute inset-0 z-[0] bg-deep-ocean/80 backdrop-blur-sm" />
      <WaterDistortion intensity={0.01} speed={0.2} id="water-distortion-about" />

      {/* Ambient underwater glows */}
      <div className="ambient-glow glow-cyan" aria-hidden="true" />
      <div className="ambient-glow glow-aqua" aria-hidden="true" />

      {/* Liquid morphing blobs */}
      <div className="liquid-blob liquid-blob-2" aria-hidden="true" />
      <div className="liquid-blob liquid-blob-3" aria-hidden="true" />

      {/* Caustic light projections */}
      <div className="caustic-projection" aria-hidden="true" />

      <div className="about-layout about-layout-single mx-auto px-6 z-10 relative water-distorted">
        <LiquidGlass variant="crystal" className="about-story p-8 md:p-12" noHover>
          <motion.div className="about-story-content" variants={variants} initial={reducedMotion ? false : 'hidden'} whileInView={reducedMotion ? undefined : 'visible'} viewport={{ once: true, amount: 0.25 }}>
            <div className="flex-1">
              <motion.h2
                className="text-4xl lg:text-6xl font-display text-gradient-electric mb-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.4 } },
                }}
              >
                About Me
              </motion.h2>

              <motion.p
                className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.6 } },
                }}
              >
                I am Puppala Manikanta, a Computer Science graduate with professional experience in large-scale data operations, quality analysis and reporting at Wipro. My experience working on the Google Ads review team strengthened my attention to detail, quality-focused decision-making, data validation and operational problem-solving. I am now expanding my capabilities through independent projects in Python, SQL, business intelligence, machine learning and AI-assisted data quality automation.
              </motion.p>

              <motion.p
                className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.8 } },
                }}
              >
                I enjoy building practical systems that turn raw information into trustworthy insights. My approach combines rigorous data validation with creative visualization to deliver actionable intelligence.
              </motion.p>
            </div>
          </motion.div>
        </LiquidGlass>
      </div>
    </section>
  )
}

About.displayName = 'About'

export default About
