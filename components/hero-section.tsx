"use client"

import type React from "react"
import { Github, Linkedin, Mail, Code2, MapPin, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTypingEffect } from "@/hooks/use-typing-effect"

export function HeroSection() {
  const { displayedText, isTyping } = useTypingEffect("Backend Developer", 80, 800)

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center px-4 pb-12 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl w-full">
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:gap-16 lg:text-left">
          {/* Profile Image with premium glow */}
          <div className="relative mb-8 lg:mb-0 flex-shrink-0">
            {/* Animated glow rings */}
            <div className="absolute -inset-6 sm:-inset-8 rounded-full bg-gradient-to-r from-primary/40 via-emerald-500/20 to-primary/40 blur-3xl animate-pulse-glow" />
            <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-xl" />

            <div className="relative">
              <div className="h-36 w-36 sm:h-44 sm:w-44 overflow-hidden rounded-full border-2 border-primary/40 p-1 sm:p-1.5 animate-border-glow">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-primary/30 via-card to-secondary flex items-center justify-center backdrop-blur-sm">
                  <span className="text-5xl sm:text-6xl font-black text-gradient">JK</span>
                </div>
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-card/95 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium backdrop-blur-md border border-primary/30 shadow-lg shadow-primary/10 whitespace-nowrap">
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500" />
                </span>
                Open to work
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-5">
              {/* Animated badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
                <span className={isTyping ? "typing-cursor" : ""}>{displayedText}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
                Hi, I'm <span className="text-gradient block sm:inline">Jagan Kumar Patra</span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                I build <span className="text-foreground font-semibold">production-grade backend systems</span> with
                Node.js, TypeScript, and AWS. Currently crafting scalable solutions at{" "}
                <span className="text-primary font-semibold">Runo</span>.
              </p>

              <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-muted-foreground lg:justify-start">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Bhubaneswar, Odisha, India</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto group gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105 px-6"
                asChild
              >
                <a
                  href="https://blobs.vusercontent.net/blob/Jagan-Kumar-Patra-FlowCV-Resume-20260117-xSrYwnTXZKuozhR20bsHiC4hPNZ1Dw.pdf"
                  download="Jagan-Kumar-Patra-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  Download Resume
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all hover:scale-105 px-6"
                asChild
              >
                <a href="mailto:patrajagankumar2002@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3 pt-2 lg:justify-start">
              <SocialLink href="https://github.com/jagankumarpatra" icon={Github} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/jagan-kumar-patra/" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="https://leetcode.com/u/patrajagankumar/" icon={Code2} label="LeetCode" />
              <SocialLink href="mailto:patrajagankumar2002@gmail.com" icon={Mail} label="Email" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
      aria-label={label}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-colors group-hover:text-primary" />
    </a>
  )
}
