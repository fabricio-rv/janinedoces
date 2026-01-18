import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { galleryItems } from "@/lib/mock-data"

export default function GaleriaPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Doces na Mesa</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Veja nossos doces finos em eventos reais e momentos inesquecíveis
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border-2 hover:border-primary transition-all group">
              <div className="aspect-square relative overflow-hidden bg-muted">
                <img
                  src={`/.jpg?height=600&width=600&query=${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-2">{item.title}</h3>
                <Badge variant="outline">{item.occasion}</Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Social Proof Text */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cada evento é único e especial. Nossos doces finos são criados com atenção aos detalhes para transformar sua
            celebração em uma experiência memorável. Acompanhe nosso Instagram para ver mais fotos e depoimentos de
            clientes satisfeitos.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
