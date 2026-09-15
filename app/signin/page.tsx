'use client'

import Link from 'next/link'
import { SigninForm } from '@/components/auth/signin-form'
import { BrandLogo } from '@/components/brand-logo'
import { ShieldCheck } from 'lucide-react'

export default function SigninPage() {
  return (
    <main className="min-h-screen bg-[#F4F5EF]">
      <div className="border-b border-[#10251F]/10">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <BrandLogo />
          <Link href="/signup" className="text-sm font-medium text-[#4D625B] hover:text-[#10251F]">
            Create account
          </Link>
        </div>
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl lg:grid-cols-2">
        <div className="flex items-center px-5 py-12 lg:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#71827C]">Welcome back</p>
              <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-[#10251F]">Sign in to your portfolio</h1>
              <p className="mt-3 text-sm leading-6 text-[#60736C]">
                Track your holdings, review market activity, and manage available funds.
              </p>
            </div>
            <SigninForm />
            <p className="mt-6 flex items-center justify-center gap-2 text-xs text-[#71827C]">
              <ShieldCheck className="size-3.5" /> Secure, encrypted account access
            </p>
          </div>
        </div>
        <div className="relative hidden overflow-hidden bg-[#10251F] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-28 -top-28 size-96 rounded-full border border-[#D5F26A]/20" />
          <div className="absolute -right-8 -top-8 size-56 rounded-full border border-[#D5F26A]/20" />
          <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-[#D5F26A]">Sterling Ridge insight</p>
          <div className="relative">
            <p className="max-w-lg text-4xl font-medium leading-tight tracking-[-0.04em]">
              A calmer way to keep up with every part of your wealth.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {['Crypto', 'Stocks', 'Strategies'].map((label, index) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                  <span className="text-2xl font-medium">{['42%', '38%', '20%'][index]}</span>
                  <p className="mt-2 text-xs text-white/45">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="relative text-xs leading-5 text-white/40">
            Digital assets and securities carry risk. Values may fall as well as rise.
          </p>
        </div>
      </div>
    </main>
  )
}