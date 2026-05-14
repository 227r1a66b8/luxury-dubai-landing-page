"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Twitter, Youtube, Send } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  explore: [
    { name: "Fashion & Luxury", href: "#" },
    { name: "Dining", href: "#" },
    { name: "Entertainment", href: "#" },
    { name: "Services", href: "#" },
    { name: "Events", href: "#" },
  ],
  visit: [
    { name: "Getting Here", href: "#" },
    { name: "Mall Map", href: "#" },
    { name: "Parking", href: "#" },
    { name: "Opening Hours", href: "#" },
    { name: "Accessibility", href: "#" },
  ],
  about: [
    { name: "Our Story", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Sustainability", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [email, setEmail] = useState("")
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)



  return (
    <footer
      id="plan-visit"
      ref={containerRef}
      className="relative bg-secondary/50 border-t border-border overflow-hidden"
    >
      {/* Animated Background Typography */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div
          className="whitespace-nowrap text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <span className="font-serif text-[20vw] font-light tracking-tight text-foreground/[0.03]">
            DUBAI MALL
          </span>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-md">
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                Join our world
              </h3>
              <p className="text-muted-foreground text-sm">
                Be the first to know about exclusive events, new openings, and special offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-background/50 border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all pr-14"
                />
                <motion.button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <Link href="/" className="inline-block mb-6 group">
              <motion.div
                className="flex flex-col items-start"
                whileHover={{ scale: 1.02 }}
              >
                <span className="font-serif text-3xl font-light tracking-[0.2em] text-foreground group-hover:text-primary transition-colors">
                  DUBAI
                </span>
                <span className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
                  Mall
                </span>
              </motion.div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-8">
              The world&apos;s largest shopping and entertainment destination, located in the heart of downtown Dubai.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {[
                { icon: MapPin, text: "Financial Centre Road, Downtown Dubai" },
                { icon: Clock, text: "Open Daily: 10:00 AM - 12:00 AM" },
                { icon: Phone, text: "+971 4 XXX XXXX" },
                { icon: Mail, text: "info@thedubaimall.com" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-3 text-sm text-muted-foreground group cursor-pointer"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <item.icon size={16} className="text-primary group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-foreground transition-colors">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + categoryIndex * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h4 className="text-xs tracking-[0.3em] uppercase text-foreground mb-6">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + categoryIndex * 0.1 + linkIndex * 0.03 }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-block"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-border mt-16 pt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 glass rounded-full text-muted-foreground hover:text-foreground transition-all duration-300 relative"
                  onMouseEnter={() => setHoveredSocial(social.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow:
                        hoveredSocial === social.label
                          ? "0 0 20px rgba(212,175,85,0.5)"
                          : "none",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-4 text-xs text-muted-foreground"
            >
              <span>&copy; 2024 Dubai Mall. All rights reserved.</span>
              <span className="hidden md:inline">-</span>
              <div className="flex items-center gap-4">
                {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((link) => (
                  <motion.a
                    key={link}
                    href="#"
                    className="hover:text-primary transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>


    </footer>
  )
}
