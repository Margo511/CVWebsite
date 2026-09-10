import { readFile, writeFile } from 'node:fs/promises';
import { profile, siteConfig } from '../src/content';
import { getProfile } from '../src/utils/i18n';

// Build-time metadata stays derived from content, without making content a
// Vite config dependency (which would restart the dev server on every edit).
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
const defaultProfile = getProfile(siteConfig.language);
const html = (await readFile('dist/index.html', 'utf8'))
  .replace(/<html lang="[^"]*">/, `<html lang="${escapeHtml(siteConfig.language)}">`)
  .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(`${profile.name} · ${defaultProfile.headline}`)}</title>`)
  .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(defaultProfile.shortDescription)}" />`);
await writeFile('dist/index.html', html);
console.log('Metadatos generados desde src/content/.');
