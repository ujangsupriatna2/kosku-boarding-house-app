import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ownerId = searchParams.get('ownerId')

    if (!ownerId) {
      return NextResponse.json(
        { error: 'ownerId is required' },
        { status: 400 }
      )
    }

    // Verify user is an owner
    const user = await db.user.findUnique({
      where: { id: ownerId },
    })

    if (!user || user.role !== 'owner') {
      return NextResponse.json(
        { error: 'User not found or not an owner' },
        { status: 403 }
      )
    }

    const kosList = await db.kos.findMany({
      where: { ownerId },
      include: {
        _count: {
          select: {
            rooms: true,
            bookings: true,
            reviews: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data: kosList })
  } catch (error) {
    console.error('Get owner kos error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      ownerId,
      name,
      description,
      address,
      city,
      district,
      latitude,
      longitude,
      imageUrl,
      priceFrom,
      priceTo,
      totalRooms,
      rules,
      roomTypes,
    } = body

    if (!ownerId || !name || !address || !city) {
      return NextResponse.json(
        {
          error:
            'ownerId, name, address, and city are required',
        },
        { status: 400 }
      )
    }

    // Verify user is an owner
    const user = await db.user.findUnique({
      where: { id: ownerId },
    })

    if (!user || user.role !== 'owner') {
      return NextResponse.json(
        { error: 'User not found or not an owner' },
        { status: 403 }
      )
    }

    const kos = await db.kos.create({
      data: {
        ownerId,
        name,
        description,
        address,
        city,
        district,
        latitude: latitude || null,
        longitude: longitude || null,
        imageUrl: imageUrl || null,
        priceFrom: priceFrom || 0,
        priceTo: priceTo || 0,
        totalRooms: totalRooms || 0,
        availableRooms: totalRooms || 0,
        rules: rules || null,
        roomTypes: roomTypes || null,
      },
    })

    return NextResponse.json(
      { message: 'Kos created successfully', data: kos },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create kos error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
