'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="px-4 py-2 rounded-full glass text-sm text-blue-400 font-semibold">
            👋 Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          Hi, I'm{' '}
          <span className="gradient-text">Atharva</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="text-2xl md:text-4xl mb-8 h-20">
          <TypeAnimation
            sequence={[
              'Full Stack Developer 🚀',
              2000,
              'Machine Learning Engineer 🤖',
              2000,
              'Problem Solver 💡',
              2000,
              'Tech Explorer 🌟',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Passionate developer from Pune, crafting beautiful and functional web experiences.
          Turning ideas into reality with clean code and modern design.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-6 justify-center mb-12">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white shadow-lg"
          >
            Get In Touch
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass rounded-full font-semibold text-white"
          >
            View Projects
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-6 justify-center">
          {[
            { icon: FaGithub, url: 'https://github.com/Atharva0177', color: 'hover:text-gray-400' },
            { icon: FaLinkedin, url: '#', color: 'hover:text-blue-400' },
            { icon: FaTwitter, url: '#', color: 'hover:text-sky-400' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 glass rounded-full text-white transition-colors ${social.color}`}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          {/* <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <HiArrowDown className="text-4xl text-blue-400" />
          </motion.div> */}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero