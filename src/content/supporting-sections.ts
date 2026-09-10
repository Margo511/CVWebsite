import type { Language } from '../types/content';
import { getSkillGroups } from '../utils/i18n';

export const supportingText = {
  es: {
    about: [
      'Desarrollo soluciones empresariales, backend e integraciones entre sistemas. Mi trabajo actual en ERP combina lógica de negocio, consultas de datos y automatización de procesos.',
      'Comencé profesionalmente en desarrollo Android y después orienté mi carrera hacia el backend y los sistemas ERP. Me interesa entender cómo funciona cada proceso, detectar sus problemas y construir soluciones que lo simplifiquen.',
    ],
    current: 'Trabajo actual · ERP e integraciones', additional: 'Tecnologías adicionales', previous: 'Experiencia anterior · Android',
    started: 'Inicio', contact: 'Hablemos de desarrollo ERP, backend e integración entre sistemas.',
    terminal: 'Explorar con comandos', optional: 'Opcional', intro: 'Escribe help o pulsa un comando para ejecutarlo. Usa ↑ y ↓ para recuperar el historial.',
    shortcuts: 'Ejecutar un comando', output: 'Resultados de comandos', cleared: 'Terminal limpia.',
  },
  en: {
    about: [
      'I develop enterprise software, backend services and system integrations. My current ERP work combines business logic, data queries and process automation.',
      'I started my career in Android development before moving toward backend and ERP systems. I am interested in understanding how each process works, finding its problems and building solutions that simplify it.',
    ],
    current: 'Current work · ERP and integrations', additional: 'Additional technologies', previous: 'Previous experience · Android',
    started: 'Started', contact: 'Let’s talk about ERP development, backend services and system integrations.',
    terminal: 'Explore with commands', optional: 'Optional', intro: 'Type help or press a command to run it. Use ↑ and ↓ to recall command history.',
    shortcuts: 'Run a command', output: 'Command results', cleared: 'Terminal cleared.',
  },
};

// Usage describes each technology's purpose, not a proficiency or production claim.
const uses: Record<string, [string, string]> = {
  ERP: ['Lógica y procesos de negocio', 'Business logic and processes'],
  Java: ['Desarrollo backend', 'Backend development'],
  SQL: ['Consulta y tratamiento de datos', 'Data queries and processing'],
  'REST APIs': ['Comunicación entre sistemas', 'Communication between systems'],
  JSON: ['Intercambio de datos', 'Data exchange'],
  'Spring Boot': ['Estructura de servicios Java', 'Java service structure'],
  'SQL Server': ['Base de datos relacional', 'Relational database'],
  Git: ['Control de versiones', 'Version control'],
  Postman: ['Exploración y prueba de APIs', 'API exploration and testing'],
  Kotlin: ['Aplicaciones Android', 'Android applications'],
  'Jetpack Compose': ['Interfaces Android', 'Android interfaces'],
};

export function getAppliedSkillGroups(language: Language) {
  const text = supportingText[language];
  const source = getSkillGroups(language).flatMap(group => group.skills);
  const current = ['ERP', 'Java', 'SQL', 'REST APIs', 'JSON'];
  const previous = ['Kotlin', 'Jetpack Compose'];
  // Integrations and automation are already explained as uses, not technologies.
  const covered = new Set([...current, ...previous, 'Integrations', 'Automation']);
  const groups = [
    { id: 'current', title: text.current, skills: current },
    { id: 'additional', title: text.additional, skills: source.filter(skill => !covered.has(skill)) },
    { id: 'previous', title: text.previous, skills: previous.filter(skill => source.includes(skill)) },
  ];
  return groups.map(group => ({ ...group, skills: [...new Set(group.skills)].map(technology => ({
    technology, use: uses[technology]?.[language === 'es' ? 0 : 1] ?? '',
  })) })).filter(group => group.skills.length);
}
