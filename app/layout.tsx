import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
// Removed ClerkProvider import
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SterlingRidge Investments & Company',
  description: 'Investment advisory and capital placement firm specializing in energy and infrastructure.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon.ico', // Ensure you have a favicon in /public or remove this
        media: '(prefers-color-scheme: light)',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0d0d0e', // Updated to match SterlingRidge dark theme
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