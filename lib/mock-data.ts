export const occasions = [
  "Batizado",
  "Dia da Mulher",
  "Dia das Crianças",
  "Dia das Mães",
  "Dia dos Médicos",
  "Dia dos Namorados",
  "Dia dos Pais",
  "Dia dos Professores",
  "Festa Junina",
  "Maternidade",
  "Páscoa",
  "Formatura",
  "Casamento / Noivado",
  "15 Anos",
  "Corporativo",
]

export interface Product {
  id: string
  name: string
  category: string
  price: number
  minOrder: string
  badges: string[]
  flavors: string[]
  moods: string[]
  occasions: string[]
  image: string
  description?: string
}

export const products: Product[] = [
  {
    id: "trufa-caixa-2",
    name: "Caixa com 2 Trufas",
    category: "Trufas",
    price: 12.0,
    minOrder: "1 caixa",
    badges: ["Linha fina"],
    flavors: ["Belga", "Meio amargo", "Avelã", "Maracujá"],
    moods: ["Para presente", "Para impressionar"],
    occasions: ["Dia dos Namorados", "Dia das Mães", "Corporativo"],
    image: "placeholder-trufas",
    description: "Trufas artesanais feitas com chocolate belga premium e recheios sofisticados.",
  },
  {
    id: "trufa-caixa-4",
    name: "Caixa com 4 Trufas",
    category: "Trufas",
    price: 23.0,
    minOrder: "1 caixa",
    badges: ["Mais pedido"],
    flavors: ["Belga", "Pistache", "Frutas vermelhas", "Café"],
    moods: ["Para presente", "Para impressionar"],
    occasions: ["Dia da Mulher", "Dia dos Professores", "Corporativo"],
    image: "placeholder-trufas",
    description: "Seleção de trufas gourmet com sabores únicos e apresentação elegante.",
  },
  {
    id: "trufa-caixa-6",
    name: "Caixa com 6 Trufas",
    category: "Trufas",
    price: 33.0,
    minOrder: "1 caixa",
    badges: ["Premium"],
    flavors: ["Belga", "Avelã", "Coco", "Maracujá"],
    moods: ["Para presente", "Para impressionar"],
    occasions: ["Dia das Mães", "Dia dos Namorados"],
    image: "placeholder-trufas",
    description: "Coleção premium de trufas com ingredientes nobres e embalagem sofisticada.",
  },
  {
    id: "brig-caixa-2",
    name: "Caixa com 2 Brigadeiros (Tradicionais/Gourmet)",
    category: "Brigadeiros",
    price: 10.0,
    minOrder: "1 caixa",
    badges: ["Clássico"],
    flavors: ["Tradicional", "Belga", "Ninho", "Coco queimado"],
    moods: ["Para presente"],
    occasions: ["Dia da Mulher", "Dia dos Professores"],
    image: "placeholder-brigadeiros",
    description: "Brigadeiros artesanais com receita especial e ingredientes selecionados.",
  },
  {
    id: "brig-caixa-4",
    name: "Caixa com 4 Brigadeiros (Tradicionais/Gourmet)",
    category: "Brigadeiros",
    price: 19.0,
    minOrder: "1 caixa",
    badges: ["Mais vendido"],
    flavors: ["Belga", "Ninho com Nutella", "Pistache", "Paçoca"],
    moods: ["Para presente", "Para impressionar"],
    occasions: ["Dia dos Namorados", "Dia das Mães"],
    image: "placeholder-brigadeiros",
    description: "Brigadeiros gourmet com coberturas especiais e sabores exclusivos.",
  },
  {
    id: "brig-caixa-6",
    name: "Caixa com 6 Brigadeiros (Tradicionais/Gourmet)",
    category: "Brigadeiros",
    price: 27.0,
    minOrder: "1 caixa",
    badges: ["Gourmet"],
    flavors: ["Belga", "70%", "Cappuccino", "Caramelo salgado"],
    moods: ["Para impressionar", "Para presente"],
    occasions: ["Corporativo", "Dia dos Médicos"],
    image: "placeholder-brigadeiros",
    description: "Seleção gourmet com sabores sofisticados e acabamento impecável.",
  },
  {
    id: "brig-caixa-9",
    name: "Caixa com 9 Brigadeiros (Tradicionais/Gourmet)",
    category: "Brigadeiros",
    price: 38.0,
    minOrder: "1 caixa",
    badges: ["Presente perfeito"],
    flavors: ["Belga", "Ninho", "Oreo", "Avelã"],
    moods: ["Para presente"],
    occasions: ["Dia dos Pais", "Dia das Crianças"],
    image: "placeholder-brigadeiros",
    description: "Presente ideal com variedade de sabores em embalagem especial.",
  },
  {
    id: "brig-caixa-12",
    name: "Caixa com 12 Brigadeiros (Tradicionais/Gourmet)",
    category: "Brigadeiros",
    price: 49.0,
    minOrder: "1 caixa",
    badges: ["Top escolha"],
    flavors: ["Belga", "Pistache", "Paçoca", "Ninho com Nutella"],
    moods: ["Para presente", "Para impressionar"],
    occasions: ["Maternidade", "Formatura"],
    image: "placeholder-brigadeiros",
    description: "Nossa seleção mais completa com os sabores mais pedidos.",
  },
  {
    id: "presente-50",
    name: "Caixa Presente – 50 Brigadeiros (Gourmet e Finos)",
    category: "Presentes & Kits",
    price: 125.0,
    minOrder: "1 caixa",
    badges: ["Alto ticket", "Eventos"],
    flavors: ["Sortidos"],
    moods: ["Para impressionar", "Para festa grande"],
    occasions: ["Casamento / Noivado", "Formatura", "Corporativo"],
    image: "placeholder-kit",
    description: "Kit especial para eventos com grande variedade de doces finos.",
  },
  {
    id: "presente-100",
    name: "Caixa Presente – 100 Brigadeiros (Gourmet e Finos)",
    category: "Presentes & Kits",
    price: 195.0,
    minOrder: "1 caixa",
    badges: ["Alto ticket", "Mais pedido em eventos"],
    flavors: ["Sortidos"],
    moods: ["Para festa grande"],
    occasions: ["Casamento / Noivado", "15 Anos", "Corporativo"],
    image: "placeholder-kit",
    description: "Nosso kit premium para grandes eventos e celebrações especiais.",
  },
  {
    id: "camafeu-nozes",
    name: "Camafeu de Nozes",
    category: "Doces Finos",
    price: 3.5,
    minOrder: "mínimo 20 unidades",
    badges: ["Linha fina", "Crocante"],
    flavors: ["Nozes caramelizadas"],
    moods: ["Para impressionar", "Sofisticado"],
    occasions: ["Casamento / Noivado", "Corporativo", "Formatura"],
    image: "placeholder-camafeu",
    description: "Delicada combinação de chocolate ao leite com nozes caramelizadas.",
  },
  {
    id: "bombom-morango",
    name: "Bombom de Morango",
    category: "Doces Finos",
    price: 4.0,
    minOrder: "mínimo 20 unidades",
    badges: ["Premium", "Frutas"],
    flavors: ["Morango fresco"],
    moods: ["Para impressionar", "Romântico"],
    occasions: ["Dia dos Namorados", "Dia da Mulher", "Casamento / Noivado"],
    image: "placeholder-bombom",
    description: "Morango fresco coberto com chocolate belga de alta qualidade.",
  },
  {
    id: "bombom-uva",
    name: "Bombom de Uva",
    category: "Doces Finos",
    price: 4.0,
    minOrder: "mínimo 20 unidades",
    badges: ["Premium", "Frutas"],
    flavors: ["Uva verde"],
    moods: ["Para impressionar", "Sofisticado"],
    occasions: ["Corporativo", "Dia das Mães", "Formatura"],
    image: "placeholder-bombom",
    description: "Uva verde sem sementes envolta em chocolate branco premium.",
  },
  {
    id: "verrine-ninho",
    name: "Verrine Ninho com Frutas Vermelhas",
    category: "Doces Finos",
    price: 6.5,
    minOrder: "mínimo 20 unidades",
    badges: ["Linha fina", "Mais pedido"],
    flavors: ["Ninho", "Frutas vermelhas"],
    moods: ["Para impressionar", "Elegante"],
    occasions: ["Casamento / Noivado", "15 Anos", "Corporativo"],
    image: "placeholder-verrine",
    description: "Camadas delicadas de creme de ninho com geleia de frutas vermelhas.",
  },
  {
    id: "tartalete-limao",
    name: "Tartalete de Limão Siciliano",
    category: "Doces Finos",
    price: 5.5,
    minOrder: "mínimo 20 unidades",
    badges: ["Premium", "Cítrico"],
    flavors: ["Limão siciliano"],
    moods: ["Refrescante", "Sofisticado"],
    occasions: ["Corporativo", "Dia das Mães", "Formatura"],
    image: "placeholder-tartalete",
    description: "Massa amanteigada com creme suave de limão siciliano e merengue.",
  },
  {
    id: "tartalete-maracuja",
    name: "Tartalete de Maracujá",
    category: "Doces Finos",
    price: 5.5,
    minOrder: "mínimo 20 unidades",
    badges: ["Premium", "Tropical"],
    flavors: ["Maracujá"],
    moods: ["Refrescante", "Elegante"],
    occasions: ["Casamento / Noivado", "15 Anos", "Dia da Mulher"],
    image: "placeholder-tartalete",
    description: "Tartalete crocante com creme aveludado de maracujá.",
  },
  {
    id: "ovo-colher-ninho",
    name: "Ovo de Colher Ninho com Nutella",
    category: "Páscoa",
    price: 45.0,
    minOrder: "1 unidade",
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
    category: "Páscoa",
    price: 55.0,
    minOrder: "1 unidade",
    badges: ["Páscoa", "Premium"],
    flavors: ["Pistache"],
    moods: ["Para impressionar", "Sofisticado"],
    occasions: ["Páscoa"],
    image: "placeholder-ovo",
    description: "Ovo de chocolate belga com recheio cremoso de pistache.",
  },
]

export const categories = Array.from(new Set(products.map((p) => p.category)))

export const collections = [
  {
    id: "eventos",
    name: "Eventos",
    description: "Doces finos para casamentos, formaturas e grandes celebrações",
    image: "placeholder-eventos",
  },
  {
    id: "presentes",
    name: "Presentes",
    description: "Presentes sofisticados para surpreender pessoas especiais",
    image: "placeholder-presentes",
  },
  {
    id: "sazonais",
    name: "Sazonais",
    description: "Criações exclusivas para datas comemorativas",
    image: "placeholder-sazonais",
  },
  {
    id: "assinatura",
    name: "Assinatura Janine",
    description: "As criações premium que definem nossa marca",
    image: "placeholder-assinatura",
  },
]

export const tasting = {
  enabled: true,
  name: "Kit Degustação",
  description: "Seleção de doces finos para você escolher os sabores ideais do seu evento.",
  ctaTag: "[DEGUSTAÇÃO]",
  note: "Sob disponibilidade. Ideal para eventos e encomendas maiores.",
}

export const seasonal = {
  easterEnabled: true,
  easterCollectionName: "Páscoa – Ovos de Colher",
  exampleFlavors: ["Ninho com Nutella", "Oreo", "Pistache", "Kinder Bueno", "Doce de leite", "Belga 70%"],
}

export const galleryItems = [
  {
    id: "1",
    title: "Casamento Elegante",
    occasion: "Casamento / Noivado",
    image: "placeholder-gallery-1",
  },
  {
    id: "2",
    title: "Festa de 15 Anos",
    occasion: "15 Anos",
    image: "placeholder-gallery-2",
  },
  {
    id: "3",
    title: "Evento Corporativo",
    occasion: "Corporativo",
    image: "placeholder-gallery-3",
  },
  {
    id: "4",
    title: "Dia das Mães",
    occasion: "Dia das Mães",
    image: "placeholder-gallery-4",
  },
  {
    id: "5",
    title: "Formatura",
    occasion: "Formatura",
    image: "placeholder-gallery-5",
  },
  {
    id: "6",
    title: "Presente Especial",
    occasion: "Para presente",
    image: "placeholder-gallery-6",
  },
]

export const faqs = [
  {
    question: "Qual o prazo de entrega?",
    answer:
      "O prazo varia conforme a disponibilidade e o volume do pedido. Para encomendas pequenas (até 50 unidades), normalmente 3-5 dias úteis. Para eventos maiores, recomendamos entrar em contato com pelo menos 2 semanas de antecedência.",
  },
  {
    question: "Vocês entregam em Porto Alegre?",
    answer:
      "Sim! Fazemos entregas em toda Porto Alegre. O valor do frete é calculado conforme o bairro e volume do pedido. Também oferecemos a opção de retirada no local.",
  },
  {
    question: "Qual o pedido mínimo?",
    answer:
      "Depende do produto. Caixas individuais podem ser compradas em qualquer quantidade. Doces avulsos geralmente têm pedido mínimo de 20 unidades. Para eventos, consulte-nos para condições especiais.",
  },
  {
    question: "Posso fazer degustação antes de encomendar?",
    answer:
      "Sim! Oferecemos Kit Degustação mediante disponibilidade. É ideal para quem está planejando eventos e quer experimentar os sabores antes de fazer a encomenda final.",
  },
  {
    question: "Como faço para encomendar?",
    answer:
      "Você pode montar seu orçamento aqui no site e enviar pelo WhatsApp, ou entrar em contato diretamente conosco. Responderemos com valores atualizados e disponibilidade.",
  },
  {
    question: "Vocês trabalham com eventos corporativos?",
    answer:
      "Sim! Temos experiência com eventos corporativos de diversos portes. Oferecemos embalagens personalizadas e condições especiais para pedidos recorrentes.",
  },
]
