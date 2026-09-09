import { education, experiences, profile, projects, siteText, skillGroups } from '../content';
import { formatExperienceDate } from './dates';
import { getVisibleProjects, sortByOrder, sortExperiences } from './sort';

export function runCommand(command: string): string {
  const empty = siteText.terminal.empty;
  switch (command.trim().toLowerCase()) {
    case 'help': return Object.entries(siteText.terminal.help).map(([name, description]) => `${name.padEnd(12)} ${description}`).join('\n');
    case 'whoami': return [profile.name, profile.headline, profile.location, profile.specialization.join(' · '), profile.shortDescription].filter(Boolean).join('\n');
    case 'experience': return sortExperiences(experiences).map(item => `${item.company} · ${item.role}\n${formatExperienceDate(item)}\n${item.description}`).join('\n\n') || empty;
    case 'skills': return skillGroups.filter(group => group.skills.length).map(group => `${group.title}: ${group.skills.join(', ')}`).join('\n') || empty;
    case 'projects': return getVisibleProjects(projects).map(item => `${item.title}\n${item.shortDescription}`).join('\n\n') || empty;
    case 'education': return sortByOrder(education, (a, b) => b.startDate.localeCompare(a.startDate)).map(item => `${item.title}\n${item.institution}\n${formatExperienceDate(item)}`).join('\n\n') || empty;
    case 'clear': return '';
    default: return siteText.terminal.unknown;
  }
}
