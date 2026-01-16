"use client"

import { Terminal, Zap } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      id="about"
      className="glass glass-hover card-premium rounded-2xl p-6 transition-all duration-500 sm:p-8 h-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
          <Terminal className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">About Me</h2>
          <p className="text-sm text-muted-foreground">Who I am</p>
        </div>
      </div>

      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Full-stack Mobile and Backend Developer with{" "}
          <span className="font-semibold text-foreground">1.6 years of experience</span> building production-grade
          Flutter applications and backend features using Node.js, TypeScript, MongoDB, and AWS serverless components.
        </p>
        <p>
          Currently at{" "}
          <a
            href="https://runo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            Runo
          </a>
          , focusing on call-analysis filtering logic, PRD implementation, and system enhancements.
        </p>

        {/* Highlight box */}
        <div className="flex items-start gap-3 rounded-xl bg-primary/5 border border-primary/20 p-4 mt-4">
          <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            Previously delivered a live subscription-based Flutter app with{" "}
            <span className="font-semibold text-primary">14K+ users</span> at Invincix.
          </p>
        </div>
      </div>
    </section>
  )
}
