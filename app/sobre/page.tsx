import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Heart, Award, Users, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SobrePage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Sobre Janine Bicca</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Doces finos artesanais que transformam momentos em memórias inesquecíveis
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A Janine Bicca Doces Finos nasceu da paixão por criar experiências gastronômicas únicas e memoráveis. Cada
              doce é uma obra de arte, produzida com ingredientes premium e muito carinho.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Especializada em doces finos artesanais, trabalhamos com trufas belgas, brigadeiros gourmet e criações
              exclusivas para eventos corporativos, casamentos, aniversários e ocasiões especiais em Porto Alegre.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nosso compromisso é com a qualidade, apresentação impecável e sabor excepcional. Cada pedido é tratado com
              atenção individual, garantindo que seus doces sejam perfeitos para o seu momento especial.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-serif font-semibold text-center mb-16">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 text-center border-2">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Feito com Amor</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cada doce é produzido artesanalmente com dedicação e carinho
              </p>
            </Card>

            <Card className="p-8 text-center border-2">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Qualidade Premium</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Usamos apenas ingredientes selecionados e de alta qualidade
              </p>
            </Card>

            <Card className="p-8 text-center border-2">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Atendimento Personalizado</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cada cliente recebe atenção individual e personalizada
              </p>
            </Card>

            <Card className="p-8 text-center border-2">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Experiência Única</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Criamos momentos memoráveis através dos nossos doces
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-semibold text-center mb-16">Como Trabalhamos</h2>

          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Degustação</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Oferecemos kits de degustação para que você possa experimentar nossos sabores antes de fazer sua
                  encomenda. Ideal para quem está planejando eventos e quer ter certeza da escolha perfeita.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Escolha</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Monte seu pedido escolhendo os produtos e sabores que mais combinam com você. Nossa equipe está sempre
                  disponível para sugestões e recomendações personalizadas.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Produção</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cada doce é produzido artesanalmente, com ingredientes frescos e premium. Trabalhamos com atenção aos
                  detalhes para garantir qualidade e sabor excepcionais.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Entrega</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Entregamos no prazo combinado com embalagem impecável. Você também pode optar por retirar no local.
                  Garantimos que seus doces chegarão perfeitos para o seu evento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-semibold mb-6">Pronto para Começar?</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Entre em contato e vamos criar juntos o doce perfeito para o seu momento especial
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/catalogo">Ver Catálogo</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 bg-transparent">
                <a
                  href={`https://wa.me/5551998116188?text=${encodeURIComponent("Olá Janine! Gostaria de saber mais sobre seus doces finos.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
