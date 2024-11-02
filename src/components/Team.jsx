"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
    { name: 'John Doe', position: 'Lead Organizer', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Jane Smith', position: 'Co-organizer', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Alice Johnson', position: 'Technical Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Bob Williams', position: 'Design Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Charlie Brown', position: 'Marketing Lead', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Diana Prince', position: 'Event Coordinator', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Ethan Hunt', position: 'Content Creator', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Fiona Apple', position: 'Social Media Manager', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'George Lucas', position: 'Workshop Facilitator', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Hannah Montana', position: 'Community Manager', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Ian McKellen', position: 'Mentor', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Julia Roberts', position: 'Outreach Coordinator', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Kevin Hart', position: 'Tech Speaker', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Lena Headey', position: 'Project Manager', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    { name: 'Michael Scott', position: 'Fun Officer', image: 'https://avatar.iran.liara.run/public', linkedin: 'https://linkedin.com', github: 'https://github.com' },
];

const googleColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335'];

function generateDots() {
    return Array.from({ length: 50 }, (_, i) => ({
        color: googleColors[i % googleColors.length],
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        y: Math.random() * 100 - 50,
        x: Math.random() * 100 - 50,
        scale: Math.random() + 0.5,
        duration: Math.random() * 5 + 5,
    }));
}

export default function Component() {
    const [dots, setDots] = useState([]);

    useEffect(() => {
        setDots(generateDots());
    }, []);

    return (
        <div className="relative min-h-screen p-8 overflow-hidden bg-white">
            {/* Google logo background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" width="544" height="184">
                    {/* SVG paths for Google logo */}
                </svg>
            </div>

            {/* Animated dots background */}
            {dots.map((dot, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                        backgroundColor: dot.color,
                        top: dot.top,
                        left: dot.left,
                    }}
                    animate={{
                        y: [0, dot.y],
                        x: [0, dot.x],
                        scale: [1, dot.scale, 1],
                    }}
                    transition={{
                        duration: dot.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 mb-16 text-center"
            >
                <h1 className="mb-4 text-6xl font-bold tracking-tight">
                   Meet The Team
                </h1>
                <p className="text-2xl font-light text-gray-600">Innovating Together, Inspiring Always</p>
            </motion.div>

            <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-5">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative text-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            className="relative overflow-hidden rounded-full"
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={150}
                                height={150}
                                className="mx-auto"
                            />
                        </motion.div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-800">{member.name}</h3>
                        <p className="mt-1 text-sm font-medium text-gray-600">{member.position}</p>
                        <div className="flex justify-center mt-2 space-x-2">
                            <Button variant="ghost" size="icon" asChild>
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="w-5 h-5" />
                                    <span className="sr-only">LinkedIn profile of {member.name}</span>
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href={member.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-5 h-5" />
                                    <span className="sr-only">GitHub profile of {member.name}</span>
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
