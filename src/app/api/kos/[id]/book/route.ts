import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { userId, roomId, checkInDate, duration, paymentMethod } = body

    if (!userId || !roomId || !checkInDate || !duration) {
      return NextResponse.json(
        { error: 'userId, roomId, checkInDate, and duration are required' },
        { status: 400 }
      )
    }

    if (duration < 1) {
      return NextResponse.json(
        { error: 'Duration must be at least 1 month' },
        { status: 400 }
      )
    }

    // Verify kos exists
    const kos = db.findKosById(id)

    if (!kos) {
      return NextResponse.json(
        { error: 'Kos not found' },
        { status: 404 }
      )
    }

    // Verify room exists and belongs to this kos
    const room = db.findRoom({ id: roomId, kosId: id })

    if (!room) {
      return NextResponse.json(
        { error: 'Room not found in this kos' },
        { status: 404 }
      )
    }

    if (!room.isAvailable) {
      return NextResponse.json(
        { error: 'Room is not available' },
        { status: 400 }
      )
    }

    // Create booking
    const booking = db.createBooking({
      userId,
      kosId: id,
      roomId,
      checkInDate,
      duration,
      paymentMethod: paymentMethod || undefined,
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Booking created successfully', data: booking },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
