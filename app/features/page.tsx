'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, BarChart3, Lock, Zap, TrendingUp, Smartphone, Clock } from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Market Data',
      description: 'Access live charts and market data for stocks and cryptocurrencies with institutional-grade accuracy.',
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Your assets are protected with multi-layer security protocols and cold storage solutions.',
    },
    {
      icon: TrendingUp,
      title: 'Portfolio Analytics',
      description: 'Track your investments with detailed analytics, performance metrics, and P&L calculations.',
    },
    {
      icon: Zap,
      title: 'Fast Deposits & Withdrawals',
      description: 'Process deposits in minutes and withdrawals within 24 hours using cryptocurrency.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Manage your portfolio on the go with our fully responsive mobile platform.',
    },
    {
      icon: Clock,
      title: '24/7 Trading',
      description: 'Trade anytime, anywhere. Our platform is available round the clock, every day.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">M</span>
              </div>
              <span className="font-bold text-foreground">Mubadala</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Platform Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Everything you need to manage your investment portfolio professionally.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
                <div className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Advanced Features */}
        <Card className="border-0 shadow-md bg-white mb-12">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Advanced Features</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Multi-Asset Support</h4>
                  <p className="text-muted-foreground">Trade stocks, cryptocurrencies, and more from a single platform.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Advanced Charts</h4>
                  <p className="text-muted-foreground">Professional charting tools with technical analysis indicators.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Portfolio Management</h4>
                  <p className="text-muted-foreground">Organize and rebalance your investments with ease.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Transaction History</h4>
                  <p className="text-muted-foreground">Complete audit trail of all your transactions and activities.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Start Your Investment Journey</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience professional investing with Mubadala Investments today.
          </p>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              Create Account Now
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
