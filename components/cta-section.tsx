"use client"

import { useEffect, useRef, useState } from "react"

function WhatsAppButton({ size = "default", text = "WhatsApp" }) {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        background: '#D4AF37',
        color: '#000',
        fontFamily: "'Jost', sans-serif",
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontSize: size === 'large' ? '12px' : '11px',
        padding: size === 'large' ? '14px 28px' : '12px 22px',
        borderRadius: '2px',
        textDecoration: 'none',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#F0CB57'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,175,55,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#D4AF37'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px', flexShrink: 0 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {text}
    </a>
  )
}

function useInView(threshold = 0.2) {
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

export default function CTASection() {
  const [ref, inView] = useInView(0.15)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,600&family=Jost:wght@300;400;500;600;700&display=swap');

        .cta-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 1s cubic-bezier(0.4,0,0.2,1), transform 1s cubic-bezier(0.4,0,0.2,1);
        }
        .cta-reveal.in { opacity: 1; transform: none; }

        .cta-line {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          transition: stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1);
        }
        .cta-line.in { stroke-dashoffset: 0; }

        .cta-outline-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.5);
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 0.5px solid rgba(255,255,255,0.15);
          transition: all 0.35s ease;
        }
        .cta-outline-link:hover {
          color: #D4AF37;
          border-bottom-color: rgba(212,175,55,0.4);
          transform: translateX(4px);
        }

        @keyframes slow-pan {
          0% { transform: scale(1.08) translateX(0); }
          100% { transform: scale(1.08) translateX(-2%); }
        }
        .cta-bg-pan { animation: slow-pan 12s ease-in-out infinite alternate; }
      `}</style>

      <section
        ref={ref}
        className="relative overflow-hidden"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        {/* Background image with slow pan */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="cta-bg-pan absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/elegant-luxury-car-interior-steering-wheel-dashboa.jpg')` }}
          />
        </div>

        {/* Multi-layer overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.85) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.65) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)' }} />

        {/* SVG decorative elements */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          {/* Bracket top-left */}
          <line className={`cta-line ${inView ? 'in' : ''}`} x1="80" y1="0" x2="80" y2="100" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" style={{ transitionDelay: '0.2s' }} />
          <line className={`cta-line ${inView ? 'in' : ''}`} x1="0" y1="80" x2="100" y2="80" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" style={{ transitionDelay: '0.4s' }} />

          {/* Bracket bottom-right */}
          <line className={`cta-line ${inView ? 'in' : ''}`} x1="1120" y1="600" x2="1120" y2="500" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" style={{ transitionDelay: '0.6s' }} />
          <line className={`cta-line ${inView ? 'in' : ''}`} x1="1200" y1="520" x2="1100" y2="520" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" style={{ transitionDelay: '0.8s' }} />

          {/* Center horizontal accent */}
          <line className={`cta-line ${inView ? 'in' : ''}`} x1="400" y1="300" x2="800" y2="300" stroke="#D4AF37" strokeWidth="0.3" opacity="0.12" style={{ transitionDelay: '1s', strokeDasharray: 400 }} />
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl mx-auto text-center">

            {/* Eyebrow */}
            <div className={`cta-reveal ${inView ? 'in' : ''} flex items-center justify-center gap-3 mb-8`} style={{ transitionDelay: '0.15s' }}>
              <span style={{ display: 'inline-block', width: '36px', height: '0.5px', background: '#D4AF37' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.32em', color: '#D4AF37', fontWeight: 500, textTransform: 'uppercase' }}>
                Prêt à Rouler
              </span>
              <span style={{ display: 'inline-block', width: '36px', height: '0.5px', background: '#D4AF37' }} />
            </div>

            {/* Headline */}
            <div className={`cta-reveal ${inView ? 'in' : ''} mb-8`} style={{ transitionDelay: '0.25s' }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.1rem, 6vw, 5rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#fff',
                letterSpacing: '-0.01em',
              }}>
                Réservez votre
                <br />
                véhicule de{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 600, color: '#D4AF37' }}>Prestige</em>
              </h2>
            </div>

            {/* Divider */}
            <div className={`cta-reveal ${inView ? 'in' : ''} flex justify-center mb-8`} style={{ transitionDelay: '0.35s' }}>
              <div style={{ width: '48px', height: '0.5px', background: 'rgba(212,175,55,0.5)' }} />
            </div>

            {/* Description */}
            <div className={`cta-reveal ${inView ? 'in' : ''} mb-12`} style={{ transitionDelay: '0.45s' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.8, maxWidth: '440px', margin: '0 auto' }}>
                Contactez-nous directement sur WhatsApp pour une réponse rapide et un service entièrement personnalisé.
              </p>
            </div>

            {/* CTA */}
            <div className={`cta-reveal ${inView ? 'in' : ''} flex flex-col sm:flex-row items-center justify-center gap-5`} style={{ transitionDelay: '0.55s' }}>
              <WhatsAppButton size="large" text="Réserver sur WhatsApp" />
              <a href="#fleet" className="cta-outline-link">
                <span>Voir la flotte</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '14px', height: '14px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>

            {/* Trust line */}
            <div className={`cta-reveal ${inView ? 'in' : ''} mt-14 flex items-center justify-center gap-8 flex-wrap`} style={{ transitionDelay: '0.7s' }}>
              {[
                { icon: '◈', label: 'Réponse sous 5 minutes' },
                { icon: '◈', label: 'Sans engagement' },
                { icon: '◈', label: 'Service 24/7' },
              ].map(({ icon, label }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#D4AF37', fontSize: '8px' }}>{icon}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 300, letterSpacing: '0.03em' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
