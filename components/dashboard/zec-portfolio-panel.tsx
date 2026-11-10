'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Eye,
  EyeOff,
  Plus,
  ShieldCheck,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

/** Cash on Portfolio 2. */
export const ZEC_SLIDE_AVAILABLE_CASH_USD = 50_000

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

type Props = {
  fullName: string
  availableCash: number
  showBalance: boolean
  chartLabels: string[]
  onToggleBalance: () => void
  onWithdraw: () => void
  onDeposit: () => void
}

export function ZecPortfolioPanel({
  fullName,
  availableCash,
  showBalance,
  chartLabels,
  onToggleBalance,
  onWithdraw,
  onDeposit,
}: Props) {
  const [loading, setLoading] = useState(true)
  const invested = 0
  const principal = 0
  const portfolioTotal = invested + availableCash
  const gain = 0
  const returnPercent = 0

  const performance = useMemo(
    () =>
      chartLabels.map((label) => ({
        label,
        portfolio: portfolioTotal,
        invested: principal,
      })),
    [chartLabels, portfolioTotal, principal],
  )

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 400)
    return () => window.clearTimeout(timer)
  }, [])

  if (loading) {
    return <div className="min-h-[70vh] animate-pulse rounded-[32px] bg-[#F4F5EF]/50" />
  }

  return (
    <>
      <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-medium text-[#60736C]">
            <ShieldCheck className="size-3.5" /> Account protected
          </p>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em]">
            Welcome back, {fullName}.
          </h1>
          <p className="mt-2 text-sm text-[#60736C]">A clear view of your money and investments.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onWithdraw}
            className="h-11 rounded-full border-[#10251F]/15 bg-transparent px-5 hover:bg-white"
          >
            <ArrowDownToLine /> Withdraw
          </Button>
          <Button onClick={onDeposit} className="h-11 rounded-full bg-[#10251F] px-5 text-white hover:bg-[#1B3B31]">
            <Plus /> Add funds
          </Button>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.45fr_.55fr]">
        <Card className="overflow-hidden rounded-[32px] border-0 bg-[#10251F] p-6 text-white shadow-none sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-white/50">
                Total portfolio
                <button
                  type="button"
                  onClick={onToggleBalance}
                  aria-label={showBalance ? 'Hide balance' : 'Show balance'}
                  className="text-white/45 hover:text-white"
                >
                  {showBalance ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                </button>
              </div>
              <p className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                {showBalance ? usd.format(portfolioTotal) : '••••••••'}
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#D5F26A]">
                <ArrowUpRight className="size-4" /> {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(2)}% all time
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5 text-[11px] text-white/55">
              Live · USD
            </span>
          </div>
          <div className="mt-7 h-52 sm:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performance} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="portfolio2Area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D5F26A" stopOpacity=".3" />
                    <stop offset="100%" stopColor="#D5F26A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" interval={0} axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,.35)', fontSize: 10 }} />
                <YAxis hide domain={[0, (dataMax: number) => Math.max(dataMax * 1.08, 1)]} />
                <Tooltip
                  formatter={(value) => [usd.format(Number(value)), 'Portfolio']}
                  contentStyle={{ border: 0, borderRadius: 12, background: '#F4F5EF', color: '#10251F' }}
                />
                <Area type="monotone" dataKey="portfolio" stroke="#D5F26A" strokeWidth={2.5} fill="url(#portfolio2Area)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-[32px] border border-[#10251F]/10 bg-white/75 p-6 shadow-none">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Allocation</h2>
            <span className="text-xs text-[#71827C]">Current value</span>
          </div>
          <div className="mx-auto mt-7 flex size-40 items-center justify-center rounded-full bg-[#E3E8D6]">
            <div className="flex size-24 flex-col items-center justify-center rounded-full bg-[#F9FAF6]">
              <span className="text-xs text-[#71827C]">Invested</span>
              <strong className="mt-1 text-lg">{usd.format(invested).replace('.00', '')}</strong>
            </div>
          </div>
          <div className="mt-7 space-y-3">
            <p className="text-xs text-[#71827C]">No allocations yet.</p>
          </div>
        </Card>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-3">
        <PanelMetric label="Invested assets" value={usd.format(invested)} note="No holdings yet" />
        <PanelMetric
          label="Available cash"
          value={showBalance ? usd.format(availableCash) : '••••••'}
          note="Ready to withdraw"
        />
        <PanelMetric label="Total gain" value={`+${usd.format(gain)}`} note="+0.00% since investing" positive />
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_300px]">
        <Card className="overflow-hidden rounded-[28px] border border-[#10251F]/10 bg-white/75 shadow-none">
          <div className="flex items-center justify-between border-b border-[#10251F]/10 px-5 py-5 sm:px-6">
            <div>
              <h2 className="font-semibold">Your investments</h2>
              <p className="mt-1 text-xs text-[#71827C]">Current holdings and performance</p>
            </div>
            <Link href="/trade" className="flex items-center gap-1 text-xs font-semibold text-[#527064]">
              Open Trade <ChevronRight className="size-3.5" />
            </Link>
          </div>
          <div className="px-6 py-16 text-center">
            <p className="font-semibold">No investments yet</p>
            <p className="mt-2 text-sm text-[#71827C]">Add funds to start building your portfolio.</p>
          </div>
        </Card>

        <Card className="rounded-[28px] border border-[#10251F]/10 bg-[#E9ECD9] p-6 shadow-none">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#60736C]">Quick access</p>
          <h2 className="mt-4 text-2xl font-medium tracking-[-0.03em]">Move money without the friction.</h2>
          <p className="mt-3 text-sm leading-6 text-[#60736C]">
            Add funds or request a withdrawal from your available cash balance.
          </p>
          <div className="mt-8 space-y-2">
            <button
              type="button"
              onClick={onDeposit}
              className="flex w-full items-center justify-between rounded-2xl bg-[#10251F] p-4 text-left text-white"
            >
              <span className="flex items-center gap-3 text-sm font-semibold">
                <Plus className="size-4" /> Add funds
              </span>
              <ArrowRight className="size-4 text-white/50" />
            </button>
            <button
              type="button"
              onClick={onWithdraw}
              className="flex w-full items-center justify-between rounded-2xl border border-[#10251F]/10 bg-white/60 p-4 text-left"
            >
              <span className="flex items-center gap-3 text-sm font-semibold">
                <ArrowDownToLine className="size-4" /> Withdraw
              </span>
              <ArrowRight className="size-4 text-[#60736C]" />
            </button>
          </div>
        </Card>
      </section>
    </>
  )
}

function PanelMetric({
  label,
  value,
  note,
  positive = false,
}: {
  label: string
  value: string
  note: string
  positive?: boolean
}) {
  return (
    <Card className="rounded-2xl border border-[#10251F]/10 bg-white/65 p-5 shadow-none">
      <p className="text-xs font-medium text-[#71827C]">{label}</p>
      <p className={`mt-3 text-2xl font-semibold tracking-[-0.03em] ${positive ? 'text-[#64820F]' : ''}`}>{value}</p>
      <p className="mt-2 text-[11px] text-[#82918C]">{note}</p>
    </Card>
  )
}
