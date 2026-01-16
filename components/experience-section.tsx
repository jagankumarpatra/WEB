"use client"

import { Briefcase, ArrowUpRight, Calendar, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const experiences = [
  {
    period: "Oct 2025 — Present",
    duration: "3+ months",
    title: "Backend Developer",
    company: "Runo",
    companyUrl: "https://runo.in",
    description:
      "Implementing backend logic for score-based filters, status tracking and call-analysis enhancements. Analyzing PRDs, understanding system architecture and contributing to multi-select filter logic and call score data pipelines.",
    highlights: [
      "Building scalable microservices architecture",
      "Optimizing database queries for performance",
      "Integrating real-time data pipelines",
    ],
    skills: ["Node.js", "TypeScript", "MongoDB", "API Development"],
    current: true,
  },
  {
    period: "Jun 2024 — Oct 2025",
    duration: "1 year 4 months",
    title: "Associate Consultant - Flutter Developer",
    company: "Invincix Solutions",
    companyUrl: "https://invincix.com",
    description:
      "Maintained and enhanced a live subscription-based milk delivery app with 14K+ users. Integrated Razorpay, Cashfree and Easebuzz payment gateways. Improved REST API performance by ~25% through optimized parsing and caching.",
    highlights: [
      "Managed app serving 14K+ active users",
      "Integrated 3 payment gateways",
      "Boosted API performance by 25%",
    ],
    skills: ["Flutter", "Dart", "Firebase", "REST APIs", "Payment Gateway"],
    current: false,
  },
]

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="experience" className="scroll-mt-24">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
          <Briefcase className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Experience</h2>
          <p className="text-sm text-muted-foreground">1.6+ years building production systems</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="glass glass-hover card-premium group relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transitionDelay: `${index * 150}ms`,
            }}
          >
            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Current indicator */}
            {exp.current && (
              <div className="absolute right-4 top-4 flex items-center gap-2">
                <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">Current</span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
              </div>
            )}

            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                <Calendar className="h-3 w-3" />
                {exp.period}
              </span>
              <span className="text-xs text-muted-foreground">• {exp.duration}</span>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>

            <a
              href={exp.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary/80 hover:text-primary transition-colors mb-4"
            >
              <Building2 className="h-4 w-4" />
              {exp.company}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
            </a>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

            {/* Key Highlights */}
            <div className="mb-4 space-y-2">
              {exp.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-foreground/80">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {exp.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-lg bg-secondary/80 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
