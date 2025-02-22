import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Comet({ startPosition = [0, 0, 0] }) {
  const cometRef = useRef()
  const trailRef = useRef()
  const speed = useRef(Math.random() * 0.5 + 0.3)
  const direction = useRef(new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() * 0.2,
    Math.random() - 0.5
  ).normalize())

  useFrame((state, delta) => {
    if (!cometRef.current) return

    // Move comet
    cometRef.current.position.x += direction.current.x * speed.current
    cometRef.current.position.y += direction.current.y * speed.current
    cometRef.current.position.z += direction.current.z * speed.current

    // Update trail position
    if (trailRef.current) {
      trailRef.current.position.copy(cometRef.current.position)
    }

    // Reset position when out of bounds
    if (Math.abs(cometRef.current.position.x) > 15 ||
        Math.abs(cometRef.current.position.y) > 15 ||
        Math.abs(cometRef.current.position.z) > 15) {
      cometRef.current.position.set(...startPosition)
      speed.current = Math.random() * 0.5 + 0.3
      direction.current.set(
        Math.random() - 0.5,
        Math.random() * 0.2,
        Math.random() - 0.5
      ).normalize()
    }
  })

  return (
    <group>
      {/* Comet head */}
      <mesh ref={cometRef} position={startPosition}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight intensity={2} distance={5} color="#ffffff" />
      </mesh>
      
      {/* Comet trail */}
      <mesh ref={trailRef} position={startPosition}>
        <cylinderGeometry args={[0, 0.1, 1, 8]} />
        <meshBasicMaterial color="#4444ff" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}
