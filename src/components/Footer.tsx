import { motion } from 'framer-motion'
import { profile } from '../data/profile'

export const Footer = () => (
  <footer className="relative z-20 text-center text-white/80 py-8 bg-deep-ocean">
    <motion.div
      className="max-w-4xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-electric-cyan animate-ping" />
          <span className="text-sm lg:text-base font-medium text-white/80">
            Puppala Manikanta
          </span>
        </div>
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} Puppala Manikanta. All rights reserved.
        </p>
      </div>
      <div className="mt-8">
        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white/90 transition-colors" aria-label="LinkedIn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14C6.479 0 2 3.458 2 7.938v8.164C2 20.542 6.479 24 12 24s10-3.458 10-7.938V7.938C22 3.458 17.521 0 19 0zm-9.337 21.804c-.966 0-1.799-.77-1.799-1.739 0-.968.832-1.799 1.799-1.799 1.096 0 1.644.832 1.644 1.799 0 .969-.548 1.739-1.644 1.739zm4.466-9.998h-.011c-.489-.001-.861.48-.861 1.079 0 .61.374 1.083.868 1.083.489 0 .868-.465.868-1.072 0-.607-.372-1.084-.871-1.09zm-2.372-2.01v9.999h4.21v-9.999c0-2.22-1.189-3.252-2.765-3.252-1.399 0-2.357.804-2.357 1.873 0 .572.266 1.19.598 1.487l-.001-.014zm13.547 9.999h-4.211v-7.579c0-1.997-.172-3.656-1.826-3.656-1.757 0-2.052 1.527-2.052 2.547v7.321h-4.215v-9.999h4.217v2.253c.596-1.034 1.747-2.167 3.527-2.167 3.604 0 4.267 2.373 4.267 5.002v2.843zm-7.843 0h-4.222v-9.999h4.222z" />
            </svg>
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white/90 transition-colors" aria-label="GitHub">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.404 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.div>
  </footer>
)

export default Footer
