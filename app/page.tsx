import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { StorySection } from '@/components/story-section'
import { ServicesSection } from '@/components/services-section'
import { PortfolioSection } from '@/components/portfolio-section'
import PublicationsSection from '@/components/publications-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'
import FloatingBackground from '@/components/floating-background'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <FloatingBackground />
      <Navbar />
      <HeroSection />
      <StorySection />
      <ServicesSection />
      <PortfolioSection />
      <PublicationsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
