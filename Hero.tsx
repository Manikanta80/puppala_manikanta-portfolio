import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { profile } from '../data/profile'
import { useEffect, useRef } from 'react'

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const bounds = hero.getBoundingClientRect()
      hero.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
      hero.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
      hero.style.setProperty('--parallax-x', `${((event.clientX / window.innerWidth) - .5) * -7}px`)
      hero.style.setProperty('--parallax-y', `${((event.clientY / window.innerHeight) - .5) * -5}px`)
    }
    hero.addEventListener('pointermove', move, { passive: true })
    return () => hero.removeEventListener('pointermove', move)
  }, [])

  return <section id="hero" ref={heroRef} className="hero-cinematic">
    <img className="hero-cinematic-image" src="/images/portfolio-hero.png" alt="Puppala Manikanta at a desk in a futuristic tech workspace" loading="eager" />
    <div className="hero-cinematic-shade" aria-hidden="true" />
    <div className="hero-data-scan" aria-hidden="true" />
    <div className="hero-inner">
      <motion.div className="hero-glass-panel" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [.22,.8,.25,1] }}>
        <p className="hero-overline"><span /> DATA ANALYST · DATA OPERATIONS</p>
        <h1>Puppala<br /><em>Manikanta</em></h1>
        <p className="hero-role">Data Analyst <i>|</i> Python <i>|</i> SQL <i>|</i> Power BI</p>
        <p className="hero-intro">I bring a quality-first mindset from Wipro data operations to hands-on projects in analytics, automation, and AI-assisted data quality.</p>
        <div className="hero-actions">
          <a className="cta-primary" href="#projects">Explore projects <ArrowRight size={16}/></a>
          <a className="cta-secondary" href={profile.resumeUrl} download>Download resume <ArrowDown size={15}/></a>
        </div>
        <div className="hero-proof-points" aria-label="Selected verified experience metrics"><span><b>18 mo</b> Wipro experience</span><i/><span><b>80K+</b> records / month</span><i/><span><b>98%</b> review accuracy</span></div>
        <div className="hero-socials">
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn <ArrowUpRight size={13}/></a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={15}/> GitHub <ArrowUpRight size={13}/></a>
        </div>
      </motion.div>
    </div>
    <a className="hero-scroll" href="#about" aria-label="Scroll to About section"><ArrowDown size={16}/><span>SCROLL TO EXPLORE</span></a>
  </section>
}
export default Hero
