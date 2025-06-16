"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import { Text } from "@react-three/drei"

interface HolographicDisplayProps {
  currentSection: string
}

export default function HolographicDisplay({ currentSection }: HolographicDisplayProps) {
  const hologramRef = useRef<Mesh>(null)
  const dataRingRef = useRef<Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (hologramRef.current) {
      hologramRef.current.rotation.y = time * 0.3
    }

    if (dataRingRef.current) {
      dataRingRef.current.rotation.z = time * 0.5
    }
  })

  const getSectionData = () => {
    switch (currentSection) {
      case "about":
        return {
          title: "OPERATIVE PROFILE",
          data: ["CLEARANCE: ALPHA", "STATUS: ACTIVE", "MISSIONS: 47"],
          color: "#00ff00",
        }
      case "projects":
        return {
          title: "MISSION ARCHIVE",
          data: ["OPERATIONS: 4", "SUCCESS RATE: 96%", "CLASSIFIED: 2"],
          color: "#ffff00",
        }
      case "skills":
        return {
          title: "EQUIPMENT LOADOUT",
          data: ["WEAPONS: 6", "TOOLS: 12", "READINESS: 95%"],
          color: "#ff8800",
        }
      case "contact":
        return {
          title: "COMMUNICATIONS",
          data: ["CHANNELS: 3", "ENCRYPTION: AES-256", "STATUS: SECURE"],
          color: "#00ffff",
        }
      default:
        return {
          title: "TACTICAL INTERFACE",
          data: ["SYSTEMS: ONLINE", "3D MODE: ACTIVE", "READY FOR ORDERS"],
          color: "#00ff00",
        }
    }
  }

  const sectionData = getSectionData()

  return (
    <group position={[0, 3, 0]}>
      {/* Holographic Ring */}
      <mesh ref={dataRingRef}>
        <torusGeometry args={[2, 0.05, 8, 32]} />
        <meshBasicMaterial color={sectionData.color} opacity={0.6} transparent />
      </mesh>

      {/* Data Display */}
      <group ref={hologramRef}>
        <Text position={[0, 0.5, 0]} fontSize={0.4} color={sectionData.color} anchorX="center" anchorY="middle">
          {sectionData.title}
        </Text>

        {sectionData.data.map((item, index) => (
          <Text
            key={index}
            position={[0, -0.3 - index * 0.3, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {item}
          </Text>
        ))}
      </group>

      {/* Holographic Particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin((i / 20) * Math.PI * 2) * 1.5,
            Math.sin(i * 0.5) * 0.5,
            Math.cos((i / 20) * Math.PI * 2) * 1.5,
          ]}
        >
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color={sectionData.color} />
        </mesh>
      ))}

      {/* Scanning Lines */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4, 1, 20]} />
        <meshBasicMaterial color={sectionData.color} wireframe opacity={0.2} transparent />
      </mesh>
    </group>
  )
}
