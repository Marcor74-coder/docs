import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateShortCode, isValidUrl } from '@/lib/utils'

// GET /api/links - Get all links for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id

    const links = await prisma.link.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { analytics: true },
        },
      },
    })

    return NextResponse.json({ links })
  } catch (error) {
    console.error('Get links error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

// POST /api/links - Create a new short link
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const userPlan = (session.user as any).plan
    const { originalUrl, customAlias, title } = await req.json()

    // Validate URL
    if (!originalUrl || !isValidUrl(originalUrl)) {
      return NextResponse.json(
        { error: 'Invalid URL' },
        { status: 400 }
      )
    }

    // Check link limit for free users
    if (userPlan === 'free') {
      const linkCount = await prisma.link.count({
        where: { userId },
      })

      if (linkCount >= 50) {
        return NextResponse.json(
          { error: 'Link limit reached. Upgrade to Pro for unlimited links.' },
          { status: 403 }
        )
      }
    }

    // Generate or use custom short code
    let shortCode = customAlias || generateShortCode()

    // Ensure short code is unique
    let attempts = 0
    while (attempts < 5) {
      const existing = await prisma.link.findUnique({
        where: { shortCode },
      })

      if (!existing) break

      if (customAlias) {
        return NextResponse.json(
          { error: 'Custom alias already taken' },
          { status: 400 }
        )
      }

      shortCode = generateShortCode()
      attempts++
    }

    // Create link
    const link = await prisma.link.create({
      data: {
        shortCode,
        originalUrl,
        title: title || originalUrl,
        userId,
      },
    })

    return NextResponse.json({ link }, { status: 201 })
  } catch (error) {
    console.error('Create link error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
