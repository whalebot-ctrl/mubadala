import Link from 'next/link'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  href?: string
  compact?: boolean
  inverse?: boolean
  className?: string
}

export function BrandLogo({
  href = '/',
  compact = false,
  inverse = false,
  className,
}: BrandLogoProps) {
  const content = (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 44 44"
        className="size-9 shrink-0"
        fill="none"
      >
        <rect width="44" height="44" rx="12" fill="#10251F" />
        <path
          d="M9 29.5 17.3 20l5.1 5.2L31.7 13 36 17.1"
          stroke="#D5F26A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 34h27" stroke="#6B827A" strokeWidth="2" strokeLinecap="round" />
        <circle cx="31.8" cy="13" r="2.5" fill="#F7F8F3" />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'text-[15px] font-semibold tracking-[-0.02em]',
              inverse ? 'text-white' : 'text-[#10251F]',
            )}
          >
            Sterling Ridge
          </span>
          <span
            className={cn(
              'mt-1 text-[8px] font-medium uppercase tracking-[0.26em]',
              inverse ? 'text-white/50' : 'text-[#60736C]',
            )}
          >
            Digital Wealth
          </span>
        </span>
      )}
    </>
  )

  return (
    <Link
      href={href}
      aria-label="Sterling Ridge home"
      className={cn('inline-flex items-center gap-2.5', className)}
    >
      {content}
    </Link>
  )
}
