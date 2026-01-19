"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface QuoteItem {
  id: string
  name: string
  price: number
  quantity: number
  minOrder: string
  image: string
  type?: "box" | "egg"
  categoryId?: string
  sizeId?: string
  flavors?: string[]
  truffleType?: "grande" | "media"
  shellId?: string
  fillings?: string[]
  toppings?: string[]
}

interface QuoteBagContextType {
  items: QuoteItem[]
  isOpen: boolean
  addItem: (item: QuoteItem) => void
  updateItem: (id: string, updatedItem: QuoteItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearBag: () => void
  toggleBag: () => void
  openBag: () => void
  closeBag: () => void
}

const QuoteBagContext = createContext<QuoteBagContextType | undefined>(undefined)

export function QuoteBagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (item: QuoteItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
      }
      return [...prev, item]
    })
  }

  const updateItem = (id: string, updatedItem: QuoteItem) => {
    setItems((prev) => prev.map((item) => (item.id === id ? updatedItem : item)))
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearBag = () => setItems([])
  const toggleBag = () => setIsOpen((prev) => !prev)
  const openBag = () => setIsOpen(true)
  const closeBag = () => setIsOpen(false)

  return (
    <QuoteBagContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        updateItem,
        removeItem,
        updateQuantity,
        clearBag,
        toggleBag,
        openBag,
        closeBag,
      }}
    >
      {children}
    </QuoteBagContext.Provider>
  )
}

export function useQuoteBag() {
  const context = useContext(QuoteBagContext)
  if (!context) {
    throw new Error("useQuoteBag must be used within QuoteBagProvider")
  }
  return context
}
