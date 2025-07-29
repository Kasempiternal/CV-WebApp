'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'

function StarField() {
  const ref = useRef<THREE.Points>(null)
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#82aaff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>
    </div>
  )
}