'use client'

import Link from 'next/link'
import { ArrowLeft, Plus, Minus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { BrandLogo } from '@/components/brand-logo'

interface FAQItem {
  id: string
  question: string
  answer: string
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I create an account?',
      answer:
        'Click on "Get Started" and fill in your basic information. You\'ll need to provide your email, password, full name, phone number, and country of residence. After signup, complete the KYC verification process.',
    },
    {
      id: '2',
      question: 'What is KYC verification?',
      answer:
        'KYC stands for "Know Your Customer". It\'s a verification process required by financial regulations. You\'ll need to provide identity documents and other personal information to confirm your identity before you can deposit funds.',
    },
    {
      id: '3',
      question: 'How do I deposit funds?',
      answer:
        'You can deposit using Bitcoin (BTC) or Tether (USDT). Go to your dashboard, click "Deposit", and follow the instructions. You\'ll receive a unique wallet address where you can send your cryptocurrency.',
    },
    {
      id: '4',
      question: 'What is the minimum deposit amount?',
      answer:
        'The minimum deposit is 0.001 BTC or 50 USDT. We recommend starting with a larger amount to account for network fees.',
    },
    {
      id: '5',
      question: 'How long does a deposit take?',
      answer:
        'Deposits are credited after 1-2 blockchain confirmations, which typically takes 10-30 minutes for BTC and 5-15 minutes for USDT. This depends on network congestion.',
    },
    {
      id: '6',
      question: 'How do I withdraw funds?',
      answer:
        'Go to your dashboard, click "Withdraw", enter the amount, and provide your wallet address. Withdrawals take up to 24 hours to process and are subject to verification.',
    },
    {
      id: '7',
      question: 'Are there withdrawal limits?',
      answer:
        'Standard daily withdrawal limit is based on your account tier and verification level. Contact support for information about your specific limits.',
    },
    {
      id: '8',
      question: 'Is the platform secure?',
      answer:
        'Yes, we use enterprise-grade security including multi-signature wallets, cold storage, SSL encryption, and regular security audits. Your funds and data are protected with industry-leading security practices.',
    },
    {
      id: '9',
      question: 'Can I trade on mobile?',
      answer:
        'Yes, our platform is fully responsive and works on all devices. You can manage your portfolio, view charts, and execute trades from your smartphone or tablet.',
    },
    {
      id: '10',
      question: 'How do I contact support?',
      answer:
        'Visit our Contact page or email support@sterlingridge.com. Our support team typically responds within 2-4 hours during business hours.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <BrandLogo />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about Sterling Ridge.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map(faq => (
            <Card
              key={faq.id}
              className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => toggleItem(faq.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 text-primary">
                    {openItems.includes(faq.id) ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {openItems.includes(faq.id) && (
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Help */}
        <Card className="border-0 shadow-md bg-white mt-12">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Didn&apos;t find your answer?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact our support team for personalized assistance.
            </p>
            <Link href="/contact">
              <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors">
                Contact Support
              </button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  )
}
