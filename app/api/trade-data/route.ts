import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const TIMEOUT = 8_000
const FUTURES_BASES = new Set(['BTC', 'ETH', 'SOL', 'BNB', 'XRP'])

async function getFutures() {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/derivatives/exchanges/binance_futures?include_tickers=all',
    { next: { revalidate: 30 }, signal: AbortSignal.timeout(TIMEOUT) },
  )
  if (!response.ok) throw new Error('Futures feed unavailable')
  const data = await response.json()

  return (data.tickers || [])
    .filter((ticker: Record<string, unknown>) =>
      ticker.contract_type === 'perpetual' && FUTURES_BASES.has(String(ticker.base)),
    )
    .sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
      Number(b.h24_volume) - Number(a.h24_volume),
    )
    .slice(0, 8)
    .map((ticker: Record<string, unknown>) => ({
      symbol: String(ticker.symbol),
      base: String(ticker.base),
      price: Number(ticker.last),
      change24h: Number(ticker.h24_percentage_change),
      fundingRate: Number(ticker.funding_rate),
      openInterest: Number(ticker.open_interest_usd),
      volume24h: Number(ticker.h24_volume),
      basis: Number(ticker.index_basis_percentage),
    }))
}

async function getOptions() {
  const response = await fetch(
    'https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency=BTC&kind=option',
    { cache: 'no-store', signal: AbortSignal.timeout(TIMEOUT) },
  )
  if (!response.ok) throw new Error('Options feed unavailable')
  const data = await response.json()

  return (data.result || [])
    .filter((option: Record<string, unknown>) => Number(option.mark_price) > 0)
    .sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
      Number(b.open_interest) - Number(a.open_interest),
    )
    .slice(0, 12)
    .map((option: Record<string, unknown>) => {
      const name = String(option.instrument_name)
      const parts = name.split('-')
      return {
        instrument: name,
        expiry: parts[1] || '—',
        strike: Number(parts[2]) || 0,
        side: parts[3] === 'C' ? 'Call' : 'Put',
        markPrice: Number(option.mark_price),
        markIv: Number(option.mark_iv),
        change24h: Number(option.price_change),
        openInterest: Number(option.open_interest),
        volumeUsd: Number(option.volume_usd),
        underlyingPrice: Number(option.underlying_price),
      }
    })
}

async function getAlpha() {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/search/trending',
    { next: { revalidate: 60 }, signal: AbortSignal.timeout(TIMEOUT) },
  )
  if (!response.ok) throw new Error('Trending feed unavailable')
  const data = await response.json()

  return (data.coins || []).slice(0, 10).map(({ item }: { item: Record<string, any> }) => ({
    id: String(item.id),
    name: String(item.name),
    symbol: String(item.symbol),
    rank: Number(item.market_cap_rank) || null,
    image: String(item.small || ''),
    price: Number(item.data?.price) || 0,
    change24h: Number(item.data?.price_change_percentage_24h?.usd) || 0,
    marketCap: String(item.data?.market_cap || '—'),
    volume: String(item.data?.total_volume || '—'),
  }))
}

export async function GET() {
  const [futuresResult, optionsResult, alphaResult] = await Promise.allSettled([
    getFutures(),
    getOptions(),
    getAlpha(),
  ])

  const futures = futuresResult.status === 'fulfilled' ? futuresResult.value : []
  const options = optionsResult.status === 'fulfilled' ? optionsResult.value : []
  const alpha = alphaResult.status === 'fulfilled' ? alphaResult.value : []

  return NextResponse.json(
    {
      futures,
      options,
      alpha,
      availability: {
        futures: futuresResult.status === 'fulfilled',
        options: optionsResult.status === 'fulfilled',
        alpha: alphaResult.status === 'fulfilled',
      },
      updatedAt: new Date().toISOString(),
      sources: {
        futures: 'Binance Futures via CoinGecko',
        options: 'Deribit',
        alpha: 'CoinGecko Trending',
      },
    },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  )
}
