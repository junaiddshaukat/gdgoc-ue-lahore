'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"

const googleColors = ['#EA4335', '#FBBC05', '#34A853', '#4285F4']

export default function ImageGallery({ eventid }) {
  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState(null)

  const fetchEvent = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`http://localhost:3001/upcomingevent/getoneevent/${eventid}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
      console.log(response.data.Event)
      setEvent(response.data.Event)
    } catch (error) {
      console.error("Error fetching event:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEvent()
  }, [eventid])

  const handleBack = () => {
    window.history.back();
  }

  return (
    <section className="relative py-20 bg-white overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <Button
        variant="outline"
        size="lg"
        className="absolute left-4 top-4 z-20 flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors"
        onClick={handleBack}
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Past Events
      </Button>

      <div className="container z-10 mt-16 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">
            Event <span className="text-[#4285F4]">Gallery</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-600">
            Capturing Moments, Inspiring Memories
          </h2>
        </motion.div>

        {isLoading ? (
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
        ) : event && event.Gallery_Images && event.Gallery_Images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {event.Gallery_Images.map((url, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
                whileHover={{ scale: 1.15 }}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={url}
                    alt={`Event image ${index + 1}`}
                    width={300}
                    height={200}
                    layout="responsive"
                    className="transition-transform duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl">No images available for this event.</p>
        )}
      </div>

      <motion.div
        animate={{
          scale: [1.05, 1, 1.05],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute -top-20 -left-20 w-20 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"
      ></motion.div>

      <motion.div
        animate={{
          scale: [1.05, 1, 1.05],
          rotate: [0, -2, 2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute -right-20 -bottom-20 w-20 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
      ></motion.div>
    </section>
  )
}