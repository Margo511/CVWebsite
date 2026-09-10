// Only translatable values live here. IDs, dates, companies, links and feature
// flags remain in their original content files as the single source of truth.
export const englishContent = {
  profile: {
    headline: 'Software Developer',
    specialization: ['ERP', 'Backend', 'Integrations'],
    location: 'Spain',
    shortDescription: 'I build software that solves real business problems.',
    about: [
      'I am a software developer currently specializing in enterprise solutions, ERP development and integrations.',
      'After starting my career in Android development, I moved toward backend and ERP systems, working on process automation, data processing and integrations between different platforms.',
      'I am especially interested in understanding how systems work, identifying problems and building solutions that simplify real business processes.',
    ],
  },
  experiences: {
    precognis: {
      role: 'ERP / Software Developer',
      location: 'Spain',
      description: 'Development and customization of ERP solutions and system integrations.',
      responsibilities: [
        'Development and customization of ERP systems.',
        'Backend development with Java.',
        'Creation and maintenance of SQL queries.',
        'Business process automation.',
        'Integrations through REST APIs.',
        'Data processing and validation.',
        'Issue diagnosis and resolution.',
        'Analysis of functional and technical requirements.',
      ],
    },
    serbatic: {
      role: 'Android Developer',
      location: 'Valladolid, Spain',
      description: 'Development of Android applications using modern technologies.',
      responsibilities: [
        'Android application development.',
        'Interface development with Jetpack Compose.',
        'Application of Clean Architecture principles.',
      ],
    },
  },
  projects: {
    'erp-ecommerce': {
      title: 'ERP ↔ E-commerce Integration',
      shortDescription: 'Automated integration between an ERP and an e-commerce platform.',
      description: 'Development of processes for exchanging and synchronizing information between different systems.',
      responsibilities: ['Integration flow design.', 'Data processing.', 'Validations.', 'Error handling.', 'Automation.'],
      concepts: ['Orders', 'Products', 'Stock', 'Customers'],
    },
  },
  skillGroups: {
    backend: 'Backend', data: 'Data', enterprise: 'Enterprise', mobile: 'Mobile', tools: 'Tools',
  },
  education: {
    dam: {
      title: 'Higher Technician in Multi-platform Application Development',
      location: 'Valladolid, Spain',
    },
  },
  systems: {
    erp: { label: 'ERP', description: 'Business Logic · Java · SQL' },
    ecommerce: { label: 'E-commerce', description: 'Orders · Products · Stock' },
    logistics: { label: 'Logistics', description: 'Orders · Inventory · Shipping' },
    apis: { label: 'APIs', description: 'REST · JSON · Integrations' },
    databases: { label: 'Databases', description: 'Queries · Validation · Data' },
    automation: { label: 'Automation', description: 'Processes · Synchronization' },
  },
};
