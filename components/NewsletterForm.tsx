'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  source: string;
  compact?: boolean;
}

export default function NewsletterForm({ source, compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
        
        // Redirect to thank you page after 2 seconds
        setTimeout(() => {
          window.location.href = '/newsletter/thank-you'
        }, 2000)
      } else {
        setStatus('error')
        setMessage(data.message)
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 text-sm whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        
        {status === 'success' && (
          <p className="text-green-400 text-xs animate-fade-in">{message}</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-xs animate-fade-in">{message}</p>
        )}
        
        <p className="text-gray-500 text-xs">
          By subscribing, you agree to our privacy policy.
        </p>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      
      {status === 'success' && (
        <p className="text-green-600 animate-fade-in">{message}</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 animate-fade-in">{message}</p>
      )}
      
      <p className="text-sm text-gray-600">
        By subscribing, you agree to our{' '}
        <a href="#" className="text-primary hover:underline">
          privacy policy
        </a>
        . We respect your inbox and never spam.
      </p>
    </form>
  )
}