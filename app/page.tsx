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
  Briefcase,
  BarChart3
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0e] backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
               <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                  <span className="text-black font-bold text-xl">SR</span>
                </div>
              <span className="font-bold text-xl tracking-tight text-[#fafafa]">STERLINGRIDGE</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/features" className="text-sm text-[#fafafa]/80 hover:text-primary transition-colors">
                Advisory
              </Link>
              <Link href="/about" className="text-sm text-[#fafafa]/80 hover:text-primary transition-colors">
                Our Philosophy
              </Link>
              <Link href="/contact" className="text-sm text-[#fafafa]/80 hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/signin">
                <Button variant="ghost" size="sm" className="text-[#fafafa] hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-bold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary uppercase tracking-widest">
                Financial Investment Excellence
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tighter">
              Relentless Execution.
              <br />
              <span className="text-primary italic">Timeless Values.</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              SterlingRidge is a boutique investment partner focused on infrastructure, energy, and society-critical sectors. 
              We combine old-school grit with modern capital market expertise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-black font-bold rounded-lg gap-2 group shadow-lg shadow-primary/20">
                  Execute Your Strategy
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </Link>
              {/* <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary/20 text-foreground hover:bg-primary/5 font-semibold rounded-lg"
              >
                View Sectors
              </Button> */}
            </div>

            {/* Credibility Markers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 pt-16 border-t border-border/40">
              <div>
                <div className="text-xl font-bold text-foreground">Infrastructure</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Sector Focus</div>
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">Energy & Power</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Core Expertise</div>
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">M&A Advisory</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Strategic Growth</div>
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">Private Equity</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Capital Placement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Services Section */}
      <section id="features" className="py-20 md:py-32 border-t border-border/40 bg-[#080809]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-4">
                Strategic Advisory Services
              </h2>
              <p className="text-lg text-muted-foreground">
                Boutique attention. Institutional results.
              </p>
            </div>
            <Link href="/features">
                <Button variant="link" className="text-primary p-0 h-auto gap-2">
                    Explore all services <ChevronRight className="w-4 h-4"/>
                </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-border/40 bg-card hover:border-primary/40 transition-all group">
              <Briefcase className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Mergers & Acquisitions
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Strategic advice on buy-side and sell-side mandates, focusing on society-critical infrastructure and healthcare.
              </p>
            </div>

            <div className="p-8 rounded-xl border border-border/40 bg-card hover:border-primary/40 transition-all group">
              <Zap className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Project Finance
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Structuring complex debt and equity capital for large-scale energy and industrial projects globally.
              </p>
            </div>

            <div className="p-8 rounded-xl border border-border/40 bg-card hover:border-primary/40 transition-all group">
              <BarChart3 className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Special Situations
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Navigating restructurings and unique capital challenges with an entrepreneurial mindset defined by grit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="about" className="py-20 md:py-32 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl" />
              <div className="relative bg-card border border-border/40 p-8 rounded-2xl">
                 <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  The SterlingRidge Philosophy
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We believe in bringing back the "old-school" approach to investment banking. For us, that means transparency, deep sector knowledge, and a relentless focus on execution.
                </p>
                <ul className="space-y-4">
                    {[
                        "Entrepreneurial Mindset",
                        "Grit & Determination",
                        "Sector-Critical Focus",
                        "Institutional Accountability"
                    ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-foreground font-medium">
                            <Shield className="w-5 h-5 text-primary" />
                            {item}
                        </li>
                    ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary italic">"Stronger Together"</h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Our founders have been successfully tackling complex financial endeavors since the late 20th century. Today, SterlingRidge continues that legacy by partnering with founders and entrepreneurs to build great businesses.
              </p>
              <Link href="/about">
                <Button className="bg-primary hover:bg-primary/90 text-black font-bold rounded-lg gap-2 group">
                  Meet Our Partners
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-border/40">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                  <span className="text-black font-bold text-xs">SR</span>
                </div>
                <span className="font-bold text-foreground tracking-tight">STERLINGRIDGE</span>
              </div>
              <p className="text-sm text-muted-foreground">
                New York | Windsor | London
                <br />
                Boutique Investment Banking
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Focus Areas</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Infrastructure</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Healthcare</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Energy & Power</Link></li>
              </ul>
            </div>
            <div>
                <h4 className="font-semibold text-foreground mb-4">Firm</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">History</Link></li>
                  <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                  <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Legal Disclosure</Link></li>
                </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <p className="text-sm text-muted-foreground">
                600 Fifth Avenue, 2nd Floor
                <br />
                NY, NY 10020
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 SterlingRidge Investments & Company. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">FINRA / SIPC</Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}