'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export default function CarInterior() {
  const steeringWheelRef = useRef<THREE.Group>(null)
  
  // Subtle steering wheel animation
  useFrame((state) => {
    if (steeringWheelRef.current) {
      steeringWheelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group>
      {/* Dashboard Main Body */}
      <RoundedBox args={[3.5, 0.6, 1.2]} radius={0.1} position={[0, -0.3, -1.5]}>
        <meshStandardMaterial color="#1a1a1a" />
      </RoundedBox>
      
      {/* Dashboard Top */}
      <RoundedBox args={[3.5, 0.3, 0.8]} radius={0.05} position={[0, 0.1, -1.3]}>
        <meshStandardMaterial color="#0f0f0f" />
      </RoundedBox>
      
      {/* Instrument Cluster */}
      <group position={[0, 0, -1.45]}>
        <RoundedBox args={[0.8, 0.25, 0.1]} radius={0.02}>
          <meshStandardMaterial color="#000000" />
        </RoundedBox>
        {/* Speedometer */}
        <Cylinder args={[0.08, 0.08, 0.02]} rotation={[Math.PI / 2, 0, 0]} position={[-0.2, 0, 0.06]}>
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </Cylinder>
        {/* Tachometer */}
        <Cylinder args={[0.08, 0.08, 0.02]} rotation={[Math.PI / 2, 0, 0]} position={[0.2, 0, 0.06]}>
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </Cylinder>
      </group>

      {/* Center Console */}
      <group position={[0, -0.6, -0.5]}>
        <RoundedBox args={[0.6, 0.3, 2]} radius={0.05}>
          <meshStandardMaterial color="#1a1a1a" />
        </RoundedBox>
        
        {/* Gear Shift */}
        <group position={[0, 0.2, -0.3]}>
          <Cylinder args={[0.03, 0.02, 0.15]} position={[0, 0.08, 0]}>
            <meshStandardMaterial color="#333" />
          </Cylinder>
          <Box args={[0.06, 0.04, 0.08]} position={[0, 0.17, 0]}>
            <meshStandardMaterial color="#111" />
          </Box>
        </group>
        
        {/* Cup Holders */}
        <Cylinder args={[0.04, 0.04, 0.05]} position={[-0.1, 0.15, 0.3]}>
          <meshStandardMaterial color="#000" />
        </Cylinder>
        <Cylinder args={[0.04, 0.04, 0.05]} position={[0.1, 0.15, 0.3]}>
          <meshStandardMaterial color="#000" />
        </Cylinder>
      </group>
      
      {/* Steering Wheel Assembly */}
      <group ref={steeringWheelRef} position={[0, -0.1, -1.1]} rotation={[Math.PI * 0.15, 0, 0]}>
        {/* Steering Column */}
        <Cylinder args={[0.04, 0.06, 0.3]} rotation={[Math.PI * 0.3, 0, 0]} position={[0, -0.1, 0.1]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Cylinder>
        
        {/* Wheel */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.18, 0.025, 12, 48]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
        </mesh>
        
        {/* Center hub */}
        <Cylinder args={[0.06, 0.06, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
        </Cylinder>
        
        {/* Spokes */}
        {[0, Math.PI * 0.67, Math.PI * 1.33].map((angle, i) => (
          <Box
            key={i}
            args={[0.02, 0.18, 0.03]}
            position={[
              Math.sin(angle) * 0.09,
              Math.cos(angle) * 0.09,
              0
            ]}
            rotation={[0, 0, angle]}
          >
            <meshStandardMaterial color="#0a0a0a" />
          </Box>
        ))}
      </group>

      {/* Seats */}
      <group position={[0, -0.5, 0.5]}>
        {/* Driver Seat */}
        <group position={[-0.4, 0, 0]}>
          <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.02} position={[0, -0.2, 0]}>
            <meshStandardMaterial color="#2a2a2a" />
          </RoundedBox>
          <RoundedBox args={[0.5, 0.8, 0.1]} radius={0.02} position={[0, 0.2, -0.2]} rotation={[-0.1, 0, 0]}>
            <meshStandardMaterial color="#2a2a2a" />
          </RoundedBox>
        </group>
        
        {/* Passenger Seat */}
        <group position={[0.4, 0, 0]}>
          <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.02} position={[0, -0.2, 0]}>
            <meshStandardMaterial color="#2a2a2a" />
          </RoundedBox>
          <RoundedBox args={[0.5, 0.8, 0.1]} radius={0.02} position={[0, 0.2, -0.2]} rotation={[-0.1, 0, 0]}>
            <meshStandardMaterial color="#2a2a2a" />
          </RoundedBox>
        </group>
      </group>

      {/* Windshield Frame */}
      <group>
        {/* Top */}
        <Box args={[3.6, 0.15, 0.1]} position={[0, 1.2, -2.1]}>
          <meshStandardMaterial color="#0a0a0a" />
        </Box>
        
        {/* Left A-Pillar */}
        <Box args={[0.15, 2.8, 0.15]} position={[-1.75, -0.2, -1.8]} rotation={[0.3, 0, 0.15]}>
          <meshStandardMaterial color="#0a0a0a" />
        </Box>
        
        {/* Right A-Pillar */}
        <Box args={[0.15, 2.8, 0.15]} position={[1.75, -0.2, -1.8]} rotation={[0.3, 0, -0.15]}>
          <meshStandardMaterial color="#0a0a0a" />
        </Box>
        
        {/* Bottom windshield edge */}
        <Box args={[3.4, 0.05, 0.1]} position={[0, 0.3, -1.8]}>
          <meshStandardMaterial color="#0a0a0a" />
        </Box>
      </group>

      {/* Windshield Glass */}
      <mesh position={[0, 0.75, -1.95]} rotation={[0.3, 0, 0]}>
        <planeGeometry args={[3.4, 1.8]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          transmission={0.95}
          opacity={0.1}
          metalness={0}
          roughness={0}
          thickness={0.5}
          ior={1.5}
        />
      </mesh>

      {/* Rearview Mirror */}
      <group position={[0, 1.05, -1.3]}>
        <Box args={[0.05, 0.05, 0.1]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        <RoundedBox args={[0.3, 0.1, 0.02]} radius={0.01}>
          <meshStandardMaterial color="#1a1a1a" />
        </RoundedBox>
        <Box args={[0.25, 0.08, 0.01]} position={[0, 0, 0.015]}>
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </Box>
      </group>

      {/* Side Windows */}
      <group>
        {/* Left Window */}
        <mesh position={[-1.85, 0.4, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2, 1.2]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={0.9}
            opacity={0.1}
            metalness={0}
            roughness={0}
            thickness={0.5}
          />
        </mesh>
        
        {/* Right Window */}
        <mesh position={[1.85, 0.4, -0.5]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2, 1.2]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={0.9}
            opacity={0.1}
            metalness={0}
            roughness={0}
            thickness={0.5}
          />
        </mesh>
      </group>

      {/* Door Panels */}
      <group>
        {/* Left Door */}
        <RoundedBox args={[0.1, 0.8, 2]} radius={0.02} position={[-1.8, -0.3, -0.5]}>
          <meshStandardMaterial color="#1a1a1a" />
        </RoundedBox>
        
        {/* Right Door */}
        <RoundedBox args={[0.1, 0.8, 2]} radius={0.02} position={[1.8, -0.3, -0.5]}>
          <meshStandardMaterial color="#1a1a1a" />
        </RoundedBox>
      </group>

      {/* Roof */}
      <Box args={[3.6, 0.05, 3]} position={[0, 1.3, -0.5]}>
        <meshStandardMaterial color="#0a0a0a" />
      </Box>

      {/* Floor */}
      <Box args={[3.6, 0.05, 3]} position={[0, -0.9, -0.5]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
    </group>
  )
}