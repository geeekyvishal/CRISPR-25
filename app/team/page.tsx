'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const teamMembers = [
  { name: 'Shrut Jain', role: 'Lead', image: '/placeholder.svg?height=300&width=300' },
  { name: 'Jaivardhan Bhola', role: 'Co-Lead', image: '/placeholder.svg?height=300&width=300' },
  { name: 'Akshat Gupta', role: 'Head of Innovation', image: '/placeholder.svg?height=300&width=300' },
  { name: 'Vishal Singh', role: 'Head of Development', image: '/placeholder.svg?height=300&width=300' },
  { name: 'Aakarsh Maurya', role: 'sdfsf sdfsdf', image: '/placeholder.svg?height=300&width=300' },
  { name: 'Harsh Vardhan', role: 'sdfsf sdfsdf', image: '/placeholder.svg?height=300&width=300' },
  { name: 'And so on', role: 'sdfsf sdfsdf', image: '/placeholder.svg?height=300&width=300' },
]

export default function Team() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-neon-blue glitch"
        data-text="Our Team"
      >
         Our Team 
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-48 h-48 mb-4 rounded-full overflow-hidden border-4 border-neon-blue shadow-lg hover:shadow-neon-blue transition-shadow duration-300"
            >
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </motion.div>
            <h2 className="text-xl font-semibold mb-2 text-neon-pink">{member.name}</h2>
            <p className="text-gray-400">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

