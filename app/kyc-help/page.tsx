'use client'

import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertCircle, FileText, Camera } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function KYCHelpPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">SR</span>
              </div>
              <span className="font-bold text-foreground">Sterling Ridge</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            KYC Verification Guide
          </h1>
          <p className="text-xl text-muted-foreground">
            Complete your identity verification to unlock all platform features.
          </p>
        </div>

        {/* What is KYC */}
        <Card className="border-0 shadow-md bg-white mb-8">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">What is KYC?</h2>
            <p className="text-muted-foreground leading-relaxed">
              KYC stands for &quot;Know Your Customer&quot;. It&apos;s an identity verification process required by financial regulations worldwide to prevent fraud, money laundering, and terrorist financing. All legitimate investment platforms are required to verify the identity of their users.
            </p>
          </div>
        </Card>

        {/* KYC Process */}
        <Card className="border-0 shadow-md bg-white mb-8">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">KYC Process Steps</h2>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Create Account</h3>
                  <p className="text-muted-foreground">
                    Sign up with your email, password, and basic information (name, phone, country).
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <p className="text-muted-foreground">
                    Provide detailed personal information including date of birth, address, and occupation.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Document Upload</h3>
                  <p className="text-muted-foreground">
                    Upload a copy of your government-issued ID (passport, driver&apos;s license, or national ID).
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Verification Review</h3>
                  <p className="text-muted-foreground">
                    Our compliance team reviews your information. This typically takes 2-4 hours during business hours.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Account Approved</h3>
                  <p className="text-muted-foreground">
                    Once approved, you can deposit funds and start trading immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Required Documents */}
        <Card className="border-0 shadow-md bg-white mb-8">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Required Documents
            </h2>
            <div className="space-y-4">
              <div className="border border-border/40 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Passport</h4>
                <p className="text-muted-foreground text-sm">Must be valid and not expired. Photo should be clear.</p>
              </div>
              <div className="border border-border/40 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Driver&apos;s License</h4>
                <p className="text-muted-foreground text-sm">Must be a valid government-issued ID with your photo and signature.</p>
              </div>
              <div className="border border-border/40 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">National ID</h4>
                <p className="text-muted-foreground text-sm">Government-issued identification card in your country of residence.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tips for Success */}
        <Card className="border-0 shadow-md bg-white mb-8">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Camera className="w-6 h-6 text-primary" />
              Tips for Document Photos
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Use a clear, well-lit photo of your document</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Ensure all corners of the document are visible</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">The document must be readable and not blurry</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Check that your name on the document matches your account</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Use JPEG or PNG format, file size under 5MB</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Common Issues */}
        <Card className="border-0 shadow-md bg-white">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-500" />
              Common Reasons for Rejection
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                <span className="text-muted-foreground">Photo is blurry or unclear</span>
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                <span className="text-muted-foreground">Document is expired</span>
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                <span className="text-muted-foreground">Name on document doesn&apos;t match account</span>
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                <span className="text-muted-foreground">Document corners are cut off</span>
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                <span className="text-muted-foreground">Personal information doesn&apos;t match document</span>
              </li>
            </ul>
          </div>
        </Card>
      </main>
    </div>
  )
}
