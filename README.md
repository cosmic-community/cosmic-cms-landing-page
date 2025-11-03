# Cosmic CMS Landing Page

![App Preview](https://imgix.cosmicjs.com/244b6f20-b860-11f0-9486-d1bde627623f-photo-1500648767791-00dcc994a43e-1762138351122.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, professional landing page built with Next.js 16 and powered by Cosmic CMS. Features a beautiful purple/blue gradient design, smooth animations, and comprehensive content management capabilities.

## ✨ Features

- 🎨 Modern gradient design with purple/blue theme
- 📱 Fully responsive across all devices
- ⚡ Server-side rendering for optimal performance
- 🔄 Dynamic content management via Cosmic CMS
- 🎭 Smooth scroll animations and transitions
- 📝 Full-featured blog with pagination
- 💼 Team member showcase
- 💬 Customer testimonials carousel
- 💰 Interactive pricing comparison
- ❓ FAQ section with accordion
- 🔍 SEO optimized with proper meta tags
- 🎯 TypeScript for type safety
- 🚀 Built with Next.js 16 App Router

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=690816d12177b4cb6ee27140&clone_repository=690819e12177b4cb6ee27165)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a SaaS product landing page called "Cosmic CMS".
> 
> Content types needed:
> 
> 1. Features
> - Title (text)
> - Description (textarea)
> - Icon (text - for icon name)
> - Order (number)
> 
> 2. Pricing Plans
> - Plan name (text)
> - Price (number)
> - Billing period (select: monthly, yearly)
> - Features list (repeater of text items)
> - CTA text (text)
> - Is popular (boolean)
> - Order (number)
> 
> 3. Testimonials
> - Customer name (text)
> - Customer title (text)
> - Customer company (text)
> - Quote (textarea)
> - Rating (number)
> - Customer photo (media)
> - Order (number)
> 
> 4. Team Members
> - Name (text)
> - Role (text)
> - Bio (textarea)
> - Photo"

### Code Generation Prompt

> Build a modern Next.js landing page for Cosmic CMS using the content model.
> 
> Requirements:
> 
> Homepage should include:
> - Hero section with headline "Build Content-Driven Apps at Lightning Speed" and CTA buttons
> - Features section displaying all features from the Features content type in a grid
> - Pricing section showing all pricing plans with comparison
> - Testimonials carousel showing customer testimonials
> - FAQ section with accordion for FAQ items
> - Blog preview section showing the 3 latest blog posts
> - Footer with company info and navigation
> 
> Additional pages:
> - /features - Full features page with detailed explanations
> - /pricing - Dedicated pricing page with more details
> - /blog - Blog listing page with pagination
> - /blog/[slug] - Individual blog post page with rich content rendering
> - /about - About page showing team members
> - /faq - Full FAQ page with category filters
> 
> Design:
> - Modern, professional design with purple/blue gradient theme
> - Fully responsive (mobile, tablet, desktop)
> - Use Tailwind CSS for styling
> - Add smooth scroll animations
> - Include proper SEO meta tags
> - Fetch all content from Cosmic CMS using the API
> 
> Technical:
> - Next.js 14 with App Router
> - TypeScript
> - Server-side rendering for content pages
> - Proper error handling and loading states
> - Use Cosmic JavaScript SDK

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **SDK**: @cosmicjs/sdk
- **Font**: Inter (Google Fonts)
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with a bucket containing:
  - Features content type
  - Pricing Plans content type
  - Testimonials content type
  - Team Members content type

## 🚀 Getting Started

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Features

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: features } = await cosmic.objects
  .find({ type: 'features' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Pricing Plans

```typescript
const { objects: plans } = await cosmic.objects
  .find({ type: 'pricing-plans' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Testimonials

```typescript
const { objects: testimonials } = await cosmic.objects
  .find({ type: 'testimonials' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🌐 Cosmic CMS Integration

This application uses the Cosmic JavaScript SDK to fetch content from your Cosmic bucket. All content is server-side rendered for optimal performance and SEO.

### Content Types Used

1. **Features** - Product features displayed on homepage and features page
2. **Pricing Plans** - Subscription tiers with pricing information
3. **Testimonials** - Customer reviews and ratings
4. **Team Members** - Team bios and photos for about page

### API Configuration

The Cosmic client is configured in `lib/cosmic.ts` using environment variables. Make sure to set up your `.env.local` file with the correct bucket credentials.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Environment Variables

Set these environment variables in your deployment platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📱 Pages

- **/** - Homepage with hero, features, pricing, testimonials
- **/features** - Detailed features showcase
- **/pricing** - Comprehensive pricing page
- **/about** - Team member profiles
- **/blog** - Blog listing with pagination
- **/blog/[slug]** - Individual blog posts

## 🎨 Customization

The application uses Tailwind CSS for styling. You can customize colors, spacing, and other design elements in `tailwind.config.ts`. The purple/blue gradient theme is defined in the CSS variables in `app/globals.css`.

## 📄 License

MIT

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) and Next.js

<!-- README_END -->