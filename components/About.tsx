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
    { icon: FaAward, label: 'Certifications', value: '6+', color: 'text-green-400' },
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

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 text-lg">Electronics Engineer | AI-ML Enthusiast | Problem Solver</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
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
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
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
              className="relative mb-6"
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
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 gradient-text">Atharva Mandavkar</h3>
              <p className="text-gray-400 text-sm mb-1">B.Tech ECE | MIT WPU</p>
              <p className="text-green-400 text-sm flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Available for opportunities
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-6">
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
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm p-3 bg-white/5 rounded-lg">
                <FaMapMarkerAlt className="text-pink-400 text-lg flex-shrink-0" />
                <span className="text-gray-300">Pune, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-3 bg-white/5 rounded-lg">
                <FaGraduationCap className="text-purple-400 text-lg flex-shrink-0" />
                <span className="text-gray-300">Graduated March 2025</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-3 bg-white/5 rounded-lg">
                <FaBriefcase className="text-blue-400 text-lg flex-shrink-0" />
                <span className="text-gray-300">Open to Work</span>
              </div>
            </div>

            {/* Top Skills Section - NEW! */}
            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-4">
                <FaFire className="text-orange-400 text-xl" />
                <h4 className="font-bold text-white">Top Skills</h4>
              </div>
              <div className="space-y-3">
                {topSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">{skill.name}</span>
                      {/* <span className="text-xs text-gray-500">{skill.level}</span> */}
                    </div>
                    {/* <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full ${skill.color} rounded-full`}
                      />
                    </div> */}
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
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 gap-3">
                <a 
                  href="mailto:mandavkaratharva@gmail.com"
                  className="flex items-center gap-3 text-sm p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <FaEnvelope className="text-blue-400 text-lg flex-shrink-0" />
                  <span className="text-gray-300 group-hover:text-white truncate">mandavkaratharva@gmail.com</span>
                </a>
                <a 
                  href="tel:+917972326112"
                  className="flex items-center gap-3 text-sm p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <FaPhone className="text-green-400 text-lg flex-shrink-0" />
                  <span className="text-gray-300 group-hover:text-white">+91 7972326112</span>
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
          className="mb-16"
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

        {/* Education Timeline */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass p-8 rounded-2xl mb-12"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <FaGraduationCap className="text-purple-400" />
            Educational Journey
          </h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="relative pl-8 pb-6 border-l-2 border-blue-500 last:border-transparent last:pb-0"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900" />
                
                <div className={`bg-gradient-to-r ${edu.color} p-0.5 rounded-lg mb-4`}>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                      <span className="text-sm px-3 py-1 bg-white/10 rounded-full text-gray-300">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-blue-400 font-semibold mb-2">{edu.institution}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-bold text-lg">{edu.grade}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="glass p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-6 gradient-text">Key Highlights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-bold mb-1">Smart India Hackathon 2023</h4>
              <p className="text-sm text-gray-400">Selected for National Level</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-3xl mb-2">🥇</div>
              <h4 className="font-bold mb-1">eYantra Innovation Challenge</h4>
              <p className="text-sm text-gray-400">Best Implementation Award (National Finals)</p>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
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