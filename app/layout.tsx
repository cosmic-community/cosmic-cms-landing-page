import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import CookieConsent from '@/components/CookieConsent'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import PerformanceMonitor from '@/components/PerformanceMonitor'

export const metadata: Metadata = {
  title: 'Cosmic CMS - Build Content-Driven Apps at Lightning Speed',
  description: 'The modern headless CMS that helps developers build faster with a powerful API-first platform. Manage content with ease and deliver to any device.',
  keywords: 'headless cms, api-first cms, content management, cosmic cms, modern cms',
  openGraph: {
    title: 'Cosmic CMS - Build Content-Driven Apps at Lightning Speed',
    description: 'The modern headless CMS that helps developers build faster with a powerful API-first platform.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body>
        <GoogleAnalytics />
        <PerformanceMonitor />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
        <CookieConsent />
      </body>
    </html>
  )
}