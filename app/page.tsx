import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Facebook, Mail, Music2, ChevronRight, Star, Shield, Clock, Award } from "lucide-react"

export default function LuxuryCarRentalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-xl font-bold text-balance">Manhattan Luxe Car</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#fleet" className="text-muted-foreground hover:text-foreground transition-colors">
                Fleet
              </a>
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">Book Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
                Premium Luxury Rentals
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance animate-fade-in-up">
              Experience Luxury
              <span className="block text-primary">On Every Drive</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
              Elevate your journey with Manhattan's finest collection of luxury vehicles. Uncompromising elegance,
              performance, and service.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 h-14 group"
              >
                Explore Fleet
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-card font-semibold text-lg px-8 h-14 bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        {/* Luxury Car Image */}
        <div className="container mx-auto mt-16 relative">
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
            <img src="/luxury-sports-car-front-view-in-dark-garage-with-d.jpg" alt="Luxury sports car" className="w-full h-[600px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Star,
                title: "Premium Fleet",
                description: "Latest luxury vehicles from top manufacturers",
              },
              {
                icon: Shield,
                title: "Full Insurance",
                description: "Comprehensive coverage for peace of mind",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock assistance whenever you need",
              },
              {
                icon: Award,
                title: "Best Rates",
                description: "Competitive pricing on premium vehicles",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section id="fleet" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Exclusive Fleet</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose from our curated collection of the world's most prestigious automobiles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Luxury Sedan", price: "$299", image: "luxury sedan side view on city street at night" },
              { name: "Sports Coupe", price: "$499", image: "red sports coupe front angle in modern showroom" },
              { name: "SUV Premium", price: "$399", image: "black luxury SUV in urban setting" },
              { name: "Convertible", price: "$549", image: "white convertible luxury car top down" },
              { name: "Executive Sedan", price: "$349", image: "silver executive sedan in corporate setting" },
              { name: "Super Sports", price: "$799", image: "yellow supercar on scenic road" },
            ].map((car, index) => (
              <Card
                key={index}
                className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`/.jpg?height=300&width=400&query=${car.image}`}
                    alt={car.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    From {car.price}/day
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{car.name}</h3>
                  <p className="text-muted-foreground mb-4">Premium features • Latest model • Full service</p>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                    Reserve Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-r from-card via-primary/5 to-card">
            <div className="absolute inset-0 animate-shimmer" />
            <div className="relative p-12 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Experience Luxury?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Book your dream car today and enjoy an unforgettable driving experience
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-12 h-14"
              >
                Get Started
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">M</span>
                </div>
                <span className="text-xl font-bold">Manhattan Luxe Car</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                New York's premier luxury car rental service. Experience excellence on every journey.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#fleet" className="text-muted-foreground hover:text-primary transition-colors">
                    Our Fleet
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61584072572803"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary hover:bg-primary flex items-center justify-center transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
                <a
                  href="https://www.tiktok.com/@manhattan_luxecar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary hover:bg-primary flex items-center justify-center transition-all duration-300 group"
                  aria-label="TikTok"
                >
                  <Music2 className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
                <a
                  href="mailto:manhattanluxecar@outlook.com"
                  className="w-12 h-12 rounded-full bg-secondary hover:bg-primary flex items-center justify-center transition-all duration-300 group"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
              </div>
              <div className="mt-6">
                <a
                  href="mailto:manhattanluxecar@outlook.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  manhattanluxecar@outlook.com
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-muted-foreground">
            <p>© 2025 Manhattan Luxe Car. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
