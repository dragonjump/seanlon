import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
 
// const INITIAL_AVATAR_URL = 'https://models.readyplayer.me/67b957b8ede0db61fa031b1f.glb'
// const SECOND_AVATAR_URL = 'https://models.readyplayer.me/67b940d37c673862f4c07c84.glb'




let DEFAULT_BASE_URL = `${import.meta.env.BASE_URL}` || '';
DEFAULT_BASE_URL = DEFAULT_BASE_URL == '/' ? '' : DEFAULT_BASE_URL; 
const INITIAL_AVATAR_URL = DEFAULT_BASE_URL + "/models/67b957b8ede0db61fa031b1f.glb";
const SECOND_AVATAR_URL = DEFAULT_BASE_URL + "/models/67b940d37c673862f4c07c84.glb";


export default function Avatar({ position = [0, 0, 0], onClick }) {
  const [avatarUrl, setAvatarUrl] = useState(INITIAL_AVATAR_URL)
  const [jumpCount, setJumpCount] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const avatarRef = useRef()
  const initialY = position[1]
  const jumpHeight = 3
  const jumpDuration = 1000 // ms per jump
  const startTime = useRef(Date.now())

  // Load both avatars
  const initialAvatar = useGLTF(INITIAL_AVATAR_URL)
  const secondAvatar = useGLTF(SECOND_AVATAR_URL)
  const { animations: initialAnimations } = initialAvatar
  const { animations: secondAnimations } = secondAvatar

  // Use the animations from the current avatar
  const { actions } = useAnimations(
    avatarUrl === INITIAL_AVATAR_URL ? initialAnimations : secondAnimations,
    avatarRef
  )

  useEffect(() => {
    // Switch avatar after 5 seconds and start jumping
    const timer = setTimeout(() => {
      setAvatarUrl(SECOND_AVATAR_URL)
      setIsJumping(true)
      startTime.current = Date.now()
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = (e) => {
    e.stopPropagation()
    setAvatarUrl(prev => prev === INITIAL_AVATAR_URL ? SECOND_AVATAR_URL : INITIAL_AVATAR_URL)
    if (onClick) onClick()
  }

  useFrame((state, delta) => {
    if (!avatarRef.current) return

    if (isJumping) {
      const elapsed = (Date.now() - startTime.current) % jumpDuration
      const jumpProgress = Math.sin((elapsed / jumpDuration) * Math.PI)
      avatarRef.current.position.y = initialY + jumpProgress * jumpHeight

      // Check if a jump cycle is complete
      if (elapsed < 50 && jumpProgress < 0.1) {  // Near the bottom of the jump
        if (jumpCount <2) {
          setJumpCount(prev => prev + 1)
        } else if (!isRotating) {
          setIsJumping(false)
          setIsRotating(true)
        }
      }
    }

    // Slow rotation after jumps
    if (isRotating) {
      avatarRef.current.rotation.y += delta * 0.5 // Slow rotation speed
      avatarRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 2) * 0.1 // Gentle hover
    }

    // Regular hover when not jumping or rotating
    if (!isJumping && !isRotating) {
      avatarRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  useEffect(() => {
    const currentActions = actions
    if (currentActions) {
      currentActions.idle?.reset().play()
    }
  }, [actions, avatarUrl])

  return (
    <group ref={avatarRef} position={position} onClick={handleClick}>
      <primitive 
        object={avatarUrl === INITIAL_AVATAR_URL ? initialAvatar.scene : secondAvatar.scene} 
        scale={1.5} 
      />
      {/* Front spotlight */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      {/* Strong backlight */}
      <spotLight
        position={[0, 5, -5]}
        angle={0.5}
        penumbra={0.5}
        intensity={4}
        color="#ffaa44"
        castShadow
      />
      {/* Rim light left */}
      <pointLight
        position={[-3, 2, -2]}
        intensity={2}
        color="#4444ff"
      />
      {/* Rim light right */}
      <pointLight
        position={[3, 2, -2]}
        intensity={2}
        color="#4444ff"
      />
    </group>
  )
}
