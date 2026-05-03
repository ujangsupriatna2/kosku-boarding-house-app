import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const kos = await db.kos.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            avatar: true,
            role: true,
          },
        },
        facilities: {
          include: {
            facility: true,
          },
        },
        rooms: {
          orderBy: { price: 'asc' },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        promos: {
          where: {
            isActive: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!kos) {
      return NextResponse.json(
        { error: 'Kos not found' },
        { status: 404 }
      )
    }

    // Calculate average rating
    const avgRating =
      kos.reviews.length > 0
        ? Math.round(
            (kos.reviews.reduce((sum, r) => sum + r.rating, 0) /
              kos.reviews.length) *
              10
          ) / 10
        : 0

    return NextResponse.json({
      ...kos,
      avgRating,
      reviewCount: kos.reviews.length,
    })
  } catch (error) {
    console.error('Get kos detail error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
