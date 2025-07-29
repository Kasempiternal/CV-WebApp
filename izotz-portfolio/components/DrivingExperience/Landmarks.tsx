'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import IurretaLHI from './buildings/IurretaLHI'
import UniversityDeusto from './buildings/UniversityDeusto'
import Ormazabal from './buildings/Ormazabal'
import Ariadna from './buildings/Ariadna'
import Tecnalia from './buildings/Tecnalia'

interface LandmarkProps {
  position: [number, number, number]
  type: 'school' | 'university' | 'industrial' | 'office' | 'research'
  name: string
  isMoving: boolean
  speed: number
}

function Landmark({ position, type, name, isMoving, speed }: LandmarkProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current && isMoving && speed > 0) {
      groupRef.current.position.z += speed * delta
      
      // Reset position when landmark goes too far past camera
      if (groupRef.current.position.z > 50) {
        groupRef.current.position.z -= 600
      }
    }
  })

  const renderBuilding = () => {
    switch (type) {
      case 'school':
        return <IurretaLHI />
      case 'university':
        return <UniversityDeusto />
      case 'industrial':
        return <Ormazabal />
      case 'office':
        return <Ariadna />
      case 'research':
        return <Tecnalia />
    }
  }

  return (
    <group ref={groupRef} position={position}>
      {renderBuilding()}
    </group>
  )
}

interface LandmarksProps {
  currentSection: number
  isMoving: boolean
  speed: number
}

export default function Landmarks({ currentSection, isMoving, speed }: LandmarksProps) {
  const landmarks = [
    { type: 'school' as const, name: 'Iurreta LHI', position: [15, 0, -50] as [number, number, number] },
    { type: 'university' as const, name: 'University of Deusto', position: [-20, 0, -150] as [number, number, number] },
    { type: 'industrial' as const, name: 'Ormazabal', position: [25, 0, -250] as [number, number, number] },
    { type: 'office' as const, name: 'Ariadna', position: [-15, 0, -350] as [number, number, number] },
    { type: 'research' as const, name: 'TECNALIA', position: [20, 0, -450] as [number, number, number] },
  ]

  return (
    <>
      {landmarks.map((landmark, index) => (
        <Landmark
          key={index}
          position={landmark.position}
          type={landmark.type}
          name={landmark.name}
          isMoving={isMoving}
          speed={speed}
        />
      ))}
    </>
  )
}