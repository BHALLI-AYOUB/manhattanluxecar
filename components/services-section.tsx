"use client"

import { useEffect, useRef, useState } from "react"
import { Car, Plane, Clock, MapPin, MessageCircle } from "lucide-react"

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); observer.disconnect() }
    }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

const services = [
  {
    icon: Car,
    num: "01",
    title: "Voitures de luxe & sport",
    description: "Une flotte exclusive de véhicules premium sélectionnés pour toutes vos occasions d'exception.",
    featured: true,
  },
  {
    icon: Plane,
    num: "02",
    title: "Service chauffeur aéroport",
    description: "Accueil VIP et transferts aéroport dans le confort absolu, à l'heure.",
    featured: false,
  },
  {
    icon: Clock,
    num: "03",
    title: "Disponible 24/7",
    description: "Un service à votre entière disposition, jour et nuit, 365 jours par an.",
    featured: false,
  },
  {
    icon: MapPin,
    num: "04",
    title: "Casablanca & El Jadida",
    description: "Présence stratégique dans les principales villes du Maroc pour vous servir au mieux.",
    featured: false,
  },
  {
    icon: MessageCircle,
    num: "05",
    title: "Réservation rapide via WhatsApp",
    description: "Réservez en quelques clics via notre ligne WhatsApp dédiée. Réponse garantie sous 5 minutes.",
    featured: false,
  },
]

export default function ServicesSection() {
  const [ref, inView] = useInView()
  const [hovered, setHovered] = useState(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .svc-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.4,0,0.2,1), transform 0.85s cubic-bezier(0.4,0,0.2,1);
        }
        .svc-reveal.in { opacity: 1; transform: none; }

        .svc-card {
          position: relative;
          overflow: hidden;
          border-radius: 2px;
          transition: all 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .svc-card-inner {
          position: relative;
          z-index: 2;
          padding: 2.5rem;
          height: 100%;
        }
        .svc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.08) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.45s ease;
          z-index: 1;
        }
        .svc-card:hover::before { opacity: 1; }

        .svc-icon-ring {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(212,175,55,0.07);
          border: 0.5px solid rgba(212,175,55,0.2);
          transition: all 0.4s ease;
          flex-shrink: 0;
        }
        .svc-card:hover .svc-icon-ring {
          background: rgba(212,175,55,0.15);
          border-color: rgba(212,175,55,0.5);
        }

        .svc-num {
          transition: color 0.4s ease;
        }
        .svc-card:hover .svc-num { color: rgba(212,175,55,0.15) !important; }

        .svc-arrow {
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.35s ease;
        }
        .svc-card:hover .svc-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <section
        ref={ref}
        id="services"
        className="relative overflow-hidden"
        style={{ background: '#080808', fontFamily: "'Jost', sans-serif" }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-24 lg:py-32">
          {/* Header */}
          <div className={`svc-reveal ${inView ? 'in' : ''} mb-20`}>
            <div className="flex items-center gap-3 mb-6">
              <span style={{ display: 'inline-block', width: '36px', height: '0.5px', background: '#D4AF37' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.35em', color: '#D4AF37', fontWeight: 500, textTransform: 'uppercase' }}>
                Nos Services
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                fontWeight: 300,
                color: '#fff',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                maxWidth: '540px',
              }}>
                Une Expérience{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 600, color: '#D4AF37' }}>Sur Mesure</em>
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', fontWeight: 300, maxWidth: '280px', lineHeight: 1.8 }}>
                Chaque service est conçu pour dépasser vos attentes.
              </p>
            </div>
          </div>

          {/* Services layout — featured + grid */}
          <div className="space-y-4">
            {/* Featured card — full width */}
            <div
              className={`svc-reveal svc-card ${inView ? 'in' : ''}`}
              style={{
                background: 'rgba(212,175,55,0.04)',
                border: '0.5px solid rgba(212,175,55,0.2)',
                transitionDelay: '0.1s',
              }}
            >
              <div className="svc-card-inner flex flex-col md:flex-row md:items-center gap-6">
                <div className="svc-icon-ring" style={{ width: '64px', height: '64px', background: 'rgba(212,175,55,0.1)' }}>
                  <Car style={{ width: '26px', height: '26px', color: '#D4AF37', strokeWidth: 1.5 }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="svc-num"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: 'rgba(212,175,55,0.35)', fontWeight: 400 }}
                    >
                      01
                    </span>
                    <span style={{ width: '20px', height: '0.5px', background: 'rgba(212,175,55,0.3)', display: 'inline-block' }} />
                    <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 500 }}>
                      Service Phare
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: '8px',
                  }}>
                    Voitures de luxe &amp; sport
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.8, maxWidth: '600px' }}>
                    Une flotte exclusive de véhicules premium sélectionnés pour toutes vos occasions d'exception.
                    Des berlines de représentation aux supercars — votre choix, notre passion.
                  </p>
                </div>
                <div className="svc-arrow hidden md:block">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" style={{ width: '32px', height: '32px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 4 standard cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.slice(1).map((service, i) => (
                <div
                  key={i}
                  className={`svc-reveal svc-card ${inView ? 'in' : ''}`}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '0.5px solid rgba(255,255,255,0.06)',
                    transitionDelay: `${0.2 + i * 0.1}s`,
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="svc-card-inner flex flex-col gap-5" style={{ minHeight: '220px' }}>
                    {/* Top row: num + icon */}
                    <div className="flex items-start justify-between">
                      <span
                        className="svc-num"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '42px',
                          fontWeight: 700,
                          color: 'rgba(255,255,255,0.05)',
                          lineHeight: 1,
                        }}
                      >
                        {service.num}
                      </span>
                      <div className="svc-icon-ring">
                        <service.icon style={{ width: '20px', height: '20px', color: '#D4AF37', strokeWidth: 1.5 }} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: '#fff',
                        marginBottom: '8px',
                        lineHeight: 1.3,
                      }}>
                        {service.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 300, lineHeight: 1.7 }}>
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div style={{
                      height: '1px',
                      background: `linear-gradient(to right, #D4AF37, transparent)`,
                      transform: hovered === i ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}