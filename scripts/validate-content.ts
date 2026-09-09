import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import * as content from '../src/content';
import { isMonth } from '../src/utils/dates';
import { externalUrl } from '../src/utils/links';

const errors: string[] = [];
function check(condition: boolean, message: string) { if (!condition) errors.push(message); }
function unique(items: { id: string }[], source: string) {
  const ids = new Set<string>();
  for (const item of items) {
    check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id), `${source}: id inválido '${item.id}'. Usa un slug.`);
    check(!ids.has(item.id), `${source}: id repetido '${item.id}'.`);
    ids.add(item.id);
  }
}
function required(value: string, label: string) { check(Boolean(value.trim()), `${label}: no puede estar vacío.`); }
function url(value: string | null | undefined, label: string) {
  if (value?.trim()) check(Boolean(externalUrl(value)), `${label}: usa una URL completa http(s).`);
}
function asset(value: string | null | undefined, label: string) {
  if (!value) return;
  if (externalUrl(value)) return;
  const safe = value.startsWith('/') && !value.startsWith('//') && !value.includes('..') && !value.includes('\\');
  check(safe && existsSync(resolve('public', value.slice(1))), `${label}: no se encuentra public${value}. Añade el archivo o utiliza null.`);
}
for (const key of ['experiences', 'projects', 'education', 'skillGroups', 'systems'] as const) unique(content[key], key);
for (const item of [...content.experiences, ...content.education]) {
  check(isMonth(item.startDate), `${item.id}: startDate debe tener formato AAAA-MM.`);
  check(item.endDate === null || isMonth(item.endDate), `${item.id}: endDate debe ser AAAA-MM o null.`);
  check(!item.endDate || item.endDate >= item.startDate, `${item.id}: endDate es anterior a startDate.`);
  const current = 'current' in item && item.current;
  check(!current || item.endDate === null, `${item.id}: una entrada actual debe tener endDate: null.`);
  if ('company' in item) {
    required(item.company, `${item.id}.company`);
    required(item.role, `${item.id}.role`);
    check(item.current || item.endDate !== null, `${item.id}: cierra la experiencia con endDate o indica current: true.`);
  }
}
for (const item of content.projects) {
  required(item.title, `${item.id}.title`);
  required(item.shortDescription, `${item.id}.shortDescription`);
  url(item.github, `${item.id}.github`);
  url(item.demo, `${item.id}.demo`);
  if (item.visible) asset(item.image, `${item.id}.image`);
}
for (const item of content.certifications) {
  required(item.name, 'certifications.name');
  required(item.issuer, `${item.name}.issuer`);
  check(isMonth(item.date), `${item.name}: date debe ser AAAA-MM.`);
  url(item.credentialUrl, `${item.name}.credentialUrl`);
}
for (const [name, value] of Object.entries(content.socialLinks)) {
  if (name === 'email') check(!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()), 'social.email: escribe una dirección válida, sin mailto:.');
  else url(value, `social.${name}`);
}
for (const [from, to] of content.systemConnections) {
  check(from !== to && [from, to].every(id => content.systems.some(node => node.id === id)), `systems: conexión inválida ${from} → ${to}.`);
}
required(content.profile.name, 'profile.name');
required(content.profile.headline, 'profile.headline');
try { new Intl.DateTimeFormat(content.siteConfig.language); } catch { errors.push('site.language: código de idioma inválido.'); }
asset(content.siteConfig.cvPath, 'site.cvPath');
if (errors.length) {
  console.error(`\nCorrige estos datos en src/content/:\n${errors.map(error => `- ${error}`).join('\n')}\n`);
  process.exitCode = 1;
} else console.log('Contenido validado: fechas, identificadores, enlaces, archivos y conexiones correctos.');
