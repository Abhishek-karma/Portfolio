import { Mail, Phone, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';

export default function Contact() {
  return (
    <>
      <section id="contact"
        className="bg-ink text-bg py-24 md:py-32 px-6 md:px-12 text-center relative overflow-hidden">
        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 20% 50%,rgba(194,94,0,0.08),transparent 50%), radial-gradient(circle at 80% 50%,rgba(194,94,0,0.05),transparent 50%)' }} />

        <div className="relative z-10 max-w-[600px] mx-auto">
          <div className="flex justify-center items-center gap-2 mb-5">
            <span className="w-6 h-px bg-accent inline-block" />
            <span className="font-mono text-[12px] text-accent uppercase tracking-widest">Connect</span>
          </div>

          <h2 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.02em] mb-4 text-bg">
            Let's build something together
          </h2>
          <p className="text-[17px] text-bg/60 mb-12 leading-relaxed">
            Open for full-stack software development roles, microservices architecture, and cloud solutions.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:abhikarma.work@gmail.com"
              className="flex items-center gap-2.5 px-7 py-4 rounded-[14px] bg-bg text-ink
                         text-sm font-semibold no-underline transition-all duration-300
                         hover:bg-accent hover:text-white hover:-translate-y-0.5
                         hover:shadow-[0_8px_24px_rgba(194,94,0,0.3)]">
              <Mail size={17} strokeWidth={1.9} className="shrink-0" /> abhikarma.work@gmail.com
            </a>
            <a href="tel:+919967326518"
              className="flex items-center gap-2.5 px-7 py-4 rounded-[14px] border-[1.5px]
                         border-bg/15 text-bg text-sm font-semibold no-underline
                         transition-all duration-300 hover:bg-accent hover:border-accent hover:-translate-y-0.5">
              <Phone size={17} strokeWidth={1.9} className="shrink-0" /> +91 99673 26518
            </a>
            <a href="/resume.pdf" download
              className="flex items-center gap-2.5 px-7 py-4 rounded-[14px] border-[1.5px]
                         border-bg/15 text-bg text-sm font-semibold no-underline
                         transition-all duration-300 hover:bg-accent hover:border-accent hover:-translate-y-0.5">
              <Download size={17} strokeWidth={1.9} className="shrink-0" /> Download Resume
            </a>
            <a href="https://linkedin.com/in/abhikarma" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-7 py-4 rounded-[14px] border-[1.5px]
                         border-bg/15 text-bg text-sm font-semibold no-underline
                         transition-all duration-300 hover:bg-accent hover:border-accent hover:-translate-y-0.5">
              <LinkedinIcon size={17} className="shrink-0" /> LinkedIn
            </a>
            <a href="https://github.com/Abhishek-karma" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-7 py-4 rounded-[14px] border-[1.5px]
                         border-bg/15 text-bg text-sm font-semibold no-underline
                         transition-all duration-300 hover:bg-accent hover:border-accent hover:-translate-y-0.5">
              <GithubIcon size={17} className="shrink-0" /> GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 text-center font-mono text-[12px] text-muted border-t border-border">
        <span className="text-accent">&gt;</span> Designed &amp; built by Abhishek Vishwakarma{' '}
        <span className="text-muted/50">// 2025</span>
      </footer>
    </>
  );
}
