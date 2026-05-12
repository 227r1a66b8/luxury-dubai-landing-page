"use client"

import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import { Star, ArrowUpRight } from "lucide-react"
import Image from "next/image"

const restaurants = [
  {
    name: "At.mosphere",
    type: "Fine Dining",
    cuisine: "Contemporary European",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    name: "Nobu",
    type: "Japanese",
    cuisine: "Japanese-Peruvian Fusion",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    name: "Zuma",
    type: "Contemporary Japanese",
    cuisine: "Izakaya Style",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    name: "La Petite Maison",
    type: "French",
    cuisine: "Mediterranean Cuisine",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
]

interface TiltRestaurantCardProps {
  restaurant: typeof restaurants[0]
  index: number
  isInView: boolean
}

function TiltRestaurantCard({ restaurant, index, isInView }: TiltRestaurantCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"])

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
        delay: 0.3 + index * 0.1,
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
        className="relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer group"
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute -inset-[1px] rounded-xl z-0"
          animate={{
            boxShadow: isHovered
              ? "0 0 30px rgba(212,175,85,0.4), inset 0 0 20px rgba(212,175,85,0.1)"
              : "none",
          }}
          transition={{ duration: 0.3 }}
        />

        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover transition-transform duration-700"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.span
            className="text-[10px] tracking-[0.3em] uppercase text-primary mb-1"
            animate={{ y: isHovered ? -5 : 0 }}
          >
            {restaurant.type}
          </motion.span>
          <motion.h3
            className="font-serif text-xl text-foreground"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ delay: 0.05 }}
          >
            {restaurant.name}
          </motion.h3>
          <motion.p
            className="text-muted-foreground text-xs mt-1"
            animate={{ y: isHovered ? -5 : 0, opacity: isHovered ? 1 : 0.7 }}
            transition={{ delay: 0.1 }}
          >
            {restaurant.cuisine}
          </motion.p>
          <motion.div
            className="flex items-center gap-1 mt-3 text-primary"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ delay: 0.15 }}
          >
            <Star size={12} fill="currentColor" />
            <span className="text-xs">{restaurant.rating}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function DiningSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const [isFeaturedHovered, setIsFeaturedHovered] = useState(false)

  return (
    <section
      id="dining"
      ref={containerRef}
      className="relative py-32 bg-secondary/30 overflow-hidden"
    >
      {/* Animated Scrolling Text Background */}
      <motion.div
        style={{ x: textX }}
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
      >
        <span className="font-serif text-[20vw] font-light tracking-tight text-foreground/[0.03]">
          CULINARY EXCELLENCE • CULINARY EXCELLENCE • CULINARY EXCELLENCE •
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
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
            transition={{ delay: 0.2 }}
          >
            Dining
          </motion.span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-foreground max-w-2xl leading-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Culinary journeys
              </motion.span>
              <motion.span
                className="block italic text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                around the world
              </motion.span>
            </h2>
            <motion.a
              href="#"
              className="mt-6 lg:mt-0 inline-flex items-center gap-2 text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors group"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              whileHover={{ x: 5 }}
            >
              <span>All 200+ Restaurants</span>
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </motion.a>
          </div>
        </motion.div>

        {/* Featured Restaurant */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div
            className="group relative overflow-hidden rounded-2xl aspect-[21/9] cursor-pointer"
            onMouseEnter={() => setIsFeaturedHovered(true)}
            onMouseLeave={() => setIsFeaturedHovered(false)}
          >
            {/* Glow Border */}
            <motion.div
              className="absolute -inset-[2px] rounded-2xl z-0"
              animate={{
                boxShadow: isFeaturedHovered
                  ? "0 0 60px rgba(212,175,85,0.4), inset 0 0 40px rgba(212,175,85,0.1)"
                  : "none",
              }}
              transition={{ duration: 0.5 }}
            />

            <Image
              src={restaurants[0].image}
              alt={restaurants[0].name}
              fill
              className="object-cover transition-transform duration-700"
              style={{ transform: isFeaturedHovered ? "scale(1.05)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent" />

            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end md:justify-center max-w-xl">
              <motion.span
                className="inline-flex items-center gap-1 text-xs tracking-[0.3em] uppercase text-primary mb-2"
                animate={{ y: isFeaturedHovered ? -5 : 0 }}
              >
                <Star size={12} fill="currentColor" />
                Featured
              </motion.span>
              <motion.h3
                className="font-serif text-3xl md:text-5xl text-foreground mb-2"
                animate={{ y: isFeaturedHovered ? -5 : 0 }}
                transition={{ delay: 0.05 }}
              >
                {restaurants[0].name}
              </motion.h3>
              <motion.p
                className="text-muted-foreground text-sm md:text-base mb-4"
                animate={{ y: isFeaturedHovered ? -5 : 0 }}
                transition={{ delay: 0.1 }}
              >
                {restaurants[0].cuisine} - {restaurants[0].type}
              </motion.p>
              <motion.div
                className="flex items-center gap-4"
                animate={{ y: isFeaturedHovered ? -5 : 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex items-center gap-1 text-primary">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm">{restaurants[0].rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">
                  World&apos;s highest restaurant
                </span>
              </motion.div>
            </div>

            <motion.div
              className="absolute top-8 right-8 p-3 glass rounded-full"
              animate={{
                opacity: isFeaturedHovered ? 1 : 0,
                scale: isFeaturedHovered ? 1 : 0.8,
                boxShadow: isFeaturedHovered ? "0 0 20px rgba(212,175,85,0.5)" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={20} className="text-primary" />
            </motion.div>
          </div>
        </motion.div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restaurants.slice(1).map((restaurant, index) => (
            <TiltRestaurantCard
              key={restaurant.name}
              restaurant={restaurant}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
