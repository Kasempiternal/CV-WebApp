'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Text, Billboard, Float } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

interface ArrivalNotification3DProps {
  title: string
  subtitle: string
  visible: boolean
  theme: 'day' | 'sunset' | 'night'
}

export default function ArrivalNotification3D({ 
  title, 
  subtitle, 
  visible, 
  theme 
}: ArrivalNotification3DProps) {
  // const { camera } = useThree() // Reserved for future use
  const [showSubtitle, setShowSubtitle] = useState(false)

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setShowSubtitle(true), 500)
      return () => clearTimeout(timer)
    } else {
      setShowSubtitle(false)
    }
  }, [visible])

  const mainTextSpring = useSpring({
    scale: visible ? 1 : 0,
    positionY: visible ? 3 : -2,
    opacity: visible ? 1 : 0,
    rotation: visible ? [0, 0, 0] : [0, Math.PI, 0],
    config: { mass: 1, tension: 180, friction: 26 }
  })

  const subtitleSpring = useSpring({
    scale: showSubtitle ? 0.7 : 0,
    opacity: showSubtitle ? 0.8 : 0,
    positionY: showSubtitle ? 1.8 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  })

  const getThemeColors = () => {
    switch (theme) {
      case 'night':
        return { main: '#00ff88', glow: '#00ff88', outline: '#005533' }
      case 'sunset':
        return { main: '#ff6b35', glow: '#ff9558', outline: '#cc4422' }
      default:
        return { main: '#ffffff', glow: '#ffffff', outline: '#000000' }
    }
  }

  const colors = getThemeColors()

  return (
    <group position={[0, 0, -8]}>
      {/* Main title - emerging from ground */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <animated.group 
            position-y={mainTextSpring.positionY} 
            scale={mainTextSpring.scale}
            rotation={mainTextSpring.rotation}
          >
            <Text
              fontSize={1.2}
              color={colors.main}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.04}
              outlineColor={colors.outline}
              letterSpacing={0.05}
              font="/fonts/Inter-Bold.woff"
            >
              {title}
              <animated.meshStandardMaterial
                metalness={0.3}
                roughness={0.4}
                emissive={colors.glow}
                emissiveIntensity={0.3}
                opacity={mainTextSpring.opacity}
                transparent
              />
            </Text>
            
            {/* Shadow under text */}
            <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[8, 2]} />
              <animated.shadowMaterial 
                opacity={mainTextSpring.opacity.to(o => o * 0.3)}
              />
            </mesh>
          </animated.group>
        </Float>
      </Billboard>

      {/* Subtitle */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <animated.group 
          position-y={subtitleSpring.positionY}
          scale={subtitleSpring.scale}
        >
          <Text
            fontSize={0.6}
            color={colors.main}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.02}
            font="/fonts/Inter-Regular.woff"
          >
            {subtitle}
            <animated.meshStandardMaterial
              color={colors.main}
              opacity={subtitleSpring.opacity}
              transparent
            />
          </Text>
        </animated.group>
      </Billboard>

      {/* Particle effect on appearance */}
      {visible && (
        <ParticleEffect position={[0, 2, 0]} theme={theme} />
      )}
    </group>
  )
}

// Particle burst effect when text appears
function ParticleEffect({ position, theme }: { position: [number, number, number], theme: string }) {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 50
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const radius = Math.random() * 0.5
      
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = Math.sin(angle) * radius
      
      velocities[i * 3] = Math.cos(angle) * 2
      velocities[i * 3 + 1] = Math.random() * 3 + 1
      velocities[i * 3 + 2] = Math.sin(angle) * 2
    }
    
    return { positions, velocities }
  }, [])

  const { opacity } = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: { duration: 2000 }
  })

  useFrame((state, delta) => {
    if (!particlesRef.current) return
    
    const positions = particlesRef.current.geometry.attributes.position.array
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += particles.velocities[i * 3] * delta
      positions[i * 3 + 1] += particles.velocities[i * 3 + 1] * delta
      positions[i * 3 + 2] += particles.velocities[i * 3 + 2] * delta
      
      particles.velocities[i * 3 + 1] -= 4 * delta // gravity
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  const color = theme === 'night' ? '#00ff88' : theme === 'sunset' ? '#ff6b35' : '#ffffff'

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <animated.pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}