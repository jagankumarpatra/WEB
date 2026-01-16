"use client"

import { GraduationCap, Award, Calendar, MapPin } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function EducationSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="education" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <GraduationCap className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Education</h2>
      </div>

      <div
        className="glass glass-hover relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:glow sm:p-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        {/* Gradient accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Main Info */}
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Bachelor of Technology (B.Tech)</h3>
              <p className="text-primary font-medium">Silicon Institute of Technology, Bhubaneswar</p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  2020 - 2024
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  Odisha, India
                </span>
              </div>
            </div>
          </div>

          {/* CGPA Card */}
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 border border-primary/20">
            <Award className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-gradient">9.35</p>
              <p className="text-xs text-muted-foreground">CGPA / 10.0</p>
            </div>
          </div>
        </div>

        {/* Additional highlights */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-secondary/50 p-4 text-center">
            <p className="text-sm font-medium text-foreground">Computer Science</p>
            <p className="text-xs text-muted-foreground">Major</p>
          </div>
          <div className="rounded-xl bg-secondary/50 p-4 text-center">
            <p className="text-sm font-medium text-foreground">Top 5%</p>
            <p className="text-xs text-muted-foreground">Class Rank</p>
          </div>
          <div className="rounded-xl bg-secondary/50 p-4 text-center">
            <p className="text-sm font-medium text-foreground">4 Years</p>
            <p className="text-xs text-muted-foreground">Full-time Program</p>
          </div>
        </div>
      </div>
    </section>
  )
}
