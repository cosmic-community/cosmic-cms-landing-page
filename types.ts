// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Feature object type
export interface Feature extends CosmicObject {
  type: 'features';
  metadata: {
    title: string;
    description: string;
    icon?: string;
    order?: number;
  };
}

// Pricing Plan object type
export interface PricingPlan extends CosmicObject {
  type: 'pricing-plans';
  metadata: {
    plan_name: string;
    price: number;
    billing_period: {
      key: string;
      value: string;
    };
    features?: string[];
    cta_text?: string;
    is_popular?: boolean;
    order?: number;
  };
}

// Testimonial object type
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    customer_name: string;
    customer_title?: string;
    customer_company?: string;
    quote: string;
    rating?: number;
    customer_photo?: {
      url: string;
      imgix_url: string;
    };
    order?: number;
  };
}

// Team Member object type
export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    name: string;
    role: string;
    bio?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// User object type
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    email: string;
    password_hash: string;
    name: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    bookmarked_posts?: string[]; // Array of post IDs
    reading_history?: string[]; // Array of post IDs
    newsletter_subscribed?: boolean;
    email_verified?: boolean;
    verification_token?: string;
    reset_token?: string;
    reset_token_expiry?: string;
  };
}

// Blog Post object type (for bookmark feature)
export interface BlogPost extends CosmicObject {
  type: 'posts';
  metadata: {
    title: string;
    excerpt?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: string;
    published_date?: string;
    category?: string;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Type guard for features
export function isFeature(obj: CosmicObject): obj is Feature {
  return obj.type === 'features';
}

// Type guard for pricing plans
export function isPricingPlan(obj: CosmicObject): obj is PricingPlan {
  return obj.type === 'pricing-plans';
}

// Type guard for testimonials
export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

// Type guard for team members
export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type === 'team-members';
}

// Type guard for users
export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

// Type guard for blog posts
export function isBlogPost(obj: CosmicObject): obj is BlogPost {
  return obj.type === 'posts';
}

// NextAuth type extensions
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
  }
}