"use client"

import { FolderGit2, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const projects = [
  {
    title: "Vaccine Registration API",
    subtitle: "CoWIN-inspired Backend System",
    description:
      "Production-style backend with secure user registration, slot booking & dose management. Type-safe Node.js/TypeScript with AWS Lambda, API Gateway, Cognito auth, and async workflows via SQS/SNS.",
    tech: ["Node.js", "TypeScript", "AWS Lambda", "MongoDB", "Cognito"],
    github: "https://github.com/jagankumarpatra/Vaccine-Registration-Runo",
    highlight: "14K+ Users",
  },
  {
    title: "Movie Booking App",
    subtitle: "Full-Stack Mobile Application",
    description:
      "Responsive movie booking app with Firebase Auth, Razorpay payments, and Provider state management. Optimized widget rebuilds and API data parsing for better performance.",
    tech: ["Flutter", "Dart", "Firebase", "Razorpay", "Provider"],
    github: null,
    highlight: "Mobile App",
  },
]

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="projects" className="scroll-mt-24">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
          <FolderGit2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-sm text-muted-foreground">What I've built</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="glass glass-hover card-premium group relative overflow-hidden rounded-2xl transition-all duration-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transitionDelay: `${index * 150}ms`,
            }}
          >
            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                    {project.highlight && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                        {project.highlight}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-primary/80">{project.subtitle}</p>
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/50 text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                    aria-label={`${project.title} GitHub`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="rounded-lg bg-secondary/80 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
