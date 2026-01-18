"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuoteBag } from "@/components/quote-bag-provider"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items, toggleBag } = useQuoteBag()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl lg:text-3xl font-serif font-semibold text-foreground hover:text-primary transition-colors"
        >
          Janine Bicca
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ModeToggle />
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Início
          </Link>
          <Link href="/catalogo" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Catálogo
          </Link>
          <Link
            href="/monte-sua-caixa"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Monte sua Caixa
          </Link>
          <Link href="/galeria" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Galeria
          </Link>
          <Link href="/sobre" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Sobre
          </Link>
          <Button variant="ghost" size="icon" className="relative" onClick={toggleBag}>
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="ghost" size="icon" className="relative" onClick={toggleBag}>
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <Link
              href="/"
              className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/catalogo"
              className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Catálogo
            </Link>
            <Link
              href="/monte-sua-caixa"
              className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Monte sua Caixa
            </Link>
            <Link
              href="/galeria"
              className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Galeria
            </Link>
            <Link
              href="/sobre"
              className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
