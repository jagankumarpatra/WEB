"use client"

import { useState, useEffect } from "react"
import { Quote, RefreshCw } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const quotes = [
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Programs must be written for people to read.", author: "Harold Abelson" },
  { text: "Any fool can write code that a computer can understand.", author: "Martin Fowler" },
  { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
  { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
]

export function QuoteOfDay() {
  const { ref, isVisible } = useScrollAnimation()
  const [quote, setQuote] = useState(quotes[0])
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const today = new Date().getDate()
    setQuote(quotes[today % quotes.length])
  }, [])

  const refreshQuote = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      setQuote(quotes[randomIndex])
      setIsRefreshing(false)
    }, 300)
  }

  return (
    <div
      ref={ref}
      className="glass glass-hover card-premium rounded-2xl p-5 sm:p-6 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: "100ms",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-500/20">
            <Quote className="h-5 w-5 text-violet-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Quote of the Day</h3>
            <p className="text-xs text-muted-foreground">Dev wisdom</p>
          </div>
        </div>
        <button
          onClick={refreshQuote}
          className="p-2 rounded-lg hover:bg-secondary/80 transition-colors"
          aria-label="Refresh quote"
        >
          <RefreshCw className={`h-4 w-4 text-muted-foreground ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      <blockquote className="text-sm sm:text-base italic text-foreground/90 leading-relaxed">"{quote.text}"</blockquote>
      <p className="mt-3 text-xs text-primary font-medium">— {quote.author}</p>
    </div>
  )
}
