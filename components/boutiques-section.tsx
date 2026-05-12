"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

const featuredBrands = [
  {
    name: "Dior",
    category: "Haute Couture",
    image: "dior.jpg",
  },
  {
    name: "Chanel",
    category: "Fashion House",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rolex",
    category: "Timepieces",
    image: "rolex.jpg",
  },
  {
    name: "Cartier",
    category: "Fine Jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Hermes",
    category: "Luxury Goods",
    image: "hermes.jpg",
  },
  {
    name: "Louis Vuitton",
    category: "Fashion House",
    image: "lv.jpg",
  },
]

interface BrandCardProps {
  brand: typeof featuredBrands[0]
  index: number
  isInView: boolean
}

function BrandCard({ brand, index, isInView }: BrandCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

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
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer group"
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{
            x: isHovered ? "100%" : "-100%",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />

        {/* Glow Border */}
        <motion.div
          className="absolute -inset-[1px] rounded-xl z-0"
          animate={{
            boxShadow: isHovered
              ? "0 0 30px rgba(212,175,85,0.5), inset 0 0 30px rgba(212,175,85,0.1)"
              : "0 0 0 rgba(212,175,85,0)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Background Image */}
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          className="object-cover transition-all duration-700"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            filter: isHovered ? "brightness(0.7)" : "brightness(1)",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <motion.div
            className="self-end p-2 glass rounded-full"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
              boxShadow: isHovered ? "0 0 20px rgba(212,175,85,0.4)" : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={18} className="text-primary" />
          </motion.div>

          <motion.div
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="text-[10px] tracking-[0.3em] uppercase text-primary"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {brand.category}
            </motion.span>
            <h3 className="font-serif text-xl text-foreground mt-1">
              {brand.name}
            </h3>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function BoutiquesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section
      id="boutiques"
      ref={containerRef}
      className="relative py-32 px-6 lg:px-8 bg-secondary/30 overflow-hidden"
    >
      {/* Animated Background Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{ top: `${20 + i * 20}%` }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
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
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-20"
        >
          <div>
            <motion.span
              className="inline-block text-xs tracking-[0.3em] uppercase text-primary mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Luxury Boutiques
            </motion.span>
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-foreground max-w-2xl leading-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Home to the world&apos;s
              </motion.span>
              <motion.span
                className="block italic text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                finest names
              </motion.span>
            </h2>
          </div>
          <motion.p
            className="mt-6 md:mt-0 text-muted-foreground max-w-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Experience unparalleled shopping with the largest collection of
            luxury brands under one roof.
          </motion.p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredBrands.map((brand, index) => (
            <BrandCard
              key={brand.name}
              brand={brand}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex justify-center"
        >
          <motion.a
            href="#"
            className="glass px-8 py-4 rounded-full text-sm tracking-wide text-foreground hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2 border border-white/10 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(212,175,85,0.3)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore All 1,200+ Boutiques
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
