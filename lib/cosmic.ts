import { createBucketClient } from '@cosmicjs/sdk'
import type { Feature, PricingPlan, Testimonial, TeamMember, CosmicObject } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error checking
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all features
export async function getFeatures(): Promise<Feature[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'features' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as Feature[]).sort((a: Feature, b: Feature) => {
      const orderA = a.metadata?.order || 0;
      const orderB = b.metadata?.order || 0;
      return orderA - orderB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch features');
  }
}

// Fetch all pricing plans
export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pricing-plans' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as PricingPlan[]).sort((a: PricingPlan, b: PricingPlan) => {
      const orderA = a.metadata?.order || 0;
      const orderB = b.metadata?.order || 0;
      return orderA - orderB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch pricing plans');
  }
}

// Fetch all testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as Testimonial[]).sort((a: Testimonial, b: Testimonial) => {
      const orderA = a.metadata?.order || 0;
      const orderB = b.metadata?.order || 0;
      return orderA - orderB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch testimonials');
  }
}

// Fetch all team members
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as TeamMember[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch team members');
  }
}

// Newsletter subscription functions
export async function subscribeToNewsletter(email: string, source: string = 'website') {
  try {
    // Check if email already exists
    const existingResponse = await cosmic.objects
      .find({ 
        type: 'subscribers',
        'metadata.email': email
      })
      .props(['id', 'metadata'])
      .depth(0);

    if (existingResponse.objects && existingResponse.objects.length > 0) {
      const existingSubscriber = existingResponse.objects[0];
      
      // Check if already subscribed
      if (existingSubscriber?.metadata?.status === 'subscribed') {
        return {
          success: false,
          message: 'This email is already subscribed to our newsletter.',
          duplicate: true
        };
      }
      
      // Resubscribe if previously unsubscribed
      await cosmic.objects.updateOne(existingSubscriber.id, {
        metadata: {
          status: 'subscribed',
          subscribed_at: new Date().toISOString()
        }
      });
      
      return {
        success: true,
        message: 'Welcome back! You have been resubscribed.',
        subscriber_id: existingSubscriber.id
      };
    }

    // Create new subscriber
    const response = await cosmic.objects.insertOne({
      title: email,
      type: 'subscribers',
      metadata: {
        email: email,
        status: 'subscribed',
        subscribed_at: new Date().toISOString(),
        source: source
      }
    });

    return {
      success: true,
      message: 'Successfully subscribed to the newsletter!',
      subscriber_id: response.object.id
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    };
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'subscribers',
        'metadata.email': email
      })
      .props(['id', 'metadata'])
      .depth(0);

    if (!response.objects || response.objects.length === 0) {
      return {
        success: false,
        message: 'Email address not found in our subscription list.'
      };
    }

    const subscriber = response.objects[0];
    
    if (!subscriber) {
      return {
        success: false,
        message: 'Email address not found in our subscription list.'
      };
    }

    await cosmic.objects.updateOne(subscriber.id, {
      metadata: {
        status: 'unsubscribed'
      }
    });

    return {
      success: true,
      message: 'Successfully unsubscribed from the newsletter.'
    };
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return {
      success: false,
      message: 'Failed to unsubscribe. Please try again later.'
    };
  }
}