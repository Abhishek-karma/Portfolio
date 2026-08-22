import { motion } from 'framer-motion';
import { Server, Layout, Database, Workflow } from 'lucide-react';

const skillCategories = [
  {
    title: "Backend Architecture & Cloud",
    icon: <Server className="w-6 h-6" />,
    skills: [".NET 6+", "C#", "Azure Services", "CQRS", "Microservices", "SignalR", "RESTful APIs"]
  },
  {
    title: "Frontend & Reactive UI",
    icon: <Layout className="w-6 h-6" />,
    skills: ["Angular 15+", "React", "RxJS", "TypeScript", "DevExtreme", "PrimeNG", "Tailwind CSS"]
  },
  {
    title: "Data Engineering & Caching",
    icon: <Database className="w-6 h-6" />,
    skills: ["PostgreSQL", "Redis Cache", "Entity Framework Core", "Dapper", "MongoDB", "SQL"]
  },
  {
    title: "Systems Architecture & DevOps",
    icon: <Workflow className="w-6 h-6" />,
    skills: ["CQRS (MediatR)", "Azure Service Bus", "Key Vault", "Git/GitHub", "CI/CD", "SendGrid"]
  }
];

export default function Skills() {
  return (
    <section id="expertise" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4 tracking-tight">
            Technical Command Center
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            A highly optimized stack designed for scale, resilience, and reactive user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="glass bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] p-6 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col"
            >
              <div className="bg-cyan-500/10 p-2.5 rounded-lg border border-cyan-500/20 text-cyan-400 w-fit mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-6 tracking-wide">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {category.skills.map(skill => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

