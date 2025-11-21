'use client'

import { useState, useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    
    setIsDark(shouldBeDark)
    
    // Apply to HTML element
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    
    // Toggle dark class on HTML element
    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full glass transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FaSun className="text-yellow-400" size={20} />
      ) : (
        <FaMoon className="text-blue-600" size={20} />
      )}
    </motion.button>
  )
}

export default ThemeToggle