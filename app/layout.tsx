import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { QuoteBagProvider } from "@/components/quote-bag-provider"
import { QuoteBag } from "@/components/quote-bag"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from "@next/third-parties/google"
import Script from "next/script"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Janine Bicca Doces",
  description:
    "Doces finos artesanais de alta qualidade e sabor inigualável em Porto Alegre e Região Sul. Trufas, brigadeiros gourmet e sabores exclusivos para tornar seus momentos especiais.",
  verification: {
    google: "CLuHdnnWRYWbGx-XmzLLP9aaobreqC7xtRV08FM1fWcg",
  },
  keywords:
    "doces finos, trufas, brigadeiros gourmet, Porto Alegre, doces artesanais, presentes, eventos",
  openGraph: {
    title: "Janine Bicca – Doces Finos",
    description: "Doces finos artesanais de alta qualidade para seus momentos especiais",
    url: "https://janinebiccadoces.com.br/",
    siteName: "Janine Bicca Doces",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://janinebiccadoces.com.br/og.jpg" }],
  },
  alternates: {
    canonical: "https://janinebiccadoces.com.br/",
  },
  icons: {
    // O ?v=2 obriga o Google a re-baixar a imagem e esquecer o cache da V0
    icon: [
      { url: "/icon.png?v=2", type: "image/png" },
    ],
    shortcut: ["/icon.png?v=2"],
    apple: [
      { url: "/apple-icon.png?v=2" },
    ],
  },
}

// ✅ themeColor configurado corretamente para Next 14+
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

const jsonLd = {
  "@context": "https://schema.org/",
  "@type": "Bakery",
  name: "Janine Bicca Doces",
  url: "https://janinebiccadoces.com.br/",
  image: "https://janinebiccadoces.com.br/og.jpg",
  telephone: "+5551998116188",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Porto Alegre",
    addressRegion: "RS",
    addressCountry: "BR",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Script
          id="jsonld-janine"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <GoogleAnalytics gaId="G-HHN730JGCJ" />

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <QuoteBagProvider>
            <Header />
            {children}
            <QuoteBag />
            <Analytics />
          </QuoteBagProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}