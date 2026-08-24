import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Award, X, ExternalLink, Check, type LucideIcon } from 'lucide-react';

interface Cert {
  Icon: LucideIcon; org: string; title: string; year: string; delay: string;
  type: string; desc: string; skills: string[]; link?: string;
}

const certs: Cert[] = [
  {
    Icon: GraduationCap, org: 'Patkar Varde College, Mumbai University',
    title: 'B.Sc. in Information Technology', year: 'Class of 2024 — CGPA 9.02',
    delay: '0s', type: 'Academic Degree',
    desc: 'Three-year degree program in Information Technology with specialization in Software Engineering, Database Systems, Computer Networks, and Object-Oriented Architecture.',
    skills: ['Software Engineering','Database Systems','Computer Networks','Object-Oriented Design','CGPA 9.02 / 10.0'],
  },
  {
    Icon: Award, org: 'Unified Mentor',
    title: 'MERN Stack Development Certification', year: 'Verified Credential — 2025',
    delay: '0.05s', type: 'Verified Credential',
    desc: 'Full-stack engineering certification covering MongoDB schema design, Express REST APIs, React state management, and Node.js microservice architecture.',
    skills: ['MongoDB','Express.js','React.js','Node.js','REST API Design','JWT Auth'],
    link: 'https://github.com/Abhishek-karma',
  },
  {
    Icon: Award, org: 'Citi / Forage',
    title: 'Citi ICG Technology Software Development', year: 'Virtual Simulation — 2025',
    delay: '0.1s', type: 'Virtual Internship Simulation',
    desc: 'Enterprise virtual internship analyzing capital market software systems, API architecture design, and financial platform refactoring with performance optimization.',
    skills: ['Enterprise Systems','API Security','System Architecture','Financial Software Design'],
    link: 'https://www.theforage.com/',
  },
  {
    Icon: Award, org: 'Tata / Forage',
    title: 'Tata Cybersecurity Analyst', year: 'Virtual Simulation — 2023',
    delay: '0.15s', type: 'Virtual Internship Simulation',
    desc: 'Practical security analyst simulation covering IAM, network vulnerability scanning, threat vector analysis, and enterprise risk mitigation strategies.',
    skills: ['Identity & Access Management','Vulnerability Assessment','Network Security','Threat Analysis'],
    link: 'https://www.theforage.com/',
  },
  {
    Icon: Award, org: 'Automation Certification',
    title: 'Robotic Process Automation (RPA)', year: 'Verified Credential — 2023',
    delay: '0.2s', type: 'Verified Credential',
    desc: 'Automated workflow logic engineering, bot orchestration, software process automation, and enterprise script triggers for enterprise task automation.',
    skills: ['Process Automation','Bot Scripting','Workflow Optimization','Timer Triggers'],
    link: 'https://github.com/Abhishek-karma',
  },
];

export default function Education() {
  const [selected, setSelected] = useState<Cert | null>(null);
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="certs" ref={ref}
      className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32 bg-warm/20">

      <div className="mb-16 reveal">
        <div className="section-label flex items-center font-mono text-[12px] text-accent uppercase tracking-widest mb-4">
          Credentials
        </div>
        <h2 className="text-[clamp(32px,4vw,44px)] font-bold tracking-[-0.02em] mb-4 leading-[1.1]">
          Certifications & Education
        </h2>
        <p className="text-[17px] text-ink2 max-w-[540px] leading-[1.7]">
          Academic foundation combined with verified software engineering certifications.
          Click any card to view details.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certs.map(cert => (
          <div key={cert.title}
            className="cert-card reveal relative bg-surface border border-border rounded-[20px] p-7
                       cursor-pointer transition-all duration-400 overflow-hidden
                       hover:border-accent hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)]"
            style={{ transitionDelay: cert.delay }}
            onClick={() => setSelected(cert)}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setSelected(cert)}>
            {/* Badge */}
            <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-accent-lt text-accent
                            flex items-center justify-center"><cert.Icon size={15} strokeWidth={2} /></div>
            <div className="font-mono text-[11px] text-accent mb-2">{cert.org}</div>
            <div className="text-[15px] font-semibold text-ink mb-2 leading-snug pr-8">{cert.title}</div>
            <div className="font-mono text-[12px] text-muted">{cert.year}</div>
          </div>
        ))}
      </div>

      {/* ── MODAL ── */}
      {selected && (
        <div className="fixed inset-0 z-[9000] bg-ink/60 backdrop-blur-sm
                        flex items-center justify-center p-6"
          onClick={() => setSelected(null)}>
          <div className="modal-enter relative bg-surface border border-border rounded-[28px] p-10
                          max-w-[560px] w-full shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
            onClick={e => e.stopPropagation()}>

            {/* Close */}
            <button onClick={() => setSelected(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-warm border border-border
                         flex items-center justify-center text-ink2 hover:bg-ink hover:text-white
                         transition-all cursor-pointer" aria-label="Close">
              <X size={16} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-[14px] bg-accent-lt text-accent flex items-center justify-center">
                <selected.Icon size={24} strokeWidth={1.9} />
              </div>
              <div>
                <div className="font-mono text-[11px] text-accent uppercase tracking-wide mb-1">
                  {selected.type}
                </div>
                <div className="text-[13px] text-ink2">{selected.org}</div>
              </div>
            </div>

            <h3 className="text-[24px] font-bold tracking-[-0.02em] text-ink mb-1">{selected.title}</h3>
            <div className="font-mono text-[12px] text-accent mb-4">{selected.year}</div>
            <p className="text-[14px] text-ink2 leading-relaxed mb-6">{selected.desc}</p>

            <div className="font-mono text-[11px] text-muted uppercase tracking-widest mb-3">
              Verified Skills & Competencies
            </div>
            <div className="flex flex-wrap gap-2 mb-7">
              {selected.skills.map(s => (
                <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 bg-warm border border-border
                                         rounded-full text-[12px] font-mono text-ink2">
                  <Check size={13} strokeWidth={2.5} className="text-ok shrink-0" /> {s}
                </span>
              ))}
            </div>

            <div className="flex gap-3 pt-5 border-t border-border-lt flex-wrap">
              {selected.link && (
                <a href={selected.link} target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-[14px] bg-ink text-bg text-[13px] font-semibold
                             no-underline flex items-center gap-2 hover:bg-accent transition-colors">
                  <ExternalLink size={15} strokeWidth={2} /> Verify Credential
                </a>
              )}
              <button onClick={() => setSelected(null)}
                className="px-6 py-3 rounded-[14px] bg-warm border border-border text-ink
                           text-[13px] font-semibold cursor-pointer hover:border-accent hover:text-accent
                           transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
