"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Store, MapPin, TrendingUp, Users, ArrowRight, Building2, Zap, Shield } from "lucide-react"
import Image from "next/image"

const leasingZones = [
  {
    name: "Fashion Avenue",
    type: "Luxury Retail",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80",
    availability: "Limited",
    sqft: "500 - 5,000",
    footfall: "15M+",
    description: "Premier destination for haute couture and luxury fashion brands",
  },
  {
    name: "Grand Atrium",
    type: "Flagship Stores",
    image: "grand.jpg",
    availability: "Available",
    sqft: "2,000 - 20,000",
    footfall: "25M+",
    description: "Iconic central location with maximum visibility and foot traffic",
  },
  {
    name: "Souk District",
    type: "Specialty Retail",
    image: "souk.jpg",
    availability: "Available",
    sqft: "200 - 1,500",
    footfall: "12M+",
    description: "Traditional Arabian marketplace atmosphere for artisanal brands",
  },
  {
    name: "Entertainment Zone",
    type: "Experiential",
    image: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=800&q=80",
    availability: "Limited",
    sqft: "1,000 - 10,000",
    footfall: "18M+",
    description: "High-energy spaces for entertainment and experiential concepts",
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: "Unmatched Exposure",
    description: "Access to 100M+ annual visitors from 85+ countries",
  },
  {
    icon: Users,
    title: "Premium Demographics",
    description: "High-net-worth clientele with exceptional purchasing power",
  },
  {
    icon: Shield,
    title: "Full Support",
    description: "Dedicated leasing team and tenant services",
  },
  {
    icon: Zap,
    title: "Smart Infrastructure",
    description: "State-of-the-art facilities and digital integration",
  },
]

interface ZoneCardProps {
  zone: typeof leasingZones[0]
  index: number
  isInView: boolean
}

function ZoneCard({ zone, index, isInView }: ZoneCardProps) {
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
        className="relative overflow-hidden rounded-2xl cursor-pointer group"
      >
        {/* Glow Border */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl z-0"
          animate={{
            boxShadow: isHovered
              ? "0 0 40px rgba(212,175,85,0.4), inset 0 0 40px rgba(212,175,85,0.1)"
              : "0 0 0 rgba(212,175,85,0)",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={zone.image}
            alt={zone.name}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
            animate={{ opacity: isHovered ? 0.95 : 0.85 }}
            transition={{ duration: 0.5 }}
          />

          {/* Availability Badge */}
          <motion.div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs tracking-wide ${zone.availability === "Available"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              }`}
            animate={{ scale: isHovered ? 1.05 : 1 }}
          >
            {zone.availability}
          </motion.div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.span
            className="text-xs tracking-[0.2em] uppercase text-primary mb-2"
            animate={{ y: isHovered ? -5 : 0 }}
          >
            {zone.type}
          </motion.span>
          <motion.h3
            className="font-serif text-2xl text-foreground mb-2"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ delay: 0.02 }}
          >
            {zone.name}
          </motion.h3>

          <motion.p
            className="text-muted-foreground text-sm mb-4 line-clamp-2"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? -5 : 0 }}
            transition={{ delay: 0.04 }}
          >
            {zone.description}
          </motion.p>

          {/* Stats Row */}
          <motion.div
            className="flex items-center gap-4 text-xs"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ delay: 0.06 }}
          >
            <div className="flex items-center gap-1 text-muted-foreground">
              <Store size={12} className="text-primary" />
              <span>{zone.sqft} sqft</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users size={12} className="text-primary" />
              <span>{zone.footfall} footfall</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-sm text-primary"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function LeasingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section
      id="leasing"
      ref={containerRef}
      className="relative py-32 px-6 lg:px-8 bg-secondary/30 overflow-hidden"
    >
      {/* Floating Grid Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            style={{ left: `${(i + 1) * 16.66}%` }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{ top: `${(i + 1) * 25}%` }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.7,
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
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16"
        >
          <div>
            <motion.span
              className="inline-block text-xs tracking-[0.3em] uppercase text-primary mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Leasing
            </motion.span>
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-foreground max-w-2xl leading-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Premium spaces for
              </motion.span>
              <motion.span
                className="block italic text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                exceptional brands
              </motion.span>
            </h2>
          </div>
          <motion.p
            className="mt-6 lg:mt-0 text-muted-foreground text-sm max-w-md leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Join the world&apos;s most prestigious retail address. From flagship stores to boutique spaces, find your perfect location in Dubai Mall.
          </motion.p>
        </motion.div>

        {/* Benefits Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                className="glass rounded-xl p-5 group cursor-pointer"
                whileHover={{ y: -5, borderColor: "rgba(212,175,85,0.3)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Icon size={20} className="text-primary mb-3" />
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {benefit.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {leasingZones.map((zone, index) => (
            <ZoneCard
              key={zone.name}
              zone={zone}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-xl" />

          <div className="relative glass-strong rounded-3xl p-8 md:p-12 border border-primary/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                    <Building2 size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">
                      Ready to join us?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our leasing team is here to help
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm max-w-lg">
                  Get in touch with our dedicated leasing specialists to explore available spaces, discuss your requirements, and secure your premium retail location.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-full text-sm text-foreground hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-primary/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MapPin size={16} />
                  View Floor Plans
                </motion.a>
                <motion.a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-[0_0_30px_rgba(212,175,85,0.3)]"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(212,175,85,0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Leasing
                  <ArrowRight size={16} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
