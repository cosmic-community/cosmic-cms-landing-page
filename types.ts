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

// Contact Submission object type
export interface ContactSubmission extends CosmicObject {
  type: 'contact-submissions';
  metadata: {
    name: string;
    email: string;
    company?: string;
    subject: string;
    message: string;
    status: string;
    submission_date: string;
  };
}

// Chat Message object type
export interface ChatMessage extends CosmicObject {
  type: 'chat-messages';
  metadata: {
    name: string;
    email: string;
    message: string;
    message_type: string;
    timestamp: string;
  };
}

// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

// Chat form data interface
export interface ChatFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
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

// Type guard for contact submissions
export function isContactSubmission(obj: CosmicObject): obj is ContactSubmission {
  return obj.type === 'contact-submissions';
}

// Type guard for chat messages
export function isChatMessage(obj: CosmicObject): obj is ChatMessage {
  return obj.type === 'chat-messages';
}