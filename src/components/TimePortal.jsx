import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function TimePortal({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const portalRef = useRef()
  const ringRef = useRef()
  const timeOffset = useRef(Math.random() * 1000)

  useFrame((state, delta) => {
    timeOffset.current += delta

    // Rotate the portal ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5
    }

    // Pulse the portal
    if (portalRef.current) {
      const scale = 1 + Math.sin(timeOffset.current * 2) * 0.1
      portalRef.current.scale.set(scale, scale, 1)
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Portal ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.2, 16, 32]} />
        <meshStandardMaterial 
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Portal effect */}
      <mesh ref={portalRef}>
        <circleGeometry args={[1.8, 32]} />
        <meshBasicMaterial 
          color="#0066ff"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
        <pointLight intensity={2} distance={5} color="#00ffff" />
      </mesh>

      {/* Energy particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(i * Math.PI / 4) * 2,
            Math.sin(i * Math.PI / 4) * 2,
            0
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      ))}
    </group>
  )
}
