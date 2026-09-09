export interface Profile {
  name: string;
  headline: string;
  specialization: string[];
  location: string;
  shortDescription: string;
  about: string[];
}
export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  order?: number;
}
export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  responsibilities: string[];
  concepts?: string[];
  technologies: string[];
  featured: boolean;
  visible: boolean;
  github?: string | null;
  demo?: string | null;
  image?: string | null;
  order?: number;
}
export interface SkillGroup { id: string; title: string; skills: string[] }
export interface Education {
  id: string;
  title: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  current?: boolean;
  description?: string | null;
  order?: number;
}
export interface Certification { name: string; issuer: string; date: string; credentialUrl?: string | null }
export interface SystemNode { id: string; label: string; description?: string; central?: boolean }
export type SystemConnection = [string, string];
export type SectionId = 'about' | 'experience' | 'systems' | 'projects' | 'skills' | 'education' | 'certifications' | 'terminal' | 'contact';
export interface SiteConfig {
  language: string;
  dateStyle: 'short' | 'long';
  accentColor: 'blue' | 'green' | 'violet';
  showAbout: boolean;
  showExperience: boolean;
  showTerminal: boolean;
  showSystems: boolean;
  showProjects: boolean;
  showSkills: boolean;
  showEducation: boolean;
  showCertifications: boolean;
  showContact: boolean;
  cvPath: string | null;
}
