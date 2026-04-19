'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeCanvas } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface DepositModalProps {
  open: boolean
  onClose: () => void
}

export default function DepositModal({ open, onClose }: DepositModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [usdAmount, setUsdAmount] = useState('')
  const [btcAmount, setBtcAmount] = useState(0)
  const [btcRate, setBtcRate] = useState(0)
  const [isFetchingRate, setIsFetchingRate] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const WALLET_ADDRESS = 'bc1qevuu73yk32v049ys7qptz2ls4v2khzq72xe433'

  // Fetch BTC rate
  useEffect(() => {
    if (!open) return

    const fetchRate = async () => {
      try {
        setIsFetchingRate(true)
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        )
        const data = await res.json()
        setBtcRate(data.bitcoin.usd)
      } catch (err) {
        console.error(err)
      } finally {
        setIsFetchingRate(false)
      }
    }

    fetchRate()
  }, [open])

  // Convert USD → BTC
  useEffect(() => {
    if (usdAmount && btcRate) {
      setBtcAmount(parseFloat(usdAmount) / btcRate)
    }
  }, [usdAmount, btcRate])

  // Reset when closed
  useEffect(() => {
    if (!open) {
      setStep(1)
      setUsdAmount('')
      setBtcAmount(0)
      setCopied(false)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">
                {step === 1 ? 'Fund your account' : 'Send Bitcoin'}
              </h2>
              <button onClick={onClose}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <div className="mb-5">
                  <label className="text-sm text-muted-foreground">
                    Enter amount (USD)
                  </label>
                  <input
                    type="number"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(e.target.value)}
                    className="w-full mt-2 border rounded-xl px-4 py-3 text-lg"
                    placeholder="100.00"
                  />
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <p className="text-xs text-muted-foreground">
                    You’ll send
                  </p>
                  <p className="text-2xl font-bold">
                    {isFetchingRate
                      ? '...'
                      : btcAmount.toFixed(6)} BTC
                  </p>
                  <p className="text-xs text-muted-foreground">
                    1 BTC ≈ ${btcRate.toLocaleString()}
                  </p>
                </div>

                <Button
                  disabled={!usdAmount}
                  className="w-full h-12"
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
  <>
    {!hasSubmitted ? (
      <>
        <div className="flex justify-center mb-5">
          <QRCodeCanvas value={WALLET_ADDRESS} size={150} />
        </div>

        <div className="mb-4 text-center">
          <p className="text-lg font-bold">
            {btcAmount.toFixed(6)} BTC
          </p>
          <p className="text-sm text-muted-foreground">
            ≈ ${usdAmount}
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            readOnly
            value={WALLET_ADDRESS}
            className="w-full border rounded-lg px-3 py-2 text-xs"
          />
          <Button
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(WALLET_ADDRESS)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground mb-5 space-y-1">
          <p>• Send only BTC to this address</p>
          <p>• Funds reflect after confirmation</p>
          <p>• Rate updates in real-time</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setStep(1)}
          >
            Back
          </Button>
          <Button
            className="w-full"
            onClick={() => setHasSubmitted(true)}
          >
            I’ve Sent Payment
          </Button>
        </div>
      </>
    ) : (
      // ✅ SUCCESS STATE
      <div className="text-center py-10">
        <div className="mb-4 text-3xl">✅</div>
        <h3 className="text-lg font-semibold mb-2">
          Payment Submitted
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Your balance will be updated once the payment is received and confirmed on the blockchain.
        </p>

        <Button className="w-full" onClick={onClose}>
          Done
        </Button>
      </div>
    )}
  </>
)}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}