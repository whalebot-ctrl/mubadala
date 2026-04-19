// CoinGecko API for cryptocurrency data (free, no auth required)
const COINGECKO_API = 'https://api.coingecko.com/api/v3'

// Alpha Vantage API for stock data (requires API key)
const ALPHA_VANTAGE_API = 'https://www.alphavantage.co/query'

export interface CryptoPrice {
  symbol: string
  price: number
  priceChange24h: number
  percentChange24h: number
  marketCap: number
  volume24h: number
}

export interface StockPrice {
  symbol: string
  price: number
  change: number
  percentChange: number
  high: number
  low: number
  volume: number
}

export interface ChartDataPoint {
  time: string
  price: number
}

/**
 * Fetch cryptocurrency price from CoinGecko
 */
export async function getCryptoPrice(symbol: string): Promise<CryptoPrice | null> {
  try {
    const coinId = symbol.toLowerCase() === 'btc' ? 'bitcoin' : 'ethereum'
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`,
      { next: { revalidate: 60 } } // Cache for 1 minute
    )

    if (!response.ok) throw new Error('Failed to fetch crypto price')

    const data = await response.json()
    const priceData = data[coinId]

    return {
      symbol,
      price: priceData.usd,
      priceChange24h: 0, // Not directly available from this endpoint
      percentChange24h: priceData.usd_24h_change,
      marketCap: priceData.usd_market_cap || 0,
      volume24h: priceData.usd_24h_vol || 0,
    }
  } catch (error) {
    console.error('Error fetching crypto price:', error)
    return null
  }
}

/**
 * Fetch multiple cryptocurrency prices
 */
export async function getCryptoPrices(symbols: string[]): Promise<CryptoPrice[]> {
  const prices = await Promise.all(symbols.map(symbol => getCryptoPrice(symbol)))
  return prices.filter((price): price is CryptoPrice => price !== null)
}

/**
 * Fetch stock price from Alpha Vantage (requires API key)
 */
export async function getStockPrice(symbol: string): Promise<StockPrice | null> {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY
    if (!apiKey) {
      console.warn('Alpha Vantage API key not configured')
      // Return mock data for demonstration
      return getMockStockPrice(symbol)
    }

    const response = await fetch(
      `${ALPHA_VANTAGE_API}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
      { next: { revalidate: 60 } }
    )

    if (!response.ok) throw new Error('Failed to fetch stock price')

    const data = await response.json()
    const quote = data['Global Quote']

    if (!quote || !quote['05. price']) {
      return getMockStockPrice(symbol)
    }

    return {
      symbol,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change'] || '0'),
      percentChange: parseFloat(quote['10. change percent']?.replace('%', '') || '0'),
      high: parseFloat(quote['03. high'] || '0'),
      low: parseFloat(quote['04. low'] || '0'),
      volume: parseInt(quote['06. volume'] || '0'),
    }
  } catch (error) {
    console.error('Error fetching stock price:', error)
    return getMockStockPrice(symbol)
  }
}

/**
 * Fetch cryptocurrency chart data (7 days)
 */
export async function getCryptoChartData(
  symbol: string,
  days: number = 7
): Promise<ChartDataPoint[]> {
  try {
    const coinId = symbol.toLowerCase() === 'btc' ? 'bitcoin' : 'ethereum'
    const response = await fetch(
      `${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    )

    if (!response.ok) throw new Error('Failed to fetch crypto chart data')

    const data = await response.json()
    const prices = data.prices as [number, number][]

    return prices.map(([timestamp, price]) => ({
      time: new Date(timestamp).toLocaleDateString(),
      price: Math.round(price * 100) / 100,
    }))
  } catch (error) {
    console.error('Error fetching crypto chart data:', error)
    return getMockChartData()
  }
}

/**
 * Fetch stock chart data (Alpha Vantage)
 */
export async function getStockChartData(
  symbol: string,
  timespan: 'daily' | 'weekly' | 'monthly' = 'daily'
): Promise<ChartDataPoint[]> {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY
    if (!apiKey) {
      return getMockChartData()
    }

    const functionName = timespan === 'daily' ? 'TIME_SERIES_DAILY' : 'TIME_SERIES_WEEKLY'
    const response = await fetch(
      `${ALPHA_VANTAGE_API}?function=${functionName}&symbol=${symbol}&apikey=${apiKey}`,
      { next: { revalidate: 300 } }
    )

    if (!response.ok) throw new Error('Failed to fetch stock chart data')

    const data = await response.json()
    const timeSeries = data[`Time Series (${timespan === 'daily' ? 'Daily' : 'Weekly'})`]

    if (!timeSeries) {
      return getMockChartData()
    }

    return Object.entries(timeSeries)
      .slice(0, 30) // Last 30 data points
      .map(([date, priceData]: [string, any]) => ({
        time: new Date(date).toLocaleDateString(),
        price: parseFloat(priceData['4. close']),
      }))
      .reverse()
  } catch (error) {
    console.error('Error fetching stock chart data:', error)
    return getMockChartData()
  }
}

/**
 * Mock data for demonstration/fallback
 */
function getMockStockPrice(symbol: string): StockPrice {
  const basePrice = Math.random() * 500 + 50
  return {
    symbol,
    price: Math.round(basePrice * 100) / 100,
    change: (Math.random() - 0.5) * 20,
    percentChange: (Math.random() - 0.5) * 5,
    high: Math.round((basePrice * 1.05) * 100) / 100,
    low: Math.round((basePrice * 0.95) * 100) / 100,
    volume: Math.floor(Math.random() * 50000000),
  }
}

function getMockChartData(): ChartDataPoint[] {
  const data: ChartDataPoint[] = []
  let price = 100

  for (let i = 30; i > 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    price += (Math.random() - 0.5) * 10
    data.push({
      time: date.toLocaleDateString(),
      price: Math.round(price * 100) / 100,
    })
  }

  return data
}
