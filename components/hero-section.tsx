"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ChevronDown, Play } from "lucide-react"
import { VideoModal } from "./video-modal"
import { MagneticButton } from "./mouse-effects"

function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[200%] w-[2px] bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          style={{
            left: `${15 + i * 18}%`,
            top: "-50%",
            rotate: `${-15 + i * 8}deg`,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

function HeroParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.random() * 80 - 40, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 150])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // Mouse parallax for hero content
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 30, stiffness: 100 }
  const parallaxX = useSpring(mouseX, springConfig)
  const parallaxY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX - innerWidth / 2) / 50
      const y = (clientY - innerHeight / 2) / 50
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Video Background */}
        <motion.div style={{ scale }} className="absolute inset-0">
          {/* Enhanced overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 z-10" />
          
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-dubai-downtown-7847/1080p.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>

        {/* Light Rays */}
        <LightRays />

        {/* Floating Particles */}
        <HeroParticles />

        {/* Glow Effect behind text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full z-15"
          style={{
            background: "radial-gradient(circle, rgba(212,175,85,0.15) 0%, transparent 60%)",
            x: parallaxX,
            y: parallaxY,
          }}
        />

        {/* Content */}
        <motion.div
          style={{ opacity, y: textY, x: parallaxX, y: parallaxY }}
          className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-3 glass rounded-full text-xs tracking-[0.3em] uppercase text-primary border border-primary/20 shadow-[0_0_30px_rgba(212,175,85,0.2)]">
              The World&apos;s Most Visited Destination
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-9xl font-light tracking-tight text-foreground max-w-5xl leading-[0.95] text-balance drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]"
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              The Centre
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="italic text-primary drop-shadow-[0_0_40px_rgba(212,175,85,0.4)]"
            >
              of Now
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-lg md:text-xl text-foreground/80 font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            Over 1,200 retail outlets, 200 dining destinations, and endless
            experiences await in the heart of Dubai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          >
            <MagneticButton>
              <a
                href="#explore"
                className="group px-10 py-5 bg-primary text-primary-foreground rounded-full text-sm tracking-wide font-medium hover:bg-primary/90 transition-all duration-300 shadow-[0_0_40px_rgba(212,175,85,0.4)] hover:shadow-[0_0_60px_rgba(212,175,85,0.6)] inline-block"
              >
                Begin Your Journey
              </a>
            </MagneticButton>
            <MagneticButton>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group flex items-center gap-3 px-10 py-5 glass rounded-full text-sm tracking-wide text-foreground hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-primary/30"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-primary/30 group-hover:shadow-[0_0_20px_rgba(212,175,85,0.5)] transition-all duration-300">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </span>
                Watch Film
              </button>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3 text-foreground/60"
          >
            <span className="text-xs tracking-[0.3em] uppercase">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
            <ChevronDown size={20} className="text-primary" />
          </motion.div>
        </motion.div>

        {/* Side Stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-8"
        >
          {[
            { value: "1,200+", label: "Stores" },
            { value: "200+", label: "Restaurants" },
            { value: "100M+", label: "Annual Visitors" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-right glass-strong px-4 py-3 rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 + index * 0.2 }}
              whileHover={{ x: -5, scale: 1.05 }}
            >
              <div className="font-serif text-2xl text-primary">{stat.value}</div>
              <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>


      </section>

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </>
  )
}
