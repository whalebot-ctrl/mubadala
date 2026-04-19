'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react'

interface PortfolioData {
  totalBalance: number
  totalInvested: number
  totalGainLoss: number
  gainLossPercentage: number
}

export function PortfolioOverview({ data }: { data: PortfolioData }) {
  const isPositive = data.totalGainLoss >= 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Balance */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Total Balance</p>
            <p className="text-3xl font-bold text-white">
              ${data.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <DollarSign className="w-12 h-12 text-blue-400/30" />
        </div>
      </Card>

      {/* Total Invested */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Invested Amount</p>
            <p className="text-3xl font-bold text-white">
              ${data.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <Wallet className="w-12 h-12 text-green-400/30" />
        </div>
      </Card>

      {/* Total Gain/Loss */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Total Gain/Loss</p>
            <p className={`text-3xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{data.totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          {isPositive ? (
            <TrendingUp className="w-12 h-12 text-green-400/30" />
          ) : (
            <TrendingDown className="w-12 h-12 text-red-400/30" />
          )}
        </div>
      </Card>

      {/* Gain/Loss Percentage */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Return %</p>
            <p className={`text-3xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{data.gainLossPercentage.toFixed(2)}%
            </p>
          </div>
          {isPositive ? (
            <TrendingUp className="w-12 h-12 text-green-400/30" />
          ) : (
            <TrendingDown className="w-12 h-12 text-red-400/30" />
          )}
        </div>
      </Card>
    </div>
  )
}
