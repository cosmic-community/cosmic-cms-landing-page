import { createBucketClient } from '@cosmicjs/sdk'

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
export async function getFeatures() {
  try {
    const response = await cosmic.objects
      .find({ type: 'features' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects.sort((a, b) => {
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
export async function getPricingPlans() {
  try {
    const response = await cosmic.objects
      .find({ type: 'pricing-plans' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects.sort((a, b) => {
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
export async function getTestimonials() {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects.sort((a, b) => {
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
export async function getTeamMembers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch team members');
  }
}

// Create a contact submission
export async function createContactSubmission(data: {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}) {
  try {
    const response = await cosmic.objects.insertOne({
      title: `Contact from ${data.name}`,
      type: 'contact-submissions',
      metadata: {
        name: data.name,
        email: data.email,
        company: data.company || '',
        subject: data.subject,
        message: data.message,
        status: 'New',
        submission_date: new Date().toISOString().split('T')[0]
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Failed to create contact submission:', error);
    throw new Error('Failed to submit contact form');
  }
}

// Create a chat message
export async function createChatMessage(data: {
  name: string;
  email: string;
  message: string;
  message_type: string;
}) {
  try {
    const response = await cosmic.objects.insertOne({
      title: `Chat from ${data.name}`,
      type: 'chat-messages',
      metadata: {
        name: data.name,
        email: data.email,
        message: data.message,
        message_type: data.message_type,
        timestamp: new Date().toISOString().split('T')[0]
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Failed to create chat message:', error);
    throw new Error('Failed to submit chat message');
  }
}