# Font Setup Instructions

This project uses self-hosted Google Fonts to ensure optimal performance and privacy.

## Required Fonts

### Playfair Display (Headings)
- `playfair-display-regular.woff2` (Weight: 400)
- `playfair-display-bold.woff2` (Weight: 700)

### Inter (Body Text)
- `inter-regular.woff2` (Weight: 400)
- `inter-medium.woff2` (Weight: 500)
- `inter-semibold.woff2` (Weight: 600)
- `inter-bold.woff2` (Weight: 700)

## How to Download Fonts

### Option 1: Google Webfonts Helper (Recommended)
1. Visit [google-webfonts-helper.herokuapp.com](https://gwfh.mranftl.com/fonts)
2. Search for "Playfair Display"
   - Select weights: 400, 700
   - Download the WOFF2 files
   - Rename them to match the names above
3. Search for "Inter"
   - Select weights: 400, 500, 600, 700
   - Download the WOFF2 files
   - Rename them to match the names above
4. Place all files in `public/fonts/`

### Option 2: Direct from Google Fonts
You can also download the fonts directly from [Google Fonts](https://fonts.google.com/):
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- [Inter](https://fonts.google.com/specimen/Inter)

After downloading, convert to WOFF2 format if needed using a tool like [cloudconvert.com](https://cloudconvert.com/).

## Current Status
✅ Inter fonts are included
⚠️ Playfair Display fonts need to be downloaded manually

The website will still work without these fonts, but will fall back to system fonts until the WOFF2 files are added.
