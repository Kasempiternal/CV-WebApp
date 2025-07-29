'use client'

import AnimatedSection from '../AnimatedSection'
import { motion } from 'framer-motion'
import { useState } from 'react'

const experiences = [
  {
    id: 1,
    title: 'Junior Researcher',
    company: 'TECNALIA Research & Innovation',
    period: 'September 2024 - Present',
    location: 'Derio, Basque Country',
    description: [
      'Developing 3D visualizations and interactive applications using Three.js',
      'Working on computer vision projects: training YOLO models for detection tasks',
      'Using Roboflow for dataset management and exploring augmentation techniques',
      'Annotating datasets using CVAT for object detection projects',
      'Integrating different tools in ML workflows, from annotation to model training',
    ],
    tech: ['Three.js', 'YOLO', 'Python', 'Roboflow', 'CVAT', 'Computer Vision'],
  },
  {
    id: 2,
    title: 'Software Engineer',
    company: 'Ariadna',
    period: 'July 2023 - April 2024',
    location: 'Boroa',
    description: [
      'Developed software solutions using modern web technologies',
      'Worked with Docker and containerization technologies',
      'Implemented CI/CD pipelines for automated deployment',
      'Collaborated with cross-functional teams on various projects',
    ],
    tech: ['Docker', 'OpenShift', 'JavaScript', 'Node.js', 'CI/CD'],
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'Ormazabal',
    period: 'December 2021 - April 2023',
    location: 'Amorebieta-Etxano',
    description: [
      'Developed frontend applications for industrial systems',
      'Worked with webapps and modern JavaScript frameworks',
      'Collaborated with development team on various projects',
      'Improved UI/UX for industrial control systems',
    ],
    tech: ['React', 'Angular', 'JavaScript', 'TypeScript'],
  },
]

export default function Experience() {
  const [activeExp, setActiveExp] = useState(0)

  return (
    <AnimatedSection className="min-h-screen py-20 px-4" delay={0.2}>
      <div id="experience" className="absolute -top-20" />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          Professional Experience
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <motion.button
                key={exp.id}
                onClick={() => setActiveExp(index)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  activeExp === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-semibold">{exp.company}</h3>
                <p className="text-sm opacity-80">{exp.period}</p>
              </motion.button>
            ))}
          </div>

          <div className="md:col-span-2">
            <motion.div
              key={activeExp}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {experiences[activeExp].title}
              </h3>
              <p className="text-blue-400 mb-1">{experiences[activeExp].company}</p>
              <p className="text-gray-400 text-sm mb-6">
                {experiences[activeExp].period} | {experiences[activeExp].location}
              </p>

              <ul className="space-y-3 mb-6">
                {experiences[activeExp].description.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-300 flex items-start"
                  >
                    <span className="text-blue-400 mr-2">▸</span>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {experiences[activeExp].tech.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}