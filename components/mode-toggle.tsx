"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const activeTheme = theme === "system" ? resolvedTheme : theme
  const isDark = activeTheme === "dark"

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"

    // Check if the API is supported safely
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    // Fix: Call explicitly on document and use flushSync
    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={toggleTheme}
    >
      <Moon className={`h-4 w-4 transition-all ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
      <Sun className={`absolute h-4 w-4 transition-all ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
      <span className="sr-only">Alternar tema</span>
    </Button>
  )
}
