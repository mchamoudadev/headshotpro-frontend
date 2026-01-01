# SEO Images Guide

This document lists all the images you need to create for complete SEO and branding setup.

## Required Images & Specifications

### 1. Favicon Files
Place all these in `/public/` directory:

- **favicon.ico** (32x32px)
  - Classic favicon for browsers
  - ICO format

- **favicon-16x16.png** (16x16px)
  - Small favicon for browser tabs
  - PNG format

- **favicon-32x32.png** (32x32px)
  - Standard favicon for browser tabs
  - PNG format

### 2. Apple Touch Icons

- **apple-touch-icon.png** (180x180px)
  - Used when users add your site to iOS home screen
  - PNG format with rounded corners (iOS applies the mask)

### 3. Android Chrome Icons

- **android-chrome-192x192.png** (192x192px)
  - Small Android icon
  - PNG format, transparent background

- **android-chrome-512x512.png** (512x512px)
  - Large Android icon for splash screens
  - PNG format, transparent background

### 4. Safari Pinned Tab

- **safari-pinned-tab.svg** (any size, vector)
  - Monochrome SVG icon for Safari pinned tabs
  - Should be a single color (black) silhouette

### 5. Open Graph Images (Social Media Sharing)

- **og-image.png** (1200x630px)
  - Main Open Graph image for Facebook, LinkedIn, etc.
  - PNG or JPG format
  - Should include your logo/brand and tagline
  - Safe zone: Keep important content within 1200x600px center

- **twitter-image.png** (1200x630px)
  - Twitter Card image
  - Same specs as og-image.png
  - Can be the same image as og-image.png

### 6. Logo (Optional but Recommended)

- **logo.svg** or **logo.png**
  - Your main logo for use in the navigation
  - SVG preferred for scalability
  - Transparent background

## Design Tips

1. **Consistency**: Use the same color scheme across all images
2. **Brand Identity**: Include your logo or brand mark in larger images
3. **Readability**: Ensure text is legible at small sizes (favicon)
4. **Contrast**: Use good contrast for visibility
5. **Testing**: Test on multiple devices and platforms

## Tools for Creating Images

### Free Online Tools:
- **Favicon Generator**: https://realfavicongenerator.net/
  - Upload one high-res image, get all favicon variants
  
- **Canva**: https://canva.com
  - Create OG images and social media graphics
  
- **Figma**: https://figma.com
  - Professional design tool (free for individuals)

### Quick Command (if you have ImageMagick):
```bash
# Convert a high-res logo to different sizes
convert logo.png -resize 32x32 favicon-32x32.png
convert logo.png -resize 16x16 favicon-16x16.png
convert logo.png -resize 180x180 apple-touch-icon.png
convert logo.png -resize 192x192 android-chrome-192x192.png
convert logo.png -resize 512x512 android-chrome-512x512.png
```

## Current Status

✅ Metadata configured in layout.tsx
✅ Page-specific metadata in page.tsx
✅ Structured data (JSON-LD) added
✅ robots.txt created
✅ site.webmanifest created
⏳ Need to create actual image files

## Next Steps

1. Create or design your logo
2. Generate all required image sizes
3. Place images in `/public/` directory
4. Update `NEXT_PUBLIC_SITE_URL` in your environment variables
5. Add your Google Search Console verification code
6. Test social media sharing with https://www.opengraph.xyz/

