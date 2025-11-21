'use client'

import { motion } from 'framer-motion'
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

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories = [
    {
      category: 'Programming Languages',
      icon: FaCode,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Python', icon: FaPython, color: '#3776AB' },
        { name: 'C', icon: SiC, color: '#A8B9CC' },
        { name: 'C++', icon: SiCplusplus, color: '#00599C' },
        { name: 'MATLAB', icon: FaCode, color: '#0076A8' },
        { name: 'R', icon: SiR, color: '#276DC3' },
        { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
        { name: 'CSS', icon: SiCss3, color: '#1572B6' },
      ]
    },
    {
      category: 'AI/ML Frameworks',
      icon: FaBrain,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
        { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
        { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8' },
        { name: 'YOLOv8', icon: FaBrain, color: '#00FFFF' },
        { name: 'HuggingFace', icon: FaBrain, color: '#FFD21E' },
        { name: 'ViViT', icon: FaBrain, color: '#9D4EDD' },
      ]
    },
    {
      category: 'Developer Tools',
      icon: FaGitAlt,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Jupyter', icon: SiJupyter, color: '#F37626' },
        { name: 'VS Code', icon: SiVisualstudiocode, color: '#007ACC' },
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'GitHub', icon: FaGithub, color: '#808080' },
        { name: 'Docker', icon: FaDocker, color: '#2496ED' },
        { name: 'Tableau', icon: SiTableau, color: '#E97627' },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      ]
    },
    {
      category: 'Cloud & Databases',
      icon: FaDatabase,
      color: 'from-green-500 to-teal-500',
      skills: [
        { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'AWS DynamoDB', icon: FaAws, color: '#FF9900' },
        { name: 'PythonAnywhere', icon: FaPython, color: '#1D9FD7' },
        { name: 'Excel', icon: FaTable, color: '#217346' },
      ]
    },
    {
      category: 'Embedded Systems & IoT',
      icon: FaMicrochip,
      color: 'from-yellow-500 to-orange-500',
      skills: [
        { name: 'Raspberry Pi', icon: SiRaspberrypi, color: '#A22846' },
        { name: 'STM32', icon: FaMicrochip, color: '#03234B' },
        { name: 'Arduino', icon: SiArduino, color: '#00979D' },
        { name: 'Modbus', icon: FaMicrochip, color: '#0066CC' },
        { name: 'MQTT', icon: FaMicrochip, color: '#660066' },
        { name: 'PLC', icon: FaMicrochip, color: '#FF6B35' },
      ]
    },
    {
      category: 'Soft Skills',
      icon: FaBrain,
      color: 'from-pink-500 to-rose-500',
      skills: [
        { name: 'Problem Solving', icon: FaBrain, color: '#EC4899' },
        { name: 'Communication', icon: FaBrain, color: '#F472B6' },
        { name: 'Teamwork', icon: FaBrain, color: '#FB7185' },
        { name: 'Critical Thinking', icon: FaBrain, color: '#FDA4AF' },
        { name: 'Leadership', icon: FaBrain, color: '#FBBF24' },
      ]
    },
  ]

  const areasOfInterest = [
    { name: 'Machine Learning', emoji: '🤖', color: 'bg-blue-500/20 border-blue-500/30 text-blue-400' },
    { name: 'Computer Vision', emoji: '👁️', color: 'bg-purple-500/20 border-purple-500/30 text-purple-400' },
    { name: 'Natural Language Processing', emoji: '💬', color: 'bg-green-500/20 border-green-500/30 text-green-400' },
    { name: 'IoT Systems', emoji: '🔧', color: 'bg-orange-500/20 border-orange-500/30 text-orange-400' },
    { name: 'Embedded Systems', emoji: '⚡', color: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' },
    { name: 'Deep Learning', emoji: '🧠', color: 'bg-pink-500/20 border-pink-500/30 text-pink-400' },
  ]

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

        {/* Skill Categories */}
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <CategoryIcon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon
                    return (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="glass p-4 rounded-xl text-center group cursor-pointer"
                      >
                        <div
                          className="mb-3 flex justify-center transition-transform group-hover:scale-110"
                          style={{ color: skill.color }}
                        >
                          <SkillIcon size={40} />
                        </div>
                        <p className="font-semibold text-sm text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                          {skill.name}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

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
            {areasOfInterest.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`px-6 py-3 rounded-full border ${area.color} font-semibold flex items-center gap-2`}
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
          <h3 className="text-2xl font-bold mb-4">Continuous Learner</h3>
          <p className="text-gray-400 max-w-3xl mx-auto mb-6">
            I'm constantly expanding my skill set and staying up-to-date with the latest 
            technologies in AI/ML, Computer Vision, and IoT. From training deep learning models 
            to deploying them on edge devices, I enjoy working across the full stack of modern technology.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm">
              6+ Certifications
            </span>
            <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm">
              10+ Projects
            </span>
            <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm">
              Multiple Workshops
            </span>
            <span className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm">
              Hackathon Winner
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills