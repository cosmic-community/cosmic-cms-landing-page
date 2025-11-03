import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export async function GET() {
  try {
    // Fetch analytics events from Cosmic CMS
    const response = await cosmic.objects
      .find({ type: 'analytics-events' })
      .props(['id', 'title', 'metadata'])
      .depth(1)

    const events = response.objects

    // Calculate statistics
    const stats = {
      totalEvents: events.length,
      eventsByType: events.reduce((acc: Record<string, number>, event: any) => {
        const type = event.metadata?.event_type || 'unknown'
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {}),
      recentEvents: events.slice(0, 10).map((event: any) => ({
        id: event.id,
        type: event.metadata?.event_type,
        timestamp: event.metadata?.timestamp,
        pageUrl: event.metadata?.page_url,
      })),
    }

    return NextResponse.json(stats)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return NextResponse.json({
        totalEvents: 0,
        eventsByType: {},
        recentEvents: [],
      })
    }
    
    console.error('Analytics stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}