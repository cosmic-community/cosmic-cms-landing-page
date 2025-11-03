'use client'

import type { Testimonial } from '@/types'
import { useState, useEffect } from 'react'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials])

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const current = testimonials[currentIndex]

  if (!current) {
    return null
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Loved by Developers
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers have to say about Cosmic
          </p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12 shadow-xl">
            <div className="flex flex-col items-center text-center">
              {current.metadata?.customer_photo && (
                <img
                  src={`${current.metadata.customer_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                  alt={current.metadata.customer_name}
                  width="100"
                  height="100"
                  className="w-20 h-20 rounded-full mb-6 object-cover"
                />
              )}

              {current.metadata?.rating && (
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${
                        i < current.metadata.rating! ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}

              <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
                "{current.metadata?.quote}"
              </p>

              <div>
                <p className="font-bold text-lg">{current.metadata?.customer_name}</p>
                {current.metadata?.customer_title && (
                  <p className="text-gray-600">
                    {current.metadata.customer_title}
                    {current.metadata?.customer_company && ` at ${current.metadata.customer_company}`}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}