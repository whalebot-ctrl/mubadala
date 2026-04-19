'use client'

import { useEffect, useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DepositModal from '@/components/dashboard/DepositModal'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { 
  Search, TrendingUp, TrendingDown, Star, 
  ArrowUpRight, Activity, Wallet, Zap, Monitor,
  ArrowLeftRight, ShieldCheck, Info, Smartphone
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar
} from 'recharts'

// --- Advanced Types ---
interface Asset {
  symbol: string
  name: string
  type: 'crypto' | 'stock'
  price: number
  change24h: number
  percentChange: number
  marketCap?: number
  volume?: number
  chartData: { time: string; price: number }[]
}

export default function UltimateMarketsTerminal() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [selected, setSelected] = useState<Asset | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [orderBook, setOrderBook] = useState<{price: number, size: number, side: 'buy' | 'sell'}[]>([])
  const [isDepositOpen, setIsDepositOpen] = useState(false)

  // 1. DATA HARVESTING
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [cryptoRes, stockRes] = await Promise.all([
          fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&sparkline=true'),
          fetch('https://financialmodelingprep.com/api/v3/quote/AAPL,MSFT,GOOGL,TSLA,NVDA?apikey=demo')
        ])

        const crypto = await cryptoRes.json()
        const stocks = await stockRes.json()

        const cryptoAssets: Asset[] = Array.isArray(crypto) ? crypto.map((c: any) => ({
          symbol: c.symbol.toUpperCase(),
          name: c.name,
          type: 'crypto',
          price: c.current_price,
          change24h: c.price_change_24h,
          percentChange: c.price_change_percentage_24h,
          marketCap: c.market_cap,
          volume: c.total_volume,
          chartData: c.sparkline_in_7d?.price.map((p: number, i: number) => ({ time: i.toString(), price: p })) || []
        })) : []

        const stockAssets: Asset[] = Array.isArray(stocks) ? stocks.map((s: any) => ({
          symbol: s.symbol,
          name: s.name,
          type: 'stock',
          price: s.price,
          change24h: s.change,
          percentChange: s.changesPercentage,
          marketCap: s.marketCap,
          volume: s.volume,
          chartData: Array.from({length: 20}, (_, i) => ({ time: i.toString(), price: s.price * (1 + (Math.random() - 0.5) * 0.02) }))
        })) : []

        const combined = [...cryptoAssets, ...stockAssets]
        setAssets(combined)
        setSelected(combined[0])
      } catch (err) {
        console.error("Critical Fetch Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // 2. LIVE ENGINE (Price & Order Book Simulation)
  useEffect(() => {
    const timer = setInterval(() => {
      setAssets(prev => prev.map(a => ({
        ...a,
        price: +(a.price * (1 + (Math.random() - 0.5) * 0.0005)).toFixed(2)
      })))
      
      if (selected) {
        const newOrders = Array.from({length: 8}, (_, i) => ({
          price: selected.price + (Math.random() - 0.5) * 2,
          size: Math.random() * 2,
          side: Math.random() > 0.5 ? 'buy' : 'sell' as const
        })).sort((a, b) => b.price - a.price)
        setOrderBook(newOrders)
      }
    }, 1500)
    return () => clearInterval(timer)
  }, [selected])

  const filtered = assets.filter(a => 
    a.symbol.toLowerCase().includes(search.toLowerCase()) || 
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#0d0d0e]">
      <div className="flex flex-col items-center gap-4">
        <Zap className="w-12 h-12 text-sky-500 animate-pulse" />
        <p className="text-slate-400 font-bold uppercase tracking-tighter">Initializing Engine...</p>
      </div>
    </div>
  )

  return (
    <>
      {/* MOBILE RESTRICTION OVERLAY */}
      <div className="md:hidden fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 border border-slate-700 shadow-2xl">
          <Monitor className="text-sky-400 w-10 h-10" />
        </div>
        <h2 className="text-white text-2xl font-black tracking-tighter mb-4 uppercase">Desktop Only Terminal</h2>
        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[280px]">
          The Mubadala Markets Terminal requires high-resolution displays for technical analysis and execution. 
          Please switch to an <span className="text-sky-400">iPad</span> or <span className="text-sky-400">Desktop</span>.
        </p>
        <div className="mt-10 flex gap-4">
           <div className="flex flex-col items-center gap-2">
              <Smartphone className="text-rose-500 w-5 h-5 opacity-50" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Mobile</span>
           </div>
           <div className="w-12 h-[1px] bg-slate-800 self-center" />
           <div className="flex flex-col items-center gap-2">
              <Monitor className="text-emerald-500 w-5 h-5" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Terminal</span>
           </div>
        </div>
      </div>

      {/* MAIN TERMINAL: Hidden on Mobile via md:flex */}
      <div className="hidden md:flex min-h-screen bg-[#F8FAFC] text-slate-900 flex-col font-sans">
        
        {/* HEADER */}
        <header className="bg-[#0d0d0e] border-b border-slate-200 h-20 flex items-center justify-between px-10 sticky top-0 z-50">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/mubadala-logo.svg" alt="Mubadala" className="h-6 w-auto" />
              
            </Link>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
              <button className="text-sky-600 border-b-2 border-sky-600 py-7">Trade</button>
              <button className="hover:text-slate-800 transition py-7">Portfolio</button>
              <button className="hover:text-slate-800 transition py-7">Analytics</button>
              <button className="hover:text-slate-800 transition py-7">Institutional</button>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end mr-4">
              <span className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">Global Balance</span>
              <span className="text-lg font-black text-[#fafafa]">$0.00</span>
            </div>
            <Button onClick={() => setIsDepositOpen(true)} className="bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl px-6 h-12 shadow-xs shadow-sky-100">
              Deposit
            </Button>
          </div>
        </header>

        {/* SUB-NAV TICKER */}
        <div className="bg-white border-b border-slate-100 h-12 flex items-center gap-8 px-10 overflow-hidden">
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> LIVE UPDATES
          </div>
          <div className="flex gap-10 animate-infinite-scroll">
            {assets.map(a => (
              <div key={a.symbol} className="flex gap-2 items-center whitespace-nowrap">
                <span className="text-xs font-bold text-slate-400">{a.symbol}</span>
                <span className="text-xs font-black text-slate-800">${a.price}</span>
                <span className={`text-[10px] font-bold ${a.percentChange >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {a.percentChange >= 0 ? '+' : ''}{a.percentChange.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <main className="grid grid-cols-12 gap-0 flex-1 overflow-hidden">
          {/* ASSET SELECTOR */}
          <div className="col-span-3 border-r border-slate-200 bg-white flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-300" />
                <Input 
                  placeholder="Find Symbol..." 
                  className="bg-slate-50 border-none rounded-2xl pl-12 h-11 text-sm font-medium focus-visible:ring-1 focus-visible:ring-sky-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
              {filtered.map((asset) => (
                <div
                  key={asset.symbol}
                  onClick={() => setSelected(asset)}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${
                    selected?.symbol === asset.symbol ? 'bg-sky-50 border-l-4 border-sky-600' : 'hover:bg-slate-50 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      asset.type === 'crypto' ? 'bg-slate-900 text-white' : 'bg-sky-100 text-sky-600'
                    }`}>
                      {asset.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-sm leading-none mb-1">{asset.symbol}</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{asset.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-slate-800">${asset.price.toLocaleString()}</p>
                    <span className={`text-[10px] font-black ${asset.percentChange >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {asset.percentChange.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TRADING TERMINAL CENTER */}
          <div className="col-span-6 bg-slate-50 p-6 space-y-6 overflow-y-auto">
            <Card className="bg-white border-slate-200 rounded-[32px] overflow-hidden shadow-sm border-none">
              <div className="p-8 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-black text-slate-800">{selected?.symbol}/USD</h2>
                    <div className="px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {selected?.type}
                    </div>
                  </div>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    <Activity size={14} className="text-sky-500" /> Real-time Execution
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl font-bold text-xs">1H</Button>
                  <Button variant="outline" size="sm" className="rounded-xl font-bold text-xs border-sky-600 bg-sky-50 text-sky-600">4H</Button>
                  <Button variant="outline" size="sm" className="rounded-xl font-bold text-xs">1D</Button>
                </div>
              </div>

              <div className="h-[420px] px-4 pb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selected?.chartData}>
                    <defs>
                      <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontWeight: 'bold' }} />
                    <Area type="stepAfter" dataKey="price" stroke="#0284c7" strokeWidth={3} fill="url(#chartColor)" animationDuration={1000} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-white border-none p-6 rounded-[24px] shadow-sm">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Volume Distribution</h5>
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={Array.from({length: 12}, () => ({v: Math.random() * 100}))}>
                      <Bar dataKey="v" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card className="bg-white border-none p-6 rounded-[24px] shadow-sm text-center">
                 <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Mubadala API Uptime</h5>
                 <p className="text-3xl font-black text-emerald-500">99.99%</p>
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Institutional Grade Stable</span>
              </Card>
            </div>
          </div>

          {/* ORDER BOOK & EXECUTION RIGHT */}
          <div className="col-span-3 border-l border-slate-200 bg-white p-6 flex flex-col gap-6">
            <Tabs defaultValue="limit" className="w-full">
              <TabsList className="grid grid-cols-2 bg-slate-100 rounded-xl p-1 mb-6">
                <TabsTrigger value="limit" className="rounded-lg font-bold text-xs uppercase">Limit</TabsTrigger>
                <TabsTrigger value="market" className="rounded-lg font-bold text-xs uppercase">Market</TabsTrigger>
              </TabsList>
              <TabsContent value="limit" className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Price (USD)</label>
                   <Input value={selected?.price} readOnly className="h-12 rounded-xl bg-slate-50 border-none font-black text-lg" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Amount</label>
                   <Input placeholder="0.00" className="h-12 rounded-xl bg-slate-50 border-none font-black text-lg" />
                 </div>
                 <div className="flex gap-2 pt-2">
                   <Button className="flex-1 h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-lg">BUY</Button>
                   <Button className="flex-1 h-14 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-2xl shadow-lg">SELL</Button>
                 </div>
              </TabsContent>
            </Tabs>

            <Card className="bg-slate-900 rounded-[24px] p-5 text-white">
              <div className="flex items-center gap-3 mb-4">
                 <Wallet className="text-sky-400" size={18} />
                 <span className="text-xs font-bold uppercase tracking-widest">Equity Overview</span>
              </div>
              <p className="text-xs text-slate-400 mb-1">Total Assets</p>
              <p className="text-xl font-black mb-4">$0.00</p>
              <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 rounded-xl font-bold h-10 gap-2">
                 <ArrowLeftRight size={14}/> Swap Assets
              </Button>
            </Card>
          </div>
        </main>
        
        <DepositModal open={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
      </div>
    </>
  )
}