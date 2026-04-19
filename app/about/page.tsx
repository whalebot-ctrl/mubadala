'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Globe, Shield, Zap, Users } from 'lucide-react'

export default function AboutPage() {
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
            About Mubadala Investments
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Leading the future of global investments with institutional-grade platforms and innovative solutions.
          </p>
        </div>

        {/* Company Overview */}
        <Card className="border-0 shadow-md bg-white mb-12">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Mubadala Investments is a leading global investment company that manages a diverse portfolio of assets across multiple sectors and geographies. We are committed to delivering sustainable returns and creating long-term value for our stakeholders.
            </p>
            <p className="text-lg text-muted-foreground">
              Through our professional investment platform, we provide sophisticated investors access to global markets, real-time data, and advanced trading tools to build and manage their investment portfolios.
            </p>
          </div>
        </Card>

        {/* Core Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md bg-white">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Global Perspective</h3>
                <p className="text-muted-foreground">
                  We operate across continents with a deep understanding of local and global markets.
                </p>
              </div>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Security First</h3>
                <p className="text-muted-foreground">
                  Your assets and data protection are our highest priorities with enterprise-grade security.
                </p>
              </div>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously invest in technology and research to stay ahead of market trends.
                </p>
              </div>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Client Success</h3>
                <p className="text-muted-foreground">
                  Your investment goals are our goals. We provide dedicated support every step of the way.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Invest?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of investors managing their portfolios on the Mubadala platform.
          </p>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              Get Started Today
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
