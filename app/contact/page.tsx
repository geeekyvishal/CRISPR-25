'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-8 text-neon-blue"
        >
          About CRISPR Tech Club
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg mb-6"
        >
          CRISPR Tech Club is a student-led organization dedicated to exploring and innovating the field of computer engineering. Our focus is to solve real world problem thorugh our knowledge and skills.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg mb-6"
        >
          We provide a platform for students to engage with  research, participate in hackathons, and discuss about new technology
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-2xl font-bold mb-4 text-neon-pink"
        >
          Our Mission
        </motion.h2>
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="list-disc list-inside mb-6 space-y-2"
        >
          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, quis?</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, quis?</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, quis?</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, quis?</li>
        </motion.ul>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-lg"
        >
          Join us in solving the real world problems with your skill !
        </motion.p>
      </div>
    </motion.div>
  )
}

