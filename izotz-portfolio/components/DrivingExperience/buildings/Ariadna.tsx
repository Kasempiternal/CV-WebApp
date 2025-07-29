'use client'

import { Box, Cylinder, Text, Sphere } from '@react-three/drei'

export default function Ariadna() {
  return (
    <group>
      {/* Modern glass office building - main structure */}
      <group>
        {/* Main tower */}
        <Box args={[12, 20, 10]} position={[0, 10, 0]}>
          <meshStandardMaterial color="#1e3a8a" />
        </Box>
        
        {/* Lower section with entrance */}
        <Box args={[16, 6, 12]} position={[0, 3, 1]}>
          <meshStandardMaterial color="#1e40af" />
        </Box>
        
        {/* Side wing */}
        <Box args={[10, 15, 8]} position={[9, 7.5, -2]}>
          <meshStandardMaterial color="#1e3a8a" />
        </Box>
      </group>

      {/* Glass curtain wall facade */}
      <group>
        {/* Main tower glass panels */}
        {[...Array(9)].map((_, floor) => 
          [...Array(5)].map((_, panel) => (
            <Box 
              key={`main-${floor}-${panel}`} 
              args={[2.2, 2, 0.15]} 
              position={[-4.4 + panel * 2.2, 2 + floor * 2.2, 5.08]}
            >
              <meshStandardMaterial 
                color="#3b82f6" 
                metalness={0.95} 
                roughness={0.05}
                opacity={0.85}
                transparent
                emissive="#1e40af"
                emissiveIntensity={0.1}
              />
            </Box>
          ))
        )}
        
        {/* Reflective corner windows */}
        {[-6, 6].map((x) => 
          [...Array(9)].map((_, floor) => (
            <Box 
              key={`corner-${x}-${floor}`} 
              args={[0.15, 2, 2]} 
              position={[x, 2 + floor * 2.2, 4]}
              rotation={[0, x > 0 ? Math.PI / 4 : -Math.PI / 4, 0]}
            >
              <meshStandardMaterial 
                color="#60a5fa" 
                metalness={0.98} 
                roughness={0.02}
                opacity={0.9}
                transparent
              />
            </Box>
          ))
        )}
      </group>

      {/* Modern entrance */}
      <group position={[0, 0, 7]}>
        {/* Glass canopy */}
        <Box args={[8, 0.2, 4]} position={[0, 4, 2]}>
          <meshStandardMaterial 
            color="#e0f2fe" 
            metalness={0.5} 
            roughness={0.1}
            opacity={0.7}
            transparent
          />
        </Box>
        
        {/* Steel support beams */}
        {[-3, 3].map((x) => (
          <Cylinder key={`support-${x}`} args={[0.15, 0.15, 4]} position={[x, 2, 3.5]}>
            <meshStandardMaterial color="#475569" metalness={0.9} />
          </Cylinder>
        ))}
        
        {/* Revolving door area */}
        <Cylinder args={[2, 2, 0.2]} position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#1e3a8a" 
            metalness={0.8} 
            roughness={0.2}
            opacity={0.8}
            transparent
          />
        </Cylinder>
        
        {/* Modern entrance doors */}
        {[-2, 0, 2].map((x) => (
          <Box key={`door-${x}`} args={[1.5, 3, 0.1]} position={[x * 2, 1.5, 0]}>
            <meshStandardMaterial 
              color="#3b82f6" 
              metalness={0.9} 
              roughness={0.1}
              opacity={0.85}
              transparent
            />
          </Box>
        ))}
      </group>

      {/* Rooftop features */}
      <group position={[0, 20, 0]}>
        {/* Helipad */}
        <Cylinder args={[4, 4, 0.1]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#fbbf24" />
        </Cylinder>
        <Text position={[0, 0.1, 0]} fontSize={2} color="#1e293b" rotation={[-Math.PI / 2, 0, 0]}>
          H
        </Text>
        
        {/* Rooftop garden planters */}
        {[[-3, -3], [3, -3], [-3, 3], [3, 3]].map(([x, z], i) => (
          <Box key={`planter-${i}`} args={[2, 0.5, 2]} position={[x, 0.25, z]}>
            <meshStandardMaterial color="#16a34a" />
          </Box>
        ))}
        
        {/* Communication equipment */}
        <Cylinder args={[0.2, 0.2, 3]} position={[5, 1.5, -4]}>
          <meshStandardMaterial color="#6b7280" metalness={0.8} />
        </Cylinder>
      </group>

      {/* Modern architectural details */}
      <group>
        {/* Vertical light strips */}
        {[-5, -2.5, 0, 2.5, 5].map((x) => (
          <Box key={`light-${x}`} args={[0.1, 19, 0.3]} position={[x, 10, 5.2]}>
            <meshStandardMaterial 
              color="#fef3c7" 
              emissive="#fbbf24" 
              emissiveIntensity={0.5}
            />
          </Box>
        ))}
        
        {/* Horizontal accent bands */}
        {[6, 12, 18].map((y) => (
          <Box key={`band-${y}`} args={[12.2, 0.3, 0.1]} position={[0, y, 5.1]}>
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </Box>
        ))}
      </group>

      {/* Company branding */}
      <group position={[0, 8, 5.3]}>
        <Box args={[6, 1.5, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#0f172a" />
        </Box>
        <Text position={[0, 0, 0.1]} fontSize={0.8} color="#f8fafc">
          ARIADNA
        </Text>
        <Text position={[0, -0.6, 0.1]} fontSize={0.3} color="#cbd5e1">
          Software Solutions
        </Text>
      </group>

      {/* Outdoor plaza */}
      <group>
        {/* Modern pavement */}
        <Box args={[25, 0.1, 20]} position={[0, -0.05, 5]}>
          <meshStandardMaterial color="#e2e8f0" />
        </Box>
        
        {/* Decorative water feature */}
        <Cylinder args={[3, 3, 0.5]} position={[-8, 0.25, 10]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            metalness={0.3} 
            roughness={0.1}
            opacity={0.8}
            transparent
          />
        </Cylinder>
        
        {/* Modern benches */}
        {[-5, 5].map((x) => (
          <Box key={`bench-${x}`} args={[3, 0.5, 0.8]} position={[x, 0.25, 12]}>
            <meshStandardMaterial color="#475569" />
          </Box>
        ))}
        
        {/* Trees in modern planters */}
        {[-10, -5, 5, 10].map((x) => (
          <group key={`tree-${x}`} position={[x, 0, 15]}>
            <Box args={[1.5, 0.8, 1.5]} position={[0, 0.4, 0]}>
              <meshStandardMaterial color="#64748b" />
            </Box>
            <Cylinder args={[0.3, 0.3, 3]} position={[0, 2, 0]}>
              <meshStandardMaterial color="#7c2d12" />
            </Cylinder>
            <Sphere args={[1.5, 8, 6]} position={[0, 4, 0]}>
              <meshStandardMaterial color="#16a34a" />
            </Sphere>
          </group>
        ))}
      </group>

      {/* Underground parking entrance */}
      <group position={[10, 0, 0]}>
        <Box args={[6, 0.1, 8]} position={[0, -0.5, 0]} rotation={[0, 0, -Math.PI / 12]}>
          <meshStandardMaterial color="#374151" />
        </Box>
        <Text position={[0, 0.1, 0]} fontSize={0.5} color="#fbbf24" rotation={[-Math.PI / 2, 0, 0]}>
          PARKING →
        </Text>
      </group>
    </group>
  )
}