import type React from "react"
import type { Metadata } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { QuoteBagProvider } from "@/components/quote-bag-provider"
import { QuoteBag } from "@/components/quote-bag"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from '@next/third-parties/google'

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
    google: 'CLuHdnnWRYWbGx-XmzLLP9aaobreqC7xtRV08FM1fWcg',
  },
  keywords: "doces finos, trufas, brigadeiros gourmet, Porto Alegre, doces artesanais, presentes, eventos",
  openGraph: {
    title: "Janine Bicca – Doces Finos",
    description: "Doces finos artesanais de alta qualidade para seus momentos especiais",
    locale: "pt_BR",
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.png", // Nome do arquivo que você colocou na pasta /public ou /app
        type: "image/png", // O MIME type correto para arquivos PNG
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <QuoteBagProvider>
            <Header />
            {children}
            <QuoteBag />
            <Analytics />
          </QuoteBagProvider>
        </ThemeProvider>
      </body>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-HHN730JGCJ"></script>
    </html>
  )
}
