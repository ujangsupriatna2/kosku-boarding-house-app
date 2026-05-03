import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const today = new Date().toISOString().split('T')[0]

    const promos = await db.promo.findMany({
      where: {
        isActive: true,
        endDate: {
          gte: today,
        },
      },
      include: {
        kos: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            city: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data: promos })
  } catch (error) {
    console.error('Get promos error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
