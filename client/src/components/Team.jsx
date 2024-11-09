'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, User } from "lucide-react"
import { Button } from "../components/ui/button"
import dynamic from 'next/dynamic'
import axios from "axios"

const googleColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335']

function generateDots() {
  return Array.from({ length: 50 }, (_, i) => ({
    color: googleColors[i % googleColors.length],
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    y: Math.random() * 100 - 50,
    x: Math.random() * 100 - 50,
    scale: Math.random() + 0.5,
    duration: Math.random() * 5 + 5,
  }))
}

const TeamMember = ({ member }) => {
  const [imageError, setImageError] = useState(false)
  const [themeColor, setThemeColor] = useState('')

  useEffect(() => {
    setThemeColor(googleColors[Math.floor(Math.random() * googleColors.length)])
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: member.level * 0.1 }}
      className="relative text-center w-full sm:w-64 mb-8 sm:mb-0"
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="relative overflow-hidden rounded-full w-44 h-44 mx-auto border-4"
        style={{ borderColor: themeColor }}
      >
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <User className="w-24 h-24 text-gray-400" />
          </div>
        ) : (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </motion.div>
      <h3 className="mt-4 text-xl font-semibold" style={{ color: themeColor }}>{member.name}</h3>
      <p className="mt-1 text-sm font-medium" style={{ color: themeColor }}>{member.position}</p>
      <div className="flex justify-center mt-2 space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn profile of {member.name}</span>
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a href={member.github} target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5" />
            <span className="sr-only">GitHub profile of {member.name}</span>
          </a>
        </Button>
      </div>
    </motion.div>
  )
}

const AnimatedBackground = () => {
  const [dots, setDots] = useState([])

  useEffect(() => {
    setDots(generateDots())
  }, [])

  return (
    <>
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: dot.color,
            top: dot.top,
            left: dot.left,
          }}
          animate={{
            y: [0, dot.y],
            x: [0, dot.x],
            scale: [1, dot.scale, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </>
  )
}

const DynamicAnimatedBackground = dynamic(() => Promise.resolve(AnimatedBackground), { ssr: false })

const TeamStructure = ({ teamStructure }) => {
  return (
    <div className="relative z-10 flex flex-col items-center space-y-16 max-w-7xl mx-auto">
      {[1, 2, 3, 4].map(level => (
        <div key={level} className="w-full">
          <div className="flex flex-wrap justify-center gap-8">
            {teamStructure
              .filter(member => member.level === level)
              .map((member, index) => (
                <TeamMember key={member._id || `${level}-${index}`} member={member} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Component() {
  const [isClient, setIsClient] = useState(false)
  const [teamStructure, setTeamStructure] = useState([
    { id: 1, name: 'Tahira Batool', position: 'Organizer', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 1 },
    { id: 2, name: 'Farhan Khalid', position: 'Co-Organizer', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 2 },
    { id: 3, name: 'Abdullah Ansari', position: 'Management Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 2 },
    { id: 4, name: 'M. Waqar', position: 'Development Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 2 },
    { id: 5, name: 'Zain-ul-Abedin', position: 'Technical Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 3 },
    { id: 6, name: 'M. Tayyab Aslam', position: 'Co-Technical Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 3 },
    { id: 7, name: 'Azhar Mehmood', position: 'Marketing Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 3 },
    { id: 8, name: 'Eman Sultan', position: 'Co-Marketing Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 3 },
    { id: 9, name: 'Hafsa Sajid', position: 'Women in Tech', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 4 },
    { id: 10, name: 'Maryam Venus', position: 'Women in Tech (Co-Lead)', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 4 },
    { id: 11, name: 'Asad Ullah', position: 'Design Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 4 },
    { id: 12, name: 'Hadia Amjad', position: 'Content Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 4 },
    { id: 13, name: 'Saleha Eman', position: 'Social Media Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com', level: 4 },
  ])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/team/getallmembers", {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        setTeamStructure(response.data.Team);
      } catch (error) {
        console.error("Error fetching Team:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="relative min-h-screen p-4 sm:p-8 overflow-hidden bg-white">
      {isClient && <DynamicAnimatedBackground />}

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8 sm:mb-16 text-center"
      >
        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-800 mb-2">
            Meet The Team
          </h1>
          <h2 className="text-xl sm:text-2xl font-light text-gray-600">
            Innovating Together, Inspiring Always
          </h2>
        </div>
      </motion.div>

      <AnimatePresence>
        {isClient && <TeamStructure teamStructure={teamStructure} />}
      </AnimatePresence>
    </div>
  )
}