"use client"

import { useEffect, useState } from "react"
import { User, Briefcase, FolderGit2, Wrench, GraduationCap, Mail, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "projects", icon: FolderGit2, label: "Projects" },
  { id: "skills", icon: Wrench, label: "Skills" },
  { id: "education", icon: GraduationCap, label: "Education" },
  { id: "contact", icon: Mail, label: "Contact" },
]

export function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling 100px
      setIsVisible(window.scrollY > 100)

      // Find active section
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={cn(
        "fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none",
      )}
    >
      <div className="flex items-center gap-1 rounded-full border border-border/50 bg-card/80 px-2 py-2 backdrop-blur-xl shadow-lg shadow-black/10">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
              aria-label={item.label}
            >
              <Icon className="h-4 w-4" />

              {/* Tooltip */}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
