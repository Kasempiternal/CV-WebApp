'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import CarInterior from './CarInterior'
import ScrollableRoad from './ScrollableRoad'
import Environment from './Environment'
import Landmarks from './Landmarks'
import ArrivalNotification3D from './ArrivalNotification3D'
import Weather from './Weather'
import RoadsideElements from './RoadsideElements'
import { Suspense, useState, useEffect } from 'react'

const timelineData = [
  {
    title: "Starting Point",
    subtitle: "Ready to Begin",
    description: "Scroll to start your journey through my career",
    theme: "day" as const,
  },
  {
    title: "Technical Foundation",
    subtitle: "2016 - 2018",
    description: "Higher Technician in Computer Software Engineering at Iurreta LHI",
    theme: "day" as const,
  },
  {
    title: "University Years",
    subtitle: "2018 - 2023",
    description: "Bachelor's in Computer Engineering at University of Deusto",
    theme: "day" as const,
  },
  {
    title: "Industrial Experience",
    subtitle: "2021 - 2023",
    description: "Frontend Developer at Ormazabal - Industrial Systems",
    theme: "sunset" as const,
  },
  {
    title: "Software Engineering",
    subtitle: "2023 - 2024",
    description: "Software Engineer at Ariadna - Modern Development",
    theme: "sunset" as const,
  },
  {
    title: "Research & Innovation",
    subtitle: "2024 - Present",
    description: "Junior Researcher at TECNALIA - Computer Vision & AI",
    theme: "night" as const,
  },
]

function Scene({ currentSection, isMoving, speed }: { currentSection: number; isMoving: boolean; speed: number }) {
  const currentData = timelineData[currentSection] || timelineData[0]
  const [showArrival, setShowArrival] = useState(false)

  useEffect(() => {
    if (currentSection > 0 && !isMoving) {
      setShowArrival(true)
      const timer = setTimeout(() => setShowArrival(false), 3000)
      return () => clearTimeout(timer)
    } else {
      setShowArrival(false)
    }
  }, [currentSection, isMoving])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={currentData.theme === 'night' ? 0.4 : 0.7} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={currentData.theme === 'night' ? 0.5 : 1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Interior lighting */}
      <pointLight position={[0, 0.5, 0]} intensity={0.3} color="#fff5e6" />
      
      {/* Dashboard glow */}
      <spotLight
        position={[0, 0.2, -1]}
        target-position={[0, -0.3, -1.5]}
        angle={0.6}
        penumbra={0.5}
        intensity={0.2}
        color="#4a90e2"
      />

      {/* Camera setup for driver's view - positioned at natural eye level */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0.65, -0.3]}
        rotation={[-0.12, 0, 0]}
        fov={80}
      />

      {/* Scene components */}
      <Environment theme={currentData.theme} isMoving={isMoving} speed={speed} />
      <Weather theme={currentData.theme} />
      <Landmarks currentSection={currentSection} isMoving={isMoving} speed={speed} />
      <RoadsideElements isMoving={isMoving} speed={speed} theme={currentData.theme} />
      <CarInterior />
      
      {/* 3D Arrival Notification */}
      <ArrivalNotification3D
        title={currentData.title}
        subtitle={currentData.subtitle}
        visible={showArrival}
        theme={currentData.theme}
      />
    </>
  )
}

export default function DrivingScene() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const [canScroll, setCanScroll] = useState(true)
  const [speed, setSpeed] = useState(0)

  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault()
      
      if (canScroll && !isMoving && currentSection < timelineData.length - 1) {
        setCurrentSection(prev => prev + 1)
        setIsMoving(true)
        setCanScroll(false)
        
        // Re-enable scrolling after animation completes
        setTimeout(() => {
          setIsMoving(false)
          setCanScroll(true)
        }, 5000)
      }
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    window.addEventListener('touchmove', handleScroll, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [canScroll, isMoving, currentSection])

  const handleMovementComplete = () => {
    setIsMoving(false)
    setCanScroll(true)
  }

  const currentData = timelineData[currentSection] || timelineData[0]

  return (
    <>
      {/* Fixed viewport */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden">
        <Canvas shadows>
          <Suspense fallback={null}>
            <Scene currentSection={currentSection} isMoving={isMoving} speed={speed} />
            <ScrollableRoad 
              isMoving={isMoving} 
              onMovementComplete={handleMovementComplete}
              onSpeedChange={setSpeed}
            />
          </Suspense>
        </Canvas>

        {/* Overlay UI */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Timeline indicator */}
          <div className="absolute top-10 left-10 text-white max-w-md">
            <h2 className="text-3xl font-bold mb-2">{currentData.title}</h2>
            <p className="text-xl mb-1">{currentData.subtitle}</p>
            <p className="text-sm opacity-80">{currentData.description}</p>
          </div>

          {/* Speed indicator */}
          <div className="absolute bottom-10 left-10 text-white">
            <div className="text-4xl font-bold">{Math.round(speed * 4)}</div>
            <div className="text-sm">km/h</div>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-10 right-10 text-white">
            <div className="flex gap-2">
              {timelineData.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSection ? 'bg-white w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="text-sm opacity-70">
              {currentSection === 0 
                ? 'Scroll to begin your journey' 
                : currentSection === timelineData.length - 1
                ? 'Journey complete!'
                : isMoving 
                ? 'Traveling to next destination...'
                : 'Scroll to continue'}
            </p>
          </div>

          {/* Arrival notification - now handled by 3D component */}
        </div>
      </div>
    </>
  )
}