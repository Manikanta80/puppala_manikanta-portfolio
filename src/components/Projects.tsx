import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, Github } from 'lucide-react'
import { projects } from '../data/projects'
import { useReducedMotion } from '../lib/motion'

function InteractiveWorkflow({ project }: { project: typeof projects[number] }) {
  const [activeStep, setActiveStep] = useState(0)
  const activeFeature = project.features[Math.min(activeStep, project.features.length - 1)]
  return <div className="workflow-explorer">
    <div className="workflow" aria-label={`${project.title} workflow stages`}>
      {project.pipeline.map((step, index) => <span className="workflow-stage" key={step}>
        {index > 0 && <b aria-hidden="true">→</b>}
        <button type="button" aria-pressed={activeStep === index} className={activeStep === index ? 'is-active' : ''} onClick={() => setActiveStep(index)}>{step}</button>
      </span>)}
    </div>
    <p className="workflow-description" aria-live="polite"><strong>{project.pipeline[activeStep]}</strong><span>{activeFeature}</span></p>
  </div>
}

function ProjectArtwork({ index }: { index: number }) {
  const project = projects[index]
  const cover = ['/images/projects/dataguard-ai.svg', '/images/projects/smart-banking.svg', '/images/projects/retail-analytics.svg'][index]
  return <div className={`project-artwork artwork-${index + 1}`} role="img" aria-label={`${project.title} conceptual cover artwork, not a product screenshot`}>
    <div className="artwork-topline"><span>CONCEPTUAL COVER · NOT A PRODUCT SCREENSHOT</span><span>0{index + 1} / 03</span></div>
    <img className="project-art-image" src={cover} alt="" loading="lazy" />
  </div>
}

export const Projects = () => <section id="projects" className="portfolio-section projects-section">
  <div className="section-heading"><p className="eyebrow">SELECTED WORK <span>—</span> PERSONAL PROJECTS</p><h2>Clear thinking.<br/><em>Useful systems.</em></h2><p>Applied analytics, validation, and machine learning—built as practical project work.</p></div>
  <div className="projects-list">{projects.map((project,index)=><ProjectCard key={project.id} project={project} index={index}/>)}</div>
</section>

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)
  const reducedMotion = useReducedMotion()
  return <motion.article id={`project-${project.id}`} className={`project-card ${index===0?'project-featured':''} ${expanded?'has-expanded-details':'details-collapsed'}`} initial={reducedMotion ? false : {opacity:0,y:25}} whileInView={reducedMotion ? undefined : {opacity:1,y:0}} whileHover={reducedMotion ? undefined : {y:-4}} viewport={{once:true,amount:.12}} transition={{duration:reducedMotion ? 0 : .55,delay:index*.08}}>
    <ProjectArtwork index={index}/>
    <div className="project-copy"><div className="project-index">PROJECT 0{index+1} <span> / 03</span></div><div className="project-copy-grid"><div><p className="project-subtitle">{project.subtitle}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="tech-list">{project.stack.map(tech=><span key={tech}>{tech}</span>)}</div><button className="project-toggle water-glass-control" type="button" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>{expanded?'Hide technical details':'Explore project details'}<ChevronDown size={15} aria-hidden="true"/></button></div>
      <AnimatePresence initial={false}>{expanded && <motion.div id={`project-detail-${project.id}`} className="project-details project-expanded" initial={reducedMotion ? false : {height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reducedMotion ? 0 : .38,ease:[.22,.8,.25,1]}} style={{overflow:'hidden'}}>
        <p className="detail-label">WORKFLOW & CAPABILITIES · SELECT A STAGE</p><InteractiveWorkflow project={project}/><div className="feature-list">{project.features.map(feature=><div key={feature}><Check size={14}/><span>{feature}</span></div>)}</div>{project.disclaimer&&<p className="project-note">{project.disclaimer}</p>}<div className="project-links">{project.github?<a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a>:<span className="link-placeholder"><Github size={14}/> Repository link to be added</span>}</div>
      </motion.div>}</AnimatePresence>
    </div></div>
  </motion.article>
}
export default Projects
