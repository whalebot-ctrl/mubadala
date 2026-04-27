'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Copy,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Activity,
  History,
  Lock
} from 'lucide-react'
import { useState } from 'react'

export default function CleanInstitutionalDeposit() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const btcAddress = 'bc1qevuu73yk32v049ys7qptz2ls4v2khzq72xe433'
  const usdtAddress = '0x43a200ddA70b9469DCA959CEDCC6FD72A23F11F8'

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAddress(text)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* HEADER */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-[#0d0d0e] backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                <span className="text-black font-bold text-sm">SR</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-[#fafafa] uppercase">SterlingRidge</span>
            </Link>
            <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <span className="text-sky-600 border-b-2 border-sky-600 py-7">Funding</span>
              <span className="hover:text-slate-900 transition-colors cursor-pointer py-7">Markets</span>
              <span className="hover:text-slate-900 transition-colors cursor-pointer py-7">Portfolio</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tight">System Live</span>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-8 py-12">
        {/* TOP HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-2">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 text-xs font-bold uppercase tracking-widest transition-all mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Terminal
            </Link>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Deposit Funds</h1>
            <p className="text-slate-500 text-lg font-medium">Transfer assets to your institutional cold-storage wallet.</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <Button variant="ghost" className="text-slate-600 font-bold text-xs uppercase tracking-widest px-6 h-12 hover:bg-white hover:text-[#000] hover:shadow-sm rounded-xl transition-all">
              <History className="w-4 h-4 mr-2" /> History
            </Button>
            <Button className="bg-sky-600 hover:bg-sky-700 text-white font-black text-xs uppercase tracking-widest px-8 h-12 rounded-xl shadow-lg shadow-sky-100">
              Support
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ASSET SELECTION */}
          <div className="lg:col-span-7 space-y-8">
            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 rounded-[32px] overflow-hidden bg-white">
              <div className="p-10">
                <div className="flex items-center gap-3 mb-10">
                  <Activity className="text-sky-600 w-5 h-5" />
                  <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em]">Network Gateways</h2>
                </div>

                <div className="space-y-12">
                  {/* BTC */}
                  <div className="group">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 font-bold text-2xl shadow-sm">
                          ₿
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-900">Bitcoin (BTC)</h3>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Native Blockchain</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 text-[10px] font-black text-slate-400 uppercase">
                        Min: 0.0001
                      </div>
                    </div>
                    
                    <div className="relative group/address">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
                        <Lock className="w-4 h-4 text-slate-300" />
                      </div>
                      <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center gap-3 p-1.5 pl-14 transition-all group-hover/address:border-sky-100 group-hover/address:bg-sky-50/30">
                        <code className="flex-1 text-sm font-mono text-slate-600 font-bold tracking-tight py-4">
                          {btcAddress}
                        </code>
                        <Button 
                          onClick={() => copyToClipboard(btcAddress)}
                          className="bg-white hover:bg-sky-600 text-sky-600 hover:text-white border border-slate-200 shadow-sm font-bold h-12 px-6 rounded-xl transition-all"
                        >
                          {copiedAddress === btcAddress ? <CheckCircle className="w-4 h-4" /> : "Copy"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* USDT */}
                  <div className="group">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 font-bold text-2xl shadow-sm">
                          ₮
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-900">Tether (USDT)</h3>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Ethereum ERC-20</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 text-[10px] font-black text-slate-400 uppercase">
                        Min: 10.00
                      </div>
                    </div>
                    
                    <div className="relative group/address">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
                        <Lock className="w-4 h-4 text-slate-300" />
                      </div>
                      <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center gap-3 p-1.5 pl-14 transition-all group-hover/address:border-sky-100 group-hover/address:bg-sky-50/30">
                        <code className="flex-1 text-sm font-mono text-slate-600 font-bold tracking-tight py-4">
                          {usdtAddress}
                        </code>
                        <Button 
                          onClick={() => copyToClipboard(usdtAddress)}
                          className="bg-white hover:bg-sky-600 text-sky-600 hover:text-white border border-slate-200 shadow-sm font-bold h-12 px-6 rounded-xl transition-all"
                        >
                          {copiedAddress === usdtAddress ? <CheckCircle className="w-4 h-4" /> : "Copy"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-sky-50 border-l-4 border-sky-600 rounded-2xl p-8 flex gap-6 items-start shadow-sm">
               <Zap className="w-6 h-6 text-sky-600 shrink-0" />
               <div className="text-sm">
                  <p className="font-black text-sky-900 mb-2 uppercase tracking-widest text-xs">Automated Reconciliation</p>
                  <p className="text-sky-800/70 font-medium leading-relaxed">Our liquidity engine monitors 14,000+ nodes. Your margin account will be updated automatically upon block finality. Do not refresh this page during active transfers.</p>
               </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="border-slate-100 p-10 rounded-[32px] bg-white shadow-lg shadow-slate-100/30">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mb-10">Process Flow</h2>
              <div className="space-y-10 relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-50" />
                {[
                  { title: "Select Gateway", desc: "Choose your preferred asset and network." },
                  { title: "Initiate Transfer", desc: "Send from any institutional exchange or private key." },
                  { title: "Network Audit", desc: "Automatic verification by the SterlingRidge node cluster." },
                  { title: "Asset Credit", desc: "Balance reflects in your terminal immediately." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-sky-600 flex items-center justify-center text-[11px] font-black text-sky-600 shrink-0 shadow-md">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 mb-1">{step.title}</h4>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-rose-50 border border-rose-100 p-8 rounded-[32px]">
               <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-5 h-5 text-rose-600" />
                  <h3 className="text-xs font-black text-rose-600 uppercase tracking-widest">Safety Protocol</h3>
               </div>
               <ul className="space-y-4">
                  {[
                    "Cross-chain transfers are non-recoverable",
                    "Only send ERC-20 USDT to the Ethereum gateway",
                    "Verify the destination address character by character"
                  ].map((text, i) => (
                    <li key={i} className="flex gap-3 text-[11px] font-bold text-rose-900/60 uppercase leading-tight">
                      <span className="text-rose-400">•</span> {text}
                    </li>
                  ))}
               </ul>
            </Card>
          </div>
        </div>

        {/* FAQ GRID */}
        <div className="mt-24 pt-24 border-t border-slate-100">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-16 text-center">Help Center</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { q: "What is the confirmation time?", a: "Bitcoin requires 2 confirmations (~20m), while USDT requires 12 confirmations on Ethereum (~3m)." },
              { q: "Are there deposit fees?", a: "SterlingRidge charges 0% for incoming transfers. You only pay the standard blockchain network fee." },
              { q: "Is KYC required for funding?", a: "Yes, Tier 2 verification is mandatory for all inbound and outbound capital movements." },
              { q: "Can I use Smart Contracts?", a: "We support direct transfers from all major EVM smart contract wallets and multi-sigs." }
            ].map((faq, i) => (
              <div key={i} className="group p-8 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <h4 className="text-lg font-black text-slate-900 mb-3 flex items-center justify-between">
                  {faq.q} <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition-colors" />
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="mt-24 p-16 rounded-[48px] bg-slate-900 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/10 blur-[100px] rounded-full -mr-48 -mt-48" />
          <h3 className="text-4xl font-black text-white tracking-tighter mb-6 relative z-10">Start Investing Today</h3>
          <p className="text-slate-400 mb-10 max-w-md mx-auto font-medium relative z-10 text-lg">Your capital is secured by military-grade multi-sig custody and insurance.</p>
          <div className="flex gap-4 justify-center relative z-10">
            <Link href="/dashboard">
              <Button className="bg-sky-600 hover:bg-sky-500 text-white font-black h-14 px-12 rounded-2xl shadow-xl shadow-sky-900/40 transition-transform hover:scale-105 active:scale-95">
                Go to Terminal
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-20 text-center border-t border-slate-100 mt-20">
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">SterlingRidge Investment Group</p>
      </footer>
    </div>
  )
}