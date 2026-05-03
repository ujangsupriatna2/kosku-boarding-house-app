import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const city = searchParams.get('city') || ''
    const minPrice = searchParams.get('minPrice')
      ? parseInt(searchParams.get('minPrice')!)
      : undefined
    const maxPrice = searchParams.get('maxPrice')
      ? parseInt(searchParams.get('maxPrice')!)
      : undefined
    const facility = searchParams.get('facility') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Build where clause
    const where: Prisma.KosWhereInput = {}

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { city: { contains: search } },
      ]
    }

    if (city) {
      where.city = { contains: city }
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.AND = []
      if (minPrice !== undefined) {
        where.AND.push({ priceFrom: { gte: minPrice } })
      }
      if (maxPrice !== undefined) {
        where.AND.push({ priceTo: { lte: maxPrice } })
      }
    }

    if (facility) {
      where.facilities = {
        some: {
          facility: {
            name: { contains: facility, mode: 'insensitive' },
          },
        },
      }
    }

    const [kosList, total] = await Promise.all([
      db.kos.findMany({
        where,
        skip,
        take: limit,
        include: {
          facilities: {
            include: {
              facility: true,
            },
          },
          reviews: true,
          rooms: {
            select: {
              id: true,
              isAvailable: true,
            },
          },
          _count: {
            select: {
              rooms: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      db.kos.count({ where }),
    ])

    // Calculate average rating for each kos
    const kosWithRating = kosList.map((kos) => {
      const avgRating =
        kos.reviews.length > 0
          ? kos.reviews.reduce((sum, r) => sum + r.rating, 0) /
            kos.reviews.length
          : 0
      const availableRoomCount = kos.rooms.filter(
        (r) => r.isAvailable
      ).length

      return {
        ...kos,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: kos.reviews.length,
        availableRoomCount,
        reviews: undefined,
        rooms: undefined,
      }
    })

    return NextResponse.json({
      data: kosWithRating,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get kos list error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
