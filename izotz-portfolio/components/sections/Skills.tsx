'use client'

import AnimatedSection from '../AnimatedSection'
import { motion } from 'framer-motion'

const skillCategories = [
  {
    category: 'Languages',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'TypeScript', level: 85 },
      { name: 'Java', level: 75 },
      { name: 'C#', level: 70 },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Three.js', level: 85 },
      { name: 'Next.js', level: 85 },
      { name: 'Angular', level: 75 },
      { name: 'CSS/Tailwind', level: 90 },
    ],
  },
  {
    category: 'Backend & Tools',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Git', level: 90 },
      { name: 'CI/CD', level: 75 },
    ],
  },
  {
    category: 'AI/ML',
    skills: [
      { name: 'Computer Vision', level: 80 },
      { name: 'YOLO', level: 75 },
      { name: 'PyTorch', level: 70 },
      { name: 'Data Annotation', level: 85 },
      { name: 'Model Training', level: 75 },
    ],
  },
]

export default function Skills() {
  return (
    <AnimatedSection className="min-h-screen py-20 px-4" delay={0.2}>
      <div id="skills" className="absolute -top-20" />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          Technical Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-6 rounded-xl"
            >
              <h3 className="text-xl font-bold text-white mb-6">{category.category}</h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      />
                    </div>
                  </div>
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
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Languages</h3>
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="text-center">
              <span className="text-4xl mb-2 block">🇪🇸</span>
              <p className="text-gray-300">Spanish</p>
              <p className="text-gray-500 text-sm">Native</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-2 block">🏴</span>
              <p className="text-gray-300">Basque</p>
              <p className="text-gray-500 text-sm">Native</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-2 block">🇬🇧</span>
              <p className="text-gray-300">English</p>
              <p className="text-gray-500 text-sm">Professional</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}