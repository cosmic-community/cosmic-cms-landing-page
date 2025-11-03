import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getUserById, getPostsByIds } from '@/lib/cosmic'
import Link from 'next/link'
import { BookMarked, History, Mail, Settings } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // Changed: Added explicit check for session.user.id
  if (!session?.user?.id) {
    redirect('/login')
  }

  const user = await getUserById(session.user.id)

  if (!user) {
    redirect('/login')
  }

  const bookmarkedPosts = await getPostsByIds(user.metadata.bookmarked_posts || [])
  const recentPosts = await getPostsByIds((user.metadata.reading_history || []).slice(0, 5))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome back, {user.metadata.name}!
          </h1>
          <p className="text-gray-600">
            Manage your profile, bookmarks, and account settings
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/dashboard/bookmarks"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <BookMarked className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">
                {bookmarkedPosts.length}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Bookmarks</h3>
            <p className="text-sm text-gray-600">Saved blog posts</p>
          </Link>

          <Link
            href="/dashboard/history"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <History className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">
                {user.metadata.reading_history?.length || 0}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Reading History</h3>
            <p className="text-sm text-gray-600">Articles you've read</p>
          </Link>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Mail className="w-8 h-8 text-primary" />
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user.metadata.newsletter_subscribed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {user.metadata.newsletter_subscribed ? 'Active' : 'Inactive'}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
            <p className="text-sm text-gray-600">Subscription status</p>
          </div>

          <Link
            href="/dashboard/settings"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <Settings className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
            <p className="text-sm text-gray-600">Account preferences</p>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Recent Bookmarks
            </h2>
            {bookmarkedPosts.length > 0 ? (
              <div className="space-y-4">
                {bookmarkedPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {post.metadata.title || post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.metadata.excerpt}
                    </p>
                  </div>
                ))}
                {bookmarkedPosts.length > 3 && (
                  <Link
                    href="/dashboard/bookmarks"
                    className="text-primary hover:text-primary-dark font-medium text-sm"
                  >
                    View all {bookmarkedPosts.length} bookmarks →
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-gray-600">No bookmarked posts yet</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Reading History
            </h2>
            {recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {post.metadata.title || post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.metadata.excerpt}
                    </p>
                  </div>
                ))}
                <Link
                  href="/dashboard/history"
                  className="text-primary hover:text-primary-dark font-medium text-sm"
                >
                  View full history →
                </Link>
              </div>
            ) : (
              <p className="text-gray-600">No reading history yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}