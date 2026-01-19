"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Check, ShoppingBag, Calculator } from "lucide-react"
import { useQuoteBag } from "@/components/quote-bag-provider"
import { dadosMonteCaixaDoces } from "@/data/monte-caixa"
import { PartyCalculator } from "@/components/party-calculator"

const { categorias, tamanhosPequenos, tamanhosGrandes, saboresDisponiveis, precosPorCategoria, precosTrufas } =
  dadosMonteCaixaDoces

export default function MonteSuaCaixaPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categorias[0]?.id ?? "")
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null)
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [truffleType, setTruffleType] = useState<"grande" | "media" | null>(null)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const { items, addItem, updateItem, openBag } = useQuoteBag()
  const searchParams = useSearchParams()
  const [isEditing, setIsEditing] = useState(false)
  const [activeEditId, setActiveEditId] = useState<string | null>(null)

  const sizeOptions = useMemo(() => {
    if (selectedCategoryId === "kits") {
      const allowed = new Set(["2", "4", "6", "8", "10", "12"])
      return tamanhosPequenos.filter((size) => allowed.has(size.id))
    }

    if (selectedCategoryId === "trufas") {
      const dozenOption = tamanhosPequenos.find((size) => size.id === "12")
      return dozenOption ? [dozenOption, ...tamanhosGrandes] : [...tamanhosGrandes]
    }

    return tamanhosGrandes
  }, [selectedCategoryId])
  const isTrufas = selectedCategoryId === "trufas"
  const totalSteps = isTrufas ? 4 : 3
  const selectedSize = useMemo(
    () => sizeOptions.find((size) => size.id === selectedSizeId),
    [sizeOptions, selectedSizeId],
  )
  const unitPrice = isTrufas
    ? truffleType === "grande"
      ? precosTrufas.grande
      : truffleType === "media"
        ? precosTrufas.media
        : 0
    : precosPorCategoria[selectedCategoryId as keyof typeof precosPorCategoria] ?? 0
  const totalPrice = selectedSize ? unitPrice * selectedSize.quantity : 0
  const slotsRemaining = Math.max(0, 4 - selectedFlavors.length)
  const selectedCategoryLabel = categorias.find((cat) => cat.id === selectedCategoryId)?.label
  const saboresFiltrados = useMemo(() => {
    if (!selectedCategoryLabel || selectedCategoryLabel.toLowerCase() === "todas") {
      return saboresDisponiveis
    }
    const target = selectedCategoryLabel.toLowerCase()
    return saboresDisponiveis.filter((flavor) => flavor.category.toLowerCase() === target)
  }, [selectedCategoryLabel])

  useEffect(() => {
    const editId = searchParams.get("editId")
    if (!editId) {
      setIsEditing(false)
      setActiveEditId(null)
      return
    }

    if (activeEditId === editId) return

    const item = items.find((entry) => entry.id === editId)
    if (item && item.type === "box") {
      setSelectedCategoryId(item.categoryId ?? categorias[0]?.id ?? "")
      setSelectedSizeId(item.sizeId ?? null)
      setSelectedFlavors(item.flavors ?? [])
      setTruffleType(item.truffleType ?? null)
      if (item.categoryId === "trufas") {
        setCurrentStep(item.truffleType ? 4 : 2)
      } else {
        setCurrentStep(3)
      }
      setIsEditing(true)
      setActiveEditId(editId)
    }
  }, [searchParams, items, activeEditId])

  const toggleFlavor = (flavorId: string) => {
    if (selectedFlavors.includes(flavorId)) {
      setSelectedFlavors(selectedFlavors.filter((f) => f !== flavorId))
      return
    }

    if (selectedFlavors.length < 4) {
      setSelectedFlavors([...selectedFlavors, flavorId])
    }
  }

  const handleAddToBag = () => {
    if (!selectedSize) return
    if (isTrufas && !truffleType) return
    const selectedCategory = categorias.find((cat) => cat.id === selectedCategoryId)
    const flavorNames = selectedFlavors.map((id) => saboresDisponiveis.find((f) => f.id === id)?.name).join(", ")

    const itemId = isEditing && activeEditId ? activeEditId : `custom-box-${Date.now()}`
    const payload = {
      id: itemId,
      name: `${selectedCategory?.label ?? "Caixa"} ${selectedSize.label} - Personalizada`,
      price: totalPrice,
      quantity: 1,
      truffleType: truffleType ?? undefined,
      minOrder: `Categoria: ${selectedCategory?.label ?? "-"} | Sabores: ${flavorNames}`,
      image: "custom-gift-box",
      type: "box" as const,
      categoryId: selectedCategoryId,
      sizeId: selectedSize.id,
      flavors: selectedFlavors,
    }

    if (isEditing) {
      updateItem(itemId, payload)
    } else {
      addItem(payload)
    }

    openBag()

    // Reset
    setSelectedFlavors([])
    setSelectedSizeId(null)
    setTruffleType(null)
    setCurrentStep(1)
    setIsEditing(false)
    setActiveEditId(null)
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
        <div className="mb-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsCalculatorOpen((prev) => !prev)}
            className="gap-2 border-2 transition-all duration-300 ease-in-out"
          >
            <Calculator className="h-5 w-5" />
            {isCalculatorOpen ? "Fechar Calculadora" : "Abrir Calculadora de Festa"}
          </Button>
        </div>

        {isCalculatorOpen && <PartyCalculator className="mb-16" />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Builder Steps */}
          <div className="lg:col-span-2 space-y-12">
            <div key={currentStep} className="animate-in fade-in slide-in-from-right-4 duration-500 ease-in-out">
              {/* Step 1: Categoria */}
              {currentStep === 1 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <h2 className="text-3xl font-serif font-semibold">Escolha a Categoria</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categorias.map((category) => (
                      <Card
                        key={category.id}
                        className={`p-6 cursor-pointer transition-all duration-300 ease-in-out border-2 hover:border-primary ${
                          selectedCategoryId === category.id ? "bg-primary border-primary text-gray-900" : ""
                        }`}
                        onClick={() => {
                          setSelectedCategoryId(category.id)
                          setSelectedSizeId(null)
                          setSelectedFlavors([])
                          setTruffleType(null)
                        }}
                      >
                        <div className="text-center">
                          <p className="text-2xl font-bold">{category.label}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 (Trufas): Tipo de Trufa */}
              {isTrufas && currentStep === 2 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <h2 className="text-3xl font-serif font-semibold">Escolha o Tipo de Trufa</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      className={`p-6 cursor-pointer transition-all duration-300 ease-in-out border-2 hover:border-primary ${
                        truffleType === "grande" ? "bg-primary border-primary text-gray-900" : ""
                      }`}
                      onClick={() => {
                        setTruffleType("grande")
                      }}
                    >
                      <div className="text-center">
                        <p className="text-2xl font-bold mb-2">Trufa Grande</p>
                        <p className="text-base font-semibold">R$ 280,00 o cento</p>
                      </div>
                    </Card>
                    <Card
                      className={`p-6 cursor-pointer transition-all duration-300 ease-in-out border-2 hover:border-primary ${
                        truffleType === "media" ? "bg-primary border-primary text-gray-900" : ""
                      }`}
                      onClick={() => {
                        setTruffleType("media")
                      }}
                    >
                      <div className="text-center">
                        <p className="text-2xl font-bold mb-2">Trufa Média</p>
                        <p className="text-base font-semibold">R$ 230,00 o cento</p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Step 2/3: Tamanho */}
              {currentStep === (isTrufas ? 3 : 2) && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {isTrufas ? 3 : 2}
                    </div>
                    <h2 className="text-3xl font-serif font-semibold">Escolha o Tamanho</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sizeOptions.map((size) => (
                      <Card
                        key={size.id}
                        className={`p-6 cursor-pointer transition-all duration-300 ease-in-out border-2 hover:border-primary ${
                          selectedSizeId === size.id ? "bg-primary border-primary text-gray-900" : ""
                        }`}
                        onClick={() => {
                          setSelectedSizeId(size.id)
                          setSelectedFlavors([])
                        }}
                      >
                        <div className="text-center">
                          <p className="text-2xl font-bold mb-2">{size.label}</p>
                          <p className="text-2xl font-bold">
                            R$ {(unitPrice * size.quantity).toFixed(2)}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3/4: Sabores */}
              {currentStep === (isTrufas ? 4 : 3) && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {isTrufas ? 4 : 3}
                    </div>
                    <h2 className="text-3xl font-serif font-semibold">Escolha os Sabores (até 4)</h2>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/60 text-foreground">
                      <span className="font-semibold text-foreground">Sabores selecionados:</span>
                      <span className="text-lg">
                        <span className="text-primary font-bold">{selectedFlavors.length}</span> / 4
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {saboresFiltrados.map((flavor) => {
                      const isSelected = selectedFlavors.includes(flavor.id)
                      const isDisabled = selectedFlavors.length >= 4 && !isSelected

                      return (
                        <Card
                          key={flavor.id}
                          className={`relative p-6 cursor-pointer transition-all duration-300 ease-in-out border-2 hover:border-primary ${
                            isSelected
                              ? "bg-primary border-primary text-gray-900"
                              : isDisabled
                                ? "border-border bg-muted opacity-50 cursor-not-allowed"
                                : ""
                          }`}
                          onClick={() => {
                            if (isDisabled) return
                            toggleFlavor(flavor.id)
                          }}
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
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Wizard Controls */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="transition-all duration-300 ease-in-out"
              >
                Voltar
              </Button>
              {currentStep < totalSteps ? (
                <Button
                  className="bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out"
                  onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
                  disabled={
                    (currentStep === 1 && !selectedCategoryId) ||
                    (currentStep === 2 && isTrufas && !truffleType) ||
                    (currentStep === 2 && !isTrufas && !selectedSizeId) ||
                    (currentStep === 3 && isTrufas && !selectedSizeId)
                  }
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  className="bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out"
                  disabled={selectedFlavors.length === 0 || (isTrufas && !truffleType)}
                  onClick={handleAddToBag}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {isEditing ? "Atualizar Pedido" : "Finalizar"}
                </Button>
              )}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 border-2">
              <h3 className="text-2xl font-serif font-semibold mb-6">Sua Caixa</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categoria:</span>
                  <span className="font-semibold">
                    {categorias.find((cat) => cat.id === selectedCategoryId)?.label ?? "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tamanho:</span>
                  <span className="font-semibold">{selectedSize?.label ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sabores escolhidos:</span>
                  <span className="font-semibold">{selectedFlavors.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Selecionados:</span>
                  <span className="font-semibold">
                    {selectedFlavors.length} / 4
                  </span>
                </div>
              </div>

              {selectedFlavors.length > 0 && (
                <div className="mb-6 p-4 bg-secondary rounded-lg">
                  <p className="font-semibold mb-2 text-sm text-muted-foreground">Sabores selecionados:</p>
                  <ul className="space-y-1 text-sm">
                    {selectedFlavors.map((flavorId) => {
                      const flavor = saboresDisponiveis.find((f) => f.id === flavorId)
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
                  <span className="font-bold text-primary">
                    {selectedSize ? `R$ ${totalPrice.toFixed(2)}` : "-"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Valor por caixa</p>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out"
                disabled={selectedFlavors.length === 0 || !selectedSize}
                onClick={handleAddToBag}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {isEditing ? "Atualizar Pedido" : "Finalizar"}
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
