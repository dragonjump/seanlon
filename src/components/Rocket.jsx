import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
// import * as rocketGltf from './models/model.glft'


let DEFAULT_BASE_URL = `${import.meta.env.BASE_URL}` || '';
DEFAULT_BASE_URL = DEFAULT_BASE_URL == '/' ? '' : DEFAULT_BASE_URL; 
const SPACE1_URL = DEFAULT_BASE_URL + "/models/space.gltf";
const SPACE2_URL = DEFAULT_BASE_URL + "/models/rocket1.glb";

export default function Rocket({ position = [0, 0, 0], onClick }) {
  const rocketRef = useRef()
  const { scene } = useGLTF( SPACE1_URL)
  // const { scene } = useGLTF(rocketGltf)
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0))
  const timeOffset = useRef(Math.random() * 1000)
  const speed = useRef(Math.random() * 0.5 + 0.5) // Random speed between 0.5-1
  const rotationAxis = useRef(new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ).normalize())

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          // Add emissive material for engine glow
          if (child.material) {
            child.material.emissive = new THREE.Color(0xff3300)
            child.material.emissiveIntensity = 0.5
          }
        }
      })
    }
  }, [scene])

  useFrame((state) => {
    if (!rocketRef.current) return

    const time = state.clock.getElapsedTime() + timeOffset.current

    // Calculate new position
    const radius = 3
    const height = 1.5
    const x = Math.cos(time * speed.current) * radius
    const z = Math.sin(time * speed.current) * radius
    const y = Math.sin(time * speed.current * 2) * height

    // Update position
    rocketRef.current.position.x = position[0] + x
    rocketRef.current.position.y = position[1] + y
    rocketRef.current.position.z = position[2] + z

    // Make rocket face the direction it's moving
    const angle = Math.atan2(z, x)
    rocketRef.current.rotation.y = angle + Math.PI / 2

    // Add slight tilt in the direction of movement
    rocketRef.current.rotation.z = Math.sin(time * speed.current) * 0.2
  })

  return (
    <group ref={rocketRef} position={position} onClick={onClick}>
      <primitive 
        object={scene} 
        scale={0.5}
        castShadow
        receiveShadow
      />
      {/* Engine glow */}
      <pointLight
        color="#ff3300"
        intensity={2}
        distance={1}
        position={[0, -0.2, -0.5]}
      />
    </group>
  )
}
