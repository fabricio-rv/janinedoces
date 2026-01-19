import type { Product } from "./types"

export const dadosKits: Product[] = [
  {
    id: "presente-50",
    name: "Caixa Presente 50 Brigadeiros",
    category: "Kits Especiais",
    price: 125.0,
    minOrder: "1 caixa",
    badges: ["Alto ticket", "Eventos"],
    flavors: ["Sortidos"],
    moods: ["Para impressionar", "Para festa grande"],
    occasions: ["Casamento", "Formatura", "Corporativo"],
    image: "placeholder-kit",
    description: "Kit especial para eventos com grande variedade de doces finos.",
  },
  {
    id: "presente-100",
    name: "Caixa Presente 100 Brigadeiros",
    category: "Kits Especiais",
    price: 195.0,
    minOrder: "1 caixa",
    badges: ["Alto ticket", "Mais pedido em eventos"],
    flavors: ["Sortidos"],
    moods: ["Para festa grande"],
    occasions: ["Casamento", "15 Anos", "Corporativo"],
    image: "placeholder-kit",
    description: "Nosso kit premium para grandes eventos e celebrações especiais.",
  },
]
