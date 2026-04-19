'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, TrendingDown, Loader } from 'lucide-react'

interface MarketChartProps {
  symbol: string
  assetType: 'stock' | 'crypto'
  currentPrice: number
  priceChange?: number
  chartData: Array<{ time: string; price: number }>
}

export function MarketChart({
  symbol,
  assetType,
  currentPrice,
  priceChange = 0,
  chartData,
}: MarketChartProps) {
  const [timeframe, setTimeframe] = useState<'1W' | '1M' | '3M' | '1Y'>('1W')
  const [isLoading, setIsLoading] = useState(false)

  const isPositive = priceChange >= 0

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-white">{symbol}</h3>
            <span className={`text-xs px-2 py-1 rounded ${
              assetType === 'crypto'
                ? 'bg-purple-500/20 text-purple-300'
                : 'bg-blue-500/20 text-blue-300'
            }`}>
              {assetType === 'crypto' ? 'Crypto' : 'Stock'}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-white">
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>
                {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Timeframe Buttons */}
        <div className="flex gap-2">
          {(['1W', '1M', '3M', '1Y'] as const).map((tf) => (
            <Button
              key={tf}
              size="sm"
              variant={timeframe === tf ? 'default' : 'outline'}
              onClick={() => {
                setTimeframe(tf)
                setIsLoading(true)
                setTimeout(() => setIsLoading(false), 500)
              }}
              className={timeframe === tf
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'border-slate-600 text-slate-300 hover:text-white'
              }
              disabled={isLoading}
            >
              {isLoading && timeframe === tf ? (
                <Loader className="w-3 h-3 animate-spin" />
              ) : (
                tf
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="time"
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
