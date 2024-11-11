import { Facebook, Github, Heart, Instagram, Linkedin, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <footer className="bg-white border-t">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GDGOC-pKPcMUfdGR96UBOJyjaJaI7QcMF3Lb.png"
              alt="GDGOC UE Lahore Logo"
              width={180}
              height={180}
              className="mb-6 transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <h2 className="text-2xl font-bold text-primary mb-2">GDGoC UE Lahore</h2>
            <p className="max-w-xs text-sm text-center md:text-left text-muted-foreground">
              Building a community of developers who learn, share, and grow together.
            </p>
          </div>
          <div className="w-full lg:w-auto lg:flex-1 max-w-lg mx-auto lg:mx-4">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.5613123271905!2d74.29645447506661!3d31.45374195043196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190145ae97af17%3A0x6d1f02b5cd2ab9f7!2sUniversity%20of%20Education!5e0!3m2!1sen!2s!4v1730545939389!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="University of Education Map"
              ></iframe>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-end space-y-4">
            <div className="flex items-center space-x-4 md:mr-10 ">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Github"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <Link
                href="https://www.google.com/maps/place/University+of+Education/@31.453742,74.2964545,17z/data=!3m1!4b1!4m14!1m7!3m6!1s0x39190145ae97af17:0x6d1f02b5cd2ab9f7!2sUniversity+of+Education!8m2!3d31.4537374!4d74.2990294!16s%2Fm%2F02696jn!3m5!1s0x39190145ae97af17:0x6d1f02b5cd2ab9f7!8m2!3d31.4537374!4d74.2990294!16s%2Fm%2F02696jn?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
              >
                University of Education, Lahore
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-muted flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} GDGOC UE Lahore. All rights reserved.</p>
          <div className="flex items-center mt-2 md:mt-0">
            Made with 
            <Heart className="w-3 h-3 mx-1 text-red-500 animate-pulse" />
            by 
            <span className="font-medium hover:text-primary transition-colors duration-300 ml-1">
             Bismillah Coders
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}