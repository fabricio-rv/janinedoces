import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { collections } from "@/lib/mock-data"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

export default function ColecoesPage() {
  return (
    <main>
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Nossas Coleções</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cada coleção foi cuidadosamente criada para um momento especial da sua vida
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {collections.map((collection) => (
            <Card key={collection.id} className="overflow-hidden border-2 hover:border-primary transition-all">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={`/.jpg?height=600&width=800&query=${collection.image}`}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-4">{collection.name}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">{collection.description}</p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href={`/colecoes/${collection.id}`}>
                    Explorar Coleção
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
