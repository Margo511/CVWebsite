import { siteConfig, siteText } from '../content/site';

export const isMonth = (value: string) => /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
export function formatDate(value?: string | null, language = siteConfig.language, month: 'short' | 'long' = siteConfig.dateStyle): string {
  if (!value || !isMonth(value)) return '';
  const [year, monthNumber] = value.split('-').map(Number);
  const date = new Date(0);
  date.setUTCFullYear(year, monthNumber - 1, 1);
  const parts = new Intl.DateTimeFormat(language, { month, year: 'numeric', timeZone: 'UTC' }).formatToParts(date);
  const formatted = parts.filter(part => part.type === 'month' || part.type === 'year').map(part => part.value).join(' ');
  return formatted.charAt(0).toLocaleUpperCase(language) + formatted.slice(1);
}
export function formatExperienceDate(item: { startDate: string; endDate: string | null; current?: boolean }): string {
  return [formatDate(item.startDate), item.current ? siteText.current : formatDate(item.endDate)].filter(Boolean).join(' — ');
}
