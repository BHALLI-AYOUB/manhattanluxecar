"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import WhatsAppButton from "./whatsapp-button"

const contactCards: Array<{
  title: string
  value: string
  description: string
  href: string
  icon: LucideIcon
}> = [
  {
    title: "Telephone",
    value: "+212 777 441 405",
    description: "Reservations et disponibilites immediates",
    href: "tel:+212777441405",
    icon: Phone,
  },
  {
    title: "Email",
    value: "manhattanluxecar@outlook.com",
    description: "Demandes pro, devis et informations",
    href: "mailto:manhattanluxecar@outlook.com",
    icon: Mail,
  },
  {
    title: "Localisation",
    value: "Casablanca & El Jadida",
    description: "Livraison a domicile, hotels et aeroport",
    href: "https://wa.me/212777441405",
    icon: MapPin,
  },
]

const serviceHighlights = [
  "Livraison a domicile ou a l'hotel",
  "Transfert aeroport Mohammed V",
  "Disponibilite 7j/7 et 24h/24",
]

function useInView<T extends HTMLElement>(threshold = 0.2): [React.RefObject<T | null>, boolean] {
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

  return [ref, inView]
}

export default function ContactSection() {
  const [sectionRef, inView] = useInView<HTMLElement>(0.18)

  return (
    <>
      <style>{`
        .contact-reveal {
          opacity: 0;
          transform: translateY(34px);
          transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .contact-reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .contact-line {
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.15));
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .contact-line.in {
          width: 88px;
        }

        .contact-card {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%),
            rgba(12, 12, 12, 0.78);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 0.4s ease, border-color 0.4s ease, background 0.4s ease;
        }

        .contact-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.18), transparent 55%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212,175,55,0.3);
          background:
            linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(255,255,255,0.02) 100%),
            rgba(12, 12, 12, 0.86);
        }

        .contact-card:hover::before {
          opacity: 1;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="contact"
        className="scroll-mt-36 relative overflow-hidden bg-[#050505] py-24 md:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 12% 18%, rgba(212,175,55,0.12), transparent 32%), radial-gradient(circle at 88% 30%, rgba(255,255,255,0.08), transparent 28%), radial-gradient(circle at 50% 100%, rgba(212,175,55,0.08), transparent 45%)",
          }}
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <line x1="20" y1="180" x2="300" y2="180" stroke="#D4AF37" strokeWidth="0.4" opacity="0.2" />
          <line x1="1140" y1="720" x2="1420" y2="720" stroke="#D4AF37" strokeWidth="0.4" opacity="0.2" />
          <circle cx="1220" cy="180" r="180" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.08" />
          <circle cx="220" cy="760" r="120" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.08" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
          <div className="grid items-start gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div className="space-y-8">
              <div className={`contact-reveal flex items-center gap-3 ${inView ? "in" : ""}`}>
                <span className="h-px w-9 bg-[#D4AF37]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#D4AF37]">Contact</span>
              </div>

              <div className={`contact-reveal space-y-5 ${inView ? "in" : ""}`} style={{ transitionDelay: "0.12s" }}>
                <h2 className="max-w-3xl font-serif text-4xl font-light leading-[1.04] text-white md:text-5xl lg:text-6xl">
                  Organisons votre
                  <br />
                  prochaine <em className="font-semibold italic text-[#D4AF37]">experience</em>
                  <br />
                  automobile.
                </h2>
                <p className="max-w-xl text-[15px] leading-7 text-white/55 md:text-base">
                  Reponse rapide, service discret et livraison flexible pour chaque reservation.
                </p>
              </div>

              <div className={`contact-line ${inView ? "in" : ""}`} style={{ transitionDelay: "0.24s" }} />

              <div
                className={`contact-reveal grid gap-3 sm:grid-cols-3 ${inView ? "in" : ""}`}
                style={{ transitionDelay: "0.32s" }}
              >
                {[
                  { label: "Reponse rapide", value: "< 10 min" },
                  { label: "Disponibilite", value: "24/7" },
                  { label: "Zones", value: "Casablanca + El Jadida" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-[#D4AF37]/16 bg-[#D4AF37]/[0.05] px-5 py-5"
                  >
                    <div className="mb-2 text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]/80">{item.label}</div>
                    <div className="font-serif text-2xl text-white">{item.value}</div>
                  </div>
                ))}
              </div>

              <div
                className={`contact-reveal rounded-[30px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 ${inView ? "in" : ""}`}
                style={{ transitionDelay: "0.42s" }}
              >
                <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]">
                  <Sparkles className="h-4 w-4" />
                  <span>Service Signature</span>
                </div>

                <p className="mb-6 max-w-2xl text-sm leading-6 text-white/62 sm:text-[15px]">
                  Conseil, confirmation rapide et coordination simple.
                </p>

                <div className="mb-7 grid gap-3 sm:grid-cols-3">
                  {serviceHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/30 px-4 py-4 text-sm text-white/68"
                    >
                      <ShieldCheck className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <WhatsAppButton
                    size="large"
                    text="Reserver sur WhatsApp"
                    message="Bonjour, je souhaite reserver une voiture de prestige."
                    className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.14em] sm:w-auto"
                  />

                  <a
                    href="mailto:manhattanluxecar@outlook.com"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-6 py-4 text-sm uppercase tracking-[0.14em] text-white/78 transition-all duration-300 hover:border-[#D4AF37]/40 hover:text-white"
                  >
                    <span>Envoyer un email</span>
                    <ArrowUpRight className="h-4 w-4 text-[#D4AF37]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {contactCards.map((card, index) => {
                const Icon = card.icon

                return (
                  <a
                    key={card.title}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`contact-card contact-reveal block rounded-[28px] p-6 sm:p-7 ${inView ? "in" : ""}`}
                    style={{ transitionDelay: `${0.22 + index * 0.08}s` }}
                  >
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10">
                        <Icon className="h-6 w-6 text-[#D4AF37]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]/85">
                          {card.title}
                        </div>
                        <div className="break-words font-serif text-2xl leading-tight text-white">{card.value}</div>
                        <p className="mt-3 text-sm leading-6 text-white/55">{card.description}</p>
                      </div>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#D4AF37]" />
                    </div>
                  </a>
                )
              })}

              <div
                className={`contact-reveal rounded-[28px] border border-[#D4AF37]/16 bg-[#D4AF37]/[0.05] p-6 sm:p-7 ${inView ? "in" : ""}`}
                style={{ transitionDelay: "0.5s" }}
              >
                <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]">
                  <Clock3 className="h-4 w-4" />
                  <span>Conciergerie Disponible</span>
                </div>
                <p className="mb-5 text-sm leading-6 text-white/62">
                  Recommandation rapide et assistance sans attente.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Business", "Mariage", "Sejour", "Longue duree"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-white/62"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
