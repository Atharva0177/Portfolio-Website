'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'resume', 'skills', 'contact']
    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        setScrolled(window.scrollY > 50)

        // Determine active section by finding which section is currently in view
        const scrollY = window.scrollY + 120 // offset for navbar height
        let current = 'home'

        for (const id of sectionIds) {
          const element = document.getElementById(id)
          if (!element) continue
          const { top } = element.getBoundingClientRect()
          const offsetTop = top + window.scrollY

          if (scrollY >= offsetTop) {
            current = id
          }
        }

        // Handle bottom of page — if scrolled to the very bottom, activate the last section
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
          current = sectionIds[sectionIds.length - 1]
        }

        setActiveSection(current)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount to set initial state
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const navItems = ['Home', 'About', 'Projects', 'Resume', 'Skills', 'Contact']

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text"
          >
            Atharva.dev
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.toLowerCase()
              return (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className={`relative py-1 transition-all duration-300 ${isActive
                    ? 'gradient-text font-semibold'
                    : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {item}
                  {/* Active indicator — animated gradient bar */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                    initial={false}
                    animate={{
                      width: isActive ? '100%' : '0%',
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                  {/* Active glow */}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm"
                      layoutId="navGlow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              )
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass rounded-lg p-4"
          >
            {navItems.map((item, index) => {
              const isActive = activeSection === item.toLowerCase()
              return (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 transition-colors ${isActive
                    ? 'gradient-text font-semibold'
                    : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2" />
                  )}
                  {item}
                </motion.a>
              )
            })}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
