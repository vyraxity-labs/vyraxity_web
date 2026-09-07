import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'link'
export type ButtonSize = 'md' | 'sm'

export interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
}

export type ButtonProps = ButtonBaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  )

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { variant = 'primary', size = 'md', children, className, href, ...props },
  ref,
) {
  const isLinkVariant = variant === 'link'

  const baseStyles =
    'inline-flex items-center justify-center font-sans transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vx-amber disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none cursor-pointer'

  const sizeStyles = isLinkVariant
    ? 'p-0 text-base font-medium tracking-normal'
    : size === 'sm'
      ? 'h-10 px-5 text-sm font-medium tracking-wide rounded-vx-md'
      : 'h-[50px] px-7 text-base font-medium tracking-wide rounded-vx-md' // 48–52px height spec

  const variantStyles = {
    primary: 'bg-vx-amber text-vx-black hover:opacity-90 active:opacity-80',
    secondary:
      'bg-transparent text-vx-white border border-[#333] hover:border-vx-muted active:opacity-80',
    link: 'group text-vx-white hover:text-vx-white active:opacity-80',
  }[variant]

  const combinedClassName = cn(baseStyles, sizeStyles, variantStyles, className)

  const content = isLinkVariant ? (
    <span className='inline-flex items-center gap-2'>
      <span>{children}</span>
      <span
        aria-hidden='true'
        className='inline-block transition-transform duration-180 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transform-none'
      >
        &rarr;
      </span>
    </span>
  ) : (
    children
  )

  if (href !== undefined) {
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={combinedClassName}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={combinedClassName}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
})
