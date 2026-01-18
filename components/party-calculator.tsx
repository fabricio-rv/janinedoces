"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Users, Sparkles } from "lucide-react"

interface PartyCalculatorProps {
  className?: string
}

export function PartyCalculator({ className }: PartyCalculatorProps) {
  const [guests, setGuests] = useState<number>(0)

  // Calculation: 3-5 sweets per person
  const minSweets = guests * 3
  const maxSweets = guests * 5
  const recommendedSweets = Math.round(guests * 4)

  return (
    <Card className={`p-8 border-2 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-8 w-8 text-primary" />
        <h2 className="text-3xl font-serif font-semibold">Calculadora de Festa</h2>
      </div>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        Descubra a quantidade ideal de doces para o seu evento
      </p>

      <div className="space-y-6">
        <div>
          <Label htmlFor="guests" className="text-lg">
            Número de convidados
          </Label>
          <Input
            id="guests"
            type="number"
            min="0"
            value={guests || ""}
            onChange={(e) => setGuests(Number.parseInt(e.target.value) || 0)}
            placeholder="Digite o número de convidados"
            className="mt-2 text-lg py-6"
          />
        </div>

        {guests > 0 && (
          <div className="space-y-4 p-6 bg-gradient-to-br from-accent to-secondary rounded-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-2">Recomendação</h3>
                <p className="text-4xl font-bold text-primary mb-4">{recommendedSweets} doces</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Para {guests} convidados, recomendamos entre {minSweets} e {maxSweets} doces finos. Nossa sugestão é{" "}
                  {recommendedSweets} unidades para garantir que todos sejam bem servidos.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <h4 className="font-semibold mb-2">Sugestões de caixas:</h4>
              <ul className="space-y-2 text-sm">
                {recommendedSweets >= 50 && (
                  <li className="flex justify-between">
                    <span>2x Caixa de 50 unidades</span>
                    <span className="text-primary font-semibold">R$ 250,00</span>
                  </li>
                )}
                {recommendedSweets >= 100 && (
                  <li className="flex justify-between">
                    <span>1x Caixa de 100 unidades</span>
                    <span className="text-primary font-semibold">R$ 195,00</span>
                  </li>
                )}
                {recommendedSweets < 50 && (
                  <li className="text-muted-foreground">Monte caixas personalizadas de 6, 12 ou 24 unidades</li>
                )}
              </ul>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 mt-4" asChild>
              <a
                href={`https://wa.me/5551998116188?text=${encodeURIComponent(`Olá! Preciso de ${recommendedSweets} doces finos para ${guests} convidados. Pode me ajudar com um orçamento?`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Orçamento no WhatsApp
              </a>
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
