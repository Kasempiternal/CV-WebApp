'use client'

import { Box, Cylinder, Cone, Text } from '@react-three/drei'

export default function UniversityDeusto() {
  return (
    <group>
      {/* Main Neo-Gothic building */}
      <group>
        {/* Central building with Gothic proportions */}
        <Box args={[20, 15, 10]} position={[0, 7.5, 0]}>
          <meshStandardMaterial color="#8b7d6b" />
        </Box>
        
        {/* Left wing */}
        <Box args={[12, 12, 8]} position={[-13, 6, 0]}>
          <meshStandardMaterial color="#8b7d6b" />
        </Box>
        
        {/* Right wing */}
        <Box args={[12, 12, 8]} position={[13, 6, 0]}>
          <meshStandardMaterial color="#8b7d6b" />
        </Box>
      </group>

      {/* Gothic tower with spire */}
      <group position={[-8, 0, 0]}>
        {/* Tower base */}
        <Box args={[5, 25, 5]} position={[0, 12.5, 0]}>
          <meshStandardMaterial color="#7d6d5d" />
        </Box>
        
        {/* Tower top section */}
        <Box args={[4.5, 5, 4.5]} position={[0, 27.5, 0]}>
          <meshStandardMaterial color="#6d5d4d" />
        </Box>
        
        {/* Spire */}
        <Cone args={[3, 8, 8]} position={[0, 34, 0]}>
          <meshStandardMaterial color="#4a4a4a" />
        </Cone>
        
        {/* Clock face */}
        <Cylinder args={[1.5, 1.5, 0.1]} position={[0, 20, 2.51]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#f5f5dc" />
        </Cylinder>
        
        {/* Clock hands */}
        <Box args={[0.05, 1, 0.05]} position={[0, 20, 2.6]} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial color="#000000" />
        </Box>
        <Box args={[0.05, 0.7, 0.05]} position={[0, 20, 2.6]} rotation={[0, 0, -Math.PI / 3]}>
          <meshStandardMaterial color="#000000" />
        </Box>
      </group>

      {/* Gothic arched windows */}
      <group>
        {/* Main building Gothic windows */}
        {[0, 1, 2].map((floor) => 
          [0, 1, 2, 3, 4].map((window) => (
            <group key={`main-${floor}-${window}`} position={[-8 + window * 4, 4 + floor * 4, 5.05]}>
              {/* Pointed arch window */}
              <Box args={[1.5, 3, 0.1]} position={[0, 0, 0]}>
                <meshStandardMaterial 
                  color="#4169e1" 
                  metalness={0.6} 
                  roughness={0.2}
                  opacity={0.8}
                  transparent
                />
              </Box>
              {/* Window arch top */}
              <Cylinder 
                args={[0.75, 0.75, 0.1, 8, 1, false, 0, Math.PI]} 
                position={[0, 1.5, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <meshStandardMaterial 
                  color="#4169e1" 
                  metalness={0.6} 
                  roughness={0.2}
                  opacity={0.8}
                  transparent
                />
              </Cylinder>
              {/* Window frame */}
              <Box args={[1.7, 3.2, 0.05]} position={[0, 0, -0.05]}>
                <meshStandardMaterial color="#5d5d5d" />
              </Box>
            </group>
          ))
        )}

        {/* Large Gothic rose window */}
        <group position={[0, 10, 5.1]}>
          <Cylinder args={[2.5, 2.5, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
              color="#ff6347" 
              metalness={0.7} 
              roughness={0.1}
              opacity={0.9}
              transparent
            />
          </Cylinder>
          {/* Rose window frame */}
          <Cylinder args={[2.7, 2.7, 0.1, 32, 1, true]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#4d4d4d" />
          </Cylinder>
        </group>
      </group>

      {/* Buttresses */}
      {[-12, -6, 6, 12].map((x) => (
        <group key={`buttress-${x}`} position={[x, 0, 5.5]}>
          <Box args={[1.5, 10, 2]} position={[0, 5, 0]}>
            <meshStandardMaterial color="#7d6d5d" />
          </Box>
          <Box args={[1, 5, 1.5]} position={[0, 10, 0.5]} rotation={[Math.PI / 6, 0, 0]}>
            <meshStandardMaterial color="#7d6d5d" />
          </Box>
        </group>
      ))}

      {/* Entrance portal */}
      <group position={[0, 0, 5]}>
        {/* Gothic archway */}
        <Box args={[4, 6, 0.5]} position={[0, 3, 0]}>
          <meshStandardMaterial color="#6d5d4d" />
        </Box>
        {/* Pointed arch top */}
        <Cone args={[2, 2, 3]} position={[0, 6.5, 0]} rotation={[0, 0, Math.PI]}>
          <meshStandardMaterial color="#6d5d4d" />
        </Cone>
        {/* Heavy wooden doors */}
        <Box args={[3, 5, 0.2]} position={[0, 2.5, 0.1]}>
          <meshStandardMaterial color="#3e2723" />
        </Box>
        {/* Door details */}
        {[-0.7, 0.7].map((x) => 
          [0, 1, 2].map((y) => (
            <Box key={`door-detail-${x}-${y}`} args={[0.5, 0.5, 0.05]} position={[x, 1 + y * 1.5, 0.21]}>
              <meshStandardMaterial color="#2e1a1a" metalness={0.8} />
            </Box>
          ))
        )}
      </group>

      {/* Gothic pinnacles on roof */}
      {[-10, -5, 0, 5, 10].map((x) => (
        <group key={`pinnacle-${x}`} position={[x, 15, 0]}>
          <Cone args={[0.5, 2, 4]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#5d5d5d" />
          </Cone>
        </group>
      ))}

      {/* University signage */}
      <group position={[0, 16, 0]}>
        <Text position={[0, 0, 0]} fontSize={1.2} color="#1a1a1a">
          UNIVERSITY OF DEUSTO
        </Text>
        <Text position={[0, -1, 0]} fontSize={0.5} color="#2a2a2a">
          Scientia et Pietas
        </Text>
      </group>

      {/* Courtyard and grounds */}
      <Box args={[40, 0.1, 25]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#2d5016" />
      </Box>
      
      {/* Stone pathways */}
      <Box args={[3, 0.11, 15]} position={[0, 0, 10]}>
        <meshStandardMaterial color="#8b8682" />
      </Box>
    </group>
  )
}