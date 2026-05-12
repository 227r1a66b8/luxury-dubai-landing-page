"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Building2, Megaphone, Briefcase, TrendingUp, Users, Globe, ArrowRight } from "lucide-react"

const businessServices = [
  {
    icon: Building2,
    title: "Retail Leasing",
    description: "Premium retail spaces in the world's most visited destination",
    stats: "1,200+ retail spaces",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Megaphone,
    title: "Sponsorship",
    description: "Partner with Dubai Mall for unparalleled brand visibility",
    stats: "100M+ annual footfall",
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
  {
    icon: Briefcase,
    title: "Business Opportunities",
    description: "Join the ecosystem of the world's leading retail destination",
    stats: "500+ brand partners",
    gradient: "from-amber-500/20 to-amber-600/20",
  },
]

const stats = [
  { value: 100, suffix: "M+", label: "Annual Visitors", icon: Users },
  { value: 1200, suffix: "+", label: "Retail Partners", icon: Building2 },
  { value: 50, suffix: "+", label: "Countries Represented", icon: Globe },
  { value: 12, suffix: "B+", label: "Annual Revenue (AED)", icon: TrendingUp },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="font-serif text-4xl md:text-5xl text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

interface ServiceCardProps {
  service: typeof businessServices[0]
  index: number
  isInView: boolean
}

function ServiceCard({ service, index, isInView }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <motion.div
        className="relative glass rounded-2xl p-8 h-full cursor-pointer overflow-hidden border"
        initial={{ borderColor: "rgba(255,255,255,0.08)" }}
        animate={{
          borderColor: isHovered ? "rgba(212,175,85,0.3)" : "rgba(255,255,255,0.08)",
          boxShadow: isHovered
            ? "0 0 40px rgba(212,175,85,0.2), inset 0 0 40px rgba(212,175,85,0.05)"
            : "0 0 0 rgba(212,175,85,0)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0`}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="w-14 h-14 rounded-xl glass flex items-center justify-center mb-6"
            animate={{
              boxShadow: isHovered ? "0 0 30px rgba(212,175,85,0.4)" : "none",
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon size={28} className="text-primary" />
          </motion.div>

          {/* Content */}
          <motion.h3
            className="font-serif text-2xl text-foreground mb-3"
            animate={{ y: isHovered ? -5 : 0 }}
          >
            {service.title}
          </motion.h3>
          <motion.p
            className="text-muted-foreground text-sm mb-4 leading-relaxed"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ delay: 0.05 }}
          >
            {service.description}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="text-xs tracking-[0.2em] uppercase text-primary"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ delay: 0.1 }}
          >
            {service.stats}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-6 flex items-center gap-2 text-sm text-foreground"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
          >
            <span>Learn More</span>
            <ArrowRight size={14} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function BusinessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section
      id="business"
      ref={containerRef}
      className="relative py-32 px-6 lg:px-8 bg-secondary/30 overflow-hidden"
    >
      {/* Floating Charts Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 border border-primary/10 rounded-2xl"
            style={{
              left: `${10 + i * 30}%`,
              top: `${20 + i * 15}%`,
              rotate: `${-10 + i * 10}deg`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [`${-10 + i * 10}deg`, `${-5 + i * 10}deg`, `${-10 + i * 10}deg`],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
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
            Business
          </motion.span>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Partner with
            </motion.span>
            <motion.span
              className="block italic text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              the world&apos;s best
            </motion.span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="glass rounded-2xl p-6 text-center relative overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div
                  className="relative z-10"
                  whileHover={{ y: -5 }}
                >
                  <Icon size={24} className="text-primary/50 mx-auto mb-4" />
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {businessServices.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-[0_0_40px_rgba(212,175,85,0.4)]"
            whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(212,175,85,0.6)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Briefcase size={18} />
            Explore Business Opportunities
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
