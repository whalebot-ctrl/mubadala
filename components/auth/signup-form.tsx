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

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Registration failed')
        setIsLoading(false)
        return
      }

      // Success: Toggle the Broker message view
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
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-white overflow-hidden">
          <div className="bg-[#0d0d0e] p-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Registration Initialized</h1>
            <p className="text-slate-500 mb-8 leading-relaxed text-sm">
              Your profile has been successfully created in our secure vault. To maintain our high-net-worth security standards, all new accounts require manual activation.
            </p>
            
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 flex flex-col items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <Headset className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Next Step Required</h2>
              <p className="text-slate-900 font-bold text-sm leading-tight">
                Please contact your assigned broker to verify your identity and complete the onboarding process.
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
      <Card className="border-0 shadow-2xl bg-white">
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Private Placement</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Join SterlingRidge</h1>
            <p className="text-muted-foreground text-sm">Initialize your secure investor profile to begin the verification process.</p>
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
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Full Legal Name</label>
              <Input 
                name="fullName" 
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange} 
                className="h-11 bg-slate-50/50 border-slate-100 focus:border-primary transition-all" 
                required 
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Email</label>
              <Input 
                type="email" 
                name="email" 
                placeholder="investor@sterlingridge.com"
                value={formData.email}
                onChange={handleChange} 
                className="h-11 bg-slate-50/50 border-slate-100 focus:border-primary transition-all" 
                required 
              />
            </div>

            {/* Row: Phone and Country */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</label>
                <Input 
                  name="phoneNumber" 
                  placeholder="+1..."
                  value={formData.phoneNumber}
                  onChange={handleChange} 
                  className="h-11 bg-slate-50/50 border-slate-100" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Country</label>
                <Input 
                  name="country" 
                  placeholder="United States"
                  value={formData.country}
                  onChange={handleChange} 
                  className="h-11 bg-slate-50/50 border-slate-100" 
                  required 
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange} 
                  className="h-11 bg-slate-50/50 border-slate-100 pr-10" 
                  required 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Security Key</label>
              <div className="relative">
                <Input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  name="confirmPassword" 
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange} 
                  className="h-11 bg-slate-50/50 border-slate-100 pr-10" 
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
              className="w-full bg-[#0d0d0e] hover:bg-black text-white font-bold h-12 rounded-xl group mt-6 shadow-xl shadow-slate-200 transition-all active:scale-95"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/20 border-t-white animate-spin rounded-full" />
              ) : (
                <div className="flex items-center">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Initialize Registration
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Already have an established portal?{' '}
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