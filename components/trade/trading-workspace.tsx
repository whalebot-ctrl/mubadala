'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowDownUp,
  ArrowLeft,
  BarChart3,
  RefreshCw,
  Search,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type Asset = {
  symbol: string
  name: string
  type: 'crypto' | 'stock'
  segment: 'Crypto' | 'Stock' | 'ETF' | 'Recent IPO'
  price: number
  change: number
  percentChange: number
  chartData: { time: number; price: number }[]
}

type FuturesContract = {
  symbol: string
  base: string
  price: number
  change24h: number
  fundingRate: number
  openInterest: number
  volume24h: number
  basis: number
}

type OptionContract = {
  instrument: string
  expiry: string
  strike: number
  side: 'Call' | 'Put'
  markPrice: number
  markIv: number
  change24h: number
  openInterest: number
  volumeUsd: number
  underlyingPrice: number
}

type AlphaAsset = {
  id: string
  name: string
  symbol: string
  rank: number | null
  price: number
  change24h: number
  marketCap: string
  volume: string
}

const tabs = ['Spot', 'Convert', 'Futures', 'Options', 'Alpha'] as const
type TradeTab = (typeof tabs)[number]

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const compact = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 2,
})

export default function TradingWorkspace() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [selectedSymbol, setSelectedSymbol] = useState('BTC')
  const [tab, setTab] = useState<TradeTab>('Spot')
  const [search, setSearch] = useState('')
  const [marketFilter, setMarketFilter] = useState<'All' | 'Crypto' | 'Stocks' | 'IPOs'>('All')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)
  const [futures, setFutures] = useState<FuturesContract[]>([])
  const [options, setOptions] = useState<OptionContract[]>([])
  const [alpha, setAlpha] = useState<AlphaAsset[]>([])
  const [productLoading, setProductLoading] = useState(true)
  const [sources, setSources] = useState({ futures: '', options: '', alpha: '' })

  const loadPrices = useCallback(async (silent = false) => {
    if (!silent) setRefreshing(true)
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 10_000)
    try {
      const response = await fetch('/api/markets', { cache: 'no-store', signal: controller.signal })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Live prices are unavailable')
      setAssets(data.assets)
      setUpdatedAt(new Date(data.updatedAt))
      setError('')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Live prices are unavailable')
    } finally {
      window.clearTimeout(timeout)
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  const loadProducts = useCallback(async () => {
    try {
      const response = await fetch('/api/trade-data', { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error('Advanced market data is unavailable')
      setFutures(data.futures || [])
      setOptions(data.options || [])
      setAlpha(data.alpha || [])
      setSources(data.sources || {})
    } finally {
      setProductLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPrices()
    loadProducts()
    const interval = window.setInterval(() => {
      loadPrices(true)
      loadProducts()
    }, 30_000)
    return () => window.clearInterval(interval)
  }, [loadPrices, loadProducts])

  const selected = assets.find((asset) => asset.symbol === selectedSymbol) || assets[0]
  const visibleAssets = useMemo(() => {
    const query = search.toLowerCase().trim()
    return assets.filter((asset) => {
      const matchesSearch = !query || asset.symbol.toLowerCase().includes(query) || asset.name.toLowerCase().includes(query)
      const matchesFilter =
        marketFilter === 'All' ||
        (marketFilter === 'Crypto' && asset.type === 'crypto') ||
        (marketFilter === 'Stocks' && asset.type === 'stock' && asset.segment !== 'Recent IPO') ||
        (marketFilter === 'IPOs' && asset.segment === 'Recent IPO')
      return matchesSearch && matchesFilter
    })
  }, [assets, marketFilter, search])

  useEffect(() => {
    if (visibleAssets.length && !visibleAssets.some((asset) => asset.symbol === selectedSymbol)) {
      setSelectedSymbol(visibleAssets[0].symbol)
    }
  }, [selectedSymbol, visibleAssets])

  return (
    <div className="min-h-screen bg-[#F4F5EF] text-[#10251F]">
      <header className="border-b border-white/10 bg-[#10251F]">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-8">
            <BrandLogo inverse />
            <nav className="hidden items-center gap-6 lg:flex">
              {tabs.map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`relative h-[72px] text-sm font-medium transition ${
                    tab === item ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {item}
                  {tab === item && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#D5F26A]" />}
                </button>
              ))}
            </nav>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white">
            <ArrowLeft className="size-4" /> Portfolio
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto border-t border-white/10 px-5 lg:hidden">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`shrink-0 border-b-2 py-3 text-xs font-medium ${
                tab === item ? 'border-[#D5F26A] text-white' : 'border-transparent text-white/50'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-4 py-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-[#71827C]">Sterling Ridge Trade</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">{tab}</h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#71827C]">
            <span className="size-1.5 rounded-full bg-[#79A30E]" />
            {updatedAt ? `Live · ${updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Connecting'}
            <button onClick={() => { loadPrices(); loadProducts(); }} aria-label="Refresh prices">
              <RefreshCw className={`size-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {error && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {loading ? (
          <div className="flex min-h-[520px] items-center justify-center">
            <RefreshCw className="size-6 animate-spin text-[#60736C]" />
          </div>
        ) : tab === 'Spot' ? (
          <SpotWorkspace
            assets={visibleAssets}
            selected={selected}
            search={search}
            filter={marketFilter}
            onSearch={setSearch}
            onFilter={setMarketFilter}
            onSelect={setSelectedSymbol}
          />
        ) : tab === 'Convert' ? (
          <ConvertPanel assets={assets} />
        ) : tab === 'Futures' ? (
          <FuturesPanel contracts={futures} spotAssets={assets.filter((asset) => asset.type === 'crypto')} loading={productLoading} source={sources.futures} />
        ) : tab === 'Options' ? (
          <OptionsPanel contracts={options} loading={productLoading} source={sources.options} />
        ) : (
          <AlphaPanel assets={alpha} loading={productLoading} source={sources.alpha} />
        )}
      </main>
    </div>
  )
}

function SpotWorkspace({
  assets,
  selected,
  search,
  filter,
  onSearch,
  onFilter,
  onSelect,
}: {
  assets: Asset[]
  selected?: Asset
  search: string
  filter: 'All' | 'Crypto' | 'Stocks' | 'IPOs'
  onSearch: (value: string) => void
  onFilter: (value: 'All' | 'Crypto' | 'Stocks' | 'IPOs') => void
  onSelect: (value: string) => void
}) {
  if (!selected) return <EmptyFeed />

  return (
    <div className="grid gap-4 xl:grid-cols-[250px_1fr_300px]">
      <Card className="order-2 overflow-hidden rounded-2xl border border-[#10251F]/10 bg-white/75 shadow-none xl:order-1">
        <div className="border-b border-[#10251F]/10 p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#82918C]" />
            <input
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search markets"
              className="h-9 w-full rounded-lg border border-[#10251F]/10 bg-[#F4F5EF] pl-9 pr-3 text-xs outline-none"
            />
          </div>
          <div className="mt-2 flex gap-1 overflow-x-auto">
            {(['All', 'Crypto', 'Stocks', 'IPOs'] as const).map((item) => (
              <button
                key={item}
                onClick={() => onFilter(item)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  filter === item ? 'bg-[#10251F] text-white' : 'text-[#71827C] hover:bg-[#10251F]/5'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="max-h-[620px] overflow-y-auto p-1.5">
          {assets.map((asset) => (
            <button
              key={asset.symbol}
              onClick={() => onSelect(asset.symbol)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left ${
                selected.symbol === asset.symbol ? 'bg-[#E9ECD9]' : 'hover:bg-[#F4F5EF]'
              }`}
            >
              <div>
                <p className="text-xs font-semibold">{asset.symbol}/USD</p>
                <p className="mt-0.5 text-[10px] text-[#82918C]">{asset.segment}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold">{money.format(asset.price)}</p>
                <p className={`text-[10px] font-medium ${asset.percentChange >= 0 ? 'text-[#64820F]' : 'text-red-600'}`}>
                  {asset.percentChange >= 0 ? '+' : ''}{asset.percentChange.toFixed(2)}%
                </p>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="order-1 rounded-2xl border border-[#10251F]/10 bg-white/75 p-5 shadow-none xl:order-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs text-[#71827C]">{selected.type === 'crypto' ? 'Spot market' : 'Live equity'}</p>
            <h2 className="mt-1 text-2xl font-semibold">{selected.name} <span className="text-[#82918C]">{selected.symbol}/USD</span></h2>
          </div>
          <div className="sm:text-right">
            <p className="text-3xl font-semibold">{money.format(selected.price)}</p>
            <p className={`mt-1 flex items-center gap-1 text-sm font-semibold sm:justify-end ${
              selected.percentChange >= 0 ? 'text-[#64820F]' : 'text-red-600'
            }`}>
              {selected.percentChange >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
              {selected.percentChange >= 0 ? '+' : ''}{selected.percentChange.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="mt-5 h-[380px] lg:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={selected.chartData}>
              <defs>
                <linearGradient id="tradeArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#527064" stopOpacity=".28" />
                  <stop offset="100%" stopColor="#527064" stopOpacity="0" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#10251F" strokeOpacity=".07" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={['dataMin', 'dataMax']} orientation="right" tick={{ fontSize: 10, fill: '#82918C' }} axisLine={false} tickLine={false} width={65} />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString()}
                formatter={(value) => [money.format(Number(value)), 'Price']}
                contentStyle={{ borderRadius: 12, border: '1px solid rgba(16,37,31,.1)' }}
              />
              <Area type="monotone" dataKey="price" stroke="#31594B" strokeWidth={2} fill="url(#tradeArea)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <OrderTicket selected={selected} />
    </div>
  )
}

function OrderTicket({ selected }: { selected: Asset }) {
  const [side, setSide] = useState<'Buy' | 'Sell'>('Buy')
  const [amount, setAmount] = useState('')
  const estimate = (Number(amount) || 0) / selected.price

  return (
    <Card className="order-3 h-fit rounded-2xl border border-[#10251F]/10 bg-white/75 p-5 shadow-none">
      <div className="grid grid-cols-2 rounded-xl bg-[#EDF0E7] p-1">
        {(['Buy', 'Sell'] as const).map((item) => (
          <button key={item} onClick={() => setSide(item)} className={`rounded-lg py-2 text-xs font-semibold ${
            side === item ? 'bg-white shadow-sm' : 'text-[#71827C]'
          }`}>
            {item}
          </button>
        ))}
      </div>
      <label className="mt-5 block text-xs font-medium text-[#60736C]">
        Amount in USD
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="0.00"
          className="mt-2 h-12 w-full rounded-xl border border-[#10251F]/10 bg-[#F9FAF6] px-4 text-sm outline-none"
        />
      </label>
      <div className="mt-4 rounded-xl bg-[#F4F5EF] p-4 text-xs">
        <div className="flex justify-between text-[#71827C]"><span>Estimated {selected.symbol}</span><span>{estimate.toFixed(6)}</span></div>
        <div className="mt-3 flex justify-between text-[#71827C]"><span>Market price</span><span>{money.format(selected.price)}</span></div>
      </div>
      <Button className="mt-5 h-11 w-full rounded-full bg-[#10251F] text-white hover:bg-[#1B3B31]">
        Review {side.toLowerCase()} order
      </Button>
      <p className="mt-3 text-center text-[10px] leading-4 text-[#82918C]">Order review only. No trade is submitted from this screen.</p>
    </Card>
  )
}

function ConvertPanel({ assets }: { assets: Asset[] }) {
  const crypto = assets.filter((asset) => asset.type === 'crypto')
  const [symbol, setSymbol] = useState('BTC')
  const [amount, setAmount] = useState('')
  const asset = crypto.find((item) => item.symbol === symbol) || crypto[0]
  const converted = asset ? (Number(amount) || 0) / asset.price : 0

  return (
    <div className="mx-auto max-w-lg py-8">
      <Card className="rounded-[28px] border border-[#10251F]/10 bg-white/75 p-6 shadow-none sm:p-8">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-[#10251F] text-[#D5F26A]"><ArrowDownUp className="size-5" /></div>
        <h2 className="mt-5 text-2xl font-semibold">Convert USD to crypto</h2>
        <p className="mt-2 text-sm text-[#71827C]">Preview a conversion at the current live market price.</p>
        <label className="mt-7 block text-xs font-medium text-[#60736C]">
          You pay
          <input value={amount} onChange={(event) => setAmount(event.target.value)} type="number" placeholder="0.00 USD" className="mt-2 h-14 w-full rounded-xl border border-[#10251F]/10 bg-[#F9FAF6] px-4 text-lg outline-none" />
        </label>
        <label className="mt-4 block text-xs font-medium text-[#60736C]">
          You receive
          <div className="mt-2 flex h-14 items-center rounded-xl border border-[#10251F]/10 bg-[#F9FAF6] px-4">
            <span className="flex-1 text-lg">{converted.toFixed(6)}</span>
            <select value={symbol} onChange={(event) => setSymbol(event.target.value)} className="bg-transparent text-sm font-semibold outline-none">
              {crypto.map((item) => <option key={item.symbol}>{item.symbol}</option>)}
            </select>
          </div>
        </label>
        <Button className="mt-6 h-12 w-full rounded-full bg-[#10251F] text-white">Preview conversion</Button>
      </Card>
    </div>
  )
}

function FuturesPanel({
  contracts,
  spotAssets,
  loading,
  source,
}: {
  contracts: FuturesContract[]
  spotAssets: Asset[]
  loading: boolean
  source: string
}) {
  if (loading) return <ProductLoading />
  if (!contracts.length) {
    return (
      <div className="space-y-4">
        <MarketDisclosure
          title="Perpetual futures watchlist"
          text="The derivatives provider is unavailable, so live spot reference prices are shown without fabricated funding or open-interest values."
          source="Live spot reference"
        />
        <Card className="overflow-hidden rounded-2xl border border-[#10251F]/10 bg-white/75 shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="border-b border-[#10251F]/10 text-[10px] font-semibold uppercase tracking-wider text-[#82918C]">
                  <th className="px-5 py-3">Reference pair</th>
                  <th className="px-4 py-3 text-right">Spot price</th>
                  <th className="px-4 py-3 text-right">24h change</th>
                  <th className="px-4 py-3 text-right">Funding</th>
                  <th className="px-5 py-3 text-right">Open interest</th>
                </tr>
              </thead>
              <tbody>
                {spotAssets.map((asset) => (
                  <tr key={asset.symbol} className="border-b border-[#10251F]/5 last:border-0">
                    <td className="px-5 py-4 text-sm font-semibold">{asset.symbol}USDT</td>
                    <td className="px-4 py-4 text-right text-sm font-semibold">{money.format(asset.price)}</td>
                    <td className={`px-4 py-4 text-right text-xs font-semibold ${asset.percentChange >= 0 ? 'text-[#64820F]' : 'text-red-600'}`}>
                      {asset.percentChange >= 0 ? '+' : ''}{asset.percentChange.toFixed(2)}%
                    </td>
                    <td className="px-4 py-4 text-right text-xs text-[#82918C]">Unavailable</td>
                    <td className="px-5 py-4 text-right text-xs text-[#82918C]">Unavailable</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <MarketDisclosure
        title="USDⓈ-M perpetual futures"
        text="Live Binance Futures market data, presented for research. Leverage controls are intentionally disabled."
        source={source}
      />
      <Card className="overflow-hidden rounded-2xl border border-[#10251F]/10 bg-white/75 shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">
            <thead>
              <tr className="border-b border-[#10251F]/10 text-[10px] font-semibold uppercase tracking-wider text-[#82918C]">
                <th className="px-5 py-3">Contract</th>
                <th className="px-4 py-3 text-right">Last price</th>
                <th className="px-4 py-3 text-right">24h change</th>
                <th className="px-4 py-3 text-right">Funding rate</th>
                <th className="px-4 py-3 text-right">Open interest</th>
                <th className="px-5 py-3 text-right">24h volume</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.symbol} className="border-b border-[#10251F]/5 last:border-0 hover:bg-[#F4F5EF]">
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold">{contract.symbol}</p>
                    <p className="mt-0.5 text-[10px] text-[#82918C]">Perpetual · USDT</p>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-semibold tabular-nums">{money.format(contract.price)}</td>
                  <td className={`px-4 py-4 text-right text-xs font-semibold ${contract.change24h >= 0 ? 'text-[#64820F]' : 'text-red-600'}`}>
                    {contract.change24h >= 0 ? '+' : ''}{contract.change24h.toFixed(2)}%
                  </td>
                  <td className={`px-4 py-4 text-right text-xs ${contract.fundingRate >= 0 ? 'text-[#31594B]' : 'text-red-600'}`}>
                    {contract.fundingRate.toFixed(4)}%
                  </td>
                  <td className="px-4 py-4 text-right text-xs tabular-nums">${compact.format(contract.openInterest)}</td>
                  <td className="px-5 py-4 text-right text-xs tabular-nums">${compact.format(contract.volume24h)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-3">
        <ProductMetric label="Contracts tracked" value={String(contracts.length)} />
        <ProductMetric label="Settlement" value="USDT" />
        <ProductMetric label="Product access" value="Research only" />
      </div>
    </div>
  )
}

function OptionsPanel({ contracts, loading, source }: { contracts: OptionContract[]; loading: boolean; source: string }) {
  if (loading) return <ProductLoading />
  if (!contracts.length) return <UnavailableProduct name="Options" />

  const calls = contracts.filter((contract) => contract.side === 'Call').length
  const puts = contracts.length - calls

  return (
    <div className="space-y-4">
      <MarketDisclosure
        title="BTC options chain"
        text="A simplified options chain showing active contracts with the highest open interest."
        source={source}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <ProductMetric label="BTC underlying" value={money.format(contracts[0].underlyingPrice)} />
        <ProductMetric label="Calls / Puts" value={`${calls} / ${puts}`} />
        <ProductMetric label="Contracts shown" value={String(contracts.length)} />
      </div>
      <Card className="overflow-hidden rounded-2xl border border-[#10251F]/10 bg-white/75 shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead>
              <tr className="border-b border-[#10251F]/10 text-[10px] font-semibold uppercase tracking-wider text-[#82918C]">
                <th className="px-5 py-3">Instrument</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3 text-right">Strike</th>
                <th className="px-4 py-3 text-right">Mark price</th>
                <th className="px-4 py-3 text-right">Mark IV</th>
                <th className="px-4 py-3 text-right">24h change</th>
                <th className="px-5 py-3 text-right">Open interest</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.instrument} className="border-b border-[#10251F]/5 last:border-0 hover:bg-[#F4F5EF]">
                  <td className="px-5 py-4">
                    <p className="text-xs font-semibold">{contract.instrument}</p>
                    <p className="mt-0.5 text-[10px] text-[#82918C]">Expires {contract.expiry}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      contract.side === 'Call' ? 'bg-[#E9ECD9] text-[#527064]' : 'bg-red-50 text-red-600'
                    }`}>{contract.side}</span>
                  </td>
                  <td className="px-4 py-4 text-right text-xs font-medium">{money.format(contract.strike)}</td>
                  <td className="px-4 py-4 text-right text-xs">{contract.markPrice.toFixed(5)} BTC</td>
                  <td className="px-4 py-4 text-right text-xs">{contract.markIv.toFixed(2)}%</td>
                  <td className={`px-4 py-4 text-right text-xs font-semibold ${contract.change24h >= 0 ? 'text-[#64820F]' : 'text-red-600'}`}>
                    {contract.change24h >= 0 ? '+' : ''}{contract.change24h.toFixed(2)}%
                  </td>
                  <td className="px-5 py-4 text-right text-xs">{compact.format(contract.openInterest)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

function AlphaPanel({ assets, loading, source }: { assets: AlphaAsset[]; loading: boolean; source: string }) {
  if (loading) return <ProductLoading />
  if (!assets.length) return <UnavailableProduct name="Alpha" />

  return (
    <div className="space-y-4">
      <MarketDisclosure
        title="Trending crypto assets"
        text="A discovery view inspired by exchange Alpha sections, ranked from current public search interest."
        source={source}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {assets.map((asset, index) => (
          <Card key={asset.id} className="rounded-2xl border border-[#10251F]/10 bg-white/75 p-5 shadow-none">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#10251F] text-xs font-semibold text-[#D5F26A]">
                  {asset.symbol.slice(0, 2)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{asset.name}</p>
                  <p className="text-[10px] text-[#82918C]">{asset.symbol} · Trending #{index + 1}</p>
                </div>
              </div>
              <Sparkles className="size-4 text-[#839F2B]" />
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-[10px] text-[#82918C]">Price</p>
                <p className="mt-1 text-lg font-semibold">{asset.price < 0.01 ? `$${asset.price.toPrecision(4)}` : money.format(asset.price)}</p>
              </div>
              <p className={`text-xs font-semibold ${asset.change24h >= 0 ? 'text-[#64820F]' : 'text-red-600'}`}>
                {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
              </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[#10251F]/10 pt-4 text-[10px] text-[#71827C]">
              <span>Market cap<br /><strong className="mt-1 block text-[#10251F]">{asset.marketCap}</strong></span>
              <span>Volume<br /><strong className="mt-1 block text-[#10251F]">{asset.volume}</strong></span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function MarketDisclosure({ title, text, source }: { title: string; text: string; source: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-[#10251F] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-1 text-xs leading-5 text-white/50">{text}</p>
      </div>
      <span className="shrink-0 rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5 text-[10px] text-white/50">
        Source: {source}
      </span>
    </div>
  )
}

function ProductMetric({ label, value }: { label: string; value: string }) {
  return (
    <Card className="rounded-2xl border border-[#10251F]/10 bg-white/70 p-5 shadow-none">
      <p className="text-xs text-[#71827C]">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </Card>
  )
}

function ProductLoading() {
  return <div className="grid min-h-[480px] place-items-center"><RefreshCw className="size-6 animate-spin text-[#60736C]" /></div>
}

function UnavailableProduct({ name }: { name: string }) {
  return (
    <div className="grid min-h-[480px] place-items-center">
      <div className="max-w-md text-center">
        <BarChart3 className="mx-auto size-7 text-[#60736C]" />
        <h2 className="mt-4 text-xl font-semibold">{name} data is temporarily unavailable</h2>
        <p className="mt-2 text-sm text-[#71827C]">The public provider did not respond. This section will reconnect automatically.</p>
      </div>
    </div>
  )
}

function EmptyFeed() {
  return <div className="grid min-h-[480px] place-items-center text-sm text-[#71827C]">Live market feed unavailable.</div>
}
