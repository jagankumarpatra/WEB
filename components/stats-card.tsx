"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { TrendingUp, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const icons = {
  0: TrendingUp,
  1: Users,
  2: Zap,
}

export function StatsCard({
  value,
  label,
  delay = 0,
  className,
}: { value: string; label: string; delay?: number; className?: string }) {
  const { ref, isVisible } = useScrollAnimation()
  const Icon = icons[(delay / 100) as keyof typeof icons] || TrendingUp

  return (
    <div
      ref={ref}
      className={cn(
        "glass glass-hover card-premium group flex items-center gap-4 rounded-2xl p-4 sm:p-5 transition-all duration-500",
        className,
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 group-hover:scale-110 transition-transform flex-shrink-0">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </div>
      <div>
        <span className="text-xl sm:text-2xl font-black text-white">{value}</span>
        <span className="block text-xs text-muted-foreground mt-0.5">{label}</span>
      </div>
    </div>
  )
}
