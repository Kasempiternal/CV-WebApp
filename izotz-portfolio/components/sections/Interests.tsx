'use client'

import AnimatedSection from '../AnimatedSection'
import { motion } from 'framer-motion'

const interests = [
  {
    title: 'Computer Vision & AI',
    icon: '🤖',
    description: 'Passionate about pushing the boundaries of object detection and real-time analysis',
    current: ['YOLO Models', 'Dataset Annotation', 'Model Optimization'],
    future: ['Advanced Neural Networks', 'Edge AI Deployment', 'Multi-modal Learning'],
  },
  {
    title: '3D Graphics & WebGL',
    icon: '🎨',
    description: 'Creating immersive web experiences with Three.js and modern graphics APIs',
    current: ['Three.js', 'React Three Fiber', 'WebGL Shaders'],
    future: ['WebGPU', 'Advanced Shader Programming', 'Real-time Ray Tracing'],
  },
  {
    title: 'Cloud & DevOps',
    icon: '☁️',
    description: 'Building scalable infrastructure and streamlining deployment processes',
    current: ['Docker', 'OpenShift', 'CI/CD'],
    future: ['Kubernetes', 'AWS/Azure Certifications', 'Infrastructure as Code'],
  },
  {
    title: 'Open Source',
    icon: '🌐',
    description: 'Contributing to the community and learning from collective knowledge',
    current: ['GitHub Contributions', 'Code Reviews', 'Documentation'],
    future: ['Maintain Own Projects', 'Speaking at Conferences', 'Mentoring'],
  },
]

const futureGoals = [
  'Master advanced machine learning techniques for computer vision',
  'Contribute to major open-source AI/ML projects',
  'Build a startup focused on innovative AI solutions',
  'Obtain cloud architecture certifications (AWS/Azure)',
  'Speak at international tech conferences',
  'Mentor junior developers and give back to the community',
]

export default function Interests() {
  return (
    <AnimatedSection className="min-h-screen py-20 px-4 bg-gray-900/50" delay={0.2}>
      <div id="interests" className="absolute -top-20" />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          Interests & Future Learning
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{interest.icon}</span>
                <h3 className="text-xl font-bold text-white">{interest.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-4">{interest.description}</p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-blue-400 font-semibold mb-2">Currently Exploring:</p>
                  <div className="flex flex-wrap gap-2">
                    {interest.current.map((item, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-blue-600/20 text-blue-300 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-purple-400 font-semibold mb-2">Want to Learn:</p>
                  <div className="flex flex-wrap gap-2">
                    {interest.future.map((item, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-purple-600/20 text-purple-300 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8 rounded-xl border border-gray-700"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            My Journey Ahead 🚀
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {futureGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <span className="text-blue-400 mt-1">▸</span>
                <p className="text-gray-300">{goal}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}