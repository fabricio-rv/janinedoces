"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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
  const [imgError, setImgError] = useState(false)

  // Detecta se o título está em 1 linha (true) ou 2+ linhas (false)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const [isSingleLineTitle, setIsSingleLineTitle] = useState(true)

  const imageSrc = useMemo(() => {
    if (!product.image) return ""
    return product.image.startsWith("http")
      ? product.image
      : `/${product.image.replace(/^\//, "")}`
  }, [product.image])

  const open = () => setIsModalOpen(true)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return

    const compute = () => {
      const styles = window.getComputedStyle(el)
      const lineHeight = parseFloat(styles.lineHeight || "0")
      const lines = lineHeight ? Math.round(el.clientHeight / lineHeight) : 1
      setIsSingleLineTitle(lines <= 1)
    }

    compute()

    // Recalcula em resize (responsivo)
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [product.name])

  return (
    <>
      <Card
        onClick={open}
        className="
          overflow-hidden cursor-pointer p-0 h-full flex flex-col
          border border-border/60 hover:border-primary/60
          transition-all duration-300 bg-background
        "
      >
        {/* IMAGEM */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
          {!imgError && imageSrc ? (
            <img
              src={imageSrc}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-muted to-background">
              <div className="text-sm text-muted-foreground/70">Foto em breve</div>
            </div>
          )}

          {product.badges?.[0] && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur font-semibold">
                {product.badges[0]}
              </Badge>
            </div>
          )}
        </div>

        {/* CONTEÚDO */}
<div className="px-5 pt-5 pb-6 flex flex-col flex-1">
  {/* TOP: Título */}
  <h3 className="text-xl font-serif font-bold leading-tight line-clamp-2">
    {product.name}
  </h3>

  {/* respiro entre título e miolo */}
  <div className="h-3" />

  {/* MIDDLE: Categoria centralizada verticalmente */}
  <div className="flex-1 flex items-center">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {product.category}
    </p>
  </div>

  {/* respiro antes do botão */}
  <div className="h-4" />

  {/* BOTTOM: Botão */}
  <div className="mt-auto">
    <Button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        open()
      }}
      className="w-full h-11 text-base font-semibold"
    >
      Ver detalhes
    </Button>
  </div>
</div>

      </Card>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
