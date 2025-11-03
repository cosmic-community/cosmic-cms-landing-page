'use client'

import { useState, useEffect } from 'react'

export default function PrivacyPage() {
  const [cookieSettings, setCookieSettings] = useState({
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'accepted') {
      setCookieSettings({
        analytics: true,
        marketing: false,
      })
    }
  }, [])

  const handleSaveSettings = () => {
    if (cookieSettings.analytics) {
      localStorage.setItem('cookie-consent', 'accepted')
    } else {
      localStorage.setItem('cookie-consent', 'declined')
    }
    
    alert('Your privacy settings have been saved. The page will reload to apply changes.')
    window.location.reload()
  }

  const handleClearData = () => {
    localStorage.removeItem('cookie-consent')
    setCookieSettings({
      analytics: false,
      marketing: false,
    })
    alert('All data has been cleared. The page will reload.')
    window.location.reload()
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
          Privacy & Cookie Settings
        </h1>

        {/* Privacy Policy Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Privacy Commitment</h2>
          <p className="text-gray-700 mb-4">
            At Cosmic CMS, we take your privacy seriously. We only collect data that helps us improve our services 
            and provide you with the best experience possible.
          </p>
          <p className="text-gray-700 mb-4">
            We use cookies and similar technologies to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Understand how you use our website</li>
            <li>Improve our platform performance</li>
            <li>Remember your preferences</li>
            <li>Analyze site traffic and user behavior</li>
          </ul>
          <p className="text-gray-700">
            You have full control over your data. You can manage your cookie preferences below at any time.
          </p>
        </div>

        {/* Cookie Settings */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold mb-6">Cookie Preferences</h2>
          
          {/* Essential Cookies */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Required for the website to function properly. These cannot be disabled.
                </p>
              </div>
              <div className="ml-4">
                <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  Always Active
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Help us understand how visitors interact with our website by collecting anonymous data.
                </p>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => setCookieSettings(prev => ({ ...prev, analytics: !prev.analytics }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    cookieSettings.analytics ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      cookieSettings.analytics ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Marketing Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Used to track visitors across websites to display relevant advertisements.
                </p>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => setCookieSettings(prev => ({ ...prev, marketing: !prev.marketing }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    cookieSettings.marketing ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      cookieSettings.marketing ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSaveSettings}
              className="px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Save Preferences
            </button>
            <button
              onClick={handleClearData}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Clear All Data
            </button>
          </div>
        </div>

        {/* Data We Collect */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Data We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">When You Visit Our Site:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">When You Sign Up:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Email address</li>
                <li>Name (if provided)</li>
                <li>Usage patterns and preferences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}