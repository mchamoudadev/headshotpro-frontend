# SEO Setup Complete Guide

## ✅ What's Been Configured

### 1. Root Layout (`app/layout.tsx`)
- **Base metadata** with title template
- **Open Graph** tags for social media sharing
- **Twitter Card** configuration
- **Favicon** references (multiple sizes)
- **Web manifest** for PWA support
- **Robots** meta tags
- **Keywords** for search engines
- **Verification** tags placeholder (Google, Bing, etc.)

### 2. Home Page (`app/page.tsx`)
- **Page-specific metadata** (overrides root layout)
- **JSON-LD structured data** for rich snippets
- Optimized title and description

### 3. Public Assets
- `robots.txt` - Search engine crawling rules
- `site.webmanifest` - PWA configuration
- `SEO_IMAGES_GUIDE.md` - Guide for creating required images

## 🔧 Configuration Steps

### Step 1: Set Environment Variable

Create a `.env.local` file in the frontend directory:

```bash
NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
```

For development:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 2: Update Social Media Handles

In `app/layout.tsx`, update the Twitter creator:
```typescript
twitter: {
  creator: "@your-actual-twitter-handle",
}
```

### Step 3: Add Verification Codes

After setting up Google Search Console, Bing Webmaster Tools, etc., add verification codes in `app/layout.tsx`:

```typescript
verification: {
  google: "your-google-verification-code",
  yandex: "your-yandex-verification-code",
  bing: "your-bing-verification-code",
}
```

### Step 4: Create Required Images

You need to create these images and place them in `/public/`:

**Favicon Files:**
- `favicon.ico` (32x32px)
- `favicon-16x16.png` (16x16px)
- `favicon-32x32.png` (32x32px)

**Mobile Icons:**
- `apple-touch-icon.png` (180x180px)
- `android-chrome-192x192.png` (192x192px)
- `android-chrome-512x512.png` (512x512px)
- `safari-pinned-tab.svg` (vector, monochrome)

**Social Media Images:**
- `og-image.png` (1200x630px) - For Facebook, LinkedIn, etc.
- `twitter-image.png` (1200x630px) - For Twitter

**Quick way to generate favicons:**
1. Go to https://realfavicongenerator.net/
2. Upload your logo (at least 512x512px)
3. Download the generated package
4. Extract all files to `/public/`

### Step 5: Update robots.txt

Edit `/public/robots.txt` with your actual domain:
```txt
Sitemap: https://your-actual-domain.com/sitemap.xml
```

## 📄 Adding SEO to Other Pages

For any page, export metadata:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Your Page Title",
  description: "Your page description",
  openGraph: {
    title: "Your Page Title",
    description: "Your page description",
    images: ["/page-specific-og-image.png"],
  },
};
```

### Example for Login Page:

```typescript
// app/login/page.tsx
export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Headshot Pro Build account",
};
```

### Example for Dashboard:

```typescript
// app/dashboard/page.tsx
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your headshots and account",
  robots: {
    index: false, // Don't index private pages
    follow: false,
  },
};
```

## 🧪 Testing Your SEO

### 1. Test Open Graph Tags
- **Facebook**: https://developers.facebook.com/tools/debug/
- **LinkedIn**: https://www.linkedin.com/post-inspector/
- **General**: https://www.opengraph.xyz/

### 2. Test Twitter Cards
- https://cards-dev.twitter.com/validator

### 3. Test Structured Data
- https://search.google.com/test/rich-results
- https://validator.schema.org/

### 4. Test Mobile Friendliness
- https://search.google.com/test/mobile-friendly

### 5. Check Page Speed
- https://pagespeed.web.dev/

### 6. Validate robots.txt
- https://www.google.com/webmasters/tools/robots-testing-tool

## 🚀 Deployment Checklist

- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Create and add all favicon files
- [ ] Create OG images (1200x630px)
- [ ] Update Twitter handle in metadata
- [ ] Add Google Search Console verification
- [ ] Update robots.txt with production sitemap URL
- [ ] Test all social media previews
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test structured data with Google Rich Results Test

## 📊 Monitoring

After deployment:

1. **Google Search Console**: Monitor indexing and search performance
2. **Google Analytics**: Track user behavior
3. **Bing Webmaster Tools**: Monitor Bing search performance
4. **Social Media Analytics**: Track social shares and clicks

## 🔄 Sitemap Generation

Next.js can auto-generate sitemaps. Create `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headshotprobuild.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add more pages as needed
  ];
}
```

## 📝 Best Practices

1. **Title Length**: Keep titles under 60 characters
2. **Description Length**: Keep descriptions between 150-160 characters
3. **Keywords**: Use 5-10 relevant keywords
4. **Images**: Always include alt text
5. **URLs**: Use clean, descriptive URLs
6. **Mobile**: Ensure mobile responsiveness
7. **Speed**: Optimize page load times
8. **Content**: Create unique, valuable content
9. **Updates**: Keep metadata current
10. **Testing**: Regularly test SEO elements

## 🎯 Current Implementation

```typescript
// Root Layout (app/layout.tsx)
✅ Title template for consistency
✅ Default metadata
✅ Open Graph configuration
✅ Twitter Card setup
✅ Favicon references
✅ Web manifest
✅ Robots configuration

// Home Page (app/page.tsx)
✅ Page-specific metadata
✅ JSON-LD structured data
✅ Optimized content

// Public Assets
✅ robots.txt
✅ site.webmanifest
```

## 📚 Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)

