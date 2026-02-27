'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const TechStackVisualization = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const techNodes = [
    // Core Programming
    { id: 'python', label: 'Python', x: 50, y: 50, color: 'from-blue-500 to-blue-600', connections: ['pytorch', 'tensorflow', 'opencv', 'aws'] },
    { id: 'cpp', label: 'C/C++', x: 15, y: 30, color: 'from-purple-500 to-purple-600', connections: ['stm32', 'embedded'] },
    
    // ML/AI
    { id: 'pytorch', label: 'PyTorch', x: 75, y: 30, color: 'from-orange-500 to-red-600', connections: ['yolo', 'vivit'] },
    { id: 'tensorflow', label: 'TensorFlow', x: 85, y: 50, color: 'from-orange-400 to-orange-600', connections: ['ml', 'dl'] },
    { id: 'yolo', label: 'YOLOv8', x: 85, y: 20, color: 'from-yellow-500 to-yellow-600', connections: ['opencv'] },
    { id: 'vivit', label: 'ViViT', x: 90, y: 35, color: 'from-pink-500 to-pink-600', connections: ['ml'] },
    
    // Computer Vision
    { id: 'opencv', label: 'OpenCV', x: 65, y: 70, color: 'from-green-500 to-green-600', connections: ['raspberry', 'stm32'] },
    
    // IoT/Embedded
    { id: 'raspberry', label: 'Raspberry Pi', x: 40, y: 75, color: 'from-red-500 to-red-600', connections: ['mqtt', 'modbus'] },
    { id: 'stm32', label: 'STM32', x: 25, y: 60, color: 'from-blue-600 to-indigo-600', connections: ['embedded', 'mqtt'] },
    { id: 'mqtt', label: 'MQTT', x: 30, y: 85, color: 'from-teal-500 to-teal-600', connections: ['aws'] },
    { id: 'modbus', label: 'Modbus', x: 45, y: 90, color: 'from-cyan-500 to-cyan-600', connections: [] },
    
    // Cloud/Database
    { id: 'aws', label: 'AWS', x: 70, y: 85, color: 'from-yellow-600 to-orange-600', connections: ['dynamodb', 'mysql'] },
    { id: 'dynamodb', label: 'DynamoDB', x: 80, y: 75, color: 'from-blue-700 to-blue-800', connections: [] },
    { id: 'mysql', label: 'MySQL', x: 85, y: 85, color: 'from-blue-500 to-blue-700', connections: [] },
    
    // Categories (center nodes)
    { id: 'ml', label: 'Machine Learning', x: 50, y: 25, color: 'from-violet-500 to-violet-600', connections: ['dl'] },
    { id: 'dl', label: 'Deep Learning', x: 70, y: 15, color: 'from-purple-600 to-purple-700', connections: [] },
    { id: 'embedded', label: 'Embedded Systems', x: 20, y: 45, color: 'from-indigo-500 to-indigo-600', connections: [] },
  ]

  const getConnectionPath = (from: typeof techNodes[0], to: typeof techNodes[0]) => {
    return `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2 - 10} ${to.x} ${to.y}`
  }

  const getConnectedNodes = (nodeId: string) => {
    const node = techNodes.find(n => n.id === nodeId)
    if (!node) return []
    
    const connected = new Set<string>([nodeId])
    node.connections.forEach(conn => connected.add(conn))
    
    // Also find nodes that connect to this node
    techNodes.forEach(n => {
      if (n.connections.includes(nodeId)) {
        connected.add(n.id)
      }
    })
    
    return Array.from(connected)
  }

  const connectedNodes = hoveredNode ? getConnectedNodes(hoveredNode) : []

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
            Tech Stack <span className="gradient-text">Network</span>
          </h2>
          <p className="text-gray-400 text-lg">Interactive visualization of my technical ecosystem</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-purple p-8 rounded-3xl relative"
          style={{ minHeight: '600px' }}
        >
          {/* SVG for connections */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="lineGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {techNodes.map(node => 
              node.connections.map(connId => {
                const targetNode = techNodes.find(n => n.id === connId)
                if (!targetNode) return null
                
                const isActive = hoveredNode && (connectedNodes.includes(node.id) && connectedNodes.includes(connId))
                
                return (
                  <motion.path
                    key={`${node.id}-${connId}`}
                    d={getConnectionPath(node, targetNode)}
                    stroke={isActive ? "url(#lineGradientActive)" : "url(#lineGradient)"}
                    strokeWidth={isActive ? "0.3" : "0.15"}
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { 
                      pathLength: 1, 
                      opacity: 1,
                      strokeWidth: isActive ? "0.3" : "0.15"
                    } : {}}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.5,
                      strokeWidth: { duration: 0.3 }
                    }}
                  />
                )
              })
            )}
          </svg>

          {/* Tech nodes */}
          {techNodes.map((node, index) => {
            const isHighlighted = !hoveredNode || connectedNodes.includes(node.id)
            
            return (
              <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { 
                  scale: 1, 
                  opacity: isHighlighted ? 1 : 0.3 
                } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + index * 0.05,
                  opacity: { duration: 0.3 }
                }}
                whileHover={{ scale: 1.2, zIndex: 50 }}
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
                className="absolute cursor-pointer group"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className={`relative px-4 py-2 rounded-full bg-gradient-to-r ${node.color} shadow-lg transition-all`}>
                  <span className="text-white font-semibold text-sm whitespace-nowrap">
                    {node.label}
                  </span>
                  
                  {/* Pulse ring on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    initial={{ scale: 1, opacity: 0 }}
                    whileHover={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  
                  {/* Connection count badge */}
                  {node.connections.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-900">
                      {node.connections.length}
                    </div>
                  )}
                </div>

                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
                  {node.connections.length} connection{node.connections.length !== 1 ? 's' : ''}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
                </div>
              </motion.div>
            )
          })}

          {/* Center info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5 }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center"
          >
            <p className="text-sm text-gray-400">
              {hoveredNode 
                ? `Hover over nodes to explore connections`
                : 'Hover over any technology to see its connections'}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechStackVisualization
