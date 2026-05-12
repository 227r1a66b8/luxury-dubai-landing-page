"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    title: "Fashion & Luxury",
    description: "World-renowned fashion houses and exclusive boutiques",
    video: "Untitled design.mp4",
    image: "https://images.pexels.com/photos/35596695/pexels-photo-35596695.jpeg",
    count: "450+",
  },
  {
    title: "Dining & Cuisine",
    description: "From Michelin-starred restaurants to artisan cafes",
    video: "https://www.pexels.com/download/video/5102309/",
    image: "dining.png",
    count: "200+",
  },
  {
    title: "Entertainment",
    description: "Aquarium, ice rink, VR park, and endless attractions",
    video: "https://www.pexels.com/download/video/11042667/",
    image: "aquarium (2).png",
    count: "80+",
  },
  {
    title: "Art & Culture",
    description: "Galleries, exhibitions, and cultural experiences",
    video: "https://www.pexels.com/download/video/36229200/",
    image: "art.png",
    count: "30+",
  },
]

interface TiltCardProps {
  category: typeof categories[0]
  index: number
  isInView: boolean
}

function TiltCard({ category, index, isInView }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer group"
      >
        {/* Glow Border */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl z-0"
          animate={{
            boxShadow: isHovered
              ? "0 0 30px rgba(212,175,85,0.4), inset 0 0 30px rgba(212,175,85,0.1)"
              : "0 0 0 rgba(212,175,85,0)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Background Video/Image */}
        <div className="absolute inset-0">
          {isHovered ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 scale-110"
              poster={category.image}
            >
              <source src={category.video} type="video/mp4" />
            </video>
          ) : (
            <motion.img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.7 }}
            />
          )}
        </div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
          animate={{ opacity: isHovered ? 0.95 : 0.8 }}
          transition={{ duration: 0.5 }}
        />

        {/* Mouse Spotlight Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(212,175,85,0.15), transparent 40%)`,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="flex items-start justify-between">
            <div>
              <motion.span
                className="text-xs tracking-[0.2em] uppercase text-primary mb-2 block"
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {category.count} Venues
              </motion.span>
              <motion.h3
                className="font-serif text-2xl md:text-3xl text-foreground mb-2"
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {category.title}
              </motion.h3>
              <motion.p
                className="text-muted-foreground text-sm max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 5 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {category.description}
              </motion.p>
            </div>
            <motion.div
              className="p-3 glass rounded-full"
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
                boxShadow: isHovered
                  ? "0 0 20px rgba(212,175,85,0.4)"
                  : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight size={20} className="text-primary" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ExploreSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section
      id="explore"
      ref={containerRef}
      className="relative py-32 px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <motion.span
            className="inline-block text-xs tracking-[0.3em] uppercase text-primary mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover
          </motion.span>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-foreground max-w-3xl leading-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A world of wonder
            </motion.span>
            <motion.span
              className="block italic text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              awaits within
            </motion.span>
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <TiltCard
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors group"
            whileHover={{ x: 5 }}
          >
            <span>View All Categories</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
