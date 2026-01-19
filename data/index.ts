import type { Product } from "./types"
import { dadosDocesTradicionais } from "./tradicionais"
import { dadosBrigadeirosGourmet } from "./gourmet"
import { dadosDocesFinos } from "./finos"
import { dadosTrufas } from "./trufas"
import { dadosOvos } from "./ovos"
import { dadosKits } from "./kits"

export const CATEGORIES = [
  "Doces Tradicionais",
  "Brigadeiros Gourmet",
  "Doces Finos",
  "Trufas",
  "Ovos de Colher",
  "Kits Especiais",
]

export const MOODS = [
  "Para Presente",
  "Para Festas",
  "Sofisticados",
  "Lembrancinhas",
  "Infantil",
  "Edição Limitada",
]

export const OCCASIONS = [
  "Batizado",
  "Dia das Crianças",
  "Dia das Mães",
  "Dia dos Namorados",
  "Dia dos Pais",
  "Festa Junina",
  "Maternidade",
  "Chá de Bebê",
  "Páscoa",
  "Formatura",
  "Casamento",
  "15 Anos",
]

export const ALL_PRODUCTS: Product[] = [
  ...dadosDocesTradicionais,
  ...dadosBrigadeirosGourmet,
  ...dadosDocesFinos,
  ...dadosTrufas,
  ...dadosOvos,
  ...dadosKits,
]
