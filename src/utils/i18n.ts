import { education, englishContent, experiences, navigation, profile, projects, siteText, skillGroups, systems } from '../content';
import type { Education, Experience, Language, Profile, Project, SkillGroup, SystemNode } from '../types/content';

export const getSiteText = (language: Language) => siteText[language];
export function getProfile(language: Language): Profile {
  return language === 'en' ? { ...profile, ...englishContent.profile } : profile;
}
export function getExperiences(language: Language): Experience[] {
  if (language === 'es') return experiences;
  return experiences.map(item => ({ ...item, ...englishContent.experiences[item.id as keyof typeof englishContent.experiences] }));
}
export function getProjects(language: Language): Project[] {
  if (language === 'es') return projects;
  return projects.map(item => ({ ...item, ...englishContent.projects[item.id as keyof typeof englishContent.projects] }));
}
export function getSkillGroups(language: Language): SkillGroup[] {
  if (language === 'es') return skillGroups;
  return skillGroups.map(group => ({ ...group, title: englishContent.skillGroups[group.id as keyof typeof englishContent.skillGroups] ?? group.title }));
}
export function getEducation(language: Language): Education[] {
  if (language === 'es') return education;
  return education.map(item => ({ ...item, ...englishContent.education[item.id as keyof typeof englishContent.education] }));
}
export function getSystems(language: Language): SystemNode[] {
  if (language === 'es') return systems;
  return systems.map(item => ({ ...item, ...englishContent.systems[item.id as keyof typeof englishContent.systems] }));
}
export function getTranslatedNavigation(language: Language) {
  return navigation.map(item => ({ ...item, label: item.label[language], eyebrow: item.eyebrow[language] }));
}
