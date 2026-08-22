import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Cpu, ShieldCheck, Activity, Terminal } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

// Notification Pipeline Visualizer
const NotificationPipelineDiagram = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-full h-52 bg-slate-950/80 rounded-xl border border-white/[0.06] overflow-hidden p-3 flex items-center justify-center">
    <svg viewBox="0 0 700 320" className="w-full h-full">
      {/* Dashed Connecting Paths */}
      <path d="M 120 160 L 250 160" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <path d="M 360 160 L 480 160" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <path d="M 570 160 L 640 160" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      
      {/* Node 1: Client Apps */}
      <g transform="translate(30, 130)">
        <rect width="90" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="45" y="35" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">Clients</text>
      </g>
      
      {/* Node 2: CQRS API */}
      <g transform="translate(250, 130)">
        <rect width="110" height="60" rx="8" fill="#0f172a" stroke="#a78bfa" strokeWidth="1.5" />
        <text x="55" y="35" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">CQRS API</text>
      </g>

      {/* Service Bus Hub */}
      <g transform="translate(365, 80)">
        <path d="M 0 30 L 40 15 L 80 30 L 80 90 L 40 105 L 0 90 Z" fill="#030712" stroke="#a78bfa" strokeWidth="1.5" />
        <text x="40" y="65" fill="#c4b5fd" fontSize="10" fontFamily="monospace" textAnchor="middle">Azure Bus</text>
      </g>

      {/* Node 3: Workers */}
      <g transform="translate(480, 130)">
        <rect width="90" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="45" y="30" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">Workers</text>
        <text x="45" y="46" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">SignalR/SMTP</text>
      </g>

      {/* Node 4: Users */}
      <g transform="translate(640, 135)">
        <circle cx="25" cy="25" r="25" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="25" y="29" fill="#f8fafc" fontSize="10" fontFamily="monospace" textAnchor="middle">Users</text>
      </g>

      {/* Moving Light Pulses on Hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.circle r="3.5" fill="#38bdf8"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              style={{ filter: 'drop-shadow(0 0 6px #38bdf8)', offsetPath: "path('M 120 160 L 250 160')" } as any}
            />
            <motion.circle r="3.5" fill="#a78bfa"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: 0.4 }}
              style={{ filter: 'drop-shadow(0 0 6px #a78bfa)', offsetPath: "path('M 360 160 L 405 130 L 480 160')" } as any}
            />
            <motion.circle r="3.5" fill="#38bdf8"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: 0.8 }}
              style={{ filter: 'drop-shadow(0 0 6px #38bdf8)', offsetPath: "path('M 570 160 L 640 160')" } as any}
            />
          </>
        )}
      </AnimatePresence>
    </svg>
  </div>
);

// Healthcare Claim Vault Visualizer
const HealthcareVaultDiagram = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-full h-52 bg-slate-950/80 rounded-xl border border-white/[0.06] overflow-hidden p-3 flex items-center justify-center">
    <svg viewBox="0 0 700 320" className="w-full h-full">
      <path d="M 120 160 L 260 90" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <path d="M 120 160 L 260 230" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <path d="M 370 90 L 510 160" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <path d="M 370 230 L 510 160" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />

      {/* Node 1: Ingestion */}
      <g transform="translate(30, 130)">
        <rect width="90" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="45" y="35" fill="#f8fafc" fontSize="10" fontFamily="monospace" textAnchor="middle">Claim Ingest</text>
      </g>

      {/* Key Vault */}
      <g transform="translate(260, 60)">
        <rect width="110" height="60" rx="8" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
        <text x="55" y="35" fill="#34d399" fontSize="11" fontFamily="monospace" textAnchor="middle">PHI Vault</text>
      </g>

      {/* Redis Cache */}
      <g transform="translate(260, 200)">
        <rect width="110" height="60" rx="8" fill="#0f172a" stroke="#f87171" strokeWidth="1.5" />
        <text x="55" y="35" fill="#f87171" fontSize="11" fontFamily="monospace" textAnchor="middle">Redis Cache</text>
      </g>

      {/* PostgreSQL Validation */}
      <g transform="translate(510, 130)">
        <rect width="120" height="60" rx="8" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5" />
        <text x="60" y="30" fill="#f8fafc" fontSize="10" fontFamily="monospace" textAnchor="middle">PostgreSQL</text>
        <text x="60" y="45" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">Validation Engine</text>
      </g>

      {/* Pulse Rings on Hover */}
      {isHovered && (
        <motion.circle cx="315" cy="90" r="28" fill="none" stroke="#34d399" strokeWidth="1.5"
          initial={{ scale: 0.6, opacity: 1 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}
    </svg>
  </div>
);

// Network Monitor Visualizer
const NetworkMonitorDiagram = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-full h-52 bg-slate-950/80 rounded-xl border border-white/[0.06] overflow-hidden p-3 flex items-center justify-center">
    <svg viewBox="0 0 700 320" className="w-full h-full">
      <path d="M 120 160 L 240 160" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <path d="M 340 160 L 450 160" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <path d="M 550 160 L 630 160" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />

      {/* Cron */}
      <g transform="translate(50, 135)">
        <circle cx="25" cy="25" r="25" fill="#0f172a" stroke="#facc15" strokeWidth="1.5" />
        <text x="25" y="29" fill="#facc15" fontSize="10" fontFamily="monospace" textAnchor="middle">Cron</text>
      </g>

      {/* Azure Functions */}
      <g transform="translate(240, 130)">
        <rect width="100" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="50" y="35" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">Azure Func</text>
      </g>

      {/* Probe */}
      <g transform="translate(450, 130)">
        <rect width="100" height="60" rx="30" fill="#0f172a" stroke="#a78bfa" strokeWidth="1.5" />
        <text x="50" y="35" fill="#c4b5fd" fontSize="11" fontFamily="monospace" textAnchor="middle">SSL Probe</text>
      </g>

      {/* Dashboard */}
      <g transform="translate(630, 130)">
        <rect width="90" height="60" rx="8" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
        <text x="45" y="35" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle">Dashboard</text>
      </g>

      {/* Pulse ping */}
      {isHovered && (
        <motion.circle cx="500" cy="160" r="25" fill="none" stroke="#a78bfa" strokeWidth="1.5"
          initial={{ scale: 0.6, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </svg>
  </div>
);

const projectsList = [
  {
    id: 1,
    number: '01',
    title: 'Distributed Multi-Tenant Notification Pipeline',
    category: 'Distributed Systems & Cloud',
    icon: Cpu,
    tags: ['.NET 6+', 'CQRS', 'Azure Service Bus', 'SignalR', 'SendGrid'],
    metrics: [
      { label: 'Throughput', value: '10k msg/sec' },
      { label: 'Latency', value: '< 50ms' },
      { label: 'Uptime', value: '99.99%' }
    ],
    Diagram: NotificationPipelineDiagram,
    description: 'Architected an event-driven notification microservice using CQRS (MediatR), Azure Service Bus, and SendGrid/SignalR for multi-tenant streaming with real-time WebSocket recovery.'
  },
  {
    id: 2,
    number: '02',
    title: 'Healthcare Claim Validation Engine & PHI Vault',
    category: 'Security & Database Systems',
    icon: ShieldCheck,
    tags: ['Azure Key Vault', 'PostgreSQL', 'Redis Cache', '.NET Core', 'Angular'],
    metrics: [
      { label: 'PHI Encryption', value: 'AES-256' },
      { label: 'Cache Hit', value: '94%' },
      { label: 'Compliance', value: 'HIPAA' }
    ],
    Diagram: HealthcareVaultDiagram,
    description: 'Engineered a HIPAA-compliant claim correction workflow integrated with Azure Key Vault for PHI security, Redis-backed sub-millisecond caching, and PostgreSQL validation pipelines.'
  },
  {
    id: 3,
    number: '03',
    title: 'Real-Time Network & SSL Lifecycle Monitor',
    category: 'Serverless & Infrastructure',
    icon: Activity,
    tags: ['Azure Functions', 'Cron Triggers', 'Angular 15+', 'PostgreSQL'],
    metrics: [
      { label: 'Monitored', value: '5,000+' },
      { label: 'Alert Latency', value: '< 2s' },
      { label: 'Status', value: '100% Active' }
    ],
    Diagram: NetworkMonitorDiagram,
    description: 'Automated hardware lifecycle and SSL certificate expiry monitoring using Azure Timer Functions, pushing real-time status metrics to a dynamic Angular dashboard.'
  }
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <SectionHeading 
        number="03"
        label="Systems Architected"
        title="Featured Architectural Showcase"
        subtitle="Visual blueprints of distributed microservices, event-driven pipelines, and cloud native infrastructure."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
        {projectsList.map((project) => {
          const isExpanded = expandedId === project.id;
          const [isHovered, setIsHovered] = useState(false);

          return (
            <div
              key={project.id}
              className="glass bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between group hover:-translate-y-1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div>
                {/* Visual Architecture Diagram */}
                <div className="mb-6">
                  <project.Diagram isHovered={isHovered} />
                </div>

                {/* Card Title & Category */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Micro-pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Collapsible Architecture Metrics */}
              <div>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                  className="flex items-center justify-between w-full pt-4 border-t border-white/[0.06] text-xs font-mono text-cyan-400 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    {isExpanded ? 'Hide Architectural Metrics' : 'Inspect Performance Metrics'}
                  </span>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 grid grid-cols-3 gap-2">
                        {project.metrics.map((m, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                            <span className="block text-xs font-bold text-white font-mono">{m.value}</span>
                            <span className="block text-[9px] font-mono text-slate-400 uppercase mt-0.5">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
