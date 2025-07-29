'use client'

import AnimatedSection from '../AnimatedSection'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <AnimatedSection className="min-h-screen py-20 px-4 bg-gray-900/50" delay={0.2}>
      <div id="contact" className="absolute -top-20" />
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Let's Connect
        </h2>
        
        <p className="text-xl text-gray-300 mb-12">
          I'm always open to discussing new opportunities, innovative projects, 
          or just having a chat about technology and its possibilities.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.a
            href="mailto:izotzcri@opendeusto.es"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors"
          >
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
            <p className="text-gray-400 text-sm">izotzcri@opendeusto.es</p>
          </motion.a>

          <motion.a
            href="tel:+34672531763"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors"
          >
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
            <p className="text-gray-400 text-sm">+34 672 531 763</p>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/izotz-cristobal-mota-41ab75189/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors"
          >
            <div className="text-3xl mb-3">💼</div>
            <h3 className="text-lg font-semibold text-white mb-1">LinkedIn</h3>
            <p className="text-gray-400 text-sm">Connect with me</p>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Based in Gernika, Basque Country
          </h3>
          <p className="text-white/80">
            Open to remote opportunities and willing to relocate for the right position.
            Let's build something amazing together!
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}