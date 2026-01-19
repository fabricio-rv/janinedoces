"use client"

import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/data/types"

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  // Função auxiliar para garantir que a imagem carregue corretamente
  const imageSrc = product.image.startsWith('http') 
    ? product.image 
    : `/${product.image.replace(/^\//, '')}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* AJUSTES MOBILE VS DESKTOP:
        - Mobile: overflow-y-auto (A tela toda rola).
        - Desktop (md): overflow-hidden (A tela trava, só rola o texto dentro).
      */}
      <DialogContent className="w-screen h-[100dvh] max-w-none rounded-none m-0 p-0 overflow-y-auto md:overflow-hidden md:max-w-6xl md:h-auto md:min-h-[650px] md:rounded-xl md:m-auto bg-background border-none flex flex-col md:block">
        
        <div className="flex flex-col min-h-full md:flex-row md:h-full">
          
          {/* --- COLUNA DA IMAGEM --- 
             Mobile: aspect-square (Quadrado perfeito). Isso deixa a imagem GRANDE e proporcional.
             Desktop: w-1/2 e altura automática preenchendo a lateral.
          */}
          <div className="relative w-full shrink-0 aspect-square bg-muted md:aspect-auto md:w-1/2 md:h-auto">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* --- COLUNA DO TEXTO --- 
             Mobile: Apenas flui naturalmente (sem travas de rolagem).
             Desktop: flex-1 + overflow-y-auto (Cria a barra de rolagem só aqui).
          */}
          <div className="flex flex-col p-6 md:flex-1 md:overflow-y-auto md:p-12 md:h-auto">
            
            <DialogHeader className="text-left">
              {/* TÍTULO */}
              <DialogTitle className="text-3xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            {/* CATEGORIA/BADGES */}
            {product.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 mb-6 md:mt-6 md:mb-8">
                {product.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="px-3 py-1 text-sm md:text-base font-medium">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* DESCRIÇÃO */}
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-8 md:mb-10">
              {product.description || "Doce fino artesanal feito com ingredientes premium e muito carinho para tornar seu momento inesquecível."}
            </p>

            {/* SEÇÃO DE DETALHES */}
            <div className="space-y-6 md:space-y-8 mb-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3 text-lg md:text-xl">Sabores disponíveis:</h4>
                <p className="text-muted-foreground text-base md:text-lg">{product.flavors.join(", ")}</p>
              </div>

              {(product.moods.length > 0 || product.occasions.length > 0) && (
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-lg md:text-xl">Ideal para:</h4>
                  <div className="flex flex-wrap gap-3">
                    {[...product.moods, ...product.occasions].map((tag) => (
                      <Badge key={tag} variant="outline" className="text-sm md:text-base py-1 px-3">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* BOTÃO */}
            <div className="mt-auto pt-8 pb-4 md:pb-0">
              <Button asChild size="lg" className="w-full h-14 text-lg md:text-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg transition-transform active:scale-95">
                <Link href="/monte-sua-caixa" onClick={onClose}>
                  Personalizar e Comprar
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}