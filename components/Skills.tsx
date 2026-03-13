'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FaPython,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaDatabase,
  FaMicrochip,
  FaBrain,
  FaCode,
  FaGithub,
  FaTable
} from 'react-icons/fa'
import {
  SiPytorch,
  SiTensorflow,
  SiOpencv,
  SiJupyter,
  SiMysql,
  SiMongodb,
  SiTableau,
  SiCplusplus,
  SiC,
  SiHtml5,
  SiCss3,
  SiR,
  SiVisualstudiocode,
  SiPostman,
  SiRaspberrypi,
  SiArduino
} from 'react-icons/si'

const Skills = ({ content }: { content: any }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Map icon components by skill name
  const SKILL_ICON_MAP: Record<string, any> = {
    'Python': FaPython, 'C': SiC, 'C++': SiCplusplus, 'MATLAB': FaCode, 'R': SiR,
    'HTML': SiHtml5, 'CSS': SiCss3, 'PyTorch': SiPytorch, 'TensorFlow': SiTensorflow,
    'OpenCV': SiOpencv, 'YOLOv8': FaBrain, 'HuggingFace': FaBrain, 'ViViT': FaBrain,
    'Jupyter': SiJupyter, 'VS Code': SiVisualstudiocode, 'Git': FaGitAlt, 'GitHub': FaGithub,
    'Docker': FaDocker, 'Tableau': SiTableau, 'Postman': SiPostman, 'MySQL': SiMysql,
    'MongoDB': SiMongodb, 'AWS DynamoDB': FaAws, 'PythonAnywhere': FaPython, 'Excel': FaTable,
    'Raspberry Pi': SiRaspberrypi, 'STM32': FaMicrochip, 'Arduino': SiArduino,
    'Modbus': FaMicrochip, 'MQTT': FaMicrochip, 'PLC': FaMicrochip,
    'Problem Solving': FaBrain, 'Communication': FaBrain, 'Teamwork': FaBrain,
    'Critical Thinking': FaBrain, 'Leadership': FaBrain,
  }

  const CATEGORY_ICON_MAP: Record<string, any> = {
    'Programming Languages': FaCode, 'AI/ML Frameworks': FaBrain, 'Developer Tools': FaGitAlt,
    'Cloud & Databases': FaDatabase, 'Embedded Systems & IoT': FaMicrochip, 'Soft Skills': FaBrain,
  }

  const AREA_COLORS: Record<string, string> = {
    'Machine Learning': 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    'Computer Vision': 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    'Natural Language Processing': 'bg-green-500/20 border-green-500/30 text-green-400',
    'IoT Systems': 'bg-orange-500/20 border-orange-500/30 text-orange-400',
    'Embedded Systems': 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
    'Deep Learning': 'bg-pink-500/20 border-pink-500/30 text-pink-400',
  }

  const BADGE_COLORS = [
    'bg-blue-500/10 border-blue-500/30 text-blue-400',
    'bg-green-500/10 border-green-500/30 text-green-400',
    'bg-purple-500/10 border-purple-500/30 text-purple-400',
    'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  ]

  const skillCategories = content.categories
  const areasOfInterest = content.areasOfInterest

  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextCategory = useCallback(() => {
    setActiveIndex((prev: number) => (prev === skillCategories.length - 1 ? 0 : prev + 1))
  }, [skillCategories.length])

  const prevCategory = () => {
    setActiveIndex((prev: number) => (prev === 0 ? skillCategories.length - 1 : prev - 1))
  }

  // Auto-scroll effect
  useEffect(() => {
    if (isHovered || skillCategories.length <= 1) return

    const timer = setInterval(() => {
      nextCategory()
    }, 4000) // Change category every 4 seconds

    return () => clearInterval(timer)
  }, [isHovered, nextCategory, skillCategories.length])

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg">Technologies and tools I work with</p>
        </motion.div>

        {/* Skill Category Carousel */}
        {skillCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="w-full max-w-5xl mx-auto cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Navigation and Category Title */}
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={prevCategory}
                className="p-3 bg-gray-800/50 hover:bg-gray-700/80 rounded-full text-gray-300 transition-colors border border-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${skillCategories[activeIndex].color}`}>
                    {(() => {
                      const CategoryIcon = CATEGORY_ICON_MAP[skillCategories[activeIndex].category] || FaCode
                      return <CategoryIcon className="text-2xl text-white" />
                    })()}
                  </div>
                  <h3 className="text-2xl font-bold">{skillCategories[activeIndex].category}</h3>
                </div>
                
                {/* Dots indicator */}
                <div className="flex gap-2 mt-4">
                  {skillCategories.map((_: any, idx: number) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-blue-500' : 'w-2 bg-gray-600 hover:bg-gray-400'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button 
                onClick={nextCategory}
                className="p-3 bg-gray-800/50 hover:bg-gray-700/80 rounded-full text-gray-300 transition-colors border border-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Active Category Skills Grid */}
            <div className="glass p-6 md:p-8 rounded-2xl relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                  {skillCategories[activeIndex].skills.map((skill: any, skillIndex: number) => {
                    const SkillIcon = SKILL_ICON_MAP[skill.name] || FaCode
                    return (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gray-900/40 border border-gray-800 p-4 rounded-xl text-center group cursor-pointer hover:border-gray-600 transition-colors"
                      >
                        <div
                          className="mb-3 flex justify-center transition-transform group-hover:scale-110"
                          style={{ color: skill.color }}
                        >
                          {skill.iconUrl ? (
                            <img src={skill.iconUrl} alt={skill.name} className="w-10 h-10 object-contain" />
                          ) : (
                            <SkillIcon size={40} />
                          )}
                        </div>
                        <p className="font-semibold text-sm text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                          {skill.name}
                        </p>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Areas of Interest */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 glass p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-center gradient-text">
            Areas of Interest
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {areasOfInterest.map((area: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`px-6 py-3 rounded-full border ${AREA_COLORS[area.name] || 'bg-blue-500/20 border-blue-500/30 text-blue-400'} font-semibold flex items-center gap-2`}
              >
                <span className="text-2xl">{area.emoji}</span>
                <span>{area.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 glass p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-4">{content.summary.title}</h3>
          <p className="text-gray-400 max-w-3xl mx-auto mb-6">
            {content.summary.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {content.summary.badges.map((badge: string, i: number) => (
              <span key={i} className={`px-4 py-2 ${BADGE_COLORS[i % BADGE_COLORS.length]} border rounded-full text-sm`}>
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills