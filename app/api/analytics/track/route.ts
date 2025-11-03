import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventType, eventData, pageUrl } = body

    // Store analytics event in Cosmic CMS
    await cosmic.objects.insertOne({
      title: `${eventType} - ${new Date().toISOString()}`,
      type: 'analytics-events',
      metadata: {
        event_type: eventType,
        event_data: JSON.stringify(eventData),
        page_url: pageUrl,
        timestamp: new Date().toISOString(),
        user_agent: request.headers.get('user-agent') || '',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 })
  }
}