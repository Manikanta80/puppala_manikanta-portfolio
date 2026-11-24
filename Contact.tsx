import { ArrowDown, ArrowUpRight, Copy, Github, Linkedin, Mail } from 'lucide-react'
import { useState } from 'react'
import { profile } from '../data/profile'

export const Contact = () => {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return <section id="contact" className="portfolio-section contact-section">
  <div className="contact-panel"><p className="eyebrow">CONTACT</p><h2>Let’s make data<br /><span>work harder.</span></h2><p>For opportunities in data analytics, data operations, data quality, or Python and SQL development, reach out directly.</p>
    <div className="contact-links"><a href={`mailto:${profile.email}`}><Mail size={18}/> {profile.email} <ArrowUpRight size={16}/></a><button type="button" onClick={copyEmail} aria-live="polite"><Copy size={16}/>{copied ? 'Email copied' : 'Copy email'}</button><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn <ArrowUpRight size={16}/></a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub <ArrowUpRight size={16}/></a><a href={profile.resumeUrl} download><ArrowDown size={17}/> Download resume</a></div>
  </div>
</section>
}
export default Contact
