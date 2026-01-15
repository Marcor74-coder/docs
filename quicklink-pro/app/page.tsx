import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-600">
            ⚡ QuickLink Pro
          </div>
          <div className="space-x-4">
            <Link
              href="/auth/signin"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Shorten Links.<br />
            <span className="text-primary-600">Track Everything.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Create short, branded links and get detailed analytics on every click.
            Perfect for marketers, businesses, and content creators.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition transform hover:scale-105"
          >
            Start Free Today
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold mb-3">Custom Short Links</h3>
            <p className="text-gray-600">
              Create memorable, branded short links with custom aliases.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Detailed Analytics</h3>
            <p className="text-gray-600">
              Track clicks, locations, devices, and referrers in real-time.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-gray-600">
              Instant redirects with 99.9% uptime guaranteed.
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-6">
                $0<span className="text-lg text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>50 links per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Standard support</span>
                </li>
              </ul>
              <Link
                href="/auth/signup"
                className="block text-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-primary-600 text-white p-8 rounded-xl shadow-lg transform scale-105">
              <div className="inline-block bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-6">
                $19<span className="text-lg opacity-80">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Unlimited links</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Advanced analytics & exports</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Custom domains</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <Link
                href="/auth/signup?plan=pro"
                className="block text-center bg-white text-primary-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Start Pro Trial
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-20 border-t">
        <div className="text-center text-gray-600">
          <p>© 2024 QuickLink Pro. Built with Next.js</p>
        </div>
      </footer>
    </div>
  )
}
