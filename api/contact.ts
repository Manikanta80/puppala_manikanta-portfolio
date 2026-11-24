// Vercel serverless function for contact form submission
import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message, website } = req.body

    // Honeypot protection - if website field is filled, silently discard
    if (website && website.trim() !== '') {
      return res.status(200).json({ success: true })
    }

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Send email via Resend (RESEND_API_KEY must be set in Vercel env)
    try {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio <onboarding@resend.dev>',
          to: 'manipuppala9985@gmail.com',
          subject: `Portfolio Contact: ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        }),
      })

      if (!resendResponse.ok) {
        console.error('Resend error:', await resendResponse.text())
      }
    } catch (resendError) {
      // Don't fail the request if email sending fails; just log it
      console.error('Resend connection error:', resendError)
    }

    return res.status(200).json({ success: true })
  } catch {
    return res.status(500).json({ error: 'Server error' })
  }
}