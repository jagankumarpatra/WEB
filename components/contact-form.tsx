"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 5000)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <Input
            id="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-secondary/50 border-border/50 focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-secondary/50 border-border/50 focus:border-primary"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Tell me about your project or opportunity..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={4}
          className="bg-secondary/50 border-border/50 focus:border-primary resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle className="h-4 w-4" />
            Message Sent!
          </>
        ) : status === "error" ? (
          <>
            <AlertCircle className="h-4 w-4" />
            Failed to Send
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </Button>

      {status === "success" && (
        <p className="text-sm text-center text-green-500">Thanks for reaching out! I'll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-center text-red-500">Something went wrong. Please try emailing me directly.</p>
      )}
    </form>
  )
}
