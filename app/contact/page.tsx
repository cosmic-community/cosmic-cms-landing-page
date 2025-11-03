import ContactForm from '@/components/ContactForm'
import SupportResources from '@/components/SupportResources'

export const metadata = {
  title: 'Contact Us - Cosmic CMS',
  description: 'Get in touch with our team. We\'re here to help with sales, support, partnerships, and any questions you may have.',
}

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Support Resources - Takes up 1 column */}
          <div className="lg:col-span-1">
            <SupportResources />
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Prefer to chat in real-time?</h3>
          <p className="text-gray-600 mb-6">
            Click the chat button in the bottom right corner to start a conversation with our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <p className="text-sm text-gray-500">Average response time</p>
              <p className="text-lg font-semibold">Under 2 hours</p>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <p className="text-sm text-gray-500">Support availability</p>
              <p className="text-lg font-semibold">24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}