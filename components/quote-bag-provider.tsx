"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface QuoteItem {
  id: string
  name: string
  price: number
  quantity: number
  minOrder: string
  image: string
}

interface QuoteBagContextType {
  items: QuoteItem[]
  isOpen: boolean
  addItem: (item: QuoteItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearBag: () => void
  toggleBag: () => void
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

  return (
    <QuoteBagContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearBag,
        toggleBag,
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
