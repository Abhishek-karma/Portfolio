import { useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Distributed Notification Pipeline',
    desc: 'Architected event-driven notification microservice using CQRS (MediatR), Azure Service Bus, and SendGrid/SignalR for multi-tenant streaming with real-time WebSocket recovery and offline message replay.',
    pills: ['.NET 6+','CQRS','Azure Bus','SignalR','SendGrid'],
    delay: '0s',
  },
  {
    title: 'Healthcare Claim Validation Engine',
    desc: 'Engineered HIPAA-compliant claim correction workflow with Azure Key Vault for PHI security, Redis-backed sub-millisecond caching, and PostgreSQL validation pipelines with dynamic RBAC matrices.',
    pills: ['Key Vault','PostgreSQL','Redis','RBAC'],
    delay: '0.1s',
  },
  {
    title: 'Network & SSL Lifecycle Monitor',
    desc: 'Automated hardware lifecycle and SSL certificate expiry monitoring using Azure Timer Functions with exponential backoff, pushing real-time metrics to a dynamic Angular 15+ dashboard.',
    pills: ['Azure Functions','Cron','Angular','SSL Probe'],
    delay: '0.2s',
  },
  {
    title: 'WYSIWYG Email Template Builder',
    desc: 'Built a drag-and-drop email template builder using DevExtreme and Quill.js, with Azure Blob Storage for multi-language versioning and real-time preview rendering across devices.',
    pills: ['DevExtreme','Quill.js','Blob Storage','i18n'],
    delay: '0.3s',
  },
];

export default function Experience() {
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
    <section id="experience" ref={ref}
      className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32 bg-warm/30">

      {/* Header */}
      <div className="mb-16 reveal">
        <div className="section-label flex items-center font-mono text-[12px] text-accent uppercase tracking-widest mb-4">
          Trajectory
        </div>
        <h2 className="text-[clamp(32px,4vw,44px)] font-bold tracking-[-0.02em] mb-4 leading-[1.1]">
          Where I've shipped
        </h2>
        <p className="text-[17px] text-ink2 max-w-[540px] leading-[1.7]">
          Deep dives into systems I've architected and the foundations I've built across my engineering journey.
        </p>
      </div>

      {/* Featured Card */}
      <div className="reveal bg-surface border border-border rounded-[28px] overflow-hidden
                      transition-all duration-500 hover:border-accent hover:shadow-[0_24px_80px_rgba(0,0,0,0.1)] mb-12">

        {/* Header row */}
        <div className="flex flex-wrap justify-between items-start gap-4 p-8 pb-0 md:p-10 md:pb-0">
          <div>
            <div className="text-[28px] font-bold tracking-[-0.02em] text-ink mb-1">Junior Software Developer</div>
            <div className="text-[15px] text-ink2">PixelMind Technology — Mumbai, India</div>
          </div>
          <span className="px-4 py-2 bg-accent-lt text-accent font-mono text-[12px] font-medium rounded-full whitespace-nowrap">
            Sep 2025 – Present
          </span>
        </div>

        <p className="px-8 md:px-10 pt-5 text-[16px] text-ink2 leading-[1.7] max-w-[700px]">
          Leading architecture for enterprise microservices across notification pipelines,
          healthcare compliance, and infrastructure monitoring. Built 7 production modules
          serving multi-tenant clients with 99.9% uptime.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 px-8 md:px-10 pt-5 pb-8">
          {['.NET 6+','Azure Service Bus','Angular 15+','PostgreSQL','SignalR','CQRS','Redis','Azure Key Vault'].map(t => (
            <span key={t}
              className="px-3.5 py-1.5 bg-warm border border-border-lt rounded-full text-[12px]
                         font-mono text-ink2 transition-all hover:border-accent hover:text-accent hover:bg-accent-lt">
              {t}
            </span>
          ))}
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-8 md:px-10 pb-10">
          {projects.map(proj => (
            <div key={proj.title}
              className="reveal bg-bg border border-border-lt rounded-[20px] p-6
                         transition-all duration-400 hover:border-accent hover:-translate-y-1
                         hover:shadow-[0_8px_24px_rgba(194,94,0,0.12)]"
              style={{ transitionDelay: proj.delay }}>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="exp-dot w-2 h-2 rounded-full bg-accent shrink-0" />
                <span className="text-[15px] font-semibold text-ink">{proj.title}</span>
              </div>
              <p className="text-[13px] text-ink2 leading-relaxed mb-3">{proj.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {proj.pills.map(p => (
                  <span key={p} className="px-2.5 py-1 bg-surface border border-border-lt rounded-md
                                           text-[10px] font-mono text-muted">{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earlier Experience */}
      <div className="reveal">
        <div className="font-mono text-[11px] text-muted uppercase tracking-[2px] mb-5">Earlier Experience</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              role: 'Software Development Intern',
              company: 'PixelMind Technology — Mumbai',
              date: 'Mar – Sep 2025',
              points: [
                'Engineered core .NET Core backend microservices with Azure Key Vault & Redis caching',
                'Built RESTful APIs with EF Core & Dapper for high-performance data access',
                'Reduced database load by 60% through Redis caching strategies',
              ],
            },
            {
              role: 'Full Stack Web Developer Intern',
              company: 'Unified Mentor — Remote',
              date: 'Jan – Mar 2025',
              points: [
                'Developed full-stack MERN applications with decoupled API architecture',
                'Built responsive React frontends with MongoDB schema design',
                'Earned MERN Stack Development Certification',
              ],
            },
          ].map(exp => (
            <div key={exp.role}
              className="earlier-card relative bg-surface border border-border rounded-[20px] p-6 pl-8
                         transition-all duration-300 hover:border-accent hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                <div>
                  <div className="text-[15px] font-semibold text-ink">{exp.role}</div>
                  <div className="text-[13px] text-ink2 mt-0.5">{exp.company}</div>
                </div>
                <span className="font-mono text-[11px] text-muted bg-warm px-2.5 py-1 rounded-full whitespace-nowrap">
                  {exp.date}
                </span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {exp.points.map(pt => (
                  <li key={pt} className="text-[13px] text-ink2 leading-relaxed pl-4 relative
                                          before:content-['—'] before:absolute before:left-0
                                          before:text-muted before:font-mono before:text-[10px]">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
