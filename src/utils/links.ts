export function externalUrl(value?: string | null): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}
export function assetUrl(value?: string | null): string | null {
  if (!value?.trim()) return null;
  if (externalUrl(value)) return externalUrl(value);
  if (!value.startsWith('/') || value.startsWith('//') || value.includes('..') || value.includes('\\')) return null;
  return `${import.meta.env?.BASE_URL ?? '/'}${value.slice(1)}`;
}
export function getSocialLinks(links: Record<string, string>) {
  return Object.entries(links).flatMap(([name, value]) => {
    const href = name === 'email'
      ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? `mailto:${value.trim()}` : null)
      : externalUrl(value);
    return href ? [{ name, href, label: name === 'email' ? value.trim() : name === 'github' ? 'GitHub' : name === 'linkedin' ? 'LinkedIn' : name }] : [];
  });
}
