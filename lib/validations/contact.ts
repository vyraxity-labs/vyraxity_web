import { z } from 'zod'

export const REASON_OPTIONS = [
  'reasons.partnership',
  'reasons.careers',
  'reasons.press',
  'reasons.investment',
  'reasons.general_inquiry',
] as const

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'errors.nameRequired'),
  email: z
    .string()
    .trim()
    .min(1, 'errors.emailRequired')
    .email('errors.emailInvalid'),
  company: z.string().trim().optional(),
  reason: z.enum(REASON_OPTIONS, {
    error: 'errors.reasonRequired',
  }),
  message: z.string().trim().min(10, 'errors.messageTooShort'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
