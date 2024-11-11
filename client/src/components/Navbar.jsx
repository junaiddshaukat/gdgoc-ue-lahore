'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gdsc-fl-TEh7JdtSLVltv1QbMlKob0Tk3NrqqC.webp"
              alt="GDG Logo Left"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="text-xl font-bold text-gray-800">
              GDGoC UE Lahore
            </span>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gdsc-fr-L2Ks6DEVw8cZMlcPVcHhjHBUyPpzMF.webp"
              alt="GDG Logo Right"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="relative font-medium text-gray-600 hover:text-[#4285F4] transition-colors duration-300">
              Home
            </button>
            <button onClick={() => scrollToSection('UpcomingEvents')} className="relative font-medium text-gray-600 hover:text-[#EA4335] transition-colors duration-300">
              Events
            </button>
            <button onClick={() => scrollToSection('Team')} className="relative font-medium text-gray-600 hover:text-[#FBBC04] transition-colors duration-300">
              Team
            </button>
            <button onClick={() => scrollToSection('About')} className="relative font-medium text-gray-600 hover:text-[#34A853] transition-colors duration-300">
              About
            </button>
            <Link
              href="https://gdg.community.dev/gdg-on-campus-university-of-education-lahore-pakistan/"
              target="_blank"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-[#4285F4] hover:bg-[#3367D6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4] transition-colors duration-300"
            >
              Join Now
            </Link>
          </div>

          {/* Menu button for mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute w-full bg-white border-b transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <button
          onClick={() => scrollToSection('home')}
          className="block w-full text-left px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#4285F4] transition-colors duration-300 border-l-4 border-transparent hover:border-[#4285F4]"
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('UpcomingEvents')}
          className="block w-full text-left px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#EA4335] transition-colors duration-300 border-l-4 border-transparent hover:border-[#EA4335]"
        >
          Events
        </button>
        <button
          onClick={() => scrollToSection('Team')}
          className="block w-full text-left px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#FBBC04] transition-colors duration-300 border-l-4 border-transparent hover:border-[#FBBC04]"
        >
          Team
        </button>
        <button
          onClick={() => scrollToSection('About')}
          className="block w-full text-left px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#34A853] transition-colors duration-300 border-l-4 border-transparent hover:border-[#34A853]"
        >
          About
        </button>
        <Link
          href="https://gdg.community.dev/gdg-on-campus-university-of-education-lahore-pakistan/"
          target="_blank"
          className="block w-full text-left px-6 py-3 text-[#4285F4] font-medium hover:bg-gray-50 transition-colors duration-300"
        >
          Join Now
        </Link>
      </div>
    </nav>
  )
}
