# Storybook Deployment Guide

## Overview
Storybook is now integrated into the main build process and will be deployed at `/storybook` on your Netlify site.

## URLs

- **Main Site**: https://kanbanboardview.netlify.app/
- **Live Demo**: https://kanbanboardview.netlify.app/demo
- **Storybook**: https://kanbanboardview.netlify.app/storybook

## How It Works

1. **Build Process**: When you run `npm run build`, it now:
   - Builds Storybook first (`npm run build-storybook`)
   - Builds the main Vite app (`vite build`)
   - Copies Storybook files to `dist/storybook` directory

2. **Netlify Configuration**: The `netlify.toml` file configures:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Redirects for proper SPA routing

3. **Landing Page Updates**: The landing page now includes:
   - "View Storybook" button in the hero section
   - "View Storybook" button in the demo section
   - "Storybook" link in the footer

## Deployment

Simply push your changes to your git repository and Netlify will automatically:
1. Run the build command
2. Deploy the `dist` folder
3. Make Storybook available at `/storybook`

## Local Testing

To test locally:
```bash
npm run build
npm run preview
```

Then visit:
- http://localhost:4173/ - Main site
- http://localhost:4173/demo - Demo
- http://localhost:4173/storybook - Storybook

## Notes

- Storybook stories are included in the build, showcasing 7 interactive examples
- All links on the landing page now work correctly
- No external dependencies or separate deployments needed
