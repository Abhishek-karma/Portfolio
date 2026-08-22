import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';

const experiences = [
  {
    id: 1,
    company: "Enterprise Solutions Inc.",
    role: "Senior Full Stack Engineer",
    date: "2021 - Present",
    summary: "Architecting cloud-native enterprise solutions using .NET Core and Angular, driving significant improvements in system scalability and deployment efficiency.",
    achievements: [
      "Engineered a distributed microservices architecture using C# and .NET 6+, connected via Azure Service Bus.",
      "Implemented reactive frontend state management using RxJS and Angular 15+, cutting data load times by 30%.",
      "Optimized database queries with Entity Framework Core and Redis Cache, resulting in sub-100ms API response times.",
      "Set up robust CI/CD pipelines in GitHub Actions, automating flawless deployments to Azure App Services."
    ]
  },
  {
    id: 2,
    company: "DataSphere Systems",
    role: "Software Developer",
    date: "2018 - 2021",
    summary: "Developed high-performance data processing pipelines and real-time dashboards for financial analytics.",
    achievements: [
      "Built real-time data streaming features utilizing SignalR and WebSockets.",
      "Designed complex UI components utilizing PrimeNG and DevExtreme for large-scale data visualization.",
      "Migrated legacy monolithic applications to a clean CQRS pattern using MediatR.",
      "Integrated third-party APIs including SendGrid for automated user communications and reliable deliverability."
    ]
  }
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(experiences[0].id);

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4 tracking-tight">
            Career Trajectory
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            A timeline of professional milestones and technical achievements.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-cyan-500 via-violet-500/40 to-transparent md:left-[23px]" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15 }}
                className="relative pl-10 md:pl-16"
              >
                {/* Radar Ping Node */}
                <div className="absolute left-[10px] md:left-[18px] top-7 -translate-x-1/2">
                  <div className="relative flex h-3 w-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20">
                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75"></div>
                  </div>
                </div>

                <div 
                  className={`glass bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 rounded-2xl transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] cursor-pointer ${
                    expandedId === exp.id ? 'border-cyan-500/30' : 'hover:border-white/[0.15]'
                  }`}
                  onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                        {exp.role}
                      </h3>
                      <div className="text-lg text-slate-400 font-medium mt-1">
                        {exp.company}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="inline-block text-xs font-mono text-slate-400 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
                        {exp.date}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-4">
                    {exp.summary}
                  </p>

                  <div className="flex items-center text-xs font-mono text-cyan-400/70 hover:text-cyan-400 transition-colors">
                    <span>{expandedId === exp.id ? 'Hide case study' : 'View case study'}</span>
                    {expandedId === exp.id ? (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronRight className="w-4 h-4 ml-1" />
                    )}
                  </div>

                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-white/[0.05]">
                          <ul className="space-y-4">
                            {exp.achievements.map((achievement, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start text-slate-300 text-sm md:text-base leading-relaxed"
                              >
                                <ChevronRight className="w-5 h-5 text-cyan-400 mr-3 shrink-0 mt-0.5" />
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

