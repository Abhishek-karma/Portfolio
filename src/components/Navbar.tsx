import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#about" className="nav-logo" onClick={(e) => handleClick(e, '#about')}>
          <div className="nav-logo-orb">AV</div>
          <span>Abhishek Vishwakarma</span>
        </a>

        <nav>
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.name}>
                <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <a href="https://github.com/Abhishek-karma" target="_blank" rel="noopener noreferrer" className="nav-social inline-flex items-center justify-center" aria-label="GitHub"><GithubIcon size={18} /></a>
          <a href="https://linkedin.com/in/AbhishekVishwakarma" target="_blank" rel="noopener noreferrer" className="nav-social inline-flex items-center justify-center" aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
          <a href="/resume.pdf" download className="nav-resume inline-flex items-center gap-1.5">Resume <Download size={14} /></a>
        </div>

        <button className="nav-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button>
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="mobile-link" onClick={(e) => handleClick(e, link.href)}>
                {link.name}
              </a>
            ))}
            <div className="mobile-actions">
              <a href="/resume.pdf" download className="nav-resume" style={{ width: '100%', textAlign: 'center', display: 'block' }}>Download Resume</a>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12 }}>
                <a href="https://github.com/Abhishek-karma" target="_blank" rel="noopener noreferrer" className="nav-social inline-flex items-center justify-center" aria-label="GitHub"><GithubIcon size={20} /></a>
                <a href="https://linkedin.com/in/AbhishekVishwakarma" target="_blank" rel="noopener noreferrer" className="nav-social inline-flex items-center justify-center" aria-label="LinkedIn"><LinkedinIcon size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
