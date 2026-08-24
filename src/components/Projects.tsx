import { useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Distributed Notification Pipeline',
    desc: 'Event-driven notification microservice using CQRS (MediatR), Azure Service Bus, and SendGrid/SignalR for multi-tenant streaming with real-time WebSocket recovery.',
    tags: ['.NET 6+','CQRS','Azure','SignalR'],
    nodes: ['Client','API','Bus','Worker'],
    delay: '0s',
  },
  {
    title: 'Healthcare Claim Validation Engine',
    desc: 'HIPAA-compliant claim correction workflow with Azure Key Vault for PHI security, Redis-backed sub-millisecond caching, and PostgreSQL validation pipelines.',
    tags: ['Key Vault','PostgreSQL','Redis','Angular'],
    nodes: ['Claim','Vault','Cache','DB'],
    delay: '0.1s',
  },
  {
    title: 'Network & SSL Lifecycle Monitor',
    desc: 'Automated hardware lifecycle and SSL certificate expiry monitoring using Azure Timer Functions, pushing real-time status metrics to a dynamic Angular dashboard.',
    tags: ['Azure Functions','Cron','Angular','PostgreSQL'],
    nodes: ['Cron','Func','Probe','Dash'],
    delay: '0.2s',
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const d = parseFloat((e.target as HTMLElement).style.transitionDelay || '0') * 1000;
          setTimeout(() => e.target.classList.add('visible'), d);
        }
      });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref}
      className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">

      <div className="mb-16 reveal">
        <div className="section-label flex items-center font-mono text-[12px] text-accent uppercase tracking-widest mb-4">
          Systems
        </div>
        <h2 className="text-[clamp(32px,4vw,44px)] font-bold tracking-[-0.02em] mb-4 leading-[1.1]">
          Architectural showcase
        </h2>
        <p className="text-[17px] text-ink2 max-w-[540px] leading-[1.7]">
          Visual blueprints of distributed microservices, event-driven pipelines, and cloud-native infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map(proj => (
          <div key={proj.title}
            className="project-card reveal group bg-surface border border-border rounded-[28px] overflow-hidden
                       cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(0,0,0,0.1)]
                       hover:border-accent"
            style={{ transitionDelay: proj.delay }}>

            {/* Arch visual */}
            <div className="h-[180px] bg-gradient-to-br from-warm to-bg relative overflow-hidden
                            border-b border-border flex items-center justify-center px-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(194,94,0,0.07),transparent_60%)]" />
              <div className="relative z-10 flex items-center gap-2">
                {proj.nodes.map((node, ni) => (
                  <div key={ni} className="flex items-center gap-2">
                    <div className={`arch-node w-12 h-12 rounded-[14px] border-[1.5px] flex flex-col
                                    items-center justify-center text-[9px] font-mono gap-0.5 shadow-sm
                                    ${ni === 1
                                      ? 'border-accent text-accent bg-accent-lt'
                                      : 'border-border text-muted bg-surface'}`}>
                      <div className="w-4 h-4 rounded bg-current opacity-20" />
                      {node}
                    </div>
                    {ni < proj.nodes.length - 1 && (
                      <div className="arch-connector w-6 h-0.5 bg-border
                                      group-hover:bg-accent transition-colors duration-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="p-7">
              <h3 className="text-[18px] font-semibold text-ink mb-2">{proj.title}</h3>
              <p className="text-[14px] text-ink2 leading-relaxed mb-5">{proj.desc}</p>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map(t => (
                    <span key={t} className="px-2.5 py-1 bg-warm border border-border-lt rounded-md
                                             text-[10px] font-mono text-muted">{t}</span>
                  ))}
                </div>
                <span className="text-[13px] font-semibold text-accent">View →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
