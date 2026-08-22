import { motion } from 'framer-motion'

interface TechTagProps {
  label: string
  variant?: 'cyan' | 'violet' | 'default'
  size?: 'sm' | 'md'
}

export default function TechTag({ label, variant = 'default', size = 'sm' }: TechTagProps) {
  const colorClasses = {
    cyan: 'text-cyan-accent border-cyan-accent/20 bg-cyan-accent/5',
    violet: 'text-violet-accent border-violet-accent/20 bg-violet-accent/5',
    default: 'text-muted-slate border-glass-border bg-white/[0.02]'
  }

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  }

  return (
    <motion.span
      className={`inline-flex items-center font-mono rounded-lg border shimmer-border ${colorClasses[variant]} ${sizeClasses[size]}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {label}
    </motion.span>
  )
}
