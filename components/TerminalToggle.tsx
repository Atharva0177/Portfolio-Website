'use client'

import { useState, useEffect } from 'react'
import { FaTerminal, FaPalette } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const TerminalToggle = () => {
  const [isTerminal, setIsTerminal] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Check localStorage
    const savedMode = localStorage.getItem('displayMode')
    const shouldBeTerminal = savedMode === 'terminal'
    
    setIsTerminal(shouldBeTerminal)
    
    // Apply to HTML element
    if (shouldBeTerminal) {
      document.documentElement.classList.add('terminal')
      document.documentElement.classList.add('dark') // Terminal mode is always dark
    } else {
      document.documentElement.classList.remove('terminal')
    }
  }, [])

  const toggleMode = () => {
    const newMode = !isTerminal
    setIsTerminal(newMode)
    
    // Save to localStorage
    localStorage.setItem('displayMode', newMode ? 'terminal' : 'normal')
    
    // Toggle terminal class on HTML element
    if (newMode) {
      document.documentElement.classList.add('terminal')
      document.documentElement.classList.add('dark') // Force dark mode
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('terminal')
    }
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMode}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`p-2 rounded-full glass transition-all duration-300 ${
          isTerminal ? 'bg-green-500/20 border-green-500' : ''
        }`}
        aria-label="Toggle terminal mode"
      >
        <motion.div
          animate={{ rotate: isTerminal ? 0 : 360 }}
          transition={{ duration: 0.5 }}
        >
          {isTerminal ? (
            <FaTerminal className="text-green-400 text-xl" />
          ) : (
            <FaPalette className="text-blue-400 text-xl" />
          )}
        </motion.div>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap shadow-xl z-50"
          >
            {isTerminal ? 'Exit Terminal Mode' : 'Enter Terminal Mode'}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal style indicator */}
      {isTerminal && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"
        />
      )}
    </div>
  )
}

export default TerminalToggle
