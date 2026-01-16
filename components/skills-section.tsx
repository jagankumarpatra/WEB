"use client"

import { Zap, Code, Cloud, Database, Wrench, Monitor, Server } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const skillCategories = [
  {
    title: "Languages",
    subtitle: "Core programming languages I use to build",
    icon: Code,
    skills: ["Java", "Dart", "TypeScript", "JavaScript"],
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
  },
  {
    title: "Frontend",
    subtitle: "Frameworks and tools for delightful UIs",
    icon: Monitor,
    skills: ["Flutter", "Next.js", "React", "Tailwind CSS"],
    color: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-500",
  },
  {
    title: "Backend",
    subtitle: "Server-side frameworks and API tooling",
    icon: Server,
    skills: ["Node.js", "Express", "Serverless", "Firebase", "Kafka", "REST APIs"],
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-500",
  },
  {
    title: "Databases",
    subtitle: "Data stores used across projects",
    icon: Database,
    skills: ["MongoDB", "MySQL"],
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
  },
  {
    title: "DevOps & Cloud",
    subtitle: "Infra, CI/CD, and cloud platforms",
    icon: Cloud,
    skills: ["Netlify", "AWS", "Vercel", "GitHub Actions"],
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-500",
  },
  {
    title: "Tools",
    subtitle: "Daily development essentials",
    icon: Wrench,
    skills: ["Jira", "Bitbucket", "GitHub", "Postman", "Swagger"],
    color: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-500",
  },
]

export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="skills" className="scroll-mt-24">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Skills & Technologies</h2>
          <p className="text-sm text-muted-foreground">What I work with</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <SkillCard key={category.title} {...category} isVisible={isVisible} delay={index * 100} />
        ))}
      </div>
    </section>
  )
}

function SkillCard({
  title,
  subtitle,
  icon: Icon,
  skills,
  color,
  iconColor,
  isVisible,
  delay,
}: {
  title: string
  subtitle: string
  icon: LucideIcon
  skills: string[]
  color: string
  iconColor: string
  isVisible: boolean
  delay: number
}) {
  return (
    <div
      className="glass glass-hover group relative overflow-hidden rounded-2xl p-5 transition-all duration-500 hover:glow"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative">
        <div className="mb-3 flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80 ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-secondary/80 px-3 py-1.5 text-sm font-medium text-foreground transition-colors group-hover:bg-background/50"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
