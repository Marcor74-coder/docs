'use client'

import { useState } from 'react'

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

interface LinksListProps {
  initialLinks: Link[]
  onRefresh: () => void
}

export default function LinksList({ initialLinks, onRefresh }: LinksListProps) {
  const [links, setLinks] = useState(initialLinks)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  async function handleDelete(linkId: string) {
    if (!confirm('Are you sure you want to delete this link?')) return

    try {
      const res = await fetch(`/api/links/${linkId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setLinks(links.filter((l) => l.id !== linkId))
        onRefresh()
      }
    } catch (error) {
      alert('Failed to delete link')
    }
  }

  async function copyToClipboard(shortCode: string, linkId: string) {
    const url = `${appUrl}/${shortCode}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(linkId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      alert('Failed to copy to clipboard')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">Your Links</h2>
      </div>

      {links.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          <p className="text-lg mb-2">No links yet</p>
          <p className="text-sm">Create your first short link to get started</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {links.map((link) => (
            <div key={link.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {link.title || 'Untitled'}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(link.shortCode, link.id)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      {copiedId === link.id ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 truncate">
                      <span className="font-medium">Short URL:</span>{' '}
                      <a
                        href={`${appUrl}/${link.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        {appUrl}/{link.shortCode}
                      </a>
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      <span className="font-medium">Destination:</span>{' '}
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:underline"
                      >
                        {link.originalUrl}
                      </a>
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <span className="mr-1">👆</span>
                      {link.clicks} clicks
                    </span>
                    <span>
                      Created {new Date(link.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(link.id)}
                  className="ml-4 text-red-600 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
