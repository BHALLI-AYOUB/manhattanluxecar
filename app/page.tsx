import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BrandsSection from "@/components/brands-section"
import AboutSection from "@/components/about-section"
import OfferCTASection from "@/components/offer-cta-section"
import FleetSection from "@/components/fleet-section"
import WhyChooseSection from "@/components/why-choose-section"
import TestimonialsSection from "@/components/testimonials-section"
import ServiceZonesSection from "@/components/service-zones-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Chatbot from "@/components/chatbot"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BrandsSection />
      <AboutSection />
      <OfferCTASection />
      <FleetSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <ServiceZonesSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
      <Chatbot />
    </main>
  )
}
