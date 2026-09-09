import { useState, type ReactNode } from 'react';
import { assetUrl, externalUrl } from '../../utils/links';

export function Tags({ items }: { items?: string[] }) {
  const values = items?.filter(item => item.trim());
  return values?.length ? <ul className="tags">{values.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul> : null;
}
export function ExternalLink({ href, children }: { href?: string | null; children: ReactNode }) {
  const safe = externalUrl(href);
  return safe ? <a href={safe} target="_blank" rel="noopener noreferrer">{children} <span aria-hidden="true">↗</span></a> : null;
}
export function ProjectImage({ src, title }: { src?: string | null; title: string }) {
  const [failed, setFailed] = useState<string | null>(null);
  const url = assetUrl(src);
  return url && failed !== url ? <img className="project-image" src={url} alt={title} loading="lazy" onError={() => setFailed(url)} /> : null;
}
