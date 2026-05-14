"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Sparkles, Eye, Globe, Award, ArrowRight, CheckCircle, Star } from "lucide-react"

const sponsorshipTiers = [
  {
    tier: "Platinum",
    icon: Award,
    description: "Premier partnership with maximum visibility and exclusive benefits",
    features: [
      "Prime location branding",
      "Exclusive event hosting rights",
      "VIP lounge access",
      "Custom activation spaces",
      "Digital screen network",
    ],
    highlight: true,
  },
  {
    tier: "Gold",
    icon: Star,
    description: "Strategic visibility with premium positioning and benefits",
    features: [
      "Featured location branding",
      "Event sponsorship priority",
      "Premium advertising slots",
      "Brand experience zones",
    ],
    highlight: false,
  },
  {
    tier: "Silver",
    icon: Sparkles,
    description: "Targeted exposure with valuable touchpoints",
    features: [
      "Select area branding",
      "Digital advertising access",
      "Event participation",
      "Co-marketing opportunities",
    ],
    highlight: false,
  },
]

const brandStats = [
  { value: "100M+", label: "Annual Impressions", icon: Eye },
  { value: "85+", label: "Countries Reached", icon: Globe },
  { value: "500+", label: "Brand Partners", icon: Award },
  { value: "365", label: "Days of Activation", icon: Sparkles },
]

const partnerLogos = [
  "Louis Vuitton", "Gucci", "Chanel", "Dior", "Cartier", "Rolex",
  "Apple", "Samsung", "Nike", "Adidas", "Burberry", "Prada"
]

interface TierCardProps {
  tier: typeof sponsorshipTiers[0]
  index: number
  isInView: boolean
}

function TierCard({ tier, index, isInView }: TierCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = tier.icon

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
      className="relative group h-full"
    >
      {/* Highlight Glow for Platinum */}
      {tier.highlight && (
        <motion.div
          className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40 z-0"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <motion.div
        className={`relative glass rounded-2xl p-8 h-full cursor-pointer overflow-hidden border ${
          tier.highlight ? "border-primary/40" : "border-white/10"
        }`}
        animate={{
          borderColor: isHovered
            ? "rgba(212,175,85,0.5)"
            : tier.highlight
            ? "rgba(212,175,85,0.4)"
            : "rgba(255,255,255,0.1)",
          boxShadow: isHovered
            ? "0 0 50px rgba(212,175,85,0.3), inset 0 0 50px rgba(212,175,85,0.05)"
            : tier.highlight
            ? "0 0 30px rgba(212,175,85,0.2)"
            : "none",
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Background Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0"
          animate={{ opacity: isHovered ? 1 : tier.highlight ? 0.5 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10">
          {/* Icon & Tier */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-14 h-14 rounded-xl glass flex items-center justify-center"
              animate={{
                boxShadow: isHovered ? "0 0 30px rgba(212,175,85,0.5)" : "none",
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Icon size={28} className="text-primary" />
            </motion.div>
            <div>
              <motion.span
                className="text-xs tracking-[0.2em] uppercase text-primary"
                animate={{ y: isHovered ? -2 : 0 }}
              >
                {tier.tier}
              </motion.span>
              <motion.h3
                className="font-serif text-2xl text-foreground"
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ delay: 0.02 }}
              >
                Partnership
              </motion.h3>
            </div>
          </div>

          {/* Description */}
          <motion.p
            className="text-muted-foreground text-sm mb-6 leading-relaxed"
            animate={{ y: isHovered ? -3 : 0 }}
            transition={{ delay: 0.04 }}
          >
            {tier.description}
          </motion.p>

          {/* Features */}
          <ul className="space-y-3">
            {tier.features.map((feature, i) => (
              <motion.li
                key={feature}
                className="flex items-center gap-3 text-sm text-foreground/80"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ delay: 0.05 + i * 0.02 }}
              >
                <CheckCircle size={14} className="text-primary flex-shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.div
            className="mt-8 flex items-center gap-2 text-sm text-primary"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 1 : 0.6, x: isHovered ? 5 : 0 }}
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

export function SponsorshipSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section
      id="sponsorship"
      ref={containerRef}
      className="relative py-32 px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full"
            style={{
              left: `${-10 + i * 25}%`,
              top: `${10 + (i % 3) * 30}%`,
              background: `radial-gradient(circle, rgba(212,175,85,${0.03 + i * 0.01}) 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
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
            Sponsorship
          </motion.span>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Elevate your brand
            </motion.span>
            <motion.span
              className="block italic text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              on the world stage
            </motion.span>
          </h2>
          <motion.p
            className="mt-6 text-muted-foreground text-base max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            Partner with Dubai Mall to reach over 100 million visitors annually and position your brand among the world&apos;s most prestigious names.
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {brandStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="glass rounded-2xl p-6 text-center relative overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative z-10">
                  <Icon size={24} className="text-primary/50 mx-auto mb-3" />
                  <span className="block font-serif text-3xl md:text-4xl text-primary mb-1">
                    {stat.value}
                  </span>
                  <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Sponsorship Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {sponsorshipTiers.map((tier, index) => (
            <TierCard
              key={tier.tier}
              tier={tier}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Partner Brands Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative"
        >
          <div className="text-center mb-8">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Trusted by Leading Brands
            </span>
          </div>

          <div className="relative overflow-hidden py-4">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <motion.div
              className="flex gap-12 whitespace-nowrap"
              animate={{ x: [0, -1200] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <span
                  key={i}
                  className="text-lg font-serif text-muted-foreground/40 hover:text-primary/60 transition-colors duration-300 cursor-default"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-[0_0_40px_rgba(212,175,85,0.4)]"
            whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(212,175,85,0.6)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={18} />
            Become a Partner
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
