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
