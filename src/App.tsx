import { useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeSection from './components/Marquee';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null);

  /* Cursor glow */
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Global scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const d = parseFloat(el.style.transitionDelay || '0') * 1000;
          setTimeout(() => el.classList.add('visible'), d);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

    const t = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }, 100);

    return () => { clearTimeout(t); obs.disconnect(); };
  }, []);

  return (
    <>
      <div className="cursor-glow" ref={cursorRef} />
      <Navbar />
      <Analytics />
      <main className="bg-bg">
        <Hero />
        <MarqueeSection />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <ChatWidget />
    </>
  );
}
