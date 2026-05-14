"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Calendar, ArrowRight, Clock } from "lucide-react"
import Image from "next/image"

const events = [
  {
    title: "Dubai Shopping Festival",
    date: "Dec 15 - Jan 29",
    category: "Festival",
    description: "The world's largest shopping festival with incredible deals and entertainment.",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=800&q=80",
    countdown: { days: 45, hours: 12, minutes: 30 },
  },
  {
    title: "Fashion Forward",
    date: "Feb 10 - 13",
    category: "Fashion Week",
    description: "Middle East's leading fashion event showcasing regional and international designers.",
    image: "https://images.pexels.com/photos/2907034/pexels-photo-2907034.jpeg",
    countdown: { days: 92, hours: 8, minutes: 15 },
  },
  {
    title: "Art Dubai",
    date: "Mar 1 - 5",
    category: "Art Fair",
    description: "The leading international art fair in the Middle East, Africa and South Asia.",
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?auto=format&fit=crop&w=800&q=80",
    countdown: { days: 120, hours: 3, minutes: 45 },
  },
]

function CountdownTimer({ days, hours, minutes }: { days: number; hours: number; minutes: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <motion.span
          className="text-2xl font-serif text-primary"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {days}
        </motion.span>
        <span className="text-xs text-muted-foreground">days</span>
      </div>
      <span className="text-muted-foreground">:</span>
      <div className="flex items-center gap-1">
        <span className="text-2xl font-serif text-primary">{hours}</span>
        <span className="text-xs text-muted-foreground">hrs</span>
      </div>
      <span className="text-muted-foreground">:</span>
      <div className="flex items-center gap-1">
        <span className="text-2xl font-serif text-primary">{minutes}</span>
        <span className="text-xs text-muted-foreground">min</span>
      </div>
    </div>
  )
}

interface EventCardProps {
  event: typeof events[0]
  index: number
  isInView: boolean
  isExpanded: boolean
  onHover: () => void
  onLeave: () => void
}

function EventCard({ event, index, isInView, isExpanded, onHover, onLeave }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border"
        initial={{ borderColor: "rgba(255,255,255,0.08)" }}
        animate={{
          borderColor: isExpanded ? "rgba(212,175,85,0.3)" : "rgba(255,255,255,0.08)",
          boxShadow: isExpanded
            ? "0 0 40px rgba(212,175,85,0.2), inset 0 0 40px rgba(212,175,85,0.05)"
            : "0 0 0 rgba(212,175,85,0)",
        }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-80 overflow-hidden">
            <motion.div
              className="aspect-video md:aspect-auto md:h-full"
              animate={{ height: isExpanded ? "auto" : "100%" }}
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700"
                style={{ transform: isExpanded ? "scale(1.1)" : "scale(1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent md:bg-gradient-to-t" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-3">
              <motion.span
                className="text-xs tracking-[0.2em] uppercase text-primary px-3 py-1 glass rounded-full"
                animate={{ scale: isExpanded ? 1.05 : 1 }}
              >
                {event.category}
              </motion.span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar size={12} />
                {event.date}
              </span>
            </div>

            <motion.h3
              className="font-serif text-2xl md:text-3xl text-foreground mb-2"
              animate={{ y: isExpanded ? -5 : 0 }}
            >
              {event.title}
            </motion.h3>

            <motion.p
              className="text-muted-foreground text-sm max-w-lg mb-4"
              initial={false}
              animate={{
                opacity: isExpanded ? 1 : 0.7,
                height: isExpanded ? "auto" : "1.5em",
              }}
              style={{ overflow: "hidden" }}
            >
              {event.description}
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
                marginTop: isExpanded ? 16 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Clock size={12} className="text-primary" />
                <span>Starts in</span>
              </div>
              <CountdownTimer {...event.countdown} />
            </motion.div>

            {/* CTA */}
            <motion.div
              className="mt-4 flex items-center gap-2 text-sm text-primary"
              animate={{ x: isExpanded ? 10 : 0 }}
            >
              <span>Learn More</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [email, setEmail] = useState("")

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative py-32 px-6 lg:px-8 bg-background overflow-hidden"
    >


      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <motion.span
              className="inline-block text-xs tracking-[0.3em] uppercase text-primary mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Events
            </motion.span>
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-foreground max-w-2xl leading-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Where moments
              </motion.span>
              <motion.span
                className="block italic text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                become memories
              </motion.span>
            </h2>
          </div>
          <motion.a
            href="#"
            className="mt-6 md:mt-0 glass px-6 py-3 rounded-full text-sm tracking-wide text-foreground hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2 border border-white/10 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(212,175,85,0.2)]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Calendar size={16} />
            View Calendar
          </motion.a>
        </motion.div>

        {/* Events List */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <EventCard
              key={event.title}
              event={event}
              index={index}
              isInView={isInView}
              isExpanded={expandedIndex === index}
              onHover={() => setExpandedIndex(index)}
              onLeave={() => setExpandedIndex(null)}
            />
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative"
        >
          {/* Glow Background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-xl" />

          <div className="relative glass-strong rounded-3xl p-8 md:p-12 text-center border border-primary/10">
            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/40"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            <motion.h3
              className="font-serif text-2xl md:text-3xl text-foreground mb-3"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
            >
              Stay in the know
            </motion.h3>
            <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
              Subscribe to receive updates on exclusive events, new store openings, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-background/50 border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                whileFocus={{ boxShadow: "0 0 20px rgba(212,175,85,0.2)" }}
              />
              <motion.button
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-[0_0_30px_rgba(212,175,85,0.3)]"
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(212,175,85,0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
