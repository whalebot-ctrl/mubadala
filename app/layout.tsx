import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
// Removed ClerkProvider import
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Sterling Ridge — Digital Wealth',
    template: '%s | Sterling Ridge',
  },
  description: 'Modern investing across crypto, global equities, and intelligently managed portfolios.',
  icons: {
    icon: '/sterling-ridge-mark.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#10251f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // Removed <ClerkProvider> wrapper
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}