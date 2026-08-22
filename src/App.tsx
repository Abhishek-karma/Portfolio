import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import ParticleGrid from './components/3d/ParticleGrid'

function App() {
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* Ambient Radial Glow Spotlights */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          background: `
            radial-gradient(circle at 10% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(139, 92, 246, 0.07) 0%, transparent 45%)
          `
        }} 
      />

      {/* Faint Dot Matrix Grid Overlay */}
      <div className="fixed inset-0 bg-dot-grid z-0 pointer-events-none opacity-60" />

      {/* Particle Background */}
      <ParticleGrid />

      {/* Main Layout Layer */}
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          
          <section className="relative">
            <Skills />
          </section>
          
          <section className="relative">
            <Experience />
          </section>
          
          <section className="relative">
            <Projects />
          </section>
          
          <section className="relative">
            <Education />
          </section>
          
          <section className="relative">
            <Contact />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
