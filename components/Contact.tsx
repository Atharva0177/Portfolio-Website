'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: 'mandavkaratharva@gmail.com', link: 'mailto:mandavkaratharva@gmail.com' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Pune, India', link: null },
    { icon: FaGithub, label: 'GitHub', value: '@Atharva0177', link: 'https://github.com/Atharva0177' },
  ]

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg">Let's work together on your next project</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-8 gradient-text">Let's Talk</h3>
            <p className="text-gray-400 mb-8 text-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities 
              to be part of your visions. Feel free to reach out!
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 glass rounded-lg">
                    <item.icon className="text-2xl text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:text-blue-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4">
              {[
                { icon: FaGithub, url: 'https://github.com/Atharva0177', color: 'hover:text-white' },
                { icon: FaLinkedin, url: 'https://www.linkedin.com/in/atharva-mandavkar-b66b94179/', color: 'hover:text-sky-500' },
                { icon: FaInstagram, url: 'https://www.instagram.com/atharva__177/', color: 'hover:text-pink-500' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 glass rounded-full text-white transition-colors ${social.color}`}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass p-8 rounded-2xl"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="How can I help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-blue-500/50 transition-shadow"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-white/10 text-center text-gray-400"
        >
          <p>© 2025 Atharva. Built with Next.js, TypeScript & Tailwind CSS</p>
          <p className="mt-2">Made with ❤️ in Pune, India</p>
        </motion.div> */}
      </div>
    </section>
  )
}

export default Contact