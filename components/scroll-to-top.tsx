"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (typeof window !== "undefined" && window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Disable browser scroll restoration
      window.history.scrollRestoration = "manual"
      
      // Force scroll to top immediately
      window.scrollTo(0, 0)
      
      // Also try with requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
      
      // Add scroll event listener
      window.addEventListener("scroll", toggleVisibility)
      return () => window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 rounded-full bg-primary hover:bg-primary/90 p-3 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300"
          size="icon"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}
