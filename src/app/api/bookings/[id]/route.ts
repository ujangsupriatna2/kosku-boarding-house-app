import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    const validStatuses = [
      'pending',
      'paid',
      'confirmed',
      'cancelled',
      'completed',
    ]

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      )
    }

    // Check if booking exists
    const existingBooking = await db.booking.findUnique({
      where: { id },
    })

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Update booking and potentially restore room availability
    const updatedBooking = await db.$transaction(async (tx) => {
      const booking = await tx.booking.update({
        where: { id },
        data: { status },
        include: {
          kos: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
          room: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })

      // If booking is cancelled, set room back to available
      if (status === 'cancelled') {
        await tx.room.update({
          where: { id: existingBooking.roomId },
          data: { isAvailable: true },
        })
      }

      return booking
    })

    return NextResponse.json({
      message: 'Booking updated successfully',
      data: updatedBooking,
    })
  } catch (error) {
    console.error('Update booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
