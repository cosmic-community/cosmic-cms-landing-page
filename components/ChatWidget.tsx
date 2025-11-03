'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isOffline, setIsOffline] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Check business hours
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date()
      const day = now.getDay()
      const hour = now.getHours()
      
      // Business hours: Mon-Fri, 9am-6pm EST (adjust as needed)
      const isBusinessDay = day >= 1 && day <= 5
      const isBusinessHour = hour >= 9 && hour < 18
      
      setIsOffline(!(isBusinessDay && isBusinessHour))
    }

    checkBusinessHours()
    const interval = setInterval(checkBusinessHours, 60000) // Check every minute
    
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initial greeting when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: '1',
        text: isOffline
          ? "Thanks for reaching out! We're currently offline. Please leave us a message and we'll get back to you soon."
          : "Hi there! 👋 How can we help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages([greeting])
    }
  }, [isOpen, isOffline, messages.length])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Auto-responses for common questions
    const lowerText = text.toLowerCase()
    let botResponse = ''

    if (lowerText.includes('pricing') || lowerText.includes('price') || lowerText.includes('cost')) {
      botResponse = "Great question! Our pricing varies based on your needs. You can check out our pricing page for detailed information, or I can connect you with our sales team for a custom quote."
    } else if (lowerText.includes('hours') || lowerText.includes('available') || lowerText.includes('open')) {
      botResponse = "Our business hours are Monday-Friday, 9am-6pm EST. However, support tickets are answered 24/7!"
    } else if (lowerText.includes('demo') || lowerText.includes('trial')) {
      botResponse = "We'd love to show you what Cosmic can do! You can sign up for a free account at any time, or book a personalized demo with our team."
    } else if (lowerText.includes('api') || lowerText.includes('documentation') || lowerText.includes('docs')) {
      botResponse = "You can find our comprehensive API documentation at cosmicjs.com/docs. It includes guides, examples, and API references."
    } else if (lowerText.includes('support') || lowerText.includes('help')) {
      botResponse = "I'm here to help! For technical support, you can email support@cosmicjs.com or submit a ticket through your dashboard."
    } else if (isOffline) {
      botResponse = "We're currently offline. Would you like to leave us a message? We'll get back to you as soon as possible."
      setShowContactForm(true)
    } else {
      botResponse = "Thanks for your message! Let me connect you with a team member who can better assist you. In the meantime, feel free to check out our documentation or contact page."
    }

    // Simulate typing delay
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, response])
    }, 1000)

    // Store message in Cosmic CMS (fire and forget)
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Anonymous',
          email: 'chat@visitor.com',
          message: text,
          message_type: 'User'
        })
      })
    } catch (error) {
      console.error('Failed to store chat message:', error)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check
    if (formData.honeypot) return

    if (!formData.name || !formData.email || !formData.message) {
      return
    }

    setFormStatus('loading')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          message_type: 'User'
        })
      })

      if (!response.ok) throw new Error('Failed to send message')

      setFormStatus('success')
      setFormData({ name: '', email: '', message: '', honeypot: '' })
      
      const successMessage: Message = {
        id: Date.now().toString(),
        text: "Thanks for your message! We'll get back to you soon at the email you provided.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, successMessage])
      setShowContactForm(false)
    } catch (error) {
      console.error('Failed to submit form:', error)
      setFormStatus('error')
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <img
                    src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg"
                    alt="Cosmic"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Cosmic Support</h3>
                  <p className="text-xs opacity-90">
                    {isOffline ? '🔴 Offline' : '🟢 Online'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Contact Form (shown when offline) */}
          {showContactForm && (
            <div className="p-4 border-t bg-white">
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                  tabIndex={-1}
                  className="absolute opacity-0 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <textarea
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                />
                {formStatus === 'error' && (
                  <p className="text-xs text-red-500">Failed to send. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          )}

          {/* Input */}
          {!showContactForm && (
            <div className="p-4 border-t bg-white rounded-b-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage(inputValue)
                }}
                className="flex space-x-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:opacity-90 transition-opacity"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  )
}