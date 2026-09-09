import type { Project } from '../types/content';

export const projects: Project[] = [
  {
    id: 'erp-ecommerce',
    title: 'ERP ↔ E-commerce Integration',
    shortDescription: 'Integración automatizada entre ERP y una plataforma de comercio electrónico.',
    description: 'Desarrollo de procesos destinados al intercambio y sincronización de información entre diferentes sistemas.',
    responsibilities: ['Diseño del flujo de integración.', 'Procesamiento de datos.', 'Validaciones.', 'Gestión de errores.', 'Automatización.'],
    concepts: ['Orders', 'Products', 'Stock', 'Customers'],
    technologies: ['Java', 'SQL', 'REST API', 'JSON'],
    featured: true,
    visible: true,
    github: null,
    demo: null,
    image: null,
  },
] satisfies Project[];
