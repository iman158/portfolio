"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

export default function CyberGrid3D() {
  const gridRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      gridRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <group>
      {/* Main Grid Plane */}
      <mesh ref={gridRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshBasicMaterial color="#00ff00" wireframe opacity={0.3} transparent />
      </mesh>

      {/* Vertical Grid Lines */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={`vertical-${i}`} position={[i - 5, 0, 0]}>
          <boxGeometry args={[0.02, 8, 0.02]} />
          <meshBasicMaterial color="#00ff00" opacity={0.2} transparent />
        </mesh>
      ))}

      {/* Horizontal Grid Lines */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={`horizontal-${i}`} position={[0, 0, i - 5]}>
          <boxGeometry args={[10, 0.02, 0.02]} />
          <meshBasicMaterial color="#00ff00" opacity={0.2} transparent />
        </mesh>
      ))}

      {/* Corner Markers */}
      {[
        [-4, 2, -4],
        [4, 2, -4],
        [-4, 2, 4],
        [4, 2, 4],
      ].map((position, index) => (
        <mesh key={`corner-${index}`} position={position}>
          <octahedronGeometry args={[0.2]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
      ))}
    </group>
  )
}
