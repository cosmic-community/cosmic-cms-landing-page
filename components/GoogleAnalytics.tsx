'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if user has consented to analytics
    const consent = localStorage.getItem('cookie-consent')
    if (consent !== 'accepted') return

    // Load GA4 script
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (!gaId) return

    // Initialize gtag
    if (!window.gtag) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer?.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', gaId, {
        page_path: pathname,
        send_page_view: true,
      })
    }
  }, [])

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (consent !== 'accepted' || !window.gtag) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    // Track page view
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: document.title,
    })
  }, [pathname, searchParams])

  return null
}