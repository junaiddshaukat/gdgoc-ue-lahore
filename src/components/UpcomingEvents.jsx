'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";

const slides = [
  { title: "Web Development", description: "Learn modern web development with hands-on workshops", image: "https://res.cloudinary.com/junaidshaukat/image/upload/v1730516913/dt02x4oh8uq4ajgfvtvw.jpg", color: "#4285F4" },
  { title: "Cloud Computing", description: "Master cloud technologies with Google Cloud Platform", image: "https://res.cloudinary.com/junaidshaukat/image/upload/v1730516913/dt02x4oh8uq4ajgfvtvw.jpg", color: "#0F9D58" },
  { title: "Machine Learning", description: "Explore AI and ML with TensorFlow and Python", image: "https://res.cloudinary.com/junaidshaukat/image/upload/v1730516913/dt02x4oh8uq4ajgfvtvw.jpg", color: "#F4B400" },
  { title: "Machine Learning", description: "Explore AI and ML with TensorFlow and Python", image: "https://res.cloudinary.com/junaidshaukat/image/upload/v1730516913/dt02x4oh8uq4ajgfvtvw.jpg", color: "#F4B400" },
  { title: "Machine Learning", description: "Explore AI and ML with TensorFlow and Python", image: "https://res.cloudinary.com/junaidshaukat/image/upload/v1730516913/dt02x4oh8uq4ajgfvtvw.jpg", color: "#F4B400" },
  { title: "Machine Learning", description: "Explore AI and ML with TensorFlow and Python", image: "https://res.cloudinary.com/junaidshaukat/image/upload/v1730516913/dt02x4oh8uq4ajgfvtvw.jpg", color: "#F4B400" },
  { title: "Mobile Development", description: "Build Android apps with Kotlin and Jetpack Compose", image: "https://res.cloudinary.com/junaidshaukat/image/upload/v1730516913/dt02x4oh8uq4ajgfvtvw.jpg", color: "#DB4437" }
];

export default function GDSCSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [randomValues, setRandomValues] = useState([]);

  useEffect(() => {
    const values = [...Array(20)].map(() => ({
      width: `${Math.random() * 5 + 2}vw`,
      height: `${Math.random() * 5 + 2}vw`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      color: slides[Math.floor(Math.random() * slides.length)].color,
    }));
    setRandomValues(values);
  }, []);

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

  return (
    <section className="py-10 relative overflow-hidden">

      {/* Animated background elements */}
      {randomValues.map((style, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10"
          style={{
            backgroundColor: style.color,
            width: style.width,
            height: style.height,
            top: style.top,
            left: style.left,
          }}
          animate={{
            y: [0, `${Math.random() * 10 - 5}vh`],
            x: [0, `${Math.random() * 10 - 5}vw`],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center relative"> <CalendarClock size={40} className="font-extrabold mt-2 mb-4 mr-2" /> Upcoming Events </h2>
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                      <motion.h3 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl sm:text-2xl font-bold mb-2">
                        {slides[currentIndex].title}
                      </motion.h3>
                      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-sm sm:text-base text-gray-200">
                        {slides[currentIndex].description}
                      </motion.p>
                      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-3 px-4 py-1.5 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-300">
                        Learn More
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="absolute right-0 md:right-52  z-20 cursor-pointer w-10 h-10 md:w-12 md:h-12"
            whileHover={{ scale: 1.1, filter: "brightness(1.2)", transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
          >
            <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gdsc-fr-9qCDDJSAxlIsfR0DbYnzneTbicgYTl.webp" alt="Next" layout="fill" objectFit="contain" className="drop-shadow-lg transition-all duration-300" />
          </motion.div>
        </div>

        {/* Slide indicators */}
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
            />
          ))}
        </div>

        {/* View All Events button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-8 text-center">
          <Button className="px-6 py-2 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-lg font-medium transition-colors duration-300">View All Events</Button>
        </motion.div>
      </div>
    </section>
  );
}