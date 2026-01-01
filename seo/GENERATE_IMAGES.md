# Quick Image Generation Guide

## Option 1: Use Online Favicon Generator (Recommended)

1. **Go to**: https://realfavicongenerator.net/
2. **Upload** your logo (minimum 512x512px, PNG with transparent background)
3. **Customize** colors and styles
4. **Download** the generated package
5. **Extract** all files to `/public/` folder
6. Done! ✅

## Option 2: Use Canva for OG Images

1. **Go to**: https://canva.com
2. **Create** custom size: 1200x630px
3. **Design** your Open Graph image with:
   - Your logo
   - Tagline: "Professional AI Headshot Generator"
   - Brand colors
4. **Download** as PNG
5. **Save as**:
   - `og-image.png` in `/public/`
   - `twitter-image.png` in `/public/` (can be same image)

## Option 3: Use ImageMagick (Command Line)

If you have a high-resolution logo (`logo.png`), run these commands:

```bash
cd frontend/public

# Generate favicons
convert logo.png -resize 32x32 favicon.ico
convert logo.png -resize 16x16 favicon-16x16.png
convert logo.png -resize 32x32 favicon-32x32.png

# Generate mobile icons
convert logo.png -resize 180x180 apple-touch-icon.png
convert logo.png -resize 192x192 android-chrome-192x192.png
convert logo.png -resize 512x512 android-chrome-512x512.png

# Generate OG image (with background)
convert logo.png -resize 600x600 -gravity center -background "#000000" -extent 1200x630 og-image.png
convert og-image.png twitter-image.png
```

## Option 4: Quick Placeholder Script

If you just want to test, create colored placeholder images:

```bash
cd frontend/public

# Install ImageMagick first if you don't have it
# macOS: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# Create placeholder favicons (blue background with "H" text)
convert -size 32x32 xc:#3b82f6 -pointsize 24 -fill white -gravity center -annotate +0+0 "H" favicon.ico
convert -size 16x16 xc:#3b82f6 -pointsize 12 -fill white -gravity center -annotate +0+0 "H" favicon-16x16.png
convert -size 32x32 xc:#3b82f6 -pointsize 24 -fill white -gravity center -annotate +0+0 "H" favicon-32x32.png

# Create placeholder mobile icons
convert -size 180x180 xc:#3b82f6 -pointsize 120 -fill white -gravity center -annotate +0+0 "H" apple-touch-icon.png
convert -size 192x192 xc:#3b82f6 -pointsize 128 -fill white -gravity center -annotate +0+0 "H" android-chrome-192x192.png
convert -size 512x512 xc:#3b82f6 -pointsize 340 -fill white -gravity center -annotate +0+0 "H" android-chrome-512x512.png

# Create placeholder OG images
convert -size 1200x630 xc:#3b82f6 -pointsize 72 -fill white -gravity center -annotate +0-50 "Headshot Pro Build" -pointsize 36 -annotate +0+50 "Professional AI Headshot Generator" og-image.png
cp og-image.png twitter-image.png

echo "✅ Placeholder images created!"
```

## Option 5: Use Figma (Professional)

1. **Create** new Figma file
2. **Create frames** with exact dimensions:
   - Favicon: 32x32px
   - Apple Touch Icon: 180x180px
   - Android Icons: 192x192px, 512x512px
   - OG Images: 1200x630px
3. **Design** your icons and images
4. **Export** as PNG (or SVG for safari-pinned-tab)
5. **Place** in `/public/` folder

## What You Need

### Minimum (Required):
- `favicon.ico` (32x32px)
- `og-image.png` (1200x630px)

### Recommended:
- All favicon sizes (16x16, 32x32)
- Apple touch icon (180x180)
- Android icons (192x192, 512x512)
- Twitter image (1200x630)

### Optional:
- Safari pinned tab SVG
- Additional sizes

## Design Tips

1. **Keep it simple**: Icons should be recognizable at small sizes
2. **Use brand colors**: Maintain consistency
3. **High contrast**: Ensure visibility on different backgrounds
4. **Test**: View at actual sizes before finalizing
5. **Transparent backgrounds**: For icons (not OG images)

## Testing Your Images

After creating images, test them:

```bash
# Check if files exist
ls -lh frontend/public/*.png
ls -lh frontend/public/*.ico

# Check file sizes (should be reasonable)
# Favicons: < 50KB
# OG images: < 500KB
```

## Quick Commands

```bash
# Navigate to frontend public folder
cd /Users/mchamouda/Documents/builds/headshotprobuild/frontend/public

# Check what images you have
ls -la | grep -E '\.(png|ico|svg|webp|jpg)$'

# Create a simple placeholder favicon (requires ImageMagick)
convert -size 32x32 xc:#3b82f6 -pointsize 24 -fill white -gravity center -annotate +0+0 "H" favicon.ico
```

## Resources

- **Favicon Generator**: https://realfavicongenerator.net/
- **Canva**: https://canva.com (free tier available)
- **Figma**: https://figma.com (free tier available)
- **ImageMagick**: https://imagemagick.org/
- **Placeholder Images**: https://placeholder.com/
- **Icon Libraries**: https://heroicons.com/, https://lucide.dev/

## Next Steps

1. Create your images using one of the options above
2. Place them in `/public/` folder
3. Test your site locally: `bun run dev`
4. Check favicon in browser tab
5. Test OG images using: https://www.opengraph.xyz/

