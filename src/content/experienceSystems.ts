// Labels only: professional facts remain in experience.ts and translations.ts.
export const experienceSystemsText = {
  es: {
    current: 'Actividad actual', previous: 'Experiencia anterior', details: 'Ver responsabilidades',
    areas: ['ERP y procesos', 'Backend y datos', 'Integraciones', 'Análisis y soporte'],
    illustration: 'Flujo ilustrativo', title: 'Del ERP al e-commerce, y de vuelta',
    note: 'Pedidos, productos y stock son datos del caso ERP/e-commerce. Las etapas siguientes explican una posible integración; no documentan la arquitectura ni la secuencia implementada del proyecto.',
    data: 'Pedidos · Productos · Stock', explore: 'Explora las etapas',
    help: 'Selecciona una etapa para leer su propósito. Con teclado, usa Tab y Enter o Espacio.',
    full: 'Leer el flujo completo',
    stages: [
      { title: 'Validación', summary: 'Comprobar los datos', description: 'En este ejemplo, se comprueba que los datos de pedidos, productos o stock incluyen la información necesaria antes de continuar.' },
      { title: 'Transformación', summary: 'Adaptar su representación', description: 'Una integración puede necesitar adaptar campos y formatos para que el sistema de destino interprete los datos. Esta etapa es ilustrativa y no está confirmada para el caso real.' },
      { title: 'Intercambio', summary: 'Comunicar los sistemas', description: 'Los datos preparados se intercambian entre ERP y e-commerce. El sentido, el momento y el mecanismo concreto dependen de cada integración; aquí no se especifican los del proyecto real.' },
    ],
  },
  en: {
    current: 'Current work', previous: 'Previous experience', details: 'View responsibilities',
    areas: ['ERP and processes', 'Backend and data', 'Integrations', 'Analysis and support'],
    illustration: 'Illustrative flow', title: 'From ERP to e-commerce, and back',
    note: 'Orders, products and stock are data from the ERP/e-commerce case. The following stages explain a possible integration; they do not document the project’s implemented architecture or sequence.',
    data: 'Orders · Products · Stock', explore: 'Explore the stages',
    help: 'Select a stage to read its purpose. With a keyboard, use Tab and Enter or Space.',
    full: 'Read the complete flow',
    stages: [
      { title: 'Validation', summary: 'Check the data', description: 'In this example, order, product or stock data is checked for the information needed before proceeding.' },
      { title: 'Transformation', summary: 'Adapt its representation', description: 'An integration may need to adapt fields and formats so the destination system can interpret the data. This stage is illustrative and is not confirmed for the real case.' },
      { title: 'Exchange', summary: 'Connect the systems', description: 'Prepared data is exchanged between ERP and e-commerce. Direction, timing and the specific mechanism depend on each integration; those of the real project are not specified here.' },
    ],
  },
};

// Both languages preserve the responsibility order of the source content.
export const experienceAreaResponsibilities = [[0, 3], [1, 2], [4, 5], [7, 6]] as const;
