import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json()

    // Basic email validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Subscribe to newsletter in Cosmic
    const result = await subscribeToNewsletter(email, source)

    // Optional: Send to external webhook (e.g., email service provider)
    if (result.success && process.env.NEWSLETTER_WEBHOOK_URL) {
      try {
        await fetch(process.env.NEWSLETTER_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            source,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (webhookError) {
        console.error('Webhook error:', webhookError)
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json({
      success: result.success,
      message: result.message,
      data: result.success ? { email } : undefined,
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}