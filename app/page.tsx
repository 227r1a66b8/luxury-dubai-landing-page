import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ExploreSection } from "@/components/explore-section"
import { BoutiquesSection } from "@/components/boutiques-section"
import { ExperiencesSection } from "@/components/experiences-section"
import { DiningSection } from "@/components/dining-section"
import { EventsSection } from "@/components/events-section"
import { BusinessSection } from "@/components/business-section"
import { SponsorshipSection } from "@/components/sponsorship-section"
import { LeasingSection } from "@/components/leasing-section"
import { InfrastructureSection } from "@/components/infrastructure-section"
import { Footer } from "@/components/footer"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { MouseGlow, FloatingParticles } from "@/components/mouse-effects"

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <main className="relative">
        {/* Global Mouse Effects */}
        <MouseGlow />
        <FloatingParticles />

        {/* Navigation */}
        <Navigation />

        {/* Sections */}
        <HeroSection />
        <ExploreSection />
        <BoutiquesSection />
        <ExperiencesSection />
        <DiningSection />
        <EventsSection />
        <SponsorshipSection />
        <LeasingSection />
        <InfrastructureSection />
        <BusinessSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  )
}
