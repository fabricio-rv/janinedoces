import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { seasonal, tasting } from "@/lib/mock-data"
import { Footer } from "@/components/footer"
import { client } from "@/sanity/lib/client"
import { Hero } from "@/components/hero"

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero Background Carousel */}
        <Hero />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-background mb-6 text-balance">
            Doces que Transformam Momentos em Memórias
          </h1>
          <p className="text-xl md:text-2xl text-background/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Criações artesanais de alta qualidade para celebrar seus momentos mais especiais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
              <Link href="/catalogo">
                Ver Cardápio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-background/95 hover:bg-background border-2"
            >
              <Link
                href={`https://wa.me/5551998116188?text=${encodeURIComponent("Olá Janine! Gostaria de fazer um orçamento.")}`}
              >
                Montar Pedido no WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Preview - Moved to first position after hero */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">Doces</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Nossas especialidades mais amadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="aspect-square mb-6 rounded-lg overflow-hidden">
              <img src="/inicio/doces1.jpg" alt="Trufas" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-serif font-semibold mb-3">Trufas Belgas</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Chocolate belga premium com recheios sofisticados
            </p>
            <Button asChild variant="outline">
              <Link href="/catalogo?category=Trufas">Ver Trufas</Link>
            </Button>
          </div>

          <div className="text-center">
            <div className="aspect-square mb-6 rounded-lg overflow-hidden">
              <img src="/inicio/doces2.jpg" alt="Brigadeiros" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-serif font-semibold mb-3">Brigadeiros Gourmet</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">Sabores exclusivos com ingredientes nobres</p>
            <Button asChild variant="outline">
              <Link href="/catalogo?category=Brigadeiros">Ver Brigadeiros</Link>
            </Button>
          </div>

          <div className="text-center">
            <div className="aspect-square mb-6 rounded-lg overflow-hidden">
              <img src="/inicio/doces3.jpg" alt="Doces Finos" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-serif font-semibold mb-3">Doces Finos</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">Criações artesanais para ocasiões especiais</p>
            <Button asChild variant="outline">
              <Link href="/catalogo?category=Doces Finos">Ver Doces Finos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tasting Kit CTA - Moved before Páscoa */}
      {tasting.enabled && (
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">{tasting.name}</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{tasting.description}</p>
              <p className="text-sm text-muted-foreground mb-8 italic">{tasting.note}</p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/degustacao">Solicitar Degustação</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Easter Seasonal Section - Redesigned with grid layout */}
      {seasonal.easterEnabled && (
        <section className="py-24 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="h-6 w-6" />
                <h2 className="text-4xl md:text-5xl font-serif font-semibold">Páscoa</h2>
                <Sparkles className="h-6 w-6" />
              </div>
              <p className="text-lg mb-6">
                Sabores exclusivos: {seasonal.exampleFlavors.join(", ")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="aspect-square mb-6 rounded-lg overflow-hidden">
                  <img src="/inicio/ovo1.jpg" alt="Páscoa" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Ovos Premium</h3>
                <p className="mb-4 leading-relaxed">
                  Ovos artesanais com chocolate belga e recheios sofisticados
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/catalogo?category=Páscoa">Ver Coleção</Link>
                </Button>
              </div>

              <div className="text-center">
                <div className="aspect-square mb-6 rounded-lg overflow-hidden">
                  <img src="/inicio/ovo2.jpg" alt="Ovos Personalizados" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Ovos Personalizados</h3>
                <p className="mb-4 leading-relaxed">
                  Criações exclusivas com seus sabores e designs personalizados
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/catalogo?category=Páscoa">Ver Opções</Link>
                </Button>
              </div>

              <div className="text-center">
                <div className="aspect-square mb-6 rounded-lg overflow-hidden">
                  <img src="/inicio/ovo3.jpg" alt="Kits Especiais" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Kits Especiais</h3>
                <p className="mb-4 leading-relaxed">
                  Combinações temáticas perfeitas para presentear
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/catalogo?category=Páscoa">Explorar Kits</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Timeline */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">Como Funciona</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Do primeiro contato até a entrega perfeita
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Degustação</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Experimente nossos sabores e escolha seus favoritos
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Escolha</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Monte seu pedido com os produtos que mais combinam com você
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Produção</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Produzimos com carinho e atenção a cada detalhe
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Entregamos no prazo com embalagem impecável
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-secondary to-accent rounded-2xl p-12">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6 text-balance">
            Pronto para Criar Memórias Deliciosas?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Entre em contato e vamos planejar juntos o doce perfeito para o seu momento especial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
              <Link href="/catalogo">Explorar Catálogo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2 bg-transparent">
              <Link
                href={`https://wa.me/5551998116188?text=${encodeURIComponent("Olá Janine! Quero fazer uma encomenda especial.")}`}
              >
                Falar no WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
