import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
import UAParser from 'ua-parser-js'

interface PageProps {
  params: {
    shortCode: string
  }
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortCode } = params

  // Find link
  const link = await prisma.link.findUnique({
    where: { shortCode },
  })

  if (!link) {
    redirect('/')
  }

  // Get request headers for analytics
  const headersList = headers()
  const userAgent = headersList.get('user-agent') || ''
  const referer = headersList.get('referer') || ''
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || ''

  // Parse user agent
  const parser = new UAParser(userAgent)
  const device = parser.getDevice().type || 'desktop'
  const browser = parser.getBrowser().name || 'unknown'
  const os = parser.getOS().name || 'unknown'

  // Track analytics (non-blocking)
  prisma.analytics
    .create({
      data: {
        linkId: link.id,
        device,
        browser,
        os,
        referer,
        country: 'Unknown', // Would need a GeoIP service for real country detection
        city: 'Unknown',
      },
    })
    .catch((error) => {
      console.error('Failed to track analytics:', error)
    })

  // Increment click count (non-blocking)
  prisma.link
    .update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    })
    .catch((error) => {
      console.error('Failed to increment clicks:', error)
    })

  // Redirect to original URL
  redirect(link.originalUrl)
}
