"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

type Brand = {
  name: string
  logo: string
  className?: string
}

const brands: Brand[] = [
  {
    name: "Porsche",
    logo: "https://logos-world.net/wp-content/uploads/2021/04/Porsche-Logo.png",
    className: "brightness-110 contrast-110",
  },
  {
    name: "Audi",
    logo: "https://1000logos.net/wp-content/uploads/2018/05/Audi-logo.jpg",
    className: "brightness-110 contrast-125",
  },
  {
    name: "Volkswagen",
    logo: "https://logos-world.net/wp-content/uploads/2021/04/Volkswagen-Logo.png",
    className: "brightness-110 contrast-125",
  },
  {
    name: "BMW",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png",
    className: "brightness-110 contrast-125",
  },
  {
    name: "Mercedes",
    logo: "https://logos-world.net/wp-content/uploads/2020/05/Mercedes-Benz-Logo.png",
    className: "brightness-110 contrast-115",
  },
  {
    name: "Range Rover",
    logo: "https://images.seeklogo.com/logo-png/23/1/range-rover-logo-png_seeklogo-230449.png",
    className: "brightness-110 contrast-125",
  },
  {
    name: "Renault",
    logo: "https://1000logos.net/wp-content/uploads/2021/03/Renault-logo.png",
    className: "invert brightness-110 contrast-125",
  },
  {
    name: "Cupra",
    logo: "https://1000logos.net/wp-content/uploads/2020/06/Cupra-Logo.png",
    className: "invert brightness-125 contrast-125",
  },
  {
    name: "Hyundai",
    logo: "https://1000logos.net/wp-content/uploads/2018/04/Hyundai-Logo.png",
    className: "brightness-110 contrast-125",
  },
]

const brandsPerPage = 6

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

function BrandLogo({ brand }: { brand: Brand }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center px-4 text-center font-serif text-2xl text-white/82">
        {brand.name}
      </div>
    )
  }

  return (
    <img
      src={brand.logo}
      alt={brand.name}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-110 ${brand.className ?? ""}`}
    />
  )
}

export default function BrandsSection() {
  const { ref, inView } = useInView<HTMLElement>(0.14)
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalPages = Math.ceil(brands.length / brandsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [totalPages])

  return (
    <>
      <style>{`
        .brands-reveal {
          opacity: 0;
          transform: translateY(34px);
          transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .brands-reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .brands-title-shimmer {
          background: linear-gradient(90deg, #d4af37 0%, #f5deb0 50%, #d4af37 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: brands-shimmer 3s linear infinite;
        }

        .brands-shell {
          background:
            linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%),
            rgba(10, 10, 10, 0.82);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .brand-card {
          position: relative;
          overflow: hidden;
        }

        .brand-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.16), transparent 55%);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
        }

        .brand-card:hover::before {
          opacity: 1;
        }

        .brand-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.16), transparent);
          transform: translateX(-120%);
          transition: transform 0.7s ease;
          pointer-events: none;
        }

        .brand-card:hover::after {
          transform: translateX(120%);
        }

        @keyframes brands-shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes brands-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .brands-sparkle {
          animation: brands-float 3.2s ease-in-out infinite;
        }
      `}</style>

      <section ref={ref} className="relative overflow-hidden bg-[#030303] py-16 sm:py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(212,175,55,0.12), transparent 26%), radial-gradient(circle at 85% 75%, rgba(212,175,55,0.08), transparent 24%)",
          }}
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <line x1="0" y1="160" x2="260" y2="160" stroke="#D4AF37" strokeWidth="0.4" opacity="0.18" />
          <line x1="1180" y1="760" x2="1440" y2="760" stroke="#D4AF37" strokeWidth="0.4" opacity="0.18" />
          <circle cx="1250" cy="220" r="170" fill="none" stroke="#D4AF37" strokeWidth="0.45" opacity="0.07" />
          <circle cx="160" cy="730" r="120" fill="none" stroke="#D4AF37" strokeWidth="0.45" opacity="0.07" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
          <div className={`brands-reveal mb-12 sm:mb-16 text-center ${inView ? "in" : ""}`}>
            <div className="mb-4 sm:mb-6 flex items-center justify-center gap-3 sm:gap-4">
              <Sparkles className="brands-sparkle h-5 w-5 sm:h-7 sm:w-7 text-[#D4AF37]" />
              <h2 className="font-serif text-3xl font-semibold leading-none text-white sm:text-4xl md:text-5xl lg:text-6xl">
                NOS MARQUES <span className="brands-title-shimmer">PREMIUM</span>
              </h2>
              <Sparkles className="brands-sparkle h-5 w-5 sm:h-7 sm:w-7 text-[#D4AF37]" style={{ animationDelay: "1s" }} />
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <p className="max-w-3xl text-xs italic text-white/52 sm:text-sm md:text-lg">
                Les plus grandes marques automobiles a votre service
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </div>

          <div className={`brands-reveal relative ${inView ? "in" : ""}`} style={{ transitionDelay: "0.12s" }}>
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 z-20 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-gradient-to-r from-[#D4AF37] to-[#f0c75e] text-black shadow-[0_12px_32px_rgba(212,175,55,0.28)] transition-all duration-300 hover:scale-110 md:flex"
              aria-label="Voir les marques precedentes"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={2.8} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 z-20 hidden h-14 w-14 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-gradient-to-r from-[#D4AF37] to-[#f0c75e] text-black shadow-[0_12px_32px_rgba(212,175,55,0.28)] transition-all duration-300 hover:scale-110 md:flex"
              aria-label="Voir les marques suivantes"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={2.8} />
            </button>

            <div className="brands-shell overflow-hidden rounded-[28px] sm:rounded-[34px] p-4 sm:p-6 lg:p-8">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: totalPages }).map((_, slideIndex) => (
                  <div key={slideIndex} className="min-w-full">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                      {brands
                        .slice(slideIndex * brandsPerPage, slideIndex * brandsPerPage + brandsPerPage)
                        .map((brand) => (
                          <div
                            key={brand.name}
                            className="brand-card group relative flex min-h-[120px] items-center justify-center rounded-[22px] sm:rounded-[26px] border border-white/10 bg-gradient-to-b from-zinc-900/90 to-black p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37]/40 hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:min-h-[170px] sm:p-8"
                          >
                            <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-t from-[#D4AF37]/0 via-transparent to-[#D4AF37]/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <div className="relative flex h-16 w-full items-center justify-center sm:h-24">
                              <BrandLogo brand={brand} />
                            </div>
                            <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                                {brand.name}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-center gap-3 md:hidden">
              <button
                type="button"
                onClick={prevSlide}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/12 text-[#D4AF37]"
                aria-label="Voir les marques precedentes"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/12 text-[#D4AF37]"
                aria-label="Voir les marques suivantes"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className={`brands-reveal mt-8 sm:mt-10 flex justify-center gap-3 ${inView ? "in" : ""}`} style={{ transitionDelay: "0.2s" }}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "h-2.5 w-12 bg-gradient-to-r from-[#D4AF37] to-[#f0c75e] shadow-[0_0_22px_rgba(212,175,55,0.45)] sm:h-3 sm:w-16"
                    : "h-2.5 w-2.5 bg-white/18 hover:bg-white/28 sm:h-3 sm:w-3"
                }`}
                aria-label={`Aller a la page ${index + 1}`}
              />
            ))}
          </div>

          <div className={`brands-reveal mt-10 sm:mt-14 flex justify-center ${inView ? "in" : ""}`} style={{ transitionDelay: "0.28s" }}>
            <div className="relative">
              <div className="h-px w-72 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent sm:w-80" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.55)]" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
