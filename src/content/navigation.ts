import type { Language, SectionId } from '../types/content';

type Translated = Record<Language, string>;

// El menú es una selección del contenido visible; no controla qué se renderiza.
export const primaryNavigation: SectionId[] = ['projects', 'experience', 'about', 'contact'];

// El orden de este array controla las secciones completas.
export const navigation: { id: SectionId; label: Translated; eyebrow: Translated }[] = [
  { id: 'projects', label: { es: 'Proyectos', en: 'Projects' }, eyebrow: { es: 'Del problema a la solución', en: 'From problem to solution' } },
  { id: 'experience', label: { es: 'Experiencia', en: 'Experience' }, eyebrow: { es: 'Mi recorrido profesional', en: 'My professional journey' } },
  { id: 'systems', label: { es: 'Qué hago', en: 'What I do' }, eyebrow: { es: 'Conectar sistemas. Simplificar procesos.', en: 'Connecting systems. Simplifying processes.' } },
  { id: 'skills', label: { es: 'Tecnologías', en: 'Technologies' }, eyebrow: { es: 'Las herramientas de mi trabajo', en: 'The tools behind my work' } },
  { id: 'about', label: { es: 'Sobre mí', en: 'About' }, eyebrow: { es: 'Una mirada más allá del código', en: 'Beyond the code' } },
  { id: 'education', label: { es: 'Formación', en: 'Education' }, eyebrow: { es: 'La base del camino', en: 'The foundation of my path' } },
  { id: 'certifications', label: { es: 'Certificaciones', en: 'Certifications' }, eyebrow: { es: 'Aprendizaje continuo', en: 'Continuous learning' } },
  { id: 'terminal', label: { es: 'Terminal', en: 'Terminal' }, eyebrow: { es: 'Para quienes prefieren la línea de comandos', en: 'For those who prefer the command line' } },
  { id: 'contact', label: { es: 'Contacto', en: 'Contact' }, eyebrow: { es: 'La siguiente conversación', en: 'The next conversation' } },
];
