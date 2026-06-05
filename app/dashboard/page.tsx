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
  ShieldCheck
} from 'lucide-react'

interface User {
  id: string
  email: string
  fullName: string
  role: string
  kycStatus: string
  accountBalance: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showBalance, setShowBalance] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDepositOpen, setIsDepositOpen] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      // Logic: Prioritize localStorage, fallback to a persistent demo user
      // No more fetch('/api/auth/me') to avoid 401 errors
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
          accountBalance: 12450.00, // Giving the demo some initial "flavour"
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0e] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
          <p className="text-muted-foreground font-medium tracking-tight">Accessing Secure Vault...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-[#0d0d0e] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                <span className="text-black font-bold text-sm">SR</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-[#fafafa] uppercase">SterlingRidge</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard/markets" className="text-sm font-medium text-muted-foreground hover:text-[#fff] transition-colors">
                Markets
              </Link>
              <Link href="/dashboard/deposit" className="text-sm font-medium text-muted-foreground hover:text-[#fff] transition-colors">
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

            {/* Mobile Menu Button */}
            <button className="md:hidden text-[#fafafa]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-[#0d0d0e] p-4 space-y-4">
            <Link href="/dashboard/markets" className="block text-muted-foreground px-2">Markets</Link>
            <Link href="/dashboard/deposit-guide" className="block text-muted-foreground px-2">Guide</Link>
            <Button variant="ghost" className="w-full justify-start text-destructive p-2" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-primary mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Authenticated Session</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Welcome, {user?.fullName?.split(' ')[0] || 'Investor'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitoring your private capital and market positions.
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Total Balance */}
          <Card className="border border-border/40 bg-card shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Settled Cash</p>
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-bold text-foreground tabular-nums">
                {showBalance 
                  ? `$${(user?.accountBalance ?? 0).toLocaleString(undefined, {minimumFractionDigits: 2})}` 
                  : '••••••'}
              </h3>
                <button onClick={() => setShowBalance(!showBalance)} className="text-muted-foreground hover:text-foreground">
                  {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-green-500 font-medium mt-2">Available for deployment</p>
            </div>
          </Card>

          {/* Portfolio Value */}
          <Card className="border border-border/40 bg-card shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Portfolio Value</p>
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-foreground">$0.00</h3>
              <p className="text-xs text-muted-foreground mt-2">No active mandates</p>
            </div>
          </Card>

          {/* Performance */}
          <Card className="border border-border/40 bg-card shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Net Return</p>
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-foreground">0.00%</h3>
              <p className="text-xs text-muted-foreground mt-2">Current fiscal period</p>
            </div>
          </Card>
        </div>

        {/* Action Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <Card className="border-0 bg-[#0d0d0e] p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-[#fafafa] mb-2">Deploy Capital</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-[280px]">
                Initiate a secure Bitcoin transfer to fund your advisory account and access private placements.
              </p>
              <Button onClick={() => setIsDepositOpen(true)} className="bg-primary hover:bg-primary/90 text-black font-bold px-8">
                <Plus className="w-4 h-4 mr-2" /> Deposit BTC
              </Button>
            </div>
            {/* Subtle background decoration */}
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
          </Card>

          <Card className="border border-border/40 bg-card p-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Platform Guide</h3>
            <p className="text-muted-foreground text-sm mb-6">
              New to SterlingRidge? Review our execution protocols and capital management strategy.
            </p>
            <Link href="/dashboard/deposit">
              <Button variant="outline" className="w-full border-primary/20 hover:shadow-lg font-bold">
                View Onboarding Guide
              </Button>
            </Link>
          </Card>
        </div>

        {/* Market Positions */}
        <Card className="border border-border/40 bg-card overflow-hidden">
          <div className="p-6 border-b border-border/40 bg-muted/30">
            <h2 className="text-lg font-bold text-foreground tracking-tight">Active Market Positions</h2>
          </div>
          <div className="p-16 text-center">
            <div className="max-w-xs mx-auto">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-border/60 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-muted-foreground/40" />
              </div>
              <p className="text-muted-foreground text-sm mb-6 italic">
                Your portfolio is currently in cash. Explore markets to initiate your first position.
              </p>
              <Link href="/dashboard/markets">
                <Button className="bg-foreground text-background hover:bg-foreground/90 font-bold px-6">
                  Browse Institutional Markets
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </main>

      <DepositModal open={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
    </div>
  )
}