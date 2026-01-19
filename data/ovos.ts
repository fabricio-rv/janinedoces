import type { Product } from "./types"

export const dadosOvos: Product[] = [
  {
    id: "ovo-colher-ninho",
    name: "Ovo de Colher com Nutella",
    category: "Ovos de Colher",
    badges: ["Páscoa", "Mais pedido"],
    flavors: ["Ninho", "Nutella"],
    moods: ["Para presente", "Sazonal"],
    occasions: ["Páscoa"],
    image: "placeholder-ovo",
    description: "Ovo de chocolate recheado com creme de ninho e Nutella.",
  },
  {
    id: "ovo-colher-pistache",
    name: "Ovo de Colher Pistache",
    category: "Ovos de Colher",
    badges: ["Páscoa", "Premium"],
    flavors: ["Pistache"],
    moods: ["Para impressionar", "Sofisticado"],
    occasions: ["Páscoa"],
    image: "placeholder-ovo",
    description: "Ovo de chocolate belga com recheio cremoso de pistache.",
  },
]
