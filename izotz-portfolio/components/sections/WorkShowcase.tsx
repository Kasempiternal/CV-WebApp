'use client'

import AnimatedSection from '../AnimatedSection'
import { motion } from 'framer-motion'
import { useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'Computer Vision Dashboard',
    category: 'ML/AI',
    description: 'Real-time object detection and tracking system with interactive analytics dashboard',
    techStack: ['Python', 'YOLO', 'React', 'Three.js', 'WebSocket'],
    features: [
      'Real-time object detection with YOLO v8',
      'Interactive 3D visualization of detection results',
      'Performance metrics and analytics',
      'Custom dataset annotation interface',
    ],
    mockupColor: 'from-blue-600 to-purple-600',
  },
  {
    id: 2,
    title: 'Industrial IoT Platform',
    category: 'Full Stack',
    description: 'Comprehensive platform for monitoring and controlling industrial equipment',
    techStack: ['React', 'Node.js', 'Docker', 'PostgreSQL', 'MQTT'],
    features: [
      'Real-time equipment monitoring',
      'Predictive maintenance algorithms',
      'Custom alert system',
      'Mobile-responsive control interface',
    ],
    mockupColor: 'from-green-600 to-teal-600',
  },
  {
    id: 3,
    title: '3D Product Configurator',
    category: 'Frontend',
    description: 'Interactive 3D product customization tool with real-time rendering',
    techStack: ['Three.js', 'React', 'TypeScript', 'WebGL'],
    features: [
      'Real-time 3D model manipulation',
      'Material and texture customization',
      'AR preview functionality',
      'Export configurations as shareable links',
    ],
    mockupColor: 'from-orange-600 to-red-600',
  },
]

export default function WorkShowcase() {
  const [activeProject, setActiveProject] = useState(0)

  return (
    <AnimatedSection className="min-h-screen py-20 px-4" delay={0.2}>
      <div id="work" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Work Showcase
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          These are conceptual mockups representing the type of work I&apos;ve done, 
          designed to showcase my skills while maintaining client confidentiality.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                onClick={() => setActiveProject(index)}
                className={`cursor-pointer p-6 rounded-xl transition-all ${
                  activeProject === index
                    ? 'bg-gray-800 border-2 border-blue-500'
                    : 'bg-gray-900 border-2 border-gray-800 hover:border-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className="text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            key={activeProject}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${projects[activeProject].mockupColor} rounded-2xl blur-3xl opacity-20`} />
            
            <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className={`w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br ${projects[activeProject].mockupColor} flex items-center justify-center`}>
                    <span className="text-white text-4xl font-bold">
                      {projects[activeProject].title.charAt(0)}
                    </span>
                  </div>
                  <p className="text-gray-500">Interactive Mockup</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
              <ul className="space-y-2 mb-6">
                {projects[activeProject].features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-300 text-sm flex items-start"
                  >
                    <span className="text-blue-400 mr-2">•</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {projects[activeProject].techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}