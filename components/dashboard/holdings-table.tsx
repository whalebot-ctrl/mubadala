'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface Holding {
  id: string
  symbol: string
  assetType: 'stock' | 'crypto'
  quantity: number
  currentPrice: number
  investedAmount: number
  currentValue: number
  gainLoss: number
  gainLossPercentage: number
}

export function HoldingsTable({ holdings }: { holdings: Holding[] }) {
  if (holdings.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
        <p className="text-slate-400">No holdings yet. Start investing to see your portfolio here.</p>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-700/50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Symbol</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Type</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">Quantity</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">Price</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">Invested</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">Current Value</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">Gain/Loss</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">%</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => {
              const isPositive = holding.gainLoss >= 0
              return (
                <tr key={holding.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-white">{holding.symbol}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      holding.assetType === 'crypto'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {holding.assetType === 'crypto' ? 'Crypto' : 'Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300 text-right">
                    {holding.quantity.toFixed(8)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300 text-right">
                    ${holding.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300 text-right">
                    ${holding.investedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300 text-right">
                    ${holding.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`px-6 py-4 text-sm text-right font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '+' : ''}{holding.gainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <div className="flex items-center justify-end gap-2">
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
                        {isPositive ? '+' : ''}{holding.gainLossPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
