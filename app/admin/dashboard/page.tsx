'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// 1. Import Clerk hooks and components
import { useUser, UserButton } from '@clerk/nextjs' 
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Plus,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  Menu,
  Eye,
  EyeOff,
} from 'lucide-react'

interface User {
  id: string
  email: string
  fullName: string
  role: string
  kycStatus: string
  accountBalance: number
}

export default function AdminDashboard() {
  const router = useRouter()
  // 2. Get user data from Clerk
  const { isLoaded, isSignedIn, user } = useUser() 

  const [users, setUsers] = useState<User[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    country: '',
    role: 'investor',
  })

  // 3. Security Gate: Use Clerk instead of localStorage
  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push('/signin')
      } else if (user?.publicMetadata?.role !== 'admin') {
        // If logged in but NOT an admin, send them to the user dashboard
        router.push('/dashboard')
      }
    }
  }, [isLoaded, isSignedIn, user, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (!formData.email || !formData.password || !formData.fullName || !formData.phoneNumber || !formData.country) {
        setError('All fields are required')
        return
      }

      // Now that Clerk is active, this request will send the Clerk token automatically
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create user')
        return
      }

      // Logic to add to your list (Clerk will store them in its dashboard too)
      setUsers(prev => [...prev, data.user])
      setSuccess(`User created! View them in your Clerk Dashboard.`)
      setFormData({ email: '', password: '', fullName: '', phoneNumber: '', country: '', role: 'investor' })
      setTimeout(() => setShowCreateForm(false), 3000)
    } catch (err) {
      setError('Connection failed. Check your API route.')
    }
  }

  // 4. Loading State
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mb-4" />
          <p className="text-muted-foreground font-bold tracking-widest uppercase text-[10px]">Verifying Authority...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/mubadala-logo.svg" alt="Mubadala" className="h-6 w-auto" />
              <span className="font-black text-xl tracking-tighter uppercase">Admin Terminal</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              {/* 5. Replace manual logout with UserButton */}
              <div className="flex items-center gap-3 pr-4 border-r border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Access</p>
                <p className="text-xs font-bold text-sky-600">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
              <UserButton />
            </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-2">Central Command</h1>
            <p className="text-slate-500 font-medium text-lg italic">"Welcome back, {user?.firstName}."</p>
          </div>
          <Button
            className="bg-sky-600 hover:bg-sky-700 text-white font-black px-8 py-6 rounded-2xl shadow-lg shadow-sky-100 transition-all hover:scale-105 active:scale-95"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <Plus className="w-5 h-5 mr-2" /> Initialize New Account
          </Button>
        </div>

        {/* Create User Form */}
        {showCreateForm && (
          <Card className="mb-8 border-0 shadow-md bg-white">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Create New User</h2>

              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-600 font-mono whitespace-pre-wrap">{success}</div>
                </div>
              )}

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="bg-background border-border/40"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="bg-background border-border/40"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="bg-background border-border/40"
                      required
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Country
                    </label>
                    <Input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="United States"
                      className="bg-background border-border/40"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="bg-background border-border/40 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Minimum 8 characters</p>
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border/40 rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                    >
                      <option value="investor">Investor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    Create User
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        )}

        {/* Users List */}
        <Card className="border-0 shadow-md bg-white">
          <div className="p-6 border-b border-border/40">
            <h2 className="text-xl font-bold text-foreground">
              Users ({users.length})
            </h2>
          </div>

          {users.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">
                No users created yet. Create your first user to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">KYC Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{user.fullName}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          {user.kycStatus === 'approved' ? (
                            <>
                              <Check className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 font-medium">Approved</span>
                            </>
                          ) : user.kycStatus === 'rejected' ? (
                            <>
                              <X className="w-4 h-4 text-destructive" />
                              <span className="text-destructive font-medium">Rejected</span>
                            </>
                          ) : (
                            <span className="text-yellow-600 font-medium">Pending</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        ${user.accountBalance.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
