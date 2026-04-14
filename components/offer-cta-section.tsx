"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Clock3, ShieldCheck, Sparkles } from "lucide-react"
import WhatsAppButton from "./whatsapp-button"

const serviceSignals = [
  "Rapide",
  "Flexible",
  "Premium",
  "24/7",
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

export default function OfferCTASection() {
  const { ref, inView } = useInView<HTMLElement>(0.16)

  return (
    <>
      <style>{`
        .offer-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .offer-reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .offer-shell {
          background:
            radial-gradient(circle at top left, rgba(255,255,255,0.16), transparent 28%),
            radial-gradient(circle at bottom right, rgba(0,0,0,0.14), transparent 32%),
            linear-gradient(135deg, #d9b43f 0%, #cda332 52%, #e0c15c 100%);
          border: 1px solid rgba(212,175,55,0.24);
          box-shadow: 0 35px 80px rgba(0,0,0,0.24);
        }

        .offer-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(120deg, rgba(255,255,255,0.12), transparent 45%),
            linear-gradient(0deg, rgba(0,0,0,0.08), transparent 55%);
          pointer-events: none;
        }

        .offer-dark-card {
          background:
            linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%),
            rgba(9, 9, 9, 0.88);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>

      <section ref={ref} className="relative overflow-hidden bg-[#050505] py-16 sm:py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 16% 20%, rgba(212,175,55,0.12), transparent 28%), radial-gradient(circle at 84% 80%, rgba(212,175,55,0.08), transparent 24%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
          <div className={`offer-shell offer-reveal relative overflow-hidden rounded-[30px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12 ${inView ? "in" : ""}`}>
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <div className="absolute inset-y-10 right-0 hidden w-px bg-gradient-to-b from-transparent via-black/15 to-transparent lg:block" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div
                  className={`offer-reveal inline-flex items-center gap-2 rounded-full border border-black/12 bg-black/8 px-3 py-1.5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.26em] text-black/70 ${inView ? "in" : ""}`}
                  style={{ transitionDelay: "0.1s" }}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Selection Premium</span>
                </div>

                <div className={`offer-reveal space-y-4 ${inView ? "in" : ""}`} style={{ transitionDelay: "0.16s" }}>
                  <h2 className="max-w-3xl font-serif text-3xl font-semibold leading-[1] text-black sm:text-4xl md:text-5xl lg:text-6xl">
                    Decouvrez nos voitures
                    <br />
                    de luxe au <em className="italic">meilleur prix.</em>
                  </h2>
                  <p className="max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-black/72 md:text-lg">
                    Choisissez votre vehicule et reservez en quelques messages.
                  </p>
                </div>

                <div className={`offer-reveal flex flex-wrap gap-3 ${inView ? "in" : ""}`} style={{ transitionDelay: "0.24s" }}>
                  <a
                    href="#fleet"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-[0_16px_35px_rgba(0,0,0,0.22)] sm:px-7 sm:py-4"
                  >
                    <span>Voir les vehicules disponibles</span>
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>

                  <WhatsAppButton
                    text="Reserver sur WhatsApp"
                    message="Bonjour, je souhaite reserver une voiture de prestige."
                    className="rounded-full border border-black/14 bg-white/25 px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-black hover:bg-white/35 hover:text-black hover:shadow-[0_14px_30px_rgba(255,255,255,0.14)] sm:px-7 sm:py-4"
                  />
                </div>

                <div className={`offer-reveal grid gap-3 sm:grid-cols-2 xl:grid-cols-4 ${inView ? "in" : ""}`} style={{ transitionDelay: "0.32s" }}>
                  {serviceSignals.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-black/10 bg-black/6 px-4 py-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-black/72"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div
                  className={`offer-dark-card offer-reveal rounded-[28px] p-6 text-white ${inView ? "in" : ""}`}
                  style={{ transitionDelay: "0.18s" }}
                >
                  <div className="mb-3 flex items-center gap-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-[#D4AF37]">
                    <Clock3 className="h-4 w-4" />
                    <span>Disponibilite Continue</span>
                  </div>
                  <div className="font-serif text-4xl leading-none text-[#D4AF37] sm:text-6xl">24/7</div>
                  <p className="mt-4 text-xs sm:text-sm leading-6 text-white/62">
                    Une equipe dispo jour et nuit pour vous repondre vite.
                  </p>
                </div>

                <div
                  className={`offer-dark-card offer-reveal rounded-[28px] p-6 text-white ${inView ? "in" : ""}`}
                  style={{ transitionDelay: "0.28s" }}
                >
                  <div className="mb-4 flex items-center gap-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-[#D4AF37]">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Ce que vous gagnez</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Prise en charge rapide",
                      "Accompagnement premium",
                      "Livraison a l'adresse de votre choix",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 text-xs sm:text-sm leading-6 sm:leading-7 text-white/68">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
