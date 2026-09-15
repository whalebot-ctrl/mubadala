'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { BrandLogo } from '@/components/brand-logo'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0e]/95 backdrop-blur-sm border-b border-b-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <BrandLogo inverse />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Firm Overview
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: June 2026</p>
        </div>

        <Card className="border border-border/40 bg-card shadow-lg">
          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                SterlingRidge Investments & Company (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the private platform. This page informs you of our rigorous policies regarding the collection, use, and disclosure of personal, institutional, and project-specific data when you engage our advisory services and the robust choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information Collection</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                To manage institutional mandates, cross-border capital placements, and compliance protocols effectively, we collect several types of high-conviction information for corporate deployment:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2 text-sm">
                <li><strong className="text-foreground">Corporate & Partner Data:</strong> Entity name, primary mandate brokers, executive email addresses, direct wire numbers, and regional headquarters data.</li>
                <li><strong className="text-foreground">Usage & Interface Logs:</strong> Technical browser information, secure IP addressing records, specific mandate portal interactions, and duration metrics.</li>
                <li><strong className="text-foreground">Financial & Mandate Data:</strong> Deal parameters, strategic transaction balances, allocation preferences, capital placement capacities, and corporate project briefs.</li>
                <li><strong className="text-foreground">KYC & Compliance Documentation:</strong> Certified identity verification documents, regulatory proof of fund originations, and validation structures required for M&A statutory compliance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                SterlingRidge uses the secured parameters gathered exclusively for dedicated financial services execution:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2 text-sm">
                <li>To provide, manage, and scale our private transaction environment.</li>
                <li>To notify authorized corporate partners regarding structural updates to pending mandates.</li>
                <li>To enable continuous onboarding flow dynamics and strategic project reviews.</li>
                <li>To provide high-touch partner and transaction-specific mandate support.</li>
                <li>To gather analytical transaction data to streamline global infrastructure placement performance.</li>
                <li>To manage and resolve technical infrastructure conflicts or verification anomalies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Security of Data & Confidentiality</h2>
              <p className="text-muted-foreground leading-relaxed">
                The absolute confidentiality and security of your private parameters form the backbone of the SterlingRidge Standard. All transactional operations are classified as private and confidential. While no digital infrastructure or communication channel is completely impenetrable, we apply strict institutional-grade security architecture and access controls to secure operations against unauthorized data exposure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Modifications to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the authority to update our institutional Privacy Policy protocols periodically. We will signal any structural adjustments by rendering the newly revised policy directly on this workspace and updating the revision signature at the top header of this documentation window.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have specific regulatory compliance inquiries or request processing regarding this policy, please connect directly with our compliance desk at{' '}
                <a href="mailto:info@sterlingridge.com" className="text-primary hover:underline font-medium">
                  info@sterlingridge.com
                </a>
              </p>
            </section>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 SterlingRidge Investments & Company. Private and Confidential.
          </p>
          <p className="text-xs text-muted-foreground/60">
            New York | Windsor | London
          </p>
        </div>
      </footer>
    </div>
  )
}