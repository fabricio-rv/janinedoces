"use client"

import { useState, useMemo } from "react"
import { Calculator, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/mock-data"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import { PartyCalculator } from "@/components/party-calculator"

const moods = ["Para Presente", "Para Festas", "Sofisticados", "Lembrancinhas", "Infantil", "Edição Limitada"]

const categories = [
  "Doces Tradicionais",
  "Brigadeiros Gourmet",
  "Especiais de Festa",
  "Trufas",
  "Ovos de Colher",
]

const occasions = [
  "Batizado",
  "Dia das Crianças",
  "Dia das Mães",
  "Dia dos Namorados",
  "Dia dos Pais",
  "Festa Junina",
  "Maternidade",
  "Chá de Bebê",
  "Páscoa",
  "Formatura",
  "Casamento",
  "15 Anos",
]

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.flavors.some((f) => f.toLowerCase().includes(query)) ||
          product.badges.some((b) => b.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false
      }

      // Occasion filter
      if (selectedOccasion && !product.occasions.includes(selectedOccasion)) {
        return false
      }

      // Mood filter
      if (selectedMood && !product.moods.includes(selectedMood)) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedCategory, selectedOccasion, selectedMood])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setSelectedOccasion(null)
    setSelectedMood(null)
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedOccasion || selectedMood

  return (
    <main>
      {/* Hero Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Nosso Catálogo</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore nossa seleção completa de doces finos artesanais
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome, categoria, sabor..."
              className="pl-12 pr-4 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsCalculatorOpen((prev) => !prev)}
            className="gap-2 border-2"
          >
            <Calculator className="h-5 w-5" />
            {isCalculatorOpen ? "Fechar Calculadora" : "Abrir Calculadora de Festa"}
          </Button>
        </div>

        {isCalculatorOpen && <PartyCalculator className="mb-16" />}

        {/* Filter Chips */}
        <div className="mb-8">
          <div className="flex flex-col gap-6">
            {/* Category Filters */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Categorias</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer transition-all px-4 py-2 text-sm ${
                      selectedCategory === category ? "bg-primary hover:bg-primary/90" : "hover:bg-accent"
                    }`}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Mood Filters */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Mood</h3>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <Badge
                    key={mood}
                    variant={selectedMood === mood ? "default" : "outline"}
                    className={`cursor-pointer transition-all px-4 py-2 text-sm ${
                      selectedMood === mood ? "bg-primary hover:bg-primary/90" : "hover:bg-accent"
                    }`}
                    onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
                  >
                    {mood}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Occasion Filters */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Ocasiões</h3>
              <div className="flex flex-wrap gap-2">
                {occasions.map((occasion) => (
                  <Badge
                    key={occasion}
                    variant={selectedOccasion === occasion ? "default" : "outline"}
                    className={`cursor-pointer transition-all px-4 py-2 text-sm ${
                      selectedOccasion === occasion ? "bg-primary hover:bg-primary/90" : "hover:bg-accent"
                    }`}
                    onClick={() => setSelectedOccasion(selectedOccasion === occasion ? null : occasion)}
                  >
                    {occasion}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-6 flex items-center justify-center">
              <Button variant="ghost" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                Limpar filtros
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-center text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg mb-6">Nenhum produto encontrado com os filtros selecionados.</p>
            <Button onClick={clearFilters} variant="outline">
              Limpar filtros e ver todos os produtos
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
