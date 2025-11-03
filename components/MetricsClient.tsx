'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface MetricsData {
  totalFeatures: number
  totalPlans: number
  totalTestimonials: number
  features: any[]
}

interface Props {
  initialData: MetricsData
}

export default function MetricsClient({ initialData }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sample data for visualizations
  const monthlyData = [
    { month: 'Jan', users: 120, posts: 45 },
    { month: 'Feb', users: 180, posts: 62 },
    { month: 'Mar', users: 250, posts: 78 },
    { month: 'Apr', users: 320, posts: 95 },
    { month: 'May', users: 410, posts: 112 },
    { month: 'Jun', users: 520, posts: 138 },
  ]

  const featureUsageData = [
    { name: 'API Access', value: 450 },
    { name: 'Media Library', value: 380 },
    { name: 'Webhooks', value: 220 },
    { name: 'Localization', value: 180 },
  ]

  const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981']

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = (platform: string) => {
    const lastMonthData = monthlyData[monthlyData.length - 1]
    const text = `Check out Cosmic CMS metrics! ${initialData.totalFeatures} features, ${lastMonthData?.users ?? 0} active users.`
    
    let url = ''
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Public Metrics
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time statistics and insights about our platform activity
          </p>
        </div>

        {/* Key Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Total Features</span>
              <span className="text-3xl">📦</span>
            </div>
            <p className="text-4xl font-bold gradient-text">{initialData.totalFeatures}</p>
            <p className="text-sm text-gray-500 mt-2">Available in platform</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Active Users</span>
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-4xl font-bold gradient-text">{monthlyData[monthlyData.length - 1]?.users ?? 0}</p>
            <p className="text-sm text-gray-500 mt-2">This month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Content Published</span>
              <span className="text-3xl">📝</span>
            </div>
            <p className="text-4xl font-bold gradient-text">{monthlyData[monthlyData.length - 1]?.posts ?? 0}</p>
            <p className="text-sm text-gray-500 mt-2">Posts this month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Testimonials</span>
              <span className="text-3xl">⭐</span>
            </div>
            <p className="text-4xl font-bold gradient-text">{initialData.totalTestimonials}</p>
            <p className="text-sm text-gray-500 mt-2">Happy customers</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Growth Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">User Growth</h2>
            {mounted && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Content Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Content Published</h2>
            {mounted && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="posts" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Feature Usage Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Popular Features</h2>
          {mounted && (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={featureUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {featureUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Share Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Share Our Metrics</h2>
          <p className="text-lg mb-6 opacity-90">
            Help us spread the word about our growing platform!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleShare('twitter')}
              className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Share on Twitter
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Share on LinkedIn
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Share on Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}