"use client"

import { useState, useEffect } from "react"

export function useTypingEffect(text: string, speed = 100, delay = 500) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Initial delay before typing starts
    timeout = setTimeout(() => {
      let currentIndex = 0

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
          timeout = setTimeout(typeNextChar, speed)
        } else {
          setIsTyping(false)
        }
      }

      typeNextChar()
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return { displayedText, isTyping }
}
