import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const otherUserId = searchParams.get('otherUserId')
    const kosId = searchParams.get('kosId')

    if (!userId || !otherUserId) {
      return NextResponse.json(
        { error: 'userId and otherUserId are required' },
        { status: 400 }
      )
    }

    const messages = db.findChatMessages(
      userId,
      otherUserId,
      kosId || undefined
    )

    return NextResponse.json({ data: messages })
  } catch (error) {
    console.error('Get chat messages error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { senderId, receiverId, kosId, message } = body

    if (!senderId || !receiverId || !message) {
      return NextResponse.json(
        { error: 'senderId, receiverId, and message are required' },
        { status: 400 }
      )
    }

    const chatMessage = db.createChatMessage({
      senderId,
      receiverId,
      kosId: kosId || undefined,
      message,
    })

    return NextResponse.json(
      { data: chatMessage },
      { status: 201 }
    )
  } catch (error) {
    console.error('Send chat message error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
