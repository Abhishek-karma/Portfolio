import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, MapPin, Building2 } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

interface ExperienceRole {
  id: number;
  company: string;
  role: string;
  date: string;
  location: string;
  impactMetric: string;
  summary: string;
  achievements: string[];
  tags: string[];
}

const experiencesData: ExperienceRole[] = [
  {
    id: 1,
    company: 'PixelMind Technology',
    role: 'Junior Software Developer',
    date: 'Sep 2025 – Present',
    location: 'Mumbai, India',
    impactMetric: '7 Enterprise Modules Engineered',
    summary: 'Architecting event-driven notification microservices, real-time engines, and HIPAA-compliant healthcare claim correction tools.',
    achievements: [
      'Event-Driven Notification Microservice: Architected using CQRS (MediatR), Azure Service Bus, and SendGrid API for multi-tenant clients.',
      'Real-Time Notification Engine: Integrated Azure SignalR & WebSockets with RxJS state management and offline recovery.',
      'WYSIWYG Email Template Builder: Built using DevExtreme, Quill.js, and Azure Blob Storage for multi-language versioning.',
      'Automated Timer Engines: Engineered Azure Timer Functions with exponential backoff & status tracking.',
      'Healthcare Claim Correction Tool: Engineered validation workflows with Azure Key Vault (PHI security) & Redis caching.',
      'Network Lifecycle Management: Automated hardware & SSL certificate lifecycle monitoring.',
      'RBAC & Security: Built dynamic permission matrices and dynamic PostgreSQL column rendering.'
    ],
    tags: ['.NET 6+', 'Azure Service Bus', 'Angular 15+', 'PostgreSQL', 'Redis Cache', 'SignalR', 'CQRS']
  },
  {
    id: 2,
    company: 'PixelMind Technology',
    role: 'Software Development Intern',
    date: 'Mar 2025 – Sep 2025',
    location: 'Mumbai, India',
    impactMetric: '.NET & Azure Core Integration',
    summary: 'Engineered core .NET Core backend microservices integrated with Azure Key Vault, Redis caching, and storage queues.',
    achievements: [
      'Core Backend Service Integrations: Integrated Azure Key Vault, Redis Cache, and Storage Queues into production APIs.',
      'High-Performance Querying: Built scalable API endpoints with Entity Framework Core & Dapper ORM.'
    ],
    tags: ['.NET Core', 'Azure Key Vault', 'Redis', 'Entity Framework Core', 'Dapper', 'REST APIs']
  },
  {
    id: 3,
    company: 'Unified Mentor',
    role: 'Full Stack Web Developer Intern',
    date: 'Jan 2025 – Mar 2025',
    location: 'Remote',
    impactMetric: 'MERN Stack API Architecture',
    summary: 'Developed full-stack web applications with decoupled API architectures using MongoDB, Express, React, and Node.js.',
    achievements: [
      'Full Stack App Architecture: Built decoupled MERN stack applications with RESTful APIs.',
      'Responsive Frontend Engineering: Implemented reactive UI designs and asynchronous state workflows.'
    ],
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'RESTful APIs', 'JavaScript']
  }
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(experiencesData[0].id);

  return (
    <section id="experience" className="py-24 relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <SectionHeading 
        number="02"
        label="Career Trajectory"
        title="Professional Experience & Impact"
        subtitle="Progressive disclosure timeline showcasing software developer roles, cloud architecture, and enterprise engineering accomplishments."
      />

      <div className="max-w-4xl mx-auto mt-12 relative">
        {/* Timeline Gradient Line */}
        <div className="absolute left-[15px] md:left-[23px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-cyan-500 via-violet-500/40 to-transparent" />

        <div className="flex flex-col gap-8">
          {experiencesData.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-10 md:pl-16"
              >
                {/* Radar Ping Node */}
                <div className="absolute left-[10px] md:left-[18px] top-7 -translate-x-1/2">
                  <div className="relative flex h-3.5 w-3.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20">
                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                  </div>
                </div>

                <div 
                  className={`glass bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 rounded-2xl transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] cursor-pointer ${
                    isExpanded ? 'border-cyan-500/40 shadow-lg shadow-cyan-500/5' : 'hover:border-white/[0.15]'
                  }`}
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                          {exp.impactMetric}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-1">
                        <span className="flex items-center gap-1 text-white font-semibold">
                          <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-violet-400" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <span className="inline-block text-xs font-mono text-slate-400 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
                        {exp.date}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {exp.summary}
                  </p>

                  <div className="flex items-center text-xs font-mono text-cyan-400 hover:text-white transition-colors">
                    <span>{isExpanded ? 'Hide Architectural Details' : 'Inspect Case Study & Bullet Points'}</span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronRight className="w-4 h-4 ml-1" />
                    )}
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-white/[0.06]">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-4">
                            Key Achievements & System Contributions
                          </h4>
                          <ul className="space-y-3">
                            {exp.achievements.map((achievement, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start text-slate-300 text-sm leading-relaxed"
                              >
                                <ChevronRight className="w-4 h-4 text-cyan-400 mr-2.5 shrink-0 mt-1" />
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Micro-pills */}
                  <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/[0.04]">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
