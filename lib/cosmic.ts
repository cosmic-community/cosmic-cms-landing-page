import { createBucketClient } from '@cosmicjs/sdk'
import { User, BlogPost } from '@/types'

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

// User authentication functions
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'users', 'metadata.email': email })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    if (response.objects && response.objects.length > 0) {
      return response.objects[0] as User;
    }
    return null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user');
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .findOne({ id })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as User;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user');
  }
}

export async function createUser(data: {
  email: string;
  password_hash: string;
  name: string;
  verification_token?: string;
}): Promise<User> {
  const response = await cosmic.objects.insertOne({
    title: data.email,
    type: 'users',
    metadata: {
      email: data.email,
      password_hash: data.password_hash,
      name: data.name,
      email_verified: false,
      newsletter_subscribed: false,
      bookmarked_posts: [],
      reading_history: [],
      verification_token: data.verification_token || '',
    }
  });
  
  return response.object as User;
}

export async function updateUser(id: string, metadata: Partial<User['metadata']>): Promise<User> {
  const response = await cosmic.objects.updateOne(id, {
    metadata
  });
  
  return response.object as User;
}

// Blog post functions
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as BlogPost[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts');
  }
}

export async function getPostsByIds(ids: string[]): Promise<BlogPost[]> {
  if (!ids || ids.length === 0) {
    return [];
  }
  
  try {
    const posts = await Promise.all(
      ids.map(async (id) => {
        try {
          const response = await cosmic.objects
            .findOne({ id })
            .props(['id', 'title', 'slug', 'metadata'])
            .depth(1);
          return response.object as BlogPost;
        } catch (error) {
          return null;
        }
      })
    );
    
    return posts.filter((post): post is BlogPost => post !== null);
  } catch (error) {
    return [];
  }
}