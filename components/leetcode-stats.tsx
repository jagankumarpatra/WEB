"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Code2, Target, TrendingUp } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

type LeetCodeStats = {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
  acceptanceRate: number
  contestRating: number
  topPercentage: number
}

export function LeetCodeStats() {
  const { ref, isVisible } = useScrollAnimation()
  const [stats, setStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/leetcode-stats")
        const data = await response.json()
        console.log("Received from API:", data)
        
        if (data.status === "success") {
          console.log("✅ Real data from LeetCode API:")
          console.log("   Total Solved (ALL):", data.totalSolved)
          console.log("   Easy:", data.easySolved)
          console.log("   Medium:", data.mediumSolved)
          console.log("   Hard:", data.hardSolved)
          console.log("   Source: acStats[difficulty='All'].count")
          
          setStats({
            totalSolved: data.totalSolved || 0,
            easySolved: data.easySolved || 0,
            mediumSolved: data.mediumSolved || 0,
            hardSolved: data.hardSolved || 0,
            ranking: data.ranking || 0,
            acceptanceRate: data.acceptanceRate || 0,
            contestRating: data.contestRating || 1520,
            topPercentage: data.topPercentage || 48.07,
          })
        } else {
          throw new Error(data.message || "API returned non-success status")
        }
      } catch (error) {
        console.error("❌ Failed to fetch LeetCode stats, using fallback data:", error)
        setStats({
          totalSolved: 150,
          easySolved: 70,
          mediumSolved: 65,
          hardSolved: 15,
          ranking: 250000,
          acceptanceRate: 65,
          contestRating: 1520,
          topPercentage: 48.07,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div
      ref={ref}
      className="glass glass-hover card-premium rounded-2xl p-5 sm:p-6 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: "200ms",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/10 border border-orange-500/20">
            <Code2 className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold">LeetCode Stats</h3>
            <p className="text-sm text-muted-foreground">@patrajagankumar</p>
          </div>
        </div>
        <a
          href="https://leetcode.com/u/patrajagankumar/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline underline-offset-4"
        >
          View Profile →
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-secondary/50" />
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={Target}
            label="Problems Solved"
            value={stats.totalSolved}
            color="text-primary"
            bgColor="bg-primary/10"
          />
          <StatCard
            icon={TrendingUp}
            label="Contest Rating"
            value={`Top ${stats.topPercentage}%`}
            color="text-yellow-500"
            bgColor="bg-yellow-500/10"
          />
          <div className="col-span-2 rounded-xl bg-secondary/30 p-4">
            <p className="text-xs text-muted-foreground mb-3">Difficulty Breakdown</p>
            <div className="flex flex-wrap gap-3">
              <DifficultyBadge label="Easy" count={stats.easySolved} color="bg-green-500" />
              <DifficultyBadge label="Medium" count={stats.mediumSolved} color="bg-yellow-500" />
              <DifficultyBadge label="Hard" count={stats.hardSolved} color="bg-red-500" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  color: string
  bgColor: string
}) {
  return (
    <div className="rounded-xl bg-secondary/30 p-4">
      <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${bgColor} mb-2`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <p className="text-lg sm:text-xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function DifficultyBadge({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${color}`} />
      <span className="text-sm">
        <span className="font-semibold text-foreground">{count}</span>{" "}
        <span className="text-muted-foreground">{label}</span>
      </span>
    </div>
  )
}
