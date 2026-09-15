import Link from 'next/link'
import {
  ArrowRight,
  Bitcoin,
  ChartNoAxesCombined,
  Check,
  Layers3,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'

const portfolios = [
  {
    number: '01',
    icon: Bitcoin,
    title: 'Digital assets',
    description: 'Purposeful exposure to established crypto networks, sized around volatility and your risk profile.',
    details: ['Bitcoin and Ethereum core', 'Risk-aware position sizing', 'Continuous allocation review'],
  },
  {
    number: '02',
    icon: ChartNoAxesCombined,
    title: 'Global equities',
    description: 'A diversified foundation of quality companies, market leaders, and low-cost index exposure.',
    details: ['US and international stocks', 'Broad-market ETFs', 'Long-term quality focus'],
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Smart strategies',
    description: 'Managed allocations designed to respond to changing markets without chasing short-term noise.',
    details: ['Rules-based rebalancing', 'Income opportunities', 'Goal-led allocation'],
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#F4F5EF] text-[#10251F]">
      <header className="border-b border-[#10251F]/10">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <BrandLogo />
          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/trade" className="text-sm font-medium text-[#60736C] hover:text-[#10251F]">Trade</Link>
            <Link href="/about" className="text-sm font-medium text-[#60736C] hover:text-[#10251F]">Our approach</Link>
          </nav>
          <Button asChild className="rounded-full bg-[#10251F] px-5 text-white hover:bg-[#1B3B31]">
            <Link href="/signup">Start investing <ArrowRight /></Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="border-b border-[#10251F]/10">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_.72fr] lg:px-8 lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71827C]">Investment options</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-medium leading-[.98] tracking-[-0.055em] sm:text-7xl">
                A portfolio for the
                <span className="block font-serif italic text-[#527064]">world as it is now.</span>
              </h1>
            </div>
            <div className="flex items-end">
              <p className="max-w-lg text-lg leading-8 text-[#60736C]">
                Crypto potential, equity resilience, and intelligent management—brought together in one measured strategy.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="space-y-4">
            {portfolios.map(({ number, icon: Icon, title, description, details }) => (
              <article key={title} className="grid gap-8 rounded-[30px] border border-[#10251F]/10 bg-white/65 p-7 lg:grid-cols-[80px_1fr_1fr] lg:p-10">
                <span className="font-mono text-xs text-[#82918C]">{number}</span>
                <div>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[#10251F] text-[#D5F26A]">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="mt-8 text-3xl font-medium tracking-[-0.035em]">{title}</h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-[#60736C]">{description}</p>
                </div>
                <div className="flex flex-col justify-end rounded-2xl bg-[#EDF0E7] p-6">
                  {details.map((detail) => (
                    <div key={detail} className="flex items-center gap-3 border-b border-[#10251F]/10 py-3 last:border-0">
                      <Check className="size-4 text-[#64820F]" />
                      <span className="text-sm font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#10251F] text-white">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D5F26A]">How we manage</p>
                <h2 className="mt-5 max-w-xl text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                  Discipline does more work than prediction.
                </h2>
              </div>
              <div className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-3">
                {[
                  { icon: Layers3, title: 'Diversify', text: 'Spread risk across distinct return drivers.' },
                  { icon: RefreshCcw, title: 'Rebalance', text: 'Keep your allocation aligned over time.' },
                  { icon: ShieldCheck, title: 'Protect', text: 'Apply clear controls to every decision.' },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="bg-[#163129] p-6">
                    <Icon className="size-5 text-[#D5F26A]" />
                    <h3 className="mt-10 font-semibold">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-white/50">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-8">
          <h2 className="text-4xl font-medium tracking-[-0.04em]">Put your money to work with purpose.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#60736C]">
            Build a modern portfolio that is understandable, diversified, and designed around you.
          </p>
          <Button asChild className="mt-8 h-12 rounded-full bg-[#10251F] px-7 text-white hover:bg-[#1B3B31]">
            <Link href="/signup">Create your account <ArrowRight /></Link>
          </Button>
        </section>
      </main>
    </div>
  )
}
