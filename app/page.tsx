import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import { getFeatures, getPricingPlans, getTestimonials } from '@/lib/cosmic'

export const revalidate = 60

export default async function Home() {
  const [features, plans, testimonials] = await Promise.all([
    getFeatures(),
    getPricingPlans(),
    getTestimonials(),
  ])

  return (
    <>
      <Hero />
      <Features features={features} />
      <Pricing plans={plans} preview />
      <Testimonials testimonials={testimonials} />
    </>
  )
}