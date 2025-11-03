import { getFeatures, getPricingPlans, getTestimonials } from '@/lib/cosmic'
import MetricsClient from '@/components/MetricsClient'

export const revalidate = 300 // Revalidate every 5 minutes

export const metadata = {
  title: 'Public Metrics - Cosmic CMS',
  description: 'View public statistics and metrics for Cosmic CMS platform',
}

async function getMetricsData() {
  const [features, plans, testimonials] = await Promise.all([
    getFeatures(),
    getPricingPlans(),
    getTestimonials(),
  ])

  return {
    totalFeatures: features.length,
    totalPlans: plans.length,
    totalTestimonials: testimonials.length,
    features,
  }
}

export default async function MetricsPage() {
  const data = await getMetricsData()

  return <MetricsClient initialData={data} />
}