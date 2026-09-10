import { siteConfig } from '../content';
import { formatExperienceDate } from './dates';
import { getEducation, getExperiences, getProfile, getProjects, getSiteText, getSkillGroups } from './i18n';
import { getVisibleProjects, sortByOrder, sortExperiences } from './sort';
import type { Language } from '../types/content';

export function runCommand(command: string, language: Language = siteConfig.language): string {
  const text = getSiteText(language);
  const profile = getProfile(language);
  const experiences = getExperiences(language);
  const projects = getProjects(language);
  const skillGroups = getSkillGroups(language);
  const education = getEducation(language);
  const empty = text.terminal.empty;
  switch (command.trim().toLowerCase()) {
    case 'help': return Object.entries(text.terminal.help).map(([name, description]) => `${name.padEnd(12)} ${description}`).join('\n');
    case 'whoami': return [profile.name, profile.headline, profile.location, profile.specialization.join(' · '), profile.shortDescription].filter(Boolean).join('\n');
    case 'experience': return sortExperiences(experiences).map(item => `${item.company} · ${item.role}\n${formatExperienceDate(item, language)}\n${item.description}`).join('\n\n') || empty;
    case 'skills': return skillGroups.filter(group => group.skills.length).map(group => `${group.title}: ${group.skills.join(', ')}`).join('\n') || empty;
    case 'projects': return getVisibleProjects(projects).map(item => `${item.title}\n${item.shortDescription}`).join('\n\n') || empty;
    case 'education': return sortByOrder(education, (a, b) => b.startDate.localeCompare(a.startDate)).map(item => `${item.title}\n${item.institution}\n${formatExperienceDate(item, language)}`).join('\n\n') || empty;
    case 'clear': return '';
    default: return text.terminal.unknown;
  }
}
