'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

const ROAD_WIDTH = 8
const ROAD_LENGTH = 50
const LANE_WIDTH = 0.15
const DASH_LENGTH = 2
const DASH_GAP = 2
const SPEED = 15

export default function InfiniteRoad() {
  const roadRef = useRef<THREE.Group>(null)
  const roadSegments = useRef<THREE.Group[]>([])

  // Create curved road geometry
  const createRoadGeometry = () => {
    const shape = new THREE.Shape()
    shape.moveTo(-ROAD_WIDTH / 2, 0)
    shape.lineTo(ROAD_WIDTH / 2, 0)
    shape.lineTo(ROAD_WIDTH / 2, 0.1)
    shape.lineTo(-ROAD_WIDTH / 2, 0.1)
    shape.closePath()

    // Create a curved path
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -0.5, -ROAD_LENGTH / 4),
      new THREE.Vector3(0, -0.8, -ROAD_LENGTH / 2),
      new THREE.Vector3(0, -0.5, -ROAD_LENGTH * 3/4),
      new THREE.Vector3(0, 0, -ROAD_LENGTH)
    ])

    const extrudeSettings = {
      steps: 100,
      bevelEnabled: false,
      extrudePath: curve
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }

  // Create road segments
  const segments = useMemo(() => {
    const roadGeometry = createRoadGeometry()
    const segs = []
    for (let i = 0; i < 3; i++) {
      segs.push(
        <group key={i} ref={(el) => el && (roadSegments.current[i] = el)} position={[0, -1, -i * ROAD_LENGTH]}>
          {/* Road surface with curve */}
          <mesh geometry={roadGeometry}>
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>

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

  useFrame((state, delta) => {
    roadSegments.current.forEach((segment, index) => {
      if (segment) {
        // Move road segments forward
        segment.position.z += SPEED * delta

        // Reset position when segment passes camera
        if (segment.position.z > ROAD_LENGTH) {
          segment.position.z -= 3 * ROAD_LENGTH
        }
      }
    })
  })

  return <group ref={roadRef}>{segments}</group>
}