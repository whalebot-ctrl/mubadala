'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  ArrowLeft, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Globe2, 
  Layers,
  ChevronRight,
  Briefcase
} from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: BarChart3,
      title: 'Capital Markets Intelligence',
      description: 'Access institutional-grade market analysis and data-driven insights tailored for complex investment structures.',
    },
    {
      icon: ShieldCheck,
      title: 'Boutique Risk Management',
      description: 'Utilizing proprietary frameworks to mitigate risk across infrastructure and society-critical energy sectors.',
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Sophisticated P&L tracking and performance attribution metrics for your diversified private and public portfolio.',
    },
    {
      icon: Zap,
      title: 'Relentless Execution',
      description: 'Swift deployment of capital and strategic advisory, moving at the speed of global private equity markets.',
    },
    {
      icon: Globe2,
      title: 'Global Advisory Reach',
      description: 'Strategic placement across London, New York, and Windsor, providing cross-border investment opportunities.',
    },
    {
      icon: Layers,
      title: 'Multi-Sector Exposure',
      description: 'Seamlessly manage holdings across Energy, Healthcare, Real Assets, and Private Credit in one dashboard.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0e]/95 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
               <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                  <span className="text-black font-bold text-xl">SR</span>
                </div>
              <span className="font-bold text-xl tracking-tight text-[#fafafa]">STERLINGRIDGE</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Firm Overview
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Our <span className="text-primary italic">Capabilities</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            SterlingRidge provides the grit and expertise required to navigate today’s complex capital markets.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border border-border/40 bg-card hover:border-primary/30 transition-all duration-300">
                <div className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Advanced Capabilities Section */}
        <Card className="border border-border/40 bg-[#080809] overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold text-[#fafafa]">Institutional Advisory</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                {
                  label: "Strategic M&A Support",
                  text: "End-to-end advisory for mergers, acquisitions, and divestitures within infrastructure."
                },
                {
                  label: "Capital Raising & Structuring",
                  text: "Bespoke debt and equity solutions for founders and society-critical enterprises."
                },
                {
                  label: "Private Equity Placement",
                  text: "Facilitating high-conviction capital flow into promising global sectors."
                },
                {
                  label: "Restructuring Advisory",
                  text: "Expertise in navigating complex financial transitions with grit and determination."
                }
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#fafafa] mb-1">{item.label}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Execute?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join the founders and institutions partnering with SterlingRidge to build the future of infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-black font-bold px-10 py-6 text-lg rounded-lg">
                Partner With Us
                </Button>
            </Link>
            <Link href="/contact">
                <Button variant="outline" className="px-10 py-6 text-lg rounded-lg border-primary/20">
                Speak to an Advisor
                </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Re-using simple footer style */}
      <footer className="border-t border-border/40 bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 SterlingRidge Investments & Company. Private and Confidential.
            </p>
        </div>
      </footer>
    </div>
  )
}