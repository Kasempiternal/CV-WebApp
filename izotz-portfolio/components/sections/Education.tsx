'use client'

import AnimatedSection from '../AnimatedSection'
import { motion } from 'framer-motion'

const education = [
  {
    degree: "Bachelor's Degree in Computer Engineering",
    institution: 'University of Deusto',
    period: '2018 - 2023',
    description: 'Comprehensive program covering software development, algorithms, data structures, and computer systems.',
    highlights: ['Software Engineering', 'Algorithms & Data Structures', 'Computer Vision', 'Web Development'],
  },
  {
    degree: 'Higher Technician in Computer Software Engineering',
    institution: 'Iurreta LHI',
    period: '2016 - 2018',
    description: 'Technical program focused on practical software development skills and programming fundamentals.',
    highlights: ['Programming Fundamentals', 'Database Management', 'Web Technologies', 'Software Design'],
  },
]

const certifications = [
  { name: 'Linux Foundation - LFS101x', icon: '🐧' },
  { name: 'Microsoft - Python for Data Science', icon: '🐍' },
  { name: 'Cybersecurity for Business', icon: '🔒' },
  { name: 'Premio Valores de Euskelec', icon: '🏆' },
]

export default function Education() {
  return (
    <AnimatedSection className="min-h-screen py-20 px-4 bg-gray-900/50" delay={0.2}>
      <div id="education" className="absolute -top-20" />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          Education & Certifications
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                  <p className="text-blue-400">{edu.institution}</p>
                </div>
                <span className="text-gray-400 text-sm">{edu.period}</span>
              </div>
              
              <p className="text-gray-300 mb-4">{edu.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {edu.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-xl border border-gray-700"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Certifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <span className="text-2xl">{cert.icon}</span>
                <span className="text-gray-300">{cert.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}