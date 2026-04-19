'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface WithdrawalBalance {
  crypto: 'BTC' | 'USDT'
  available: number
}

export function WithdrawalModal({ balances }: { balances: WithdrawalBalance[] }) {
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'USDT'>('BTC')
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const selectedBalance = balances.find(b => b.crypto === selectedCrypto)
  const availableAmount = selectedBalance?.available || 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!amount || !address) {
      setError('Please fill in all fields')
      return
    }

    const withdrawAmount = parseFloat(amount)
    if (withdrawAmount > availableAmount) {
      setError('Insufficient balance')
      return
    }

    setIsSubmitting(true)
    // API call would go here
    setTimeout(() => {
      setSuccess(true)
      setIsSubmitting(false)
      setTimeout(() => {
        setAmount('')
        setAddress('')
        setSuccess(false)
      }, 2000)
    }, 1000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Withdraw Funds</DialogTitle>
          <DialogDescription className="text-slate-400">
            Withdraw your cryptocurrency (24-hour processing)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {success && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-green-400 text-sm">Withdrawal request submitted successfully!</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Cryptocurrency Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Select Cryptocurrency</label>
            <div className="flex gap-2">
              {(['BTC', 'USDT'] as const).map((crypto) => (
                <button
                  key={crypto}
                  type="button"
                  onClick={() => setSelectedCrypto(crypto)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                    selectedCrypto === crypto
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {crypto}
                </button>
              ))}
            </div>
          </div>

          {/* Available Balance */}
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Available Balance</p>
            <p className="text-lg font-semibold text-white">
              {availableAmount.toFixed(8)} {selectedCrypto}
            </p>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">Amount</label>
            <Input
              type="number"
              step="0.00000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
            />
          </div>

          {/* Withdrawal Address */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">Withdrawal Address</label>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={`Enter ${selectedCrypto} address`}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 text-sm"
            />
            <p className="text-xs text-slate-400 mt-1">Funds will be sent to this address</p>
          </div>

          {/* Warning */}
          <Card className="bg-yellow-500/10 border-yellow-500/30 p-3">
            <div className="flex gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-yellow-400">
                <p className="font-medium mb-1">24-Hour Processing</p>
                <p>Withdrawals are processed within 24 hours. Please ensure the address is correct.</p>
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            disabled={isSubmitting || !amount || !address}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting ? 'Processing...' : 'Request Withdrawal'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
