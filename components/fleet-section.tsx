"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import WhatsAppButton from "./whatsapp-button"
import { Clock3, Palette, ShieldCheck, Sparkles, Star } from "lucide-react"

type Vehicle = {
  name: string
  category: string
  description: string
  images: string[]
  featured: boolean
}

const vehicles: Vehicle[] = [
  {
    name: "Renault Clio 5 E-Tech Hybrid 2025",
    category: "Citadine",
    description: "Hybride moderne, economique et connectee.",
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
    description: "SUV robuste, moderne et pret pour tous les trajets.",
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
    description: "Puissance, confort et prestige dans un SUV signature.",
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
    description: "Le style Range Rover dans un format urbain et raffine.",
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
    description: "Citadine allemande, dynamique et technologique.",
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
    description: "Sportive espagnole au style agressif et nerveux.",
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
    description: "SUV coupe avant-gardiste avec esprit performance.",
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
    description: "Citadine au style felin et a l'allure sportive.",
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
    description: "Berline dynamique au design net et futuriste.",
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
    description: "SUV hybride au design fort et a la techno avancee.",
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
    description: "Best-seller au style crossover et au super rapport qualite-prix.",
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
    description: "Berline familiale confortable avec grand coffre.",
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
    description: "Van spacieux pour groupes, transferts et voyages.",
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
    description: "Berline compacte, elegante et economique.",
    images: [
      "/hyundai-accent-2025-black-front.jpg",
      "/hyundai-accent-2025-black-side.jpg",
      "/hyundai-accent-2025-black-rear.jpg",
    ],
    featured: false,
  },
]

const fleetSignals = [
  "Livraison Maroc",
  "WhatsApp rapide",
  "Modeles recents",
  "Service 24/7",
]

function useInView<T extends HTMLElement>(threshold = 0.16) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function ImageCarousel({
  images,
  alt,
  featured = false,
}: {
  images: string[]
  alt: string
  featured?: boolean
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 2600)

    return () => window.clearInterval(interval)
  }, [images.length])

  return (
    <div className={`relative overflow-hidden ${featured ? "h-72 md:h-80" : "h-60 md:h-64"}`}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image || "/placeholder.svg"}
          alt={`${alt} - Vue ${index + 1}`}
          fill
          className={`object-cover transition-all duration-700 ease-out ${
            index === currentIndex ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
          style={{ position: "absolute" }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />

      <div className="absolute bottom-5 left-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/72">
        <span>{String(currentIndex + 1).padStart(2, "0")}</span>
        <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
        <span>{images.length} vues</span>
      </div>

      <div className="absolute bottom-5 right-5 z-10 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Voir l'image ${index + 1} de ${alt}`}
            className={`rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "h-2 w-7 bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]"
                : "h-2 w-2 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function FleetSection() {
  const { ref, inView } = useInView<HTMLElement>(0.14)
  const totalVehicles = vehicles.length
  const featuredVehicles = vehicles.filter((vehicle) => vehicle.featured).length
  const categories = new Set(vehicles.map((vehicle) => vehicle.category)).size

  return (
    <>
      <style>{`
        .fleet-reveal {
          opacity: 0;
          transform: translateY(34px);
          transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fleet-reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .fleet-divider {
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.15));
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fleet-divider.in {
          width: 92px;
        }

        .fleet-panel {
          background:
            linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(255,255,255,0.03) 100%),
            rgba(12, 12, 12, 0.82);
          border: 1px solid rgba(212,175,55,0.15);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .fleet-card {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%),
            rgba(11, 11, 11, 0.86);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease, background 0.45s ease;
        }

        .fleet-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.16), transparent 56%);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
        }

        .fleet-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 24px;
          right: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent);
          opacity: 0;
          transition: opacity 0.45s ease;
        }

        .fleet-card:hover {
          transform: translateY(-6px);
          border-color: rgba(212,175,55,0.28);
          box-shadow: 0 24px 56px rgba(0,0,0,0.28);
          background:
            linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(255,255,255,0.02) 100%),
            rgba(11, 11, 11, 0.93);
        }

        .fleet-card:hover::before,
        .fleet-card:hover::after {
          opacity: 1;
        }
      `}</style>

      <section
        ref={ref}
        id="fleet"
        className="scroll-mt-36 relative overflow-hidden bg-[#050505] py-24 md:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 12% 18%, rgba(212,175,55,0.12), transparent 30%), radial-gradient(circle at 88% 18%, rgba(255,255,255,0.07), transparent 22%), radial-gradient(circle at 50% 100%, rgba(212,175,55,0.08), transparent 42%)",
          }}
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <line x1="0" y1="170" x2="260" y2="170" stroke="#D4AF37" strokeWidth="0.4" opacity="0.18" />
          <line x1="1180" y1="770" x2="1440" y2="770" stroke="#D4AF37" strokeWidth="0.4" opacity="0.18" />
          <circle cx="1240" cy="200" r="180" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.08" />
          <circle cx="180" cy="760" r="130" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.08" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
          <div className="mb-14 grid items-end gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-6">
              <div className={`fleet-reveal flex items-center gap-3 ${inView ? "in" : ""}`}>
                <span className="h-px w-9 bg-[#D4AF37]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#D4AF37]">
                  Notre Flotte Exclusive
                </span>
              </div>

              <div className={`fleet-reveal space-y-5 ${inView ? "in" : ""}`} style={{ transitionDelay: "0.12s" }}>
                <h2 className="max-w-4xl font-serif text-4xl font-light leading-[1.04] text-white md:text-5xl lg:text-6xl">
                  Decouvrez nos
                  <br />
                  <em className="font-semibold italic text-[#D4AF37]">vehicules premium</em>
                  <br />
                  disponibles en 2025.
                </h2>
                <p className="max-w-2xl text-[15px] leading-7 text-white/55 md:text-base">
                  Des modeles recents, prets pour vos sejours, rendez-vous et transferts.
                </p>
              </div>

              <div className={`fleet-divider ${inView ? "in" : ""}`} style={{ transitionDelay: "0.24s" }} />
            </div>

            <div
              className={`fleet-panel fleet-reveal rounded-[30px] p-6 sm:p-8 ${inView ? "in" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]">
                <Sparkles className="h-4 w-4" />
                <span>Selection Premium</span>
              </div>

              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Modeles", value: `${totalVehicles}+` },
                  { label: "Categories", value: `${categories}` },
                  { label: "Signature", value: `${featuredVehicles}` },
                ].map((item) => (
                  <div key={item.label} className="rounded-[22px] border border-white/10 bg-black/30 px-4 py-4">
                    <div className="mb-2 text-[11px] uppercase tracking-[0.24em] text-[#D4AF37]/82">{item.label}</div>
                    <div className="font-serif text-3xl leading-none text-white">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {fleetSignals.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/25 px-4 py-4 text-sm text-white/66"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {vehicles.map((vehicle, index) => {
              const isFeatured = vehicle.featured

              return (
                <article
                  key={vehicle.name}
                  className={`fleet-card fleet-reveal rounded-[30px] ${isFeatured ? "xl:col-span-2" : ""} ${inView ? "in" : ""}`}
                  style={{ transitionDelay: `${0.22 + index * 0.05}s` }}
                >
                  <div className="relative">
                    {isFeatured && (
                      <div className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-black">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>Selection Signature</span>
                      </div>
                    )}

                    <div className="absolute right-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-black/45 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4AF37]">
                      <Palette className="h-3.5 w-3.5" />
                      <span>{vehicle.category}</span>
                    </div>

                    <ImageCarousel images={vehicle.images} alt={vehicle.name} featured={isFeatured} />
                  </div>

                  <div className="relative z-10 space-y-5 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/24">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <h3
                          className={`font-serif leading-tight text-white transition-colors duration-300 group-hover:text-[#D4AF37] ${
                            isFeatured ? "text-2xl sm:text-[2rem]" : "text-[1.55rem]"
                          }`}
                        >
                          {vehicle.name}
                        </h3>
                      </div>
                    </div>

                    <p
                      className={`text-sm leading-6 text-white/56 sm:text-[15px] ${isFeatured ? "max-w-2xl line-clamp-2 sm:line-clamp-3" : "line-clamp-2"}`}
                    >
                      {vehicle.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/62">
                        Recent
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/62">
                        Livraison
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 rounded-[22px] border border-white/8 bg-black/25 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-1.5">
                          {["bg-black", "bg-white", "bg-zinc-500", "bg-red-600", "bg-blue-600"].map((color, swatchIndex) => (
                            <div
                              key={swatchIndex}
                              className={`h-4 w-4 rounded-full border-2 border-zinc-800 ${color}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-white/38">Multi-couleurs</span>
                      </div>

                      <div className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#D4AF37] sm:flex">
                        <Clock3 className="h-3.5 w-3.5" />
                        <span>24/7</span>
                      </div>
                    </div>

                    <WhatsAppButton
                      text="Demander le prix"
                      message={`Bonjour, je souhaite connaitre le prix et la disponibilite de la ${vehicle.name}.`}
                      variant="outline"
                      className="w-full justify-center rounded-full border-white/12 bg-white/[0.02] px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                    />
                  </div>
                </article>
              )
            })}
          </div>

          <div
            className={`fleet-panel fleet-reveal mt-14 rounded-[32px] p-6 text-center sm:p-8 ${inView ? "in" : ""}`}
            style={{ transitionDelay: "0.36s" }}
          >
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]">
              Besoin d'un modele specifique
            </div>
            <h3 className="mx-auto max-w-3xl font-serif text-3xl font-light leading-tight text-white sm:text-4xl">
              Vous ne trouvez pas encore
              <br />
              la voiture ideale dans cette selection ?
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/58 sm:text-[15px]">
              Dites-nous ce que vous cherchez, on vous propose une option adaptee.
            </p>
            <div className="mt-7 flex justify-center">
              <WhatsAppButton
                size="large"
                text="Contactez-nous pour plus d'options"
                message="Bonjour, je cherche une voiture specifique. Pouvez-vous m'aider ?"
                className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.14em]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
