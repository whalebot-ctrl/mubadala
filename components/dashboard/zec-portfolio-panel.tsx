'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Eye, EyeOff } from 'lucide-react'
import { Card } from '@/components/ui/card'

/** Cash on the Zcash account (second dashboard panel). */
export const ZEC_SLIDE_AVAILABLE_CASH_USD = 50_000

type ZecQuote = {
  price: number
  percentChange: number
  chartData: { time: number; price: number }[]
}

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

function formatChartTime(time: number) {
  return new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function ZecPortfolioPanel({ fullName }: { fullName: string }) {
  const [showBalance, setShowBalance] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quote, setQuote] = useState<ZecQuote | null>(null)

  const investedAssets = 0
  const availableCash = ZEC_SLIDE_AVAILABLE_CASH_USD
  const totalPortfolio = investedAssets + availableCash

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const response = await fetch('/api/markets', { cache: 'no-store' })
        const data = await response.json()
        const zec = (data.assets || []).find((asset: { symbol: string }) => asset.symbol === 'ZEC')
        if (!zec?.price) {
          if (!cancelled) setError('Zcash market data is temporarily unavailable.')
          return
        }
        if (!cancelled) {
          setQuote({
            price: Number(zec.price),
            percentChange: Number(zec.percentChange) || 0,
            chartData: Array.isArray(zec.chartData) ? zec.chartData : [],
          })
          setError('')
        }
      } catch {
        if (!cancelled) setError('Could not load live ZEC prices.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    const timer = window.setInterval(load, 45_000)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  const priceChart = useMemo(
    () =>
      quote?.chartData.map((point) => ({
        label: formatChartTime(point.time),
        price: point.price,
      })) || [],
    [quote],
  )

  if (loading) {
    return (
      <div className="min-h-[70vh] animate-pulse rounded-[32px] border border-[#10251F]/10 bg-white/75 p-8">
        <div className="h-6 w-48 rounded bg-[#10251F]/10" />
        <div className="mt-8 h-64 rounded-3xl bg-[#F4F5EF]" />
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] text-[#10251F]">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-[#60736C]">Zcash account</p>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em]">{fullName}</h1>
        </div>
        {quote && (
          <div className="text-left sm:text-right">
            <p className="text-xs text-[#71827C]">ZEC</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{usd.format(quote.price)}</p>
            <p className={`text-xs font-semibold ${quote.percentChange >= 0 ? 'text-[#64820F]' : 'text-[#B4533A]'}`}>
              {quote.percentChange >= 0 ? '+' : ''}{quote.percentChange.toFixed(2)}% today
            </p>
          </div>
        )}
      </section>

      {error && (
        <p className="mt-4 rounded-xl border border-[#B4533A]/30 bg-[#FEF2F0] p-3 text-sm text-[#B4533A]">{error}</p>
      )}

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.45fr_.55fr]">
        <Card className="overflow-hidden rounded-[32px] border-0 bg-[#10251F] p-6 text-white shadow-none sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-white/50">
                Total portfolio
                <button
                  type="button"
                  onClick={() => setShowBalance((v) => !v)}
                  className="text-white/45 hover:text-white"
                  aria-label={showBalance ? 'Hide balance' : 'Show balance'}
                >
                  {showBalance ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                </button>
              </div>
              <p className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                {showBalance ? usd.format(totalPortfolio) : '••••••••'}
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5 text-[11px] text-white/55">USD</span>
          </div>

          <div className="mt-7 h-52 sm:h-60">
            {priceChart.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceChart}>
                  <defs>
                    <linearGradient id="zecSlidePriceArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D5F26A" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#D5F26A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,.35)', fontSize: 10 }} interval="preserveStartEnd" minTickGap={32} />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip
                    formatter={(value) => [usd.format(Number(value)), 'ZEC']}
                    contentStyle={{ border: 0, borderRadius: 12, background: '#F4F5EF', color: '#10251F' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#D5F26A" strokeWidth={2.5} fill="url(#zecSlidePriceArea)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </Card>

        <Card className="rounded-[32px] border border-[#10251F]/10 bg-white/75 p-6 shadow-none">
          <h2 className="font-semibold">Balances</h2>
          <dl className="mt-6 space-y-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[#60736C]">Available cash</dt>
              <dd className="font-semibold tabular-nums">{usd.format(availableCash)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#60736C]">Invested assets</dt>
              <dd className="font-semibold tabular-nums">{usd.format(investedAssets)}</dd>
            </div>
          </dl>
        </Card>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-3">
        <Metric label="Invested assets" value={usd.format(investedAssets)} note="No holdings" />
        <Metric label="Available cash" value={showBalance ? usd.format(availableCash) : '••••••'} note="Ready to withdraw" />
        <Metric label="Total gain" value={usd.format(0)} note="0.00% since investing" />
      </section>

      <Card className="mt-10 overflow-hidden rounded-[28px] border border-[#10251F]/10 bg-white/75 shadow-none">
        <div className="border-b border-[#10251F]/10 px-5 py-5 sm:px-6">
          <h2 className="font-semibold">Your investments</h2>
          <p className="mt-1 text-xs text-[#71827C]">Current holdings</p>
        </div>
        <div className="px-6 py-16 text-center">
          <p className="font-semibold">No investments yet</p>
          <p className="mt-2 text-sm text-[#71827C]">Add funds to start building your portfolio.</p>
        </div>
      </Card>
    </div>
  )
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card className="rounded-2xl border border-[#10251F]/10 bg-white/65 p-5 shadow-none">
      <p className="text-xs font-medium text-[#71827C]">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{value}</p>
      <p className="mt-2 text-[11px] text-[#82918C]">{note}</p>
    </Card>
  )
}
