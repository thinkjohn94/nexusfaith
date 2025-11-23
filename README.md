# NexusFaith: Science, Technology & Biblical Faith

A modern, scholarly website exploring the harmony between scientific discovery and biblical faith.

## Project Overview

This project is a high-fidelity prototype built with **React (Vite)** + **Tailwind CSS**. It is designed to be fast, accessible, and easy to deploy.

### Tech Stack
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS v4 (Utility-first)
- **Routing:** Wouter (Lightweight routing)
- **Icons:** Lucide React
- **Fonts:** Inter (UI) + Merriweather (Serif/Prose)
- **Content:** TypeScript Data (`client/src/lib/content.ts`) + MDX files (for reference)

## Project Structure

```
/client
  /src
    /components/ui    # Reusable UI components (Hero, Cards, Header, etc.)
    /pages            # Page views (Home, TopicPage, FAQ, etc.)
    /lib              # Utilities and Content Data
  /content            # MDX Content Files (Reference)
  /public             # Static assets (images, robots.txt, sitemap.xml)
```

## How to Edit Content

While the project includes `.mdx` files in `client/content/` for structure, the **active content** for the prototype is stored in:

**`client/src/lib/content.ts`**

To update the text on the website, edit this file. It contains the content for:
- Topic Pages (Cosmology, Biology, etc.)
- FAQs
- YouTube Config

### Updating YouTube Videos

Edit `client/src/lib/content.ts` (or `client/content/config/youtube.json` and manually sync) to change the featured videos.

```typescript
export const youtubeConfig = {
  channelUrl: "...",
  featured: [
    { title: "Video Title", videoId: "VIDEO_ID" }
  ]
}
```

## Deployment

This project is ready for static hosting (Vercel, Netlify, Cloudflare Pages, or Replit).

### Build Command
```bash
npm run build
```
This generates a `dist` folder containing the static site.

### SEO & Analytics
- **GA4:** Set `NEXT_PUBLIC_GA_ID` in your environment variables (placeholder support included).
- **Meta Tags:** Managed via `SEO` component in `client/src/components/ui/seo.tsx`. Update `siteConfig` or page-level props to change metadata.

## License
MIT
