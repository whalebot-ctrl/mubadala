import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

type MarketAsset = {
  symbol: string
  name: string
  type: 'crypto' | 'stock'
  segment: 'Crypto' | 'Stock' | 'ETF' | 'Recent IPO'
  price: number
  change: number
  percentChange: number
  marketCap: number | null
  volume: number | null
  chartData: { time: number; price: number }[]
}

const stocks = [
  { symbol: 'AAPL', name: 'Apple', segment: 'Stock' },
  { symbol: 'MSFT', name: 'Microsoft', segment: 'Stock' },
  { symbol: 'NVDA', name: 'NVIDIA', segment: 'Stock' },
  { symbol: 'AMZN', name: 'Amazon', segment: 'Stock' },
  { symbol: 'GOOGL', name: 'Alphabet', segment: 'Stock' },
  { symbol: 'META', name: 'Meta Platforms', segment: 'Stock' },
  { symbol: 'TSLA', name: 'Tesla', segment: 'Stock' },
  { symbol: 'AVGO', name: 'Broadcom', segment: 'Stock' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', segment: 'Stock' },
  { symbol: 'NFLX', name: 'Netflix', segment: 'Stock' },
  { symbol: 'JPM', name: 'JPMorgan Chase', segment: 'Stock' },
  { symbol: 'V', name: 'Visa', segment: 'Stock' },
  { symbol: 'PLTR', name: 'Palantir', segment: 'Stock' },
  { symbol: 'COIN', name: 'Coinbase', segment: 'Stock' },
  { symbol: 'HOOD', name: 'Robinhood', segment: 'Stock' },
  { symbol: 'UBER', name: 'Uber', segment: 'Stock' },
  { symbol: 'SPY', name: 'S&P 500 ETF', segment: 'ETF' },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', segment: 'ETF' },
  { symbol: 'RDDT', name: 'Reddit', segment: 'Recent IPO' },
  { symbol: 'ARM', name: 'Arm Holdings', segment: 'Recent IPO' },
  { symbol: 'CAVA', name: 'Cava Group', segment: 'Recent IPO' },
  { symbol: 'CART', name: 'Instacart', segment: 'Recent IPO' },
  { symbol: 'RBRK', name: 'Rubrik', segment: 'Recent IPO' },
  { symbol: 'ALAB', name: 'Astera Labs', segment: 'Recent IPO' },
  { symbol: 'VIK', name: 'Viking Holdings', segment: 'Recent IPO' },
  { symbol: 'CRCL', name: 'Circle Internet Group', segment: 'Recent IPO' },
  { symbol: 'CRWV', name: 'CoreWeave', segment: 'Recent IPO' },
] as const

const REQUEST_TIMEOUT_MS = 7_000

async function getCrypto(): Promise<MarketAsset[]> {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,binancecoin,ripple,dogecoin,cardano,avalanche-2,chainlink,polkadot,tron,shiba-inu,litecoin,bitcoin-cash,uniswap,stellar,sui,hedera-hashgraph,near,aptos,pepe,arbitrum,optimism,internet-computer,cosmos,the-open-network,render-token,aave,injective-protocol,ondo-finance,zcash&order=market_cap_desc&sparkline=true&price_change_percentage=24h',
    {
      next: { revalidate: 30 },
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  )

  if (!response.ok) throw new Error(`CoinGecko responded with ${response.status}`)
  const data = await response.json()

  return data.map((coin: Record<string, unknown>) => ({
    symbol: String(coin.symbol).toUpperCase(),
    name: String(coin.name),
    type: 'crypto' as const,
    segment: 'Crypto' as const,
    price: Number(coin.current_price),
    change: Number(coin.price_change_24h),
    percentChange: Number(coin.price_change_percentage_24h),
    marketCap: Number(coin.market_cap) || null,
    volume: Number(coin.total_volume) || null,
    chartData: ((coin.sparkline_in_7d as { price?: number[] })?.price || []).map(
      (price, index) => ({ time: Date.now() - (167 - index) * 60 * 60 * 1000, price }),
    ),
  }))
}

async function getStock(stock: (typeof stocks)[number]): Promise<MarketAsset | null> {
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${stock.symbol}?range=5d&interval=1h&includePrePost=false`,
    {
      next: { revalidate: 30 },
      headers: { 'User-Agent': 'Mozilla/5.0', accept: 'application/json' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  )

  if (!response.ok) return null
  const result = (await response.json())?.chart?.result?.[0]
  if (!result) return null

  const meta = result.meta
  const timestamps: number[] = result.timestamp || []
  const closes: Array<number | null> = result.indicators?.quote?.[0]?.close || []
  const chartData = timestamps.flatMap((time, index) =>
    closes[index] == null ? [] : [{ time: time * 1000, price: closes[index] as number }],
  )
  const price = Number(meta.regularMarketPrice)
  const previousClose = Number(meta.chartPreviousClose || meta.previousClose)

  return {
    symbol: stock.symbol,
    name: stock.name,
    type: 'stock',
    segment: stock.segment,
    price,
    change: price - previousClose,
    percentChange: previousClose ? ((price - previousClose) / previousClose) * 100 : 0,
    marketCap: null,
    volume: Number(meta.regularMarketVolume) || null,
    chartData,
  }
}

export async function GET() {
  const [cryptoResult, equitiesResult] = await Promise.allSettled([
    getCrypto(),
    Promise.allSettled(stocks.map(getStock)),
  ])

  const crypto = cryptoResult.status === 'fulfilled' ? cryptoResult.value : []
  const equities = equitiesResult.status === 'fulfilled'
    ? equitiesResult.value.flatMap((result) =>
        result.status === 'fulfilled' && result.value ? [result.value] : [],
      )
    : []
  const assets = [...crypto, ...equities]

  if (!assets.length) {
    return NextResponse.json(
      { error: 'Live market data is temporarily unavailable.' },
      { status: 503 },
    )
  }

  return NextResponse.json(
    { assets, updatedAt: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  )
}
