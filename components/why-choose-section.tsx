"use client"

import { useEffect, useRef, useState } from "react"
import { Car, Clock3, Home, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react"

const advantages: Array<{
  icon: LucideIcon
  title: string
  description: string
  eyebrow: string
  note: string
}> = [
  {
    icon: Car,
    eyebrow: "Chauffeur & Concierge",
    title: "Service Chauffeur VIP",
    description: "Chauffeurs discrets et ponctuels pour vos trajets importants.",
    note: "Elegance a chaque trajet",
  },
  {
    icon: Home,
    eyebrow: "Flexibilite Totale",
    title: "Livraison a Domicile",
    description: "Votre vehicule livre a l'adresse de votre choix.",
    note: "Hotel, residence ou aeroport",
  },
  {
    icon: Sparkles,
    eyebrow: "Selection Premium",
    title: "Voitures Recentes & Luxe",
    description: "Une flotte recente, preparee avec soin et presentee avec exigence.",
    note: "Presentation premium",
  },
  {
    icon: Clock3,
    eyebrow: "Disponibilite Continue",
    title: "Assistance 24/7",
    description: "Une equipe disponible jour et nuit pour vous repondre vite.",
    note: "Avant, pendant et apres",
  },
]

const servicePromises = [
  "Reponse rapide sur WhatsApp",
  "Accompagnement sur mesure",
  "Livraison flexible",
  "Experience premium",
]

function useInView<T extends HTMLElement>(threshold = 0.18) {
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

export default function WhyChooseSection() {
  const { ref, inView } = useInView<HTMLElement>(0.16)

  return (
    <>
      <style>{`
        .why-reveal {
          opacity: 0;
          transform: translateY(34px);
          transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .why-reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .why-divider {
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.15));
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .why-divider.in {
          width: 96px;
        }

        .why-panel {
          background:
            linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(255,255,255,0.03) 100%),
            rgba(12, 12, 12, 0.82);
          border: 1px solid rgba(212,175,55,0.16);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .why-card {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%),
            rgba(11, 11, 11, 0.82);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease, background 0.45s ease;
        }

        .why-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.18), transparent 55%);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
        }

        .why-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 24px;
          right: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.65), transparent);
          opacity: 0;
          transition: opacity 0.45s ease;
        }

        .why-card:hover {
          transform: translateY(-6px);
          border-color: rgba(212,175,55,0.3);
          box-shadow: 0 22px 55px rgba(0,0,0,0.28);
          background:
            linear-gradient(135deg, rgba(212,175,55,0.09) 0%, rgba(255,255,255,0.02) 100%),
            rgba(11, 11, 11, 0.9);
        }

        .why-card:hover::before,
        .why-card:hover::after {
          opacity: 1;
        }
      `}</style>

      <section ref={ref} className="relative overflow-hidden bg-[#070707] py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 10% 18%, rgba(212,175,55,0.12), transparent 30%), radial-gradient(circle at 88% 22%, rgba(255,255,255,0.07), transparent 24%), radial-gradient(circle at 50% 100%, rgba(212,175,55,0.08), transparent 42%)",
          }}
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <line x1="0" y1="160" x2="260" y2="160" stroke="#D4AF37" strokeWidth="0.4" opacity="0.18" />
          <line x1="1180" y1="760" x2="1440" y2="760" stroke="#D4AF37" strokeWidth="0.4" opacity="0.18" />
          <circle cx="1240" cy="180" r="170" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.08" />
          <circle cx="180" cy="760" r="120" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.08" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
          <div className="mb-14 grid items-end gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-6">
              <div className={`why-reveal flex items-center gap-3 ${inView ? "in" : ""}`}>
                <span className="h-px w-9 bg-[#D4AF37]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#D4AF37]">Nos Avantages</span>
              </div>

              <div className={`why-reveal space-y-5 ${inView ? "in" : ""}`} style={{ transitionDelay: "0.12s" }}>
                <h2 className="max-w-4xl font-serif text-4xl font-light leading-[1.04] text-white md:text-5xl lg:text-6xl">
                  Pourquoi choisir
                  <br />
                  <em className="font-semibold italic text-[#D4AF37]">Manhattan Luxe Car</em>
                  <br />
                  pour votre location.
                </h2>
                <p className="max-w-2xl text-[15px] leading-7 text-white/55 md:text-base">
                  Une location plus fluide, plus rapide et plus premium.
                </p>
              </div>

              <div className={`why-divider ${inView ? "in" : ""}`} style={{ transitionDelay: "0.22s" }} />
            </div>

            <div
              className={`why-panel why-reveal rounded-[30px] p-6 sm:p-8 ${inView ? "in" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]">
                <ShieldCheck className="h-4 w-4" />
                <span>Experience Signature</span>
              </div>

              <div className="mb-3 font-serif text-5xl leading-none text-white sm:text-6xl">4</div>
              <p className="mb-6 max-w-lg text-sm leading-6 text-white/62 sm:text-[15px]">
                Quatre piliers: excellence, rapidite, flexibilite et detail.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {servicePromises.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/30 px-4 py-4 text-sm text-white/68"
                  >
                    <Sparkles className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon
              const isFeatured = index === 0

              return (
                <article
                  key={advantage.title}
                  className={`why-card why-reveal rounded-[28px] p-6 sm:p-7 ${inView ? "in" : ""} ${isFeatured ? "xl:col-span-2" : ""}`}
                  style={{ transitionDelay: `${0.26 + index * 0.08}s` }}
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/18 bg-[#D4AF37]/10">
                        <Icon className="h-6 w-6 text-[#D4AF37]" />
                      </div>
                      <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/24">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-6 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]/82">
                      {advantage.eyebrow}
                    </div>

                    <h3
                      className={`mt-3 font-serif leading-tight text-white ${isFeatured ? "max-w-xl text-3xl sm:text-[2rem]" : "text-[1.65rem]"}`}
                    >
                      {advantage.title}
                    </h3>

                    <p className={`mt-4 text-sm leading-6 text-white/58 sm:text-[15px] ${isFeatured ? "max-w-2xl" : ""}`}>
                      {advantage.description}
                    </p>

                    <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-white/62">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{advantage.note}</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
