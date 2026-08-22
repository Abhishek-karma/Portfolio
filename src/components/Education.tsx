import { GraduationCap, Code2, ShieldCheck, Bot, Award, CheckCircle } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const certifications = [
  {
    title: 'MERN Stack Development Certification',
    year: '2024',
    issuer: 'Unified Mentor',
    icon: Code2,
    badge: 'Verified Credential'
  },
  {
    title: 'Citi ICG Technology Software Development',
    year: '2025',
    issuer: 'Citi / Forage',
    icon: Award,
    badge: 'Verified Simulation'
  },
  {
    title: 'Tata Cybersecurity Analyst',
    year: '2025',
    issuer: 'Tata / Forage',
    icon: ShieldCheck,
    badge: 'Verified Simulation'
  },
  {
    title: 'Robotic Process Automation (RPA)',
    year: '2023',
    issuer: 'Automation Certification',
    icon: Bot,
    badge: 'Verified Credential'
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <SectionHeading 
        number="04"
        label="Credentials & Education"
        title="Academic Foundation & Certifications"
        subtitle="Academic performance in Information Technology combined with verified software engineering certifications."
      />

      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Large Degree Card */}
        <div className="lg:col-span-5 glass bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] p-8 rounded-2xl flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                B.Sc. Degree
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
              B.Sc. in Information Technology
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Patkar Varde College, Mumbai University
            </p>
          </div>

          <div className="pt-6 border-t border-white/[0.06]">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Cumulative CGPA</span>
                <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent font-mono">
                  9.02 / 10.0
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
                Class of 2024
              </span>
            </div>
          </div>
        </div>

        {/* Certifications 2x2 Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert, index) => {
            const IconComp = cert.icon;

            return (
              <div 
                key={index}
                className="glass bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] p-6 rounded-2xl flex flex-col justify-between hover:border-violet-500/40 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] group hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-violet-400">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">{cert.year}</span>
                  </div>

                  <h4 className="font-bold text-white text-sm mb-1 leading-snug group-hover:text-violet-300 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-mono text-cyan-400 mb-4">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-slate-400">
                  <CheckCircle className="w-3 h-3 text-cyan-400" />
                  <span>{cert.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
