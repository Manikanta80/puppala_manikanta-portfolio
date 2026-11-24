import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../lib/motion'
import { Menu, X } from 'lucide-react'
const links = [['about','About'],['experience','Experience'],['projects','Projects'],['skills','Skills'],['education','Education'],['contact','Contact']]
export const LiquidNavigation = () => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('about')
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    const sections = links.map(([id]) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section))
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-20% 0px -62% 0px', threshold: [0, 0.2, 0.45, 0.7] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return <nav className="site-nav" aria-label="Main navigation"><a className="nav-mark" href="#hero" onClick={() => setOpen(false)}>PM<span>.</span></a>
    <div className={`nav-links ${open ? 'nav-open' : ''}`}>{links.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={()=>{setActive(id);setOpen(false)}}><span className="nav-link-label">{label}</span>{active === id && <motion.span className="nav-active-water-segment" layoutId="nav-active-water-segment" transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 32 }} aria-hidden="true" />}</a>)}</div>
    <button className="nav-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
  </nav>
}
export default LiquidNavigation
