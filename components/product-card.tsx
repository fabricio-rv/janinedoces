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
        className="overflow-hidden border-2 hover:border-primary transition-all group cursor-pointer p-0"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-square relative overflow-hidden bg-muted w-full">
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
        <div className="px-4 pb-4 pt-2 flex flex-col gap-3">
          <h3 className="text-xl font-serif font-semibold group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            {product.category}
          </p>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Ver detalhes
          </Button>
        </div>
      </Card>

      <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
