import { useEffect } from "react";

/**
 * usePageMeta
 * Sets the document title and meta description for a page. Lightweight
 * on purpose — no extra dependency. Open Graph tags are handled in the
 * SEO phase.
 */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
