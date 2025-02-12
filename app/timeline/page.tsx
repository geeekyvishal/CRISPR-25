'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, ChevronDown, ChevronUp } from 'lucide-react'

const timelineEvents = [
  {
    date: '2020',
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc. Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.',
    icon: '🚀',
  },
  {
    date: '2021 Q1',
    title: 'Dolor Sit Amet',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: '💻',
  },
  {
    date: '2021 Q3',
    title: 'Consectetur Adipiscing',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    icon: '🤝',
  },
  {
    date: '2022',
    title: 'Sed Do Eiusmod',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: '🔬',
  },
  {
    date: '2022 Q4',
    title: 'Tempor Incididunt',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: '🎯',
  },
  {
    date: '2023',
    title: 'Ut Labore Et Dolore',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    icon: '🤖',
  },
]

export default function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <Terminal className="inline-block w-12 h-12 text-[#2F9B8F] mb-4" />
          <h1 className="text-4xl font-bold text-[#2F9B8F] mb-4 glitch" data-text="Crispr Timeline">Crispr Timeline</h1>
          <p className="text-gray-400">Entire history of Crispr</p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#2F9B8F] to-gray-800" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
              } md:w-1/2`}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full 
                           flex items-center justify-center text-2xl
                           bg-gray-900 border-4 border-[#2F9B8F] z-10
                           shadow-lg shadow-[#2F9B8F]/20`}
                >
                  {event.icon}
                </div>
              </div>

              <div 
                className="relative p-6 rounded-xl bg-gray-800 border border-[#2F9B8F]/20
                            backdrop-blur-sm shadow-lg hover:shadow-[#2F9B8F]/20
                            transition-all duration-300 hover:-translate-y-1 cursor-pointer
                            tech-border"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br 
                              from-[#2F9B8F]/5 to-transparent rounded-xl" />
                <div className="relative">
                  <h3 className="text-xl font-bold text-[#2F9B8F] mb-2">{event.title}</h3>
                  <time className="text-sm text-gray-400 mb-2 block">{event.date}</time>
                  <p className="text-gray-300">{event.description}</p>
                  
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 text-gray-400"
                      >
                        {event.content}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-4 flex justify-end">
                    {expandedIndex === index ? (
                      <ChevronUp className="text-[#2F9B8F]" />
                    ) : (
                      <ChevronDown className="text-[#2F9B8F]" />
                    )}
                  </div>
                </div>

                {/* Tech decoration */}
                <div className="absolute top-2 right-2 opacity-20">
                  <div className="w-16 h-16 border-t-2 border-r-2 border-[#2F9B8F]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

