'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, Text } from '@react-three/drei'
import * as THREE from 'three'

interface RoadsideElementsProps {
  isMoving: boolean
  speed: number
  theme: 'day' | 'sunset' | 'night'
}

export default function RoadsideElements({ isMoving, speed, theme }: RoadsideElementsProps) {
  const elementsRef = useRef<THREE.Group>(null)
  
  useFrame((state, delta) => {
    if (elementsRef.current && isMoving && speed > 0) {
      elementsRef.current.position.z += speed * delta * 0.9 // Slightly slower than road
      
      // Reset position when elements go too far
      if (elementsRef.current.position.z > 100) {
        elementsRef.current.position.z -= 200
      }
    }
  })
  
  const lightIntensity = theme === 'night' ? 1 : theme === 'sunset' ? 0.5 : 0
  
  return (
    <group ref={elementsRef}>
      {/* Street lights */}
      {Array.from({ length: 20 }).map((_, i) => {
        const side = i % 2 === 0 ? -1 : 1
        const z = -100 + i * 10
        
        return (
          <group key={`light-${i}`} position={[side * 6, 0, z]}>
            {/* Light pole */}
            <Cylinder args={[0.15, 0.2, 6]} position={[0, 3, 0]}>
              <meshStandardMaterial color="#4b5563" metalness={0.8} />
            </Cylinder>
            
            {/* Light arm */}
            <Box args={[1.5, 0.1, 0.1]} position={[side * -0.75, 5.8, 0]}>
              <meshStandardMaterial color="#4b5563" metalness={0.8} />
            </Box>
            
            {/* Light fixture */}
            <group position={[side * -1.5, 5.5, 0]}>
              <Box args={[0.5, 0.3, 0.3]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#374151" />
              </Box>
              
              {/* Light emission */}
              {lightIntensity > 0 && (
                <>
                  <mesh position={[0, -0.2, 0]}>
                    <coneGeometry args={[0.8, 2, 8]} />
                    <meshBasicMaterial
                      color="#fef3c7"
                      transparent
                      opacity={lightIntensity * 0.3}
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                  <pointLight
                    position={[0, -0.2, 0]}
                    color="#fbbf24"
                    intensity={lightIntensity * 0.5}
                    distance={15}
                  />
                </>
              )}
            </group>
          </group>
        )
      })}
      
      {/* Road signs */}
      {[
        { z: -80, text: 'Deusto 2km', color: '#16a34a' },
        { z: -60, text: 'Speed Limit 80', color: '#dc2626' },
        { z: -40, text: 'Ormazabal Exit', color: '#2563eb' },
        { z: -20, text: 'Research Park →', color: '#16a34a' },
        { z: 0, text: 'TECNALIA 1km', color: '#2563eb' }
      ].map((sign, i) => (
        <group key={`sign-${i}`} position={[8, 0, sign.z]}>
          {/* Sign pole */}
          <Cylinder args={[0.1, 0.1, 3]} position={[0, 1.5, 0]}>
            <meshStandardMaterial color="#6b7280" metalness={0.7} />
          </Cylinder>
          
          {/* Sign board */}
          <group position={[0, 3.5, 0]}>
            <Box args={[3, 1, 0.1]} position={[0, 0, 0]}>
              <meshStandardMaterial color={sign.color} />
            </Box>
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {sign.text}
            </Text>
          </group>
        </group>
      ))}
      
      {/* Guard rails */}
      {Array.from({ length: 15 }).map((_, i) => (
        <group key={`rail-${i}`}>
          <Box args={[0.1, 0.5, 4]} position={[-5, 0.25, -90 + i * 12]}>
            <meshStandardMaterial color="#9ca3af" metalness={0.9} />
          </Box>
          <Box args={[0.1, 0.5, 4]} position={[5, 0.25, -90 + i * 12]}>
            <meshStandardMaterial color="#9ca3af" metalness={0.9} />
          </Box>
        </group>
      ))}
      
      {/* Milestone markers */}
      {[0, 25, 50, 75].map((km) => (
        <group key={`milestone-${km}`} position={[4.5, 0, -km]}>
          <Cylinder args={[0.3, 0.3, 1]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="#f3f4f6" />
          </Cylinder>
          <Text
            position={[0, 0.5, 0.31]}
            fontSize={0.2}
            color="#1f2937"
            anchorX="center"
            anchorY="middle"
          >
            {`KM ${km}`}
          </Text>
        </group>
      ))}
      
      {/* Emergency phone boxes */}
      {[-50, 0, 50].map((z) => (
        <group key={`sos-${z}`} position={[-7, 0, z]}>
          <Box args={[0.5, 1.5, 0.5]} position={[0, 0.75, 0]}>
            <meshStandardMaterial color="#ef4444" />
          </Box>
          <Text
            position={[0, 1.2, 0.26]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            SOS
          </Text>
        </group>
      ))}
      
      {/* Reflective road markers */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Box
          key={`marker-${i}`}
          args={[0.1, 0.05, 0.1]}
          position={[i % 2 === 0 ? -3.5 : 3.5, 0.02, -100 + i * 4]}
        >
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={theme === 'night' ? 0.8 : 0.2}
          />
        </Box>
      ))}
    </group>
  )
}