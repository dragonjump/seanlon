import { useEffect, useRef } from 'react'

export default function BackgroundMusic() {
  const audioContextRef = useRef(null)
  const oscillatorsRef = useRef([])

  useEffect(() => {
    // Create audio context
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    const ctx = audioContextRef.current

    // Create gain node for volume control
    const masterGain = ctx.createGain()
    masterGain.gain.value = 0.15 // Set volume to 15%
    masterGain.connect(ctx.destination)

    // Space theme notes (pentatonic scale)
    const frequencies = [196, 220, 262, 294, 330, 392]
    
    // Create oscillators
    oscillatorsRef.current = frequencies.map(freq => {
      // Main oscillator
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq

      // Individual gain node
      const gain = ctx.createGain()
      gain.gain.value = 0
      
      // Connect oscillator to its gain node
      osc.connect(gain)
      gain.connect(masterGain)
      
      // Start the oscillator
      osc.start()
      
      return { oscillator: osc, gain: gain }
    })

    // Function to play random notes
    const playRandomNote = () => {
      const idx = Math.floor(Math.random() * oscillatorsRef.current.length)
      const { gain } = oscillatorsRef.current[idx]
      
      // Fade in
      gain.gain.setTargetAtTime(0.5, ctx.currentTime, 0.1)
      
      // Fade out after a random duration
      const duration = 1 + Math.random() * 2
      gain.gain.setTargetAtTime(0, ctx.currentTime + duration, 0.1)
    }

    // Play notes randomly
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance to play a note
        playRandomNote()
      }
    }, 500)

    // Add reverb effect
    const convolver = ctx.createConvolver()
    const reverbTime = 2
    const sampleRate = ctx.sampleRate
    const length = sampleRate * reverbTime
    const impulse = ctx.createBuffer(2, length, sampleRate)
    
    for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
      const channelData = impulse.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleRate * 0.1))
      }
    }
    
    convolver.buffer = impulse
    masterGain.connect(convolver)
    convolver.connect(ctx.destination)

    // Cleanup
    return () => {
      clearInterval(interval)
      oscillatorsRef.current.forEach(({ oscillator }) => oscillator.stop())
      ctx.close()
    }
  }, [])

  return null
}
