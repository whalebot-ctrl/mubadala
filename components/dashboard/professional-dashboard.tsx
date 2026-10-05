'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bitcoin,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  LogOut,
  Menu,
  Plus,
  ShieldCheck,
  X,
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
import { BrandLogo } from '@/components/brand-logo'
import DepositModal from '@/components/dashboard/DepositModal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type User = {
  id: string
  email: string
  fullName: string
  role: string
  kycStatus: string
  accountBalance: number
}

type Position = {
  id: string
  asset: string
  ticker: string
  category: string
  allocatedUSD: number
  unrealizedReturnPct: number
  currentValueUSD: number
  color: string
}

const defaultPositions: Position[] = []

const portfolioByEmail: Record<string, Position[]> = {
  // Edit allocatedUSD / currentValueUSD here to change this user's invested amounts.
  'sahowe716@gmail.com': [
    { id: 'sahowe716-1', asset: 'Bitcoin', ticker: 'BTC', category: 'Digital asset', allocatedUSD: 2650, unrealizedReturnPct: 45.28, currentValueUSD: 3815, color: '#D5F26A' },
    { id: 'sahowe716-2', asset: 'Solana', ticker: 'SOL', category: 'Digital asset', allocatedUSD: 450, unrealizedReturnPct: 35.56, currentValueUSD: 350, color: '#8FAE9F' },
    { id: 'sahowe716-3', asset: 'Sterling Adaptive Income', ticker: 'SAI', category: 'Smart strategy', allocatedUSD: 750, unrealizedReturnPct: 29.33, currentValueUSD: 1420, color: '#E3E8D6' },
    { id: 'sahowe716-4', asset: 'Ethereum', ticker: 'ETH', category: 'Digital asset', allocatedUSD: 1150, unrealizedReturnPct: 36.52, currentValueUSD: 1748, color: '#527064' },
  ],
  'rochellehowe@gmail.com': [],
  'ava.morgan@gmail.com': [
    { id: 'ava-1', asset: 'Bitcoin', ticker: 'BTC', category: 'Digital asset', allocatedUSD: 10500, unrealizedReturnPct: 20, currentValueUSD: 12600, color: '#D5F26A' },
    { id: 'ava-2', asset: 'Ethereum', ticker: 'ETH', category: 'Digital asset', allocatedUSD: 7000, unrealizedReturnPct: 11.43, currentValueUSD: 7800, color: '#8FAE9F' },
    { id: 'ava-3', asset: 'NVIDIA', ticker: 'NVDA', category: 'US equity', allocatedUSD: 7200, unrealizedReturnPct: 13.89, currentValueUSD: 8200, color: '#527064' },
    { id: 'ava-4', asset: 'Vanguard S&P 500 ETF', ticker: 'VOO', category: 'Index fund', allocatedUSD: 7000, unrealizedReturnPct: 8.57, currentValueUSD: 7600, color: '#B9C8C1' },
    { id: 'ava-5', asset: 'Sterling Adaptive Income', ticker: 'SAI', category: 'Smart strategy', allocatedUSD: 6200, unrealizedReturnPct: 4.52, currentValueUSD: 6480, color: '#E3E8D6' },
  ],
  'squadbeta130@gmail.com': [
    { id: 'squadbeta130-1', asset: 'Bitcoin', ticker: 'BTC', category: 'Digital asset', allocatedUSD: 10500, unrealizedReturnPct: 20, currentValueUSD: 12600, color: '#D5F26A' },
    { id: 'squadbeta130-2', asset: 'Ethereum', ticker: 'ETH', category: 'Digital asset', allocatedUSD: 7000, unrealizedReturnPct: 11.43, currentValueUSD: 7800, color: '#8FAE9F' },
    { id: 'squadbeta130-3', asset: 'NVIDIA', ticker: 'NVDA', category: 'US equity', allocatedUSD: 7200, unrealizedReturnPct: 13.89, currentValueUSD: 8200, color: '#527064' },
    { id: 'squadbeta130-4', asset: 'Vanguard S&P 500 ETF', ticker: 'VOO', category: 'Index fund', allocatedUSD: 7000, unrealizedReturnPct: 8.57, currentValueUSD: 7600, color: '#B9C8C1' },
    { id: 'squadbeta130-5', asset: 'Sterling Adaptive Income', ticker: 'SAI', category: 'Smart strategy', allocatedUSD: 6200, unrealizedReturnPct: 4.52, currentValueUSD: 6480, color: '#E3E8D6' },
  ],
  'liam.carter@gmail.com': [
    { id: 'liam-1', asset: 'Bitcoin', ticker: 'BTC', category: 'Digital asset', allocatedUSD: 15600, unrealizedReturnPct: 15.38, currentValueUSD: 18000, color: '#D5F26A' },
    { id: 'liam-2', asset: 'Solana', ticker: 'SOL', category: 'Digital asset', allocatedUSD: 7500, unrealizedReturnPct: 13.33, currentValueUSD: 8500, color: '#8FAE9F' },
    { id: 'liam-3', asset: 'Microsoft', ticker: 'MSFT', category: 'US equity', allocatedUSD: 10400, unrealizedReturnPct: 7.69, currentValueUSD: 11200, color: '#527064' },
    { id: 'liam-4', asset: 'Invesco Nasdaq 100 ETF', ticker: 'QQQ', category: 'Index fund', allocatedUSD: 11300, unrealizedReturnPct: 9.73, currentValueUSD: 12400, color: '#B9C8C1' },
    { id: 'liam-5', asset: 'Sterling Adaptive Income', ticker: 'SAI', category: 'Smart strategy', allocatedUSD: 8500, unrealizedReturnPct: 3.76, currentValueUSD: 8820, color: '#E3E8D6' },
  ],
  'sommerwilliams90@gmail.com': [
    { id: 'sommerwilliams90-1', asset: 'Bitcoin', ticker: 'BTC', category: 'Digital asset', allocatedUSD: 18100, unrealizedReturnPct: 16.02, currentValueUSD: 21000, color: '#D5F26A' },
    { id: 'sommerwilliams90-2', asset: 'Ethereum', ticker: 'ETH', category: 'Digital asset', allocatedUSD: 12800, unrealizedReturnPct: 13.28, currentValueUSD: 14500, color: '#8FAE9F' },
    { id: 'sommerwilliams90-3', asset: 'Apple', ticker: 'AAPL', category: 'US equity', allocatedUSD: 11500, unrealizedReturnPct: 8.7, currentValueUSD: 12500, color: '#527064' },
    { id: 'sommerwilliams90-4', asset: 'NVIDIA', ticker: 'NVDA', category: 'US equity', allocatedUSD: 12500, unrealizedReturnPct: 13.6, currentValueUSD: 14200, color: '#B9C8C1' },
    { id: 'sommerwilliams90-5', asset: 'Sterling Adaptive Income', ticker: 'SAI', category: 'Smart strategy', allocatedUSD: 13700, unrealizedReturnPct: 4.01, currentValueUSD: 14250, color: '#E3E8D6' },
  ],
  'noah.williams@gmail.com': [
    { id: 'noah-1', asset: 'Ethereum', ticker: 'ETH', category: 'Digital asset', allocatedUSD: 7600, unrealizedReturnPct: 11.84, currentValueUSD: 8500, color: '#D5F26A' },
    { id: 'noah-2', asset: 'Solana', ticker: 'SOL', category: 'Digital asset', allocatedUSD: 5500, unrealizedReturnPct: 14.18, currentValueUSD: 6280, color: '#8FAE9F' },
    { id: 'noah-3', asset: 'Advanced Micro Devices', ticker: 'AMD', category: 'US equity', allocatedUSD: 5900, unrealizedReturnPct: 10.17, currentValueUSD: 6500, color: '#527064' },
    { id: 'noah-4', asset: 'SPDR S&P 500 ETF', ticker: 'SPY', category: 'Index fund', allocatedUSD: 7400, unrealizedReturnPct: 8.11, currentValueUSD: 8000, color: '#B9C8C1' },
    { id: 'noah-5', asset: 'Sterling Adaptive Income', ticker: 'SAI', category: 'Smart strategy', allocatedUSD: 5250, unrealizedReturnPct: 4.76, currentValueUSD: 5500, color: '#E3E8D6' },
  ],
  'emma.thompson@gmail.com': [
    { id: 'emma-1', asset: 'Bitcoin', ticker: 'BTC', category: 'Digital asset', allocatedUSD: 23800, unrealizedReturnPct: 17.65, currentValueUSD: 28000, color: '#D5F26A' },
    { id: 'emma-2', asset: 'Ethereum', ticker: 'ETH', category: 'Digital asset', allocatedUSD: 15000, unrealizedReturnPct: 13.33, currentValueUSD: 17000, color: '#8FAE9F' },
    { id: 'emma-3', asset: 'Broadcom', ticker: 'AVGO', category: 'US equity', allocatedUSD: 12800, unrealizedReturnPct: 11.41, currentValueUSD: 14260, color: '#527064' },
    { id: 'emma-4', asset: 'Invesco Nasdaq 100 ETF', ticker: 'QQQ', category: 'Index fund', allocatedUSD: 14600, unrealizedReturnPct: 9.59, currentValueUSD: 16000, color: '#B9C8C1' },
    { id: 'emma-5', asset: 'Sterling Adaptive Income', ticker: 'SAI', category: 'Smart strategy', allocatedUSD: 15300, unrealizedReturnPct: 4.58, currentValueUSD: 16000, color: '#E3E8D6' },
  ],
}

const cashByEmail: Record<string, number> = {
  // Edit here to change withdrawable cash. Fully invested accounts should be 0.
  'sahowe716@gmail.com': 0,
  'rochellehowe@gmail.com': 0,
  'squadbeta130@gmail.com': 25000,
  'ava.morgan@gmail.com': 26400,
  'liam.carter@gmail.com': 28750,
  'sommerwilliams90@gmail.com': 12000,
  'noah.williams@gmail.com': 0,
  'emma.thompson@gmail.com': 0,
}

const CHART_POINTS = 7

type MarketQuote = {
  symbol: string
  price: number
  percentChange: number
  chartData: { time: number; price: number }[]
}

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

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

function recentDayLabels() {
  return Array.from({ length: CHART_POINTS }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (CHART_POINTS - 1 - index))
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })
}

function holdingValueAtIndex(position: Position, quote: MarketQuote | undefined, index: number) {
  const spark = quote?.chartData
  if (spark?.length && position.currentValueUSD > 0) {
    const sampled = sampleSparkline(spark, CHART_POINTS)
    const lastPrice = sampled[sampled.length - 1]?.price || quote?.price || 0
    if (lastPrice > 0 && sampled[index]) {
      return (position.currentValueUSD / lastPrice) * sampled[index].price
    }
  }

  const start = position.allocatedUSD
  const end = position.currentValueUSD
  const progress = CHART_POINTS <= 1 ? 1 : index / (CHART_POINTS - 1)
  return start + (end - start) * progress
}

function liveHoldingValue(position: Position, quote: MarketQuote | undefined) {
  if (!quote?.price || position.currentValueUSD <= 0) return position.currentValueUSD
  const sparkLast = quote.chartData[quote.chartData.length - 1]?.price
  const reference = sparkLast && sparkLast > 0 ? sparkLast : quote.price
  return position.currentValueUSD * (quote.price / reference)
}

export default function ProfessionalDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBalance, setShowBalance] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [quotes, setQuotes] = useState<Record<string, MarketQuote>>({})

  const positions = useMemo(
    () =>
      (portfolioByEmail[user?.email.toLowerCase() || ''] || defaultPositions).filter(
        (position) => position.allocatedUSD > 0 || position.currentValueUSD > 0,
      ),
    [user?.email],
  )
  const livePositions = useMemo(
    () =>
      positions.map((position) => {
        const liveValue = liveHoldingValue(position, quotes[position.ticker])
        const returnPct = position.allocatedUSD > 0
          ? ((liveValue - position.allocatedUSD) / position.allocatedUSD) * 100
          : 0
        return { ...position, currentValueUSD: liveValue, unrealizedReturnPct: returnPct }
      }),
    [positions, quotes],
  )
  const invested = useMemo(
    () => livePositions.reduce((sum, item) => sum + item.currentValueUSD, 0),
    [livePositions],
  )
  const principal = useMemo(() => positions.reduce((sum, item) => sum + item.allocatedUSD, 0), [positions])
  const cash = cashByEmail[user?.email.toLowerCase() || ''] ?? user?.accountBalance ?? 0
  const portfolioTotal = invested + cash
  const gain = invested - principal
  const returnPercent = principal > 0 ? (gain / principal) * 100 : 0
  const performance = useMemo(() => {
    const fallbackLabels = recentDayLabels()
    const sparkTemplate = livePositions
      .map((position) => quotes[position.ticker]?.chartData || [])
      .sort((left, right) => right.length - left.length)[0]
    const sampledTimes = sparkTemplate?.length ? sampleSparkline(sparkTemplate, CHART_POINTS) : []

    return fallbackLabels.map((label, index) => {
      const holdingsValue = positions.reduce(
        (sum, position) => sum + holdingValueAtIndex(position, quotes[position.ticker], index),
        0,
      )
      return {
        label: sampledTimes[index]?.time
          ? new Date(sampledTimes[index].time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : label,
        portfolio: holdingsValue + cash,
        invested: principal,
      }
    })
  }, [cash, livePositions, positions, principal, quotes])
  const allocationGradient = useMemo(() => {
    if (!invested || !livePositions.length) return 'conic-gradient(#E3E8D6 0 100%)'
    let start = 0
    const stops = livePositions.map((position) => {
      const end = start + (position.currentValueUSD / invested) * 100
      const stop = `${position.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`
      start = end
      return stop
    })
    return `conic-gradient(${stops.join(', ')})`
  }, [invested, livePositions])

  useEffect(() => {
    let cancelled = false

    const loadQuotes = async () => {
      try {
        const response = await fetch('/api/markets', { cache: 'no-store' })
        const data = await response.json()
        const next: Record<string, MarketQuote> = {}
        for (const asset of data.assets || []) {
          if (!asset?.symbol) continue
          next[asset.symbol] = {
            symbol: asset.symbol,
            price: Number(asset.price) || 0,
            percentChange: Number(asset.percentChange) || 0,
            chartData: Array.isArray(asset.chartData) ? asset.chartData : [],
          }
        }
        if (!cancelled) setQuotes(next)
      } catch {
        // Keep the last successful quotes so the chart still scales to portfolio amounts.
      }
    }

    loadQuotes()
    const timer = window.setInterval(loadQuotes, 45_000)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user') || 'null')
      if (!stored?.email || !stored?.fullName) {
        router.replace('/signin')
        return
      }
      const email = String(stored.email).toLowerCase()
      const accountBalance = email in cashByEmail ? cashByEmail[email] : (typeof stored.accountBalance === 'number' ? stored.accountBalance : 0)
      const profile = {
        id: stored.id,
        email: stored.email,
        fullName: stored.fullName,
        role: stored.role || 'investor',
        kycStatus: stored.kycStatus || 'approved',
        accountBalance,
      }
      setUser(profile)
      localStorage.setItem('user', JSON.stringify(profile))
    } catch {
      localStorage.removeItem('user')
      router.replace('/signin')
    } finally {
      setLoading(false)
    }
  }, [router])

  const signOut = () => {
    localStorage.removeItem('user')
    router.push('/signin')
  }

  const completeWithdrawal = (amount: number) => {
    if (!user) return
    const updated = { ...user, accountBalance: Math.max(0, user.accountBalance - amount) }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  if (loading || !user) return <DashboardSkeleton />

  return (
    <div className="min-h-screen bg-[#F4F5EF] text-[#10251F]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10251F]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <BrandLogo inverse />
          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/trade" className="text-sm font-medium text-white/60 transition hover:text-white">Trade</Link>
            <Link href="/dashboard/deposit" className="text-sm font-medium text-white/60 transition hover:text-white">Funding</Link>
            <span className="h-4 w-px bg-white/15" />
            <button onClick={signOut} className="flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white">
              <LogOut className="size-4" /> Sign out
            </button>
          </nav>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMobileMenu((open) => !open)}
            className="rounded-full border border-white/15 p-2 text-white md:hidden"
          >
            {mobileMenu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {mobileMenu && (
          <div className="border-t border-white/10 px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm font-medium text-white/70">
              <Link href="/trade">Trade</Link>
              <Link href="/dashboard/deposit">Funding</Link>
              <button onClick={signOut} className="text-left">Sign out</button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-5 py-9 lg:px-8 lg:py-12">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium text-[#60736C]">
              <ShieldCheck className="size-3.5" /> Account protected
            </p>
            <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em]">
              Welcome back, {user.fullName}.
            </h1>
            <p className="mt-2 text-sm text-[#60736C]">A clear view of your money and investments.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setWithdrawOpen(true)}
              className="h-11 rounded-full border-[#10251F]/15 bg-transparent px-5 hover:bg-white"
            >
              <ArrowDownToLine /> Withdraw
            </Button>
            <Button
              onClick={() => setDepositOpen(true)}
              className="h-11 rounded-full bg-[#10251F] px-5 text-white hover:bg-[#1B3B31]"
            >
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
                    onClick={() => setShowBalance((visible) => !visible)}
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
                  {gain >= 0 ? <ArrowUpRight className="size-4" /> : <ArrowDownToLine className="size-4" />} {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(2)}% all time
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5 text-[11px] text-white/55">
                Live · USD
              </span>
            </div>
            <div className="mt-7 h-52 sm:h-60">
              {portfolioTotal <= 0 && principal <= 0 ? (
                <div className="flex h-full items-center justify-center text-sm text-white/45">
                  Portfolio activity will appear here once funds are added.
                </div>
              ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performance} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="portfolioArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D5F26A" stopOpacity=".3" />
                      <stop offset="100%" stopColor="#D5F26A" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,.35)', fontSize: 10 }} />
                  <YAxis hide domain={[0, (dataMax: number) => Math.max(dataMax * 1.08, 1)]} />
                  <Tooltip
                    formatter={(value, name) => [
                      usd.format(Number(value)),
                      name === 'invested' ? 'Amount invested' : 'Portfolio',
                    ]}
                    contentStyle={{ border: 0, borderRadius: 12, background: '#F4F5EF', color: '#10251F' }}
                  />
                  <Area type="monotone" dataKey="portfolio" stroke="#D5F26A" strokeWidth={2.5} fill="url(#portfolioArea)" isAnimationActive={false} />
                  {principal > 0 && (
                    <Line type="monotone" dataKey="invested" stroke="rgba(255,255,255,.45)" strokeWidth={1.5} strokeDasharray="5 5" dot={false} isAnimationActive={false} />
                  )}
                </AreaChart>
              </ResponsiveContainer>
              )}
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
                <strong className="mt-1 text-lg">{usd.format(invested).replace('.00', '')}</strong>
              </div>
            </div>
            <div className="mt-7 space-y-3">
              {livePositions.length === 0 ? (
                <p className="text-xs text-[#71827C]">No allocations yet.</p>
              ) : (
                livePositions.slice(0, 4).map((position) => (
                  <div key={position.id} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-[#60736C]">
                      <span className="size-2 rounded-full" style={{ backgroundColor: position.color }} />
                      {position.ticker}
                    </span>
                    <span className="font-semibold">{invested ? ((position.currentValueUSD / invested) * 100).toFixed(1) : '0.0'}%</span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </section>

        <section className="mt-5 grid gap-4 sm:grid-cols-3">
          <Metric label="Invested assets" value={usd.format(invested)} note={livePositions.length ? `${livePositions.length} holdings · live` : 'No holdings yet'} />
          <Metric label="Available cash" value={showBalance ? usd.format(cash) : '••••••'} note={cash > 0 ? 'Ready to withdraw' : 'Fully invested'} />
          <Metric label="Total gain" value={`${gain >= 0 ? '+' : ''}${usd.format(gain)}`} note={`${returnPercent >= 0 ? '+' : ''}${returnPercent.toFixed(2)}% since investing`} positive={gain >= 0} />
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
            {livePositions.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="font-semibold">No investments yet</p>
                <p className="mt-2 text-sm text-[#71827C]">Add funds to start building your portfolio.</p>
              </div>
            ) : (
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
                  {livePositions.map((position) => (
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
            )}
          </Card>

          <Card className="rounded-[28px] border border-[#10251F]/10 bg-[#E9ECD9] p-6 shadow-none">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#60736C]">Quick access</p>
            <h2 className="mt-4 text-2xl font-medium tracking-[-0.03em]">Move money without the friction.</h2>
            <p className="mt-3 text-sm leading-6 text-[#60736C]">
              Add funds or request a withdrawal from your available cash balance.
            </p>
            <div className="mt-8 space-y-2">
              <button onClick={() => setDepositOpen(true)} className="flex w-full items-center justify-between rounded-2xl bg-[#10251F] p-4 text-left text-white">
                <span className="flex items-center gap-3 text-sm font-semibold"><Plus className="size-4" /> Add funds</span>
                <ArrowRight className="size-4 text-white/50" />
              </button>
              <button onClick={() => setWithdrawOpen(true)} className="flex w-full items-center justify-between rounded-2xl border border-[#10251F]/10 bg-white/60 p-4 text-left">
                <span className="flex items-center gap-3 text-sm font-semibold"><ArrowDownToLine className="size-4" /> Withdraw</span>
                <ArrowRight className="size-4 text-[#60736C]" />
              </button>
            </div>
          </Card>
        </section>
      </main>

      <DepositModal open={depositOpen} onClose={() => setDepositOpen(false)} />
      <WithdrawalDialog
        open={withdrawOpen}
        available={cash}
        onClose={() => setWithdrawOpen(false)}
        onComplete={completeWithdrawal}
      />
    </div>
  )
}

function Metric({ label, value, note, positive = false }: { label: string; value: string; note: string; positive?: boolean }) {
  return (
    <Card className="rounded-2xl border border-[#10251F]/10 bg-white/65 p-5 shadow-none">
      <p className="text-xs font-medium text-[#71827C]">{label}</p>
      <p className={`mt-3 text-2xl font-semibold tracking-[-0.03em] ${positive ? 'text-[#64820F]' : ''}`}>{value}</p>
      <p className="mt-2 text-[11px] text-[#82918C]">{note}</p>
    </Card>
  )
}

function WithdrawalDialog({
  open,
  available,
  onClose,
  onComplete,
}: {
  open: boolean
  available: number
  onClose: () => void
  onComplete: (amount: number) => void
}) {
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')
  const [btcPrice, setBtcPrice] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const numericAmount = Number(amount) || 0
  const btcAmount = btcPrice && numericAmount ? numericAmount / btcPrice : 0

  useEffect(() => {
    if (!open) return
    fetch('/api/markets', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        const bitcoin = data.assets?.find((asset: { symbol: string }) => asset.symbol === 'BTC')
        if (bitcoin?.price) setBtcPrice(bitcoin.price)
      })
      .catch(() => setBtcPrice(null))
  }, [open])

  const close = () => {
    setAmount('')
    setAddress('')
    setError('')
    setSubmitted(false)
    onClose()
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (numericAmount <= 0) return setError('Enter a valid withdrawal amount.')
    if (numericAmount > available) return setError('This amount is higher than your available cash.')
    if (address.trim().length < 26) return setError('Enter a valid Bitcoin wallet address.')
    setError('')
    setSubmitted(true)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07130F]/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-[28px] bg-[#F9FAF6] p-6 shadow-2xl sm:p-7">
        <button onClick={close} aria-label="Close withdrawal" className="absolute right-5 top-5 text-[#71827C] hover:text-[#10251F]">
          <X className="size-5" />
        </button>
        {submitted ? (
          <div className="py-5 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#D5F26A]">
              <Check className="size-6" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold">Withdrawal initiated</h2>
            <p className="mt-3 text-sm leading-6 text-[#60736C]">
              Your withdrawal of {usd.format(numericAmount)} ({btcAmount.toFixed(6)} BTC) has been initiated and will arrive in your wallet within 24 hours.
            </p>
            <Button
              onClick={() => {
                onComplete(numericAmount)
                close()
              }}
              className="mt-7 h-11 w-full rounded-full bg-[#10251F] text-white"
            >
              Return to dashboard
            </Button>
          </div>
        ) : (
          <>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#10251F] text-[#D5F26A]">
              <Bitcoin className="size-5" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold">Withdraw to Bitcoin</h2>
            <p className="mt-2 text-sm text-[#60736C]">Available cash: {usd.format(available)}</p>
            {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
            <form onSubmit={submit} className="mt-6 space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-[#60736C]">Amount in USD</span>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#71827C]">$</span>
                  <input
                    type="number"
                    min="1"
                    max={available}
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    className="h-12 w-full rounded-xl border border-[#10251F]/10 bg-white pl-8 pr-4 text-sm outline-none focus:border-[#527064]"
                    placeholder="0.00"
                  />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-[#71827C]">
                  <span>{btcPrice ? `≈ ${btcAmount.toFixed(6)} BTC` : 'Getting live BTC rate…'}</span>
                  <button type="button" onClick={() => setAmount(String(available))} className="font-semibold text-[#31594B]">Use max</button>
                </div>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-[#60736C]">Bitcoin wallet address</span>
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="h-12 w-full rounded-xl border border-[#10251F]/10 bg-white px-4 font-mono text-xs outline-none focus:border-[#527064]"
                  placeholder="bc1q…"
                />
              </label>
              <Button type="submit" disabled={!btcPrice} className="h-12 w-full rounded-full bg-[#10251F] text-white hover:bg-[#1B3B31]">
                Confirm withdrawal
              </Button>
              <p className="text-center text-[11px] leading-4 text-[#82918C]">
                BTC conversions use the current market rate. Network movement may affect the final amount.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F5EF]">
      <div className="text-center">
        <div className="mx-auto size-9 animate-spin rounded-full border-2 border-[#10251F]/15 border-t-[#10251F]" />
        <p className="mt-4 text-sm text-[#60736C]">Preparing your portfolio…</p>
      </div>
    </div>
  )
}
