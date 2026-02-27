'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { FaCode, FaRocket, FaUsers, FaAward, FaGraduationCap, FaTrophy, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaStar, FaFire } from 'react-icons/fa'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { icon: FaCode, label: 'Projects Completed', value: '10+', color: 'text-blue-400' },
    { icon: FaTrophy, label: 'Hackathons Won', value: '3', color: 'text-yellow-400' },
    { icon: FaAward, label: 'Patents Filed', value: '1', color: 'text-green-400' },
    { icon: FaGraduationCap, label: 'CGPA', value: '8.85', color: 'text-purple-400' },
  ]

  const education = [
    {
      degree: 'B.Tech in Electronics & Communication',
      institution: 'MIT World Peace University, Pune',
      period: 'August 2019 - March 2025',
      grade: 'CGPA: 8.85/10',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      degree: 'Higher Secondary Education (12th)',
      institution: 'Namo Rims Jr. College, Pune',
      period: 'August 2019 - July 2021',
      grade: '91.50%',
      color: 'from-purple-500 to-pink-500'
    },
    {
      degree: 'Secondary Education (10th)',
      institution: 'Sacred Heart Convent High School',
      period: 'Completed',
      grade: '93.20%',
      color: 'from-green-500 to-teal-500'
    }
  ]

  const expertise = [
    {
      title: 'Machine Learning & AI',
      description: 'Deep Learning, Computer Vision, NLP',
      icon: '🤖',
      skills: ['PyTorch', 'TensorFlow', 'YOLOv8', 'ViViT', 'HuggingFace']
    },
    {
      title: 'Programming',
      description: 'Multiple languages & frameworks',
      icon: '💻',
      skills: ['Python', 'C/C++', 'MATLAB', 'R', 'HTML/CSS']
    },
    {
      title: 'Cloud & Databases',
      description: 'AWS & Database Management',
      icon: '☁️',
      skills: ['AWS DynamoDB', 'MySQL', 'MongoDB', 'PythonAnywhere']
    },
    {
      title: 'IoT & Embedded Systems',
      description: 'Hardware integration & protocols',
      icon: '🔧',
      skills: ['Raspberry Pi', 'STM32', 'Modbus', 'MQTT', 'OpenCV']
    }
  ]

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/Atharva0177', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/atharva-mandavkar', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: FaEnvelope, url: 'mailto:mandavkaratharva@gmail.com', label: 'Email', color: 'hover:text-red-400' },
  ]

  const topSkills = [
    { name: 'Python', level: 95, color: 'bg-blue-500' },
    { name: 'Machine Learning', level: 90, color: 'bg-green-500' },
    { name: 'IoT & Embedded', level: 85, color: 'bg-purple-500' },
    { name: 'Cloud (AWS)', level: 80, color: 'bg-yellow-500' },
  ]

  const languages = [
    { name: 'English', level: 'Fluent' },
    { name: 'Hindi', level: 'Native' },
    { name: 'Marathi', level: 'Native' },
  ]

  return (
    <section id="about" className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 text-lg">Electronics Engineer | AI-ML Enthusiast | Problem Solver</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="glass p-6 rounded-xl text-center"
            >
              <stat.icon className={`text-4xl ${stat.color} mx-auto mb-4`} />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Centered Profile Card & Bio - EQUAL HEIGHT */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Left Column - Profile Picture Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 rounded-2xl flex flex-col h-full"
          >
            {/* Profile Picture */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mb-4"
            >
              <div className="relative w-48 h-48 mx-auto">
                {/* Animated Border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
                >
                  <div className="w-full h-full rounded-full bg-gray-900" />
                </motion.div>
                
                {/* Profile Image */}
                <div className="absolute inset-0 m-1">
                  <Image
                    src="https://github.com/Atharva0177.png"
                    alt="Atharva Mandavkar"
                    width={192}
                    height={192}
                    className="rounded-full object-cover w-full h-full"
                    priority
                  />
                </div>

                {/* Status Badge */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900"
                  title="Available for opportunities"
                />
              </div>
            </motion.div>

            {/* Name & Title */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold mb-2 gradient-text">Atharva Mandavkar</h3>
              <p className="text-gray-400 text-sm mb-1">B.Tech ECE | MIT WPU</p>
              <p className="text-green-400 text-sm flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Available for opportunities
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 glass rounded-full transition-colors ${social.color}`}
                  title={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>

            {/* Quick Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10">
                <FaMapMarkerAlt className="text-pink-400 text-lg flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Pune, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10">
                <FaGraduationCap className="text-purple-400 text-lg flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Graduated March 2025</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10">
                <FaBriefcase className="text-blue-400 text-lg flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Open to Work</span>
              </div>
            </div>

            {/* Top Skills Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <FaFire className="text-orange-400 text-xl" />
                <h4 className="font-bold text-white">Top Skills</h4>
              </div>
              <div className="space-y-2">
                {topSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-sm text-white flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🌐</span>
                <h4 className="font-bold text-white">Languages</h4>
              </div>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-white">{lang.name}</span>
                    <span className="text-gray-400 text-xs">{lang.level}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Who I Am */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass p-8 rounded-2xl flex flex-col h-full"
          >
            <h3 className="text-3xl font-bold mb-6 gradient-text">Who I Am</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed flex-grow">
              <p>
                👋 Hi! I'm <span className="text-white font-semibold">Atharva Mandavkar</span>, 
                a passionate Electronics and Communication Engineering student from 
                <span className="text-blue-400"> MIT World Peace University, Pune</span>, 
                graduating in March 2025.
              </p>
              <p>
                🚀 I specialize in <span className="text-green-400 font-semibold">Machine Learning</span>, 
                <span className="text-purple-400 font-semibold"> Computer Vision</span>, and 
                <span className="text-yellow-400 font-semibold"> IoT Systems</span>. 
                My journey has been driven by a desire to solve real-world problems using AI and embedded technologies.
              </p>
              <p>
                🏆 I've had the privilege of winning multiple national hackathons including 
                <span className="text-yellow-400 font-semibold"> Smart India Hackathon 2023</span> and 
                <span className="text-blue-400 font-semibold"> eYantra Innovation Challenge 2023-24</span>, 
                where our team won the Best Implementation Award at the National Finals.
              </p>
              <p>
                🤖 Recently achieved a significant milestone with a <span className="text-purple-400 font-semibold">published patent</span> on 
                <span className="text-cyan-400 font-semibold"> "AI-Driven Crime Detection using Existing CCTV Networks"</span> (Publication No: 03/2026). 
                The system leverages advanced machine learning and video transformers to enhance surveillance with real-time anomaly detection and intelligent alerting.
              </p>
              <p>
              💡 My expertise lies in developing end-to-end AI-ML solutions—from training deep learning models 
                using <span className="text-pink-400">PyTorch</span> and <span className="text-orange-400">YOLOv8</span> 
                to deploying them on edge devices like Raspberry Pi and STM32 microcontrollers.
              </p>
              <p>
                🎯 When I'm not coding, I'm exploring new technologies, participating in workshops, 
                or contributing to innovative projects that make a difference. I believe in continuous 
                learning and pushing the boundaries of what's possible with technology.
              </p>
            </div>

            {/* Contact Info - At Bottom */}
            <div className="mt-6 pt-6 border-t border-gray-300 dark:border-white/10">
              <div className="grid grid-cols-1 gap-3">
                <a 
                  href="mailto:mandavkaratharva@gmail.com"
                  className="flex items-center gap-3 text-sm p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors group"
                >
                  <FaEnvelope className="text-blue-400 text-lg flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white truncate">mandavkaratharva@gmail.com</span>
                </a>
                <a 
                  href="tel:+917972326112"
                  className="flex items-center gap-3 text-sm p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors group"
                >
                  <FaPhone className="text-green-400 text-lg flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">+91 7972326112</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Expertise Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-10"
        >
          <h3 className="text-2xl font-bold mb-8 text-center gradient-text">Areas of Expertise</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {expertise.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{area.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">{area.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Timeline - Enhanced with Animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass p-8 rounded-2xl mb-8 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
          
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.75 }}
            className="text-2xl font-bold mb-8 flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <FaGraduationCap className="text-purple-400" />
            </motion.div>
            Educational Journey
          </motion.h3>
          
          <div className="relative space-y-8">
            {/* Animated vertical line */}
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: '100%' } : {}}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute left-[15px] top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-50"
            />
            
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  delay: 0.9 + index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="relative pl-12"
              >
                {/* Animated timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ 
                    delay: 0.9 + index * 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                  className="absolute left-0 top-4 z-10"
                >
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.7)',
                        '0 0 0 10px rgba(59, 130, 246, 0)',
                        '0 0 0 0 rgba(59, 130, 246, 0)'
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      delay: index * 0.3
                    }}
                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center"
                  >
                    <FaGraduationCap className="text-white text-xs" />
                  </motion.div>
                </motion.div>
                
                {/* Education card with gradient border */}
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`bg-gradient-to-r ${edu.color} p-0.5 rounded-xl shadow-lg`}
                >
                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <motion.h4 
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 1 + index * 0.2 }}
                        className="text-lg font-bold text-gray-900 dark:text-white"
                      >
                        {edu.degree}
                      </motion.h4>
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 1.1 + index * 0.2 }}
                        className="text-sm px-4 py-1.5 bg-gray-200 dark:bg-white/10 rounded-full text-gray-700 dark:text-gray-300 font-medium"
                      >
                        {edu.period}
                      </motion.span>
                    </div>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.2 + index * 0.2 }}
                      className="text-blue-600 dark:text-blue-400 font-semibold mb-3 flex items-center gap-2"
                    >
                      <FaMapMarkerAlt className="text-sm" />
                      {edu.institution}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.3 + index * 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <FaStar className="text-yellow-500 dark:text-yellow-400" />
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg">{edu.grade}</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="glass p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-6 gradient-text">Key Highlights</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/20 transition-all">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-bold mb-1">Smart India Hackathon 2023</h4>
              <p className="text-sm text-gray-400">Selected for National Level</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all">
              <div className="text-3xl mb-2">🥇</div>
              <h4 className="font-bold mb-1">eYantra Innovation Challenge</h4>
              <p className="text-sm text-gray-400">Best Implementation Award (National Finals)</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-all">
              <div className="text-3xl mb-2">📜</div>
              <h4 className="font-bold mb-1">Patent Published</h4>
              <p className="text-sm text-gray-400">AI-Driven Crime Detection System (Jan 2026)</p>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-all">
              <div className="text-3xl mb-2">🎓</div>
              <h4 className="font-bold mb-1">AWS Academy Graduate</h4>
              <p className="text-sm text-gray-400">Cloud Foundations Certified</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About