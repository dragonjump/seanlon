import { Float, Text, Center, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import Avatar from './Avatar'
import Rocket from './Rocket'

const skills = {
  technical: [
    // Frontend
    '⚛️ React', '📱 React Native', '🎨 Next.js', '💅 Tailwind CSS',
    '🌐 JavaScript', '🔷 TypeScript', '📦 Webpack', '🎭 Jest',
    // Backend
    '🟢 Node.js', '🐍 Python', '☕ Java', '🚀 Express.js',
    '🔥 Firebase', '🗄️ MongoDB', '🐘 PostgreSQL', '🔒 Redis',
    // DevOps & Tools
    '🐳 Docker', '☸️ Kubernetes', '🐙 GitHub', '👷 Jenkins',
    '☁️ AWS', '🔄 CI/CD', '📊 GraphQL', '🔍 Elasticsearch',
    // AI & ML
    '🧠 TensorFlow', '🔥 PyTorch', '🤖 LLMs', '👁️ Computer Vision',
    // Architecture
    '🏗️ Microservices', '🔌 REST APIs', '📡 WebSockets', '🔐 OAuth'
  ],
  leadership: [
    '🏛️ Architecture Design', '👥 Engineering Leadership', '🌱 Team Building',
    '🎯 Technical Strategy', '🤖 AI Strategy', '💡 Innovation Management',
    '🔄 Digital Transformation', '🔭 Tech Vision', '👨‍🏫 Mentorship',
    '🏃 Agile Leadership', '🤝 Cross-functional Leadership', '📈 Strategic Planning',
    '🎓 Knowledge Sharing', '🌍 Global Team Management', '💼 Resource Planning'
  ]
}

const roles = [
  { text: 'Head of Engineering', position: [-4, 2, 0] },
  { text: 'Principal Engineer', position: [4, 2, 0] },
  { text: 'AI engineer', position: [-3, 0, -2] },
  { text: 'Chapter Lead', position: [-3, 3, -4] },
  { text: 'Tech Lead', position: [-3, 0, 2] },
  { text: 'Architect', position: [3, 0, 2] },
  { text: 'Senior Engineer', position: [-4, -2, 1] },
  { text: 'Developer', position: [3, 2, -4] }
]

export default function Experience({ onRocketClick }) {
  const groupRef = useRef()
  const [showSkills, setShowSkills] = useState(false)
  const [avatarPosition, setAvatarPosition] = useState([0, -1, 0])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  const handleAvatarClick = () => {
    setShowSkills(!showSkills)
  }

  return (
    <group ref={groupRef}>

      
      {/* Enhanced lighting for holy effect */}
      <ambientLight intensity={0.4} color="#ffffff" />
      
      
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.7}
        color="#fffaea"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />

      <Avatar position={avatarPosition} onClick={handleAvatarClick} />
      
      
      <Rocket position={[2, avatarPosition[1], avatarPosition[2]]} onClick={onRocketClick} />
      <Rocket position={[-2, avatarPosition[1] + 1, avatarPosition[2] - 2]} onClick={onRocketClick} />
      <Rocket position={[1, avatarPosition[1] - 1, avatarPosition[2] + 2]} onClick={onRocketClick} />

    {/* Rockets */}
    <Rocket position={[2, avatarPosition[1], avatarPosition[2]]} onClick={onRocketClick} />
      <Rocket position={[-2, avatarPosition[1] + 1, avatarPosition[2] - 2]} onClick={onRocketClick} />
      <Rocket position={[1, avatarPosition[1] - 1, avatarPosition[2] + 2]} onClick={onRocketClick} />

      <Environment preset="apartment"
          background={false} />

      {/* Role titles */}
      {roles.map((role, index) => (
        <Float
          key={index}
          speed={1.5} 
          rotationIntensity={1} 
          floatIntensity={2}
          position={role.position}
        >
          <Center>
            <Text
              fontSize={0.5}
              color="white"
              anchorX="center"
              anchorY="middle"
              material-roughness={0.2}
              material-metalness={0.1}
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {role.text}
            </Text>
          </Center>
        </Float>
      ))}

      {/* Skill popups */}
      {showSkills && (
        <>
          {skills.technical.map((skill, index) => (
            <Float
              key={skill}
              speed={2} 
              rotationIntensity={2} 
              floatIntensity={3}
              position={[
                Math.cos(index * Math.PI * 2 / skills.technical.length) * 8,
                Math.sin(index * Math.PI * 2 / skills.technical.length) * 0.8 + 2,
                Math.sin(index * Math.PI * 2 / skills.technical.length) * 8
              ]}
            >
              <Center>
                <Text
                  fontSize={0.4}
                  color="#00ff88"
                  anchorX="center"
                  anchorY="middle"
                  material-roughness={0.2}
                  material-metalness={0.8}
                  outlineWidth={0.015}
                  outlineColor="#000000"
                >
                  {skill}
                </Text>
              </Center>
            </Float>
          ))}
          {skills.leadership.map((skill, index) => (
            <Float
              key={skill}
              speed={1.5} 
              rotationIntensity={1} 
              floatIntensity={2}
              position={[
                Math.cos(index * Math.PI * 2 / skills.leadership.length) * 5,
                -Math.sin(index * Math.PI * 2 / skills.leadership.length) * 0.8 - 1,
                Math.sin(index * Math.PI * 2 / skills.leadership.length) * 5
              ]}
            >
              <Center>
                <Text
                  fontSize={0.4}
                  color="#ff8800"
                  anchorX="center"
                  anchorY="middle"
                  material-roughness={0.2}
                  material-metalness={0.8}
                  outlineWidth={0.015}
                  outlineColor="#000000"
                >
                  {skill}
                </Text>
              </Center>
            </Float>
          ))}
        </>
      )}

      <mesh 
        rotation-x={-Math.PI * 0.5} 
        position-y={-3} 
        scale={20}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}
