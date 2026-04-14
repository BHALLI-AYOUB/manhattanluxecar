"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Plane, Truck } from "lucide-react"

function useInView(threshold = 0.15) {
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

const zones = [
  {
    icon: MapPin,
    name: "Casablanca",
    description: "Siège principal et livraison dans toute la ville",
    index: "01",
  },
  {
    icon: MapPin,
    name: "El Jadida",
    description: "Service disponible et livraison rapide",
    index: "02",
  },
  {
    icon: Plane,
    name: "Aéroport Mohammed V",
    description: "Accueil VIP et remise de véhicule",
    index: "03",
  },
  {
    icon: Truck,
    name: "Partout au Maroc",
    description: "Livraison nationale selon la durée de location",
    index: "04",
  },
]

export default function ServiceZonesSection() {
  const [ref, inView] = useInView()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .zone-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
        }
        .zone-reveal.in { opacity: 1; transform: none; }

        .zone-card {
          position: relative;
          background: rgba(255,255,255,0.02);
          border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
          transition: all 0.45s cubic-bezier(0.4,0,0.2,1);
          cursor: default;
        }
        .zone-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(to right, #D4AF37, rgba(212,175,55,0.3));
          transition: width 0.5s ease;
        }
        .zone-card:hover::after { width: 100%; }
        .zone-card:hover {
          background: rgba(212,175,55,0.05);
          border-color: rgba(212,175,55,0.2);
          transform: translateY(-6px);
        }
        .zone-card:hover .zone-icon-wrap {
          background: rgba(212,175,55,0.15);
          border-color: rgba(212,175,55,0.4);
        }
        .zone-card:hover .zone-index {
          color: rgba(212,175,55,0.25);
        }

        .zone-icon-wrap {
          background: rgba(212,175,55,0.06);
          border: 0.5px solid rgba(212,175,55,0.15);
          border-radius: 50%;
          transition: all 0.4s ease;
        }

        .zone-pulse {
          animation: zone-pulse-ring 2.5s ease-out infinite;
        }
        @keyframes zone-pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>

      <section
        ref={ref}
        className="relative overflow-hidden"
        style={{ background: '#0d0d0d', fontFamily: "'Jost', sans-serif" }}
      >
        {/* Top border accent */}
        <div style={{ height: '0.5px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)' }} />

        {/* Background geometry */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="zone-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="600" cy="300" rx="700" ry="350" fill="url(#zone-glow)" />
          <line x1="0" y1="600" x2="600" y2="0" stroke="#D4AF37" strokeWidth="0.3" opacity="0.06" />
          <line x1="1200" y1="600" x2="600" y2="0" stroke="#D4AF37" strokeWidth="0.3" opacity="0.06" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-24 lg:py-32">
          {/* Header */}
          <div className={`zone-reveal ${inView ? 'in' : ''} text-center mb-20`}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span style={{ display: 'inline-block', width: '36px', height: '0.5px', background: '#D4AF37' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.35em', color: '#D4AF37', fontWeight: 500, textTransform: 'uppercase' }}>
                Couverture
              </span>
              <span style={{ display: 'inline-block', width: '36px', height: '0.5px', background: '#D4AF37' }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
              fontWeight: 300,
              color: '#fff',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}>
              Zones de{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 600, color: '#D4AF37' }}>Service</em>
            </h2>
            <p style={{ marginTop: '16px', fontSize: '14px', color: 'rgba(255,255,255,0.35)', fontWeight: 300, maxWidth: '380px', margin: '16px auto 0', lineHeight: 1.8 }}>
              Notre réseau couvre les principales destinations du Maroc
            </p>
          </div>

          {/* Zone cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {zones.map((zone, i) => (
              <div
                key={i}
                className={`zone-reveal ${inView ? 'in' : ''} zone-card p-8`}
                style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
              >
                {/* Large background index */}
                <div
                  className="zone-index absolute top-4 right-5"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '56px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.04)',
                    lineHeight: 1,
                    transition: 'color 0.4s ease',
                    userSelect: 'none',
                  }}
                >
                  {zone.index}
                </div>

                {/* Icon */}
                <div className="relative mb-6" style={{ width: 'fit-content' }}>
                  <div
                    className="zone-icon-wrap w-14 h-14 flex items-center justify-center"
                    style={{ position: 'relative' }}
                  >
                    <zone.icon style={{ width: '22px', height: '22px', color: '#D4AF37', strokeWidth: 1.5 }} />
                  </div>
                  {/* Pulse ring */}
                  <div
                    className="zone-pulse absolute inset-0 rounded-full"
                    style={{
                      border: '1px solid rgba(212,175,55,0.3)',
                      animationDelay: `${i * 0.6}s`,
                    }}
                  />
                </div>

                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '10px',
                  letterSpacing: '0.01em',
                }}>
                  {zone.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 300, lineHeight: 1.7 }}>
                  {zone.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom border accent */}
        <div style={{ height: '0.5px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)' }} />
      </section>
    </>
  )
}