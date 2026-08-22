import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from './ui/SocialIcons';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3 bg-obsidian/80 backdrop-blur-md border-b border-glass-border' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 relative group cursor-pointer">
          <span className="text-2xl font-bold tracking-tighter text-platinum">AV.</span>
          <span className="pulse-dot w-2 h-2 rounded-full bg-cyan-accent relative group-hover:bg-violet-accent transition-colors">
            <span className="absolute -top-10 -left-16 whitespace-nowrap bg-slate-black/90 text-xs text-platinum py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity border border-glass-border">
              Open to high-impact roles
            </span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-muted-slate hover:text-cyan-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/Abhishek-karma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-slate hover:text-platinum transition-colors"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://linkedin.com/in/AbhishekVishwakarma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-slate hover:text-platinum transition-colors"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border text-sm font-medium text-platinum hover:bg-glass-bg hover:border-cyan-accent/50 transition-all"
          >
            <Download size={16} />
            Resume
          </a>
        </div>

        <button
          className="md:hidden text-platinum p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex justify-end"
          >
            <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-64 h-full bg-slate-black border-l border-glass-border p-6 flex flex-col shadow-2xl">
              <button
                className="absolute top-6 right-6 text-platinum"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
              
              <div className="mt-16 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-lg font-medium text-platinum hover:text-cyan-accent transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-6">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent font-medium"
                >
                  <Download size={18} />
                  Download Resume
                </a>
                <div className="flex items-center gap-6 justify-center">
                  <a href="https://github.com/Abhishek-karma" target="_blank" rel="noopener noreferrer" className="text-muted-slate hover:text-platinum">
                    <GithubIcon size={24} />
                  </a>
                  <a href="https://linkedin.com/in/AbhishekVishwakarma" target="_blank" rel="noopener noreferrer" className="text-muted-slate hover:text-platinum">
                    <LinkedinIcon size={24} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
