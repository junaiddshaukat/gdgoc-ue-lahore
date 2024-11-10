'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { CalendarCheck, ChevronDown, ChevronUp } from 'lucide-react'
import axios from 'axios'
import Link from 'next/link'

const googleColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335']

const dummyEvents = [
  {
    _id: '1',
    title: 'Google I/O Extended',
    description: 'A local version of Google\'s flagship developer conference. Dive into the latest technologies and connect with fellow developers in your area.',
    image: 'https://picsum.photos/800/600?random=1',
    color: '#4285F4',
    mainpage_url: 'https://events.google.com/io/',
    type: 'past',
    Gallery_Images: ['https://picsum.photos/800/600?random=2', 'https://picsum.photos/800/600?random=3']
  },
  {
    _id: '2',
    title: 'Android Dev Summit',
    description: 'Deep dive into the latest Android development tools and APIs. Learn from Google experts and connect with the Android developer community.',
    image: 'https://picsum.photos/800/600?random=4',
    color: '#34A853',
    mainpage_url: 'https://developer.android.com/dev-summit',
    type: 'past',
    Gallery_Images: ['https://picsum.photos/800/600?random=5', 'https://picsum.photos/800/600?random=6']
  },
  {
    _id: '3',
    title: 'Flutter Forward',
    description: 'Exploring the future of Flutter and cross-platform development. Discover new features, best practices, and innovative use cases for Flutter.',
    image: 'https://picsum.photos/800/600?random=7',
    color: '#FBBC05',
    mainpage_url: 'https://flutter.dev/events',
    type: 'past',
    Gallery_Images: ['https://picsum.photos/800/600?random=8', 'https://picsum.photos/800/600?random=9']
  }
]

const PastEvents = () => {
  const [Events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/upcomingevent/getpastevents", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setEvents(response.data.Events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const EventCard = ({ event }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768)
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleInteraction = () => {
      if (isMobile) {
        setIsHovered(!isHovered)
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => !isMobile && setIsHovered(true)}
        onHoverEnd={() => !isMobile && setIsHovered(false)}
        onClick={handleInteraction}
        className="relative h-96 rounded-lg overflow-hidden cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:w-16 before:h-16 before:border-t-4 before:border-l-4 before:border-white after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-16 after:h-16 after:border-b-4 after:border-r-4 after:border-white"
        style={{ backgroundColor: event.color }}
      >
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={event.image}
                alt={event.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <h3 className="text-white text-xl font-bold">{event.title}</h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col"
            >
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ duration: 0.3 }}
                className="flex-1 p-4 bg-white"
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: event.color }}>{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </motion.div>

              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                exit={{ y: 50 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-gray-100 flex justify-between items-center"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(event.mainpage_url, '_blank')
                  }}
                  style={{ borderColor: event.color, color: event.color }}
                >
                  Learn More
                </Button>
               <Link href={`/gallery/${event._id}`} passHref>
                 <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('Open gallery for', event.title)
                  }}
                  style={{ borderColor: event.color, color: event.color }}
                >
                  View Gallery
                </Button>
               </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  if (isLoading) {
    return (
      <div className="relative py-20 bg-white overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="flex justify-center items-center h-64 w-full">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {googleColors.map((color, index) => (
              <div
                key={index}
                className="absolute w-16 h-16 border-4 rounded-full animate-spin"
                style={{
                  borderColor: `${color} transparent transparent transparent`,
                  animationDuration: '1.5s',
                  animationDelay: `${index * 0.2}s`,
                  transform: `rotate(${index * 90}deg)`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
            <CalendarCheck className="mr-2" size={40} />
            Past Events
          </h2>
          <p className="mt-4 text-xl text-gray-600">Relive the moments that shaped our community</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PastEvents
