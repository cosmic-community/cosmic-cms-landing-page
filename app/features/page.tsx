import { getFeatures } from '@/lib/cosmic'
import type { Metadata } from 'next'
import type { Feature } from '@/types'

export const metadata: Metadata = {
  title: 'Features - Cosmic CMS',
  description: 'Explore all the powerful features of Cosmic CMS',
}

export const revalidate = 60

export default async function FeaturesPage() {
  const features = await getFeatures()

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to build modern, content-driven applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature: Feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-8 shadow-lg card-hover"
            >
              {feature.metadata?.icon && (
                <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center text-white text-3xl mb-6">
                  {getIconEmoji(feature.metadata.icon)}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{feature.metadata?.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.metadata?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getIconEmoji(icon: string): string {
  const icons: Record<string, string> = {
    rocket: '🚀',
    code: '💻',
    dashboard: '📊',
    api: '🔌',
    speed: '⚡',
    security: '🔒',
    scale: '📈',
    support: '💬',
  }
  return icons[icon] || '✨'
}