"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Check, ShoppingBag, Calculator } from "lucide-react"
import { useQuoteBag } from "@/components/quote-bag-provider"
import { PartyCalculator } from "@/components/party-calculator"

const boxSizes = [
  { size: 6, price: 33, name: "Caixa 6 unidades" },
  { size: 12, price: 60, name: "Caixa 12 unidades" },
  { size: 24, price: 110, name: "Caixa 24 unidades" },
]

const availableFlavors = [
  { id: "belga", name: "Belga", category: "Chocolate" },
  { id: "meio-amargo", name: "Meio Amargo", category: "Chocolate" },
  { id: "ninho", name: "Ninho", category: "Brigadeiro" },
  { id: "ninho-nutella", name: "Ninho com Nutella", category: "Brigadeiro" },
  { id: "pistache", name: "Pistache", category: "Premium" },
  { id: "avela", name: "Avelã", category: "Chocolate" },
  { id: "maracuja", name: "Maracujá", category: "Frutas" },
  { id: "frutas-vermelhas", name: "Frutas Vermelhas", category: "Frutas" },
  { id: "cafe", name: "Café", category: "Gourmet" },
  { id: "coco", name: "Coco", category: "Tropical" },
  { id: "oreo", name: "Oreo", category: "Brigadeiro" },
  { id: "pacoca", name: "Paçoca", category: "Brigadeiro" },
  { id: "caramelo", name: "Caramelo Salgado", category: "Gourmet" },
  { id: "cappuccino", name: "Cappuccino", category: "Gourmet" },
  { id: "limao", name: "Limão Siciliano", category: "Frutas" },
  { id: "morango", name: "Morango", category: "Frutas" },
]

export default function MonteSuaCaixaPage() {
  const [selectedSize, setSelectedSize] = useState<number>(6)
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [showCalculator, setShowCalculator] = useState(false)
  const { addItem } = useQuoteBag()

  const selectedBoxData = boxSizes.find((b) => b.size === selectedSize)!
  const slotsRemaining = selectedSize - selectedFlavors.length

  const toggleFlavor = (flavorId: string) => {
    if (selectedFlavors.includes(flavorId)) {
      setSelectedFlavors(selectedFlavors.filter((f) => f !== flavorId))
    } else if (selectedFlavors.length < selectedSize) {
      setSelectedFlavors([...selectedFlavors, flavorId])
    }
  }

  const handleAddToBag = () => {
    const flavorNames = selectedFlavors.map((id) => availableFlavors.find((f) => f.id === id)?.name).join(", ")

    addItem({
      id: `custom-box-${Date.now()}`,
      name: `${selectedBoxData.name} - Personalizada`,
      price: selectedBoxData.price,
      quantity: 1,
      minOrder: `Sabores: ${flavorNames}`,
      image: "custom-gift-box",
    })

    // Reset
    setSelectedFlavors([])
    setSelectedSize(6)
  }

  return (
    <main>
      {/* Hero */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              Monte sua Caixa de Presente
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Crie uma caixa personalizada escolhendo os sabores que você mais ama
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Party Calculator Toggle */}
        <div className="mb-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowCalculator(!showCalculator)}
            className="gap-2 border-2"
          >
            <Calculator className="h-5 w-5" />
            {showCalculator ? "Esconder" : "Abrir"} Calculadora de Festa
          </Button>
        </div>

        {showCalculator && <PartyCalculator className="mb-16" />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Builder Steps */}
          <div className="lg:col-span-2 space-y-12">
            {/* Step 1: Choose Size */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-3xl font-serif font-semibold">Escolha o Tamanho</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {boxSizes.map((box) => (
                  <Card
                    key={box.size}
                    className={`p-6 cursor-pointer transition-all border-2 hover:border-primary ${
                      selectedSize === box.size ? "border-primary bg-accent" : ""
                    }`}
                    onClick={() => {
                      setSelectedSize(box.size)
                      setSelectedFlavors([])
                    }}
                  >
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary mb-2">{box.size}</p>
                      <p className="font-semibold mb-2">unidades</p>
                      <p className="text-2xl font-bold text-foreground">R$ {box.price.toFixed(2)}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Flavors */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-3xl font-serif font-semibold">Escolha os Sabores</h2>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <span className="font-semibold">Sabores selecionados:</span>
                  <span className="text-lg">
                    <span className="text-primary font-bold">{selectedFlavors.length}</span> / {selectedSize}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableFlavors.map((flavor) => {
                  const isSelected = selectedFlavors.includes(flavor.id)
                  const isFull = selectedFlavors.length >= selectedSize && !isSelected

                  return (
                    <button
                      key={flavor.id}
                      onClick={() => toggleFlavor(flavor.id)}
                      disabled={isFull}
                      className={`p-4 rounded-lg border-2 transition-all text-left relative ${
                        isSelected
                          ? "border-primary bg-accent"
                          : isFull
                            ? "border-border bg-muted opacity-50 cursor-not-allowed"
                            : "border-border hover:border-primary"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                      <p className="font-semibold mb-1 pr-8">{flavor.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {flavor.category}
                      </Badge>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 border-2">
              <h3 className="text-2xl font-serif font-semibold mb-6">Sua Caixa</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tamanho:</span>
                  <span className="font-semibold">{selectedSize} unidades</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sabores escolhidos:</span>
                  <span className="font-semibold">{selectedFlavors.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Faltam:</span>
                  <span className={`font-semibold ${slotsRemaining === 0 ? "text-primary" : ""}`}>
                    {slotsRemaining}
                  </span>
                </div>
              </div>

              {selectedFlavors.length > 0 && (
                <div className="mb-6 p-4 bg-secondary rounded-lg">
                  <p className="font-semibold mb-2 text-sm text-muted-foreground">Sabores selecionados:</p>
                  <ul className="space-y-1 text-sm">
                    {selectedFlavors.map((flavorId) => {
                      const flavor = availableFlavors.find((f) => f.id === flavorId)
                      return (
                        <li key={flavorId} className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-primary" />
                          {flavor?.name}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              <div className="border-t border-border pt-6 mb-6">
                <div className="flex justify-between text-xl mb-2">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-primary">R$ {selectedBoxData.price.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Valor por caixa</p>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={selectedFlavors.length !== selectedSize}
                onClick={handleAddToBag}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Adicionar à Sacola
              </Button>

              {slotsRemaining > 0 && (
                <p className="text-sm text-center text-muted-foreground mt-4">
                  Escolha mais {slotsRemaining} {slotsRemaining === 1 ? "sabor" : "sabores"} para continuar
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
