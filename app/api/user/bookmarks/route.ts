import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getUserById, updateUser, getPostsByIds } from '@/lib/cosmic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    // Changed: Added explicit check for session.user.id
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await getUserById(session.user.id)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const bookmarkedPostIds = user.metadata.bookmarked_posts || []
    const posts = await getPostsByIds(bookmarkedPostIds)

    return NextResponse.json({ bookmarks: posts })
  } catch (error) {
    console.error('Get bookmarks error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // Changed: Added explicit check for session.user.id
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { postId } = await request.json()

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const user = await getUserById(session.user.id)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const bookmarkedPosts = user.metadata.bookmarked_posts || []
    
    if (bookmarkedPosts.includes(postId)) {
      return NextResponse.json(
        { error: 'Post already bookmarked' },
        { status: 400 }
      )
    }

    await updateUser(session.user.id, {
      bookmarked_posts: [...bookmarkedPosts, postId]
    })

    return NextResponse.json({ message: 'Bookmark added successfully' })
  } catch (error) {
    console.error('Add bookmark error:', error)
    return NextResponse.json(
      { error: 'Failed to add bookmark' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // Changed: Added explicit check for session.user.id
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { postId } = await request.json()

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const user = await getUserById(session.user.id)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const bookmarkedPosts = user.metadata.bookmarked_posts || []
    const updatedBookmarks = bookmarkedPosts.filter((id: string) => id !== postId)

    await updateUser(session.user.id, {
      bookmarked_posts: updatedBookmarks
    })

    return NextResponse.json({ message: 'Bookmark removed successfully' })
  } catch (error) {
    console.error('Remove bookmark error:', error)
    return NextResponse.json(
      { error: 'Failed to remove bookmark' },
      { status: 500 }
    )
  }
}