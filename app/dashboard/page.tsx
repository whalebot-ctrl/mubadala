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
  ArrowDownRight,
  DollarSign,
  Eye,
  EyeOff,
  Menu,
  X,
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
    // Check if user is authenticated by checking for session cookie
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', { credentials: 'include' })
        if (!response.ok) {
          router.push('/signin')
          return
        }

        // For now, retrieve user data from localStorage or create demo user
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          // Create a demo user if not found
          const demoUser: User = {
            id: '1',
            email: 'investor@example.com',
            fullName: 'John Investor',
            role: 'investor',
            kycStatus: 'approved',
            accountBalance: 0, // Always start at 0 for new users
          }
          setUser(demoUser)
          localStorage.setItem('user', JSON.stringify(demoUser))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        // Continue without auth check for demo
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      localStorage.removeItem('user')
      router.push('/signin')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-[#0d0d0e] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/mubadala-logo.svg" alt="Mubadala" className="h-6 w-auto" />
              
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/dashboard/markets">
                <Button variant="ghost" className='text-[#fafafa] hover:text-[#fff]' size="sm">Markets</Button>
              </Link>
              <Link href="/dashboard/deposit-guide">
                <Button variant="ghost" className='text-[#fafafa] hover:text-[#fff]' size="sm">Get Started</Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border/40 py-4 space-y-2">
              <Link href="/dashboard/markets" className="block">
                <Button variant="ghost" className="w-full justify-start">Markets</Button>
              </Link>
              <Link href="/dashboard/deposit" className="block">
                <Button variant="ghost" className="w-full justify-start">Get Started</Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {user.fullName}
          </h1>
          <p className="text-muted-foreground">
            Manage your investments and track your portfolio performance
          </p>
        </div>

        {/* Account Status */}
        {user.kycStatus !== 'approved' && (
          <Card className="mb-8 border-yellow-200/50 bg-yellow-50">
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2">KYC Verification Pending</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your account is under review. You'll be able to trade once your KYC is approved by our admin team.
              </p>
              <Button size="sm" variant="outline">Check Status</Button>
            </div>
          </Card>
        )}

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Balance */}
          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-bold text-foreground">
                      {showBalance ? `$${user.accountBalance.toFixed(2)}` : '••••••'}
                    </h3>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {showBalance ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Ready to start investing
              </p>
            </div>
          </Card>

          {/* Portfolio Value */}
          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Portfolio Value</p>
                  <h3 className="text-3xl font-bold text-foreground">
                    $0.00
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                No active investments
              </p>
            </div>
          </Card>

          {/* Returns */}
          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Returns (30D)</p>
                  <h3 className="text-3xl font-bold text-foreground">
                    $0.00
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ArrowDownRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                +0%
              </p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Deposit Card */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-lg transition-shadow">
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Start Investing</h3>
                  <p className="text-sm text-muted-foreground">
                    Fund account with Bitcoin (BTC) and explore our trading strategies.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
              </div>
              <Button onClick={() => setIsDepositOpen(true)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Deposit Now
              </Button>
            </div>
          </Card>

          {/* Learn More Card */}
          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">New to Trading?</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn how to deposit and manage your portfolio
                  </p>
                </div>
              </div>
              <Link href="/#">
                <Button
                  variant="outline"
                  className="w-full border-primary/20 text-foreground hover:bg-primary/5 font-semibold"
                >
                  View Guide
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Market Overview */}
        <Card className="border-0 shadow-md bg-white">
          <div className="p-6 border-b border-border/40">
            <h2 className="text-xl font-bold text-foreground">Market Overview</h2>
          </div>
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              No active investments yet. Deposit funds to start trading.
            </p>
            <Link href="/dashboard/markets">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Browse Markets
              </Button>
            </Link>
          </div>
        </Card>
      </main>
      <DepositModal
  open={isDepositOpen}
  onClose={() => setIsDepositOpen(false)}
/>
    </div>
  )
}
