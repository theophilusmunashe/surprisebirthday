"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  left: number
  delay: number
  color: string
  size: number
  shape: 'circle' | 'square' | 'triangle' | 'heart' | 'star'
  rotation: number
  duration: number
}

export function ConfettiEffect() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const colors = [
      "#ff6b6b", "#ff8e53", "#ff6b9d", "#c44569",
      "#f8b500", "#ffa726", "#ffcc02", "#f39c12",
      "#ff9ff3", "#f368e0", "#ff3838", "#ff6348",
      "#70a1ff", "#5352ed", "#3742fa", "#2f3542"
    ]
    
    const shapes: ConfettiPiece['shape'][] = ['circle', 'square', 'triangle', 'heart', 'star']
    
    const newConfetti = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4, // 4-12px
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      duration: Math.random() * 2 + 3, // 3-5 seconds
    }))
    setConfetti(newConfetti)
  }, [])

  const getShapeComponent = (piece: ConfettiPiece) => {
    const baseClasses = "absolute"
    const style = {
      left: `${piece.left}%`,
      width: `${piece.size}px`,
      height: `${piece.size}px`,
      backgroundColor: piece.color,
    }

    switch (piece.shape) {
      case 'circle':
        return (
          <motion.div
            className={`${baseClasses} rounded-full`}
            style={style}
            initial={{ y: -100, rotate: 0, opacity: 1 }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800, 
              rotate: piece.rotation * 4,
              opacity: 0 
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "easeIn"
            }}
          />
        )
      
      case 'square':
        return (
          <motion.div
            className={baseClasses}
            style={style}
            initial={{ y: -100, rotate: 0, opacity: 1 }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800, 
              rotate: piece.rotation * 3,
              opacity: 0 
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "easeIn"
            }}
          />
        )
      
      case 'triangle':
        return (
          <motion.div
            className={baseClasses}
            style={{
              left: `${piece.left}%`,
              width: 0,
              height: 0,
              borderLeft: `${piece.size/2}px solid transparent`,
              borderRight: `${piece.size/2}px solid transparent`,
              borderBottom: `${piece.size}px solid ${piece.color}`,
            }}
            initial={{ y: -100, rotate: 0, opacity: 1 }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800, 
              rotate: piece.rotation * 5,
              opacity: 0 
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "easeIn"
            }}
          />
        )
      
      case 'heart':
        return (
          <motion.div
            className={`${baseClasses} text-center leading-none`}
            style={{
              left: `${piece.left}%`,
              fontSize: `${piece.size}px`,
              color: piece.color,
            }}
            initial={{ y: -100, rotate: 0, opacity: 1 }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800, 
              rotate: piece.rotation * 2,
              opacity: 0 
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "easeIn"
            }}
          >
            ❤️
          </motion.div>
        )
      
      case 'star':
        return (
          <motion.div
            className={`${baseClasses} text-center leading-none`}
            style={{
              left: `${piece.left}%`,
              fontSize: `${piece.size}px`,
              color: piece.color,
            }}
            initial={{ y: -100, rotate: 0, opacity: 1 }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800, 
              rotate: piece.rotation * 6,
              opacity: 0 
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "easeIn"
            }}
          >
            ⭐
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div key={piece.id}>
          {getShapeComponent(piece)}
        </div>
      ))}
      
      {/* Additional floating birthday elements */}
      <motion.div
        className="absolute top-10 left-10 text-4xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🎂
      </motion.div>
      
      <motion.div
        className="absolute top-20 right-20 text-3xl"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -15, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        🎈
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-1/4 text-3xl"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 20, -20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        🎉
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 right-1/3 text-2xl"
        animate={{
          y: [0, -18, 0],
          rotate: [0, -25, 25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        🥳
      </motion.div>
    </div>
  )
}
