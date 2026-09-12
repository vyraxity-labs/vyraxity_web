'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'
import {
  contactFormSchema,
  type ContactFormData,
  REASON_OPTIONS,
} from '@/lib/validations/contact'

export function ContactForm() {
  const t = useTranslations('contact.form')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null,
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData & { hp_field?: string }>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      reason: undefined,
      message: '',
      hp_field: '',
    },
  })

  const onSubmit = async (data: ContactFormData & { hp_field?: string }) => {
    setServerErrorMessage(null)
    setSubmitStatus('idle')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        if (result.issues) {
          const firstFieldKey = Object.keys(result.issues)[0]
          const fieldErrors = result.issues[firstFieldKey]
          setServerErrorMessage(
            Array.isArray(fieldErrors) && fieldErrors.length > 0
              ? `${firstFieldKey}: ${fieldErrors[0]}`
              : t('errorMessage'),
          )
        } else {
          setServerErrorMessage(result.error || t('errorMessage'))
        }
        setSubmitStatus('error')
        return
      }

      setSubmitStatus('success')
      reset()
    } catch (err) {
      console.error('Contact submission network error:', err)
      setServerErrorMessage(t('errorMessage'))
      setSubmitStatus('error')
    }
  }

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
        delayChildren: prefersReduced ? 0 : 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.55,
        ease: easeStandard,
      },
    },
  }

  return (
    <Section theme='dark' className='overflow-hidden py-20 md:py-32'>
      <Container>
        <div ref={sectionRef} className='max-w-2xl'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-start w-full'
          >
            {submitStatus === 'success' && (
              <motion.div
                variants={itemVariants}
                className='w-full mb-8 p-6 border border-vx-amber/40 bg-vx-ink rounded-vx-sm font-sans'
              >
                <div className='flex items-start gap-3'>
                  <span className='text-vx-amber mt-0.5'>✓</span>
                  <p className='text-vx-white text-base leading-relaxed'>
                    {t('successMessage')}
                  </p>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                variants={itemVariants}
                className='w-full mb-8 p-6 border border-red-500/40 bg-vx-ink rounded-vx-sm font-sans'
              >
                <div className='flex items-start gap-3'>
                  <span className='text-red-400 mt-0.5'>✕</span>
                  <p className='text-vx-white text-base leading-relaxed'>
                    {serverErrorMessage || t('errorMessage')}
                  </p>
                </div>
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className='w-full flex flex-col space-y-8'
            >
              {/* Spam Honeypot Field (hidden from genuine users) */}
              <div
                aria-hidden='true'
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  padding: 0,
                  margin: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                  whiteSpace: 'nowrap',
                  borderWidth: 0,
                }}
              >
                <label htmlFor='hp_field'>Do not fill this field</label>
                <input
                  id='hp_field'
                  type='text'
                  tabIndex={-1}
                  autoComplete='off'
                  {...register('hp_field')}
                />
              </div>

              {/* Name field */}
              <motion.div
                variants={itemVariants}
                className='flex flex-col space-y-2'
              >
                <label
                  htmlFor='name'
                  className='text-sm font-mono uppercase tracking-wider text-vx-muted'
                >
                  {t('name')} <span className='text-vx-amber'>*</span>
                </label>
                <input
                  id='name'
                  type='text'
                  autoComplete='name'
                  placeholder={t('namePlaceholder')}
                  {...register('name')}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full bg-vx-ink/70 border ${
                    errors.name
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-vx-line focus:border-vx-amber'
                  } rounded-vx-sm px-4 py-3.5 text-vx-white placeholder:text-vx-muted/50 text-base outline-none transition-colors duration-150`}
                />
                {errors.name && (
                  <p
                    id='name-error'
                    className='text-xs font-mono text-red-400 mt-1'
                  >
                    {t(errors.name.message as string)}
                  </p>
                )}
              </motion.div>

              {/* Email field */}
              <motion.div
                variants={itemVariants}
                className='flex flex-col space-y-2'
              >
                <label
                  htmlFor='email'
                  className='text-sm font-mono uppercase tracking-wider text-vx-muted'
                >
                  {t('email')} <span className='text-vx-amber'>*</span>
                </label>
                <input
                  id='email'
                  type='email'
                  autoComplete='email'
                  placeholder={t('emailPlaceholder')}
                  {...register('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full bg-vx-ink/70 border ${
                    errors.email
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-vx-line focus:border-vx-amber'
                  } rounded-vx-sm px-4 py-3.5 text-vx-white placeholder:text-vx-muted/50 text-base outline-none transition-colors duration-150`}
                />
                {errors.email && (
                  <p
                    id='email-error'
                    className='text-xs font-mono text-red-400 mt-1'
                  >
                    {t(errors.email.message as string)}
                  </p>
                )}
              </motion.div>

              {/* Company field (optional) */}
              <motion.div
                variants={itemVariants}
                className='flex flex-col space-y-2'
              >
                <label
                  htmlFor='company'
                  className='text-sm font-mono uppercase tracking-wider text-vx-muted'
                >
                  {t('company')}
                </label>
                <input
                  id='company'
                  type='text'
                  autoComplete='organization'
                  placeholder={t('companyPlaceholder')}
                  {...register('company')}
                  className='w-full bg-vx-ink/70 border border-vx-line focus:border-vx-amber rounded-vx-sm px-4 py-3.5 text-vx-white placeholder:text-vx-muted/50 text-base outline-none transition-colors duration-150'
                />
              </motion.div>

              {/* Reason dropdown/select (recommended improvement over plain text) */}
              <motion.div
                variants={itemVariants}
                className='flex flex-col space-y-2'
              >
                <label
                  htmlFor='reason'
                  className='text-sm font-mono uppercase tracking-wider text-vx-muted'
                >
                  {t('reason')} <span className='text-vx-amber'>*</span>
                </label>
                <div className='relative'>
                  <select
                    id='reason'
                    defaultValue=''
                    {...register('reason')}
                    aria-invalid={errors.reason ? 'true' : 'false'}
                    aria-describedby={
                      errors.reason ? 'reason-error' : undefined
                    }
                    className={`w-full appearance-none bg-vx-ink/70 border ${
                      errors.reason
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-vx-line focus:border-vx-amber'
                    } rounded-vx-sm px-4 py-3.5 text-vx-white text-base outline-none transition-colors duration-150 cursor-pointer pr-10`}
                  >
                    <option
                      value=''
                      disabled
                      className='bg-vx-black text-vx-muted'
                    >
                      {t('reasonPlaceholder')}
                    </option>
                    {REASON_OPTIONS.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className='bg-vx-black text-vx-white'
                      >
                        {t(option)}
                      </option>
                    ))}
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-vx-muted'>
                    <svg
                      width='12'
                      height='12'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <polyline points='6 9 12 15 18 9' />
                    </svg>
                  </div>
                </div>
                {errors.reason && (
                  <p
                    id='reason-error'
                    className='text-xs font-mono text-red-400 mt-1'
                  >
                    {t(errors.reason.message as string)}
                  </p>
                )}
              </motion.div>

              {/* Message field */}
              <motion.div
                variants={itemVariants}
                className='flex flex-col space-y-2'
              >
                <label
                  htmlFor='message'
                  className='text-sm font-mono uppercase tracking-wider text-vx-muted'
                >
                  {t('message')} <span className='text-vx-amber'>*</span>
                </label>
                <textarea
                  id='message'
                  rows={5}
                  placeholder={t('messagePlaceholder')}
                  {...register('message')}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                  className={`w-full bg-vx-ink/70 border ${
                    errors.message
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-vx-line focus:border-vx-amber'
                  } rounded-vx-sm px-4 py-3.5 text-vx-white placeholder:text-vx-muted/50 text-base outline-none transition-colors duration-150 resize-y min-h-35`}
                />
                {errors.message && (
                  <p
                    id='message-error'
                    className='text-xs font-mono text-red-400 mt-1'
                  >
                    {t(errors.message.message as string)}
                  </p>
                )}
              </motion.div>

              {/* Submit button */}
              <motion.div variants={itemVariants} className='pt-4'>
                <Button
                  type='submit'
                  variant='primary'
                  disabled={isSubmitting}
                  className='w-full sm:w-auto min-w-45'
                >
                  {isSubmitting ? t('submitting') : t('submit')}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
