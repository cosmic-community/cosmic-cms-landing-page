import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getUserById, getPostsByIds } from '@/lib/cosmic'
import Link from 'next/link'
import { ArrowLeft, BookMarked } from 'lucide-react'

export default async function BookmarksPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <BookMarked className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold gradient-text">
              Your Bookmarks
            </h1>
          </div>

          {bookmarkedPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {bookmarkedPosts.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  {post.metadata.featured_image && (
                    <img
                      src={`${post.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                      alt={post.metadata.title || post.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {post.metadata.title || post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.metadata.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    Read article →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookMarked className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">
                No bookmarks yet
              </p>
              <p className="text-gray-500 mb-6">
                Start exploring our blog posts and bookmark your favorites!
              </p>
              <Link
                href="/blog"
                className="inline-block px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Browse Blog Posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}