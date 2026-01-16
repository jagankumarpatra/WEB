import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jagan Kumar Patra | Backend Developer",
  description:
    "Backend Developer with 1.6+ years of experience specializing in Node.js, TypeScript, AWS, MongoDB, and scalable system architecture. Open to opportunities.",
  keywords: [
    "Jagan Kumar Patra",
    "Backend Developer",
    "Node.js Developer",
    "TypeScript",
    "AWS",
    "MongoDB",
    "Software Engineer",
    "Full Stack Developer",
    "India",
  ],
  authors: [{ name: "Jagan Kumar Patra", url: "https://github.com/jagankumarpatra" }],
  creator: "Jagan Kumar Patra",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Jagan Kumar Patra | Backend Developer",
    description:
      "Backend Developer with 1.6+ years of experience building scalable systems. Specializing in Node.js, TypeScript, AWS & MongoDB.",
    siteName: "Jagan Kumar Patra - Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jagan Kumar Patra | Backend Developer",
    description: "Backend Developer with 1.6+ years of experience building scalable systems.",
    creator: "@jagankumarpatra",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://jagankumarpatra.vercel.app" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
