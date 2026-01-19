"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/data/types"
import { ProductModal } from "@/components/product-modal"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Card
        className="overflow-hidden border-2 hover:border-primary transition-all group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-square relative overflow-hidden bg-muted">
          <img
            src={`/.jpg?height=400&width=400&query=${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badges.length > 0 && (
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {product.badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="bg-background/95 backdrop-blur">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{product.minOrder}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Ver detalhes
            </Button>
          </div>
        </div>
      </Card>

      <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
