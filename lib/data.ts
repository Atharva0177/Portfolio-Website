import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiFirebase } from 'react-icons/si'

// export const skills = [
//   { name: 'React', icon: FaReact, level: 100, color: '#61DAFB' },
//   { name: 'TypeScript', icon: SiTypescript, level: 85, color: '#3178C6' },
//   { name: 'Next.js', icon: SiNextdotjs, level: 88, color: '#000000' },
//   { name: 'Node.js', icon: FaNodeJs, level: 82, color: '#339933' },
//   { name: 'Python', icon: FaPython, level: 80, color: '#3776AB' },
//   { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92, color: '#06B6D4' },
//   { name: 'MongoDB', icon: SiMongodb, level: 78, color: '#47A248' },
//   { name: 'PostgreSQL', icon: SiPostgresql, level: 75, color: '#4169E1' },
//   { name: 'Git', icon: FaGitAlt, level: 85, color: '#F05032' },
//   { name: 'Docker', icon: FaDocker, level: 70, color: '#2496ED' },
//   { name: 'AWS', icon: FaAws, level: 68, color: '#FF9900' },
//   { name: 'Firebase', icon: SiFirebase, level: 80, color: '#FFCA28' },
// ]

export const projects = [
  {
    id: 1,
    title: 'NAS Network Attached Storage',
    description: 'A self-hosted file browser for local drives with authentication, role-based permissions, thumbnails, streaming, and search.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    tech: ['Python', 'JavaScript', 'CSS', 'HTML'],
    github: 'https://github.com/Atharva0177/NAS-Network-Attached-Storage',
    // demo: '#',
    color: 'from-slate-600 to-gray-800'
  },
  {
    id: 2,
    title: 'Secure Vault Pro',
    description: 'IA modern, feature-rich file encryption and data protection application with advanced security features including folder encryption, steganography, and password management.',
    image: 'https://plus.unsplash.com/premium_photo-1681487916420-8f50a06eb60e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tech: ['Python'],
    github: 'https://github.com/Atharva0177/Secure-Vault-Pro',
    // demo: '#',
    color: 'from-blue-500 to-teal-600'
  },
  {
    id: 3,
    title: 'Web AirDrop',
    description: 'Zero‑install, end‑to‑end browser transfers powered by WebRTC. Share files across devices with session codes or a QR — no accounts, no cloud storage..',
    image: 'https://plus.unsplash.com/premium_photo-1684522168034-32f22b4b7eef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzM1ODB8MHwxfGFsbHx8fHx8fHx8fDE3NjM2OTkxMzJ8&ixlib=rb-4.1.0&q=80&w=1080',
    tech: ['Python', 'JavaScript', 'CSS', 'HTML'],
    github: 'https://github.com/Atharva0177/Web-AirDrop',
    // demo: '#',
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 4,
    title: 'Hotel Booking Web Application',
    description: 'A full‑stack hotel booking web application built with Flask and SQLAlchemy.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzM1ODB8MHwxfGFsbHx8fHx8fHx8fDE3NjM2OTk5MjJ8&ixlib=rb-4.1.0&q=80&w=1080',
    tech: ['Python', 'JavaScript', 'CSS', 'HTML'],
    github: 'https://github.com/Atharva0177/Hotel-Website',
    // demo: '#',
    color: 'from-blue-500 to-sky-600'
  },
  {
    id: 5,
    title: 'Real Estate Website',
    description: 'A full-featured real estate property management platform built with Flask, featuring property listings, user authentication, booking system, file uploads, alerting, email notifications, analytics, and a comprehensive admin dashboard.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzM1ODB8MHwxfGFsbHx8fHx8fHx8fDE3NjM3MDAyNDF8&ixlib=rb-4.1.0&q=80&w=1080',
    tech: ['Python', 'Flask', 'SQLAlchemy'],
    github: 'https://github.com/Atharva0177/Real-Estate-Website',
    // demo: '#',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 6,
    title: 'Sign-to-Text Language Translator',
    description: 'A complete end–to–end pipeline that detects hand landmarks from a webcam using MediaPipe, extracts 63 keypoint coordinates, classifies them using a trained Conv1D neural network, builds words/sentences, gives word suggestions, and converts the detected text to speech using gTTS.',
    image: 'https://images.unsplash.com/photo-1573484092085-afd66f8cf2f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzM1ODB8MHwxfGFsbHx8fHx8fHx8fDE3NjM3MTQ4NzV8&ixlib=rb-4.1.0&q=80&w=1080',
    tech: ['Jupyter Notebook', 'HTML', 'Python'],
    github: 'https://github.com/Atharva0177/Sign-to-Text-Language',
    // demo: '#',
    color: 'from-violet-500 to-purple-600'
  },
]

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Atharva0177', icon: 'FaGithub' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'FaLinkedin' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'FaTwitter' },
  { name: 'Email', url: 'mailto:mandavkaratharva@gmail.com', icon: 'FaEnvelope' },
]