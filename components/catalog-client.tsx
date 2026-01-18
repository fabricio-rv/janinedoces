//NAO USADO ATUALMENTE//

"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"

// Opções iguais as que definimos no Sanity
const categories = ["Trufas", "Doces Finos", "Brigadeiros", "Páscoa", "Presentes"]
const occasions = ["Dia das Mães", "Corporativo", "Casamento", "Dia dos Namorados"]

export default function CatalogClient({ products }: { products: any[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Filtro de Texto (Nome, Categoria, Sabores)
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          (product.category && product.category.toLowerCase().includes(query)) ||
          (product.flavors && product.flavors.some((f: string) => f.toLowerCase().includes(query))) ||
          (product.badge && product.badge.toLowerCase().includes(query))
        
        if (!matchesSearch) return false
      }

      // 2. Filtro de Categoria
      if (selectedCategory) {
        // Normaliza para comparar (ex: "Doces Finos" vira "doces-finos")
        const categorySlug = selectedCategory.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        
        // Compara com o slug ou com o nome exato
        if (product.category !== categorySlug && product.category !== selectedCategory) {
            return false
        }
      }

      // 3. Filtro de Ocasião
      if (selectedOccasion) {
        if (!product.occasions || !product.occasions.includes(selectedOccasion)) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, selectedCategory, selectedOccasion, products])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setSelectedOccasion(null)
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedOccasion

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
        {/* Barra de Busca */}
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

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-col gap-6">
            
            {/* Categorias */}
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

            {/* Ocasiões */}
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

          {/* Botão Limpar Filtros */}
          {hasActiveFilters && (
            <div className="mt-6 flex items-center justify-center">
              <Button variant="ghost" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                Limpar filtros
              </Button>
            </div>
          )}
        </div>

        {/* Contador de Resultados */}
        <div className="mb-8">
          <p className="text-center text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
        </div>

        {/* GRID DE PRODUTOS */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={{
                  id: product.slug, // CORREÇÃO 1: Slug no lugar do ID para o link funcionar
                  name: product.name,
                  price: product.price,
                  description: product.description,
                  image: product.imageUrl || "", 
                  category: product.category,
                  badges: product.badge ? [product.badge] : [],
                  // CORREÇÃO 2: Mock data para satisfazer o TypeScript
                  moods: [], 
                  occasions: product.occasions || []
                } as any} // CORREÇÃO 3: "as any" para ignorar erro de tipo
              />
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