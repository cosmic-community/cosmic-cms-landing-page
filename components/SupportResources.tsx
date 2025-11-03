import { Mail, MessageCircle, FileText, Clock } from 'lucide-react'

export default function SupportResources() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Email</p>
              <a href="mailto:support@cosmicjs.com" className="text-gray-600 hover:text-primary transition-colors">
                support@cosmicjs.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <MessageCircle className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Live Chat</p>
              <p className="text-gray-600">Available 24/7</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Response Time</p>
              <p className="text-gray-600">Usually under 2 hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4">Quick Resources</h3>
        <div className="space-y-3">
          <a
            href="https://www.cosmicjs.com/docs"
            className="flex items-center space-x-3 text-gray-700 hover:text-primary transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Documentation</span>
          </a>
          <a
            href="https://www.cosmicjs.com/blog"
            className="flex items-center space-x-3 text-gray-700 hover:text-primary transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Blog & Tutorials</span>
          </a>
          <a
            href="https://discord.gg/cosmicjs"
            className="flex items-center space-x-3 text-gray-700 hover:text-primary transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Community Discord</span>
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-2">Follow Us</h3>
        <p className="text-gray-600 text-sm mb-4">
          Stay updated with the latest news and updates
        </p>
        <div className="flex space-x-4">
          <a
            href="https://twitter.com/cosmicjs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
            aria-label="Follow us on X (formerly Twitter)"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/cosmicjs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
            aria-label="Follow us on LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://github.com/cosmicjs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
            aria-label="Follow us on GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}