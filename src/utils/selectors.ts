import * as content from '../content';
import type { SectionId, SiteConfig } from '../types/content';
import { getSocialLinks } from './links';
import { getVisibleProjects, sortExperiences } from './sort';

export function getCurrentExperiences(items = content.experiences) {
  return sortExperiences(items).filter(item => item.current);
}
export function getSectionVisibility(config: SiteConfig = content.siteConfig, data = content): Record<SectionId, boolean> {
  return {
    about: config.showAbout && data.profile.about.some(Boolean),
    experience: config.showExperience && data.experiences.length > 0,
    systems: config.showSystems && data.systems.length > 0,
    projects: config.showProjects && getVisibleProjects(data.projects).length > 0,
    skills: config.showSkills && data.skillGroups.some(group => group.skills.length > 0),
    education: config.showEducation && data.education.length > 0,
    certifications: config.showCertifications && data.certifications.length > 0,
    terminal: config.showTerminal,
    contact: config.showContact && getSocialLinks(data.socialLinks).length > 0,
  };
}
export function getNavigation(config = content.siteConfig) {
  const visible = getSectionVisibility(config);
  return content.navigation.filter(item => visible[item.id]);
}
