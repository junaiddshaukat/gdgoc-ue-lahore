'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"
import { Code, Cpu, Palette, FileText, Users, Braces } from 'lucide-react'

const sections = [
  {
    id: 'competitive-programming',
    title: 'Competitive Programming',
    icon: Braces,
    content: 'cd /competitive-programming\n\nls\n\n>> algorithms.cpp\n>> data-structures.py\n>> contest-strategies.md\n\ncat contest-strategies.md\n\n>> Our Competitive Programming team excels in solving complex algorithmic challenges. We participate in global coding competitions, enhancing problem-solving skills and algorithmic thinking.'
  },
  {
    id: 'ml-android',
    title: 'ML & Android',
    icon: Cpu,
    content: 'cd /ml-android\n\nls\n\n>> machine-learning-models/\n>> android-projects/\n\ncd machine-learning-models && ls\n\n>> neural-networks.py\n>> deep-learning.ipynb\n\necho "Our ML & Android team builds cutting-edge mobile applications and implements machine learning solutions for real-world problems."'
  },
  {
    id: 'web-development',
    title: 'Web Development',
    icon: Code,
    content: 'cd /web-development\n\nnpm list\n\n>> react@18.2.0\n>> next@13.4.19\n>> tailwindcss@3.3.3\n\necho "The GDSC Web Dev Team is a powerhouse of expertise, specializing in the latest technologies like React, Next.js, and modern CSS frameworks."'
  },
  {
    id: 'design',
    title: 'Design',
    icon: Palette,
    content: 'cd /design\n\nls\n\n>> ui-designs/\n>> branding/\n>> design-systems/\n\ncat design-philosophy.txt\n\n>> Our Design team creates stunning visual experiences, ensuring our products are both beautiful and user-friendly. We focus on intuitive interfaces and cohesive branding across all GDSC projects.'
  },
  {
    id: 'community',
    title: 'Community Management',
    icon: Users,
    content: 'cd /community\n\nls\n\n>> events/\n>> outreach/\n>> mentorship-programs/\n\ncat upcoming-events.txt\n\n>> - Monthly Tech Talks\n>> - Annual Hackathon\n>> - Weekly Study Jams\n\necho "The Community Management team builds and nurtures our vibrant developer community through engaging events and impactful initiatives."'
  }
]

const TypewriterText = ({ content }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentLine, setCurrentLine] = useState(0)
  const lines = content.split('\n')

  useEffect(() => {
    setDisplayedText('')
    setCurrentLine(0)
  }, [content])

  useEffect(() => {
    if (currentLine < lines.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(prev => prev + lines[currentLine] + '\n')
        setCurrentLine(prev => prev + 1)
      }, Math.random() * 500 + 500) // Random delay between 500ms and 1000ms
      return () => clearTimeout(timeoutId)
    }
  }, [currentLine, lines])

  return (
    <pre className="font-mono text-sm whitespace-pre-wrap text-green-400">
      {displayedText}
      {currentLine < lines.length && (
        <span className="animate-pulse">▋</span>
      )}
    </pre>
  )
}

const Terminal = ({ content }) => {
  return (
    <div className="font-mono text-sm h-[400px] overflow-y-auto">
      <TypewriterText content={content} />
    </div>
  )
}



export default function Component() {
  const [selectedSection, setSelectedSection] = useState(sections[0])

  return (
    <div className="relative min-h-screen bg-white text-black py-20 overflow-hidden">
     
      <div className="container mx-auto px-4 relative z-10">
        <motion.h1 
          className="text-6xl md:text-7xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What We Do
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setSelectedSection(section)}
                className={cn(
                  "w-full text-left p-6 rounded-2xl transition-all duration-200 flex items-center justify-between",
                  "hover:bg-gray-100",
                  selectedSection.id === section.id 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-white shadow-md"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <section.icon className="w-8 h-8" />
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="h-8 bg-gray-800 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <div className="p-6 bg-gray-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Terminal content={selectedSection.content} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
