'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCode, FaRocket, FaBrain, FaAward, FaCoffee, FaHeart } from 'react-icons/fa'
import { useState } from 'react'

const BentoShowcase = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const bentoItems = [
    {
      id: 1,
      title: 'Code Quality',
      description: 'Writing clean, maintainable, and well-documented code',
      icon: FaCode,
      color: 'glass-blue',
      stat: '2000+',
      statLabel: 'Hours Coding'
    },
    {
      id: 2,
      title: 'Quick Facts',
      facts: [
        '☕ Coffee enthusiast',
        '🌙 Night owl developer',
        '🎮 Tech blogger',
        '📚 Lifelong learner'
      ],
      color: 'glass-purple'
    },
    {
      id: 3,
      title: 'Problem Solving',
      description: 'Analytical thinking and algorithm optimization',
      icon: FaBrain,
      color: 'glass-emerald',
      stat: '100+',
      statLabel: 'Problems Solved'
    },
    {
      id: 4,
      title: 'Passion',
      description: 'Building solutions that make a difference',
      icon: FaHeart,
      color: 'glass',
      gradient: true
    },
    {
      id: 5,
      title: 'Currently Working On',
      items: [
        { name: 'AI Models', icon: '🤖', color: 'text-blue-400' },
        { name: 'IoT Projects', icon: '📡', color: 'text-green-400' },
        { name: 'Open Source', icon: '💻', color: 'text-purple-400' }
      ],
      color: 'glass'
    },
    {
      id: 6,
      title: 'Achievements',
      description: 'Recognition for technical excellence and innovation',
      icon: FaAward,
      color: 'glass-blue',
      stat: '5+',
      statLabel: 'Awards Won'
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            More <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-gray-400 text-lg">Quick insights into my work and personality</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bento-item-${item.id} ${item.color} p-6 rounded-2xl cursor-pointer relative overflow-hidden group`}
            >
              {/* Gradient overlay for special items */}
              {item.gradient && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              {/* Icon-based card */}
              {item.icon && (
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <item.icon className="text-4xl text-white opacity-80" />
                    {item.stat && (
                      <div className="text-right">
                        <div className="text-3xl font-bold gradient-text">{item.stat}</div>
                        <div className="text-xs text-gray-400">{item.statLabel}</div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                  )}
                </div>
              )}

              {/* Facts list card */}
              {item.facts && (
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <div className="space-y-2">
                    {item.facts.map((fact, factIndex) => (
                      <motion.div
                        key={factIndex}
                        initial={{ x: -20, opacity: 0 }}
                        animate={inView ? { x: 0, opacity: 1 } : {}}
                        transition={{ delay: 0.5 + factIndex * 0.1 }}
                        className="text-gray-300 text-sm"
                      >
                        {fact}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects list card */}
              {item.items && (
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <div className="space-y-3">
                    {item.items.map((project, projIndex) => (
                      <motion.div
                        key={projIndex}
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ delay: 0.5 + projIndex * 0.1, type: 'spring' }}
                        className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <span className="text-2xl">{project.icon}</span>
                        <span className={`text-sm font-semibold ${project.color}`}>
                          {project.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hover shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BentoShowcase
