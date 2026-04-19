'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  LogOut,
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
  const [isLoading, setIsLoading] = useState(true)
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is admin from localStorage
        const storedUser = localStorage.getItem('user')
        if (!storedUser) {
          router.push('/signin')
          return
        }

        const user = JSON.parse(storedUser)
        if (user.role !== 'admin') {
          router.push('/dashboard')
          return
        }

        // Load users from localStorage
        const storedUsers = localStorage.getItem('all_users')
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/signin')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      // Validate form
      if (!formData.email || !formData.password || !formData.fullName || !formData.phoneNumber || !formData.country) {
        setError('All fields are required')
        return
      }

      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters')
        return
      }

      // Call API to create user
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          role: formData.role,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create user')
        return
      }

      // Add to local users list for display
      const newUser: User = {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.fullName,
        role: data.user.role,
        kycStatus: data.user.kycStatus,
        accountBalance: 0,
      }

      const updatedUsers = [...users, newUser]
      setUsers(updatedUsers)

      setSuccess(`User ${formData.fullName} created successfully!
Email: ${formData.email}
Password: ${formData.password}
Status: Ready to login`)

      // Reset form
      setFormData({
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
        country: '',
        role: 'investor',
      })

      setTimeout(() => {
        setShowCreateForm(false)
        setSuccess('')
      }, 4000)
    } catch (err) {
      setError('Failed to create user')
      console.error(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/signin')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/mubadala-logo.svg" alt="Mubadala" className="h-5 w-auto" />
              <span className="font-bold text-foreground hidden sm:inline">Admin</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
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
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border/40 py-4">
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
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage users and verify KYC submissions
            </p>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <Plus className="w-4 h-4" />
            Create User
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
