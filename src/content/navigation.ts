import type { SectionId } from '../types/content';

// El orden de este array controla tanto las secciones como el menú.
export const navigation: { id: SectionId; label: string; eyebrow: string }[] = [
  { id: 'about', label: 'Sobre mí', eyebrow: 'Una mirada más allá del código' },
  { id: 'experience', label: 'Experiencia', eyebrow: 'Mi recorrido profesional' },
  { id: 'systems', label: 'Qué hago', eyebrow: 'Conectar sistemas. Simplificar procesos.' },
  { id: 'projects', label: 'Proyectos', eyebrow: 'Del problema a la solución' },
  { id: 'skills', label: 'Tecnologías', eyebrow: 'Las herramientas de mi trabajo' },
  { id: 'education', label: 'Formación', eyebrow: 'La base del camino' },
  { id: 'certifications', label: 'Certificaciones', eyebrow: 'Aprendizaje continuo' },
  { id: 'terminal', label: 'Terminal', eyebrow: 'Para quienes prefieren la línea de comandos' },
  { id: 'contact', label: 'Contacto', eyebrow: 'La siguiente conversación' },
];
