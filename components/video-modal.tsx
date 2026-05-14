"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl?: string
}

export function VideoModal({ isOpen, onClose, videoUrl = "https://youtu.be/J7eyLddWUOI?si=oYs8geICno105OCY" }: VideoModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-8 right-8 p-4 glass rounded-full text-foreground hover:bg-white/10 transition-colors z-10"
            aria-label="Close video"
          >
            <X size={24} />
          </motion.button>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[90vw] max-w-6xl aspect-video rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-3xl" />

            <div className="relative w-full h-full glass-strong rounded-2xl overflow-hidden">
              <iframe
                className="w-full h-full rounded-3xl"
                src="https://www.youtube.com/embed/J7eyLddWUOI?autoplay=1"
                title="Dubai Mall Experience"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-12 text-center"
          >
            <h3 className="font-serif text-2xl text-foreground mb-2">The Dubai Mall Experience</h3>
            <p className="text-muted-foreground text-sm">Where Dreams Come to Life</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
