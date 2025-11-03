'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">We encountered an error while loading this page.</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  )
}