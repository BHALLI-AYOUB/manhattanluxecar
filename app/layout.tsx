import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Manhattan Luxe Car | Location de Voitures de Luxe à Casablanca & El Jadida",
  description:
    "Manhattan Luxe Car - Agence de location de voitures de prestige à Casablanca et El Jadida. Mercedes, Range Rover, BMW, Porsche. Service chauffeur VIP, transferts aéroport Mohammed V. Réservation WhatsApp 24/7.",
  keywords: [
    "location voiture luxe Casablanca",
    "voiture prestige Maroc",
    "location Mercedes Casablanca",
    "Range Rover location Maroc",
    "chauffeur aéroport Casablanca",
    "location voiture El Jadida",
    "voiture luxe mariage Casablanca",
    "transfert aéroport Mohammed V",
    "location BMW luxe Maroc",
    "Porsche location Casablanca",
    "voiture VIP Maroc",
    "rent luxury car Morocco",
  ],
  authors: [{ name: "Manhattan Luxe Car" }],
  creator: "Manhattan Luxe Car",
  publisher: "Manhattan Luxe Car",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Manhattan Luxe Car | Location de Voitures de Luxe à Casablanca",
    description:
      "Roulez en style avec Manhattan Luxe Car. Voitures de prestige, service chauffeur VIP, transferts aéroport. Réservation rapide via WhatsApp.",
    type: "website",
    locale: "fr_MA",
    siteName: "Manhattan Luxe Car",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manhattan Luxe Car | Location Voitures de Luxe",
    description: "Voitures de prestige à Casablanca & El Jadida. Service VIP 24/7.",
  },
  alternates: {
    languages: {
      "fr-MA": "/",
    },
  },
  category: "Automotive",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "Manhattan Luxe Car",
    description:
      "Agence de location de voitures de prestige à Casablanca et El Jadida. Véhicules haut de gamme, service chauffeur aéroport.",
    url: "https://manhattanluxecar.com",
    telephone: "+212777441405",
    email: "manhattanluxecar@outlook.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Casablanca & El Jadida",
      addressLocality: "Casablanca",
      addressRegion: "Casablanca-Settat",
      addressCountry: "MA",
    },
    areaServed: [
      { "@type": "City", name: "Casablanca" },
      { "@type": "City", name: "El Jadida" },
      { "@type": "City", name: "Rabat" },
      { "@type": "City", name: "Marrakech" },
    ],
    priceRange: "$$$$",
    openingHours: "Mo-Su 00:00-24:00",
    sameAs: [
      "https://wa.me/212777441405",
      "https://www.facebook.com/profile.php?id=61584072572803",
      "https://www.tiktok.com/@manhattan_luxecar",
      "https://www.instagram.com/manhattanluxecar",
      "mailto:manhattanluxecar@outlook.com",
    ],
  }

  return (
    <html lang="fr">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Third-party live chat widget (replace with your provider ID) */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/000000000000000000000000/default';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
