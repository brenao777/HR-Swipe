/**
 * Builds a URL for an uploaded logo/photo.
 * Uploaded files are served by the API from `/uploads/<filename>`
 * (proxied by Vite in dev). Absolute URLs are returned untouched.
 */
export function imageUrl(name?: string | null): string {
  if (!name) return '';
  if (name.startsWith('http')) return name;
  return `/uploads/${name}`;
}
