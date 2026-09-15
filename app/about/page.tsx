import Link from 'next/link'
import { ArrowRight, Eye, Scale, ShieldCheck, Waypoints } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F5EF] text-[#10251F]">
      <header className="border-b border-[#10251F]/10">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <BrandLogo />
          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/features" className="text-sm font-medium text-[#60736C] hover:text-[#10251F]">Investments</Link>
            <Link href="/trade" className="text-sm font-medium text-[#60736C] hover:text-[#10251F]">Trade</Link>
          </nav>
          <Button asChild className="rounded-full bg-[#10251F] px-5 text-white hover:bg-[#1B3B31]">
            <Link href="/signup">Join Sterling Ridge <ArrowRight /></Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="overflow-hidden border-b border-[#10251F]/10">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71827C]">About Sterling Ridge</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-medium leading-[.98] tracking-[-0.055em] sm:text-7xl">
                Modern investing.
                <span className="block font-serif italic text-[#527064]">Human judgment.</span>
              </h1>
            </div>
            <div className="flex items-end">
              <p className="max-w-lg text-lg leading-8 text-[#60736C]">
                We make access to crypto, stocks, and managed strategies feel considered—not complicated.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-[36px] bg-[#D5F26A] p-8 sm:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#41520E]">Why we exist</p>
              <p className="mt-20 text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl">
                Wealth platforms tend to offer either too little context or far too much noise. We built Sterling Ridge for the space between.
              </p>
            </div>
            <div className="flex flex-col justify-center lg:px-12">
              <p className="text-sm leading-7 text-[#60736C]">
                Markets have changed. A thoughtful portfolio can now include digital assets alongside established companies and broad index exposure. But more choice only helps when it comes with structure.
              </p>
              <p className="mt-6 text-sm leading-7 text-[#60736C]">
                Sterling Ridge brings those markets into one clear view, using deliberate allocation and ongoing rebalancing to keep each portfolio connected to its purpose.
              </p>
              <div className="mt-10 border-l-2 border-[#D5F26A] pl-5">
                <p className="font-serif text-2xl italic text-[#31594B]">
                  “Clarity before complexity. Discipline before prediction.”
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#10251F]/10 bg-white/45">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="mb-12 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71827C]">Our principles</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em]">What guides every decision</h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[28px] border border-[#10251F]/10 bg-[#10251F]/10 md:grid-cols-4">
              {[
                { icon: Eye, title: 'Clarity', text: 'Plain language and a complete view of your investments.' },
                { icon: Scale, title: 'Balance', text: 'Risk distributed intentionally across markets and strategies.' },
                { icon: Waypoints, title: 'Adaptability', text: 'Allocations that can evolve as markets and goals change.' },
                { icon: ShieldCheck, title: 'Stewardship', text: 'Security and responsible decision-making from day one.' },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="bg-[#F4F5EF] p-7">
                  <Icon className="size-5 text-[#527064]" />
                  <h3 className="mt-10 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#60736C]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#10251F] text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D5F26A]">Your next step</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em]">Build a portfolio with direction.</h2>
            </div>
            <Button asChild className="h-12 shrink-0 rounded-full bg-[#D5F26A] px-7 text-[#10251F] hover:bg-[#E2FA8F]">
              <Link href="/signup">Get started <ArrowRight /></Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
