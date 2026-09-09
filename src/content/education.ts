import type { Education } from '../types/content';

export const education: Education[] = [
  {
    id: 'dam',
    title: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma',
    institution: 'Centro Profesional Gregorio Fernández',
    location: 'Valladolid, España',
    startDate: '2021-09',
    endDate: null, // Fecha final sin confirmar; null no implica que siga en curso.
    description: null,
  },
] satisfies Education[];
