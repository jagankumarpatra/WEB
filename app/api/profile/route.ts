import { NextResponse } from "next/server"

export async function GET() {
  try {
    const profileData = {
      personal: {
        name: "Jagan Kumar Patra",
        title: "Backend & Full-Stack Developer",
        location: "Hyderabad, India",
        email: "patrajagankumar2002@gmail.com",
        phone: "+91-YOUR-PHONE", // Add your phone if needed
      },
      education: [
        {
          institution: "Silicon Institute of Technology",
          degree: "Bachelor of Technology",
          field: "Computer Science & Engineering",
          cgpa: "9.35/10.0",
          endDate: "2022",
        },
      ],
      experience: [
        {
          company: "Runo",
          role: "Backend Developer",
          duration: "1.6+ years",
          current: true,
          highlights: [
            "Implementing score-based filter features",
            "Call-analysis enhancement systems",
            "API optimization and microservices architecture",
          ],
        },
        {
          company: "Invincix Solutions",
          role: "Flutter Developer",
          duration: "Previous role",
          highlights: [
            "Developed milk delivery app serving 14K+ users",
            "Payment gateway integration",
            "Firebase authentication and real-time database",
          ],
        },
      ],
      skills: {
        languages: ["Java", "Dart", "TypeScript", "JavaScript"],
        frontend: ["Flutter", "Next.js", "React", "Tailwind CSS"],
        backend: ["Node.js", "Express", "Serverless", "Firebase", "Kafka", "REST APIs"],
        databases: ["MongoDB", "MySQL"],
        devops: ["AWS", "Netlify", "Vercel", "GitHub Actions"],
        tools: ["Jira", "Bitbucket", "GitHub", "Postman", "Swagger"],
      },
      projects: [
        {
          title: "Vaccine Registration API",
          subtitle: "CoWIN-inspired Backend System",
          description:
            "Production-style backend with secure user registration, slot booking & dose management",
          tech: ["Node.js", "TypeScript", "AWS Lambda", "MongoDB", "Cognito"],
          highlight: "14K+ Users",
          github: "https://github.com/jagankumarpatra/Vaccine-Registration-Runo",
          achievements: [
            "Type-safe architecture with TypeScript",
            "AWS Lambda + API Gateway deployment",
            "Cognito authentication",
            "Async workflows via SQS/SNS",
          ],
        },
        {
          title: "Movie Booking App",
          subtitle: "Full-Stack Mobile Application",
          description:
            "Responsive movie booking app with Firebase Auth, Razorpay payments, and Provider state management",
          tech: ["Flutter", "Dart", "Firebase", "Razorpay", "Provider"],
          highlight: "Mobile App",
          achievements: [
            "Firebase Authentication",
            "Razorpay payment integration",
            "Optimized widget rebuilds",
            "Efficient API data parsing",
          ],
        },
      ],
      social: {
        github: "https://github.com/jagankumarpatra",
        linkedin: "https://www.linkedin.com/in/jagan-kumar-patra/",
        leetcode: "https://leetcode.com", // Add your LeetCode profile
      },
      resume: {
        url: "https://blobs.vusercontent.net/blob/Jagan-Kumar-Patra-FlowCV-Resume-20260117-xSrYwnTXZKuozhR20bsHiC4hPNZ1Dw.pdf",
        fileName: "Jagan-Kumar-Patra-Resume.pdf",
      },
      summary: `Full-Stack Developer with 1.6+ years of experience building scalable backends and mobile applications. 
      Specialized in Node.js/TypeScript microservices, AWS cloud services, and Flutter development. 
      Successfully delivered projects serving 14K+ users with expertise in payment gateway integration, 
      API optimization, and real-time data systems. CGPA: 9.35/10.0`,
      strengths: [
        "Backend architecture & microservices design",
        "API optimization (achieved 25% performance improvement)",
        "Payment gateway integration (Razorpay, etc)",
        "Cloud infrastructure (AWS Lambda, Cognito)",
        "Real-time systems (Firebase, Kafka)",
        "Full-stack capabilities (mobile & backend)",
      ],
    }

    return NextResponse.json(profileData)
  } catch (error) {
    console.error("Profile API error:", error)
    return NextResponse.json({ error: "Failed to fetch profile data" }, { status: 500 })
  }
}
