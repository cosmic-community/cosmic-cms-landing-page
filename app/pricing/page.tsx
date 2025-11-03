import { getPricingPlans } from '@/lib/cosmic'
import type { Metadata } from 'next'
import Pricing from '@/components/Pricing'

export const metadata: Metadata = {
  title: 'Pricing - Cosmic CMS',
  description: 'Choose the perfect plan for your needs',
}

export const revalidate = 60

export default async function PricingPage() {
  const plans = await getPricingPlans()

  return (
    <div className="py-24">
      <Pricing plans={plans} />
    </div>
  )
}