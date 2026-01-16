"use client"

import { useEffect, useState } from "react"

export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="absolute h-[500px] w-[500px] rounded-full"
        style={{
          left: position.x - 250,
          top: position.y - 250,
          background:
            "radial-gradient(circle, oklch(0.72 0.19 160 / 0.08) 0%, oklch(0.72 0.19 160 / 0.02) 40%, transparent 70%)",
        }}
      />
    </div>
  )
}
