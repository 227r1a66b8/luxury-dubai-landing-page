"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, MapPin, Clock, Ticket, ArrowRight } from "lucide-react"
import { useEffect } from "react"
import Image from "next/image"

interface ExperienceData {
  title: string
  subtitle: string
  description: string
  image: string
  stats: string
  details?: {
    location?: string
    hours?: string
    price?: string
    features?: string[]
  }
}

interface ExperienceModalProps {
  isOpen: boolean
  onClose: () => void
  experience: ExperienceData | null
}

export function ExperienceModal({ isOpen, onClose, experience }: ExperienceModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!experience) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-6"
          onClick={onClose}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Ripple Effects */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-primary/10"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2 + i * 0.5, opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeOut",
                }}
                style={{
                  left: "50%",
                  top: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                  width: "100vmin",
                  height: "100vmin",
                }}
              />
            ))}
          </motion.div>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-8 right-8 p-4 glass rounded-full text-foreground hover:bg-white/10 transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </motion.button>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl max-h-[85vh] overflow-auto glass-strong rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Image */}
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              {/* Floating Stats Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 left-6 glass px-6 py-3 rounded-full"
              >
                <span className="text-primary font-medium">{experience.stats}</span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-xs tracking-[0.3em] uppercase text-primary mb-2 block">
                  {experience.subtitle}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                  {experience.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-8">
                  {experience.description}
                </p>
              </motion.div>

              {/* Info Grid */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              >
                <div className="glass p-4 rounded-xl flex items-center gap-3">
                  <MapPin size={20} className="text-primary" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Location</span>
                    <span className="text-sm text-foreground">Ground Floor, Dubai Mall</span>
                  </div>
                </div>
                <div className="glass p-4 rounded-xl flex items-center gap-3">
                  <Clock size={20} className="text-primary" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Hours</span>
                    <span className="text-sm text-foreground">10:00 AM - 12:00 AM</span>
                  </div>
                </div>
                <div className="glass p-4 rounded-xl flex items-center gap-3">
                  <Ticket size={20} className="text-primary" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Starting From</span>
                    <span className="text-sm text-foreground">AED 150</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                  Book Now
                  <ArrowRight size={16} />
                </button>
                <button className="px-8 py-4 glass rounded-full text-sm text-foreground hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
