"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { TerminalIcon, ChevronRight } from "lucide-react"

const COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  whoami     - About me",
    "  skills     - My tech stack",
    "  experience - Work history",
    "  projects   - My projects",
    "  contact    - Get in touch",
    "  leetcode   - Coding stats",
    "  clear      - Clear terminal",
  ],
  whoami: [
    "Jagan Kumar Patra",
    "━━━━━━━━━━━━━━━━━━━",
    "Backend Developer with 1.6 years of experience",
    "Currently at Runo, building scalable backend systems",
    "Passionate about Node.js, TypeScript, and AWS",
    "",
    "📍 Hyderabad, India",
    "🎓 B.Tech in Computer Science (CGPA: 8.7)",
  ],
  skills: [
    "⚡ Backend: Node.js, TypeScript, Express.js",
    "🗄️ Database: MongoDB, PostgreSQL, Redis",
    "☁️ Cloud: AWS Lambda, S3, EC2, SNS, SQS",
    "📱 Mobile: Flutter, Dart",
    "🔧 Tools: Git, Docker, Postman, Jira",
  ],
  experience: [
    "💼 Software Development Engineer @ Runo",
    "   Jul 2024 - Present | Hyderabad",
    "   → Call analysis filtering & PRD implementation",
    "   → 25% improvement in API performance",
    "",
    "💼 Software Developer @ Invincix Solutions",
    "   Jan 2024 - Jul 2024 | Hyderabad",
    "   → Built Flutter app with 14K+ users",
    "   → Integrated payment gateway & push notifications",
  ],
  projects: [
    "🔹 Vaccine Registration API",
    "   REST API with user auth & slot booking",
    "   Tech: Node.js, Express, MongoDB, JWT",
    "",
    "🔹 Movie Booking App",
    "   Full-featured mobile app with payments",
    "   Tech: Flutter, Dart, Provider, Razorpay",
  ],
  contact: [
    "📧 patrajagankumar2002@gmail.com",
    "📱 +91 8637249203",
    "🔗 linkedin.com/in/jagan-kumar-patra",
    "🐙 github.com/jagankumarpatra",
  ],
  leetcode: [
    "🏆 LeetCode Profile: patrajagankumar",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "→ Visit: leetcode.com/u/patrajagankumar",
  ],
}

type HistoryItem = {
  command: string
  output: string[]
}

export function TerminalComponent() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: "", output: ['Type "help" for available commands'] },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.toLowerCase().trim()

    if (cmd === "clear") {
      setHistory([{ command: "", output: ['Terminal cleared. Type "help" for commands.'] }])
      setInput("")
      return
    }

    const output = COMMANDS[cmd]
      ? Array.isArray(COMMANDS[cmd])
        ? COMMANDS[cmd]
        : [COMMANDS[cmd] as string]
      : [`Command not found: ${cmd}. Type "help" for available commands.`]

    setHistory((prev) => [...prev, { command: input, output }])
    setInput("")
  }

  return (
    <div className="glass rounded-2xl overflow-hidden border border-border/50">
      {/* Terminal Header */}
      <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/30 px-4 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TerminalIcon className="h-4 w-4" />
          <span className="font-mono">jagan@portfolio ~ </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="h-64 overflow-y-auto p-4 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="mb-3">
            {item.command && (
              <div className="flex items-center gap-2 text-primary">
                <ChevronRight className="h-4 w-4" />
                <span>{item.command}</span>
              </div>
            )}
            {item.output.map((line, j) => (
              <div key={j} className="pl-6 text-muted-foreground whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 text-primary">
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50"
            placeholder="Type a command..."
            autoFocus
          />
        </form>
      </div>
    </div>
  )
}
