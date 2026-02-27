'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100))
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50 shadow-lg progress-glow"
        style={{ scaleX }}
      />
      
      {/* Optional: Glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-40 blur-sm opacity-50"
        style={{ scaleX }}
      />

      {/* Scroll Percentage Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollPercentage > 5 ? 1 : 0,
          scale: scrollPercentage > 5 ? 1 : 0
        }}
        className="fixed bottom-8 right-8 z-50 glass rounded-full w-16 h-16 flex items-center justify-center shadow-xl"
      >
        <div className="text-center">
          <div className="text-lg font-bold gradient-text">{scrollPercentage}%</div>
        </div>
        
        {/* Circular Progress */}
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="2"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 28}`}
            style={{
              strokeDashoffset: useTransform(
                scrollYProgress,
                [0, 1],
                [2 * Math.PI * 28, 0]
              )
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </>
  )
}

export default ScrollProgress
