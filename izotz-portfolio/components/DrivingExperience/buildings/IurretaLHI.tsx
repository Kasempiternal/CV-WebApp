'use client'

import { Box, Cylinder, Text } from '@react-three/drei'

export default function IurretaLHI() {
  return (
    <group>
      {/* Main building - L-shaped technical school */}
      <group>
        {/* Main wing */}
        <Box args={[12, 8, 8]} position={[0, 4, 0]}>
          <meshStandardMaterial color="#d2691e" />
        </Box>
        
        {/* Workshop wing */}
        <Box args={[10, 6, 10]} position={[8, 3, -4]}>
          <meshStandardMaterial color="#cd853f" />
        </Box>
        
        {/* Connecting corridor */}
        <Box args={[4, 4, 4]} position={[5, 2, -2]}>
          <meshStandardMaterial color="#daa520" />
        </Box>
      </group>

      {/* Roof details */}
      <group>
        {/* Main roof */}
        <Box args={[12.5, 0.5, 8.5]} position={[0, 8.25, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        
        {/* Workshop roof with skylights */}
        <Box args={[10.5, 0.5, 10.5]} position={[8, 6.25, -4]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        
        {/* Skylights for workshop natural lighting */}
        {[0, 1, 2].map((i) => (
          <Box key={`skylight-${i}`} args={[2, 0.1, 1.5]} position={[6 + i * 2, 6.4, -4]}>
            <meshStandardMaterial 
              color="#87ceeb" 
              metalness={0.6} 
              roughness={0.1}
              opacity={0.8}
              transparent
            />
          </Box>
        ))}
      </group>

      {/* Windows - classroom style */}
      <group>
        {/* Main building windows */}
        {[0, 1, 2, 3].map((floor) => 
          [0, 1, 2, 3].map((window) => (
            <Box 
              key={`main-${floor}-${window}`} 
              args={[1.8, 1.5, 0.1]} 
              position={[-4.5 + window * 3, 1.5 + floor * 2, 4.05]}
            >
              <meshStandardMaterial 
                color="#4682b4" 
                metalness={0.5} 
                roughness={0.2}
                opacity={0.9}
                transparent
              />
            </Box>
          ))
        )}
        
        {/* Workshop large windows */}
        {[0, 1].map((side) => (
          <Box 
            key={`workshop-${side}`} 
            args={[8, 4, 0.1]} 
            position={[8, 3, side === 0 ? 1.05 : -9.05]}
          >
            <meshStandardMaterial 
              color="#4682b4" 
              metalness={0.4} 
              roughness={0.2}
              opacity={0.85}
              transparent
            />
          </Box>
        ))}
      </group>

      {/* Technical equipment on roof */}
      <group>
        {/* HVAC units */}
        {[0, 1].map((i) => (
          <Box key={`hvac-${i}`} args={[1.5, 1, 2]} position={[2 + i * 3, 8.75, -2]}>
            <meshStandardMaterial color="#696969" metalness={0.7} />
          </Box>
        ))}
        
        {/* Ventilation pipes */}
        <Cylinder args={[0.3, 0.3, 2]} position={[-2, 9.25, 0]}>
          <meshStandardMaterial color="#808080" metalness={0.8} />
        </Cylinder>
      </group>

      {/* Entrance details */}
      <group position={[0, 0, 4]}>
        {/* Main entrance canopy */}
        <Box args={[4, 0.3, 2]} position={[0, 2.5, 1]}>
          <meshStandardMaterial color="#2f4f4f" />
        </Box>
        
        {/* Support pillars */}
        {[-1.5, 1.5].map((x) => (
          <Cylinder key={`pillar-${x}`} args={[0.2, 0.2, 2.5]} position={[x, 1.25, 1.8]}>
            <meshStandardMaterial color="#2f4f4f" />
          </Cylinder>
        ))}
        
        {/* Glass entrance doors */}
        <Box args={[3, 2.5, 0.1]} position={[0, 1.25, 0.05]}>
          <meshStandardMaterial 
            color="#1e90ff" 
            metalness={0.9} 
            roughness={0.1}
            opacity={0.7}
            transparent
          />
        </Box>
      </group>

      {/* Parking area markers */}
      <group position={[-8, 0, 8]}>
        {/* Parking lines */}
        {[0, 1, 2].map((i) => (
          <Box key={`parking-${i}`} args={[2, 0.01, 0.1]} position={[i * 2.5, 0.01, 0]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
        ))}
      </group>

      {/* School signage */}
      <group position={[0, 9.5, 0]}>
        <Box args={[6, 1.5, 0.2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1e3a8a" />
        </Box>
        <Text position={[0, 0, 0.15]} fontSize={0.6} color="white">
          IURRETA LHI
        </Text>
        <Text position={[0, -0.5, 0.15]} fontSize={0.3} color="white">
          Lanbide Heziketa
        </Text>
      </group>

      {/* Ground details */}
      <Box args={[25, 0.1, 20]} position={[3, -0.05, -2]}>
        <meshStandardMaterial color="#696969" />
      </Box>
    </group>
  )
}