"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Pencil } from "lucide-react"
import { useQuoteBag } from "@/components/quote-bag-provider"

export function QuoteBag() {
  const { items, isOpen, toggleBag, updateQuantity, removeItem, clearBag, closeBag } = useQuoteBag()
  const router = useRouter()
  const [step, setStep] = useState<"bag" | "checkout">("bag")
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    delivery: "entrega" as "entrega" | "retirada",
  })

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const estimatedTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    setStep("checkout")
  }

  const handleEditItem = (itemId: string, type?: "box" | "egg") => {
    const targetRoute = type === "egg" ? "/monte-seu-ovo" : "/monte-sua-caixa"
    router.push(`${targetRoute}?editId=${itemId}`)
    setStep("bag")
    closeBag()
  }

  const handleSendToWhatsApp = () => {
    // Build WhatsApp message
    let message = "Olá Janine! Montei um orçamento no site:\n\n"

    items.forEach((item) => {
      message += `• ${item.name} - ${item.quantity} ${item.quantity === 1 ? "unidade" : "unidades"}\n`
    })

    message += `\nTotal de itens: ${totalItems}\n`
    message += `Valor estimado: R$ ${estimatedTotal.toFixed(2)}\n\n`

    if (formData.name) {
      message += `Nome: ${formData.name}\n`
    }
    if (formData.date) {
      message += `Data: ${formData.date}\n`
    }
    message += `${formData.delivery === "entrega" ? "Entrega" : "Retirada"}\n\n`

    message += "Pode me informar valores e disponibilidade?"

    const whatsappUrl = `https://wa.me/5551998116188?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Reset
    clearBag()
    setStep("bag")
    setFormData({ name: "", date: "", delivery: "entrega" })
    toggleBag()
  }

  return (
    <Sheet open={isOpen} onOpenChange={toggleBag}>
      <SheetContent className="w-full sm:max-w-[480px] md:max-w-[520px] overflow-y-auto overflow-x-hidden box-border p-6 sm:p-8">
        <SheetHeader>
          <SheetTitle className="text-2xl font-serif flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            {step === "bag" ? "Sacola de Orçamento" : "Finalizar Orçamento"}
          </SheetTitle>
        </SheetHeader>

        {step === "bag" ? (
          <div className="mt-8">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-6">Sua sacola está vazia</p>
                <Button onClick={toggleBag} variant="outline">
                  Continuar comprando
                </Button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-4 mb-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-border pb-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={`/.jpg?height=80&width=80&query=${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{item.minOrder}</p>
                        <p className="text-primary font-semibold">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditItem(item.id, item.type)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="bg-secondary rounded-lg p-6 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Total de itens:</span>
                    <span className="font-semibold">{totalItems}</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-lg">
                    <span className="font-semibold">Valor estimado:</span>
                    <span className="font-bold text-primary">R$ {estimatedTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Valores finais serão confirmados via WhatsApp</p>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90" onClick={handleCheckout}>
                    Finalizar Orçamento
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={toggleBag}>
                    Continuar Comprando
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendToWhatsApp()
              }}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="name">Seu Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Digite seu nome"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="date">Data do Evento (opcional)</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Preferência</Label>
                <RadioGroup
                  value={formData.delivery}
                  onValueChange={(value) => setFormData({ ...formData, delivery: value as "entrega" | "retirada" })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="entrega" id="entrega" />
                    <Label htmlFor="entrega" className="font-normal cursor-pointer">
                      Entrega
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="retirada" id="retirada" />
                    <Label htmlFor="retirada" className="font-normal cursor-pointer">
                      Retirada no local
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Order Summary */}
              <div className="bg-secondary rounded-lg p-4">
                <h4 className="font-semibold mb-3">Resumo do Pedido</h4>
                <div className="space-y-1 text-sm">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 mt-2 flex flex-wrap justify-between gap-2 font-semibold">
                    <span>Total Estimado:</span>
                    <span className="text-primary">R$ {estimatedTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Enviar para WhatsApp
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setStep("bag")}
                >
                  Voltar
                </Button>
              </div>
            </form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
