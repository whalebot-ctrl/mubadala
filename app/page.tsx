'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0e] backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/mubadala-logo.svg" alt="Mubadala" className="h-6 w-auto" />
              
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/features" className="text-sm text-[#fafafa] hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="/about" className="text-sm text-[#fafafa] hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-[#fafafa] hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/signin">
                <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/5">
                  Sign In
                </Button>
              </Link>
              <Link href="#">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Global Investment Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Invest Smarter with
              <br />
              <span className="text-primary">Mubadala</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Access global markets, trade cryptocurrencies, and build your investment portfolio
              with institutional-grade tools and real-time market data.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg gap-2 group">
                  Start Investing Now
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary/20 text-foreground hover:bg-primary font-semibold rounded-lg"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-16 border-t border-border/40">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  $330B
                </div>
                <div className="text-sm text-muted-foreground">
                  Assets Under Management
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  50+
                </div>
                <div className="text-sm text-muted-foreground">
                  Countries
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">
                  Trading Access
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional tools designed for serious investors
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl border border-border/40 bg-white hover:border-primary/20 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Real-Time Market Data
              </h3>
              <p className="text-muted-foreground">
                Access live prices for stocks, crypto, and commodities with instant updates
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl border border-border/40 bg-white hover:border-primary/20 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Instant Trading
              </h3>
              <p className="text-muted-foreground">
                Execute trades in milliseconds with our advanced trading engine
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl border border-border/40 bg-white hover:border-primary/20 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Bank-Level Security
              </h3>
              <p className="text-muted-foreground">
                Your funds are protected with military-grade encryption
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-xl border border-border/40 bg-white hover:border-primary/20 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Global Markets
              </h3>
              <p className="text-muted-foreground">
                Trade across 50+ countries with no geographical restrictions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 border-t border-border/40 bg-primary/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                About Mubadala
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Mubadala Investment Company is a sovereign wealth fund established by the United Arab Emirates Government
                to diversify the nation&apos;s economy and create long-term economic value.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                With $330 billion in assets under management across more than 50 countries, we partner with world-class
                investors and deploy capital across promising sectors and geographies.
              </p>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg gap-2 group">
                  Start Your Journey
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 border border-primary/10">
              <div className="space-y-6">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">Established 2007</div>
                  <p className="text-sm text-muted-foreground">Decades of investment expertise</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">50+ Nations</div>
                  <p className="text-sm text-muted-foreground">Global investment presence</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">Multiple Sectors</div>
                  <p className="text-sm text-muted-foreground">PE, Real Assets, Credit & More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 border-t border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Invest?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of investors accessing global markets through Mubadala Investments
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg gap-2 group">
                Create Your Account
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-border/40">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">M</span>
                </div>
                <span className="font-bold text-foreground">Mubadala</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Global investment platform for serious traders
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
                <li><Link href="/kyc-help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">KYC Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 Mubadala Investments. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
