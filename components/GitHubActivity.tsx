'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Contribution {
  date: string
  count: number
  level: number
}

const GitHubActivity = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (inView) {
      fetchContributions()
    }
  }, [inView])

  const fetchContributions = async () => {
    try {
      // Generate mock data
      const mockData = generateMockContributions()
      setContributions(mockData.contributions)
      setTotalContributions(mockData.total)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching contributions:', error)
      setLoading(false)
    }
  }

  const generateMockContributions = () => {
    const contributions: Contribution[] = []
    const today = new Date()
    let total = 0

    // Generate last 365 days
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const count = Math.floor(Math.random() * 15)
      total += count
      
      let level = 0
      if (count > 0) level = 1
      if (count > 3) level = 2
      if (count > 6) level = 3
      if (count > 9) level = 4

      contributions.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      })
    }

    return { contributions, total }
  }

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-gray-800',
      'bg-green-900',
      'bg-green-700',
      'bg-green-500',
      'bg-green-300'
    ]
    return colors[level]
  }

  const getWeeks = () => {
    const weeks: Contribution[][] = []
    let week: Contribution[] = []

    contributions.forEach((contribution, index) => {
      week.push(contribution)
      if ((index + 1) % 7 === 0 || index === contributions.length - 1) {
        weeks.push([...week])
        week = []
      }
    })

    return weeks
  }

  const currentStreak = () => {
    let streak = 0
    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i].count > 0) streak++
      else break
    }
    return streak
  }

  const longestStreak = () => {
    let current = 0
    let longest = 0
    contributions.forEach(c => {
      if (c.count > 0) {
        current++
        longest = Math.max(longest, current)
      } else {
        current = 0
      }
    })
    return longest
  }

  return (
    <section id="activity" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="text-gray-400 text-lg">My coding journey visualized</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-2xl"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-green-400">{totalContributions}</div>
                <div className="text-sm text-gray-400">Total Contributions</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-blue-400">{currentStreak()}</div>
                <div className="text-sm text-gray-400">Current Streak</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-purple-400">{longestStreak()}</div>
                <div className="text-sm text-gray-400">Longest Streak</div>
              </div>
            </div>

            {/* Contribution Graph */}
            <div className="overflow-x-auto pb-4">
              <div className="inline-flex gap-1 min-w-max">
                {getWeeks().map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                        whileHover={{ scale: 1.5, zIndex: 10 }}
                        className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} relative group`}
                        title={`${day.date}: ${day.count} contributions`}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                          {day.count} contributions on {day.date}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4 text-sm text-gray-400">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map(level => (
                <div key={level} className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`} />
              ))}
              <span>More</span>
            </div>

            {/* Link to GitHub */}
            <div className="text-center mt-6">
              <motion.a
                href="https://github.com/Atharva0177"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-semibold text-white"
              >
                View Full Profile on GitHub
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default GitHubActivity