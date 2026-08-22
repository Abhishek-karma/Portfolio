import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number?: string;
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ number, label, title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 mb-2 flex items-center justify-center gap-2"
      >
        // {number || '01'}. {label}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base text-slate-400 max-w-xl mx-auto mt-3 font-normal"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
