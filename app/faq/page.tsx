import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { faqs } from "@/lib/mock-data"

export default function FAQPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Perguntas Frequentes</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Encontre respostas para as dúvidas mais comuns sobre nossos doces finos
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-2 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-16 text-center p-8 bg-secondary rounded-lg">
            <h3 className="text-2xl font-serif font-semibold mb-4">Ainda tem dúvidas?</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Entre em contato conosco pelo WhatsApp e teremos prazer em ajudar
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a
                href={`https://wa.me/5551998116188?text=${encodeURIComponent("Olá! Tenho uma dúvida sobre os doces finos.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
