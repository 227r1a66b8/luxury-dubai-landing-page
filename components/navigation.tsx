"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, MapPin, Clock, Phone } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { name: "Explore", href: "#explore" },
  { name: "Boutiques", href: "#boutiques" },
  { name: "Experiences", href: "#experiences" },
  { name: "Dining", href: "#dining" },
  { name: "Events", href: "#events" },
  { name: "Business", href: "#business" },
]

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="relative px-5 py-2 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.span
        className="absolute inset-0 rounded-full bg-white/5"
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px rgba(212,175,85,0.3), inset 0 0 20px rgba(212,175,85,0.1)"
            : "0 0 0 rgba(212,175,85,0)",
        }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-3" : "py-6"
          }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.nav
            className={`flex items-center justify-between rounded-2xl transition-all duration-500 ${isScrolled ? "glass-strong px-6 py-3 shadow-[0_0_40px_rgba(0,0,0,0.3)]" : ""
              }`}
            animate={{
              boxShadow: isScrolled
                ? "0 0 40px rgba(0,0,0,0.3), inset 0 0 60px rgba(255,255,255,0.03)"
                : "none",
            }}
          >
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-start group"
              >
                <span className="font-serif text-2xl font-light tracking-[0.2em] text-foreground group-hover:text-primary transition-colors duration-300">
                  DUBAI
                </span>
                <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
                  Mall
                </span>
                <motion.span
                  className="absolute -inset-4 rounded-lg"
                  initial={false}
                  whileHover={{
                    boxShadow: "0 0 30px rgba(212,175,85,0.2)",
                  }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <div className="glass rounded-full px-2 py-2 flex items-center gap-1 border border-white/5 shadow-[inset_0_0_30px_rgba(255,255,255,0.03)]">
                {navLinks.map((link) => (
                  <NavLink key={link.name} href={link.href}>
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="#plan-visit"
                  className="glass px-6 py-3 rounded-full text-sm tracking-wide text-foreground hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(212,175,85,0.2)]"
                >
                  Plan Your Visit
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 p-3 glass rounded-full text-foreground hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </motion.nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl lg:hidden"
          >
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-96 h-96 rounded-full bg-primary/5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 2, opacity: 0.3 }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 20}%`,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative flex flex-col justify-center items-center h-full px-6"
            >
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-serif text-4xl font-light tracking-wide text-foreground hover:text-primary transition-colors relative group"
                    >
                      {link.name}
                      <motion.span
                        className="absolute -bottom-2 left-0 h-[2px] bg-primary"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-16 flex flex-col items-center gap-4 text-muted-foreground text-sm"
              >
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" />
                  <span>Open Daily 10AM - 12AM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  <span>Downtown Dubai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-primary" />
                  <span>+971 4 XXX XXXX</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
