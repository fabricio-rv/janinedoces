import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { collections, products } from "@/lib/mock-data"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ArrowLeft } from "lucide-react"

export async function generateStaticParams() {
  return collections.map((collection) => ({
    id: collection.id,
  }))
}

export default function CollectionPage({ params }: { params: { id: string } }) {
  const collection = collections.find((c) => c.id === params.id)

  if (!collection) {
    notFound()
  }

  // Filter products based on collection
  let filteredProducts = products
  if (collection.id === "eventos") {
    filteredProducts = products.filter((p) =>
      p.occasions.some((o) => ["Casamento / Noivado", "Formatura", "15 Anos"].includes(o)),
    )
  } else if (collection.id === "presentes") {
    filteredProducts = products.filter((p) => p.moods.includes("Para presente"))
  } else if (collection.id === "sazonais") {
    filteredProducts = products.filter((p) => p.category === "Páscoa")
  } else if (collection.id === "assinatura") {
    filteredProducts = products.filter((p) => p.badges.includes("Premium") || p.badges.includes("Linha fina"))
  }

  return (
    <main>
      {/* Collection Header */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/colecoes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Coleções
            </Link>
          </Button>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">{collection.name}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{collection.description}</p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhum produto encontrado nesta coleção.</p>
            <Button asChild className="mt-6 bg-transparent" variant="outline">
              <Link href="/catalogo">Ver Catálogo Completo</Link>
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
