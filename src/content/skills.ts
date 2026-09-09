import type { SkillGroup } from '../types/content';

export const skillGroups = [
  { id: 'backend', title: 'Backend', skills: ['Java', 'Spring Boot', 'REST APIs'] },
  { id: 'data', title: 'Data', skills: ['SQL', 'SQL Server'] },
  { id: 'enterprise', title: 'Enterprise', skills: ['ERP', 'Integrations', 'Automation'] },
  { id: 'mobile', title: 'Mobile', skills: ['Kotlin', 'Jetpack Compose'] },
  { id: 'tools', title: 'Tools', skills: ['Git', 'Postman'] },
] satisfies SkillGroup[];
