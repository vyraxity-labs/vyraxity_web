import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),

  // Phase 10: Email delivery vars (optional until Phase 10 contact form integration)
  RESEND_API_KEY: z.string().min(1),
  // .optional(),
  CONTACT_TO_EMAIL: z.string().email(),
  // .optional(),
  CONTACT_FROM_EMAIL: z.string().email(),
  // .optional(),
})

function getEnv() {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  })

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format())
    throw new Error('Invalid environment variables. Check console for details.')
  }

  return parsed.data
}

export const env = getEnv()
