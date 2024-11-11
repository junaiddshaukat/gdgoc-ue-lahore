'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Send, Mail, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    regarding: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Message sent successfully!')
    setFormData({ regarding: '', message: '' })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-t-4 border-t-[#4285F4]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center space-x-2">
              <Mail className="w-6 h-6 text-[#4285F4]" />
              <span>Contact Us</span>
            </CardTitle>
            <CardDescription>We're here to help and answer any question you might have.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="regarding" className="text-sm font-medium text-gray-700">Regarding</Label>
                <Input
                  type="text"
                  id="regarding"
                  name="regarding"
                  value={formData.regarding}
                  onChange={handleInputChange}
                  className="w-full transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  placeholder="Brief topic of your message"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  placeholder="Please provide details about your inquiry or feedback"
                  rows={4}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full py-2 bg-[#4285F4] text-white rounded-md hover:bg-[#3367D6] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4] flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              </Button>
            </form>
            {formStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-3 bg-green-100 border border-green-300 rounded-md flex items-center space-x-2"
              >
                <AlertCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-700 text-sm">{formStatus}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
