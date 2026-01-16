import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { StatsCard } from "@/components/stats-card"
import { CursorSpotlight } from "@/components/cursor-spotlight"
import { FloatingNavbar } from "@/components/floating-navbar"
import { TerminalComponent } from "@/components/terminal"
import { LeetCodeStats } from "@/components/leetcode-stats"
import { QuoteOfDay } from "@/components/quote-of-day"
import { VisitorCounter } from "@/components/visitor-counter"

export default function ResumePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background noise-overlay">
      <CursorSpotlight />
      <FloatingNavbar />
      <ThemeToggle />

      {/* Premium animated background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Main glow orb */}
        <div className="absolute -left-32 -top-32 h-[300px] sm:h-[500px] w-[300px] sm:w-[500px] rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-[80px] sm:blur-[100px] animate-pulse-glow" />

        {/* Secondary accent orb */}
        <div
          className="absolute -right-32 top-1/4 h-[250px] sm:h-[400px] w-[250px] sm:w-[400px] rounded-full bg-gradient-to-bl from-emerald-500/20 via-teal-500/10 to-transparent blur-[100px] sm:blur-[120px] animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />

        {/* Bottom accent */}
        <div
          className="absolute -bottom-32 left-1/4 h-[300px] sm:h-[450px] w-[300px] sm:w-[450px] rounded-full bg-gradient-to-tr from-primary/20 via-cyan-500/10 to-transparent blur-[80px] sm:blur-[100px] animate-pulse-glow"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        <HeroSection />

        <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:gap-8">
            {/* About + Stats Row */}
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2">
                <AboutSection />
              </div>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-4">
                <StatsCard value="1.6+" label="Years Experience" delay={0} />
                <StatsCard value="14K+" label="Users Impacted" delay={100} />
                <StatsCard value="25%" label="API Performance Boost" delay={200} className="col-span-2 lg:col-span-1" />
              </div>
            </div>

            {/* Terminal + LeetCode Row */}
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <TerminalComponent />
              <LeetCodeStats />
            </div>

            {/* Quote + Visitor Counter Row */}
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              <QuoteOfDay />
              <VisitorCounter />
            </div>

            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <EducationSection />
            <ContactSection />
          </div>
        </main>
      </div>
    </div>
  )
}
