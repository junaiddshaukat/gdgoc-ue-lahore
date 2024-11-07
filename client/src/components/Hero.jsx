"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative py-20  bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="container z-10 mt-5 mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mx-10 mb-8 md:mb-0 z-10">
           
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">
                Google Developer Group
                <span className=" text-[#4285F4]"> On Campus </span>
                (GDGoC UE)
              </h1>

              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-600">
                University of Education, Lahore
              </h2>
              <p className="text-lg mb-6 text-gray-600">
                Join our community of developers, designers, and tech
                enthusiasts. Learn, connect, and grow together.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://gdg.community.dev/gdg-on-campus-university-of-education-lahore-pakistan/"
                  className="relative inline-block px-4 py-2 font-medium group"
                >
                  <span className="rounded-md absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-green-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute rounded-md inset-0 w-full h-full bg-white border-2 border-green-600 group-hover:bg-green-600"></span>
                  <span className="relative text-blue-600 group-hover:text-white">
                    Become a Member
                  </span>
                </Link>
                <Link
                  href="https://gdg.community.dev/gdg-on-campus-university-of-education-lahore-pakistan/"
                  className="relative inline-block px-4 py-2 font-medium group"
                >
                  <span className="rounded-md absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-green-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute rounded-md inset-0 w-full h-full bg-white border-2 border-green-600 group-hover:bg-green-600"></span>
                  <span className="relative text-blue-600 group-hover:text-white">
                    Learn More
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <span className="relative left-20 top-7 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <motion.div
                animate={{
                  scale: [3, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -right-20
              -bottom-20 w-20 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              ></motion.div>
              <div className="relative space-y-4">
                <div className="p-5  h-auto rounded-lg flex items-center justify-between space-x-8">
                  <Image
                    src="https://res.cloudinary.com/junaidshaukat/image/upload/v1730486483/llevukfazkw7lay9gxha.png"
                    alt="GDG Logo"
                    width={900}
                    height={100}
                    className=" rounded-lg z-20 hover:scale-105 transition duration-400 ease-in-out"
                  />
                </div>
                <span className="relative left-20 top-7 flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-green-500"></span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{
          scale: [4, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute -top-20 -left-20 w-20 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"
      ></motion.div>
      {/* <div className="absolute bottom-5 -inset-x-32 bg-gradient-to-t from-white/95 pt-[5%]"></div>
            <div className="absolute -bottom-10 -inset-x-32 bg-gradient-to-t from-white/95 pt-[5%] transform scale-y-[-1]">
            </div> */}

      <span className="relative left-20 top-7 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>
      <span className="absolute right-[70%] top-[20%] flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-yellow-500"></span>
            </span>
      <span className="absolute right-[65%] bottom-[17%] flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500"></span>
            </span>
    </section>
  );
}
