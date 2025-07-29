import Hero from '@/components/sections/Hero'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import WorkShowcase from '@/components/sections/WorkShowcase'
import Skills from '@/components/sections/Skills'
import Interests from '@/components/sections/Interests'
import Contact from '@/components/sections/Contact'
import Navigation from '@/components/Navigation'

export default function ClassicPortfolio() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen">
        <Hero />
        <Experience />
        <Education />
        <WorkShowcase />
        <Skills />
        <Interests />
        <Contact />
      </main>
    </>
  )
}