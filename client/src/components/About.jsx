'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Code, Users, Lightbulb, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"

import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Button } from "../components/ui/button"



export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState({
    Regarding: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const tabs = [
    { icon: <Code className="w-6 h-6" />, title: 'Learn', color: 'bg-blue-500' },
    { icon: <Users className="w-6 h-6" />, title: 'Connect', color: 'bg-red-500' },
    { icon: <Lightbulb className="w-6 h-6" />, title: 'Grow', color: 'bg-yellow-500' },
    { icon: <Calendar className="w-6 h-6" />, title: 'Events', color: 'bg-green-500' },
  ]

  const content = [
    {
      title: 'Learn Cutting-Edge Technologies',
      description: 'Dive deep into the latest Google technologies and industry best practices through workshops, codelabs, and tech talks.',
    },
    {
      title: 'Connect with Fellow Developers',
      description: 'Build a network of like-minded individuals, share ideas, and collaborate on exciting projects within our vibrant community.',
    },
    {
      title: 'Grow Your Skills and Career',
      description: 'Enhance your technical skills, gain leadership experience, and boost your career prospects in the tech industry.',
    },
    {
      title: 'Attend Exciting Events',
      description: 'Participate in hackathons, conferences, coding competitions and meetups to showcase your skills and learn from industry experts.',
    },
  ]

  return (
    <section className="relative py-16 bg-white">
      {/* <DotPattern /> */}
      <div className="container z-50 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center z-30 mb-12"
        >
          <h2 className="text-4xl z-50 font-bold text-gray-800 mb-4">About GDGoC UE Lahore</h2>
          <p className="text-xl z-50 text-gray-600 max-w-2xl mx-auto">
            Empowering students and developers to learn, connect, and grow with Google technologies.
          </p>
        </motion.div>
        
        {/* Tabs Section */}
        <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full z-10 md:w-1/3"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GDGOC-pKPcMUfdGR96UBOJyjaJaI7QcMF3Lb.png"
              alt="GDGOC UE Lahore Logo"
              width={500}
              height={500}
              className="rounded-lg z-10 bg-transparent mx-auto md:mx-0"
            />
          </motion.div>

          <div className="w-full z-20 md:w-2/3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex border-b">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex-1 py-4 px-6 text-center focus:outline-none transition-colors duration-300 ${
                      activeTab === index ? `${tab.color} text-white` : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {tab.icon}
                      <span className="font-medium">{tab.title}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-6">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-gray-800">{content[activeTab].title}</h3>
                  <p className="text-gray-600">{content[activeTab].description}</p>
                  
                  <motion.a
                    href="#"
                    className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Form Section */}
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto mt-12"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Contact Us</CardTitle>
          <CardDescription className="text-center">
            Have any questions? Send us a message and we'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="Regarding">Regarding</Label>
              <Input
                type="text"
                id="Regarding"
                name="Regarding"
                value={formData.Regarding}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={`mailto:zain9175zain@gmail.com?subject=Regarding: ${formData.Regarding}&body=${formData.message}`}>
            <Button className="bg-blue-500 hover:bg-blue-600" size="lg">
              Send Message
            </Button>
          </Link>
        </CardFooter>
      </Card>
      {formStatus && (
        <p className="mt-4 text-center text-muted-foreground">{formStatus}</p>
      )}
    </motion.div>
      </div>
    </section>
  )
}
