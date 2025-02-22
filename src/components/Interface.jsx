import { motion } from 'framer-motion'

export default function Interface({ showContact }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-10 left-0 right-0 text-center text-white pointer-events-auto"
      >
        <h1
          className="text-6xl font-bold text-white mb-8"
          style={{
            padding: "2rem",
            background: "rgba(0, 0, 0, 0.7)",
            borderRadius: "1rem",
            opacity: 0.18,
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)"
          }}
        >
          Sean's Universe
        </h1>
        <p     style={{ 
            opacity: 0.01
          }} className="text-2xl text-white/60">Click the avatar& rocket</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-5 right-5 text-white text-right pointer-events-auto"
      >
        <p className="text-sm">Drag to explore</p>
        <p className="text-sm">Scroll to zoom</p>
        <p className="text-sm text-yellow-400">Click avatar & rocket</p>
      </motion.div>

      {/* Contact Popup */}
      {showContact && (
        <div
          className="absolute top-[40%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
          style={{
            padding: "2rem",
            background: "rgba(0, 0, 0, 0.9)",
            borderRadius: "1rem",
            boxShadow: "0 0 30px rgba(255, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
            animation: "fadeInOut 3s forwards"
          }}
        >
          <h2 className="text-4xl font-bold text-white">Contact Me</h2>
          <p className="text-2xl text-white mt-4">LSeanLon@gmail.com</p>
          <p className="text-2xl text-white mt-4">
            <a href="https://linkedin.com/in/seanlon">linkedin.com/in/seanlon</a></p>
        </div>
      )}
    </div>
  )
}
