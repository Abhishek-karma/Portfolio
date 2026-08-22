import { motion } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  tilt?: boolean
  glowColor?: 'cyan' | 'violet' | 'mixed'
  hover?: boolean
}

export default function GlassCard({
  children,
  className = '',
  tilt = true,
  glowColor = 'cyan',
  hover = true
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glareX, setGlareX] = useState(50)
  const [glareY, setGlareY] = useState(50)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setRotateX((y - 0.5) * -10)
    setRotateY((x - 0.5) * 10)
    setGlareX(x * 100)
    setGlareY(y * 100)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlareX(50)
    setGlareY(50)
  }

  const glowClasses = {
    cyan: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    violet: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    mixed: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.1),0_0_60px_rgba(139,92,246,0.08)]'
  }

  return (
    <motion.div
      ref={cardRef}
      className={`glass rounded-2xl overflow-hidden transition-shadow duration-300 ${hover ? glowClasses[glowColor] : ''} ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare overlay */}
      {tilt && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
