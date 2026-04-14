"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import WhatsAppButton from "./whatsapp-button"
import { Palette, Sparkles, Star } from "lucide-react"

const vehicles = [
  {
    name: "Renault Clio 5 E-Tech Hybrid 2025",
    category: "Citadine",
    description: "La reference hybride. Economique, moderne et ultra-connectee avec la derniere technologie E-Tech.",
    images: [
      "/renault-clio-5-e-tech-2025-black-front-view-modern.jpg",
      "/renault-clio-5-e-tech-2025-white-side-profile-eleg.jpg",
      "/renault-clio-5-e-tech-2025-grey-rear-quarter-view.jpg",
    ],
    featured: false,
  },
  {
    name: "Dacia Duster Stepway 2025",
    category: "SUV",
    description:
      "Generation III - Le baroudeur moderne. Design audacieux, robuste et economique sur tous les terrains.",
    images: [
      "/dacia-duster-2025-generation-3-black-suv-front-vie.jpg",
      "/dacia-duster-2025-generation-3-green-suv-side-view.jpg",
      "/dacia-duster-2025-generation-3-orange-suv-rear-vie.jpg",
    ],
    featured: false,
  },
  {
    name: "Range Rover Sport 2025",
    category: "SUV Luxe",
    description: "L'elegance britannique ultime. Puissance, confort et prestige reunis dans un SUV d'exception.",
    images: [
      "/range-rover-sport-2025-black-luxury-suv-front-view.jpg",
      "/range-rover-sport-2025-white-luxury-suv-side-profi.jpg",
      "/range-rover-sport-2025-grey-luxury-suv-rear-view-s.jpg",
    ],
    featured: true,
  },
  {
    name: "Range Rover Evoque 2025",
    category: "SUV Compact Luxe",
    description: "Compact et raffine. Le style Range Rover dans un format urbain, parfait pour la ville et l'aventure.",
    images: [
      "/range-rover-evoque-2025-black-compact-luxury-suv-f.jpg",
      "/range-rover-evoque-2025-red-compact-luxury-suv-sid.jpg",
      "/range-rover-evoque-2025-blue-compact-luxury-suv-re.jpg",
    ],
    featured: true,
  },
  {
    name: "Opel Corsa 2025",
    category: "Citadine",
    description: "Design Vizor caracteristique. Citadine allemande moderne, dynamique et technologique.",
    images: [
      "/opel-corsa-2025-black-hatchback-vizor-front-modern.jpg",
      "/opel-corsa-2025-yellow-hatchback-side-view-sporty.jpg",
      "/opel-corsa-2025-blue-rear-view.jpg",
    ],
    featured: false,
  },
  {
    name: "Cupra Leon VZ 2025",
    category: "Sportive",
    description: "Performance et passion. La sportive espagnole avec moteur puissant et design agressif.",
    images: [
      "/cupra-leon-vz-2025-black-sportive-front-view.jpg",
      "/cupra-leon-vz-2025-grey-sportive-side-view.jpg",
      "/cupra-leon-vz-2025-white-sportive-rear-view.jpg",
    ],
    featured: false,
  },
  {
    name: "Cupra Formentor VZ 2025",
    category: "SUV Coupe Sport",
    description: "SUV coupe unique. Design avant-gardiste avec details cuivres signature et performance VZ.",
    images: [
      "/cupra-formentor-vz-2025-black-suv-front-view.jpg",
      "/cupra-formentor-vz-2025-blue-suv-side-view.jpg",
      "/cupra-formentor-vz-2025-grey-suv-rear-view.jpg",
    ],
    featured: false,
  },
  {
    name: "Peugeot 208 2025",
    category: "Citadine",
    description: "Design felin signature. Feux crocs de lion, interieur i-Cockpit et allure sportive.",
    images: [
      "/peugeot-208-2025-black-front-view.jpg",
      "/peugeot-208-2025-red-side-view.jpg",
      "/peugeot-208-2025-white-rear-view.jpg",
    ],
    featured: false,
  },
  {
    name: "Hyundai Elantra N-Line 2025",
    category: "Berline Sport",
    description: "Essential / Luxury / N-Line. Berline au design futuriste avec lignes angulaires distinctives.",
    images: [
      "/hyundai-elantra-nline-2025-black-front-view.jpg",
      "/hyundai-elantra-nline-2025-red-side-view.jpg",
      "/hyundai-elantra-nline-2025-white-rear-view.jpg",
    ],
    featured: false,
  },
  {
    name: "Hyundai Tucson Hybrid 2025",
    category: "SUV",
    description: "Hybrid / N-Line / PHEV. SUV au design parametrique revolutionnaire et technologie avancee.",
    images: [
      "/hyundai-tucson-2025-black-front.jpg",
      "/hyundai-tucson-2025-grey-side.jpg",
      "/hyundai-tucson-2025-white-rear.jpg",
    ],
    featured: false,
  },
  {
    name: "Dacia Sandero Stepway 2025",
    category: "Citadine",
    description: "Best-seller europeen. Rapport qualite-prix imbattable avec style crossover et equipements modernes.",
    images: [
      "/dacia-sandero-2025-black-front.jpg",
      "/dacia-sandero-2025-orange-side.jpg",
      "/dacia-sandero-2025-grey-rear.jpg",
    ],
    featured: false,
  },
  {
    name: "Dacia Logan 2025",
    category: "Berline",
    description: "Berline familiale genereuse. Grand coffre, confort et fiabilite legendaire Dacia.",
    images: [
      "/dacia-logan-2025-black-front.jpg",
      "/dacia-logan-2025-white-side.jpg",
      "/dacia-logan-2025-grey-rear.jpg",
    ],
    featured: false,
  },
  {
    name: "Renault Trafic Combi 2025",
    category: "Van / Minibus",
    description:
      "Transport de groupe premium. Spacieux, confortable et ideal pour les transferts aeroport et voyages en groupe.",
    images: [
      "/renault-trafic-2025-black-front.jpg",
      "/renault-trafic-2025-black-side.jpg",
      "/renault-trafic-2025-black-rear.jpg",
    ],
    featured: false,
  },
  {
    name: "Hyundai Accent 2025",
    category: "Berline",
    description:
      "Berline compacte elegante. Fiabilite legendaire, economie de carburant et confort optimal pour tous vos trajets.",
    images: [
      "/hyundai-accent-2025-black-front.jpg",
      "/hyundai-accent-2025-black-side.jpg",
      "/hyundai-accent-2025-black-rear.jpg",
    ],
    featured: false,
  },
]

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative h-56 md:h-64 overflow-hidden">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image || "/placeholder.svg"}
          alt={`${alt} - Vue ${index + 1}`}
          fill
          className={`object-cover transition-all duration-700 ease-out ${
            index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{ position: "absolute" }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentIndex
                ? "bg-[#D4AF37] w-6 h-2 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                : "bg-white/40 hover:bg-white/60 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function FleetSection() {
  return (
    <section
      id="fleet"
      className="scroll-mt-36 py-24 md:py-32 bg-gradient-to-b from-background via-background to-black/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-semibold tracking-[0.2em] uppercase">
              Notre Flotte Exclusive
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Vehicules <span className="text-[#D4AF37]">Premium</span> 2025
          </h2>

          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Palette className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-medium text-[#D4AF37]">Toutes disponibles en plusieurs couleurs</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="tilt-card group relative bg-gradient-to-b from-zinc-900/80 to-black border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/60 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.25)]"
            >
              {vehicle.featured && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold rounded-full">
                  <Star className="w-3 h-3 fill-current" />
                  Premium
                </div>
              )}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/15 via-transparent to-[#D4AF37]/5" />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </div>

              <ImageCarousel images={vehicle.images} alt={vehicle.name} />

              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1.5 bg-black/70 backdrop-blur-sm text-[#D4AF37] text-xs font-bold rounded-full border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                  {vehicle.category}
                </span>
              </div>

              <div className="p-5 space-y-4 relative z-10">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-1">
                    {vehicle.name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 group-hover:text-zinc-400 transition-colors duration-300">
                    {vehicle.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {["bg-black", "bg-white", "bg-zinc-500", "bg-red-600", "bg-blue-600"].map((color, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full ${color} border-2 border-zinc-800 group-hover:scale-110 group-hover:border-[#D4AF37]/50 transition-all duration-300`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500">+5 couleurs</span>
                </div>

                <WhatsAppButton
                  text="Demander le prix"
                  message={`Bonjour, je souhaite connaitre le prix et la disponibilite de la ${vehicle.name}.`}
                  className="w-full justify-center text-sm py-3 bg-transparent border-2 border-zinc-700 text-foreground hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-all duration-300 rounded-xl font-semibold"
                  variant="outline"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-500 text-sm mb-4">Vous ne trouvez pas ce que vous cherchez ?</p>
          <WhatsAppButton
            text="Contactez-nous pour plus d'options"
            message="Bonjour, je cherche une voiture specifique. Pouvez-vous m'aider ?"
            className="inline-flex px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-[#C9A227] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          />
        </div>
      </div>
    </section>
  )
}
