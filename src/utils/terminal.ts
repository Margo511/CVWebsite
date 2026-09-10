import { siteConfig } from '../content';
import { formatDate, formatExperienceDate } from './dates';
import { getEducation, getExperiences, getProfile, getProjects, getSiteText } from './i18n';
import { getAppliedSkillGroups, supportingText } from '../content/supporting-sections';
import { getVisibleProjects, sortByOrder, sortExperiences } from './sort';
import type { Language } from '../types/content';

export function runCommand(command: string, language: Language = siteConfig.language): string {
  const text = getSiteText(language);
  const profile = getProfile(language);
  const experiences = getExperiences(language);
  const projects = getProjects(language);
  const skillGroups = getAppliedSkillGroups(language);
  const education = getEducation(language);
  const empty = text.terminal.empty;
  switch (command.trim().toLowerCase()) {
    case 'help': return Object.entries(text.terminal.help).map(([name, description]) => `${name}\n  ${description}`).join('\n\n');
    case 'whoami': return [profile.name, profile.headline, profile.location, profile.specialization.join(' · '), profile.shortDescription].filter(Boolean).join('\n');
    case 'experience': return sortExperiences(experiences).map(item => `${item.company} · ${item.role}\n${formatExperienceDate(item, language)}\n${item.description}`).join('\n\n') || empty;
    case 'skills': return skillGroups.map(group => `${group.title}\n${group.skills.map(skill => `${skill.technology}${skill.use ? ` → ${skill.use}` : ''}`).join('\n')}`).join('\n\n') || empty;
    case 'projects': return getVisibleProjects(projects).map(item => `${item.title}\n${item.shortDescription}`).join('\n\n') || empty;
    case 'education': return sortByOrder(education, (a, b) => b.startDate.localeCompare(a.startDate)).map(item => `${item.title}\n${item.institution}\n${!item.endDate ? `${supportingText[language].started} · ${formatDate(item.startDate, language)}` : formatExperienceDate(item, language)}`).join('\n\n') || empty;
    case 'clear': return '';
    default: return text.terminal.unknown;
  }
}
