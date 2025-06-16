"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import { Text } from "@react-three/drei"

interface InteractiveNodesProps {
  selectedNode: string | null
  onNodeClick: (nodeType: string) => void
  currentSection: string
}

export default function InteractiveNodes({ selectedNode, onNodeClick, currentSection }: InteractiveNodesProps) {
  const profileRef = useRef<Mesh>(null)
  const missionsRef = useRef<Mesh>(null)
  const loadoutRef = useRef<Mesh>(null)
  const commsRef = useRef<Mesh>(null)

  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Animate nodes
    if (profileRef.current) {
      profileRef.current.rotation.y = time * 0.5
      profileRef.current.position.y = Math.sin(time * 2) * 0.1 + 1
    }
    if (missionsRef.current) {
      missionsRef.current.rotation.y = time * 0.7
      missionsRef.current.position.y = Math.sin(time * 2 + 1) * 0.1 + 1
    }
    if (loadoutRef.current) {
      loadoutRef.current.rotation.y = time * 0.6
      loadoutRef.current.position.y = Math.sin(time * 2 + 2) * 0.1 + 1
    }
    if (commsRef.current) {
      commsRef.current.rotation.y = time * 0.8
      commsRef.current.position.y = Math.sin(time * 2 + 3) * 0.1 + 1
    }
  })

  const getNodeColor = (nodeType: string) => {
    if (selectedNode === nodeType) return "#ffffff"
    if (hoveredNode === nodeType) return "#00ffff"
    return "#00ff00"
  }

  const getNodeScale = (nodeType: string) => {
    if (selectedNode === nodeType) return 1.5
    if (hoveredNode === nodeType) return 1.2
    return 1
  }

  return (
    <group>
      {/* Profile Node */}
      <group position={[-3, 1, 2]}>
        <mesh
          ref={profileRef}
          scale={getNodeScale("profile")}
          onClick={() => onNodeClick("profile")}
          onPointerEnter={() => setHoveredNode("profile")}
          onPointerLeave={() => setHoveredNode(null)}
        >
          <icosahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color={getNodeColor("profile")}
            wireframe={selectedNode !== "profile"}
            emissive={getNodeColor("profile")}
            emissiveIntensity={0.2}
          />
        </mesh>
        <Text position={[0, -1, 0]} fontSize={0.3} color="#00ff00" anchorX="center" anchorY="middle">
          PROFILE
        </Text>
        {/* Connection Lines */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1]} />
          <meshBasicMaterial color="#00ff00" opacity={0.5} transparent />
        </mesh>
      </group>

      {/* Missions Node */}
      <group position={[3, 1, 2]}>
        <mesh
          ref={missionsRef}
          scale={getNodeScale("missions")}
          onClick={() => onNodeClick("missions")}
          onPointerEnter={() => setHoveredNode("missions")}
          onPointerLeave={() => setHoveredNode(null)}
        >
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color={getNodeColor("missions")}
            wireframe={selectedNode !== "missions"}
            emissive={getNodeColor("missions")}
            emissiveIntensity={0.2}
          />
        </mesh>
        <Text position={[0, -1, 0]} fontSize={0.3} color="#00ff00" anchorX="center" anchorY="middle">
          MISSIONS
        </Text>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1]} />
          <meshBasicMaterial color="#00ff00" opacity={0.5} transparent />
        </mesh>
      </group>

      {/* Loadout Node */}
      <group position={[-3, 1, -2]}>
        <mesh
          ref={loadoutRef}
          scale={getNodeScale("loadout")}
          onClick={() => onNodeClick("loadout")}
          onPointerEnter={() => setHoveredNode("loadout")}
          onPointerLeave={() => setHoveredNode(null)}
        >
          <dodecahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color={getNodeColor("loadout")}
            wireframe={selectedNode !== "loadout"}
            emissive={getNodeColor("loadout")}
            emissiveIntensity={0.2}
          />
        </mesh>
        <Text position={[0, -1, 0]} fontSize={0.3} color="#00ff00" anchorX="center" anchorY="middle">
          LOADOUT
        </Text>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1]} />
          <meshBasicMaterial color="#00ff00" opacity={0.5} transparent />
        </mesh>
      </group>

      {/* Comms Node */}
      <group position={[3, 1, -2]}>
        <mesh
          ref={commsRef}
          scale={getNodeScale("comms")}
          onClick={() => onNodeClick("comms")}
          onPointerEnter={() => setHoveredNode("comms")}
          onPointerLeave={() => setHoveredNode(null)}
        >
          <tetrahedronGeometry args={[0.6]} />
          <meshStandardMaterial
            color={getNodeColor("comms")}
            wireframe={selectedNode !== "comms"}
            emissive={getNodeColor("comms")}
            emissiveIntensity={0.2}
          />
        </mesh>
        <Text position={[0, -1, 0]} fontSize={0.3} color="#00ff00" anchorX="center" anchorY="middle">
          COMMS
        </Text>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1]} />
          <meshBasicMaterial color="#00ff00" opacity={0.5} transparent />
        </mesh>
      </group>

      {/* Central Hub */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#00ff00" wireframe emissive="#00ff00" emissiveIntensity={0.3} />
      </mesh>

      {/* Connection Lines between nodes */}
      {selectedNode && (
        <group>
          <mesh position={[0, 0.5, 1]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.005, 0.005, 3]} />
            <meshBasicMaterial color="#00ffff" opacity={0.8} transparent />
          </mesh>
          <mesh position={[0, 0.5, -1]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.005, 0.005, 3]} />
            <meshBasicMaterial color="#00ffff" opacity={0.8} transparent />
          </mesh>
        </group>
      )}
    </group>
  )
}
