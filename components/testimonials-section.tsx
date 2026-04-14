"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

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

const testimonials = [
  {
    name: "Karim Benjelloun",
    role: "Entrepreneur",
    avatar: "/professional-arab-man-portrait.jpg",
    review:
      "Service exceptionnel ! La Mercedes Classe S était impeccable et le chauffeur très professionnel. Je recommande vivement Manhattan Luxe Car.",
    rating: 5,
    location: "Casablanca",
    initial: "KB",
  },
  {
    name: "Sofia El Mansouri",
    role: "Directrice Marketing",
    avatar: "/professional-arab-woman-portrait.jpg",
    review:
      "Une expérience premium du début à la fin. Livraison à l'aéroport parfaitement coordonnée. La qualité de service est au rendez-vous.",
    rating: 5,
    location: "El Jadida",
    initial: "SE",
  },
  {
    name: "Ahmed Tazi",
    role: "Consultant International",
    avatar: "/professional-moroccan-man-portrait.jpg",
    review:
      "Troisième location avec Manhattan Luxe Car et toujours aussi satisfait. Des véhicules de qualité et une équipe réactive. Confiance totale.",
    rating: 5,
    location: "Casablanca",
    initial: "AT",
  },
]

export default function TestimonialsSection() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)

  // Auto-rotate
  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 4500)
    return () => clearInterval(t)
  }, [inView])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

        .testi-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1);
        }
        .testi-reveal.in { opacity: 1; transform: none; }

        .testi-card {
          position: relative;
          background: rgba(255,255,255,0.025);
          border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer;
        }
        .testi-card.active-card {
          background: rgba(212,175,55,0.06);
          border-color: rgba(212,175,55,0.3);
        }
        .testi-card:hover {
          border-color: rgba(212,175,55,0.2);
        }
        .testi-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 0;
          background: #D4AF37;
          transition: height 0.5s ease;
        }
        .testi-card.active-card::before { height: 100%; }

        .quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 90px;
          font-weight: 700;
          line-height: 0.7;
          color: rgba(212,175,55,0.08);
          pointer-events: none;
          user-select: none;
          display: block;
        }

        .testi-avatar-ring {
          position: relative;
        }
        .testi-avatar-ring::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1px solid rgba(212,175,55,0.4);
          transition: border-color 0.4s ease;
        }
        .active-card .testi-avatar-ring::after {
          border-color: #D4AF37;
        }

        .star-fill {
          fill: #D4AF37;
          transition: transform 0.3s ease;
        }

        .testi-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 0.5px solid rgba(255,255,255,0.2);
          transition: all 0.4s ease;
          cursor: pointer;
        }
        .testi-dot.active {
          background: #D4AF37;
          border-color: #D4AF37;
          width: 24px;
          border-radius: 3px;
        }
      `}</style>

      <section
        ref={ref}
        className="relative overflow-hidden"
        style={{ background: '#0a0a0a', fontFamily: "'Jost', sans-serif" }}
      >
        {/* Background accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.04) 0%, transparent 55%)' }}
        />

        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <circle cx="0" cy="700" r="400" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.05" />
          <circle cx="1200" cy="0" r="300" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.05" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-16 sm:py-20 lg:py-28">
          {/* Header */}
          <div className={`testi-reveal ${inView ? 'in' : ''} mb-16`}>
            <div className="flex items-center gap-3 mb-5">
              <span style={{ display: 'inline-block', width: '36px', height: '0.5px', background: '#D4AF37' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.32em', color: '#D4AF37', fontWeight: 500, textTransform: 'uppercase' }}>
                Témoignages
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                fontWeight: 300,
                color: '#fff',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}>
                Ce que disent nos{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 600, color: '#D4AF37' }}>clients</em>
              </h2>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`testi-dot ${active === i ? 'active' : ''}`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Featured / Large testimonial */}
          <div className={`testi-reveal ${inView ? 'in' : ''} mb-6`} style={{ transitionDelay: '0.15s' }}>
            <div
              style={{
                background: 'rgba(212,175,55,0.04)',
                border: '0.5px solid rgba(212,175,55,0.2)',
                borderRadius: '2px',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Large decorative quote */}
              <span className="quote-mark absolute top-2 left-6" aria-hidden="true">"</span>

              <div className="relative z-10">
                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
                      <path className="star-fill" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p
                  key={active}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1rem, 2.4vw, 1.5rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                    animation: 'fadeIn 0.5s ease',
                  }}
                >
                  "{testimonials[active].review}"
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="testi-avatar-ring" style={{ position: 'relative', width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                    <Image
                      src={testimonials[active].avatar || "/placeholder.svg"}
                      alt={testimonials[active].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p style={{ fontWeight: 500, color: '#fff', fontSize: '14px', marginBottom: '2px' }}>
                      {testimonials[active].name}
                    </p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                      {testimonials[active].role} · {testimonials[active].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three compact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testi-reveal testi-card ${inView ? 'in' : ''} ${active === i ? 'active-card' : ''}`}
                style={{ transitionDelay: `${0.25 + i * 0.1}s` }}
                onClick={() => setActive(i)}
              >
                <div style={{ padding: '1.5rem' }}>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                    {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} viewBox="0 0 24 24" style={{ width: '12px', height: '12px' }}>
                      <path className="star-fill" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                  <p style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.45)',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    "{t.review}"
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(212,175,55,0.12)',
                      border: `0.5px solid ${active === i ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#D4AF37',
                      letterSpacing: '0.05em',
                      transition: 'border-color 0.4s ease',
                    }}>
                      {t.initial}
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 500, color: '#fff' }}>{t.name}</p>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`}</style>
      </section>
    </>
  )
}
