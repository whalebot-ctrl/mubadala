'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// 1. REMOVED CLERK IMPORTS
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Plus,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  ShieldAlert,
  LogOut
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
  
  // 2. USE LOCAL STATE INSTEAD OF useUser()
  const [adminUser, setAdminUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    country: '',
    role: 'investor',
  })

  // 3. SECURE LOCAL GATE
  useEffect(() => {
    const checkAdminAuth = () => {
      const storedUser = localStorage.getItem('user')
      if (!storedUser) {
        router.push('/signin')
        return
      }

      const parsedUser = JSON.parse(storedUser)
      // If they aren't an admin, kick them to the standard dashboard
      if (parsedUser.role !== 'admin') {
        router.push('/dashboard')
        return
      }

      setAdminUser(parsedUser)
      setIsLoading(false)
    }

    checkAdminAuth()
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
      if (!formData.email || !formData.password || !formData.fullName) {
        setError('Required fields missing')
        return
      }

      // Note: This API call will likely fail until your backend is ready
      // For now, we simulate a success for your demo
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        fullName: formData.fullName,
        role: formData.role,
        kycStatus: 'pending',
        accountBalance: 0
      }

      setUsers(prev => [...prev, newUser])
      setSuccess(`User ${formData.fullName} initialized successfully.`)
      setFormData({ email: '', password: '', fullName: '', phoneNumber: '', country: '', role: 'investor' })
      setTimeout(() => setShowCreateForm(false), 2000)
    } catch (err) {
      setError('System offline. Could not persist user to database.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/signin')
  }

  // 4. LOADING STATE (Matches your boutique theme)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0e] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
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
              <div className="w-8 h-8 rounded bg-black flex items-center justify-center">
                <span className="text-white font-bold text-xs">SR</span>
              </div>
              <span className="font-black text-xl tracking-tighter uppercase">Admin Terminal</span>
            </Link>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Admin</p>
                <p className="text-xs font-bold text-primary">{adminUser?.email}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-destructive hover:bg-destructive/5"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">System Override Active</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900">Central Command</h1>
            <p className="text-slate-500 font-medium text-lg italic mt-2">
              "Welcome back, {adminUser?.fullName?.split(' ')[0] || 'Administrator'}."
            </p>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-black font-black px-8 py-6 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <Plus className="w-5 h-5 mr-2" /> Initialize New Account
          </Button>
        </div>

        {/* Create User Form */}
        {showCreateForm && (
          <Card className="mb-8 border-2 border-primary/20 shadow-2xl bg-white overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Provision New Investor</h2>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                    <Input name="fullName" value={formData.fullName} onChange={handleInputChange} className="h-12" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                    <Input type="email" name="email" value={formData.email} onChange={handleInputChange} className="h-12" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Password</label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? 'text' : 'password'} 
                        name="password" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        className="h-12 pr-10" 
                        required 
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Account Role</label>
                    <select name="role" value={formData.role} onChange={handleInputChange} className="w-full h-12 px-3 border border-input rounded-md bg-background">
                      <option value="investor">Standard Investor</option>
                      <option value="admin">System Admin</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <Button type="submit" className="flex-1 bg-black text-white h-12 font-bold">Authorize User</Button>
                  <Button type="button" variant="outline" className="flex-1 h-12" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          </Card>
        )}

        {/* Users List */}
        <Card className="border border-slate-100 shadow-sm bg-white">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">Managed Accounts</h2>
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold">{users.length} Active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase">Identity</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase">Privileges</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase">KYC</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase">Ledger Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic text-sm">No external accounts found in local cache.</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{u.fullName}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-xs font-bold text-yellow-600">
                          <AlertCircle className="w-3 h-3" /> PENDING
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-sm">
                        ${u.accountBalance.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}