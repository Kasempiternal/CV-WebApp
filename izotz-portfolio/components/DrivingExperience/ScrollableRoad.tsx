'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

const ROAD_WIDTH = 8
const ROAD_LENGTH = 50
const LANE_WIDTH = 0.15
const DASH_LENGTH = 2
const DASH_GAP = 2

interface ScrollableRoadProps {
  isMoving: boolean
  onMovementComplete: () => void
  onSpeedChange?: (speed: number) => void
}

export default function ScrollableRoad({ isMoving, onMovementComplete, onSpeedChange }: ScrollableRoadProps) {
  const roadRef = useRef<THREE.Group>(null)
  const roadSegments = useRef<THREE.Group[]>([])
  const [speed, setSpeed] = useState(0)
  const movementTimer = useRef(0)

  // Create road segments
  const segments = useMemo(() => {
    const segs = []
    for (let i = 0; i < 5; i++) {
      segs.push(
        <group key={i} ref={(el) => el && (roadSegments.current[i] = el)} position={[0, -1, -i * ROAD_LENGTH]}>
          {/* Road surface */}
          <Box args={[ROAD_WIDTH, 0.1, ROAD_LENGTH]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#2a2a2a" />
          </Box>

          {/* Center lane markings */}
          {Array.from({ length: Math.floor(ROAD_LENGTH / (DASH_LENGTH + DASH_GAP)) }).map((_, idx) => (
            <Box
              key={`center-${idx}`}
              args={[LANE_WIDTH, 0.11, DASH_LENGTH]}
              position={[0, 0.01, -idx * (DASH_LENGTH + DASH_GAP) - DASH_LENGTH / 2]}
            >
              <meshStandardMaterial color="#f0f0f0" emissive="#f0f0f0" emissiveIntensity={0.2} />
            </Box>
          ))}

          {/* Side lane markings */}
          <Box args={[LANE_WIDTH * 2, 0.11, ROAD_LENGTH]} position={[-ROAD_WIDTH / 2 + LANE_WIDTH, 0.01, 0]}>
            <meshStandardMaterial color="#f0f0f0" emissive="#f0f0f0" emissiveIntensity={0.2} />
          </Box>
          <Box args={[LANE_WIDTH * 2, 0.11, ROAD_LENGTH]} position={[ROAD_WIDTH / 2 - LANE_WIDTH, 0.01, 0]}>
            <meshStandardMaterial color="#f0f0f0" emissive="#f0f0f0" emissiveIntensity={0.2} />
          </Box>

          {/* Road edges */}
          <Box args={[0.2, 0.15, ROAD_LENGTH]} position={[-ROAD_WIDTH / 2 - 0.1, 0.05, 0]}>
            <meshStandardMaterial color="#1a1a1a" />
          </Box>
          <Box args={[0.2, 0.15, ROAD_LENGTH]} position={[ROAD_WIDTH / 2 + 0.1, 0.05, 0]}>
            <meshStandardMaterial color="#1a1a1a" />
          </Box>
        </group>
      )
    }
    return segs
  }, [])

  useEffect(() => {
    if (isMoving) {
      movementTimer.current = 0
    }
  }, [isMoving])

  useFrame((state, delta) => {
    // Handle movement animation
    if (isMoving) {
      movementTimer.current += delta
      
      // Smooth acceleration and deceleration
      let newSpeed = 0
      if (movementTimer.current < 1) {
        // Accelerate
        newSpeed = 15 * (movementTimer.current / 1)
      } else if (movementTimer.current > 4) {
        // Decelerate
        newSpeed = 15 * ((5 - movementTimer.current) / 1)
      } else {
        // Constant speed
        newSpeed = 15
      }
      setSpeed(newSpeed)
      if (onSpeedChange) {
        onSpeedChange(newSpeed)
      }

      // Stop after 5 seconds
      if (movementTimer.current >= 5) {
        setSpeed(0)
        if (onSpeedChange) {
          onSpeedChange(0)
        }
        onMovementComplete()
      }
    } else {
      setSpeed(0)
      if (onSpeedChange) {
        onSpeedChange(0)
      }
    }

    // Move road segments
    if (speed > 0) {
      roadSegments.current.forEach((segment, index) => {
        if (segment) {
          segment.position.z += speed * delta

          // Reset position when segment passes camera
          if (segment.position.z > ROAD_LENGTH) {
            segment.position.z -= 5 * ROAD_LENGTH
          }
        }
      })
    }
  })

  return <group ref={roadRef}>{segments}</group>
}