import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs' // 1. Import the provider
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Mubadala Investments - Global Investment Platform',
  description: 'Professional investment platform for stocks and cryptocurrencies. Managed by Mubadala Investment Company.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/mubadala-logo.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/mubadala-logo.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/mubadala-logo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/mubadala-logo.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3ECCC8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    /* 2. Wrap everything inside ClerkProvider */
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="bg-background">
        <body className="font-sans antialiased bg-background text-foreground">
          {children}
          
        </body>
      </html>
    </ClerkProvider>
  )
}