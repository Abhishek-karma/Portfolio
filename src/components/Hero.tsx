import { motion } from 'framer-motion';
import { HeroScene } from './3d/HeroScene';
import { ArrowRight, Code2, Cpu, GraduationCap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian bg-grid pt-20">
      <HeroScene />
      
      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-xs font-mono text-cyan-400 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            AVAILABLE FOR NEW OPPORTUNITIES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mb-6 max-w-4xl leading-tight"
          >
            Architecting Scalable Microservices & Real-Time Cloud Solutions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mb-12"
          >
            I build high-performance distributed systems, focusing on clean architecture, cloud-native deployments, and robust infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <button className="shimmer-border group relative">
              <div className="relative bg-obsidian rounded-full px-6 py-3 flex items-center gap-2 transition-all group-hover:bg-opacity-80">
                <span className="text-sm font-medium text-white">Get in Touch</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
            <button className="hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white rounded-full px-6 py-3 text-sm font-medium transition-colors">
              Explore Architecture
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
              <GraduationCap className="w-5 h-5 text-violet-400" />
              <span className="text-sm font-medium text-slate-200">9.02 CGPA</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium text-slate-200">CQRS Event-Driven</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-medium text-slate-200">Azure Cloud Native</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
