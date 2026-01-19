"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Check, ShoppingBag } from "lucide-react"
import { useQuoteBag } from "@/components/quote-bag-provider"
import { dadosMonteOvoPascoa } from "@/data/monte-ovo"

const { tamanhos, cascas, recheios, adicionais } = dadosMonteOvoPascoa

export default function MonteSeuOvoClient() {
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedSizeId, setSelectedSizeId] = useState<string>(tamanhos[0]?.id ?? "")
    const [selectedShellId, setSelectedShellId] = useState<string | null>(null)
    const [selectedFillings, setSelectedFillings] = useState<string[]>([])
    const [selectedToppings, setSelectedToppings] = useState<string[]>([])
    const { items, addItem, updateItem, openBag } = useQuoteBag()
    const searchParams = useSearchParams()
    const [isEditing, setIsEditing] = useState(false)
    const [activeEditId, setActiveEditId] = useState<string | null>(null)

    const selectedSize = useMemo(() => tamanhos.find((size) => size.id === selectedSizeId), [selectedSizeId])
    const maxToppings = selectedSize?.maxToppings ?? 0

    useEffect(() => {
        const editId = searchParams.get("editId")
        if (!editId) {
            setIsEditing(false)
            setActiveEditId(null)
            return
        }

        if (activeEditId === editId) return

        const item = items.find((entry) => entry.id === editId)
        if (item && item.type === "egg") {
            setSelectedSizeId(item.sizeId ?? tamanhos[0]?.id ?? "")
            setSelectedShellId(item.shellId ?? null)
            setSelectedFillings(item.fillings ?? [])
            setSelectedToppings(item.toppings ?? [])
            setCurrentStep(4)
            setIsEditing(true)
            setActiveEditId(editId)
        }
    }, [searchParams, items, activeEditId])

    useEffect(() => {
        if (selectedToppings.length > maxToppings) {
            setSelectedToppings(selectedToppings.slice(0, maxToppings))
        }
    }, [maxToppings, selectedToppings])

    const toggleSelection = (
        id: string,
        selectedList: string[],
        setList: (next: string[]) => void,
        limit?: number,
    ) => {
        if (selectedList.includes(id)) {
            setList(selectedList.filter((item) => item !== id))
            return
        }
        if (limit && selectedList.length >= limit) return
        setList([...selectedList, id])
    }

    const canProceedStep1 = Boolean(selectedSize)
    const canProceedStep2 = Boolean(selectedShellId)
    const canProceedStep3 = selectedFillings.length >= 1 && selectedFillings.length <= 3
    const canProceedStep4 = selectedToppings.length <= maxToppings

    const isReadyToAdd = canProceedStep1 && canProceedStep2 && canProceedStep3 && canProceedStep4

    const handleAddToBag = () => {
        if (!selectedSize) return

        const shellLabel = cascas.find((s) => s.id === selectedShellId)?.label ?? ""
        const fillingLabels = selectedFillings.map((id) => recheios.find((f) => f.id === id)?.label).filter(Boolean)
        const toppingLabels = selectedToppings.map((id) => adicionais.find((t) => t.id === id)?.label).filter(Boolean)

        const itemId = isEditing && activeEditId ? activeEditId : `custom-egg-${Date.now()}`

        const payload = {
            id: itemId,
            name: `Ovo ${selectedSize.label} Personalizado`,
            price: selectedSize.price,
            quantity: 1,
            minOrder: `Casca: ${shellLabel} | Recheios: ${fillingLabels.join(", ")}${toppingLabels.length ? ` | Adicionais: ${toppingLabels.join(", ")}` : ""
                }`,
            image: "custom-easter-egg",
            type: "egg" as const,
            sizeId: selectedSizeId,
            shellId: selectedShellId ?? undefined,
            fillings: selectedFillings,
            toppings: selectedToppings,
        }

        if (isEditing) updateItem(itemId, payload)
        else addItem(payload)

        openBag()

        setSelectedShellId(null)
        setSelectedFillings([])
        setSelectedToppings([])
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
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Monte seu Ovo</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Crie um ovo de Páscoa personalizado escolhendo casca, recheios e adicionais
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Builder Steps */}
                    <div className="lg:col-span-2 space-y-12">
                        <div key={currentStep} className="animate-in fade-in slide-in-from-right-4 duration-500 ease-in-out">
                            {/* Step 1: Tamanho */}
                            {currentStep === 1 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                            1
                                        </div>
                                        <h2 className="text-3xl font-serif font-semibold">Escolha o Tamanho</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {tamanhos.map((size) => (
                                            <Card
                                                key={size.id}
                                                className={`p-6 cursor-pointer transition-all duration-300 ease-in-out border-2 hover:border-primary ${selectedSizeId === size.id ? "bg-primary border-primary text-gray-900" : ""
                                                    }`}
                                                onClick={() => setSelectedSizeId(size.id)}
                                            >
                                                <div className="text-center">
                                                    <p className="text-3xl font-bold mb-2">{size.label}</p>
                                                    {size.description && <p className="text-sm text-muted-foreground mb-2">{size.description}</p>}
                                                    <p className="text-2xl font-bold">R$ {size.price.toFixed(2)}</p>
                                                    <p className="text-xs text-muted-foreground mt-2">Até {size.maxToppings} adicionais</p>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Casca */}
                            {currentStep === 2 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                            2
                                        </div>
                                        <h2 className="text-3xl font-serif font-semibold">Escolha a Casca</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {cascas.map((shell) => {
                                            const isSelected = selectedShellId === shell.id

                                            return (
                                                <Card
                                                    key={shell.id}
                                                    className={`relative p-6 cursor-pointer transition-all duration-300 ease-in-out border-2 hover:border-primary ${isSelected ? "bg-primary border-primary text-gray-900" : ""
                                                        }`}
                                                    onClick={() => setSelectedShellId(shell.id)}
                                                >
                                                    {isSelected && (
                                                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                                            <Check className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                    <p className="font-semibold mb-1 pr-8">{shell.label}</p>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Recheios */}
                            {currentStep === 3 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                            3
                                        </div>
                                        <h2 className="text-3xl font-serif font-semibold">Escolha os Recheios (1 a 3)</h2>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/60 text-foreground">
                                            <span className="font-semibold text-foreground">Recheios selecionados:</span>
                                            <span className="text-lg">
                                                <span className="text-primary font-bold">{selectedFillings.length}</span> / 3
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {recheios.map((filling) => {
                                            const isSelected = selectedFillings.includes(filling.id)
                                            const isFull = selectedFillings.length >= 3 && !isSelected

                                            return (
                                                <Card
                                                    key={filling.id}
                                                    className={`relative p-6 cursor-pointer transition-all duration-300 ease-in-out border-2 hover:border-primary ${isSelected
                                                            ? "bg-primary border-primary text-gray-900"
                                                            : isFull
                                                                ? "border-border bg-muted opacity-50 cursor-not-allowed"
                                                                : ""
                                                        }`}
                                                    onClick={() => {
                                                        if (isFull) return
                                                        toggleSelection(filling.id, selectedFillings, setSelectedFillings, 3)
                                                    }}
                                                >
                                                    {isSelected && (
                                                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                                            <Check className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                    <p className="font-semibold mb-1 pr-8">{filling.label}</p>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Adicionais */}
                            {currentStep === 4 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                            4
                                        </div>
                                        <h2 className="text-3xl font-serif font-semibold">Escolha os Adicionais</h2>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/60 text-foreground">
                                            <span className="font-semibold text-foreground">Adicionais selecionados:</span>
                                            <span className="text-lg">
                                                <span className="text-primary font-bold">{selectedToppings.length}</span> / {maxToppings}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {adicionais.map((topping) => {
                                            const isSelected = selectedToppings.includes(topping.id)
                                            const isFull = selectedToppings.length >= maxToppings && !isSelected

                                            return (
                                                <Card
                                                    key={topping.id}
                                                    className={`relative p-6 cursor-pointer transition-all duration-300 ease-in-out border-2 hover:border-primary ${isSelected
                                                            ? "bg-primary border-primary text-gray-900"
                                                            : isFull
                                                                ? "border-border bg-muted opacity-50 cursor-not-allowed"
                                                                : ""
                                                        }`}
                                                    onClick={() => {
                                                        if (isFull) return
                                                        toggleSelection(topping.id, selectedToppings, setSelectedToppings, maxToppings)
                                                    }}
                                                >
                                                    {isSelected && (
                                                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                                            <Check className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                    <p className="font-semibold mb-1 pr-8">{topping.label}</p>
                                                    {topping.description && (
                                                        <p className="text-xs text-muted-foreground leading-relaxed">{topping.description}</p>
                                                    )}
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
                            {currentStep < 4 ? (
                                <Button
                                    className="bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out"
                                    onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                                    disabled={
                                        (currentStep === 1 && !canProceedStep1) ||
                                        (currentStep === 2 && !canProceedStep2) ||
                                        (currentStep === 3 && !canProceedStep3)
                                    }
                                >
                                    Próximo
                                </Button>
                            ) : (
                                <Button
                                    className="bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out"
                                    disabled={!isReadyToAdd}
                                    onClick={handleAddToBag}
                                >
                                    <ShoppingBag className="mr-2 h-5 w-5" />
                                    {isEditing ? "Atualizar Pedido" : "Adicionar à Sacola"}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24 border-2">
                            <h3 className="text-2xl font-serif font-semibold mb-6">Seu Ovo</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tamanho:</span>
                                    <span className="font-semibold">{selectedSize?.label ?? "-"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Casca:</span>
                                    <span className="font-semibold">{cascas.find((s) => s.id === selectedShellId)?.label ?? "-"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Recheios:</span>
                                    <span className="font-semibold">{selectedFillings.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Selecionados:</span>
                                    <span className="font-semibold">
                                        {selectedToppings.length} / {maxToppings}
                                    </span>
                                </div>
                            </div>

                            {selectedFillings.length > 0 && (
                                <div className="mb-6 p-4 bg-secondary rounded-lg">
                                    <p className="font-semibold mb-2 text-sm text-muted-foreground">Recheios selecionados:</p>
                                    <ul className="space-y-1 text-sm">
                                        {selectedFillings.map((fillingId) => {
                                            const filling = recheios.find((f) => f.id === fillingId)
                                            return (
                                                <li key={fillingId} className="flex items-center gap-2">
                                                    <Check className="h-3 w-3 text-primary" />
                                                    {filling?.label}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )}

                            {selectedToppings.length > 0 && (
                                <div className="mb-6 p-4 bg-secondary rounded-lg">
                                    <p className="font-semibold mb-2 text-sm text-muted-foreground">Adicionais selecionados:</p>
                                    <ul className="space-y-1 text-sm">
                                        {selectedToppings.map((toppingId) => {
                                            const topping = adicionais.find((t) => t.id === toppingId)
                                            return (
                                                <li key={toppingId} className="flex items-center gap-2">
                                                    <Check className="h-3 w-3 text-primary" />
                                                    {topping?.label}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )}

                            <div className="border-t border-border pt-6 mb-6">
                                <div className="flex justify-between text-xl mb-2">
                                    <span className="font-semibold">Total:</span>
                                    <span className="font-bold text-primary">R$ {selectedSize?.price.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Valor base do ovo</p>
                            </div>

                            <Button
                                size="lg"
                                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out"
                                disabled={!isReadyToAdd}
                                onClick={handleAddToBag}
                            >
                                <ShoppingBag className="mr-2 h-5 w-5" />
                                {isEditing ? "Atualizar Pedido" : "Adicionar à Sacola"}
                            </Button>

                            {!isReadyToAdd && (
                                <p className="text-sm text-center text-muted-foreground mt-4">
                                    Complete as etapas para adicionar à sacola
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
