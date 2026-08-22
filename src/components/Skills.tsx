import { motion } from 'framer-motion';
import { Server, Layout, Database, Workflow } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const skillCategories = [
  {
    title: "Backend Architecture & Cloud",
    icon: <Server className="w-5 h-5 text-cyan-400" />,
    skills: ["C#", ".NET 6+", "Azure Services", "Azure Service Bus", "Azure Functions", "CQRS (MediatR)", "SignalR", "RESTful APIs", "Node.js", "Express"]
  },
  {
    title: "Reactive Frontend & UI",
    icon: <Layout className="w-5 h-5 text-violet-400" />,
    skills: ["Angular 15+", "React", "RxJS", "TypeScript", "DevExtreme", "PrimeNG", "Tailwind CSS", "HTML5/CSS3"]
  },
  {
    title: "Data Engineering & Caching",
    icon: <Database className="w-5 h-5 text-cyan-400" />,
    skills: ["PostgreSQL", "Redis Cache", "Entity Framework Core", "Dapper", "MongoDB", "SQL Query Optimization"]
  },
  {
    title: "Systems Architecture & DevOps",
    icon: <Workflow className="w-5 h-5 text-violet-400" />,
    skills: ["Microservices", "Event-Driven Architecture", "Azure Key Vault", "Git/GitHub", "Azure DevOps", "CI/CD Pipelines", "SendGrid API", "Postman"]
  }
];

export default function Skills() {
  return (
    <section id="expertise" className="py-24 relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <SectionHeading 
        number="01"
        label="Technical Command Center"
        title="Engineering Capabilities & Stack"
        subtitle="A highly optimized toolkit spanning full-stack microservices, cloud native infrastructure, and reactive UI architecture."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1 }}
            className="glass bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20 w-fit mb-4 group-hover:border-cyan-500/40 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-6 tracking-wide group-hover:text-cyan-300 transition-colors">
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {category.skills.map(skill => (
                <span
                  key={skill}
                  className="text-xs font-mono px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
