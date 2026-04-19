'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Copy, CheckCircle, AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface DepositWalletAddress {
  cryptocurrency: 'BTC' | 'USDT'
  address: string
}

export function DepositModal({ wallets }: { wallets: DepositWalletAddress[] }) {
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'USDT'>('BTC')
  const [copied, setCopied] = useState(false)

  const wallet = wallets.find(w => w.cryptocurrency === selectedCrypto)

  const handleCopyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">Deposit</Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Deposit Funds</DialogTitle>
          <DialogDescription className="text-slate-400">
            Send cryptocurrency to your wallet address
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Cryptocurrency Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Select Cryptocurrency</label>
            <div className="flex gap-2">
              {(['BTC', 'USDT'] as const).map((crypto) => (
                <button
                  key={crypto}
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

          {/* Wallet Address Display */}
          {wallet ? (
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Your {selectedCrypto} Address</label>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between gap-2">
                  <code className="text-xs text-slate-300 break-all">{wallet.address}</code>
                  <button
                    onClick={handleCopyAddress}
                    className="flex-shrink-0 p-2 hover:bg-slate-600 rounded transition"
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-400">
                Wallet address not configured. Please contact support.
              </p>
            </div>
          )}

          {/* Minimum Deposit Info */}
          <Card className="bg-slate-700/30 border-slate-600 p-4">
            <h4 className="text-sm font-semibold text-white mb-2">Important Information</h4>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• Minimum deposit: {selectedCrypto === 'BTC' ? '0.0001 BTC' : '10 USDT'}</li>
              <li>• Confirmations required: {selectedCrypto === 'BTC' ? '3' : '6'}</li>
              <li>• Processing time: {selectedCrypto === 'BTC' ? '10-30 min' : '5-15 min'}</li>
              <li>• Double-check the address before sending</li>
            </ul>
          </Card>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              // Close dialog logic would be handled by Dialog component
            }}
          >
            I&apos;ve Sent the Funds
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
