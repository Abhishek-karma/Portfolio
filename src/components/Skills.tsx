import { useEffect, useRef } from 'react';

const categories = [
  {
    icon: '⚙️', color: 'bg-[#e8f0fe]',
    title: 'Backend & Distributed Systems', sub: 'Event-driven architecture',
    skills: ['C# .NET 6+','CQRS / MediatR','Azure Service Bus','Azure Functions','SignalR','RESTful APIs','Node.js / Express','Microservices'],
  },
  {
    icon: '🎨', color: 'bg-[#fce8d5]',
    title: 'Frontend & Reactive UI', sub: 'Component-driven interfaces',
    skills: ['Angular 15+','React','RxJS','TypeScript','DevExtreme','PrimeNG','Tailwind CSS','HTML5 / CSS3'],
  },
  {
    icon: '🗃️', color: 'bg-[#e6f4ea]',
    title: 'Data & Infrastructure', sub: 'Storage, cache & security',
    skills: ['PostgreSQL','Redis Cache','EF Core / Dapper','MongoDB','Azure Key Vault','SQL Optimization'],
  },
  {
    icon: '🚀', color: 'bg-[#f3e8ff]',
    title: 'DevOps & Tooling', sub: 'Ship with confidence',
    skills: ['Azure DevOps','CI/CD Pipelines','Git / GitHub','SendGrid API','Postman'],
  },
];

export default function Skills() {
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
    <section id="skills" ref={ref} className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
      <div className="mb-16 reveal">
        <div className="section-label flex items-center font-mono text-[12px] text-accent uppercase tracking-widest mb-4">
          Capabilities
        </div>
        <h2 className="text-[clamp(32px,4vw,44px)] font-bold tracking-[-0.02em] mb-4 leading-[1.1]">
          Technical command center
        </h2>
        <p className="text-[17px] text-ink2 max-w-[540px] leading-[1.7]">
          Engineering toolkit spanning full-stack microservices, cloud-native infrastructure, and reactive UI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <div key={cat.title}
            className="reveal bg-surface border border-border rounded-[28px] p-8
                       transition-all duration-500 ease-out
                       hover:border-accent hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
            style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="flex items-center gap-3.5 mb-6">
              <div className={`w-11 h-11 rounded-[14px] ${cat.color} flex items-center justify-center text-lg`}>
                {cat.icon}
              </div>
              <div>
                <div className="text-[17px] font-semibold text-ink">{cat.title}</div>
                <div className="text-[12px] text-muted font-mono">{cat.sub}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map(skill => (
                <div key={skill}
                  className="skill-orb px-3.5 py-1.5 rounded-full text-[13px] font-medium
                             border-[1.5px] border-border text-ink2
                             hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(194,94,0,0.2)]
                             transition-all duration-300">
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
