"use client"

import { useEffect, useRef, useState } from "react"

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect() }
    }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

export default function AboutSection() {
  const [ref, inView] = useInView(0.15)
  const clients = useCounter(2400, 2000, inView)
  const years = useCounter(8, 1600, inView)
  const rating = useCounter(500, 1800, inView)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .about-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1);
        }
        .about-reveal.in { opacity: 1; transform: none; }

        .about-reveal-left {
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1);
        }
        .about-reveal-left.in { opacity: 1; transform: none; }

        .about-stat-card {
          position: relative;
          background: rgba(212,175,55,0.04);
          border: 0.5px solid rgba(212,175,55,0.15);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .about-stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(212,175,55,0.6), transparent);
          transform: scaleX(0);
          transition: transform 0.6s ease;
        }
        .about-stat-card:hover::before { transform: scaleX(1); }
        .about-stat-card:hover {
          background: rgba(212,175,55,0.08);
          border-color: rgba(212,175,55,0.35);
          transform: translateY(-3px);
        }

        .about-divider {
          width: 0;
          height: 1px;
          background: linear-gradient(to right, #D4AF37, rgba(212,175,55,0.2));
          transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .about-divider.in { width: 80px; }

        .about-tag-line {
          width: 0;
          transition: width 0.8s ease;
          display: inline-block;
          height: 0.5px;
          background: #D4AF37;
          vertical-align: middle;
        }
        .about-tag-line.in { width: 36px; }
      `}</style>

      <section
        ref={ref}
        id="about"
        className="scroll-mt-36 relative overflow-hidden"
        style={{ background: '#0a0a0a', fontFamily: "'Jost', sans-serif" }}
      >
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212,175,55,0.04) 0%, transparent 60%),
                              radial-gradient(circle at 80% 50%, rgba(212,175,55,0.03) 0%, transparent 50%)`,
          }}
        />

        {/* SVG Accent */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="0" x2="1200" y2="700" stroke="#D4AF37" strokeWidth="0.3" opacity="0.06" />
          <circle cx="1100" cy="80" r="200" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.05" />
          <circle cx="100" cy="600" r="150" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.05" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* LEFT — Text content */}
            <div className="space-y-10">
              {/* Eyebrow */}
              <div className={`about-reveal-left ${inView ? 'in' : ''} flex items-center gap-3`} style={{ transitionDelay: '0.1s' }}>
                <span className={`about-tag-line ${inView ? 'in' : ''}`} style={{ transitionDelay: '0.1s' }} />
                <span style={{ fontSize: '11px', letterSpacing: '0.35em', color: '#D4AF37', fontWeight: 500, textTransform: 'uppercase' }}>
                  À Propos
                </span>
              </div>

              {/* Headline */}
              <div className={`about-reveal ${inView ? 'in' : ''}`} style={{ transitionDelay: '0.2s' }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  color: '#fff',
                  letterSpacing: '-0.01em',
                }}>
                  L'Excellence<br />
                  <em style={{ fontStyle: 'italic', fontWeight: 600, color: '#D4AF37' }}>Automobile</em>
                  <br />
                  <span style={{ fontWeight: 300 }}>Redéfinie.</span>
                </h2>
              </div>

              {/* Animated divider */}
              <div className={`about-divider ${inView ? 'in' : ''}`} style={{ transitionDelay: '0.35s' }} />

              {/* Body text */}
              <div className={`about-reveal ${inView ? 'in' : ''} space-y-5`} style={{ transitionDelay: '0.4s' }}>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, fontWeight: 300 }}>
                  <span style={{ color: '#D4AF37', fontWeight: 500 }}>Manhattan Luxe Car</span> est une agence de location
                  de voitures de prestige basée à{' '}
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>Casablanca</span> et{' '}
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>El Jadida</span>.
                </p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.9, fontWeight: 300 }}>
                  Nous proposons des véhicules haut de gamme, un service chauffeur aéroport,
                  et une expérience client 5 étoiles pour tous vos déplacements d'exception.
                </p>
              </div>

              {/* Feature list */}
              <div className={`about-reveal ${inView ? 'in' : ''} space-y-3`} style={{ transitionDelay: '0.55s' }}>
                {['Flotte exclusive renouvelée chaque année', 'Assurance tous risques incluse', 'Livraison à domicile & aéroport'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div style={{ width: '5px', height: '5px', background: '#D4AF37', borderRadius: '50%', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 300, letterSpacing: '0.02em' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Stats */}
            <div className={`about-reveal ${inView ? 'in' : ''} space-y-5`} style={{ transitionDelay: '0.3s' }}>

              {/* Large decorative number — background */}
              <div className="relative">
                <div
                  className="absolute -top-8 -right-4 select-none pointer-events-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '200px',
                    fontWeight: 700,
                    color: 'rgba(212,175,55,0.04)',
                    lineHeight: 1,
                    letterSpacing: '-0.05em',
                  }}
                >
                  MLC
                </div>

                {/* Primary stat — large */}
                <div className="about-stat-card p-8 mb-5">
                  <div style={{ fontSize: '11px', letterSpacing: '0.3em', color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Clients Satisfaits
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                    fontWeight: 600,
                    color: '#D4AF37',
                    lineHeight: 1,
                  }}>
                    {clients.toLocaleString()}+
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginTop: '8px', fontWeight: 300 }}>
                    particuliers et entreprises nous font confiance
                  </div>
                </div>

                {/* Two secondary stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: years, suffix: ' ans', label: "D'expérience", sub: 'dans le secteur' },
                    { value: rating, suffix: '+', label: 'Avis 5 étoiles', sub: 'sur Google & réseaux' },
                  ].map(({ value, suffix, label, sub }, i) => (
                    <div key={i} className="about-stat-card p-6">
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                        fontWeight: 600,
                        color: '#D4AF37',
                        lineHeight: 1,
                        marginBottom: '8px',
                      }}>
                        {value}{suffix}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, marginBottom: '3px' }}>{label}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>{sub}</div>
                    </div>
                  ))}
                </div>

                {/* Rating badge */}
                <div
                  className={`about-reveal ${inView ? 'in' : ''} flex items-center gap-4 mt-4 p-4 rounded-xl`}
                  style={{
                    background: 'rgba(212,175,55,0.06)',
                    border: '0.5px solid rgba(212,175,55,0.2)',
                    transitionDelay: '0.7s',
                  }}
                >
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: '#D4AF37' }}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
                    Note moyenne <span style={{ color: '#D4AF37', fontWeight: 500 }}>5/5</span> — Service Client
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
