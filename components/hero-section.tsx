"use client"

import { useEffect, useRef, useState } from "react"

// WhatsApp Button inline (replace with your actual import)
function WhatsAppButton({ size = "default", text = "WhatsApp" }) {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 bg-[#D4AF37] text-black font-bold rounded-lg transition-all duration-300 hover:bg-[#F0CB57] hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] ${
        size === "large" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
      }`}
      style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.08em" }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {text}
    </a>
  )
}

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [countersActive, setCountersActive] = useState(false)
  const heroRef = useRef(null)

  const cars = useCounter(50, 1800, countersActive)
  const years = useCounter(8, 1500, countersActive)
  const clients = useCounter(2400, 2200, countersActive)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
      setTimeout(() => setCountersActive(true), 1200)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600;700&family=Cormorant:wght@300;400&display=swap');

        .hero-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.04;
          pointer-events: none;
          z-index: 5;
        }

        .hero-line-draw {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          transition: stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-line-draw.active { stroke-dashoffset: 0; }

        .reveal-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal-up.visible { opacity: 1; transform: translateY(0); }

        .reveal-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal-left.visible { opacity: 1; transform: translateX(0); }

        .stat-card {
          background: rgba(212,175,55,0.06);
          border: 0.5px solid rgba(212,175,55,0.25);
          backdrop-filter: blur(12px);
          transition: all 0.4s ease;
        }
        .stat-card:hover {
          background: rgba(212,175,55,0.12);
          border-color: rgba(212,175,55,0.5);
          transform: translateY(-3px);
        }

        .marquee-track {
          display: flex;
          animation: marquee-scroll 18s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .cta-primary {
          position: relative;
          overflow: hidden;
        }
        .cta-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .outline-btn {
          position: relative;
          overflow: hidden;
        }
        .outline-btn::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #D4AF37;
          transition: width 0.4s ease;
        }
        .outline-btn:hover::after { width: 100%; }

        .social-icon {
          position: relative;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .social-icon::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #D4AF37, transparent, #D4AF37);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: -1;
        }
        .social-icon:hover::before { opacity: 1; }
        .social-icon:hover { transform: translateY(-4px) scale(1.1); }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .float-anim { animation: float 4s ease-in-out infinite; }

        @keyframes pulse-gold {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }

        .scroll-dot { animation: pulse-gold 2s ease-in-out infinite; }
      `}</style>

      <section
        ref={heroRef}
        className="hero-grain relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('/futuristic-dark-automotive-showroom-with-luxury-ca.jpg')`,
            transition: 'transform 8s ease-out',
            transform: loaded ? 'scale(1)' : 'scale(1.05)',
          }}
        />

        {/* Layered dark overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.85) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />

        {/* Cinematic top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-16 z-20"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)' }}
        />

        {/* SVG Decorative lines */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {/* Top-left corner accent */}
          <line
            x1="60" y1="0" x2="60" y2="120"
            stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"
            className={`hero-line-draw ${loaded ? 'active' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          />
          <line
            x1="0" y1="60" x2="120" y2="60"
            stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"
            className={`hero-line-draw ${loaded ? 'active' : ''}`}
            style={{ transitionDelay: '0.5s' }}
          />

          {/* Bottom-right corner accent */}
          <line
            x1="1380" y1="900" x2="1380" y2="780"
            stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"
            className={`hero-line-draw ${loaded ? 'active' : ''}`}
            style={{ transitionDelay: '0.7s' }}
          />
          <line
            x1="1440" y1="840" x2="1320" y2="840"
            stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"
            className={`hero-line-draw ${loaded ? 'active' : ''}`}
            style={{ transitionDelay: '0.9s' }}
          />

          {/* Diagonal accent line */}
          <line
            x1="0" y1="900" x2="260" y2="0"
            stroke="#D4AF37" strokeWidth="0.3" opacity="0.15"
            className={`hero-line-draw ${loaded ? 'active' : ''}`}
            style={{ transitionDelay: '1.2s', strokeDasharray: 1000, strokeDashoffset: loaded ? 0 : 1000 }}
          />

          {/* Dot grid — subtle */}
          {[...Array(6)].map((_, row) =>
            [...Array(10)].map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={120 + col * 130}
                cy={150 + row * 120}
                r="1"
                fill="#D4AF37"
                opacity="0.12"
              />
            ))
          )}
        </svg>

        {/* Vertical marquee strip — left side */}
        <div
          className="absolute left-5 top-0 bottom-0 z-20 hidden lg:flex items-center"
          style={{ writingMode: 'vertical-rl' }}
        >
          <div className="overflow-hidden h-64">
            <div className="marquee-track h-full" style={{ flexDirection: 'column', animation: 'marquee-scroll 14s linear infinite' }}>
              {['PRESTIGE', 'LUXE', 'ÉLÉGANCE', 'PERFORMANCE', 'PRESTIGE', 'LUXE', 'ÉLÉGANCE', 'PERFORMANCE'].map((word, i) => (
                <span
                  key={i}
                  className="block px-2 py-3"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '9px',
                    letterSpacing: '0.25em',
                    color: 'rgba(212,175,55,0.35)',
                    fontWeight: 600,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* === MAIN CONTENT === */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-16 py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-screen lg:min-h-0 pt-20 pb-32 lg:py-0">

            {/* Left column — main content */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-8">

              {/* Eyebrow tag */}
              <div
                className={`reveal-left ${loaded ? 'visible' : ''} inline-flex items-center gap-3`}
                style={{ transitionDelay: '0.2s' }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '36px',
                    height: '0.5px',
                    background: '#D4AF37',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.35em',
                    color: '#D4AF37',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  Manhattan Luxe Car
                </span>
              </div>

              {/* Main headline */}
              <div
                className={`reveal-up ${loaded ? 'visible' : ''}`}
                style={{ transitionDelay: '0.4s' }}
              >
                <h1
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                    fontWeight: 300,
                    lineHeight: 1.05,
                    color: '#FFFFFF',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Location de
                  <br />
                  <em style={{ fontStyle: 'italic', fontWeight: 600, color: '#D4AF37' }}>
                    voitures
                  </em>
                  <br />
                  <span style={{ fontWeight: 300 }}>de prestige.</span>
                </h1>
              </div>

              {/* Divider */}
              <div
                className={`reveal-up ${loaded ? 'visible' : ''} flex items-center gap-4`}
                style={{ transitionDelay: '0.55s' }}
              >
                <div style={{ width: '48px', height: '1px', background: 'rgba(212,175,55,0.6)' }} />
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    letterSpacing: '0.02em',
                  }}
                >
                  Roulez en style.
                </p>
              </div>

              {/* Description */}
              <div
                className={`reveal-up ${loaded ? 'visible' : ''}`}
                style={{ transitionDelay: '0.65s' }}
              >
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 300,
                    lineHeight: 1.8,
                    maxWidth: '440px',
                    letterSpacing: '0.02em',
                  }}
                >
                  Découvrez notre flotte exclusive de véhicules d'exception.
                  Chaque trajet devient une expérience inoubliable.
                </p>
              </div>

              {/* CTA Buttons */}
              <div
                className={`reveal-up ${loaded ? 'visible' : ''} flex flex-wrap items-center gap-4`}
                style={{ transitionDelay: '0.75s' }}
              >
                <div className="cta-primary">
                  <WhatsAppButton size="large" text="Réserver sur WhatsApp" />
                </div>

                <a
                  href="#fleet"
                  className="outline-btn group inline-flex items-center gap-3 text-white transition-all duration-300 hover:text-[#D4AF37]"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    paddingBottom: '4px',
                  }}
                >
                  <span>Voir la flotte</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
              </div>

              {/* Social icons */}
              <div
                className={`reveal-up ${loaded ? 'visible' : ''} flex items-center gap-3 pt-2`}
                style={{ transitionDelay: '0.9s' }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    color: 'rgba(255,255,255,0.3)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    marginRight: '4px',
                  }}
                >
                  Suivez-nous
                </span>

                {[
                  {
                    href: 'https://www.instagram.com/manhattanluxecar',
                    label: 'Instagram',
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                  {
                    href: 'https://www.facebook.com/profile.php?id=61584072572803',
                    label: 'Facebook',
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                  {
                    href: 'https://www.tiktok.com/@manhattan_luxecar',
                    label: 'TikTok',
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    ),
                  },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="social-icon"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.06)',
                      border: '0.5px solid rgba(212,175,55,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.7)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right column — Stats panel */}
            <div className="lg:col-span-5 xl:col-span-4 xl:col-start-9 flex flex-col items-start lg:items-end gap-4">

              {/* Stats cards */}
              <div
                className={`reveal-up ${loaded ? 'visible' : ''} w-full lg:max-w-xs`}
                style={{ transitionDelay: '0.6s' }}
              >
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: cars, suffix: '+', label: 'Véhicules', sublabel: 'disponibles' },
                    { value: years, suffix: '', label: 'Années', sublabel: "d'expérience" },
                    { value: clients, suffix: '+', label: 'Clients', sublabel: 'satisfaits' },
                  ].map(({ value, suffix, label, sublabel }, i) => (
                    <div
                      key={i}
                      className="stat-card rounded-xl p-4 text-center float-anim"
                      style={{ animationDelay: `${i * 0.5}s`, animationDuration: `${3.5 + i * 0.4}s` }}
                    >
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                          fontWeight: 600,
                          color: '#D4AF37',
                          lineHeight: 1,
                          marginBottom: '4px',
                        }}
                      >
                        {value}{suffix}
                      </div>
                      <div
                        style={{
                          fontSize: '10px',
                          color: 'rgba(255,255,255,0.7)',
                          fontWeight: 500,
                          letterSpacing: '0.05em',
                          lineHeight: 1.3,
                        }}
                      >
                        {label}
                        <br />
                        <span style={{ color: 'rgba(255,255,255,0.4)' }}>{sublabel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature badges */}
              <div
                className={`reveal-up ${loaded ? 'visible' : ''} w-full lg:max-w-xs space-y-2`}
                style={{ transitionDelay: '0.8s' }}
              >
                {[
                  { icon: '◈', text: 'Livraison à domicile' },
                  { icon: '◈', text: 'Disponible 7j/7 · 24h/24' },
                  { icon: '◈', text: 'Assurance tous risques incluse' },
                ].map(({ icon, text }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '0.5px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span style={{ color: '#D4AF37', fontSize: '10px' }}>{icon}</span>
                    <span
                      style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.6)',
                        letterSpacing: '0.03em',
                        fontWeight: 400,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom marquee bar */}
        <div
          className="absolute bottom-16 left-0 right-0 z-20 overflow-hidden"
          style={{
            borderTop: '0.5px solid rgba(212,175,55,0.1)',
            borderBottom: '0.5px solid rgba(212,175,55,0.1)',
            padding: '10px 0',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div className="marquee-track">
            {[...Array(2)].map((_, i) =>
              ['PRESTIGE', '·', 'PERFORMANCE', '·', 'LUXE', '·', 'ÉLÉGANCE', '·', 'EXCLUSIVITÉ', '·', 'EXCELLENCE', '·'].map((word, j) => (
                <span
                  key={`${i}-${j}`}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                    color: word === '·' ? '#D4AF37' : 'rgba(255,255,255,0.25)',
                    fontWeight: word === '·' ? 700 : 400,
                    padding: '0 16px',
                    display: 'inline-block',
                  }}
                >
                  {word}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 reveal-up ${loaded ? 'visible' : ''} flex flex-col items-center gap-2`}
          style={{ transitionDelay: '1.2s' }}
        >
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.6))',
            }}
            className="scroll-dot"
          />
          <span
            style={{
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: 'rgba(212,175,55,0.5)',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
        </div>
      </section>
    </>
  )
}