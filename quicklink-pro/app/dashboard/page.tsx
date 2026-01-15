import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import DashboardNav from '@/components/DashboardNav'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/auth/signin')
  }

  const userId = (session.user as any).id

  // Fetch user's links
  const links = await prisma.link.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { analytics: true },
      },
    },
  })

  // Calculate stats
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0)
  const totalLinks = links.length

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Links</div>
            <div className="text-3xl font-bold text-gray-900">{totalLinks}</div>
            {(session.user as any).plan === 'free' && (
              <div className="text-xs text-gray-500 mt-2">
                {totalLinks}/50 links used
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Clicks</div>
            <div className="text-3xl font-bold text-gray-900">{totalClicks}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Current Plan</div>
            <div className="text-3xl font-bold text-gray-900">
              {(session.user as any).plan === 'pro' ? '💎 Pro' : '🆓 Free'}
            </div>
            {(session.user as any).plan === 'free' && (
              <a
                href="/#pricing"
                className="text-xs text-primary-600 hover:text-primary-700 mt-2 inline-block"
              >
                Upgrade to Pro →
              </a>
            )}
          </div>
        </div>

        <DashboardClient initialLinks={JSON.parse(JSON.stringify(links))} />
      </main>
    </div>
  )
}
