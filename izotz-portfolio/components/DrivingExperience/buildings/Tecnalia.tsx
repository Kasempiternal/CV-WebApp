'use client'

import { Box, Cylinder, Sphere, Ring, Text } from '@react-three/drei'
import * as THREE from 'three'

export default function Tecnalia() {
  return (
    <group>
      {/* Futuristic main research building */}
      <group>
        {/* Central cylindrical tower */}
        <Cylinder args={[8, 6, 25]} position={[0, 12.5, 0]}>
          <meshStandardMaterial 
            color="#e0f2fe" 
            metalness={0.7} 
            roughness={0.2}
          />
        </Cylinder>
        
        {/* Curved wing sections */}
        <group>
          {/* Left wing */}
          <Box args={[15, 15, 10]} position={[-12, 7.5, 0]}>
            <meshStandardMaterial color="#f0f9ff" />
          </Box>
          {/* Curved connector */}
          <Cylinder args={[10, 10, 8, 16, 1, false, 0, Math.PI/2]} position={[-6, 7.5, 0]} rotation={[Math.PI/2, 0, Math.PI/2]}>
            <meshStandardMaterial color="#e0f2fe" metalness={0.6} />
          </Cylinder>
          
          {/* Right wing */}
          <Box args={[15, 15, 10]} position={[12, 7.5, 0]}>
            <meshStandardMaterial color="#f0f9ff" />
          </Box>
          {/* Curved connector */}
          <Cylinder args={[10, 10, 8, 16, 1, false, Math.PI/2, Math.PI/2]} position={[6, 7.5, 0]} rotation={[Math.PI/2, 0, Math.PI/2]}>
            <meshStandardMaterial color="#e0f2fe" metalness={0.6} />
          </Cylinder>
        </group>
      </group>

      {/* Glass atrium and solar features */}
      <group>
        {/* Central glass atrium */}
        <Cylinder args={[7.5, 7.5, 24, 32, 1, true]} position={[0, 12, 0]}>
          <meshStandardMaterial 
            color="#0ea5e9" 
            metalness={0.95} 
            roughness={0.05}
            opacity={0.7}
            transparent
            side={THREE.DoubleSide}
          />
        </Cylinder>
        
        {/* Spiral glass panels */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const height = 5 + i * 2
          return (
            <Box 
              key={`spiral-${i}`} 
              args={[0.2, 3, 4]} 
              position={[
                Math.cos(angle) * 7,
                height,
                Math.sin(angle) * 7
              ]}
              rotation={[0, -angle, Math.PI / 12]}
            >
              <meshStandardMaterial 
                color="#38bdf8" 
                metalness={0.9} 
                roughness={0.1}
                opacity={0.8}
                transparent
              />
            </Box>
          )
        })}
      </group>

      {/* Advanced solar collection system */}
      <group position={[0, 25, 0]}>
        {/* Rotating solar collector ring */}
        <Ring args={[6, 8, 32]} rotation={[Math.PI / 6, 0, 0]}>
          <meshStandardMaterial 
            color="#0c4a6e" 
            metalness={0.95} 
            roughness={0.05}
            emissive="#0284c7"
            emissiveIntensity={0.2}
          />
        </Ring>
        
        {/* Central energy core */}
        <Sphere args={[2, 16, 16]} position={[0, 2, 0]}>
          <meshStandardMaterial 
            color="#7dd3fc" 
            metalness={0.8} 
            roughness={0.1}
            emissive="#0ea5e9"
            emissiveIntensity={0.5}
          />
        </Sphere>
        
        {/* Solar panel arrays */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2
          return (
            <Box 
              key={`solar-${i}`} 
              args={[4, 0.1, 6]} 
              position={[
                Math.cos(angle) * 10,
                0,
                Math.sin(angle) * 10
              ]}
              rotation={[Math.PI / 8, angle, 0]}
            >
              <meshStandardMaterial 
                color="#075985" 
                metalness={0.9} 
                roughness={0.1}
              />
            </Box>
          )
        })}
      </group>

      {/* Laboratory wings with unique architecture */}
      <group>
        {/* Bio-research pod */}
        <group position={[-20, 0, -8]}>
          <Sphere args={[6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, 6, 0]}>
            <meshStandardMaterial 
              color="#dcfce7" 
              metalness={0.4} 
              roughness={0.3}
              opacity={0.9}
              transparent
            />
          </Sphere>
          <Cylinder args={[6, 6, 1]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="#86efac" />
          </Cylinder>
        </group>
        
        {/* AI research cube */}
        <group position={[20, 0, -8]}>
          <Box args={[10, 10, 10]} position={[0, 5, 0]}>
            <meshStandardMaterial color="#ddd6fe" metalness={0.6} />
          </Box>
          {/* Holographic panels */}
          {[0, 1, 2, 3].map((face) => (
            <Box 
              key={`holo-${face}`} 
              args={[9.5, 9.5, 0.1]} 
              position={[
                face === 0 ? 0 : face === 2 ? 0 : face === 1 ? 5.05 : -5.05,
                5,
                face === 1 ? 0 : face === 3 ? 0 : face === 0 ? 5.05 : -5.05
              ]}
              rotation={[0, face === 1 ? Math.PI/2 : face === 3 ? -Math.PI/2 : 0, 0]}
            >
              <meshStandardMaterial 
                color="#a78bfa" 
                metalness={0.8} 
                roughness={0.1}
                opacity={0.7}
                transparent
                emissive="#8b5cf6"
                emissiveIntensity={0.3}
              />
            </Box>
          ))}
        </group>
      </group>

      {/* Futuristic entrance plaza */}
      <group position={[0, 0, 12]}>
        {/* Floating pathway */}
        <Box args={[5, 0.3, 15]} position={[0, 0.5, 0]}>
          <meshStandardMaterial 
            color="#f1f5f9" 
            metalness={0.5} 
            roughness={0.2}
          />
        </Box>
        
        {/* Light pillars */}
        {[-2, 2].map((x) => 
          [...Array(5)].map((_, i) => (
            <Cylinder 
              key={`pillar-${x}-${i}`} 
              args={[0.3, 0.3, 3]} 
              position={[x, 1.5, -6 + i * 3]}
            >
              <meshStandardMaterial 
                color="#ffffff" 
                emissive="#3b82f6" 
                emissiveIntensity={0.8}
              />
            </Cylinder>
          ))
        )}
      </group>

      {/* Research display screens */}
      <group position={[0, 8, 8]}>
        {/* Main display */}
        <Box args={[12, 6, 0.2]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#0f172a" 
            emissive="#0ea5e9" 
            emissiveIntensity={0.2}
          />
        </Box>
        {/* Screen frame */}
        <Box args={[12.5, 6.5, 0.1]} position={[0, 0, -0.1]}>
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </Box>
      </group>

      {/* TECNALIA branding */}
      <group position={[0, 20, 8.5]}>
        <Text position={[0, 0, 0]} fontSize={2} color="#0284c7">
          TECNALIA
        </Text>
        <Text position={[0, -1.5, 0]} fontSize={0.7} color="#0ea5e9">
          Research & Technological Development
        </Text>
        <Text position={[0, -2.3, 0]} fontSize={0.5} color="#7dd3fc">
          Computer Vision • AI • Innovation
        </Text>
      </group>

      {/* Futuristic landscaping */}
      <group>
        {/* Main plaza */}
        <Box args={[50, 0.1, 35]} position={[0, -0.05, 0]}>
          <meshStandardMaterial color="#f8fafc" />
        </Box>
        
        {/* Energy pathways (glowing strips) */}
        {[-15, -5, 5, 15].map((x) => (
          <Box key={`path-${x}`} args={[0.5, 0.01, 30]} position={[x, 0.05, 0]}>
            <meshStandardMaterial 
              color="#3b82f6" 
              emissive="#60a5fa" 
              emissiveIntensity={0.6}
            />
          </Box>
        ))}
        
        {/* Quantum garden spheres */}
        {[
          [-18, 10], [18, 10], [-18, -10], [18, -10]
        ].map(([x, z], i) => (
          <group key={`garden-${i}`} position={[x, 0, z]}>
            <Sphere args={[2, 16, 16]} position={[0, 2, 0]}>
              <meshStandardMaterial 
                color="#86efac" 
                metalness={0.3} 
                roughness={0.4}
                opacity={0.8}
                transparent
              />
            </Sphere>
            <Ring args={[2.5, 3, 32]} position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial 
                color="#22c55e" 
                emissive="#86efac" 
                emissiveIntensity={0.4}
              />
            </Ring>
          </group>
        ))}
      </group>

      {/* Particle accelerator ring (decorative) */}
      <group position={[0, 0.5, -15]}>
        <Ring args={[8, 9, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#6366f1" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#818cf8"
            emissiveIntensity={0.3}
          />
        </Ring>
      </group>
    </group>
  )
}