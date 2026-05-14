"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
  Mic2,
  Lightbulb,
  Volume2,
  Monitor,
  Wifi,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Play,
} from "lucide-react"
import Image from "next/image"

const infrastructureFeatures = [
  {
    icon: Mic2,
    title: "Professional Audio",
    description: "Concert-grade sound systems with acoustic optimization for crystal-clear audio in any venue size",
  },
  {
    icon: Lightbulb,
    title: "Dynamic Lighting",
    description: "Programmable LED systems and theatrical lighting rigs for immersive visual experiences",
  },
  {
    icon: Monitor,
    title: "Digital Displays",
    description: "High-resolution LED walls and interactive screens throughout all event spaces",
  },
  {
    icon: Wifi,
    title: "High-Speed Connectivity",
    description: "Enterprise-grade WiFi and dedicated fiber connections for seamless live streaming",
  },
  {
    icon: ShieldCheck,
    title: "Security Systems",
    description: "Advanced surveillance, access control, and crowd management infrastructure",
  },
  {
    icon: Users,
    title: "Crowd Management",
    description: "Smart flow systems and real-time analytics for optimal guest experiences",
  },
]

const venueSpaces = [
  {
    name: "Grand Atrium Stage",
    capacity: "5,000+",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    type: "Main Stage",
    features: ["360° visibility", "Retractable seating", "Flying system"],
  },
  {
    name: "Fashion Dome",
    capacity: "2,500",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    type: "Fashion Events",
    features: ["Runway infrastructure", "VIP areas", "Backstage facilities"],
  },
  {
    name: "Waterfront Terrace",
    capacity: "3,000",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    type: "Outdoor Events",
    features: ["Fountain backdrop", "Climate control", "Lake views"],
  },
]

const eventStats = [
  { value: "500+", label: "Events Annually" },
  { value: "50K+", label: "Max Capacity" },
  { value: "15+", label: "Venue Spaces" },
  { value: "24/7", label: "Technical Support" },
]

interface VenueCardProps {
  venue: typeof venueSpaces[0]
  index: number
  isInView: boolean
}

function VenueCard({ venue, index, isInView }: VenueCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border"
        animate={{
          borderColor: isHovered ? "rgba(212,175,85,0.4)" : "rgba(255,255,255,0.08)",
          boxShadow: isHovered
            ? "0 0 50px rgba(212,175,85,0.25), inset 0 0 50px rgba(212,175,85,0.05)"
            : "0 0 0 rgba(212,175,85,0)",
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={venue.image}
            alt={venue.name}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

          {/* Play Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="glass-strong p-4 rounded-full shadow-[0_0_30px_rgba(212,175,85,0.3)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={24} fill="currentColor" className="text-primary ml-0.5" />
            </motion.button>
          </motion.div>

          {/* Capacity Badge */}
          <motion.div
            className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs text-primary border border-primary/20"
            animate={{ scale: isHovered ? 1.05 : 1 }}
          >
            {venue.capacity} capacity
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.span
            className="text-xs tracking-[0.2em] uppercase text-primary mb-2 block"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            {venue.type}
          </motion.span>
          <motion.h3
            className="font-serif text-xl text-foreground mb-3"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ delay: 0.02 }}
          >
            {venue.name}
          </motion.h3>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {venue.features.map((feature, i) => (
              <motion.span
                key={feature}
                className="text-xs px-2 py-1 glass rounded-full text-muted-foreground"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ delay: 0.04 + i * 0.02 }}
              >
                {feature}
              </motion.span>
            ))}
          </div>

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
            <span>View Virtual Tour</span>
            <ArrowRight size={14} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function InfrastructureSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section
      id="infrastructure"
      ref={containerRef}
      className="relative py-32 px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Animated Tech Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="techGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techGrid)" />
        </svg>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
              background: `radial-gradient(circle, rgba(212,175,85,${0.05 + i * 0.02}) 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
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
            Event Infrastructure
          </motion.span>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              World-class venues,
            </motion.span>
            <motion.span
              className="block italic text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              cutting-edge technology
            </motion.span>
          </h2>
          <motion.p
            className="mt-6 text-muted-foreground text-base max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            From intimate gatherings to grand spectacles, our state-of-the-art infrastructure transforms every event into an unforgettable experience.
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {eventStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass rounded-xl p-6 text-center group cursor-pointer"
              whileHover={{ y: -5, borderColor: "rgba(212,175,85,0.3)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <motion.span
                className="block font-serif text-3xl md:text-4xl text-primary mb-1"
                whileHover={{ scale: 1.05 }}
              >
                {stat.value}
              </motion.span>
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Infrastructure Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Technical Capabilities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructureFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className="glass rounded-xl p-6 h-full cursor-pointer border border-transparent"
                    whileHover={{
                      borderColor: "rgba(212,175,85,0.3)",
                      boxShadow: "0 0 30px rgba(212,175,85,0.15)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-lg glass flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(212,175,85,0.4)" }}
                    >
                      <Icon size={20} className="text-primary" />
                    </motion.div>
                    <h4 className="text-foreground font-medium mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Venue Spaces */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          >
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                Featured Venues
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground">
                Spaces that inspire
              </h3>
            </div>
            <motion.a
              href="#"
              className="mt-4 md:mt-0 text-sm text-primary flex items-center gap-2 hover:gap-3 transition-all"
              whileHover={{ x: 5 }}
            >
              View All Venues
              <ArrowRight size={14} />
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {venueSpaces.map((venue, index) => (
              <VenueCard
                key={venue.name}
                venue={venue}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-[0_0_40px_rgba(212,175,85,0.4)]"
            whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(212,175,85,0.6)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={18} />
            Plan Your Event
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
