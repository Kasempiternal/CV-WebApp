'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Plane } from '@react-three/drei'
import * as THREE from 'three'

interface EnvironmentProps {
  theme?: 'day' | 'sunset' | 'night'
  isMoving?: boolean
  speed?: number
}

export default function Environment({ theme = 'day', isMoving = false, speed = 0 }: EnvironmentProps) {
  const cloudsRef = useRef<THREE.Group>(null)
  const treesRef = useRef<THREE.Group>(null)
  const mountainsRef = useRef<THREE.Group>(null)
  const bushesRef = useRef<THREE.Group>(null)

  const skyColors = {
    day: '#87CEEB',
    sunset: '#FF6B6B',
    night: '#191970'
  }

  const fogColors = {
    day: '#e0e0e0',
    sunset: '#ff9999',
    night: '#333366'
  }

  // Parallax movement - different speeds for different depth layers
  useFrame((state, delta) => {
    if (isMoving && speed > 0) {
      // Mountains move slowest (furthest back) - 20% of road speed
      if (mountainsRef.current) {
        mountainsRef.current.position.z += speed * delta * 0.2
        
        // Reset position when mountains go too far
        if (mountainsRef.current.position.z > 100) {
          mountainsRef.current.position.z -= 200
        }
      }

      // Trees move at medium speed - 60% of road speed
      if (treesRef.current) {
        treesRef.current.position.z += speed * delta * 0.6
        
        // Reset position when trees go too far
        if (treesRef.current.position.z > 100) {
          treesRef.current.position.z -= 200
        }
      }

      // Clouds move slowest - 10% of road speed
      if (cloudsRef.current) {
        cloudsRef.current.position.z += speed * delta * 0.1
        
        // Reset position when clouds go too far
        if (cloudsRef.current.position.z > 60) {
          cloudsRef.current.position.z -= 120
        }
      }

      // Bushes move fast (closest to road) - 80% of road speed
      if (bushesRef.current) {
        bushesRef.current.position.z += speed * delta * 0.8
        
        // Reset position when bushes go too far
        if (bushesRef.current.position.z > 50) {
          bushesRef.current.position.z -= 100
        }
      }
    }
  })

  return (
    <>
      {/* Sky */}
      <Plane args={[200, 100]} position={[0, 30, -50]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color={skyColors[theme]} />
      </Plane>

      {/* Mountains (far background) */}
      <group ref={mountainsRef}>
        {[-60, -30, 30, 60].map((x, i) => (
          <mesh key={`mountain-${i}`} position={[x, -5, -80]}>
            <coneGeometry args={[20, 30, 4]} />
            <meshStandardMaterial 
              color="#4a5568" 
              fog={true}
            />
          </mesh>
        ))}
      </group>

      {/* Trees (mid-ground) */}
      <group ref={treesRef}>
        {Array.from({ length: 40 }).map((_, i) => {
          const side = i % 2 === 0 ? -1 : 1
          const x = side * (8 + Math.random() * 12)
          const z = -100 + (i % 20) * 10
          const treeHeight = 5 + Math.random() * 2
          return (
            <group key={`tree-${i}`} position={[x, -1, z]}>
              {/* Tree trunk */}
              <Box args={[0.8, treeHeight, 0.8]} position={[0, treeHeight/2, 0]}>
                <meshStandardMaterial color="#4a2c17" />
              </Box>
              {/* Tree foliage */}
              <mesh position={[0, treeHeight + 2, 0]}>
                <coneGeometry args={[3, 5, 6]} />
                <meshStandardMaterial color="#228b22" />
              </mesh>
            </group>
          )
        })}
      </group>

      {/* Bushes (foreground) */}
      <group ref={bushesRef}>
        {Array.from({ length: 30 }).map((_, i) => {
          const side = i % 2 === 0 ? -1 : 1
          const x = side * (5 + Math.random() * 3)
          const z = -50 + (i % 15) * 6.7
          const bushSize = 1 + Math.random() * 0.5
          return (
            <mesh key={`bush-${i}`} position={[x, -0.5, z]}>
              <sphereGeometry args={[bushSize, 6, 5]} />
              <meshStandardMaterial color="#2d5016" />
            </mesh>
          )
        })}
      </group>

      {/* Clouds */}
      <group ref={cloudsRef}>
        {Array.from({ length: 8 }).map((_, i) => (
          <group
            key={`cloud-${i}`}
            position={[
              (Math.random() - 0.5) * 60,
              15 + Math.random() * 10,
              -50 + i * 12
            ]}
          >
            {[0, 0.8, -0.8].map((offset, j) => (
              <mesh key={`cloud-part-${j}`} position={[offset, 0, 0]}>
                <sphereGeometry args={[1.5, 8, 6]} />
                <meshBasicMaterial color="white" opacity={0.8} transparent />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Bushes (foreground) */}
      <group ref={bushesRef}>
        {Array.from({ length: 15 }).map((_, i) => {
          const side = i % 2 === 0 ? -1 : 1
          const x = side * (4 + Math.random() * 3)
          const z = -50 + i * 7
          return (
            <group key={`bush-${i}`} position={[x, -1, z]}>
              <mesh>
                <sphereGeometry args={[1.2 + Math.random() * 0.5, 8, 6]} />
                <meshStandardMaterial color="#2d5a2d" />
              </mesh>
              <mesh position={[0.5, 0, 0]}>
                <sphereGeometry args={[0.8, 6, 4]} />
                <meshStandardMaterial color="#3a6b3a" />
              </mesh>
            </group>
          )
        })}
      </group>

      {/* Ground */}
      <Plane args={[200, 200]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
        <meshStandardMaterial color="#3a5f3a" />
      </Plane>

      {/* Fog effect */}
      <fog attach="fog" args={[fogColors[theme], 20, 80]} />
    </>
  )
}