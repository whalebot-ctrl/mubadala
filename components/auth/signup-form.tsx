'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Headset,
  UserPlus
} from 'lucide-react'
import Link from 'next/link'

export default function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isComplete, setIsComplete] = useState(false) 
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    country: '',
    phoneNumber: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Basic Validation
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        setIsLoading(false)
        return
      }

      if (formData.password.length < 8) {
        setError('Security protocol requires at least 8 characters')
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Registration failed')
        setIsLoading(false)
        return
      }

      if (data.user) {
        localStorage.setItem('user', JSON.stringify({
          ...data.user,
          fullName: formData.fullName.trim(),
        }))
      }

      setIsComplete(true)
      setIsLoading(false)
    } catch (err) {
      setError('Connection interrupted. Please try again.')
      setIsLoading(false)
    }
  }

  // --- SUCCESS VIEW (Broker Contact Information) ---
  if (isComplete) {
    return (
      <div className="w-full max-w-xl">
        <Card className="overflow-hidden rounded-3xl border border-[#10251F]/10 bg-white/75 shadow-none">
          <div className="bg-[#10251F] p-8 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[#D5F26A]/10 flex items-center justify-center border border-[#D5F26A]/20">
              <CheckCircle className="w-8 h-8 text-[#D5F26A]" />
            </div>
          </div>
          <div className="p-8 text-center">
            <h1 className="text-2xl font-semibold text-[#10251F] mb-4 tracking-tight">Account created</h1>
            <p className="text-[#60736C] mb-8 leading-relaxed text-sm">
              Your profile is ready. All new accounts are reviewed before investing is enabled.
            </p>
            
            <div className="bg-[#EEF1E8] rounded-2xl p-6 mb-8 border border-[#10251F]/5 flex flex-col items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <Headset className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#71827C]">Next step</h2>
              <p className="text-[#10251F] font-semibold text-sm leading-tight">
                Contact your account adviser to verify your identity and complete onboarding.
              </p>
            </div>

            <Link href="/">
              <Button variant="outline" className="w-full h-12 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  // --- FORM VIEW ---
  return (
    <div className="w-full max-w-md">
      <Card className="rounded-3xl border border-[#10251F]/10 bg-white/75 shadow-none">
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Investor profile</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#10251F] tracking-tight mb-2">Create your account</h2>
            <p className="text-[#60736C] text-sm">Enter your details to begin the secure verification process.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/5 border border-destructive/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Legal Name */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#60736C]">Full name</label>
              <Input 
                name="fullName" 
                placeholder="name"
                value={formData.fullName}
                onChange={handleChange} 
                className="h-12 rounded-xl bg-[#F9FAF6] border-[#10251F]/10 focus:border-primary transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#60736C]">Email address</label>
              <Input 
                type="email" 
                name="email" 
                placeholder="email"
                value={formData.email}
                onChange={handleChange} 
                className="h-12 rounded-xl bg-[#F9FAF6] border-[#10251F]/10 focus:border-primary transition-all"
                required
              />
            </div>

            {/* Row: Phone and Country */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#60736C]">Phone</label>
                <Input 
                  name="phoneNumber" 
                  placeholder="number"
                  value={formData.phoneNumber}
                  onChange={handleChange} 
                  className="h-12 rounded-xl bg-[#F9FAF6] border-[#10251F]/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#60736C]">Country</label>
                <Input 
                  name="country" 
                  placeholder="country"
                  value={formData.country}
                  onChange={handleChange} 
                  className="h-12 rounded-xl bg-[#F9FAF6] border-[#10251F]/10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#60736C]">Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange} 
                  className="h-12 rounded-xl bg-[#F9FAF6] border-[#10251F]/10 pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#60736C]">Confirm password</label>
              <div className="relative">
                <Input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  name="confirmPassword" 
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange} 
                  className="h-12 rounded-xl bg-[#F9FAF6] border-[#10251F]/10 pr-10"
                  required
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#10251F] hover:bg-[#1B3B31] text-white font-semibold h-12 rounded-full group mt-6 shadow-none transition-all"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/20 border-t-white animate-spin rounded-full" />
              ) : (
                <div className="flex items-center">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Already have an account?{' '}
              <Link href="/signin" className="text-primary font-bold hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}