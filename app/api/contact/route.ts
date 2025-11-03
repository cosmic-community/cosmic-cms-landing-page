import { NextRequest, NextResponse } from 'next/server'
import { createContactSubmission } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create submission in Cosmic CMS
    const submission = await createContactSubmission({
      name,
      email,
      company,
      subject,
      message
    })

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: submission.id
    })
  } catch (error) {
    console.error('Contact form API error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}