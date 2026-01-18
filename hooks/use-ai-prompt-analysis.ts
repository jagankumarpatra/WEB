/**
 * Advanced prompt analysis hook for HR/recruiter intelligent questioning
 * Helps understand what data the AI can provide based on natural language queries
 */

interface PromptPattern {
  keywords: string[]
  category: string
  subcategories?: string[]
}

const promptPatterns: PromptPattern[] = [
  {
    keywords: ["experience", "background", "worked", "career", "role", "professional", "journey"],
    category: "experience",
    subcategories: ["current", "previous", "duration", "achievements"],
  },
  {
    keywords: ["skill", "tech", "technology", "stack", "languages", "framework", "tools", "proficient", "expertise"],
    category: "skills",
    subcategories: ["languages", "frontend", "backend", "databases", "devops", "tools"],
  },
  {
    keywords: ["project", "build", "built", "github", "repo", "portfolio", "code", "work", "deliverable"],
    category: "projects",
    subcategories: ["technical", "achievements", "links", "tech-stack"],
  },
  {
    keywords: ["education", "university", "college", "cgpa", "gpa", "degree", "study", "academic", "qualification"],
    category: "education",
    subcategories: ["institution", "cgpa", "field", "degree"],
  },
  {
    keywords: ["contact", "reach", "email", "phone", "connect", "linkedin", "github", "social", "hire", "interview"],
    category: "contact",
    subcategories: ["email", "linkedin", "github", "phone"],
  },
  {
    keywords: ["summary", "about", "who", "tell", "profile", "overview", "introduction", "resume"],
    category: "summary",
    subcategories: ["bio", "highlights", "statistics"],
  },
  {
    keywords: ["current", "now", "working", "runo", "present"],
    category: "current",
    subcategories: ["role", "focus", "achievements"],
  },
  {
    keywords: ["payment", "razorpay", "integration", "gateway", "transaction", "billing"],
    category: "payment",
    subcategories: ["technologies", "experience", "projects"],
  },
  {
    keywords: ["aws", "cloud", "lambda", "cognito", "infra", "devops", "deployment", "serverless"],
    category: "aws",
    subcategories: ["services", "experience", "projects"],
  },
  {
    keywords: ["api", "optimization", "rest", "backend", "performance", "scaling"],
    category: "api",
    subcategories: ["optimization", "design", "technologies"],
  },
  {
    keywords: ["mobile", "flutter", "app", "android", "ios"],
    category: "mobile",
    subcategories: ["flutter", "apps", "projects"],
  },
  {
    keywords: ["database", "mongodb", "mysql", "data", "sql"],
    category: "databases",
    subcategories: ["mongodb", "mysql", "experience"],
  },
]

/**
 * Analyzes user prompt and identifies relevant data categories
 */
export function analyzePromptIntelligently(prompt: string): {
  primaryCategory: string
  relevantCategories: string[]
  confidence: number
  suggestions: string[]
} {
  const lower = prompt.toLowerCase()
  const matches: { category: string; confidence: number }[] = []

  for (const pattern of promptPatterns) {
    const matchCount = pattern.keywords.filter((kw) => lower.includes(kw)).length

    if (matchCount > 0) {
      const confidence = Math.min(100, (matchCount / pattern.keywords.length) * 100)
      matches.push({ category: pattern.category, confidence })
    }
  }

  // Sort by confidence
  matches.sort((a, b) => b.confidence - a.confidence)

  const primaryCategory = matches[0]?.category || "general"
  const relevantCategories = matches.slice(0, 3).map((m) => m.category)
  const avgConfidence = matches.length > 0 ? matches[0].confidence : 0

  // Generate helpful suggestions if confidence is low
  const suggestions: string[] = []
  if (avgConfidence < 50) {
    suggestions.push("Try asking: 'Tell me about experience'")
    suggestions.push("Or: 'What skills and tech stack?'")
    suggestions.push("Or: 'Show projects with links'")
  }

  return {
    primaryCategory,
    relevantCategories,
    confidence: Math.round(avgConfidence),
    suggestions,
  }
}

/**
 * Suggests what questions an HR/recruiter can ask
 */
export function getHRSuggestions(): string[] {
  return [
    "📋 What's your professional background and experience?",
    "🛠️ Can you walk me through your tech stack?",
    "📦 Show me your key projects with GitHub links",
    "🎓 What's your educational background?",
    "💼 What are you currently working on at Runo?",
    "☁️ Do you have AWS and cloud experience?",
    "💳 Tell me about your payment gateway integration experience",
    "⚡ How have you optimized APIs in your projects?",
    "📱 Do you have mobile development experience?",
    "📞 How can I reach you or connect?",
    "🚀 What are your key strengths and achievements?",
    "🔗 Can you share your GitHub and LinkedIn?",
  ]
}

/**
 * Extracts context requirements for comprehensive CV analysis
 */
export function getCVContextRequirements() {
  return {
    minimum: ["experience", "skills", "projects", "contact"],
    comprehensive: ["experience", "skills", "projects", "education", "contact", "summary"],
    hrInterviewReady: [
      "experience",
      "current",
      "skills",
      "projects",
      "achievements",
      "education",
      "contact",
      "summary",
    ],
  }
}
