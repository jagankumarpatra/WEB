"use client"

import { useState, useEffect } from "react"
import { Eye } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function VisitorCounter() {
  const { ref, isVisible } = useScrollAnimation()
  const [count, setCount] = useState(0)
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    // Get or set visitor count in localStorage
    const stored = localStorage.getItem("jagan-resume-visits")
    const currentCount = stored ? Number.parseInt(stored) + 1 : 1247 // Start from a reasonable number
    localStorage.setItem("jagan-resume-visits", currentCount.toString())
    setCount(currentCount)
  }, [])

  useEffect(() => {
    if (isVisible && count > 0) {
      // Animate counter
      const duration = 1500
      const steps = 30
      const increment = count / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= count) {
          setDisplayCount(count)
          clearInterval(timer)
        } else {
          setDisplayCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isVisible, count])

  return (
    <div
      ref={ref}
      className="glass glass-hover card-premium rounded-2xl p-5 sm:p-6 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: "300ms",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20">
          <Eye className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold">Portfolio Views</h3>
          <p className="text-xs text-muted-foreground">Total visitors</p>
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl font-black text-gradient">{displayCount.toLocaleString()}</span>
        <span className="text-sm text-muted-foreground">views</span>
      </div>
    </div>
  )
}
