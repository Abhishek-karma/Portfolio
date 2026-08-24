import { useEffect, useRef, useState } from 'react';
import { Activity, Boxes, Gauge } from 'lucide-react';

function useCounter(target: number, duration = 1400, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return count;
}

export default function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const modules = useCounter(7, 1000, started);
  const uptime  = useCounter(999, 1400, started);

  /* Mouse parallax */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.floating-card');
    const visual = visualRef.current;
    if (!visual || !window.matchMedia('(pointer:fine)').matches) return;
    const onMove = (e: MouseEvent) => {
      const r = visual.getBoundingClientRect();
      const x = (e.clientX - r.left  - r.width  / 2) / r.width;
      const y = (e.clientY - r.top   - r.height / 2) / r.height;
      cards.forEach((card, i) => {
        const f = (i + 1) * 8;
        card.style.transform = `translate(${x * f}px, ${y * f}px)`;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Chart bars + start counters */
  useEffect(() => {
    const heights = [30, 55, 80, 65, 90, 75, 95];
    document.querySelectorAll<HTMLElement>('.mini-bar').forEach((bar, i) => {
      bar.style.height = '0%';
      setTimeout(() => { bar.style.height = heights[i] + '%'; }, 400 + i * 80);
    });
    const t = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="about"
      className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-screen
                 max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-16">

      {/* ── LEFT ── */}
      <div className="flex-1 max-w-[600px] w-full">

        {/* Avatar + badge */}
        <div className="flex items-center gap-4 mb-8">
          <div className="hero-avatar w-14 h-14 rounded-full bg-gradient-to-br from-accent to-[#e07020]
                          flex items-center justify-center text-lg font-bold text-white
                          shadow-[0_4px_20px_rgba(194,94,0,0.25)] shrink-0">
            AV
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border
                          rounded-full text-[12px] text-ok font-mono shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-ok animate-[pulseDot_2s_ease-in-out_infinite]" />
            Open to opportunities
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(42px,5.5vw,68px)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
          <span className="hero-line"><span>Building</span></span>
          <span className="hero-line"><span><span className="accent-text">distributed systems</span></span></span>
          <span className="hero-line"><span>that scale<span className="hero-cursor">|</span></span></span>
        </h1>

        {/* Description */}
        <p className="hero-desc text-[17px] text-ink2 leading-[1.7] mb-8 max-w-[500px]">
          Full-stack engineer crafting event-driven microservices, cloud-native
          architecture, and high-throughput backends on Azure — with reactive frontends
          that feel as solid as the systems beneath them.
        </p>

        {/* Stats */}
        <div className="hero-stats flex items-center gap-8 mb-9">
          <div className="flex flex-col gap-1">
            <span className="text-[26px] font-bold text-ink tracking-[-0.03em] leading-none">{modules}+</span>
            <span className="text-[11px] text-muted font-mono uppercase tracking-wide">Modules shipped</span>
          </div>
          <div className="w-px h-9 bg-border" />
          <div className="flex flex-col gap-1">
            <span className="text-[26px] font-bold text-ink tracking-[-0.03em] leading-none">
              {(uptime / 10).toFixed(1)}%
            </span>
            <span className="text-[11px] text-muted font-mono uppercase tracking-wide">Uptime SLA</span>
          </div>
          <div className="w-px h-9 bg-border" />
          <div className="flex flex-col gap-1">
            <span className="text-[26px] font-bold text-ink tracking-[-0.03em] leading-none">&lt;1ms</span>
            <span className="text-[11px] text-muted font-mono uppercase tracking-wide">Cache response</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="hero-actions flex gap-4 flex-wrap">
          <button onClick={() => go('projects')}
            className="btn-primary relative overflow-hidden px-8 py-3.5 rounded-[14px] bg-ink text-bg
                       text-sm font-semibold cursor-pointer transition-all duration-300
                       hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(194,94,0,0.25)]">
            Explore my work →
          </button>
          <button onClick={() => go('contact')}
            className="px-8 py-3.5 rounded-[14px] border-[1.5px] border-border bg-transparent
                       text-sm font-semibold text-ink cursor-pointer transition-all duration-300
                       hover:border-ink hover:bg-surface">
            Get in touch
          </button>
        </div>
      </div>

      {/* ── RIGHT: Floating Cards ── */}
      <div ref={visualRef}
        className="flex-1 relative w-full max-w-[520px] h-[480px] lg:h-[500px] perspective-[1000px]">

        {/* Card 1 — System Load */}
        <div className="floating-card">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8]"><Activity size={18} strokeWidth={2} /></div>
            <div>
              <div className="text-[13px] font-semibold text-ink">System Load</div>
              <div className="text-[11px] text-muted font-mono">Real-time monitoring</div>
            </div>
          </div>
          <div className="text-[28px] font-bold text-ink mb-1">
            {(uptime / 10).toFixed(1)}%
          </div>
          <div className="text-[12px] text-muted mb-3">Uptime across all services</div>
          <div className="flex items-end gap-1 h-10">
            {[30,55,80,65,90,75,95].map((h, i) => (
              <div key={i}
                className={`flex-1 rounded-sm transition-all duration-[800ms] ease-out mini-bar
                           ${i >= 4 ? 'bg-accent' : 'bg-accent-lt'}`}
                style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 2 — Active Modules */}
        <div className="floating-card">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#fce8d5] flex items-center justify-center text-accent"><Boxes size={18} strokeWidth={2} /></div>
            <div>
              <div className="text-[13px] font-semibold text-ink">Active Modules</div>
              <div className="text-[11px] text-muted font-mono">Enterprise codebase</div>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[36px] font-bold text-accent leading-none">{modules}</span>
            <span className="text-[13px] text-ink2 leading-snug">Production-grade<br/>modules engineered</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Notification','Claims','SSL Monitor'].map(t => (
              <span key={t} className="px-2.5 py-1 bg-warm border border-border-lt rounded-full
                                       text-[10px] font-mono text-ink2">{t}</span>
            ))}
          </div>
        </div>

        {/* Card 3 — Performance */}
        <div className="floating-card">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#e6f4ea] flex items-center justify-center text-ok"><Gauge size={18} strokeWidth={2} /></div>
            <div>
              <div className="text-[13px] font-semibold text-ink">Performance</div>
              <div className="text-[11px] text-muted font-mono">Cache hit ratio</div>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-[32px] font-bold text-ok">&lt;1ms</span>
            <span className="text-[13px] text-muted">avg response</span>
          </div>
          <p className="text-[12px] text-ink2 leading-relaxed">
            Redis-backed sub-millisecond caching across all microservices
          </p>
        </div>
      </div>
    </section>
  );
}
