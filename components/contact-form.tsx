"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  type: "bot" | "user"
  content: string
  timestamp: Date
}

export function ContactForm() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hey there! 👋 I'd love to hear from you. What's your name?",
      timestamp: new Date(),
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [step, setStep] = useState(0) // 0: name, 1: email, 2: message, 3: submitted
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Handle different steps
    if (step === 0) {
      // Name
      setFormData((prev) => ({ ...prev, name: inputValue }))
      setStep(1)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "bot",
            content: `Nice to meet you, ${inputValue}! 😊 What's your email?`,
            timestamp: new Date(),
          },
        ])
      }, 800)
    } else if (step === 1) {
      // Email - simple validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(inputValue.trim())) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "bot",
            content: "Hmm, that doesn't look like a valid email. Please try again! 📧",
            timestamp: new Date(),
          },
        ])
        return
      }
      setFormData((prev) => ({ ...prev, email: inputValue }))
      setStep(2)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "bot",
            content: "Got it! Now, tell me what's on your mind? 💭",
            timestamp: new Date(),
          },
        ])
      }, 500)
    } else if (step === 2) {
      // Message
      setFormData((prev) => ({ ...prev, message: inputValue }))
      setIsLoading(true)

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: inputValue,
          }),
        })

        setIsLoading(false)

        if (response.ok) {
          setStep(3)
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: "bot",
              content: `Perfect! ✨ Thanks for reaching out, ${formData.name}. I'll get back to you soon at ${formData.email}`,
              timestamp: new Date(),
            },
          ])
          // Reset form after 2 seconds
          setTimeout(() => {
            setMessages([
              {
                id: "1",
                type: "bot",
                content: "Hey there! 👋 I'd love to hear from you. What's your name?",
                timestamp: new Date(),
              },
            ])
            setStep(0)
            setFormData({ name: "", email: "", message: "" })
            setInputValue("")
          }, 2000)
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: "bot",
              content: "Oops! Something went wrong. Try emailing me directly instead. 😅",
              timestamp: new Date(),
            },
          ])
        }
      } catch {
        setIsLoading(false)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "bot",
            content: "Something went wrong. Please try again! 🤔",
            timestamp: new Date(),
          },
        ])
      }
    }
  }

  return (
    <div className="flex flex-col h-[350px] sm:h-[450px] md:h-[500px] bg-gradient-to-b from-secondary/20 to-secondary/5 rounded-2xl border border-border/30 backdrop-blur-sm overflow-hidden">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-xs sm:max-w-sm px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-sm ${
                msg.type === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-secondary/60 text-foreground rounded-bl-none border border-border/30 backdrop-blur-sm"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary/60 text-foreground px-4 py-3 rounded-2xl rounded-bl-none border border-border/30 backdrop-blur-sm">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-border/30 p-3 sm:p-4 bg-secondary/30 backdrop-blur-sm">
        {step === 3 ? (
          <div className="text-center text-xs sm:text-sm text-muted-foreground">
            <p>✅ Message sent successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
            {step === 2 ? (
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    handleSendMessage(e as unknown as React.FormEvent)
                  }
                }}
                placeholder="Share your thoughts (Ctrl+Enter)..."
                rows={2}
                className="bg-secondary/50 border-border/50 focus:border-primary resize-none flex-1 text-xs sm:text-sm"
                disabled={isLoading}
              />
            ) : (
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(e as unknown as React.FormEvent)
                  }
                }}
                placeholder={step === 0 ? "Type your name..." : "Type your email..."}
                type={step === 1 ? "email" : "text"}
                className="bg-secondary/50 border-border/50 focus:border-primary flex-1 text-xs sm:text-sm"
                disabled={isLoading}
                required
              />
            )}
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="rounded-xl bg-primary hover:bg-primary/90 flex-shrink-0 h-9 sm:h-10 w-9 sm:w-10 transition-all"
            >
              {isLoading ? <Loader2 className="h-3.5 sm:h-4 w-3.5 sm:w-4 animate-spin" /> : <Send className="h-3.5 sm:h-4 w-3.5 sm:w-4" />}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
