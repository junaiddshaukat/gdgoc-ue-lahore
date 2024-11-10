'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import axios from "axios";
import { CalendarClock } from "lucide-react";
import Link from 'next/link';

export default function GDSCSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [randomValues, setRandomValues] = useState([]);
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Google's theme colors
  const googleColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335'];

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/upcomingevent/getupcomingevents", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setSlides(response.data.Events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const values = [...Array(30)].map(() => ({
        width: `${Math.random() * 4 + 1}vw`,
        height: `${Math.random() * 4 + 1}vw`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        color: googleColors[Math.floor(Math.random() * googleColors.length)],
      }));
      setRandomValues(values);
    }
  }, [slides]);

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0 })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + slides.length) % slides.length);
  };

  const handleDeleteEvent = async (eventId) => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:3001/upcomingevent/deletevent/${eventId}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      const updatedSlides = slides.filter(slide => slide._id !== eventId);
      setSlides(updatedSlides);
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading || isDeleting) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative w-16 h-16">
          {googleColors.map((color, index) => (
            <motion.div
              key={color}
              className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-4 border-solid"
              style={{
                borderColor: `${color} transparent transparent transparent`,
                rotate: `${index * 30}deg`,
              }}
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-10 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center relative">
              <CalendarClock size={40} className="font-extrabold mt-2 mb-4 mr-2" /> Upcoming Events
            </h2>
          </motion.div>
          <Card className="w-full max-w-md mx-auto overflow-hidden shadow-2xl">
            <CardContent className="p-6 text-center">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-700">
                No upcoming events at the moment.
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-2 text-gray-500">
                Check back later for exciting new events!
              </motion.p>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    );
  }

  return (
    <section className="py-10 relative overflow-hidden">
      {randomValues.map((style, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-15"
          style={{
            backgroundColor: style.color,
            width: style.width,
            height: style.height,
            top: style.top,
            left: style.left,
          }}
          animate={{
            y: [0, `${Math.random() * 20 - 10}vh`],
            x: [0, `${Math.random() * 20 - 10}vw`],
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center relative">
            <CalendarClock size={40} className="font-extrabold mt-2 mb-4 mr-2" /> Upcoming Events
          </h2>
        </motion.div>

        <div className="flex items-center justify-center">
          <motion.div
            className="absolute mb-2 left-0 md:left-52 z-20 cursor-pointer w-10 h-10 md:w-12 md:h-12"
            whileHover={{ scale: 1.1, filter: "brightness(1.2)", transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
          >
            <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gdsc-fl-9fduuwigrI4kdClqpq7OrgZKOdQhpk.webp" alt="Previous" layout="fill" objectFit="contain" className="drop-shadow-lg transition-all duration-300" />
          </motion.div>

          <div className="relative w-full max-w-md aspect-[5/5] mx-auto">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) paginate(1);
                  else if (swipe > swipeConfidenceThreshold) paginate(-1);
                }}
                className="absolute w-full h-full"
              >
                <Card className="w-full h-full overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <CardContent className="p-0 relative h-full">
                    <div className="relative w-full h-full">
                      <Image 
                        src={slides[currentIndex].image} 
                        alt={slides[currentIndex].title} 
                        layout="fill" 
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                      <motion.h3 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 10 }} className="text-xl sm:text-2xl font-bold mb-2">
                        {slides[currentIndex].title}
                      </motion.h3>
                      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-sm sm:text-base text-gray-200">
                        {slides[currentIndex].description}
                      </motion.p>
                      <Link href={`${slides[currentIndex].mainpage_url}`}>
                        <motion.button 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ delay: 0.2 }} 
                          className="mt-3 px-4 py-1.5 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-300"
                          aria-label={`Learn more about ${slides[currentIndex].title}`}
                        >
                          Learn More
                        </motion.button>
                      </Link>
                     
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="absolute right-0 md:right-52 z-20 cursor-pointer w-10 h-10 md:w-12 md:h-12"
            whileHover={{ scale: 1.1, filter: "brightness(1.2)", transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
          >
            <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gdsc-fr-9qCDDJSAxlIsfR0DbYnzneTbicgYTl.webp" alt="Next" layout="fill" objectFit="contain" className="drop-shadow-lg transition-all duration-300" />
          </motion.div>
        </div>

        <div className="flex justify-center space-x-2 mt-4">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentIndex === index ? "bg-[#4285F4] scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-8 text-center">
          <Button className="px-6 py-2 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-lg font-medium transition-colors duration-300">
            View All Events
          </Button>
        </motion.div>
      </div>
    </section>
  );
}