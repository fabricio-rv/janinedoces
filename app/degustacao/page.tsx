"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Sparkles } from "lucide-react"
import { dadosTasting } from "@/data/tasting"

export default function DegustacaoPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "",
    neighborhood: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const message = `${dadosTasting.ctaTag}\n\nNome: ${formData.name}\nTelefone: ${formData.phone}\nData do Evento: ${formData.date}\nNúmero de Convidados: ${formData.guests}\nBairro: ${formData.neighborhood}\n\nMensagem: ${formData.message || "Gostaria de solicitar um kit degustação."}`

    const whatsappUrl = `https://wa.me/5551998116188?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <main>
      {/* Hero */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground">{dadosTasting.name}</h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">{dadosTasting.description}</p>
            <p className="text-sm text-muted-foreground italic mt-4">{dadosTasting.note}</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 border-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(51) 99999-9999"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="date">Data do Evento *</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="guests">Número de Convidados *</Label>
                <Input
                  id="guests"
                  type="number"
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  placeholder="Ex: 50"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="neighborhood">Bairro (Porto Alegre) *</Label>
                <Input
                  id="neighborhood"
                  required
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  placeholder="Ex: Moinhos de Vento"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Mensagem adicional (opcional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Conte-nos mais sobre seu evento..."
                  className="mt-2 min-h-32"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                Solicitar Degustação via WhatsApp
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Ao enviar, você será redirecionado ao WhatsApp para confirmar sua solicitação
              </p>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
