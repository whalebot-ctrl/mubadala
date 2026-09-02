'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Eye, EyeOff, AlertCircle, ArrowRight, User } from 'lucide-react'
import Link from 'next/link'

export function SigninForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // --- CLIENT DEMO CREDENTIALS ---
  const DEMO_USER = {
    // email: 'sahowe716@gmail.com',
    email: 'sommerwilliams90@gmail.com',
    password: 'Ilovefaithful1$',
    role: 'user', // Changed from admin to user
    name: 'SterlingRidge Client'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // 1. Check for Demo Bypass
    if (formData.email === DEMO_USER.email && formData.password === DEMO_USER.password) {
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ 
          email: DEMO_USER.email, 
          role: DEMO_USER.role,
          name: DEMO_USER.name 
        }))
        // Redirect to standard dashboard
        router.push('/dashboard') 
        setIsLoading(false)
      }, 800)
      return
    }

    // 2. Real Auth Attempt (Fallback)
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Invalid credentials or connection error.')
        return
      }

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
        // Send everyone to /dashboard unless specifically flagged as admin in DB
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Production API unavailable. Use demo credentials to access dashboard.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <Card className="border border-border/40 shadow-2xl bg-card overflow-hidden">
        <div className="h-1 w-full bg-primary" />
        
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
              Client Portal
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to manage your investment portfolio
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          {/* Client Login Hint */}
          {/* <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2 text-primary font-bold text-xs uppercase tracking-widest">
              <User className="w-3 h-3" />
              Client Access (Demo)
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground font-mono">
                <span className="text-muted-foreground">User:</span> {DEMO_USER.email}
              </p>
              <p className="text-xs text-foreground font-mono">
                <span className="text-muted-foreground">Pass:</span> {DEMO_USER.password}
              </p>
            </div>
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className="bg-background border-border/40 h-11"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-background border-border/40 h-11 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-12 rounded-lg group mt-2 shadow-lg shadow-primary/20"
            >
              {isLoading ? (
                <span className="inline-block animate-spin mr-2">⟳</span>
              ) : (
                <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              )}
              {isLoading ? 'Connecting...' : 'Secure Sign In'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/40 text-center">
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-bold text-primary hover:underline underline-offset-4"
              >
                Inquire for Access
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}