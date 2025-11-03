import { NextRequest, NextResponse } from 'next/server'
import { createChatMessage } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, message_type } = body

    // Validation
    if (!name || !email || !message || !message_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create chat message in Cosmic CMS
    const chatMessage = await createChatMessage({
      name,
      email,
      message,
      message_type
    })

    return NextResponse.json({
      success: true,
      message: 'Chat message stored successfully',
      id: chatMessage.id
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to store chat message' },
      { status: 500 }
    )
  }
}