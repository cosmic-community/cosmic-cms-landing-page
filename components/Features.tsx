import type { Feature } from '@/types'

interface FeaturesProps {
  features: Feature[]
}

export default function Features({ features }: FeaturesProps) {
  if (!features || features.length === 0) {
    return null
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to help you build amazing content-driven applications
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-8 shadow-lg card-hover"
            >
              {feature.metadata?.icon && (
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center text-white text-2xl mb-6">
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
    </section>
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