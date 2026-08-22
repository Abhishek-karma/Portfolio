import { useState } from 'react';
import { Mail, Phone, Check, Copy, ArrowUpRight, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/SocialIcons';
import SectionHeading from './ui/SectionHeading';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <>
      <section id="contact" className="py-24 relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading 
          number="05"
          label="Direct Line"
          title="Initiate Engineering Collaboration"
          subtitle="Open for full-stack software development roles, microservices architecture, and cloud solutions."
        />

        <div className="max-w-3xl mx-auto mt-12">
          {/* Centered Floating Terminal Glass Modal */}
          <div className="glass bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] p-8 md:p-12 rounded-3xl text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] relative overflow-hidden">
            {/* Ambient Background Spotlights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6">
                <Terminal className="w-3.5 h-3.5" />
                <span>Open for High-Impact Roles</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                Let's Build Something Great
              </h3>
              <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-10">
                Send an email directly or click to copy contact details into your terminal clipboard.
              </p>

              {/* Integrated One-Click Copy Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
                
                {/* Email Copy Card */}
                <div 
                  onClick={() => copyToClipboard('abhikarma.work@gmail.com', 'email')}
                  className="p-4 rounded-xl glass bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/40 hover:bg-cyan-500/10 active:scale-95 transition-all duration-200 cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      {copiedEmail ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-mono text-slate-400 uppercase">Primary Email</span>
                      <span className="block text-xs font-mono text-white font-medium truncate">
                        {copiedEmail ? 'Copied to Clipboard!' : 'abhikarma.work@gmail.com'}
                      </span>
                    </div>
                  </div>
                  <Copy className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors ml-2 flex-shrink-0" />
                </div>

                {/* Phone Copy Card */}
                <div 
                  onClick={() => copyToClipboard('+919967326518', 'phone')}
                  className="p-4 rounded-xl glass bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/40 hover:bg-violet-500/10 active:scale-95 transition-all duration-200 cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                      {copiedPhone ? <Check className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-mono text-slate-400 uppercase">Phone</span>
                      <span className="block text-xs font-mono text-white font-medium truncate">
                        {copiedPhone ? 'Copied to Clipboard!' : '+91 9967326518'}
                      </span>
                    </div>
                  </div>
                  <Copy className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors ml-2 flex-shrink-0" />
                </div>

              </div>

              {/* Direct Link Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <a
                  href="https://github.com/Abhishek-karma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon size={18} className="text-cyan-400" />
                    <span className="text-xs font-mono text-white font-medium">github.com/Abhishek-karma</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                <a
                  href="https://linkedin.com/in/AbhishekVishwakarma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/40 hover:bg-white/[0.04] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon size={18} className="text-violet-400" />
                    <span className="text-xs font-mono text-white font-medium">LinkedIn Network</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors" />
                </a>
              </div>

              {/* Primary Email Shimmer CTA */}
              <div className="flex justify-center pt-2">
                <a 
                  href="mailto:abhikarma.work@gmail.com"
                  className="inline-flex p-[1px] rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 group"
                >
                  <span className="px-8 py-3.5 rounded-full bg-slate-950 text-white text-sm font-mono font-medium flex items-center gap-2 group-hover:bg-slate-900 transition-colors">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>Send Direct Email</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Minimalist Footer */}
      <footer className="border-t border-white/[0.06] bg-slate-950 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white tracking-tighter">AV.</span>
            <span className="text-xs font-mono text-slate-400">| Abhishek Vishwakarma</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/Abhishek-karma" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
              <GithubIcon size={18} />
            </a>
            <a href="https://linkedin.com/in/AbhishekVishwakarma" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-violet-400 transition-colors">
              <LinkedinIcon size={18} />
            </a>
          </div>

          <p className="text-xs text-slate-400 font-mono text-center sm:text-right">
            © 2026 Abhishek Vishwakarma. Built with clean code & modern shaders.
          </p>
        </div>
      </footer>
    </>
  );
}
