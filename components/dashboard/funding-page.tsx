'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  LockKeyhole,
  ShieldCheck,
  Timer,
  Wallet,
} from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const fundingAssets = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'Bitcoin network',
    minimum: '0.0001 BTC',
    address: 'bc1qevuu73yk32v049ys7qptz2ls4v2khzq72xe433',
    color: '#F59E0B',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    network: 'Ethereum ERC-20',
    minimum: '10 USDT',
    address: '0x43a200ddA70b9469DCA959CEDCC6FD72A23F11F8',
    color: '#4E9F81',
  },
]

export default function FundingPage() {
  const [copied, setCopied] = useState('')

  const copyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
    setCopied(address)
    window.setTimeout(() => setCopied(''), 1800)
  }

  return (
    <div className="min-h-screen bg-[#F4F5EF] text-[#10251F]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10251F]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <BrandLogo inverse />
          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/dashboard" className="text-sm font-medium text-white/60 hover:text-white">Portfolio</Link>
            <Link href="/trade" className="text-sm font-medium text-white/60 hover:text-white">Trade</Link>
            <span className="relative flex h-[72px] items-center text-sm font-medium text-white">
              Funding
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#D5F26A]" />
            </span>
          </nav>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white md:hidden">
            <ArrowLeft className="size-4" /> Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
        <section className="flex flex-col gap-6 border-b border-[#10251F]/10 pb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium text-[#60736C]">
              <ShieldCheck className="size-3.5" /> Secure account funding
            </p>
            <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Add funds</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#60736C]">
              Transfer Bitcoin or USDT to your Sterling Ridge account using the correct network address below.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#10251F]/10 bg-white/60 px-4 py-2 text-xs text-[#60736C]">
            <span className="size-1.5 rounded-full bg-[#79A30E]" /> Funding systems operational
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <div className="space-y-4">
            {fundingAssets.map((asset) => (
              <Card key={asset.symbol} className="rounded-[28px] border border-[#10251F]/10 bg-white/75 p-6 shadow-none sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[#10251F] font-semibold text-[#D5F26A]">
                      {asset.symbol === 'BTC' ? '₿' : '₮'}
                    </div>
                    <div>
                      <h2 className="font-semibold">{asset.name}</h2>
                      <p className="mt-1 text-xs text-[#71827C]">{asset.network}</p>
                    </div>
                  </div>
                  <span className="w-fit rounded-full bg-[#EDF0E7] px-3 py-1.5 text-[11px] font-medium text-[#60736C]">
                    Minimum {asset.minimum}
                  </span>
                </div>
                <div className="mt-6">
                  <p className="mb-2 text-xs font-medium text-[#60736C]">Your deposit address</p>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#10251F]/10 bg-[#F4F5EF] p-2 pl-4">
                    <code className="min-w-0 flex-1 truncate text-xs text-[#31594B] sm:text-sm">{asset.address}</code>
                    <Button
                      onClick={() => copyAddress(asset.address)}
                      className="h-10 shrink-0 rounded-xl bg-[#10251F] px-4 text-white hover:bg-[#1B3B31]"
                    >
                      {copied === asset.address ? <Check className="size-4" /> : <Copy className="size-4" />}
                      <span className="hidden sm:inline">{copied === asset.address ? 'Copied' : 'Copy'}</span>
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-[#82918C]">
                  <LockKeyhole className="mt-0.5 size-3.5 shrink-0" />
                  Only send {asset.symbol} through the {asset.network}. Transfers through another network may be lost.
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-5">
            <Card className="rounded-[28px] border-0 bg-[#10251F] p-6 text-white shadow-none">
              <Wallet className="size-5 text-[#D5F26A]" />
              <h2 className="mt-5 text-2xl font-medium tracking-[-0.03em]">How funding works</h2>
              <div className="mt-7 space-y-6">
                {[
                  ['Choose an asset', 'Select BTC or USDT and use its exact network.'],
                  ['Send your transfer', 'Copy the address into your wallet or exchange.'],
                  ['Wait for confirmation', 'Your balance updates after network confirmation.'],
                ].map(([title, text], index) => (
                  <div key={title} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#D5F26A]/30 text-[11px] font-semibold text-[#D5F26A]">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{title}</h3>
                      <p className="mt-1 text-xs leading-5 text-white/45">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-[28px] border border-[#10251F]/10 bg-[#E9ECD9] p-6 shadow-none">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#527064]">
                <Timer className="size-4" /> Expected confirmation
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/55 p-4">
                  <p className="text-xs text-[#71827C]">Bitcoin</p>
                  <p className="mt-2 font-semibold">~20 min</p>
                </div>
                <div className="rounded-2xl bg-white/55 p-4">
                  <p className="text-xs text-[#71827C]">USDT</p>
                  <p className="mt-2 font-semibold">~3 min</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ['No deposit fee', 'Sterling Ridge does not charge for incoming transfers. Network fees still apply.'],
            ['Automatic credit', 'Confirmed transfers are matched and added to your available account balance.'],
            ['Need help?', 'Contact support before sending if you are unsure which network to choose.'],
          ].map(([title, text], index) => (
            <Card key={title} className="rounded-2xl border border-[#10251F]/10 bg-white/60 p-5 shadow-none">
              {index === 2 ? <ExternalLink className="size-4 text-[#527064]" /> : <CheckCircle2 className="size-4 text-[#64820F]" />}
              <h3 className="mt-5 text-sm font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#71827C]">{text}</p>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
