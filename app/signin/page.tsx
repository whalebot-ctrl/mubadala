'use client'

import Link from 'next/link'
import { SigninForm } from '@/components/auth/signin-form'

export default function SigninPage() {
  return (
    <main className="min-h-screen bg-[#fff] to-primary/10">
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
        <div className="w-full max-w-md">
          {/* Subtle firm branding above the form */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#000000] tracking-tight">Firm Login</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Access the SterlingRidge Investment Portal
            </p>
          </div>
          
          <SigninForm />
          
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Private and Confidential. Authorized access only.
          </p>
        </div>
      </div>
    </main>
  )
}