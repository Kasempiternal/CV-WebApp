'use client'

import { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

interface ScrollControllerProps {
  onScroll: (progress: number) => void
  sections: number
}

export function useScrollProgress(sections: number) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = Math.min(currentScroll / scrollHeight, 1)
      
      setScrollProgress(progress)
      setCurrentSection(Math.floor(progress * sections))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return { scrollProgress, currentSection }
}

export default function ScrollController({ sections = 5 }: { sections?: number }) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ height: `${sections * 100}vh` }}
    />
  )
}