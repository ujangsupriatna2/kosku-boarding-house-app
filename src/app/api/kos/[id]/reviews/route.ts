import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Verify kos exists
    const kos = db.findKosById(id)

    if (!kos) {
      return NextResponse.json(
        { error: 'Kos not found' },
        { status: 404 }
      )
    }

    const reviews = db.findReviewsByKosId(id)

    return NextResponse.json({ data: reviews })
  } catch (error) {
    console.error('Get reviews error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { userId, rating, comment } = body

    if (!userId || !rating) {
      return NextResponse.json(
        { error: 'UserId and rating are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
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

    // Check if user already reviewed this kos
    const existingReview = db.findReviewByUserAndKos(userId, id)

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this kos' },
        { status: 409 }
      )
    }

    const review = db.createReview({
      userId,
      kosId: id,
      rating,
      comment: comment || undefined,
    })

    return NextResponse.json({ data: review }, { status: 201 })
  } catch (error) {
    console.error('Create review error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
