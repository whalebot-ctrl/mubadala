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
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export const ZEC_SLIDE_AVAILABLE_CASH_USD = 0
export const PORTFOLIO2_ZEC_COST_USD = 50_000
export const PORTFOLIO2_ZEC_CURRENT_USD = 57_025.83
/** Trading profit from ZEC, held as Sterling Adaptive Income. */
export const PORTFOLIO2_TRADING_PROFIT_USD = 13_509.09
export const PORTFOLIO2_TOTAL_USD = PORTFOLIO2_ZEC_CURRENT_USD + PORTFOLIO2_TRADING_PROFIT_USD

type ZecQuote = {
  price: number
  percentChange: number
  chartData: { time: number; price: number }[]
}

type Position = {
  id: string
  asset: string
  ticker: string
  category: string
  allocatedUSD: number
  currentValueUSD: number
  unrealizedReturnPct: number
  color: string
  live?: boolean
}

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
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

function sampleSparkline(chartData: { time: number; price: number }[], count: number) {
  if (!chartData.length) return []
  if (chartData.length <= count) return chartData
  const sampled: { time: number; price: number }[] = []
  const step = (chartData.length - 1) / (count - 1)
  for (let i = 0; i < count; i += 1) {
    sampled.push(chartData[Math.round(i * step)])
  }
  return sampled
}

function zecHoldingValueAtIndex(
  costUsd: number,
  quote: ZecQuote | undefined,
  index: number,
  pointCount: number,
) {
  const spark = quote?.chartData
  if (spark?.length && costUsd > 0) {
    const sampled = sampleSparkline(spark, pointCount)
    const lastPrice = sampled[sampled.length - 1]?.price || quote?.price || 0
    if (lastPrice > 0 && sampled[index]) {
      return (costUsd / lastPrice) * sampled[index].price
    }
  }
  return costUsd
}

function tradingProfitAtIndex(
  index: number,
  yesterdayIndex: number,
  todayIndex: number,
) {
  if (index < yesterdayIndex) return 0
  if (index >= todayIndex) return PORTFOLIO2_TRADING_PROFIT_USD
  if (todayIndex <= yesterdayIndex) return PORTFOLIO2_TRADING_PROFIT_USD
  const progress = (index - yesterdayIndex) / (todayIndex - yesterdayIndex)
  return PORTFOLIO2_TRADING_PROFIT_USD * progress
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
  const [zecQuote, setZecQuote] = useState<ZecQuote | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const response = await fetch('/api/markets', { cache: 'no-store' })
        const data = await response.json()
        const zec = (data.assets || []).find((asset: { symbol: string }) => asset.symbol === 'ZEC')
        if (!zec?.price || cancelled) return
        setZecQuote({
          price: Number(zec.price),
          percentChange: Number(zec.percentChange) || 0,
          chartData: Array.isArray(zec.chartData) ? zec.chartData : [],
        })
      } catch {
        // Chart falls back to funded-day anchors without live spark.
      }
    }

    load()
    const timer = window.setInterval(load, 45_000)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  const positions: Position[] = useMemo(
    () => [
      {
        id: 'p2-zec',
        asset: 'Zcash',
        ticker: 'ZEC',
        category: 'Digital asset',
        allocatedUSD: PORTFOLIO2_ZEC_COST_USD,
        currentValueUSD: PORTFOLIO2_ZEC_CURRENT_USD,
        unrealizedReturnPct: ((PORTFOLIO2_ZEC_CURRENT_USD - PORTFOLIO2_ZEC_COST_USD) / PORTFOLIO2_ZEC_COST_USD) * 100,
        color: '#527064',
        live: true,
      },
      {
        id: 'p2-sai',
        asset: 'Sterling Adaptive Income',
        ticker: 'SAI',
        category: 'Smart strategy',
        allocatedUSD: 0,
        currentValueUSD: PORTFOLIO2_TRADING_PROFIT_USD,
        unrealizedReturnPct: 0,
        color: '#D5F26A',
      },
    ],
    [],
  )

  const holdingsValue = PORTFOLIO2_TOTAL_USD
  const principal = PORTFOLIO2_ZEC_COST_USD
  const investedAssets = holdingsValue
  const gain = holdingsValue - principal
  const portfolioTotal = holdingsValue + availableCash
  const returnPercent = principal > 0 ? (gain / principal) * 100 : 0

  const performance = useMemo(() => {
    const pointCount = chartLabels.length
    const yesterdayIndex = Math.max(0, pointCount - 2)
    const todayIndex = pointCount - 1

    return chartLabels.map((label, index) => {
      if (index < yesterdayIndex) {
        return { label, portfolio: availableCash, invested: 0 }
      }

      let zecUsd = zecHoldingValueAtIndex(PORTFOLIO2_ZEC_COST_USD, zecQuote ?? undefined, index, pointCount)
      if (index === yesterdayIndex) zecUsd = PORTFOLIO2_ZEC_COST_USD
      if (index >= todayIndex) zecUsd = PORTFOLIO2_ZEC_CURRENT_USD

      const profitUsd = tradingProfitAtIndex(index, yesterdayIndex, todayIndex)
      const portfolio =
        index === todayIndex
          ? portfolioTotal
          : zecUsd + profitUsd + availableCash

      return {
        label,
        portfolio,
        invested: PORTFOLIO2_ZEC_COST_USD,
      }
    })
  }, [availableCash, chartLabels, portfolioTotal, zecQuote])

  const allocationGradient = useMemo(() => {
    let start = 0
    const stops = positions.map((position) => {
      const end = start + (position.currentValueUSD / holdingsValue) * 100
      const stop = `${position.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`
      start = end
      return stop
    })
    return `conic-gradient(${stops.join(', ')})`
  }, [holdingsValue, positions])

  return (
    <div className="flex min-h-full flex-1 flex-col">
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
              <p className={`mt-3 flex items-center gap-1.5 text-sm font-semibold ${gain >= 0 ? 'text-[#D5F26A]' : 'text-[#F3B4A8]'}`}>
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
                  formatter={(value, name) => [
                    usd.format(Number(value)),
                    name === 'invested' ? 'Amount invested' : 'Portfolio',
                  ]}
                  contentStyle={{ border: 0, borderRadius: 12, background: '#F4F5EF', color: '#10251F' }}
                />
                <Area type="monotone" dataKey="portfolio" stroke="#D5F26A" strokeWidth={2.5} fill="url(#portfolio2Area)" isAnimationActive={false} />
                <Line type="monotone" dataKey="invested" stroke="rgba(255,255,255,.45)" strokeWidth={1.5} strokeDasharray="5 5" dot={false} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-[32px] border border-[#10251F]/10 bg-white/75 p-6 shadow-none">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Allocation</h2>
            <span className="text-xs text-[#71827C]">Current value</span>
          </div>
          <div className="mx-auto mt-7 flex size-40 items-center justify-center rounded-full" style={{ background: allocationGradient }}>
            <div className="flex size-24 flex-col items-center justify-center rounded-full bg-[#F9FAF6]">
              <span className="text-xs text-[#71827C]">Invested</span>
              <strong className="mt-1 text-lg">{usd.format(holdingsValue)}</strong>
            </div>
          </div>
          <div className="mt-7 space-y-3">
            {positions.map((position) => (
              <div key={position.id} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-[#60736C]">
                  <span className="size-2 rounded-full" style={{ backgroundColor: position.color }} />
                  {position.ticker}
                </span>
                <span className="font-semibold">{holdingsValue ? ((position.currentValueUSD / holdingsValue) * 100).toFixed(1) : '0.0'}%</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-3">
        <PanelMetric
          label="Invested assets"
          value={usd.format(investedAssets)}
          note={`${positions.length} holdings · live`}
        />
        <PanelMetric
          label="Available cash"
          value={showBalance ? usd.format(availableCash) : '••••••'}
          note={availableCash > 0 ? 'Ready to withdraw' : 'Fully invested'}
        />
        <PanelMetric
          label="Total gain"
          value={`${gain >= 0 ? '+' : ''}${usd.format(gain)}`}
          note={`${returnPercent >= 0 ? '+' : ''}${returnPercent.toFixed(2)}% since investing`}
          positive={gain >= 0}
        />
      </section>

      <section className="mt-10 grid flex-1 gap-5 lg:grid-cols-[1fr_300px] lg:items-stretch">
        <Card className="h-full overflow-hidden rounded-[28px] border border-[#10251F]/10 bg-white/75 shadow-none">
          <div className="flex items-center justify-between border-b border-[#10251F]/10 px-5 py-5 sm:px-6">
            <div>
              <h2 className="font-semibold">Your investments</h2>
              <p className="mt-1 text-xs text-[#71827C]">Current holdings and performance</p>
            </div>
            <Link href="/trade" className="flex items-center gap-1 text-xs font-semibold text-[#527064]">
              Open Trade <ChevronRight className="size-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-[#10251F]/10 text-[10px] font-semibold uppercase tracking-wider text-[#82918C]">
                  <th className="px-6 py-3">Asset</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Invested</th>
                  <th className="px-4 py-3">Return</th>
                  <th className="px-6 py-3 text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <tr key={position.id} className="border-b border-[#10251F]/5 last:border-0 hover:bg-[#F4F5EF]/70">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-xl bg-[#10251F] text-[10px] font-semibold text-[#D5F26A]">
                          {position.ticker.slice(0, 2)}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{position.asset}</p>
                          <p className="mt-0.5 text-[11px] text-[#82918C]">{position.ticker}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-[#60736C]">{position.category}</td>
                    <td className="px-4 py-4 text-sm font-medium tabular-nums">{usd.format(position.allocatedUSD)}</td>
                    <td className={`px-4 py-4 text-xs font-semibold ${position.unrealizedReturnPct >= 0 ? 'text-[#64820F]' : 'text-[#B4533A]'}`}>
                      {position.unrealizedReturnPct >= 0 ? '+' : ''}{position.unrealizedReturnPct.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold tabular-nums">{usd.format(position.currentValueUSD)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="flex h-full flex-col rounded-[28px] border border-[#10251F]/10 bg-[#E9ECD9] p-6 shadow-none">
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
    </div>
  )
}

function PanelMetric({
  label,
  value,
  note,
  positive,
}: {
  label: string
  value: string
  note: string
  positive?: boolean
}) {
  return (
    <Card className="rounded-[24px] border border-[#10251F]/10 bg-white/75 p-5 shadow-none">
      <p className="text-xs font-medium text-[#71827C]">{label}</p>
      <p className={`mt-2 text-2xl font-semibold tracking-tight ${positive === false ? 'text-[#B4533A]' : ''}`}>{value}</p>
      <p className="mt-1 text-[11px] text-[#71827C]">{note}</p>
    </Card>
  )
}
