import { motion } from 'framer-motion'
import { projects } from '../data/projects'
const groups = [
  ['Programming', 'Python', 'SQL'],
  ['Data analytics', 'Pandas', 'NumPy', 'Data cleaning', 'Data validation', 'Exploratory data analysis'],
  ['Visualization', 'Power BI', 'Tableau', 'Matplotlib', 'Seaborn'],
  ['Databases', 'MySQL', 'PostgreSQL fundamentals'],
  ['Tools', 'Advanced Excel', 'Google Sheets', 'Jupyter Notebook', 'Git', 'GitHub'],
  ['AI & development', 'Flask', 'Scikit-learn', 'LangChain', 'LangGraph', 'MCP'],
]
export const SkillsConstellation = () => <section id="skills" className="portfolio-section skills-section">
  <div className="section-heading"><p className="eyebrow">TOOLS & TECHNOLOGIES</p><h2>A practical<br /><span>technical toolkit.</span></h2><p>Skills developed across professional operations and personal projects.</p></div>
  <div className="skill-grid">{groups.map(([title, ...items], index) => <motion.article className="skill-card" key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><span className="skill-number">0{index + 1}</span><h3>{title}</h3><div>{items.map(item => {
    const normalized = item.toLowerCase().replace(/ fundamentals| \(.*\)/g, '')
    const target = projects.find(project => project.stack.some(tech => tech.toLowerCase() === normalized) || project.features.some(feature => feature.toLowerCase().includes(normalized)))
    return target ? <a key={item} href={`#project-${target.id}`} title={`See ${item} in ${target.title}`}>{item}</a> : <span key={item}>{item}</span>
  })}</div></motion.article>)}</div>
  <p className="skill-footnote">Technology list reflects project use and working knowledge; professional experience is described separately.</p>
</section>
export default SkillsConstellation
