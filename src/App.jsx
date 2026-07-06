import { useEffect, useState } from 'react'
import CustomCursor from './components/CustomCursor'
import Snow from './components/Snow'
import Nav from './components/Nav'
import ScrollRail from './components/ScrollRail'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Experience from './components/Experience'
import Skills from './components/Skills'
import LeetCode from './components/LeetCode'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { SECTIONS } from './data/content'

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')

  // observe sections to drive the nav + scroll rail
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="grain">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[110] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:text-xs focus:rounded-full"
      >
        Skip to content
      </a>
      <Snow />
      <CustomCursor />
      <Nav activeSection={activeSection} />
      <ScrollRail activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Skills />
        <LeetCode />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
