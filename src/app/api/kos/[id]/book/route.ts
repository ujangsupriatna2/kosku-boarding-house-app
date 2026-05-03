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
    const kos = await db.kos.findUnique({
      where: { id },
    })

    if (!kos) {
      return NextResponse.json(
        { error: 'Kos not found' },
        { status: 404 }
      )
    }

    // Verify room exists and belongs to this kos
    const room = await db.room.findFirst({
      where: { id: roomId, kosId: id },
    })

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

    // Calculate total price
    const totalPrice = room.price * duration

    // Create booking and update room availability in a transaction
    const booking = await db.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId,
          kosId: id,
          roomId,
          checkInDate,
          duration,
          totalPrice,
          status: 'pending',
          paymentMethod: paymentMethod || null,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          kos: {
            select: {
              id: true,
              name: true,
            },
          },
          room: true,
        },
      })

      // Set room to unavailable
      await tx.room.update({
        where: { id: roomId },
        data: { isAvailable: false },
      })

      return newBooking
    })

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
