import { motion } from 'framer-motion';
import HeroScene from './3d/HeroScene';
import { ArrowRight, Code2, Cpu, GraduationCap, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/SocialIcons';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian bg-grid pt-24 pb-16">
      <HeroScene />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center">
          
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-md text-xs font-mono text-cyan-400 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <Terminal className="w-3.5 h-3.5" />
            <span>FULL STACK & DISTRIBUTED SYSTEMS ENGINEER</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mb-6 max-w-4xl leading-tight"
          >
            Architecting Scalable Microservices & Real-Time Cloud Solutions.
          </motion.h1>

          {/* Sub Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed"
          >
            Hand-crafting high-throughput backend services in <strong className="text-white font-medium">.NET 6+ & Azure</strong>, integrated with event-driven message pipelines and reactive <strong className="text-white font-medium">Angular & React</strong> frontends.
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <button 
              onClick={() => handleScrollTo('contact')}
              className="shimmer-border group relative inline-flex cursor-pointer"
            >
              <div className="relative bg-slate-950 rounded-full px-7 py-3.5 flex items-center gap-2 transition-all group-hover:bg-slate-900">
                <span className="text-sm font-mono font-medium text-white">Get in Touch</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            <button 
              onClick={() => handleScrollTo('projects')}
              className="hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white rounded-full px-7 py-3.5 text-sm font-mono font-medium transition-colors cursor-pointer"
            >
              Explore Architecture
            </button>
          </motion.div>

          {/* Metrics Glass Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
              <GraduationCap className="w-5 h-5 text-violet-400" />
              <span className="text-sm font-mono font-medium text-slate-200">9.02 CGPA</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-mono font-medium text-slate-200">CQRS Event-Driven</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-mono font-medium text-slate-200">Azure Cloud Native</span>
            </div>
          </motion.div>

          {/* Social Links Row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-6 mt-10 text-xs font-mono text-slate-400"
          >
            <a href="https://github.com/Abhishek-karma" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
              <GithubIcon size={16} />
              <span>github.com/Abhishek-karma</span>
            </a>
            <span>•</span>
            <a href="https://linkedin.com/in/AbhishekVishwakarma" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors flex items-center gap-2">
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
