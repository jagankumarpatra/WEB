import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Here you can integrate with an email service like:
    // - Resend (resend.com)
    // - SendGrid
    // - Nodemailer
    // For now, we'll just log the message and return success

    console.log("Contact form submission:", { name, email, message })

    // Example with Resend (uncomment and add RESEND_API_KEY env var):
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'patrajagankumar2002@gmail.com',
    //   subject: `Portfolio Contact: ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //   `,
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
