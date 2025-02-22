import { useEffect, useRef } from 'react'

const codeSnippets = [
  'const promise = new Promise();',
  'async function init() {',
  'export default class {',
  'npm install three',
  'git commit -m "feat:"',
  'useState(() => {})',
  'useEffect(() => {}, [])',
  'docker build -t',
  'kubectl apply -f',
  'SELECT * FROM users',
  'ALTER TABLE add',
  'python -m venv',
  'pip install -r',
  'import tensorflow as tf',
  'model.compile()',
  'yarn dev',
  'nginx -t',
  'ssh-keygen -t',
  'systemctl status',
  'console.log()',
]

export default function MatrixBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create drops
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = new Array(Math.floor(columns)).fill(1)
    
    // Animation function
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#0F0'
      ctx.font = fontSize + 'px monospace'
      
      for (let i = 0; i < drops.length; i++) {
        const text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        
        ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.2})`
        ctx.fillText(text[Math.floor(Math.random() * text.length)], x, y)
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        
        drops[i]++
      }
    }

    // Run animation
    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="matrixbackground fixed top-0 left-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: -1 }}
    />
  )
}
