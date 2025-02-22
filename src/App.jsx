import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import Experience from './components/Experience'
import Interface from './components/Interface'
import { OrbitControls } from '@react-three/drei'
import MatrixBackground from './components/MatrixBackground'
import BackgroundMusic from './components/BackgroundMusic'

export default function App() {
  const [showContact, setShowContact] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)

  const handleRocketClick = () => {
    setShowContact(true)
    setTimeout(() => setShowContact(false), 3000)
  }

  const startMusic = () => {
    setMusicStarted(true)
  }

  return (
    <>
      <MatrixBackground />
      {musicStarted && <BackgroundMusic />}
      <div 
      style={{'bottom': '10px'}}
        className="fixed  right-4 z-50 cursor-pointer bg-black/50 p-2 rounded"
        onClick={startMusic}
      >
        <span className="text-white text-sm">
          {musicStarted ? '🎵 Music On' : '🔇 Click for Music'}
        </span>
      </div>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 2, 8]
        }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 10, 20]} />
        <Suspense fallback={null}>
          <Experience onRocketClick={handleRocketClick} />
          <OrbitControls
            makeDefault
            maxPolarAngle={Math.PI * 0.65}
            minPolarAngle={Math.PI * 0.25}
            maxDistance={12}
            minDistance={4}
          />
        </Suspense>
      </Canvas>
      <Interface showContact={showContact} />
    </>
  )
}
