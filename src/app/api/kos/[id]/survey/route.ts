import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { userId, scheduledDate, scheduledTime, notes } = body

    if (!userId || !scheduledDate || !scheduledTime) {
      return NextResponse.json(
        { error: 'userId, scheduledDate, and scheduledTime are required' },
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

    const survey = db.createSurvey({
      userId,
      kosId: id,
      scheduledDate,
      scheduledTime,
      notes: notes || undefined,
    })

    return NextResponse.json(
      { message: 'Survey scheduled successfully', data: survey },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create survey error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
