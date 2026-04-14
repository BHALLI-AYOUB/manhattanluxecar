"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUpRight, Clock3, Menu, PhoneCall, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "A Propos", href: "#about" },
  { label: "Flotte", href: "#fleet" },
  { label: "Contact", href: "#contact" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <style>{`
        .header-shell {
          background:
            linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.01) 45%, rgba(212,175,55,0.05) 100%),
            rgba(6, 6, 6, 0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
        }

        .header-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top left, rgba(212,175,55,0.2), transparent 30%),
            linear-gradient(90deg, transparent, rgba(212,175,55,0.12), transparent);
          pointer-events: none;
        }

        .header-link {
          position: relative;
        }

        .header-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 100%;
          height: 1px;
          transform: scaleX(0);
          transform-origin: left;
          background: linear-gradient(90deg, rgba(212,175,55,0.05), rgba(212,175,55,0.95), rgba(212,175,55,0.05));
          transition: transform 0.35s ease;
        }

        .header-link:hover::after {
          transform: scaleX(1);
        }

        .header-mobile {
          background:
            linear-gradient(180deg, rgba(15,15,15,0.96) 0%, rgba(7,7,7,0.92) 100%);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
      `}</style>

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8 lg:pt-5">
          <div
            className={cn(
              "header-shell relative overflow-hidden rounded-[28px] border transition-all duration-500",
              scrolled
                ? "border-[#D4AF37]/30 bg-black/85 shadow-[0_22px_60px_rgba(0,0,0,0.4)]"
                : "border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.2)]",
            )}
          >
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

            <div className="relative flex items-center gap-3 px-4 py-3 md:px-6 md:py-4">
              <Link href="/" className="min-w-0 flex-1 pr-2">
                <div className="flex items-center gap-3">
                  <div className="hidden h-10 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/80 to-transparent sm:block" />
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.34em] text-[#D4AF37]">
                      <span>Casablanca</span>
                      <span className="h-1 w-1 rounded-full bg-[#D4AF37]/70" />
                      <span>El Jadida</span>
                    </div>
                    <h1 className="truncate font-serif text-xl font-semibold tracking-[0.02em] text-white md:text-[1.7rem]">
                      <span className="text-[#D4AF37]">Manhattan</span> Luxe Car
                    </h1>
                  </div>
                </div>
              </Link>

              <nav className="hidden items-center gap-8 lg:flex">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="header-link text-xs font-medium uppercase tracking-[0.26em] text-white/68 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="hidden items-center gap-3 md:flex">
                <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/55 xl:flex">
                  <Clock3 className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>7j/7 · 24h/24</span>
                </div>

                <a
                  href="tel:+212777441405"
                  className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-white/[0.06] lg:flex"
                >
                  <PhoneCall className="h-4 w-4 text-[#D4AF37]" />
                  <span>+212 777 441 405</span>
                </a>

                <a
                  href="https://wa.me/212777441405?text=Bonjour%2C%20je%20souhaite%20reserver%20une%20voiture."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E5C76B] hover:shadow-[0_14px_30px_rgba(212,175,55,0.35)]"
                >
                  <span>Reserver</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition-all duration-300 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] md:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div
            id="mobile-navigation"
            className={cn(
              "header-mobile mt-3 overflow-hidden rounded-[28px] border border-white/10 transition-all duration-500 md:hidden",
              menuOpen
                ? "max-h-[420px] translate-y-0 opacity-100 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                : "pointer-events-none max-h-0 -translate-y-2 opacity-0",
            )}
          >
            <div className="space-y-6 px-5 py-5">
              <div className="space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm uppercase tracking-[0.2em] text-white/80 transition-all duration-300 hover:border-[#D4AF37]/35 hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#D4AF37]" />
                  </a>
                ))}
              </div>

              <div className="rounded-[24px] border border-[#D4AF37]/18 bg-[#D4AF37]/[0.05] p-4">
                <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#D4AF37]">
                  <Clock3 className="h-3.5 w-3.5" />
                  <span>Disponibilite Immediate</span>
                </div>
                <p className="mb-4 text-sm leading-7 text-white/62">
                  Reservation, livraison a domicile et transferts aeroport 24h/24.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/212777441405?text=Bonjour%2C%20je%20souhaite%20reserver%20une%20voiture."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black"
                  >
                    <span>Reserver sur WhatsApp</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="tel:+212777441405"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm text-white/82"
                  >
                    <PhoneCall className="h-4 w-4 text-[#D4AF37]" />
                    <span>+212 777 441 405</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
