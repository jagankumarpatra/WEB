"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Mail, Phone, MapPin, Send, Linkedin, Github, Code2, MessageSquare } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ContactForm } from "@/components/contact-form"

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [visitorCount, setVisitorCount] = useState(0)
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    try {
      // Update year
      setYear(new Date().getFullYear())
      // Update visitor count
      const stored = localStorage.getItem("jagan-resume-visits")
      const count = (stored ? parseInt(stored) : 0) + 1
      localStorage.setItem("jagan-resume-visits", count.toString())
      setVisitorCount(count)
    } catch (e) {
      console.log("Visitor count error:", e)
    }
  }, [])

  return (
    <section ref={ref} id="contact" className="scroll-mt-24">
      <div
        className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-500"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left side - Info */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Send className="h-4 w-4" />
              Let's Connect
            </div>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Got a project in mind? <br />
              <span className="text-white">Let's talk!</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              I'm currently open to new opportunities in backend development. Whether you have a question or just want
              to say hi, feel free to reach out!
            </p>

            <div className="grid gap-3">
              <ContactCard icon={MapPin} label="Location" value="Hyderabad, India" />
              <ContactCard icon={Phone} label="Phone" value="+91 8637249203" href="tel:+918637249203" />
              <ContactCard
                icon={Mail}
                label="Email"
                value="patrajagankumar2002@gmail.com"
                href="mailto:patrajagankumar2002@gmail.com"
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <MessageSquare className="h-5 w-5 text-primary" />
              Send me a message
            </div>
            <ContactForm />
          </div>
        </div>
      </div>

      <footer className="mt-6 flex items-center justify-center gap-2 border-t border-border/30 py-3 sm:py-4">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <p>
            © <span className="font-medium text-foreground">{year}</span> <span className="font-medium text-foreground">Jagan Kumar Patra</span>
          </p>
          <span className="text-primary">✨</span>
          <p className="inline-flex items-center gap-1">
            <span className="font-semibold text-primary animate-pulse">{visitorCount.toLocaleString()}</span><span className="text-muted-foreground">magic visits</span>
          </p>
        </div>

        <div className="flex items-center gap-3 ml-2 pl-2 border-l border-border/30">
          <FooterLink href="https://github.com/jagankumarpatra" icon={Github} label="GitHub" />
          <FooterLink href="https://www.linkedin.com/in/jagan-kumar-patra/" icon={Linkedin} label="LinkedIn" />
          <FooterLink href="https://leetcode.com/u/patrajagankumar/" icon={Code2} label="LeetCode" />
        </div>
      </footer>
    </section>
  )
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-4 transition-all hover:bg-secondary/80">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}

function FooterLink({
  href,
  icon: Icon,
  label,
}: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground transition-colors hover:text-primary"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </a>
  )
}
