"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import type { Product } from "@/lib/mock-data"
import { useQuoteBag } from "@/components/quote-bag-provider"

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useQuoteBag()

  const handleAddToBag = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      minOrder: product.minOrder,
      image: product.image,
    })
    onClose()
    setQuantity(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto md:max-w-[1000px] md:p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-8 md:gap-12">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={`/.jpg?height=600&width=600&query=${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Badges */}
            {product.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description || "Doce fino artesanal feito com ingredientes premium e muito carinho."}
            </p>

            {/* Premium Ingredients */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Sabores disponíveis:</h4>
              <p className="text-sm text-muted-foreground">{product.flavors.join(", ")}</p>
            </div>

            {/* Occasions */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Ideal para:</h4>
              <div className="flex flex-wrap gap-2">
                {product.occasions.slice(0, 3).map((occasion) => (
                  <Badge key={occasion} variant="outline">
                    {occasion}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Minimum Order */}
            <div className="mb-6 p-4 bg-secondary rounded-lg">
              <p className="text-sm font-medium">
                <span className="text-primary">Pedido mínimo:</span> {product.minOrder}
              </p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
              <span className="text-muted-foreground ml-2">por unidade</span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="font-semibold mb-2 block">Quantidade:</label>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Bag Button */}
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg" onClick={handleAddToBag}>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Adicionar à Sacola
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
