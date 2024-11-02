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

  const navItems = [
    { name: 'Home', color: '#4285F4' },
    { name: 'Events', color: '#EA4335' },
    { name: 'Team', color: '#FBBC04' },
    { name: 'About', color: '#34A853' },
  ]

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

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className={`relative font-medium text-gray-600 hover:text-[${item.color}] transition-colors duration-300`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="#join"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-[#4285F4] hover:bg-[#3367D6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4] transition-colors duration-300"
            >
              Join Now
            </a>
          </div>

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
        className={`md:hidden absolute w-full bg-white border-b transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } transition-all duration-300`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={`#${item.name.toLowerCase()}`}
            onClick={() => setIsMenuOpen(false)}
            className={`block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[${item.color}] transition-colors duration-300 border-l-4 border-transparent hover:border-[${item.color}]`}
          >
            {item.name}
          </Link>
        ))}
        <a
          href="#join"
          onClick={() => setIsMenuOpen(false)}
          className="block px-6 py-3 text-[#4285F4] font-medium hover:bg-gray-50 transition-colors duration-300"
        >
          Join Now
        </a>
      </div>
    </nav>
  )
}