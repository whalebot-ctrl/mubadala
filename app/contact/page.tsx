'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-[#F4F5EF] text-[#10251F]">
      <header className="border-b border-[#10251F]/10">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <BrandLogo />
          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/features" className="text-sm font-medium text-[#60736C] hover:text-[#10251F]">
              Investments
            </Link>
            <Link href="/about" className="text-sm font-medium text-[#60736C] hover:text-[#10251F]">
              Our approach
            </Link>
          </nav>
          <Button asChild className="rounded-full bg-[#10251F] px-5 text-white hover:bg-[#1B3B31]">
            <Link href="/signup">Open an account <ArrowRight /></Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="border-b border-[#10251F]/10">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_.7fr] lg:px-8 lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71827C]">Contact us</p>
              <h1 className="mt-6 max-w-3xl text-5xl font-medium leading-[.98] tracking-[-0.055em] sm:text-7xl">
                Let&apos;s talk about
                <span className="block font-serif italic text-[#527064]">your next move.</span>
              </h1>
            </div>
            <div className="flex items-end">
              <p className="max-w-md text-lg leading-8 text-[#60736C]">
                Whether you have a portfolio question or need help getting started, our team is ready to help.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-px overflow-hidden rounded-[28px] border border-[#10251F]/10 bg-[#10251F]/10 md:grid-cols-3">
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'support@sterlingridge.com',
                href: 'mailto:support@sterlingridge.com',
              },
              {
                icon: Phone,
                label: 'Client support',
                value: '+1 (970) 889-8843',
                href: 'tel:+19708898843',
              },
              {
                icon: MapPin,
                label: 'Office',
                value: '600 Fifth Avenue, New York',
              },
            ].map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <Icon className="size-5 text-[#527064]" />
                  <p className="mt-8 text-xs font-medium text-[#71827C]">{label}</p>
                  <p className="mt-2 text-sm font-semibold">{value}</p>
                </>
              )

              return href ? (
                <a key={label} href={href} className="bg-[#F4F5EF] p-7 transition hover:bg-white">
                  {content}
                </a>
              ) : (
                <div key={label} className="bg-[#F4F5EF] p-7">
                  {content}
                </div>
              )
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8 lg:pb-32">
          <div className="grid overflow-hidden rounded-[36px] border border-[#10251F]/10 bg-white/70 lg:grid-cols-[.72fr_1.28fr]">
            <div className="flex flex-col justify-between bg-[#10251F] p-8 text-white sm:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D5F26A]">Send a message</p>
                <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.04em]">
                  Tell us how we can help.
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">
                  Share a little context and a member of our team will respond within one business day.
                </p>
              </div>
              <div className="mt-14 space-y-3 text-sm text-white/65">
                {['Crypto and funding support', 'Stocks and portfolio questions', 'Account and onboarding help'].map((item) => (
                  <p key={item} className="flex items-center gap-3">
                    <span className="size-1.5 rounded-full bg-[#D5F26A]" />
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-10">
              {isSubmitted ? (
                <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-[#D5F26A]">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold">Message received</h2>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#60736C]">
                    Thanks for getting in touch. A Sterling Ridge adviser will respond within one business day.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-7 rounded-full border-[#10251F]/15 bg-transparent"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name">
                      <Input
                        required
                        value={formData.name}
                        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                        placeholder="Your name"
                        className="h-12 rounded-xl border-[#10251F]/10 bg-[#F9FAF6]"
                      />
                    </Field>
                    <Field label="Email address">
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                        placeholder="you@example.com"
                        className="h-12 rounded-xl border-[#10251F]/10 bg-[#F9FAF6]"
                      />
                    </Field>
                  </div>
                  <Field label="What can we help with?">
                    <Input
                      required
                      value={formData.subject}
                      onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                      placeholder="Portfolio, funding, account access…"
                      className="h-12 rounded-xl border-[#10251F]/10 bg-[#F9FAF6]"
                    />
                  </Field>
                  <Field label="Message">
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                      placeholder="Tell us a little more"
                      className="w-full resize-none rounded-xl border border-[#10251F]/10 bg-[#F9FAF6] px-4 py-3 text-sm outline-none transition placeholder:text-[#91A09A] focus:border-[#527064] focus:ring-2 focus:ring-[#527064]/15"
                    />
                  </Field>
                  <Button type="submit" className="h-12 w-full rounded-full bg-[#10251F] text-white hover:bg-[#1B3B31]">
                    Send message <Send className="size-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0B1B16] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-8">
          <BrandLogo inverse />
          <p className="text-xs text-white/40">© 2026 Sterling Ridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#60736C]">{label}</span>
      {children}
    </label>
  )
}
