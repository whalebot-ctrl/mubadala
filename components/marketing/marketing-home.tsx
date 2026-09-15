'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Bitcoin,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  CircleDollarSign,
  LockKeyhole,
  Menu,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'

const marketItems = [
  { symbol: 'BTC', value: '$78,218.40', move: '+2.84%' },
  { symbol: 'NVDA', value: '$131.88', move: '+1.26%' },
  { symbol: 'ETH', value: '$3,487.22', move: '+1.92%' },
  { symbol: 'S&P 500', value: '5,487.03', move: '+0.41%' },
]

const allocations = [
  { label: 'Digital assets', value: '42%', color: '#D5F26A' },
  { label: 'Global equities', value: '38%', color: '#4E7668' },
  { label: 'Smart strategies', value: '20%', color: '#C6D0CB' },
]

export function MarketingHome() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F4F5EF] text-[#10251F]">
      <header className="sticky top-0 z-50 border-b border-[#10251F]/10 bg-[#F4F5EF]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <BrandLogo />
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/features" className="text-sm font-medium text-[#4D625B] transition hover:text-[#10251F]">
              Investments
            </Link>
            <Link href="/trade" className="text-sm font-medium text-[#4D625B] transition hover:text-[#10251F]">
              Trade
            </Link>
            <Link href="/about" className="text-sm font-medium text-[#4D625B] transition hover:text-[#10251F]">
              Our approach
            </Link>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" className="rounded-full px-5 text-[#10251F]">
              <Link href="/signin">Sign in</Link>
            </Button>
            <Button asChild className="h-10 rounded-full bg-[#10251F] px-5 text-white hover:bg-[#1B3B31]">
              <Link href="/signup">Open an account <ArrowRight /></Link>
            </Button>
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full border border-[#10251F]/15 p-2 md:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#10251F]/10 px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm font-medium">
              <Link href="/features">Investments</Link>
              <Link href="/trade">Trade</Link>
              <Link href="/about">Our approach</Link>
              <Link href="/signin">Sign in</Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="overflow-hidden border-b border-[#10251F]/10">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-24">
            <div className="flex flex-col justify-center">
              <div className="mb-7 flex w-fit items-center gap-2 rounded-full border border-[#10251F]/10 bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#476158]">
                <span className="size-1.5 rounded-full bg-[#79A30E]" />
                Built for long-term investors
              </div>
              <h1 className="max-w-3xl text-[clamp(3.4rem,7vw,6.6rem)] font-medium leading-[0.91] tracking-[-0.065em]">
                Invest beyond
                <span className="block font-serif italic text-[#527064]">the ordinary.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#5E706A]">
                One considered portfolio across crypto, global stocks, and adaptive investment strategies—managed with clarity.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-full bg-[#10251F] px-7 text-white hover:bg-[#1B3B31]">
                  <Link href="/signup">Start investing <ArrowRight /></Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-full border-[#10251F]/15 bg-transparent px-7 hover:bg-white">
                  <Link href="/features">Explore portfolios</Link>
                </Button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-[#697A74]">
                <span className="flex items-center gap-1.5"><Check className="size-3.5" /> Curated allocations</span>
                <span className="flex items-center gap-1.5"><Check className="size-3.5" /> Clear reporting</span>
                <span className="flex items-center gap-1.5"><Check className="size-3.5" /> Secure custody</span>
              </div>
            </div>

            <div className="relative min-h-[520px]">
              <div className="absolute inset-5 rounded-[40px] bg-[#D5F26A]" />
              <div className="absolute inset-x-0 bottom-0 top-0 rounded-[40px] bg-[#10251F] p-6 text-white shadow-[0_32px_80px_rgba(16,37,31,.22)] sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-white/50">Managed portfolio</p>
                    <p className="mt-2 text-4xl font-medium tracking-[-0.04em]">$48,940.20</p>
                  </div>
                  <span className="rounded-full bg-[#D5F26A]/15 px-3 py-1 text-xs font-semibold text-[#D5F26A]">+12.8% YTD</span>
                </div>
                <div className="mt-12 h-48">
                  <svg viewBox="0 0 520 180" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D5F26A" stopOpacity=".28" />
                        <stop offset="100%" stopColor="#D5F26A" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 150 C45 144 57 108 102 119 S162 143 207 94 S272 116 313 71 S370 88 413 46 S470 55 520 18 V180 H0Z" fill="url(#hero-area)" />
                    <path d="M0 150 C45 144 57 108 102 119 S162 143 207 94 S272 116 313 71 S370 88 413 46 S470 55 520 18" fill="none" stroke="#D5F26A" strokeWidth="3" />
                  </svg>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {allocations.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                      <div className="mb-5 size-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <p className="text-2xl font-medium">{item.value}</p>
                      <p className="mt-1 text-[11px] leading-4 text-white/45">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#10251F]/10 bg-white/55">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#10251F]/10 px-5 sm:grid-cols-4 sm:divide-y-0 lg:px-8">
            {marketItems.map((item) => (
              <div key={item.symbol} className="px-4 py-5 first:pl-0 sm:px-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#667871]">{item.symbol}</span>
                  <span className="text-[11px] font-semibold text-[#64820F]">{item.move}</span>
                </div>
                <p className="mt-1 text-sm font-semibold tracking-tight">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#71827C]">A complete view</p>
              <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
                Different markets.<br />One clear strategy.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[28px] border border-[#10251F]/10 bg-[#10251F]/10 sm:grid-cols-3">
              {[
                { icon: Bitcoin, title: 'Digital assets', text: 'Measured exposure to established crypto assets with disciplined allocation.' },
                { icon: ChartNoAxesCombined, title: 'Global equities', text: 'Quality companies and broad market exposure across key economies.' },
                { icon: Sparkles, title: 'Smart investing', text: 'Adaptive strategies that rebalance around your goals and risk profile.' },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="bg-[#F4F5EF] p-7 sm:min-h-72">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-[#10251F] text-[#D5F26A]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-10 text-xl font-semibold tracking-tight">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#667871]">{text}</p>
                  <Link href="/features" className="mt-7 inline-flex items-center gap-1 text-xs font-semibold">
                    Learn more <ChevronRight className="size-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#10251F] text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D5F26A]">Confidence built in</p>
              <h2 className="mt-5 max-w-lg text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Investing should feel informed, not overwhelming.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: LockKeyhole, title: 'Secure by design', text: 'Account safeguards and controlled access at every step.' },
                { icon: CircleDollarSign, title: 'No hidden complexity', text: 'Straightforward balances, performance, and transaction history.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/[.04] p-6">
                  <Icon className="size-5 text-[#D5F26A]" />
                  <h3 className="mt-8 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0B1B16] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-8">
          <div>
            <BrandLogo inverse />
            <p className="mt-5 max-w-sm text-xs leading-5 text-white/45">
              Investing involves risk. Asset values can rise or fall, and past performance does not guarantee future results.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-white/50">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
