"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Play, ArrowRight, X } from "lucide-react"
import Image from "next/image"
import { ExperienceModal } from "./experience-modal"

const experiences = [
  {
    id: 1,
    title: "Dubai Aquarium",
    subtitle: "& Underwater Zoo",
    description:
      "Home to over 33,000 aquatic animals including the largest collection of sand tiger sharks in the world. Dive into an immersive underwater experience with tunnel walks, shark encounters, and behind-the-scenes tours.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.pexels.com/download/video/856882/",
    stats: "10M+ Visitors",
  },
  {
    id: 2,
    title: "Dubai Ice Rink",
    subtitle: "Olympic-Size Arena",
    description:
      "An Olympic-sized ice rink offering skating sessions, lessons, and professional performances. Experience the thrill of gliding on ice in the heart of the desert.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.pexels.com/download/video/6340278/",
    stats: "365 Days Open",
  },
  {
    id: 3,
    title: "VR Park",
    subtitle: "Virtual Reality Theme Park",
    description:
      "The Middle East's largest VR theme park with immersive adventures and cutting-edge experiences. From racing to horror to adventure, explore infinite virtual worlds.",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.pexels.com/download/video/6498234/",
    stats: "30+ Experiences",
  },
  {
    id: 4,
    title: "Dubai Fountain",
    subtitle: "World's Largest Fountain",
    description:
      "Witness the world's largest choreographed fountain system with shows every 30 minutes. Set against the stunning backdrop of Burj Khalifa, the fountain performs to a range of music.",
    image: "foun.jpg",
    video: "https://www.pexels.com/download/video/14991410/",
    stats: "6,600+ Lights",
  },
]

export function ExperiencesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeExperience, setActiveExperience] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null)

  const handleExperienceClick = (exp: typeof experiences[0]) => {
    setSelectedExperience(exp)
    setIsModalOpen(true)
  }

  return (
    <>
      <section
        id="experiences"
        ref={containerRef}
        className="relative py-32 px-6 lg:px-8 bg-background overflow-hidden"
      >
        {/* Ripple Background Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
              initial={{ width: 100, height: 100, opacity: 0 }}
              animate={{
                width: [100, 800 + i * 200],
                height: [100, 800 + i * 200],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <motion.span
              className="inline-block text-xs tracking-[0.3em] uppercase text-primary mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Experiences
            </motion.span>
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Beyond shopping,
              </motion.span>
              <motion.span
                className="block italic text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                beyond imagination
              </motion.span>
            </h2>
          </motion.div>

          {/* Experience Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Display */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => handleExperienceClick(experiences[activeExperience])}
            >
              {/* Glow Border */}
              <motion.div
                className="absolute -inset-[2px] rounded-2xl z-0"
                animate={{
                  boxShadow: "0 0 60px rgba(212,175,85,0.3), inset 0 0 60px rgba(212,175,85,0.05)",
                }}
              />

              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{
                    opacity: index === activeExperience ? 1 : 0,
                    scale: index === activeExperience ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    poster={exp.image}
                  >
                    <source src={exp.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                </motion.div>
              ))}

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-strong p-6 rounded-full group-hover:bg-primary/20 transition-colors duration-300 shadow-[0_0_40px_rgba(212,175,85,0.3)]"
                >
                  <Play size={32} fill="currentColor" className="text-primary ml-1" />
                </motion.button>
              </div>

              {/* Click to Explore Badge */}
              <motion.div
                className="absolute top-6 right-6 glass px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xs text-foreground">Click to Explore</span>
              </motion.div>

              {/* Stats Badge */}
              <motion.div
                className="absolute bottom-6 left-6 glass px-5 py-3 rounded-full border border-primary/20 shadow-[0_0_20px_rgba(212,175,85,0.2)]"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-sm text-primary font-medium">
                  {experiences[activeExperience].stats}
                </span>
              </motion.div>
            </motion.div>

            {/* Experience List */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  onClick={() => setActiveExperience(index)}
                  className={`group cursor-pointer p-6 rounded-xl transition-all duration-500 relative overflow-hidden ${index === activeExperience
                    ? "glass-strong border border-primary/30"
                    : "hover:bg-white/5"
                    }`}
                  whileHover={{ x: index === activeExperience ? 0 : 10 }}
                >
                  {/* Active Glow */}
                  {index === activeExperience && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        background: "radial-gradient(circle at left, rgba(212,175,85,0.1), transparent 60%)",
                      }}
                    />
                  )}

                  <div className="relative flex items-start justify-between">
                    <div className="flex-1">
                      <motion.span
                        className="text-[10px] tracking-[0.3em] uppercase text-primary"
                        animate={{ opacity: index === activeExperience ? 1 : 0.6 }}
                      >
                        {exp.subtitle}
                      </motion.span>
                      <h3 className="font-serif text-2xl text-foreground mt-1">
                        {exp.title}
                      </h3>
                      <motion.p
                        initial={false}
                        animate={{
                          height: index === activeExperience ? "auto" : 0,
                          opacity: index === activeExperience ? 1 : 0,
                          marginTop: index === activeExperience ? 12 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                        className="text-muted-foreground text-sm overflow-hidden"
                      >
                        {exp.description}
                      </motion.p>
                    </div>
                    <motion.div
                      animate={{
                        rotate: index === activeExperience ? 45 : 0,
                        scale: index === activeExperience ? 1.1 : 1,
                      }}
                      className="mt-2"
                    >
                      <ArrowRight
                        size={20}
                        className={`transition-colors duration-300 ${index === activeExperience
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                          }`}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        experience={selectedExperience}
      />
    </>
  )
}
