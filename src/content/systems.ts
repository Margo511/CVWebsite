import type { SystemNode, SystemConnection } from '../types/content';

export const systems: SystemNode[] = [
  { id: 'erp', label: 'ERP', description: 'Business Logic · Java · SQL', central: true },
  { id: 'ecommerce', label: 'E-commerce', description: 'Pedidos · Productos · Stock' },
  { id: 'logistics', label: 'Logistics', description: 'Pedidos · Inventario · Envíos' },
  { id: 'apis', label: 'APIs', description: 'REST · JSON · Integraciones' },
  { id: 'databases', label: 'Databases', description: 'Consultas · Validación · Datos' },
  { id: 'automation', label: 'Automation', description: 'Procesos · Sincronización' },
] satisfies SystemNode[];

export const systemConnections: SystemConnection[] = [
  ['erp', 'ecommerce'], ['erp', 'logistics'], ['erp', 'apis'], ['erp', 'databases'], ['erp', 'automation'],
];
