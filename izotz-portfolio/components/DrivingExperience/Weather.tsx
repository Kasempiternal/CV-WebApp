'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Points, PointMaterial } from '@react-three/drei'

interface WeatherProps {
  theme: 'day' | 'sunset' | 'night'
  intensity?: number
}

export default function Weather({ theme, intensity = 1 }: WeatherProps) {
  const rainRef = useRef<THREE.Points>(null)
  const fogRef = useRef<THREE.Mesh>(null)
  
  // Rain particles
  const rainParticles = useMemo(() => {
    const particleCount = theme === 'night' ? 2000 : theme === 'sunset' ? 1000 : 500
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      // Spread particles across the scene
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = Math.random() * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
      
      // Random fall speeds
      velocities[i] = 0.5 + Math.random() * 0.5
    }
    
    return { positions, velocities, count: particleCount }
  }, [theme])
  
  // Animate rain
  useFrame((state, delta) => {
    if (rainRef.current && theme === 'night') {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < rainParticles.count; i++) {
        // Move particles down
        positions[i * 3 + 1] -= rainParticles.velocities[i] * delta * 20
        
        // Reset position when particle falls below ground
        if (positions[i * 3 + 1] < -1) {
          positions[i * 3 + 1] = 50
          positions[i * 3] = (Math.random() - 0.5) * 100
          positions[i * 3 + 2] = (Math.random() - 0.5) * 100
        }
      }
      
      rainRef.current.geometry.attributes.position.needsUpdate = true
    }
    
    // Animate fog opacity
    if (fogRef.current) {
      const material = fogRef.current.material as THREE.MeshBasicMaterial
      material.opacity = theme === 'sunset' ? 0.3 : theme === 'night' ? 0.2 : 0.1
    }
  })
  
  // Cloud particles for fog effect
  const cloudPositions = useMemo(() => {
    const count = 50
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = Math.random() * 10 + 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    
    return positions
  }, [])
  
  return (
    <>
      {/* Rain effect - more intense at night */}
      {theme === 'night' && (
        <Points ref={rainRef} positions={rainParticles.positions} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#4fc3f7"
            size={0.1}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.6}
          />
        </Points>
      )}
      
      {/* Fog/mist effect - varies by time */}
      <group>
        {/* Low-lying fog */}
        <mesh ref={fogRef} position={[0, 2, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial
            color={theme === 'sunset' ? '#ff9800' : '#ffffff'}
            transparent
            opacity={theme === 'sunset' ? 0.3 : 0.1}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        
        {/* Volumetric fog clouds */}
        <Points positions={cloudPositions} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color={theme === 'sunset' ? '#ff6b6b' : '#e0e0e0'}
            size={8}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={theme === 'sunset' ? 0.4 : theme === 'night' ? 0.3 : 0.2}
          />
        </Points>
      </group>
      
      {/* Lightning effect for night storms */}
      {theme === 'night' && Math.random() > 0.995 && (
        <mesh position={[0, 30, -20]}>
          <planeGeometry args={[100, 50]} />
          <meshBasicMaterial
            color="#ffffff"
            emissive="#87ceeb"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Dynamic weather particles */}
      <DynamicParticles theme={theme} />
    </>
  )
}

// Additional atmospheric particles
function DynamicParticles({ theme }: { theme: 'day' | 'sunset' | 'night' }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const count = theme === 'day' ? 100 : 200
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = Math.random() * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      scales[i] = Math.random()
    }
    
    return { positions, scales, count }
  }, [theme])
  
  useFrame((state, delta) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      
      // Floating particles
      for (let i = 0; i < particles.count; i++) {
        const time = state.clock.elapsedTime
        
        // Gentle floating motion
        positions[i * 3 + 1] += Math.sin(time + i) * delta * 0.1
        positions[i * 3] += Math.cos(time + i) * delta * 0.05
        
        // Wrap around
        if (positions[i * 3 + 1] > 25) positions[i * 3 + 1] = 0
        if (Math.abs(positions[i * 3]) > 25) positions[i * 3] *= -0.9
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.rotation.y += delta * 0.02
    }
  })
  
  const particleColor = theme === 'day' ? '#ffffff' : theme === 'sunset' ? '#ffeb3b' : '#64b5f6'
  
  return (
    <Points ref={particlesRef} positions={particles.positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={particleColor}
        size={theme === 'day' ? 0.05 : 0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={theme === 'day' ? 0.3 : 0.5}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}