import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

export type GlassVariant = 'ultra' | 'floating' | 'crystal' | 'pill' | 'micro'

export const glassVariants: Record<GlassVariant, string> = {
  ultra: 'glass-ultra',
  floating: 'glass-floating',
  crystal: 'glass-crystal',
  pill: 'glass-pill',
  micro: 'glass-micro',
}

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant
  children?: ReactNode
  noHover?: boolean
}

const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
  ({ variant = 'ultra', noHover = false, className, children, ...rest }, ref) => {
    const {
      style,
      onDrag, onDragStart, onDragEnd,
      onAnimationStart, onAnimationEnd, onAnimationIteration,
      onTransitionEnd,
      ...props
    } = rest
    return (
      <motion.div
        ref={ref}
        className={cn(glassVariants[variant], 'relative overflow-hidden', className)}
        whileHover={noHover ? undefined : { scale: 1.01, rotateY: 2 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        {...props}
      >
        <span className="inner-highlight" aria-hidden="true" />
        <span className="specular-reflection" aria-hidden="true" />
        <span className="glass-glow" aria-hidden="true" />
        {children}
      </motion.div>
    )
  }
)

LiquidGlass.displayName = 'LiquidGlass'

export { LiquidGlass }
export default LiquidGlass