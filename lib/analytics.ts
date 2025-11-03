// Track custom events
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window === 'undefined') return
  
  const consent = localStorage.getItem('cookie-consent')
  if (consent !== 'accepted') return
  
  if (window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

// Track CTA clicks
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  })
}

// Track newsletter signup
export function trackNewsletterSignup(email: string) {
  trackEvent('newsletter_signup', {
    method: 'email',
  })
}

// Track blog post view
export function trackBlogPostView(postId: string, postTitle: string) {
  trackEvent('blog_post_view', {
    post_id: postId,
    post_title: postTitle,
  })
}

// Track download/demo request
export function trackDownloadRequest(resourceType: string) {
  trackEvent('download_request', {
    resource_type: resourceType,
  })
}

// Track pricing plan interaction
export function trackPricingInteraction(planName: string, action: string) {
  trackEvent('pricing_interaction', {
    plan_name: planName,
    action: action,
  })
}