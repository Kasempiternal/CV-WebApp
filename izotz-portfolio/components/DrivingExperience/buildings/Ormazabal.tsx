'use client'

import { Box, Cylinder, Text } from '@react-three/drei'

export default function Ormazabal() {
  return (
    <group>
      {/* Main industrial building complex */}
      <group>
        {/* Main factory hall */}
        <Box args={[25, 12, 15]} position={[0, 6, 0]}>
          <meshStandardMaterial color="#4a5568" />
        </Box>
        
        {/* Production wing */}
        <Box args={[20, 10, 12]} position={[18, 5, -5]}>
          <meshStandardMaterial color="#4a5568" />
        </Box>
        
        {/* Office section */}
        <Box args={[10, 8, 8]} position={[-15, 4, 5]}>
          <meshStandardMaterial color="#e2e8f0" />
        </Box>
      </group>

      {/* Solar panel array on main roof */}
      <group position={[0, 12.1, 0]}>
        {[...Array(8)].map((_, row) => 
          [...Array(6)].map((_, col) => (
            <Box 
              key={`solar-${row}-${col}`} 
              args={[2.8, 0.1, 1.8]} 
              position={[-10 + col * 3.5, 0, -5 + row * 2.2]}
              rotation={[Math.PI * 0.05, 0, 0]}
            >
              <meshStandardMaterial 
                color="#1a365d" 
                metalness={0.9} 
                roughness={0.1}
              />
            </Box>
          ))
        )}
      </group>

      {/* Electrical transformers area */}
      <group position={[15, 0, -15]}>
        {/* Large power transformer */}
        <group position={[0, 0, 0]}>
          <Cylinder args={[3, 3, 5]} position={[0, 2.5, 0]}>
            <meshStandardMaterial color="#718096" metalness={0.7} />
          </Cylinder>
          {/* Cooling fins */}
          {[0, 1, 2, 3].map((i) => (
            <Box 
              key={`fin-${i}`} 
              args={[0.1, 4, 2]} 
              position={[3 * Math.cos(i * Math.PI / 2), 2.5, 3 * Math.sin(i * Math.PI / 2)]}
              rotation={[0, i * Math.PI / 2, 0]}
            >
              <meshStandardMaterial color="#4a5568" metalness={0.6} />
            </Box>
          ))}
          {/* Insulators */}
          {[-1, 0, 1].map((x) => (
            <Cylinder key={`insulator-${x}`} args={[0.2, 0.2, 2]} position={[x, 6, 0]}>
              <meshStandardMaterial color="#f7fafc" />
            </Cylinder>
          ))}
        </group>

        {/* Secondary transformers */}
        {[8, -8].map((x) => (
          <group key={`secondary-${x}`} position={[x, 0, 0]}>
            <Cylinder args={[2, 2, 3.5]} position={[0, 1.75, 0]}>
              <meshStandardMaterial color="#718096" metalness={0.7} />
            </Cylinder>
            <Cylinder args={[0.15, 0.15, 5]} position={[0, 4.5, 0]}>
              <meshStandardMaterial color="#2d3748" />
            </Cylinder>
          </group>
        ))}
      </group>

      {/* Power transmission infrastructure */}
      <group>
        {/* High voltage towers */}
        {[-20, 20].map((x) => (
          <group key={`tower-${x}`} position={[x, 0, -20]}>
            {/* Tower structure */}
            <Box args={[0.3, 15, 0.3]} position={[-1, 7.5, -1]}>
              <meshStandardMaterial color="#2d3748" />
            </Box>
            <Box args={[0.3, 15, 0.3]} position={[1, 7.5, -1]}>
              <meshStandardMaterial color="#2d3748" />
            </Box>
            <Box args={[0.3, 15, 0.3]} position={[-1, 7.5, 1]}>
              <meshStandardMaterial color="#2d3748" />
            </Box>
            <Box args={[0.3, 15, 0.3]} position={[1, 7.5, 1]}>
              <meshStandardMaterial color="#2d3748" />
            </Box>
            {/* Cross beams */}
            {[5, 10, 13].map((y) => (
              <Box key={`beam-${y}`} args={[4, 0.2, 0.2]} position={[0, y, 0]}>
                <meshStandardMaterial color="#2d3748" />
              </Box>
            ))}
            {/* Insulators and wires */}
            {[-1.5, 0, 1.5].map((offset) => (
              <Cylinder key={`wire-${offset}`} args={[0.05, 0.05, 0.5]} position={[offset, 14, 0]}>
                <meshStandardMaterial color="#1a202c" />
              </Cylinder>
            ))}
          </group>
        ))}
      </group>

      {/* Loading dock area */}
      <group position={[10, 0, 8]}>
        {/* Dock platform */}
        <Box args={[15, 1.5, 5]} position={[0, 0.75, 0]}>
          <meshStandardMaterial color="#718096" />
        </Box>
        {/* Dock doors */}
        {[-5, 0, 5].map((x) => (
          <Box key={`dock-${x}`} args={[3, 3, 0.2]} position={[x, 2.5, -2.4]}>
            <meshStandardMaterial color="#2d3748" />
          </Box>
        ))}
      </group>

      {/* Industrial details */}
      <group>
        {/* Ventilation systems on roof */}
        {[-5, 0, 5].map((x) => (
          <group key={`vent-${x}`} position={[x, 12.5, 0]}>
            <Box args={[2, 1, 2]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#4a5568" metalness={0.8} />
            </Box>
            <Cylinder args={[0.8, 1, 0.5]} position={[0, 0.75, 0]}>
              <meshStandardMaterial color="#2d3748" />
            </Cylinder>
          </group>
        ))}

        {/* Industrial chimney */}
        <Cylinder args={[1.5, 1, 15]} position={[25, 7.5, -10]}>
          <meshStandardMaterial color="#ef4444" />
        </Cylinder>
        {/* Chimney bands */}
        {[0, 5, 10].map((y) => (
          <Cylinder key={`band-${y}`} args={[1.6, 1.6, 0.5]} position={[25, 2 + y, -10]}>
            <meshStandardMaterial color="#ffffff" />
          </Cylinder>
        ))}
      </group>

      {/* Company signage */}
      <group position={[0, 14, 0]}>
        <Box args={[8, 2, 0.3]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#dc2626" />
        </Box>
        <Text position={[0, 0, 0.2]} fontSize={1.2} color="white">
          ORMAZABAL
        </Text>
      </group>

      {/* Office windows */}
      <group position={[-15, 0, 5]}>
        {[0, 1, 2].map((floor) => 
          [0, 1, 2].map((window) => (
            <Box 
              key={`office-${floor}-${window}`} 
              args={[2, 2, 0.1]} 
              position={[-3 + window * 3, 2 + floor * 2.5, 4.05]}
            >
              <meshStandardMaterial 
                color="#60a5fa" 
                metalness={0.7} 
                roughness={0.2}
                opacity={0.9}
                transparent
              />
            </Box>
          ))
        )}
      </group>

      {/* Ground and parking */}
      <Box args={[50, 0.1, 40]} position={[5, -0.05, -5]}>
        <meshStandardMaterial color="#374151" />
      </Box>
      
      {/* Parking lines */}
      {[...Array(10)].map((_, i) => (
        <Box key={`parking-${i}`} args={[2.5, 0.01, 0.1]} position={[-20 + i * 3, 0.06, 15]}>
          <meshStandardMaterial color="#fbbf24" />
        </Box>
      ))}

      {/* Security fence */}
      {[-25, 25].map((x) => (
        <Box key={`fence-${x}`} args={[0.1, 2, 40]} position={[x, 1, -5]}>
          <meshStandardMaterial color="#6b7280" metalness={0.8} opacity={0.8} transparent />
        </Box>
      ))}
    </group>
  )
}