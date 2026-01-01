# Quick SEO Reference Card

## 🚀 Quick Start (3 Steps)

### 1. Set Environment Variable
```bash
echo 'NEXT_PUBLIC_SITE_URL=http://localhost:3000' > .env.local
```

### 2. Generate Images (Choose One)

**Option A - Online (Easiest)**:
1. Go to https://realfavicongenerator.net/
2. Upload logo → Download → Extract to `/public/`

**Option B - Command Line** (requires ImageMagick):
```bash
cd public
convert -size 32x32 xc:#3b82f6 -fill white -gravity center -annotate +0+0 "H" favicon.ico
convert -size 1200x630 xc:#3b82f6 -pointsize 72 -fill white -gravity center -annotate +0-50 "Headshot Pro" og-image.png
cp og-image.png twitter-image.png
```

### 3. Test
```bash
bun run dev
# Visit http://localhost:3000
```

## 📝 Add SEO to Any Page

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Your Page Title",
  description: "Your page description (150-160 chars)",
};
```

## 🖼️ Required Images

Place in `/public/`:
- `favicon.ico` (32x32)
- `og-image.png` (1200x630)
- `twitter-image.png` (1200x630)

## 🧪 Test Your SEO

- **OG Preview**: https://www.opengraph.xyz/
- **Twitter Card**: https://cards-dev.twitter.com/validator
- **Rich Results**: https://search.google.com/test/rich-results
- **Page Speed**: https://pagespeed.web.dev/

## 📦 What's Included

✅ Root layout with full SEO metadata
✅ Home page with structured data
✅ Sitemap auto-generation
✅ robots.txt
✅ PWA manifest
✅ Open Graph tags
✅ Twitter Cards
✅ Favicon support

## 🎯 Before Deployment

1. Update `NEXT_PUBLIC_SITE_URL` to production domain
2. Add real images (not placeholders)
3. Update Twitter handle in `app/layout.tsx`
4. Add Google verification code
5. Test all social media previews

## 📚 Full Documentation

- `SEO_SETUP.md` - Complete guide
- `SEO_IMAGES_GUIDE.md` - Image specs
- `GENERATE_IMAGES.md` - Image creation
- `SEO_IMPLEMENTATION_SUMMARY.md` - What's done

## 💡 Quick Tips

- Keep titles under 60 characters
- Keep descriptions 150-160 characters
- Use unique content for each page
- Test on mobile devices
- Update regularly

## 🔧 Common Commands

```bash
# Install ImageMagick (macOS)
brew install imagemagick

# Check images exist
ls -la public/*.png public/*.ico

# Start dev server
bun run dev

# Build for production
bun run build
```

## ⚡ Image Sizes Cheat Sheet

| File | Size | Format |
|------|------|--------|
| favicon.ico | 32x32 | ICO |
| favicon-16x16.png | 16x16 | PNG |
| favicon-32x32.png | 32x32 | PNG |
| apple-touch-icon.png | 180x180 | PNG |
| android-chrome-192x192.png | 192x192 | PNG |
| android-chrome-512x512.png | 512x512 | PNG |
| og-image.png | 1200x630 | PNG/JPG |
| twitter-image.png | 1200x630 | PNG/JPG |

## 🎨 Design Guidelines

**Favicons**: Simple, high contrast, recognizable at small sizes
**OG Images**: Include logo + tagline, readable text, brand colors
**Mobile Icons**: Transparent background, centered, bold design

---

Need help? Check the full documentation in `SEO_SETUP.md`

