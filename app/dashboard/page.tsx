'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import DepositModal from '@/components/dashboard/DepositModal'
import {
  LogOut,
  TrendingUp,
  Plus,
  ArrowUpRight,
  DollarSign,
  Eye,
  EyeOff,
  Menu,
  X,
  ShieldCheck,
  ArrowDownRight,
  Bitcoin,
  CheckCircle2,
  Wallet
} from 'lucide-react'

// --- Interfaces ---
interface User {
  id: string
  email: string
  fullName: string
  role: string
  kycStatus: string
  accountBalance: number
}

interface Position {
  id: string
  asset: string
  ticker: string
  category: string
  allocatedUSD: number
  unrealizedReturnPct: number
  currentValueUSD: number
}

interface WithdrawalModalProps {
  open: boolean
  onClose: () => void
  maxBalance: number
  onSuccess: (amount: number) => void
}

// --- Pre-invested Portfolio Data (~$27,000 Total) ---
const INITIAL_POSITIONS: Position[] = [
  {
    id: 'pos-1',
    asset: 'Bitcoin',
    ticker: 'SR-BTC',
    category: 'Private Equity',
    allocatedUSD: 8500.00,
    unrealizedReturnPct: 18.4,
    currentValueUSD: 10064.00,
  },
  {
    id: 'pos-2',
    asset: 'Ethereum',
    ticker: 'SR-ETH',
    category: 'Digital Assets',
    allocatedUSD: 9000.00,
    unrealizedReturnPct: 12.2,
    currentValueUSD: 10098.00,
  },
  {
    id: 'pos-3',
    asset: 'USDT',
    ticker: 'SR-USDT',
    category: 'Hedge Strategy',
    allocatedUSD: 4000.00,
    unrealizedReturnPct: 8.5,
    currentValueUSD: 4340.00,
  },
  {
    id: 'pos-4',
    asset: 'Ripple',
    ticker: 'SR-XRP',
    category: 'Real Assets',
    allocatedUSD: 2300.00,
    unrealizedReturnPct: 8.6,
    currentValueUSD: 2498.00,
  },
]

// --- Withdrawal Modal Sub-Component ---
function WithdrawalModal({ open, onClose, maxBalance, onSuccess }: WithdrawalModalProps) {
  const [amountUSD, setAmountUSD] = useState<string>('')
  const [btcAddress, setBtcAddress] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // Approximate BTC conversion rate ($65,000 / BTC)
  const btcRate = 78000
  const numericAmount = parseFloat(amountUSD) || 0
  const btcValue = numericAmount > 0 ? (numericAmount / btcRate).toFixed(6) : '0.000000'

  if (!open) return null

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!amountUSD || numericAmount <= 0) {
      setError('Please enter a valid amount.')
      return
    }
    if (numericAmount > maxBalance) {
      setError(`Amount exceeds your settled cash balance of $${maxBalance.toLocaleString()}`)
      return
    }
    if (!btcAddress || btcAddress.trim().length < 26) {
      setError('Please enter a valid Bitcoin wallet address.')
      return
    }

    setIsSubmitted(true)
  }

  const handleClose = () => {
    setIsSubmitted(false)
    setAmountUSD('')
    setBtcAddress('')
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1d1d1e] border border-border/40 rounded-xl max-w-md w-full p-6 relative shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-primary hover:text-primary"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowDownRight className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#fafafa]">Request Withdrawal</h3>
                <p className="text-xs text-primary">Transfer settled funds to external BTC wallet</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded text-xs text-destructive font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
                  Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">$</span>
                  <input
                    type="number"
                    value={amountUSD}
                    onChange={(e) => setAmountUSD(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-muted/20 border border-border/40 rounded-lg py-2.5 pl-8 pr-4 text-primary text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[11px] text-primary">
                    Available: ${(maxBalance ?? 0).toLocaleString()}
                  </span>

                  <button
                    type="button"
                    onClick={() => setAmountUSD((maxBalance ?? 0).toString())}
                    className="text-[11px] text-primary font-bold hover:underline"
                  >
                    Use Max
                  </button>
                </div>
              </div>

              {/* Dynamic BTC Calculation Display */}
              <div className="p-3 bg-muted/10 border border-border/20 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bitcoin className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-primary">Est. BTC Equivalent:</span>
                </div>
                <span className="text-xs font-mono font-bold text-primary">{btcValue} BTC</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
                  Destination Bitcoin Wallet Address
                </label>
                <input
                  type="text"
                  value={btcAddress}
                  onChange={(e) => setBtcAddress(e.target.value)}
                  placeholder="bc1q..."
                  className="w-full bg-muted/20 border border-border/40 rounded-lg py-2.5 px-3 text-primary font-mono text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <Button type="submit" className="w-full bg-primary text-black font-bold hover:bg-primary/90 mt-2">
                Confirm Withdrawal
              </Button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-[#fafafa] mb-2">Withdrawal Initiated</h3>
            <p className="text-xs text-primary leading-relaxed mb-6">
              Your request for <span className="text-primary font-semibold">${numericAmount.toLocaleString()} ({btcValue} BTC)</span> has been logged. 
              The money will be deposited in your specified Bitcoin wallet within the next <span className="text-primary font-bold">24 hours</span>.
            </p>
            <div className="p-3 bg-muted/20 rounded-lg text-left text-xs font-mono text-primary mb-6 break-all">
              <span className="text-[10px] text-primary block font-sans">Destination:</span>
              {btcAddress}
            </div>
            <Button onClick={() => { onSuccess(numericAmount); handleClose(); }} className="w-full bg-primary text-background font-bold">
              Return to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// --- Main Dashboard Page ---
export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showBalance, setShowBalance] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [positions] = useState<Position[]>(INITIAL_POSITIONS)

  // Total Portfolio Value ($27,000 USD invested)
  const totalPortfolioValue = positions.reduce((acc, pos) => acc + pos.currentValueUSD, 0)

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user')

      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        const demoUser: User = {
          id: 'demo-investor-1',
          email: 'investor@sterlingridge.com',
          fullName: 'SterlingRidge Client',
          role: 'user',
          kycStatus: 'approved',
          accountBalance: 12450.00,
        }
        setUser(demoUser)
        localStorage.setItem('user', JSON.stringify(demoUser))
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/signin')
  }

  const handleSuccessfulWithdrawal = (withdrawnAmount: number) => {
    if (!user) return
    const updatedUser = {
      ...user,
      accountBalance: Math.max(0, user.accountBalance - withdrawnAmount)
    }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0e] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
          <p className="text-primary font-medium tracking-tight">Accessing Secure Vault...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 border-b border-border/40 bg-[#0d0d0e] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                <span className="text-black font-bold text-sm">SR</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-[#fafafa] uppercase">SterlingRidge</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard/markets" className="text-sm font-medium text-primary hover:text-[#fff] transition-colors">
                Markets
              </Link>
              <Link href="/dashboard/deposit" className="text-sm font-medium text-primary hover:text-[#fff] transition-colors">
                Guide
              </Link>
              <div className="h-4 w-[1px] bg-border/40 mx-2" />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-destructive hover:bg-destructive/10 font-bold"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>

            {/* Mobile Navigation Toggle */}
            <button className="md:hidden text-[#fafafa]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-[#0d0d0e] p-4 space-y-4">
            <Link href="/dashboard/markets" className="block text-primary px-2">Markets</Link>
            <Link href="/dashboard/deposit" className="block text-primary px-2">Guide</Link>
            <Button variant="ghost" className="w-full justify-start text-destructive p-2" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        )}
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header / Welcome Banner */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-primary mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Authenticated Session</span>
          </div>
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            Welcome, {user?.fullName?.split(' ')[0] || 'Sommer Williams'}
          </h1>
          <p className="text-primary mt-1">
            Monitoring your private capital, active placements, and cash positions.
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Settled Cash Balance */}
          <Card className="border border-border/40 bg-card shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Settled Cash</p>
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-bold text-primary tabular-nums">
                  {showBalance
                    ? `$${(user?.accountBalance ?? 17000).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                    : '••••••'}
                </h3>
                <button onClick={() => setShowBalance(!showBalance)} className="text-primary hover:text-primary">
                  {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-green-500 font-medium mt-2">Available for withdrawal or deployment</p>
            </div>
          </Card>

          {/* Active Invested Portfolio Value */}
          <Card className="border border-border/40 bg-card shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Invested Assets</p>
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-primary tabular-nums">
                ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
              <p className="text-xs text-green-500 font-medium mt-2">4 Active Private Placements</p>
            </div>
          </Card>

          {/* Period Yield Performance */}
          <Card className="border border-border/40 bg-card shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Unrealized Gain</p>
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-primary">+13.44%</h3>
              <p className="text-xs text-primary mt-2">Current fiscal period</p>
            </div>
          </Card>
        </div>

        {/* Strategic Actions Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Fund Account / Deposit Card */}
          <Card className="border-0 bg-[#0d0d0e] p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-[#fafafa] mb-2">Deploy Capital</h3>
              <p className="text-primary text-sm mb-6 max-w-[320px]">
                Initiate a secure Bitcoin transfer to fund your advisory account and participate in high-yield placements.
              </p>
              <Button onClick={() => setIsDepositOpen(true)} className="bg-primary hover:bg-primary/90 text-black font-bold px-8">
                <Plus className="w-4 h-4 mr-2" /> Deposit BTC
              </Button>
            </div>
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
          </Card>

          {/* Capital Withdrawal Card */}
          <Card className="border border-border/40 bg-card p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">Capital Off-Ramp</h3>
              <p className="text-primary text-sm mb-6">
                Request a settlement of available cash directly to your external Bitcoin wallet address.
              </p>
            </div>
            <Button
              onClick={() => setIsWithdrawOpen(true)}
              variant="outline"
              className="w-full border-primary/20 hover:border-primary/50 text-primary font-bold"
            >
              <Wallet className="w-4 h-4 mr-2 text-primary" /> Request BTC Withdrawal
            </Button>
          </Card>
        </div>

        {/* Invested Market Positions Table ($27,000 Portfolio Breakdown) */}
        <Card className="border border-border/40 bg-card overflow-hidden">
          <div className="p-6 border-b border-border/40 bg-muted/30 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-primary tracking-tight">Active Private Placements</h2>
              <p className="text-xs text-primary">Institutional allocations under active management</p>
            </div>
            <span className="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
              4 Positions Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40 text-[11px] font-bold text-primary uppercase tracking-wider bg-muted/10">
                  <th className="p-4 pl-6">Mandate / Asset</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Principal USD</th>
                  <th className="p-4">Gain / Loss</th>
                  <th className="p-4 text-right pr-6">Current Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 text-sm">
                {positions.map((pos) => (
                  <tr key={pos.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 pl-6 font-medium text-primary">
                      <div>{pos.asset}</div>
                      <span className="text-xs text-primary font-mono">{pos.ticker}</span>
                    </td>
                    <td className="p-4 text-xs text-primary">{pos.category}</td>
                    <td className="p-4 font-mono text-primary">
                      ${pos.allocatedUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 font-mono text-xs text-green-500 font-semibold">
                      +{pos.unrealizedReturnPct}%
                    </td>
                    <td className="p-4 text-right pr-6 font-mono font-bold text-primary">
                      ${pos.currentValueUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      {/* Deposit Modal */}
      <DepositModal open={isDepositOpen} onClose={() => setIsDepositOpen(false)} />

      {/* Withdrawal Modal */}
      <WithdrawalModal
  open={isWithdrawOpen}
  onClose={() => setIsWithdrawOpen(false)}
  maxBalance={user?.accountBalance ?? 0}
  onSuccess={handleSuccessfulWithdrawal}
/>
    </div>
  )
}