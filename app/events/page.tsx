'use client'

import { motion } from 'framer-motion'

const events = [
  {
    title: 'CRISPR Workshop',
    date: 'June 15, 2024',
    description: 'Hands-on workshop on CRISPR server',
  },
  {
    title: 'Solvathon Hackathon',
    date: 'July 2, 2024',
    description: 'lorem ipsum sougbs gb soubg sougb sougb  ',
  },
  {
    title: 'GPT 4o Thon',
    date: 'Dec 10, 2024',
    description: '12 -hour hackathon lorem ipsum',
  },
]

export default function Events() {
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
          Upcoming Events
        </motion.h1>
        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-neon-blue transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-2 text-neon-pink">{event.title}</h2>
              <p className="text-gray-400 mb-4">{event.date}</p>
              <p className="text-gray-300">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

