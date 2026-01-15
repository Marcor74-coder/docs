'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function DashboardNav() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              ⚡ QuickLink Pro
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session?.user && (
              <>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {session.user.name || session.user.email}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {(session.user as any).plan === 'pro' ? '💎 Pro' : '🆓 Free'}
                  </p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
