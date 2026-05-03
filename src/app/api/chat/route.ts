import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

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

    // Build where clause for conversation between two users
    const where: Prisma.ChatMessageWhereInput = {
      OR: [
        {
          AND: [
            { senderId: userId },
            { receiverId: otherUserId },
          ],
        },
        {
          AND: [
            { senderId: otherUserId },
            { receiverId: userId },
          ],
        },
      ],
    }

    // If kosId is provided, filter by it
    if (kosId) {
      where.AND = [{ kosId }]
    }

    const messages = await db.chatMessage.findMany({
      where,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    // Mark messages sent to current user as read
    if (messages.length > 0) {
      await db.chatMessage.updateMany({
        where: {
          senderId: otherUserId,
          receiverId: userId,
          isRead: false,
        },
        data: { isRead: true },
      })
    }

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

    const chatMessage = await db.chatMessage.create({
      data: {
        senderId,
        receiverId,
        kosId: kosId || null,
        message,
        isRead: false,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
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
