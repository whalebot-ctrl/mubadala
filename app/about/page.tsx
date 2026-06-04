'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Globe2, ShieldCheck, Zap, HeartHandshake, History, Target, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useState } from 'react'

export default function AboutPage() {
  const reviews = [
    {
      id: 1,
      name: "Marcus Vance",
      role: "Managing Director, Aegis Infrastructure Fund",
      rating: 5,
      text: "SterlingRidge brought institutional execution speed to our latest energy infrastructure capital raise. Their boutique attention to detail ensured that every structural term matched our fund’s strict parameters. A brilliant team.",
      dealType: "Energy Capital Placement"
    },
    {
      id: 2,
      name: "Evelyn Sterling-Choi",
      role: "Founder & CEO, NexaHealth Group",
      rating: 5,
      text: "Navigating our carve-out and subsequent strategic M&A advisory route was highly delicate. The partners at SterlingRidge handled the market positioning flawlessly, matching us with the right sovereign backing.",
      dealType: "Healthcare M&A Advisory"
    },
    {
      id: 3,
      name: "Sir Alistair Thorne",
      role: "Chief Investment Officer, Britannia Power PLC",
      rating: 5,
      text: "Their cross-border placement network between New York and London is formidable. We closed a challenging multi-tranche mandate three weeks ahead of schedule due to their round-the-clock determination.",
      dealType: "Cross-Border Infrastructure"
    },
    {
      id: 4,
      name: "David Vance-Miller",
      role: "General Partner, Summit Capital Advisors",
      rating: 5,
      text: "SterlingRidge operates with the unyielding integrity that is rarely found in the boutique market today. They focused entirely on our long-term economic value instead of rushing a quick deal wrap.",
      dealType: "Strategic Venture Placement"
    },
    {
      id: 5,
      name: "Elena Rostova",
      role: "Executive VP, Atlantic Renewables",
      rating: 5,
      text: "True grit in action. When macroeconomic fluctuations threatened our project financing deployment phase, the team stayed at the table, restructured the pricing configuration, and executed perfectly.",
      dealType: "Renewable Power Mandate"
    }
  ]

  const [currentReview, setCurrentReview] = useState(0)

  const handleNextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const handlePrevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

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
        <div className="mb-24">
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

        {/* Client Testimonials Slider Section */}
        <div className="mb-24 border-t border-b border-border/30 py-16 bg-[#080809]/80 rounded-3xl px-4 md:px-12 relative overflow-hidden">
          <div className="absolute right-6 top-6 opacity-5 pointer-events-none hidden md:block">
            <Quote className="w-48 h-48 text-[#fafafa]" />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Reviews Track Record
            </div>

            {/* Slider Content Frame */}
            <div className="min-h-[220px] flex flex-col justify-between">
              <div>
                {/* Rating Stars Row */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: reviews[currentReview].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Review Text Body */}
                <p className="text-xl md:text-2xl font-light text-[#fafafa] leading-relaxed mb-8 tracking-tight">
                  &quot;{reviews[currentReview].text}&quot;
                </p>
              </div>

              {/* Reviewer Meta Data Footer Line */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-border/20">
                <div>
                  <h4 className="text-lg font-bold text-foreground leading-tight">{reviews[currentReview].name}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{reviews[currentReview].role}</p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-8">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Completed Asset Assignment</span>
                    <span className="text-xs font-semibold text-primary">{reviews[currentReview].dealType}</span>
                  </div>

                  {/* Slider Manual Navigation Controls */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handlePrevReview}
                      className="p-2.5 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 bg-background/50 transition-all active:scale-95"
                      aria-label="Previous Review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleNextReview}
                      className="p-2.5 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 bg-background/50 transition-all active:scale-95"
                      aria-label="Next Review"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Navigation Dots indicator bar */}
            <div className="flex items-center gap-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`h-1.5 transition-all rounded-full ${
                    currentReview === index ? "w-6 bg-primary" : "w-1.5 bg-border/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
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