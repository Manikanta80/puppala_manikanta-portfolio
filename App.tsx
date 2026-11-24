import { Hero } from './components/Hero'
import { LiquidNavigation } from './components/LiquidNavigation'
import { About } from './components/About'
import { ExperienceTimeline } from './components/ExperienceTimeline'
import { Projects } from './components/Projects'
import { SkillsConstellation } from './components/SkillsConstellation'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { GlassPointerLight } from './components/GlassPointerLight'
import { ScrollStoryProgress } from './components/ScrollStoryProgress'

export const App = () => {
  return (
    <>
      <LiquidNavigation />
      <ScrollStoryProgress />
      <div className="galaxy-backdrop" aria-hidden="true"><div className="galaxy-stars" /></div>
      <GlassPointerLight />
      <main className="relative min-h-screen overflow-x-hidden">
        <Hero />
        <About />
        <ExperienceTimeline />
        <Projects />
        <SkillsConstellation />
        <Education />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App
