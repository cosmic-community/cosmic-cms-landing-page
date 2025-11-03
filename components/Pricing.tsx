import type { PricingPlan } from '@/types'
import Link from 'next/link'

interface PricingProps {
  plans: PricingPlan[]
  preview?: boolean
}

export default function Pricing({ plans, preview = false }: PricingProps) {
  if (!plans || plans.length === 0) {
    return null
  }

  const displayPlans = preview ? plans.slice(0, 3) : plans

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {displayPlans.map((plan, index) => {
            const isPopular = plan.metadata?.is_popular

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-8 shadow-lg card-hover animate-slide-up ${
                  isPopular ? 'ring-2 ring-primary scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="gradient-bg text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.metadata?.plan_name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-5xl font-bold gradient-text">${plan.metadata?.price}</span>
                    <span className="text-gray-600">/{plan.metadata?.billing_period?.value}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.metadata?.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="https://app.cosmicjs.com/signup"
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition-colors ${
                    isPopular
                      ? 'gradient-bg text-white hover:opacity-90'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.metadata?.cta_text || 'Get Started'}
                </Link>
              </div>
            )
          })}
        </div>

        {preview && (
          <div className="text-center mt-12">
            <Link
              href="/pricing"
              className="text-primary hover:text-primary-dark font-semibold transition-colors"
            >
              View All Plans →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}