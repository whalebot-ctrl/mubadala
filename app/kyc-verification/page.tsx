'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Clock, CheckCircle, AlertCircle, Link } from 'lucide-react'

export default function KYCVerificationPage() {
  const [kycStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Sterling Ridge</h1>
        </div>
      </header> */}

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Account Verification</h1>
          <p className="text-slate-400">Your KYC submission is being reviewed</p>
        </div>

        {kycStatus === 'pending' && (
          <Card className="bg-slate-800/50 border-slate-700 p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Pending</h2>
              <p className="text-slate-400 mb-6 max-w-sm">
                Your KYC information is currently under review by our verification team. This usually takes 1-2 business days.
              </p>

              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 w-full text-left mb-6">
                <h3 className="font-semibold text-white mb-3">What to expect:</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>We review your submitted documents and information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>Our team may request additional documentation if needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>You&apos;ll receive email notification once approved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>After approval, you can deposit and start investing</span>
                  </li>
                </ul>
              </div>

              <p className="text-xs text-slate-500 text-center mb-6">
                Check your email for updates. You can also log back in to check your verification status.
              </p>

              <Button className="bg-blue-600 hover:bg-blue-700">
                Return to Home
              </Button>
            </div>
          </Card>
        )}

        {kycStatus === 'approved' && (
          <Card className="bg-slate-800/50 border-slate-700 p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Approved!</h2>
              <p className="text-slate-400 mb-6">
                Congratulations! Your account is now verified and ready to use.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 w-full text-left mb-6">
                <h3 className="font-semibold text-green-400 mb-3">You can now:</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Deposit cryptocurrency (BTC, USDT)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Buy stocks and cryptocurrencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Track your portfolio in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Request withdrawals anytime</span>
                  </li>
                </ul>
              </div>

              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {kycStatus === 'rejected' && (
          <Card className="bg-slate-800/50 border-slate-700 p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Not Approved</h2>
              <p className="text-slate-400 mb-6">
                Your KYC submission was not approved. Please review the reason below.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 w-full text-left mb-6">
                <h3 className="font-semibold text-red-400 mb-2">Reason:</h3>
                <p className="text-sm text-slate-300">
                  The submitted documents did not meet our verification requirements. Please ensure documents are clear, valid, and match your profile information.
                </p>
              </div>

              <Button variant="outline" className="border-slate-600 w-full mb-3">
                Contact Support
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                Resubmit KYC
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
