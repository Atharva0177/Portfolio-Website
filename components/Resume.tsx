'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaDownload, FaEye, FaBriefcase, FaGraduationCap, FaCode, FaAward, FaCertificate, FaTrophy } from 'react-icons/fa'

const Resume = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const resumeData = {
    education: [
      {
        degree: 'Bachelor of Technology',
        field: 'Electronics and Communication Engineering',
        institution: 'Dr Vishwanath Karad MIT World Peace University, Pune',
        period: 'August 2019 - March 2025',
        grade: 'CGPA: 8.85/10',
        rollNo: '1032211830'
      },
      {
        degree: 'Higher Secondary Education (12th)',
        field: 'Science Stream',
        institution: 'Namo Rims Jr. College, Pune',
        period: 'August 2019 - July 2021',
        grade: '91.50%'
      },
      {
        degree: 'Secondary Education (10th)',
        field: 'General Education',
        institution: 'Sacred Heart Convent High School, Ratnagiri',
        period: 'Completed 2019',
        grade: '93.20%'
      }
    ],
    certifications: [
      {
        name: 'Fundamentals of Deep Learning',
        issuer: 'Nvidia',
        date: 'November 2023',
        skills: ['Deep Learning', 'DLI']
      },
      {
        name: 'AWS Academy Cloud Foundations',
        issuer: 'AWS Academy',
        date: 'February 2024',
        skills: ['Amazon Web Services (AWS)']
      },
      {
        name: 'National Academic Immersion Program in Robotics & IoT',
        issuer: 'NITTTR, Bhopal',
        date: 'July 2023',
        skills: ['PLC', 'Mindsphere (IoT)', 'Robot Studio', 'Electric Drives']
      },
      {
        name: 'Scientific Use of Machine Learning on Low Power Devices',
        issuer: 'ICTP',
        date: 'April 2023',
        skills: ['TinyML', 'Edge AI']
      },
      {
        name: 'Masterclass on API Development using Node.js',
        issuer: 'Workshop',
        date: 'January 2024',
        skills: ['API Development', 'Node.js']
      },
      {
        name: 'Brainy Pi Workshop',
        issuer: 'IoTIoT.in',
        date: 'November 2023',
        skills: ['BrainyPi', 'IoT Interfaces']
      }
    ],
    experience: [
      {
        title: 'DataLogger using Embedded Devices and Modbus',
        company: 'Atlas Copco Project',
        period: 'February 2024 - June 2024',
        description: 'Developed a Datalogger system for mining trucks to obtain and visualize relevant data from connected sensors using Modbus TCP/IP and MQTT protocols.',
        skills: ['Python', 'MySQL', 'PythonAnywhere', 'Postman', 'MQTT', 'Raspberry Pi', 'STM32'],
        type: 'Project'
      },
      {
        title: 'Real-Time Crime Detection & Crowd Management',
        company: 'Smart India Hackathon 2023 - Team EnvisionAI',
        period: 'September 2023 - March 2024',
        description: 'Created an AI-powered app for Indian Railway Authorities to prevent crime, manage crowd congestion, and monitor work on railway stations using advanced ML architectures.',
        skills: ['Python', 'HuggingFace', 'PyTorch', 'Gradio', 'ViViT', '3D CNNs', 'YOLO'],
        type: 'Hackathon'
      },
      {
        title: 'Smart Crime Detection using Existing CCTV Infrastructure',
        company: 'eYantra Innovation Challenge 2023-24 - Team EnvisionAI',
        period: 'September 2023 - March 2024',
        description: 'Built a centralized database for authorities with alert systems, web app, and Android app for crime prevention using Vision Transformers.',
        skills: ['Python', 'ViViT', 'PyTorch', 'Twilio', 'DynamoDB', 'MongoDB', 'Android Studio'],
        type: 'Hackathon'
      },
      {
        title: 'E-Waste Segregation with OpenCV using YOLOv8',
        company: 'Independent Project',
        period: 'March 2023 - July 2023',
        description: 'Trained multiple YOLOv8 models (nano, small, medium, large, x-large) for multi-class E-waste classification and analyzed accuracy on Raspberry Pi 4b.',
        skills: ['Python', 'OpenCV', 'YOLOv8', 'Jupyter', 'Raspberry Pi'],
        type: 'Project'
      }
    ],
    
    achievements: [
      {
        title: 'eYantra Innovation Challenge 2023-24',
        description: 'Best Implementation Award at National Finals',
        date: 'April 2024',
        icon: '🥇',
        color: 'from-yellow-500 to-orange-500'
      },
      {
        title: 'Smart India Hackathon 2023',
        description: 'Selected for National Level Competition',
        date: 'October 2023',
        icon: '🏆',
        color: 'from-blue-500 to-purple-500'
      },
      {
        title: 'MIT World Peace University HackMITWPU Workathon',
        description: 'Won Finals in Workathon Competition',
        date: 'March 2024',
        icon: '🎯',
        color: 'from-green-500 to-teal-500'
      }
    ]
  }

  const handleViewResume = () => {
    window.open('/resume.pdf', '_blank')
  }

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Atharva_Mandavkar_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">Download or view my professional experience</p>

          {/* Contact Info */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span>📧</span>
              <a href="mailto:mandavkaratharva@gmail.com" className="hover:text-blue-400 transition-colors">
                mandavkaratharva@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>📱</span>
              <a href="tel:+917972326112" className="hover:text-green-400 transition-colors">
                +91 7972326112
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>🎓</span>
              <span>Roll No: 1032211830</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Education & Certifications (SWITCHED) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Education */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaGraduationCap className="text-purple-400" />
                Education
              </h3>

              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-purple-500/30 transition-colors"
                  >
                    <h4 className="font-bold text-base text-white mb-1">{edu.degree}</h4>
                    {edu.field && <p className="text-purple-400 font-semibold text-sm mb-2">{edu.field}</p>}
                    <p className="text-gray-400 text-xs mb-2 leading-relaxed">{edu.institution}</p>
                    <div className="flex justify-between items-center text-sm gap-2">
                      <span className="text-gray-500 text-xs">{edu.period}</span>
                      <span className="text-green-400 font-bold text-sm flex-shrink-0">{edu.grade}</span>
                    </div>
                    {edu.rollNo && (
                      <p className="text-xs text-gray-500 mt-2">Roll No: {edu.rollNo}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaCertificate className="text-green-400" />
                Certifications
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {resumeData.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="p-3 bg-white/5 rounded-lg cursor-pointer border border-white/5 hover:border-green-500/30 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 mt-2" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm mb-1 leading-tight">{cert.name}</h4>
                        <div className="flex justify-between items-center gap-2 mb-2">
                          <p className="text-gray-400 text-xs truncate">{cert.issuer}</p>
                          <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">{cert.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
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
            </div>

            {/* Quick Stats */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaCode className="text-blue-400" />
                Quick Stats
              </h3>

              <div className="space-y-3">
                {[
                  { label: 'Academic CGPA', value: '8.85/10' },
                  { label: 'Major Projects', value: '4+' },
                  { label: 'Certifications', value: '6+' },
                  { label: 'Hackathons Won', value: '3' },
                  { label: 'Technologies', value: '20+' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    <span className="text-white font-bold">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Projects & Experience (SWITCHED) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Projects */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <FaBriefcase className="text-blue-400" />
                Projects & Experience
              </h3>

              <div className="space-y-8">
                {resumeData.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Line and Dot */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500/30">
                      <div className="absolute top-2 -left-[7px] w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900" />
                    </div>

                    {/* Content */}
                    <div className="pl-8">
                      {/* Header */}
                      <div className="mb-3">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h4 className="text-xl font-bold text-white pr-2">{exp.title}</h4>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                              {exp.type}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-blue-400 font-semibold text-sm mb-1">{exp.company}</p>
                        <p className="text-gray-500 text-sm">{exp.period}</p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-4 leading-relaxed text-sm">{exp.description}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaTrophy className="text-yellow-400" />
                Achievements
              </h3>

              <div className="space-y-4">
                {resumeData.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-5 rounded-xl bg-gradient-to-r ${achievement.color} bg-opacity-10 border border-white/10`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl flex-shrink-0">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="font-bold text-white">{achievement.title}</h4>
                          <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{achievement.date}</span>
                        </div>
                        <p className="text-sm text-gray-300">{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 glass p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Want to know more?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Download my complete resume for detailed information about my projects, technical skills, 
            certifications, and achievements in AI/ML, Computer Vision, and IoT systems.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              onClick={handleViewResume}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white shadow-lg flex items-center gap-2"
            >
              <FaEye />
              View Online
            </motion.button>
            <motion.button
              onClick={handleDownloadResume}
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white inline-flex items-center gap-2"
            >
              <FaDownload />
              Download Resume (PDF)
            </motion.button>
            <motion.a
              href="https://github.com/Atharva0177"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white shadow-lg flex items-center gap-2"
            >
              <FaCode />
              View GitHub Profile
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.7);
        }
      `}</style>
    </section>
  )
}

export default Resume