import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const promos = db.findActivePromos()

    return NextResponse.json({ data: promos })
  } catch (error) {
    console.error('Get promos error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
