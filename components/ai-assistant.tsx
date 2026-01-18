"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send, Sparkles, Github, Linkedin, Mail, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProfileData {
  personal: {
    name: string
    title: string
    location: string
    email: string
  }
  experience: Array<{
    company: string
    role: string
    duration: string
    current: boolean
    highlights: string[]
  }>
  skills: Record<string, string[]>
  projects: Array<{
    title: string
    subtitle: string
    description: string
    tech: string[]
    highlight: string
    github?: string
    achievements: string[]
  }>
  social: {
    github: string
    linkedin: string
  }
  resume: {
    url: string
    fileName: string
  }
  education: Array<{
    institution: string
    degree: string
    field: string
    cgpa: string
  }>
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<
    { id: string; type: "bot" | "user"; text: string; metadata?: Record<string, unknown> }[]
  >([
    {
      id: "1",
      type: "bot",
      text: "👋 Hi! I'm Jagan's AI Assistant. I have comprehensive access to his CV, projects, and portfolio. Feel free to ask me anything about:\n\n💼 Experience & roles\n🛠️ Technical skills & tech stack\n📦 Projects with GitHub links\n📚 Education & certifications\n📞 How to contact\n\nWhat would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading])


  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("/api/profile")
        const data = await response.json()
        setProfileData(data)
      } catch (error) {
        console.error("Failed to fetch profile data:", error)
      }
    }
    fetchProfileData()
  }, [])

  // Advanced prompt recognition and context matching
  const analyzePrompt = (prompt: string): string => {
    const lower = prompt.toLowerCase()

    // Keywords mapping to response generators
    const patterns = {
      // Experience patterns
      experience: ["experience", "background", "worked", "career", "role", "professional"],
      skills: ["skill", "tech", "technology", "stack", "languages", "framework", "tools", "proficient"],
      projects: ["project", "build", "built", "github", "repo", "portfolio", "code"],
      education: ["education", "university", "college", "cgpa", "gpa", "degree", "study", "academic"],
      contact: ["contact", "reach", "email", "phone", "connect", "linkedin", "github", "social", "linkedin"],
      summary: ["summary", "about", "who", "tell me", "profile", "overview", "background"],
      current: ["current", "now", "working", "now working", "runo"],
      payment: ["payment", "razorpay", "integration", "gateway"],
      aws: ["aws", "cloud", "lambda", "cognito", "infra", "devops"],
      api: ["api", "optimization", "rest", "backend"],
    }

    for (const [key, keywords] of Object.entries(patterns)) {
      if (keywords.some((kw) => lower.includes(kw))) {
        return key
      }
    }

    return "general"
  }

  // Generate contextual response with links
  const generateResponse = (analysisType: string): string => {
    if (!profileData) return "Loading profile data..."

    const { personal, experience, skills, projects, social, resume, education } = profileData

    const responses: Record<string, string> = {
      experience: `📋 **Experience Overview**

🏢 **Current Role:** Backend Developer at Runo (1.6+ years total)
${experience[0].highlights.map((h) => `  • ${h}`).join("\n")}

🏢 **Previous:** Flutter Developer at Invincix Solutions
  • Delivered milk delivery app serving 14K+ users
  • Payment gateway integration & real-time features

**GitHub:** ${social.github}`,

      skills: `🛠️ **Technical Stack**

💻 **Languages:** ${skills.languages.join(", ")}

🎨 **Frontend:** ${skills.frontend.join(", ")}

⚙️ **Backend:** ${skills.backend.join(", ")}

🗄️ **Databases:** ${skills.databases.join(", ")}

☁️ **DevOps & Cloud:** ${skills.devops.join(", ")}

🔧 **Tools:** ${skills.tools.join(", ")}

**Key Expertise:** API Optimization (25% improvement), Payment Gateway Integration, Microservices Architecture, Real-time Systems`,

      projects: `🚀 **Featured Projects**

${projects
  .map(
    (p) => `
📌 **${p.title}** ${p.highlight}
${p.subtitle}
${p.description}

Tech: ${p.tech.join(", ")}
${p.achievements.map((a) => `  ✓ ${a}`).join("\n")}
${p.github ? `🔗 GitHub: ${p.github}` : ""}
`,
  )
  .join("\n")}`,

      education: `🎓 **Education**

${education
  .map((e) => `**${e.degree}** - ${e.field}
${e.institution}
CGPA: ${e.cgpa}`)
  .join("\n\n")}`,

      contact: `📞 **Get in Touch**

📧 Email: ${personal.email}
🔗 GitHub: ${social.github}
💼 LinkedIn: ${social.linkedin}
📄 Resume: ${resume.url}`,

      summary: `👨‍💻 **About Jagan**

**${personal.title}**
📍 ${personal.location}

${experience[0].highlights.join(" | ")}

**Specializations:**
• Full-Stack Development (Backend + Mobile)
• Microservices & Cloud Architecture
• Payment System Integration
• Real-time Data Systems

**Quick Stats:**
✅ 1.6+ years experience
✅ 14K+ users served
✅ 25% API optimization
✅ 9.35/10.0 CGPA

**Links:** ${social.github} | ${social.linkedin}`,

      current: `💼 **Current Work @ Runo**

Backend Developer specializing in:
${experience[0].highlights.map((h) => `  ✓ ${h}`).join("\n")}

**Focus Areas:**
• Score-based filtering systems
• Call-analysis enhancements
• API performance optimization
• Scalable microservices`,

      payment: `💳 **Payment Gateway Integration**

Expertise in integrating and optimizing payment systems:
• Razorpay integration for mobile apps
• Multiple payment gateway handling
• Secure transaction flows
• Real-time payment verification

✅ Successfully implemented in Movie Booking App
📊 Processed thousands of transactions reliably`,

      aws: `☁️ **AWS & Cloud Infrastructure**

**Services Used:**
• AWS Lambda - Serverless compute
• API Gateway - Request routing
• Cognito - Authentication & authorization
• SQS/SNS - Async message processing
• Infrastructure as Code

**Projects:** Vaccine Registration API with AWS architecture
🔗 ${projects[0].github}`,

      api: `⚡ **API Optimization & Design**

**Achievements:**
• Optimized APIs by 25%
• REST API design & implementation
• Async workflow patterns
• Type-safe backends (TypeScript)

**Stack:** Node.js, Express, MongoDB
**Tools:** Postman, Swagger`,

      general: `🤔 I can help you learn more about Jagan! Try asking about:

💼 "Tell me about experience" or "What projects?"
🛠️ "What's the tech stack?" or "Skills?"
📦 "Show me projects with links"
🎓 "Education & CGPA?"
☁️ "AWS & Cloud experience?"
💳 "Payment gateway integration?"
📞 "How to contact?"

Or just ask anything and I'll provide relevant info!`,
    }

    return responses[analysisType] || responses.general
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { id: Date.now().toString(), type: "user" as const, text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI thinking time for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const analysisType = analyzePrompt(input)
    const response = generateResponse(analysisType)

    const botMessage = {
      id: (Date.now() + 1).toString(),
      type: "bot" as const,
      text: response,
    }

    setMessages((prev) => [...prev, botMessage])
    setIsLoading(false)
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 left-8 z-40 rounded-full bg-primary hover:bg-primary/90 p-4 shadow-lg animate-bounce"
          size="icon"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-400 animate-spin" />
          </div>
        </Button>
      )}

      {/* Backdrop - Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 left-8 z-40 w-96 h-[600px] bg-gradient-to-br from-secondary/95 to-secondary/85 rounded-2xl shadow-2xl border border-primary/20 backdrop-blur-sm flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/30 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Jagan's AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Powered by Smart CV AI</p>
              </div>
            </div>
            <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages - Enhanced with better formatting */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-primary/30">
            {messages.map((msg, idx) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-sm px-4 py-3 rounded-2xl text-sm break-words ${
                    msg.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none shadow-md"
                      : "bg-secondary/80 text-foreground rounded-bl-none border border-primary/30 shadow-sm"
                  }`}
                  style={{
                    animation: "fadeIn 0.3s ease-in",
                  }}
                >
                  {/* Render formatted text with line breaks and emphasis */}
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.text.split("\n").map((line, i) => {
                      // Bold lines
                      if (line.startsWith("**") && line.endsWith("**")) {
                        return (
                          <div key={i} className="font-semibold mt-2 mb-1">
                            {line.replace(/\*\*/g, "")}
                          </div>
                        )
                      }
                      // Section headers with icons
                      if (line.includes(":") && line.length < 60) {
                        return (
                          <div key={i} className="font-semibold text-primary mt-2 mb-1">
                            {line}
                          </div>
                        )
                      }
                      // Links
                      if (line.includes("http")) {
                        return (
                          <div key={i} className="my-1">
                            {line.split(/(\bhttps?:\/\/[^\s]+)/g).map((part, j) => 
                              /^https?:\/\//.test(part) ? (
                                <a
                                  key={j}
                                  href={part}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline break-all"
                                >
                                  {part.length > 50 ? part.substring(0, 47) + "..." : part}
                                </a>
                              ) : (
                                part
                              )
                            )}
                          </div>
                        )
                      }
                      return (
                        <div key={i} className={line.trim() === "" ? "h-1" : "my-0.5"}>
                          {line}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary/80 px-4 py-3 rounded-2xl rounded-bl-none border border-primary/30 shadow-sm">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Enhanced */}
          <div className="border-t border-border/30 p-4 flex gap-2 bg-gradient-to-t from-secondary/60 to-transparent">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Ask about CV, projects, skills..."
              className="bg-secondary/50 border-border/50 focus:border-primary text-sm h-10 placeholder:text-xs"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-10 w-10 rounded-lg bg-primary hover:bg-primary/90 transition-all"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
