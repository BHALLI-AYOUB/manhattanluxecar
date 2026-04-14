"use client"

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import { Bot, MessageCircle, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"

type ChatMessage = {
  id: string
  role: "user" | "bot"
  text: string
  timestamp: string
}

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "bot",
    text: "Bonjour ! Je suis votre assistant virtuel. Posez-moi une question ou choisissez une option ci-dessous pour commencer.",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
]

type Flow = "idle" | "booking" | "booking-confirm" | "tarifs" | "chauffeur" | "whatsapp"

type BookingData = {
  vehicle?: string
  date?: string
  location?: string
}

const quickOptions = [
  { id: "reserve", label: "Réserver une voiture" },
  { id: "tarifs", label: "Voir les tarifs" },
  { id: "chauffeur", label: "Service chauffeur" },
  { id: "whatsapp", label: "Parler sur WhatsApp" },
]

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/212777441405?text=${encoded}`
}

function getAssistantReply(flow: Flow, booking: BookingData, message: string) {
  const normalized = message.trim().toLowerCase()
  const isYes = /^(oui|yes|ok|d'accord|oui,?)/i.test(message.trim())
  const isNo = /^(non|no|pas)/i.test(normalized)

  // === Cancel / Reset ===
  if (normalized.includes("annuler") || normalized.includes("annule")) {
    return {
      reply: "Conversation réinitialisée. Dites-moi comment je peux vous aider : réservation, tarifs ou service chauffeur.",
      nextFlow: "idle",
      nextBooking: {},
    }
  }

  // === WhatsApp / Live chat ===
  if (normalized.includes("whatsapp") || normalized.includes("whats")) {
    return {
      reply:
        "Pour une réponse immédiate, cliquez sur le bouton WhatsApp en bas à droite et parlez directement à notre équipe. Nous sommes disponibles 24/7.",
      nextFlow: "idle",
      nextBooking: {},
    }
  }

  // === Idle triggers (start a new workflow) ===
  if (flow === "idle") {
    if (normalized.includes("réserver") || normalized.includes("reserver")) {
      return {
        reply:
          "Super ! Quel modèle ou catégorie souhaitez-vous réserver ? (ex: Range Rover Sport, SUV, Berline)",
        nextFlow: "booking",
        nextBooking: {},
      }
    }

    if (normalized.includes("tarif") || normalized.includes("prix")) {
      return {
        reply:
          "Nos tarifs dépendent du modèle et de la durée. Quel véhicule vous intéresse ? (ex: Range Rover Sport, Clio, Mercedes)",
        nextFlow: "tarifs",
        nextBooking: {},
      }
    }

    if (normalized.includes("chauffeur")) {
      return {
        reply:
          "Très bien ! Indiquez-moi votre ville et la date souhaitée pour que je vous propose un tarif chauffeur VIP.",
        nextFlow: "chauffeur",
        nextBooking: {},
      }
    }
  }

  // === Booking flow ===
  if (flow === "booking") {
    if (!booking.vehicle) {
      return {
        reply:
          "Super ! Quel modèle ou catégorie souhaitez-vous réserver ? (ex: Range Rover Sport, SUV, Berline)",
        nextFlow: "booking",
        nextBooking: { ...booking, vehicle: message.trim() },
      }
    }

    if (!booking.date) {
      return {
        reply: "Parfait. Quelle date souhaitez-vous ? (ex: 25/03/2026)",
        nextFlow: "booking",
        nextBooking: { ...booking, date: message.trim() },
      }
    }

    if (!booking.location) {
      return {
        reply:
          "Merci ! Où souhaitez-vous récupérer le véhicule ? (ex: Casablanca, El Jadida)",
        nextFlow: "booking",
        nextBooking: { ...booking, location: message.trim() },
      }
    }

    const summary = `Parfait ! Voici ce que j'ai :\n• Véhicule : ${booking.vehicle}\n• Date : ${booking.date}\n• Lieu : ${booking.location}\n\nSouhaitez-vous que je vous envoie le lien WhatsApp pour finaliser la réservation ?`
    return {
      reply: summary,
      nextFlow: "booking-confirm",
      nextBooking: booking,
    }
  }

  if (flow === "booking-confirm") {
    if (isYes) {
      const whatsappMessage = `Bonjour, je souhaite réserver une voiture (${booking.vehicle}) le ${booking.date} à ${booking.location}. Merci de me confirmer la disponibilité.`
      return {
        reply: `Génial ! Voici le lien WhatsApp pour continuer : ${buildWhatsAppLink(whatsappMessage)}`,
        nextFlow: "idle",
        nextBooking: {},
      }
    }

    if (isNo) {
      return {
        reply: "Pas de problème, je reste à votre disposition. Dites-moi si vous souhaitez un autre modèle ou service.",
        nextFlow: "idle",
        nextBooking: {},
      }
    }

    return {
      reply: "Répondez simplement par 'Oui' pour obtenir le lien WhatsApp ou 'Non' pour arrêter.",
      nextFlow: "booking-confirm",
      nextBooking: booking,
    }
  }

  // === Tarifs ===
  if (flow === "tarifs") {
    const model = message.trim() || "le modèle souhaité"
    return {
      reply: `Pour **${model}**, les tarifs commencent généralement à 450 MAD/jour (variable selon disponibilité et options). Je peux vous envoyer un lien WhatsApp pour réserver ou répondre à d'autres questions.`,
      nextFlow: "idle",
      nextBooking: {},
    }
  }

  // === Chauffeur ===
  if (flow === "chauffeur") {
    const detail = message.trim() || "votre emplacement et date"
    return {
      reply: `Pour ${detail}, nous proposons un service chauffeur VIP à partir de 650 MAD/heure (tarif indicatif). Cliquez sur le bouton WhatsApp pour discuter des détails et confirmer la réservation.`,
      nextFlow: "idle",
      nextBooking: {},
    }
  }

  // === Default ===
  return {
    reply:
      "Merci pour votre message ! Notre équipe vous répondra rapidement, ou utilisez le bouton WhatsApp en bas à droite pour une réponse immédiate.",
    nextFlow: "idle",
    nextBooking: {},
  }
}

export default function Chatbot() {
  const [flow, setFlow] = useState<Flow>("idle")
  const [bookingData, setBookingData] = useState<BookingData>({})
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const toggle = () => setIsOpen((prev) => !prev)

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      text: text.trim(),
      timestamp: formatTime(new Date()),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    const { reply, nextFlow, nextBooking } = getAssistantReply(flow, bookingData, text)

    window.setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `${Date.now()}-bot`,
        role: "bot",
        text: reply,
        timestamp: formatTime(new Date()),
      }

      setMessages((prev) => [...prev, botMessage])
      setFlow(nextFlow)
      setBookingData(nextBooking)
      setIsTyping(false)
    }, 750)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    sendMessage(input)
  }

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isOpen])

  const quickActions = useMemo(() => {
    if (flow === "booking") {
      return [
        { id: "annuler", label: "Annuler" },
        { id: "whatsapp", label: "Parler sur WhatsApp" },
      ]
    }

    if (flow === "booking-confirm") {
      return [
        { id: "oui", label: "Oui" },
        { id: "non", label: "Non" },
        { id: "annuler", label: "Annuler" },
      ]
    }

    return quickOptions
  }, [flow])

  const hasMessages = messages.length > 0

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {isOpen && (
        <div className="glass w-[360px] max-w-[90vw] shadow-2xl border border-white/10 backdrop-blur-xl overflow-hidden">
          <header className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-[#D4AF37]/20">
                <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Assistant virtuel</p>
                <p className="text-xs text-white/60">Prêt à vous aider 24/7</p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggle}
              className="rounded-full p-2 text-white/70 hover:text-white hover:bg-white/10 transition"
              aria-label="Fermer la conversation"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          <div className="max-h-72 overflow-y-auto px-4 py-3 space-y-3" ref={scrollRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "bot" ? "justify-start" : "justify-end",
                )}
              >
                {message.role === "bot" && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed",
                    message.role === "bot"
                      ? "bg-white/10 text-white"
                      : "bg-[#D4AF37]/15 text-white",
                  )}
                >
                  <p className="break-words whitespace-pre-wrap">{message.text}</p>
                  <p className="text-[10px] text-white/50 mt-1 text-right">{message.timestamp}</p>
                </div>
                {message.role === "user" && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                    <span className="text-xs">Vous</span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-white/80">Écriture...</div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            {hasMessages && (
              <div className="flex flex-wrap gap-2 mb-3">
                {quickActions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => sendMessage(option.label)}
                    className="rounded-full px-3 py-1.5 text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Écrivez un message..."
                className="flex-1 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60"
              />
              <button
                type="submit"
                className="rounded-full bg-[#D4AF37] p-2 text-black shadow hover:bg-[#E5C76B] transition"
                aria-label="Envoyer un message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={toggle}
        className={cn(
          "group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-black shadow-xl transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60",
          isOpen && "animate-pulse",
        )}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Chatbot</span>
        <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-[10px] text-white">
          {isOpen ? "ON" : "?"}
        </span>
      </button>
    </div>
  )
}
