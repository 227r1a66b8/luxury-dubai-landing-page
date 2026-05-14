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
  { name: "Sponsorship", href: "#sponsorship" },
  { name: "Leasing", href: "#leasing" },
  { name: "Infrastructure", href: "#infrastructure" },
  { name: "Business", href: "#business" },
]

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="relative px-5 py-2 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-full"
    >
      {children}
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
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-3" : "py-6"
          }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.nav className="flex items-center justify-between gap-6">

            {/* Logo */}
            <Link href="/" className="relative z-10 shrink-0">
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
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="glass rounded-full px-3 py-2 flex items-center gap-1 border border-white/10">
                {navLinks.map((link) => (
                  <NavLink key={link.name} href={link.href}>
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="hidden lg:flex shrink-0">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="#plan-visit"
                  className="glass px-6 py-3 rounded-full text-sm tracking-wide text-foreground hover:bg-white/10 transition-all duration-300 border border-white/10 whitespace-nowrap"
                >
                  Plan Your Visit
                </Link>
              </motion.div>
            </div>

            {/* Mobile Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 p-3 glass rounded-full text-foreground"
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-4xl text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="mt-10 flex flex-col items-center gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>Open Daily 10AM - 12AM</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>Downtown Dubai</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>+971 4 XXX XXXX</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}