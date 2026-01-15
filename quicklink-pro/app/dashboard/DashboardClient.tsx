'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CreateLinkForm from '@/components/CreateLinkForm'
import LinksList from '@/components/LinksList'

interface Link {
  id: string
  shortCode: string
  originalUrl: string
  title: string | null
  clicks: number
  createdAt: string
  _count: {
    analytics: number
  }
}

export default function DashboardClient({ initialLinks }: { initialLinks: Link[] }) {
  const router = useRouter()

  function handleRefresh() {
    router.refresh()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <CreateLinkForm onLinkCreated={handleRefresh} />
      </div>

      <div className="lg:col-span-2">
        <LinksList initialLinks={initialLinks} onRefresh={handleRefresh} />
      </div>
    </div>
  )
}
