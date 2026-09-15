'use client'

import SignupForm from '@/components/auth/signup-form'
import { BrandLogo } from '@/components/brand-logo'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#F4F5EF]">
      {/* Header */}
      <div className="border-b border-[#10251F]/10 bg-[#F4F5EF]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex h-[72px] items-center justify-between px-5 lg:px-8">
          <BrandLogo />
          <Link href="/signin" className="text-sm font-medium text-[#4D625B] hover:text-[#10251F]">Sign in</Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#71827C]">Open an account</p>
          <h1 className="mt-4 text-5xl font-medium leading-[.98] tracking-[-0.055em] text-[#10251F]">
            Your modern portfolio starts here.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-6 text-[#60736C]">
            Create your Sterling Ridge profile to invest across digital assets, global equities, and managed strategies.
          </p>
          <div className="mt-10 space-y-4">
            {['One clear portfolio view', 'Risk-aware allocation', 'Secure account access'].map((item, index) => (
              <div key={item} className="flex items-center gap-4 text-sm font-medium text-[#31594B]">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#D5F26A] text-[10px] font-bold">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <SignupForm />
        </div>
      </div>
    </main>
  )
}
