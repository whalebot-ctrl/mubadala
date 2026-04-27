'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Globe2, ShieldCheck, Zap, HeartHandshake, History, Target } from 'lucide-react'

export default function AboutPage() {
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
            Our <span className="text-primary italic">Heritage & Vision</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Founded on the principles of grit, relentless execution, and entrepreneurial spirit, 
            SterlingRidge is a boutique investment partner for the modern industrial age.
          </p>
        </div>

        {/* Philosophy Card */}
        <Card className="border border-border/40 bg-[#080809] overflow-hidden mb-16">
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#fafafa] mb-6 flex items-center gap-3">
                  <History className="text-primary w-8 h-8" />
                  Our Legacy
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  The partners of SterlingRidge have been successfully tackling complex financial endeavors since the late 20th century. What began as a focus on core infrastructure has evolved into a global advisory and capital placement firm.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We don&apos;t just manage capital; we partner with founders and entrepreneurs who possess the same grit and determination that built our firm. We focus on society-critical sectors: Energy, Infrastructure, and Healthcare.
                </p>
              </div>
              <div className="bg-primary/5 border border-primary/10 p-8 rounded-2xl italic">
                <blockquote className="text-2xl font-light text-[#fafafa] leading-tight">
                  &quot;SterlingRidge was built on the belief that boutique attention combined with institutional grit yields superior outcomes for both founders and investors.&quot;
                </blockquote>
                <p className="mt-4 text-primary font-bold">— The Founding Partners</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">The SterlingRidge Standard</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Globe2,
                title: "Global Reach",
                desc: "Strategic presence in New York, London, and Windsor, providing cross-border capital solutions."
              },
              {
                icon: ShieldCheck,
                title: "Unyielding Integrity",
                desc: "We prioritize long-term economic value over short-term gains, ensuring trust in every mandate."
              },
              {
                icon: Zap,
                title: "Boutique Speed",
                desc: "Relentless execution. We move with the agility of an entrepreneur and the rigor of an institution."
              },
              {
                icon: Target,
                title: "Sector Critical",
                desc: "Deep focus on energy, power, and healthcare—sectors that form the backbone of society."
              }
            ].map((value) => {
              const Icon = value.icon
              return (
                <Card key={value.title} className="border border-border/40 bg-card hover:border-primary/30 transition-all group">
                  <div className="p-8">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Team/Collaboration CTA */}
        <div className="bg-primary/5 rounded-3xl p-12 text-center border border-primary/10">
          <HeartHandshake className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">A Partnership of Founders</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you are an institutional investor seeking high-conviction placement or an entrepreneur seeking strategic M&A advisory, SterlingRidge brings the grit to get it done.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-6 rounded-lg">
                Inquire for Advisory
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="px-8 py-6 rounded-lg border-primary/20">
                Register Platform Interest
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 SterlingRidge Investments & Company. 
              <br />
              New York | Windsor | London
            </p>
        </div>
      </footer>
    </div>
  )
}