import { useEffect } from "react";
import { useLocation } from "wouter";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
}

export function SEO({ title, description, image }: SEOProps) {
  const [location] = useLocation();

  useEffect(() => {
    // Update Title
    document.title = `${title} | NexusFaith`;

    // Update Meta Tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    if (description) {
      updateMeta("description", description);
      updateMeta("og:description", description);
      updateMeta("twitter:description", description);
    }

    updateMeta("og:title", title);
    updateMeta("twitter:title", title);
    updateMeta("og:url", `https://nexusfaith.com${location}`);
    
    if (image) {
      updateMeta("og:image", image);
      updateMeta("twitter:image", image);
    }
  }, [title, description, image, location]);

  return null;
}
