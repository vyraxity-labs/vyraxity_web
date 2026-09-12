import { NextResponse } from 'next/server'
import { z } from 'zod'
import { contactFormSchema } from '@/lib/validations/contact'
import { resend } from '@/lib/email'

// Extend client validation schema on the server to include honeypot field check
const serverContactSchema = contactFormSchema.extend({
  hp_field: z.string().max(0, 'Bot detected').optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Validate payload with shared Zod schema
    const parseResult = serverContactSchema.safeParse(body)
    if (!parseResult.success) {
      // If honeypot is filled, silently return 200 to fool bots without sending email
      const honeypotError = parseResult.error.issues.find((issue) =>
        issue.path.includes('hp_field'),
      )
      if (honeypotError) {
        return NextResponse.json(
          { message: 'Message received' },
          { status: 200 },
        )
      }

      return NextResponse.json(
        {
          error: 'Validation failed',
          issues: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const { name, email, company, reason, message } = parseResult.data

    const toEmail = process.env.CONTACT_TO_EMAIL || 'hello@vyraxity.com'
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || 'no-reply@mail.vyraxity.com'

    // Clean display for reason
    const reasonLabel = reason.replace('reasons.', '').replace('_', ' ')

    // 2. Send transactional email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `Vyraxity Contact <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[Vyraxity Contact] ${reasonLabel.toUpperCase()}: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nReason: ${reasonLabel}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="border-bottom: 1px solid #eaeaea; padding-bottom: 12px; margin-top: 0;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0066cc;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
              <td style="padding: 8px 0;">${company || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Reason:</strong></td>
              <td style="padding: 8px 0; text-transform: capitalize;">${reasonLabel}</td>
            </tr>
          </table>
          <div style="background: #f7f7f7; padding: 16px; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
    })

    if (emailError) {
      console.error('[API /api/contact] Resend email error:', emailError)
      return NextResponse.json(
        { error: emailError.message || 'Failed to send email' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { success: true, id: emailData?.id },
      { status: 200 },
    )
  } catch (error) {
    console.error('[API /api/contact] Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
