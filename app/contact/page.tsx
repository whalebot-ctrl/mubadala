'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Mail, Phone, MapPin, Send, Briefcase } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0e]/95 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <span className="text-black font-bold text-xl">SR</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-[#fafafa]">STERLINGRIDGE</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Firm Overview
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Connect with <span className="text-primary italic">Our Partners</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Inquire about M&A advisory, capital placement, or strategic infrastructure partnerships.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <Card className="border border-border/40 bg-card hover:border-primary/30 transition-all">
            <div className="p-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Firm Inquiries</h3>
              <p className="text-muted-foreground text-sm">advisory@sterlingridge.com</p>
            </div>
          </Card>

          <Card className="border border-border/40 bg-card hover:border-primary/30 transition-all">
            <div className="p-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">New York Office</h3>
              <p className="text-muted-foreground text-sm">+1 (212) 555-0198</p>
            </div>
          </Card>

          <Card className="border border-border/40 bg-card hover:border-primary/30 transition-all">
            <div className="p-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Headquarters</h3>
              <p className="text-muted-foreground text-sm">600 Fifth Ave, New York, NY 10020</p>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-border/40 shadow-2xl">
          {/* Form Context Sidebar */}
          <div className="md:col-span-2 bg-[#080809] p-8 md:p-12 text-[#fafafa]">
             <Briefcase className="w-10 h-10 text-primary mb-6" />
             <h2 className="text-2xl font-bold mb-4">Strategic Mandates</h2>
             <p className="text-muted-foreground text-sm leading-relaxed mb-6">
               Please provide details regarding your inquiry. Our partners review all strategic proposals within 24–48 hours.
             </p>
             <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-primary/80 uppercase tracking-widest font-bold">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    M&A Advisory
                </div>
                <div className="flex items-center gap-3 text-xs text-primary/80 uppercase tracking-widest font-bold">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    Capital Placement
                </div>
                <div className="flex items-center gap-3 text-xs text-primary/80 uppercase tracking-widest font-bold">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    Infrastructure Projects
                </div>
             </div>
          </div>

          {/* Actual Form */}
          <div className="md:col-span-3 bg-card p-8 md:p-12">
            {isSubmitted && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-primary font-medium text-sm">Message received. An advisor will be in touch shortly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="bg-background border-border/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@firm.com"
                    required
                    className="bg-background border-border/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Subject of Inquiry
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Energy Infrastructure Mandate"
                  required
                  className="bg-background border-border/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Briefly describe your requirements..."
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-border/40 rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-bold gap-2 py-6">
                <Send className="w-4 h-4" />
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 SterlingRidge Investments & Company. Private and Confidential.
            </p>
        </div>
      </footer>
    </div>
  )
}