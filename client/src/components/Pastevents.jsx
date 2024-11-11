'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { CalendarCheck, ChevronDown, ChevronUp, ExternalLink, Image as ImageIcon } from 'lucide-react'

const googleColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335']

const PastEvents = () => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedEvent, setExpandedEvent] = useState(null)

  const fetchEvents = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("http://localhost:3001/upcomingevent/getpastevents", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
      setEvents(response.data.Events)
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const EventCard = ({ event, index }) => {
    const isExpanded = expandedEvent === event._id
    const toggleExpand = () => setExpandedEvent(isExpanded ? null : event._id)

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white rounded-xl border">
          <CardContent className="p-0">
            <div className="relative aspect-square">
              <Image
                src={event.image}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-3xl font-bold">{event.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleExpand}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 w-full sm:w-auto"
                >
                  {isExpanded ? (
                    <>
                      Less info <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      More info <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(event.mainpage_url, '_blank')}
                    className="text-green-600 border-green-600 hover:bg-green-50 w-full sm:w-auto"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                  <Link href={`/gallery/${event._id}`} passHref className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-yellow-600 border-yellow-600 hover:bg-yellow-50 w-full"
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Gallery
                    </Button>
                  </Link>
                </div>
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <p className="text-gray-700">{event.description}</p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {event.Gallery_Images.slice(0, 2).map((img, idx) => (
                        <div key={idx} className="relative aspect-square">
                          <Image
                            src={img}
                            alt={`Gallery image ${idx + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="relative w-32 h-32">
          {googleColors.map((color, index) => (
            <motion.div
              key={index}
              className="absolute w-16 h-16 border-4 rounded-full"
              style={{
                borderColor: `${color} transparent transparent transparent`,
                top: '50%',
                left: '50%',
                marginTop: '-8px',
                marginLeft: '-8px',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 0.25,
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-100 via-white to-green-100 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
            <CalendarCheck className="mr-2 text-blue-600" size={40} />
            Past Events
          </h2>
          <p className="mt-4 text-xl text-gray-600">Relive the moments that shaped our community</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={event._id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PastEvents