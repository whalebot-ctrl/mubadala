'use client'

import Link from 'next/link'
import SignupForm from '@/components/auth/signup-form'

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b border-border/40 bg-[#0d0d0e] backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-black font-bold text-sm">SR</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-[#fafafa]">STERLINGRIDGE</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 py-12">
        <SignupForm />
      </div>
    </main>
  )
}
